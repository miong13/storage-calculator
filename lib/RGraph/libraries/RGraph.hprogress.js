// version: 2019-08-01
    /**
    * o--------------------------------------------------------------------------------o
    * | This file is part of the RGraph package - you can learn more at:               |
    * |                                                                                |
    * |                         https://www.rgraph.net                                 |
    * |                                                                                |
    * | RGraph is licensed under the Open Source MIT license. That means that it's     |
    * | totally free to use and there are no restrictions on what you can do with it!  |
    * o--------------------------------------------------------------------------------o
    */

    RGraph = window.RGraph || {isRGraph: true};

    /**
    * The progress bar constructor
    * 
    * @param int id    The ID of the canvas tag
    * @param int value The indicated value of the meter.
    * @param int max   The end value (the upper most) of the meter
    */
    RGraph.HProgress = function (conf)
    {
        /**
        * Allow for object config style
        */
        if (   typeof conf       === 'object'
            && typeof conf.value !== 'undefined'
            && typeof conf.id    === 'string') {

            var id                        = conf.id,
                canvas                    = document.getElementById(id),
                min                       = conf.min,
                max                       = conf.max,
                value                     = conf.value,
                parseConfObjectForOptions = true; // Set this so the config is parsed (at the end of the constructor)
        
        } else {
        
            var id     = conf,
                canvas = document.getElementById(id),
                min    = arguments[1],
                max    = arguments[2],
                value  = arguments[3];
        }



        this.id                = id;
        this.canvas            = canvas;
        this.context           = this.canvas.getContext('2d');
        this.canvas.__object__ = this;

        this.min               = RGraph.stringsToNumbers(min);
        this.max               = RGraph.stringsToNumbers(max);
        this.value             = RGraph.stringsToNumbers(value);
        this.type              = 'hprogress';
        this.coords            = [];
        this.isRGraph          = true;
        this.currentValue      = null;
        this.uid               = RGraph.CreateUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.CreateUID();
        this.colorsParsed      = false;
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false




        // This is a list of new property names that are used now in place of
        // the old names.
        //
        // *** When adding this list to a new chart library don't forget ***
        // *** the bit of code that also goes in the .set() function     ***
        this.propertyNameAliases = {
            /*
            'chart.colors.background':           'chart.background.color',
            'chart.margin.inner':                      'chart.margin',
            'chart.margin.left':                 'chart.gutter.left',
            'chart.margin.right':                'chart.gutter.right',
            'chart.margin.top':                  'chart.gutter.top',
            'chart.margin.bottom':               'chart.gutter.bottom',
            'chart.tickmarks.count':             'chart.numticks',
            'chart.tickmarks.inner.count':       'chart.numticks.inner',
            'chart.colors.stroke.inner':         'chart.strokestyle.inner',
            'chart.colors.stroke.outer':         'chart.strokestyle.outer',
            'chart.scale.units.pre':             'chart.units.pre',
            'chart.scale.units.post':            'chart.units.post',
            'chart.annotatable.color':           'chart.annotate.color',
            'chart.annotatable.linewidth':       'chart.annotate.linewidth',
            'chart.resizable.handle.background': 'chart.resize.handle.background',
            'chart.key.position.margin.boxed':   'chart.key.position.gutter.boxed',
            'chart.bevelled':                    'chart.bevel'
            */
            /* [NEW]:[OLD] */
        };



    






        /**
        * Compatibility with older browsers
        */
        //RGraph.OldBrowserCompat(this.context);

        this.properties =
        {
            'chart.colors':             ['Gradient(white:#0c0)','Gradient(white:red)','Gradient(white:green)','yellow','pink','cyan','black','white','gray'],
            'chart.colors.stroke.inner':'#999',
            'chart.colors.stroke.outer':'#999',

            'chart.tickmarks.color':       '#999',
            'chart.tickmarks.inner.count': 0,
            'chart.tickmarks.outer.count': 0,

            'chart.background.color':   'Gradient(#ccc:#eee:#efefef)',

            'chart.margin.left':        25,
            'chart.margin.right':       25,
            'chart.margin.top':         25,
            'chart.margin.bottom':      25,

            'chart.shadow':             false,
            'chart.shadow.color':       'rgba(0,0,0,0.5)',
            'chart.shadow.blur':        3,
            'chart.shadow.offsetx':     3,
            'chart.shadow.offsety':     3,

            'chart.title':              '',
            'chart.title.background':   null,
            'chart.title.bold':         null,
            'chart.title.font':         null,
            'chart.title.size':         null,
            'chart.title.color':        null,
            'chart.title.italic':       null,
            'chart.title.x':            null,
            'chart.title.y':            null,
            'chart.title.halign':       null,
            'chart.title.valign':       null,

            'chart.text.size':          12,
            'chart.text.color':         'black',
            'chart.text.font':          'Arial, Verdana, sans-serif',
            'chart.text.bold':          false,
            'chart.text.italic':        false,
            'chart.text.accessible':               true,
            'chart.text.accessible.overflow':      'visible',
            'chart.text.accessible.pointerevents': false,

            'chart.contextmenu':        null,

            'chart.scale.units.pre':    '',
            'chart.scale.units.post':   '',
            'chart.scale.decimals':     0,
            'chart.scale.point':        '.',
            'chart.scale.thousand':     ',',

            'chart.adjustable':         false,

            'chart.tooltips':           null,
            'chart.tooltips.effect':    'fade',
            'chart.tooltips.css.class': 'RGraph_tooltip',
            'chart.tooltips.highlight': true,
            'chart.tooltips.event':     'onclick',

            'chart.highlight.stroke':   'rgba(0,0,0,0)',
            'chart.highlight.fill':     'rgba(255,255,255,0.7)',

            'chart.annotatable':        false,
            'chart.annotate.color':     'black',

            'chart.arrows':             false,

            'chart.margin.inner':       0,

            'chart.resizable':              false,
            'chart.resizable.handle.adjust':[0,0],
            'chart.resizable.handle.background':null,


            'chart.labels.position':    'bottom',
            'chart.labels.specific':    null,
            'chart.labels.count':       10,
            'chart.labels.offsetx':     0,
            'chart.labels.offsety':     0,
            'chart.labels.font':        null,
            'chart.labels.size':        null,
            'chart.labels.color':       null,
            'chart.labels.bold':        null,
            'chart.labels.italic':      null,
            
            'chart.labels.inner':           '',
            'chart.labels.inner.font':      null,
            'chart.labels.inner.size':      null,
            'chart.labels.inner.color':     null,
            'chart.labels.inner.bold':      null,
            'chart.labels.inner.italic':    null,
            'chart.labels.inner.decimals':  0,
            'chart.labels.inner.background.fill':   'rgba(255,255,255,0.7)',
            'chart.labels.inner.border':            true,
            'chart.labels.inner.border.linewidth':  1,
            'chart.labels.inner.border.color':      '#ccc',
            'chart.labels.inner.scale.point':       null,
            'chart.labels.inner.scale.thousand':    null,
            'chart.labels.inner.units.pre':         '',
            'chart.labels.inner.units.post':        '',
            'chart.labels.inner.specific':          null,

            'chart.key':                null,
            'chart.key.background':     'white',
            'chart.key.position':       'margin',
            'chart.key.halign':         'right',
            'chart.key.shadow':         false,
            'chart.key.shadow.color':   '#666',
            'chart.key.shadow.blur':    3,
            'chart.key.shadow.offsetx': 2,
            'chart.key.shadow.offsety': 2,
            'chart.key.position.margin.boxed': false,
            'chart.key.position.x':     null,
            'chart.key.position.y':     null,
            'chart.key.color.shape':    'square',
            'chart.key.rounded':        true,
            'chart.key.linewidth':      1,
            'chart.key.colors':         null,
            'chart.key.color.shape':    'square',
            'chart.key.interactive':    false,
            'chart.key.interactive.highlight.chart.stroke': 'black',
            'chart.key.interactive.highlight.chart.fill': 'rgba(255,255,255,0.7)',
            'chart.key.interactive.highlight.label': 'rgba(255,0,0,0.2)',
            'chart.key.labels.color':      null,
            'chart.key.labels.font':       null,
            'chart.key.labels.size':       null,
            'chart.key.labels.bold':       null,
            'chart.key.labels.italic':     null,
            'chart.key.labels.offsetx':      0,
            'chart.key.labels.offsety':      0,

            'chart.events.mousemove':    null,
            'chart.events.click':        null,

            'chart.border.inner':        true,

            'chart.clearto':   'rgba(0,0,0,0)'
        }


        // Check for support
        if (!this.canvas) {
            alert('[HPROGRESS] No canvas support');
            return;
        }


        /**
        * Create the dollar objects so that functions can be added to them
        */
        var linear_data = RGraph.array_linearize(value);
        for (var i=0; i<linear_data.length; ++i) {
            this['$' + i] = {};
        }


        /**
        * Translate half a pixel for antialiasing purposes - but only if it hasn't beeen
        * done already
        */
        if (!this.canvas.__rgraph_aa_translated__) {
            this.context.translate(0.5,0.5);
            
            this.canvas.__rgraph_aa_translated__ = true;
        }



        // Short variable names
        var RG   = RGraph,
            ca   = this.canvas,
            co   = ca.getContext('2d'),
            prop = this.properties,
            pa2  = RG.path2,
            win  = window,
            doc  = document,
            ma   = Math
        
        
        
        /**
        * "Decorate" the object with the generic effects if the effects library has been included
        */
        if (RG.Effects && typeof RG.Effects.decorate === 'function') {
            RG.Effects.decorate(this);
        }




        /**
        * A generic setter
        * 
        * @param string name  The name of the property to set
        * @param string value The value of the poperty
        */
        this.set =
        this.Set = function (name)
        {
            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

            /**
            * the number of arguments is only one and it's an
            * object - parse it for configuration data and return.
            */
            if (arguments.length === 1 && typeof name === 'object') {
                RG.parseObjectStyleConfig(this, name);
                return this;
            }
            
            



    
            /**
            * This should be done first - prepend the propertyy name with "chart." if necessary
            */
            if (name.substr(0,6) != 'chart.') {
                name = 'chart.' + name;
            }




            // Convert uppercase letters to dot+lower case letter
            while(name.match(/([A-Z])/)) {
                name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
            }





    
            prop[name] = value;
    
            return this;
        };








        /**
        * A generic getter
        * 
        * @param string name  The name of the property to get
        */
        this.get =
        this.Get = function (name)
        {
            /**
            * This should be done first - prepend the property name with "chart." if necessary
            */
            if (name.substr(0,6) != 'chart.') {
                name = 'chart.' + name;
            }

            // Convert uppercase letters to dot+lower case letter
            while(name.match(/([A-Z])/)) {
                name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
            }

    
            return prop[name.toLowerCase()];
        };








        /**
        * Draws the progress bar
        */
        this.draw =
        this.Draw = function ()
        {
            /**
            * Fire the onbeforedraw event
            */
            RG.fireCustomEvent(this, 'onbeforedraw');
    
    
    
            /**
            * Parse the colors. This allows for simple gradient syntax
            */
            if (!this.colorsParsed) {
    
                this.parseColors();
    
                
                // Don't want to do this again
                this.colorsParsed = true;
            }
    
            
            /**
            * Set the current value
            */
            this.currentValue = this.value;



            /**
            * Make the margins easy ro access
            */
            this.marginLeft   = prop['chart.margin.left'];
            this.marginRight  = prop['chart.margin.right'];
            this.marginTop    = prop['chart.margin.top'];
            this.marginBottom = prop['chart.margin.bottom'];
    
            // Figure out the width and height
            this.width      = ca.width - this.marginLeft - this.marginRight;
            this.height     = ca.height - this.marginTop - this.marginBottom;
            this.coords     = [];
            this.coordsText = [];
    
            this.drawbar();
            this.drawTickMarks();
            this.drawLabels();
            this.drawTitle();
            
            
            /**
            * Draw the bevel effect if requested
            */
            if (prop['chart.bevelled']) {
                this.drawBevel();
            }
    
    
            /**
            * Setup the context menu if required
            */
            if (prop['chart.contextmenu']) {
                RG.showContext(this);
            }
    
    
            // Draw the key if necessary
            if (prop['chart.key'] && prop['chart.key'].length) {
                RG.drawKey(this, prop['chart.key'], prop['chart.colors']);
            }
    
            
            /**
            * This function enables resizing
            */
            if (prop['chart.resizable']) {
                RG.allowResizing(this);
            }
    
    
    
            /**
            * This installs the event listeners
            */
            RG.installEventListeners(this);
    
            /**
            * Fire the onfirstdraw event
            */
            if (this.firstDraw) {
                this.firstDraw = false;
                RG.fireCustomEvent(this, 'onfirstdraw');
                this.firstDrawFunc();
            }


            /**
            * Fire the RGraph ondraw event
            */
            RG.FireCustomEvent(this, 'ondraw');
            
            return this;
        };








        /**
        * Used in chaining. Runs a function there and then - not waiting for
        * the events to fire (eg the onbeforedraw event)
        * 
        * @param function func The function to execute
        */
        this.exec = function (func)
        {
            func(this);

            return this;
        };








        /**
        * Draws the bar
        */
        this.drawbar =
        this.Drawbar = function ()
        {
            /**
            * First get the scale
            */
            this.scale2 = RG.getScale2(this, {
                'scale.max':          this.max,
                'scale.min':          this.min,
                'scale.strict':       true,
                'scale.thousand':     prop['chart.scale.thousand'],
                'scale.point':        prop['chart.scale.point'],
                'scale.decimals':     prop['chart.scale.decimals'],
                'scale.labels.count': prop['chart.labels.count'],
                'scale.round':        prop['chart.scale.round'],
                'scale.units.pre':    prop['chart.scale.units.pre'],
                'scale.units.post':   prop['chart.scale.units.post']
            });

            // Set a shadow if requested
            if (prop['chart.shadow']) {
                RG.setShadow({
                    object: this,
                    prefix: 'chart.shadow'
                });
            }
    
            // Draw the outline
            co.fillStyle   = prop['chart.background.color'];
            co.strokeStyle = prop['chart.colors.stroke.outer'];

            co.strokeRect(this.marginLeft, this.marginTop, this.width, this.height);
            co.fillRect(this.marginLeft, this.marginTop, this.width, this.height);
    
            // Turn off any shadow
            RG.noShadow(this);
    
            co.fillStyle   = prop['chart.colors'][0];
            co.strokeStyle = prop['chart.colors.stroke.outer'];
            
            var margin = prop['chart.margin.inner'];

            // Draw the actual bar itself
            var barWidth = ma.min(this.width, ((RG.arraySum(this.value) - this.min) / (this.max - this.min) ) * this.width);
    
            if (prop['chart.tickmarks.inner.count'] > 0) {
    
                var spacing = (ca.width - this.marginLeft - this.marginRight) / prop['chart.tickmarks.inner.count'];
    
                co.lineWidth   = 1;
                co.strokeStyle = prop['chart.colors.stroke.outer'];
    
                co.beginPath();
                for (var x = this.marginLeft; x<ca.width - this.marginRight; x+=spacing) {
                    co.moveTo(ma.round(x), this.marginTop);
                    co.lineTo(ma.round(x), this.marginTop + 2);
    
                    co.moveTo(ma.round(x), ca.height - this.marginBottom);
                    co.lineTo(ma.round(x), ca.height - this.marginBottom - 2);
                }
                co.stroke();
            }


            /**
            * This bit draws the actual progress bar
            */
            if (typeof this.value === 'number') {

                if (prop['chart.border.inner']) {
                    this.drawCurvedBar({
                        x:      this.marginLeft,
                        y:      this.marginTop + margin,
                        width:  barWidth,
                        height: this.height - margin - margin,
                        stroke: prop['chart.colors.stroke.inner']
                    });
                }

                this.drawCurvedBar({
                    x:      this.marginLeft,
                    y:      this.marginTop + margin,
                    width:  barWidth,
                    height: this.height - margin - margin,
                    fill:   prop['chart.colors'][0]
                });

                // Store the coords
                this.coords.push([
                    this.marginLeft,
                    this.marginTop + margin,
                    barWidth,
                    this.height - margin - margin
                ]);
    
            } else if (typeof this.value === 'object') {

                co.beginPath();
    
                var startPoint = this.marginLeft;
                
                for (var i=0,len=this.value.length; i<len; ++i) {
    
                    var segmentLength = (this.value[i] / RG.arraySum(this.value)) * barWidth;
    
                    if (prop['chart.border.inner']) {
                        this.drawCurvedBar({
                            x:      startPoint,
                            y:      this.marginTop + margin,
                            width:  segmentLength,
                            height: this.height - margin - margin,
                            fill:   prop['chart.colors'][i],
                            stroke: prop['chart.colors.stroke.inner']
                        });
                    }

                    this.drawCurvedBar({
                        x:      startPoint,
                        y:      this.marginTop + margin,
                        width:  segmentLength,
                        height: this.height - margin - margin,
                        fill: prop['chart.colors'][i]
                    });
    
    
                    // Store the coords
                    this.coords.push([
                        startPoint,
                        this.marginTop + margin,
                        segmentLength,
                        this.height - margin - margin
                    ]);
    
                    startPoint += segmentLength;
                }
            }
    
            /**
            * Draw the arrows indicating the level if requested
            */
            if (prop['chart.arrows']) {
                var x = this.marginLeft + barWidth;
                var y = this.marginTop;
                
                co.lineWidth   = 1;
                co.fillStyle   = 'black';
                co.strokeStyle = 'black';
    
                co.beginPath();
                    co.moveTo(x, y - 3);
                    co.lineTo(x + 2, y - 7);
                    co.lineTo(x - 2, y - 7);
                co.closePath();
    
                co.stroke();
                co.fill();
    
                co.beginPath();
                    co.moveTo(x, y + this.height + 4);
                    co.lineTo(x + 2, y + this.height + 9);
                    co.lineTo(x - 2, y + this.height + 9);
                co.closePath();
    
                co.stroke();
                co.fill()
            }










            /**
            * Draw the inner label
            */
            if (prop['chart.labels.inner']) {
            
                // Format the number
                if (typeof prop['chart.labels.inner.specific'] === 'string') {
                    var text = prop['chart.labels.inner.specific'];
                } else {
                    var value = this.value.toFixed(typeof prop['chart.labels.inner.decimals'] === 'number' ? prop['chart.labels.inner.decimals'] : prop['chart.scale.decimals']);
                    var text  = RG.numberFormat({
                        object:    this,
                        number:    value,
                        unitspre:  typeof prop['chart.labels.inner.units.pre'] === 'string' ? prop['chart.labels.inner.units.pre']   : prop['chart.scale.units.pre'],
                        unitspost: typeof prop['chart.labels.inner.units.post'] === 'string' ? prop['chart.labels.inner.units.post'] : prop['chart.scale.units.post'],
                        point:     typeof prop['chart.labels.inner.point']      === 'string' ? prop['chart.labels.inner.point']      : prop['chart.scale.point'],
                        thousand:  typeof prop['chart.labels.inner.thousand']   === 'string' ? prop['chart.labels.inner.thousand']   : prop['chart.scale.thousand']
                    });
                }

                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.labels.inner'
                });

                RG.text2(this, {
                 
                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:           this.marginLeft + barWidth + 5,
                    y:           this.marginTop + (this.height / 2),
                    text:        text,
                    valign:      'center',
                    halign:      'left',
                    bounding:          typeof prop['chart.labels.inner.background.fill'] === 'string' ? true : false,
                    boundingFill:      prop['chart.labels.inner.background.fill'],
                    boundingStroke:    prop['chart.labels.inner.border'] ? prop['chart.labels.inner.border.color'] : 'rgba(0,0,0,0)',
                    boundingLinewidth: prop['chart.labels.inner.border.linewidth'],
                    tag:               'label.inner'
                });
            }

            // This is here to stop colors being changed by later fills
            pa2(co, 'b');
        };








        /**
        * The function that draws the tick marks. Apt name...
        */
        this.drawTickMarks =
        this.DrawTickMarks = function ()
        {
            co.strokeStyle = prop['chart.tickmarks.color'];

            if (prop['chart.tickmarks.outer.count'] > 0) {

                co.beginPath();        
    
                // This is used by the label function below
                this.tickInterval = this.width / prop['chart.tickmarks.outer.count'];

                var start = 0;
    
                if (prop['chart.labels.position'] === 'top') {
                    for (var i=this.marginLeft + start; i<=(this.width + this.marginLeft + 0.1); i+=this.tickInterval) {
                        co.moveTo(ma.round(i), this.marginTop);
                        co.lineTo(ma.round(i), this.marginTop - 4);
                    }

                } else {

                    for (var i=this.marginLeft + start; i<=(this.width + this.marginLeft + 0.1); i+=this.tickInterval) {
                        co.moveTo(ma.round(i), this.marginTop + this.height);
                        co.lineTo(ma.round(i), this.marginTop + this.height + 4);
                    }
                }
    
                co.stroke();
            }
        };








        /**
        * The function that draws the labels
        */
        this.drawLabels =
        this.DrawLabels = function ()
        {
            if (!RG.is_null(prop['chart.labels.specific'])) {
                return this.DrawSpecificLabels();
            }
    
            co.fillStyle = prop['chart.text.color'];
    
            var xPoints = [],
                yPoints = [],
                bold    = prop['chart.text.bold'],
                italic  = prop['chart.text.italic'],
                color   = prop['chart.text.color'],
                font    = prop['chart.text.font'],
                size    = prop['chart.text.size'],
                offsetx = prop['chart.labels.offsetx'],
                offsety = prop['chart.labels.offsety'];
    
            for (i=0,len=this.scale2.labels.length; i<len; i++) {

                if (prop['chart.labels.position'] == 'top') {
                    var x = this.width * (i/this.scale2.labels.length) + this.marginLeft + (this.width / this.scale2.labels.length);
                    var y = this.marginTop - 6;
                    var valign = 'bottom';
                } else {
                    var x = this.width * (i/this.scale2.labels.length) + this.marginLeft + (this.width / this.scale2.labels.length);
                    var y = this.height + this.marginTop + 4;
                    var valign = 'top';
                }

                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.labels'
                });


                RG.text2(this, {

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      x + offsetx,
                    y:      y + offsety,
                    text:   this.scale2.labels[i],
                    valign: valign,
                    halign: 'center',
                    tag:    'scale'
                });
            }
            
            var text  = RG.numberFormat({
                object:    this,
                number:    Number(this.min).toFixed(prop['chart.scale.decimals']),
                unitspre:  prop['chart.scale.units.pre'],
                unitspost: prop['chart.scale.units.post']
            });

            if (prop['chart.labels.position'] == 'top') {
                RG.text2(this, {

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      this.marginLeft + offsetx,
                    y:      this.marginTop - 6 + offsety,
                    text:   text,
                    valign: 'bottom',
                    halign: 'center',
                    tag:    'scale'
                });
            } else {
                RG.text2(this, {

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      this.marginLeft + offsetx,
                    y:      ca.height - this.marginBottom + 5 + offsety,
                    text:   text,
                    valign: 'top',
                    halign: 'center',
                    tag:    'scale'
                });
            }
        };








        /**
        * Returns the focused bar
        * 
        * @param event e The event object
        */
        this.getShape =
        this.getBar = function (e)
        {
            var mouseXY = RG.getMouseXY(e),
                mouseX = mouseXY[0],
                mouseY = mouseXY[1];

            for (var i=0,len=this.coords.length; i<len; i++) {
    
                    var x   = this.coords[i][0],
                        y   = this.coords[i][1],
                        w   = this.coords[i][2],
                        h   = this.coords[i][3],
                        idx = i;

                    co.beginPath();
                    this.drawCurvedBar({
                        x: x,
                        y: y,
                        height: h,
                        width: w
                    });
    
                if (co.isPointInPath(mouseX, mouseY)) {
                
                    var tooltip = RG.parseTooltipText(prop['chart.tooltips'], idx);
                
                    return {
                        0: this, 1: x, 2: y, 3: w, 4: h, 5: idx,
                        'object':this, 'x':x, 'y':y, 'width': w, 'height': h, 'index': idx, 'tooltip': tooltip
                    }
                }
            }
        };








        /**
        * This function returns the value that the mouse is positioned at, regardless of
        * the actual indicated value.
        * 
        * @param object e The event object
        */
        this.getValue = function (e)
        {
            var mouseXY = RG.getMouseXY(e);
                
            var value = (mouseXY[0] - this.marginLeft) / this.width;
                value *= this.max - this.min;
                value += this.min;
                
            if (mouseXY[0] < this.marginLeft) {
                value = this.min;
            }
            if (mouseXY[0] > (ca.width - this.marginRight) ) {
                value = this.max
            }
    
            return value;
        };








        /**
        * Each object type has its own Highlight() function which highlights the appropriate shape
        * 
        * @param object shape The shape to highlight
        */
        this.highlight =
        this.Highlight = function (shape)
        {
            var last = shape.index === this.coords.length - 1;

            if (typeof prop['chart.highlight.style'] === 'function') {
                (prop['chart.highlight.style'])(shape);
            } else {

                this.drawCurvedBar({
                    x:      shape.x,
                    y:      shape.y,
                    width:  shape.width,
                    height: shape.height,
                    stroke: prop['chart.highlight.stroke'],
                    fill:   prop['chart.highlight.fill']
                });
            }
        };








        /**
        * The getObjectByXY() worker method. Don't call this call:
        * 
        * RGraph.ObjectRegistry.getObjectByXY(e)
        * 
        * @param object e The event object
        */
        this.getObjectByXY = function (e)
        {
            var mouseXY = RG.getMouseXY(e);
    
            if (
                   mouseXY[0] > this.marginLeft
                && mouseXY[0] < (ca.width - this.marginRight)
                && mouseXY[1] > this.marginTop
                && mouseXY[1] < (ca.height - this.marginBottom)
                ) {
    
                return this;
            }
        };








        /**
        * This method handles the adjusting calculation for when the mouse is moved
        * 
        * @param object e The event object
        */
        this.adjusting_mousemove =
        this.Adjusting_mousemove = function (e)
        {
            /**
            * Handle adjusting for the HProgress
            */
            if (prop['chart.adjustable'] && RG.Registry.Get('chart.adjusting') && RG.Registry.Get('chart.adjusting').uid == this.uid) {
    
                var mouseXY = RG.getMouseXY(e);
                var value   = this.getValue(e);
                
                if (typeof(value) == 'number') {
        
                    this.value = Number(value.toFixed(prop['chart.scale.decimals']));
                    RG.redrawCanvas(ca);
    
                    // Fire the onadjust event
                    RG.fireCustomEvent(this, 'onadjust');
                }
            }
        };








        /**
        * Draws chart.labels.specific
        */
        this.drawSpecificLabels =
        this.DrawSpecificLabels = function ()
        {
            var labels = prop['chart.labels.specific'];
            
            if (labels) {
    
                var valign  = (prop['chart.labels.position'] == 'top' ? 'bottom' : 'top'),
                    step    = this.width / (labels.length - 1),
                    offsetx = prop['chart.labels.offsetx'],
                    offsety = prop['chart.labels.offsety']

                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.labels'
                });

                co.beginPath();
                    co.fillStyle = prop['chart.text.color'];
                    for (var i=0; i<labels.length; ++i) {
                        RG.text2(this, {

                         font: textConf.font,
                         size: textConf.size,
                        color: textConf.color,
                         bold: textConf.bold,
                       italic: textConf.italic,

                            x:      this.marginLeft + (step * i) + offsetx,
                            y:      prop['chart.labels.position'] == 'top' ? this.marginTop - 7  + offsety: ca.height - this.marginBottom + 7 + offsety,
                            text:   labels[i],
                            valign: valign,
                            halign: 'center',
                            tag:    'labels.specific'
                        });
                    }
                co.fill();
            }
        };








        /**
        * This function returns the appropriate X coordinate for the given value
        * 
        * @param  int value The value you want the coordinate for
        * @returm int       The coordinate
        */
        this.getXCoord = function (value)
        {
            var min = this.min;
    
            if (value < min || value > this.max) {
                return null;
            }
    
            var barWidth = ca.width - this.marginLeft - this.marginRight;
            var coord = ((value - min) / (this.max - min)) * barWidth;
            coord = this.marginLeft + coord;
            
            return coord;
        };








        /**
        * This returns true/false as to whether the cursor is over the chart area.
        * The cursor does not necessarily have to be over the bar itself.
        */
        this.overChartArea = function  (e)
        {
            var mouseXY = RGraph.getMouseXY(e);
            var mouseX  = mouseXY[0];
            var mouseY  = mouseXY[1];
            
            if (   mouseX >= this.marginLeft
                && mouseX <= (ca.width - this.marginRight)
                && mouseY >= this.marginTop
                && mouseY <= (ca.height - this.marginBottom)
                ) {
                
                return true;
            }
    
            return false;
        };








        /**
        * 
        */
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors['chart.colors']              = RG.arrayClone(prop['chart.colors']);
                this.original_colors['chart.tickmarks.color']     = RG.arrayClone(prop['chart.tickmarks.color']);
                this.original_colors['chart.colors.stroke.inner'] = RG.arrayClone(prop['chart.colors.stroke.inner']);
                this.original_colors['chart.colors.stroke.outer'] = RG.arrayClone(prop['chart.colors.stroke.outer']);
                this.original_colors['chart.highlight.fill']      = RG.arrayClone(prop['chart.highlight.fill']);
                this.original_colors['chart.highlight.stroke']    = RG.arrayClone(prop['chart.highlight.stroke']);
                this.original_colors['chart.highlight.color']     = RG.arrayClone(prop['chart.highlight.color']);
            }




            var colors = prop['chart.colors'];
    
            for (var i=0; i<colors.length; ++i) {
                colors[i] = this.parseSingleColorForGradient(colors[i]);
            }

            prop['chart.tickmarks.color']     = this.parseSingleColorForGradient(prop['chart.tickmarks.color']);
            prop['chart.colors.stroke.inner'] = this.parseSingleColorForGradient(prop['chart.colors.stroke.inner']);
            prop['chart.colors.stroke.outer'] = this.parseSingleColorForGradient(prop['chart.colors.stroke.outer']);
            prop['chart.highlight.fill']      = this.parseSingleColorForGradient(prop['chart.highlight.fill']);
            prop['chart.highlight.stroke']    = this.parseSingleColorForGradient(prop['chart.highlight.stroke']);
            prop['chart.background.color']    = this.parseSingleColorForGradient(prop['chart.background.color']);
        };








        /**
        * Use this function to reset the object to the post-constructor state. Eg reset colors if
        * need be etc
        */
        this.reset = function ()
        {
        };








        /**
        * This parses a single color value
        */
        this.parseSingleColorForGradient = function (color)
        {
            if (!color || typeof(color) != 'string') {
                return color;
            }
    
            if (color.match(/^gradient\((.*)\)$/i)) {

                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                var grad = co.createLinearGradient(
                    prop['chart.margin.left'],
                    0,
                    ca.width - prop['chart.margin.right'],
                    0
                );
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RG.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(j * diff, RG.trim(parts[j]));
                }
            }
                
            return grad ? grad : color;
        };








        /**
        * Draws the bevel effect
        */
        this.drawBevel =
        this.DrawBevel = function ()
        {
            // In case of multiple segments - this adds up all the lengths
            for (var i=0,len=0; i<this.coords.length; ++i) len += this.coords[i][2];
    
            co.save();
                // Draw a path to clip to
                co.beginPath();
                co.rect(
                    this.coords[0][0],
                    this.coords[0][1],
                    len,
                    this.coords[0][3]
                );
                co.clip();

                co.save();
                    // Draw a path to clip to
                    co.beginPath();
                        this.drawCurvedBar({
                            x: this.coords[0][0],
                            y: this.coords[0][1],
                            width: len,
                            height: this.coords[0][3]
                        });
                        co.clip();
                    
                    // Now draw the rect with a shadow
                    co.beginPath();
    
                        co.shadowColor = 'black';
                        co.shadowOffsetX = 0;
                        co.shadowOffsetY = 0;
                        co.shadowBlur    = 15;
                        
                        co.lineWidth = 2;
                        
                        this.drawCurvedBar({
                            x: this.coords[0][0] - 51,
                            y: this.coords[0][1] - 1,
                            width: len + 52,
                            height: this.coords[0][3] + 2
                        });
                    
                    co.stroke();
        
                co.restore();
            co.restore();
        };








        /**
        * Draw the titles
        */
        this.drawTitle =
        this.DrawTitle = function ()
        {
            // Draw the title text
            if (prop['chart.title'].length) {
    
                var x    = ((ca.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
                var text = prop['chart.title'];
                
                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.title'
                });
                
                if (prop['chart.labels.position'] == 'top') {
                    y = ca.height - this.marginBottom +5;
                    x = ((ca.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
                    valign = 'top';
                } else {
                    x = ((ca.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
                    y = this.marginTop - 5;
                    valign = 'bottom';
                }
    
    
                RG.Text2(this, {

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:            typeof prop['chart.title.x'] === 'number' ? prop['chart.title.x'] : x,
                    y:            typeof prop['chart.title.y'] === 'number' ? prop['chart.title.y'] : y,
                    text:         text,
                    valign:       prop['chart.title.valign'] ? prop['chart.title.valign'] : valign,
                    halign:       prop['chart.title.halign'] ? prop['chart.title.halign'] : 'center',
                    bounding:     prop['chart.title.background'] ? true : false,
                    boundingFill: prop['chart.title.background'],
                    tag:          'title'
                });
            }
        };








        /**
        * This function handles highlighting an entire data-series for the interactive
        * key
        * 
        * @param int index The index of the data series to be highlighted
        */
        this.interactiveKeyHighlight = function (index)
        {
            var coords = this.coords[index];

            co.beginPath();

                co.strokeStyle = prop['chart.key.interactive.highlight.chart.stroke'];
                co.lineWidth    = 2;
                co.fillStyle   = prop['chart.key.interactive.highlight.chart.fill'];

                co.rect(coords[0], coords[1], coords[2], coords[3]);
            co.fill();
            co.stroke();
            
            // Reset the linewidth
            co.lineWidth    = 1;
        };








        /**
        * Using a function to add events makes it easier to facilitate method chaining
        * 
        * @param string   type The type of even to add
        * @param function func 
        */
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }
            
            if (typeof this[type] !== 'function') {
                this[type] = func;
            } else {
                RG.addCustomEventListener(this, type, func);
            }
    
            return this;
        };








        /**
        * Draws a bar with a curved end.
        * 
        * DOESN'T DRAW A CURVED BAR ANY MORE - JUST A REGULAR SQUARE ENDED BAR
        * 
        * @param object opt The coords and colours
        */
        this.drawCurvedBar = function (opt)
        {
            pa2(co, 'b r % % % %',
                opt.x, opt.y,
                opt.width, opt.height
            );

            if (opt.stroke) {
                co.strokeStyle = opt.stroke;
                co.stroke();
            }
            
            if (opt.fill) {
                co.fillStyle = opt.fill;
                co.fill();
            }
        }








        /**
        * This function runs once only
        * (put at the end of the file (before any effects))
        */
        this.firstDrawFunc = function ()
        {
        };








        /**
        * HProgress Grow effect (which is also the VPogress Grow effect)
        * 
        * @param object obj The chart object
        */
        this.grow   = function ()
        {
            var obj           = this;
            var canvas        = obj.canvas;
            var context       = obj.context;
            var initial_value = obj.currentValue;
            var opt           = arguments[0] || {};
            var numFrames     = opt.frames || 30;
            var frame         = 0
            var callback      = arguments[1] || function () {};
    
            if (typeof obj.value === 'object') {
    
                if (RG.is_null(obj.currentValue)) {
                    obj.currentValue = [];
                    for (var i=0,len=obj.value.length; i<len; ++i) {
                        obj.currentValue[i] = 0;
                    }
                }
    
                var diff      = [];
                var increment = [];
    
                for (var i=0,len=obj.value.length; i<len; ++i) {
                    diff[i]      = obj.value[i] - Number(obj.currentValue[i]);
                    increment[i] = diff[i] / numFrames;
                }
                
                if (initial_value == null) {
                    initial_value = [];
                    for (var i=0,len=obj.value.length; i<len; ++i) {
                        initial_value[i] = 0;
                    }
                }
    
            } else {
    
                var diff = obj.value - Number(obj.currentValue);
                var increment = diff  / numFrames;
            }






            function iterator ()
            {
                frame++;
    
                if (frame <= numFrames) {
    
                    if (typeof obj.value == 'object') {
                        obj.value = [];
                        for (var i=0,len=initial_value.length; i<len; ++i) {
                            obj.value[i] = initial_value[i] + (increment[i] * frame);
                        }
                    } else {
                        obj.value = initial_value + (increment * frame);
                    }
    
                    RGraph.clear(obj.canvas);
                    RGraph.redrawCanvas(obj.canvas);
                    
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback();
                }
            }
            
            iterator();
            
            return this;
        };








        /**
        * Register the object for redrawing
        */
        RG.Register(this);








        /**
        * This is the 'end' of the constructor so if the first argument
        * contains configuration data - handle that.
        */
        if (parseConfObjectForOptions) {
            RG.parseObjectStyleConfig(this, conf.options);
        }
    };