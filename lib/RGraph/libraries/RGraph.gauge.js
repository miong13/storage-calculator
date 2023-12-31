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
    * The line chart constructor
    * 
    * @param object canvas The canvas ID
    * @param array  data   The chart data
    * @param array  ...    Other lines to plot
    */
    RGraph.Gauge = function (conf)
    {
        /**
        * Allow for object config style
        */
        if (   typeof conf === 'object'
            && typeof conf.id === 'string') {

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

        // id, min, max, value
        this.id                = id;
        this.canvas            = canvas;
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d", {alpha: (typeof id === 'object' && id.alpha === false) ? false : true}) : null;
        this.canvas.__object__ = this;
        this.type              = 'gauge';
        this.min               = RGraph.stringsToNumbers(min);
        this.max               = RGraph.stringsToNumbers(max);
        this.value             = RGraph.stringsToNumbers(value);
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
            /*'chart.margin.left':                 'chart.margin.left',
            'chart.margin.right':                'chart.margin.right',
            'chart.margin.top':                  'chart.margin.top',
            'chart.margin.bottom':               'chart.margin.bottom',
            'chart.scale.units.pre':             'chart.units.pre',
            'chart.scale.units.post':            'chart.units.post',
            'chart.colors.background':            'chart.background.color',

            'chart.colors.red.start':           'chart.red.start',
            'chart.colors.red.color':           'chart.red.color',
            'chart.colors.red.width':           'chart.red.width',
            'chart.colors.yellow.color':        'chart.yellow.color',
            'chart.colors.yellow.width':        'chart.yellow.width',
            'chart.colors.green.end':           'chart.green.end',
            'chart.colors.green.color':         'chart.green.color',
            'chart.colors.green.width':         'chart.green.width',

            'chart.annotatable.color':           'chart.annotate.color',
            'chart.annotatable.linewidth':       'chart.annotate.linewidth',
            'chart.resizable.handle.background': 'chart.resize.handle.background',
            'chart.tickmarks.large':             'chart.tickmarks.big',
            'chart.tickmarks.large.color':       'chart.tickmarks.big.color',
            'chart.labels.value':                  'chart.value.text',
            'chart.labels.value.decimals':         'chart.value.text.decimals',
            'chart.labels.value.bounding':         'chart.value.text.bounding',
            'chart.labels.value.bounding.stroke':  'chart.value.text.bounding.stroke',
            'chart.labels.value.bounding.fill':    'chart.value.text.bounding.fill',
            'chart.labels.value.ycoord.pos':       'chart.value.text.y.pos',
            'chart.labels.value.units.pre':        'chart.value.text.units.pre',
            'chart.labels.value.units.post':       'chart.value.text.units.post',
            'chart.labels.value.font':             'chart.value.text.font',
            'chart.labels.value.size':             'chart.value.text.size',
            'chart.labels.value.italic':           'chart.value.text.italic',
            'chart.labels.value.bold':             'chart.value.text.bold',
            'chart.labels.value.color':            'chart.value.text.color'
            /* [NEW]:[OLD] */
        };






        /**
        * Range checking.
        * 
        * As 4.63 it now saves the original value
        */
        this.valueOriginal = this.value;

        if (typeof(this.value) == 'object') {
            for (var i=0; i<this.value.length; ++i) {
                if (this.value[i] > this.max) this.value[i] = max;
                if (this.value[i] < this.min) this.value[i] = min;
            }
        } else {
            if (this.value > this.max) this.value = max;
            if (this.value < this.min) this.value = min;
        }



        /**
        * Compatibility with older browsers
        */
        //RGraph.OldBrowserCompat(this.context);


        // Various config type stuff
        this.properties =
        {
            'chart.angles.start':  null,
            'chart.angles.end':    null,
            
            'chart.centerx':       null,
            'chart.centery':       null,
            'chart.radius':        null,
            
            'chart.margin.left':   15,
            'chart.margin.right':  15,
            'chart.margin.top':    15,
            'chart.margin.bottom': 15,
            
            'chart.border.width':  10,

            'chart.text.font':                     'Arial, Verdana, sans-serif',
            'chart.text.size':                     12,
            'chart.text.color':                    '#666',
            'chart.text.bold':                     false,
            'chart.text.italic':                   false,
            'chart.text.accessible':               true,
            'chart.text.accessible.overflow':      'visible',
            'chart.text.accessible.pointerevents': false,

            'chart.title.top':          '',
            'chart.title.top.font':     null,
            'chart.title.top.size':     null,
            'chart.title.top.color':    null,
            'chart.title.top.bold':     null,
            'chart.title.top.italic':   null,
            'chart.title.top.pos':      null,
            
            'chart.title.bottom':           '',
            'chart.title.bottom.font':      null,
            'chart.title.bottom.size':      null,
            'chart.title.bottom.color':     null,
            'chart.title.bottom.bold':      null,
            'chart.title.bottom.italic':    null,
            'chart.title.bottom.pos':       null,
            
            // If you add italic support you  shold add it as the default (@ line 750ish) for chart.value.text.italic
            
            'chart.background.color':               'white',
            'chart.background.gradient':            false,

            'chart.scale.decimals':             0,
            'chart.scale.point':                '.',
            'chart.scale.thousand':             ',',
            'chart.scale.units.pre':            '',
            'chart.scale.units.post':           '',
            'chart.scale.point':                '.',
            'chart.scale.thousand':             ',',
            
            'chart.labels.count':                      5,
            'chart.labels.centered':                   false,
            'chart.labels.offset.radius':              0,
            'chart.labels.offset.angle':               0,
            'chart.labels.specific':                   null,
            'chart.labels.offsetx':                    0,
            'chart.labels.offsety':                    0,
            'chart.labels.font':                       null,
            'chart.labels.size':                       null,
            'chart.labels.color':                      null,
            'chart.labels.bold':                       null,
            'chart.labels.italic':                     null,
            'chart.labels.value':                 false,
            'chart.labels.value.y.pos':           0.5,
            'chart.labels.value.units.pre':       '',
            'chart.labels.value.units.post':      '',
            'chart.labels.value.bounding':        true,
            'chart.labels.value.bounding.fill':   'white',
            'chart.labels.value.bounding.stroke': 'black',
            'chart.labels.value.font':            null,
            'chart.labels.value.size':            null,
            'chart.labels.value.color':           null,
            'chart.labels.value.italic':          null,
            'chart.labels.value.bold':            null,
            'chart.labels.value.decimals':        null,


            'chart.colors.red.start':      0.9 * this.max,
            'chart.colors.red.color':      '#DC3912',
            'chart.colors.red.width':      10,
            'chart.colors.yellow.color':   '#FF9900',
            'chart.colors.yellow.width':   10,
            'chart.colors.green.end':      0.7 * this.max,
            'chart.colors.green.color':    'rgba(0,0,0,0)',
            'chart.colors.green.width':    10,
            'chart.colors.ranges':  null,

            'chart.needle.size':    null,
            'chart.needle.tail':    false,
            'chart.needle.colors':   ['#D5604D', 'red', 'green', 'yellow'],
            'chart.needle.type':     'triangle',
            'chart.needle.width':     7,

            'chart.border.outer':     '#ccc',
            'chart.border.inner':     '#f1f1f1',
            'chart.border.outline':   'black',
            'chart.border.gradient':  false,

            'chart.centerpin.color':  'blue',
            'chart.centerpin.radius': null,

            'chart.tickmarks.small':        25,
            'chart.tickmarks.small.color':  'black',
            'chart.tickmarks.medium':       0,
            'chart.tickmarks.medium.color': 'black',
            'chart.tickmarks.large':        5,
            'chart.tickmarks.large.color':  'black',

            'chart.adjustable':       false,

            'chart.shadow':           true,
            'chart.shadow.color':     'gray',
            'chart.shadow.offsetx':   0,
            'chart.shadow.offsety':   0,
            'chart.shadow.blur':      15,

            'chart.clearto':   'rgba(0,0,0,0)'
        }




        /*
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
        * An all encompassing accessor
        * 
        * @param string name The name of the property
        * @param mixed value The value of the property
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





            /**
            * Title compatibility
            */
            if (name == 'chart.title')       name = 'chart.title.top';
            if (name == 'chart.title.font')  name = 'chart.title.top.font';
            if (name == 'chart.title.size')  name = 'chart.title.top.size';
            if (name == 'chart.title.color') name = 'chart.title.top.color';
            if (name == 'chart.title.bold')  name = 'chart.title.top.bold';
            if (name == 'chart.title.italic')name = 'chart.title.top.italic';
    
            // BC
            if (name == 'chart.needle.color') {
                name = 'chart.needle.colors';
            }
            
            // name change
            if (name == 'chart.labels.offset') {
                name = 'chart.labels.offset.radius';
            }





    
            prop[name] = value;
    
            return this;
        };








        /**
        * An all encompassing accessor
        * 
        * @param string name The name of the property
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

    
            // BC
            if (name == 'chart.needle.color') {
                name = 'chart.needle.colors';
            }

            // name change
            if (name == 'chart.labels.offset') {
                name = 'chart.labels.offset.radius';
            }
    
            return prop[name];
        };








        /**
        * The function you call to draw the line chart
        * 
        * @param bool An optional bool used internally to ditinguish whether the
        *             line chart is being called by the bar chart
        */
        this.draw =
        this.Draw = function ()
        {
            /**
            * Fire the onbeforedraw event
            */
            RG.fireCustomEvent(this, 'onbeforedraw');
    
    
    
            /**
            * Store the value (for animation primarily
            */
            this.currentValue = this.value;



            /**
            * Make the margins easy ro access
            */            
            this.marginLeft   = prop['chart.margin.left'];
            this.marginRight  = prop['chart.margin.right'];
            this.marginTop    = prop['chart.margin.top'];
            this.marginBottom = prop['chart.margin.bottom'];
            
            this.centerx = ((ca.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
            this.centery = ((ca.height - this.marginTop - this.marginBottom) / 2) + this.marginTop;
            this.radius  = Math.min(
                ((ca.width - this.marginLeft - this.marginRight) / 2),
                ((ca.height - this.marginTop - this.marginBottom) / 2)
            );
            this.startAngle = prop['chart.angles.start'] ? prop['chart.angles.start'] : (RG.HALFPI / 3) + RG.HALFPI;
            this.endAngle   = prop['chart.angles.end'] ? prop['chart.angles.end'] : RG.TWOPI + RG.HALFPI - (RG.HALFPI / 3);
            
            
            /**
            * Reset this so it doesn't keep growing
            */
            this.coordsText = [];
    
    
    
            /**
            * You can now override the positioning and radius if you so wish.
            */
            if (typeof(prop['chart.centerx']) == 'number') this.centerx = prop['chart.centerx'];
            if (typeof(prop['chart.centery']) == 'number') this.centery = prop['chart.centery'];
            if (typeof(prop['chart.radius']) == 'number')  this.radius  = prop['chart.radius'];
    
            /**
            * Parse the colors. This allows for simple gradient syntax
            */
            if (!this.colorsParsed) {
                this.parseColors();
                
                // Don't want to do this again
                this.colorsParsed = true;
            }
    
    
            // This has to be in the constructor
            this.centerpinRadius = 0.16 * this.radius;
            
            if (typeof(prop['chart.centerpin.radius']) == 'number') {
                this.centerpinRadius = prop['chart.centerpin.radius'];
            }
    
    
    
            /**
            * Setup the context menu if required
            */
            if (prop['chart.contextmenu']) {
                RG.ShowContext(this);
            }
    
    
    
            // DRAW THE CHART HERE
            this.drawBackGround();
            this.drawGradient();
            this.drawColorBands();
            this.drawSmallTickmarks();
            this.drawMediumTickmarks();
            this.drawBigTickmarks();
            this.drawLabels();
            this.drawTopTitle();
            this.drawBottomTitle();
    
            if (typeof(this.value) == 'object') {
                for (var i=0; i<this.value.length; ++i) {
                    this.drawNeedle(this.value[i], prop['chart.needle.colors'][i], i);
                }
            } else {
                this.drawNeedle(this.value, prop['chart.needle.colors'][0], 0);
            }
    
            this.DrawCenterpin();
            
            /**
            * This function enables resizing
            */
            if (prop['chart.resizable']) {
                RG.AllowResizing(this);
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
            RG.fireCustomEvent(this, 'ondraw');
            
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
        * Draw the background
        */
        this.drawBackGround =
        this.DrawBackGround = function ()
        {
            // Shadow //////////////////////////////////////////////
            if (prop['chart.shadow']) {
                RG.setShadow(
                    this,
                    prop['chart.shadow.color'],
                    prop['chart.shadow.offsetx'],
                    prop['chart.shadow.offsety'],
                    prop['chart.shadow.blur']
                );
            }
            
            co.beginPath();
                co.fillStyle = prop['chart.background.color'];
                //co.moveTo(this.centerx, this.centery)
                co.arc(this.centerx, this.centery, this.radius, 0, RG.TWOPI, 0);
            co.fill();
            
            // Turn off the shadow
            RG.noShadow(this);
            // Shadow //////////////////////////////////////////////
    
    
            var grad = co.createRadialGradient(this.centerx + 50, this.centery - 50, 0, this.centerx + 50, this.centery - 50, 150);
            grad.addColorStop(0, '#eee');
            grad.addColorStop(1, 'white');
    
            var borderWidth = prop['chart.border.width'];
    
            co.beginPath();
                co.fillStyle = prop['chart.background.color'];
                co.arc(this.centerx, this.centery, this.radius, 0, RG.TWOPI, 0);
            co.fill();
    
            /**
            * Draw the gray circle
            */
            co.beginPath();
                co.fillStyle = prop['chart.border.outer'];
                co.arc(this.centerx, this.centery, this.radius, 0, RG.TWOPI, 0);
            co.fill();
    
            /**
            * Draw the light gray inner border
            */
            co.beginPath();
                co.fillStyle = prop['chart.border.inner'];
                co.arc(this.centerx, this.centery, this.radius - borderWidth, 0, RG.TWOPI, 0);
            co.fill();
    
    
    
            // Draw the white circle inner border
            co.beginPath();
                co.fillStyle = prop['chart.background.color'];
                co.arc(this.centerx, this.centery, this.radius - borderWidth - 4, 0, RG.TWOPI, 0);
            co.fill();
    
    
    
            // Draw the circle background. Can be any colour now.
            co.beginPath();
                co.fillStyle = prop['chart.background.color'];
                co.arc(this.centerx, this.centery, this.radius - borderWidth - 4, 0, RG.TWOPI, 0);
            co.fill();
    
            if (prop['chart.background.gradient']) {

                // Draw a partially transparent gradient that sits on top of the background
                co.beginPath();
                    co.fillStyle = RG.RadialGradient(
                        this,
                        this.centerx - this.radius,
                        this.centery - this.radius,
                        0,
                        this.centerx - (this.radius / 2),
                        this.centery - (this.radius / 2),
                        this.radius,
                        'rgba(255,255,255,0.2)',
                        'rgba(0,0,0,0.1)'
                    );
                    co.arc(this.centerx, this.centery, this.radius - borderWidth - 4, 0, RG.TWOPI, 0);
                co.fill();
            }
    
    
    
            // Draw a black border around the chart
            co.beginPath();
                co.strokeStyle = prop['chart.border.outline'];
                co.arc(this.centerx, this.centery, this.radius, 0, RG.TWOPI, 0);
            co.stroke();
        };








        /**
        * This function draws the smaller tickmarks
        */
        this.drawSmallTickmarks =
        this.DrawSmallTickmarks = function ()
        {
            var numTicks = prop['chart.tickmarks.small'];
            co.lineWidth = 1;
    
            for (var i=0; i<=numTicks; ++i) {
                co.beginPath();
                    co.strokeStyle = prop['chart.tickmarks.small.color'];
                    var a = (((this.endAngle - this.startAngle) / numTicks) * i) + this.startAngle;
                    co.arc(this.centerx, this.centery, this.radius - prop['chart.border.width'] - 10, a, a + 0.00001, 0);
                    co.arc(this.centerx, this.centery, this.radius - prop['chart.border.width'] - 10 - 5, a, a + 0.00001, 0);
                co.stroke();
            }
        };








        /**
        * This function draws the medium sized tickmarks
        */
        this.drawMediumTickmarks =
        this.DrawMediumTickmarks = function ()
        {
            if (prop['chart.tickmarks.medium']) {
    
                var numTicks = prop['chart.tickmarks.medium'];
                co.lineWidth = 3;
                co.lineCap   = 'round';
                co.strokeStyle = prop['chart.tickmarks.medium.color'];
        
                for (var i=0; i<=numTicks; ++i) {
                    co.beginPath();
                        var a = (((this.endAngle - this.startAngle) / numTicks) * i) + this.startAngle + (((this.endAngle - this.startAngle) / (2 * numTicks)));
                        
                        if (a > this.startAngle && a< this.endAngle) {
                            co.arc(this.centerx, this.centery, this.radius - prop['chart.border.width'] - 10, a, a + 0.00001, 0);
                            co.arc(this.centerx, this.centery, this.radius - prop['chart.border.width'] - 10 - 6, a, a + 0.00001, 0);
                        }
                    co.stroke();
                }
            }
        };








        /**
        * This function draws the large, bold tickmarks
        */
        this.drawLargeTickmarks =
        this.drawBigTickmarks   =
        this.DrawBigTickmarks   = function ()
        {
            var numTicks = prop['chart.tickmarks.large'];

            co.lineWidth = 3;
            co.lineCap   = 'round';
    
            for (var i=0; i<=numTicks; ++i) {
                co.beginPath();
                    co.strokeStyle = prop['chart.tickmarks.large.color'];
                    var a = (((this.endAngle - this.startAngle) / numTicks) * i) + this.startAngle;
                    co.arc(this.centerx, this.centery, this.radius - prop['chart.border.width'] - 10, a, a + 0.00001, 0);
                    co.arc(this.centerx, this.centery, this.radius - prop['chart.border.width'] - 10 - 10, a, a + 0.00001, 0);
                co.stroke();
            }
        };








        /**
        * This function draws the centerpin
        */
        this.drawCenterpin =
        this.DrawCenterpin = function ()
        {
            var offset = 6;
    
            var grad = co.createRadialGradient(this.centerx + offset, this.centery - offset, 0, this.centerx + offset, this.centery - offset, 25);
            grad.addColorStop(0, '#ddf');
            grad.addColorStop(1, prop['chart.centerpin.color']);
    
            co.beginPath();
                co.fillStyle = grad;
                co.arc(this.centerx, this.centery, this.centerpinRadius, 0, RG.TWOPI, 0);
            co.fill();
        };








        /**
        * This function draws the labels
        */
        this.drawLabels =
        this.DrawLabels = function ()
        {
            co.fillStyle = prop['chart.text.color'];
            
            var font    = prop['chart.text.font'],
                size    = prop['chart.text.size'],
                num     = prop['chart.labels.specific'] ? (prop['chart.labels.specific'].length - 1) : prop['chart.labels.count'],
                offsetx = prop['chart.labels.offsetx'],
                offsety = prop['chart.labels.offsety'],
                offseta = prop['chart.labels.offset.angle'];

            var textConf = RG.getTextConf({
                object: this,
                prefix: 'chart.labels'
            });

            co.beginPath();
                if (num) {
                    for (var i=0; i<=num; ++i) {
                        var hyp = (this.radius - 25 - prop['chart.border.width']) - prop['chart.labels.offset.radius'];
                        var a   = (this.endAngle - this.startAngle) / num
                            a   = this.startAngle + (i * a);
                            a  -= RG.HALFPI;
                            a += offseta;


                        var x = this.centerx - (ma.sin(a) * hyp);
                        var y = this.centery + (ma.cos(a) * hyp);

                        var hAlign = x > this.centerx ? 'right' : 'left';
                        var vAlign = y > this.centery ? 'bottom' : 'top';
                        
                        // This handles the label alignment when the label is on a PI/HALFPI boundary
                        if (a == RG.HALFPI) {
                            vAlign = 'center';
                        } else if (a == RG.PI) {
                            hAlign = 'center';
                        } else if (a == (RG.HALFPI + RG.PI) ) {
                            vAlign = 'center';
                        }
                        
                        /**
                        * Can now force center alignment
                        */
                        if (prop['chart.labels.centered']) {
                            hAlign = 'center';
                            vAlign = 'center';
                        }
                        
                        var value = (((this.max - this.min) * (i / num)) + this.min);
        

                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,
                           
                            x:      x + offsetx,
                            y:      y + offsety,
                            text:   prop['chart.labels.specific'] ? prop['chart.labels.specific'][i] : RG.numberFormat({
                                object:    this,
                                number:    value.toFixed(prop['chart.scale.decimals']),
                                unitspre:  prop['chart.scale.units.pre'],
                                unitspost: prop['chart.scale.units.post'],
                                point:     prop['chart.scale.point'],
                                thousand:  prop['chart.scale.thousand']
                            }),
                            halign: hAlign,
                            valign: vAlign,
                            tag:    prop['chart.labels.specific'] ? 'labels.specific' : 'labels'
                        });
                    }
                }
            co.fill();





            /**
            * Draw the textual value if requested
            */
            if (prop['chart.labels.value']) {
    
                var x              = this.centerx,
                    y              = this.centery + (prop['chart.labels.value.y.pos'] * this.radius),
                    units_pre      = typeof(prop['chart.labels.value.units.pre']) == 'string' ? prop['chart.labels.value.units.pre'] : prop['chart.scale.units.pre'],
                    units_post     = typeof(prop['chart.labels.value.units.post']) == 'string' ? prop['chart.labels.value.units.post'] : prop['chart.scale.units.post'],

                    bounding       = prop['chart.labels.value.bounding'],
                    boundingFill   = prop['chart.labels.value.bounding.fill'],
                    boundingStroke = prop['chart.labels.value.bounding.stroke'],
                    decimals       = typeof prop['chart.labels.value.decimals'] === 'number' ? prop['chart.labels.value.decimals'] : prop['chart.scale.decimals'];
            
                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.labels.value'
                });


                if (typeof this.value === 'number') {

                    var value = parseFloat(prop['chart.value.text.actual'] ? this.valueOriginal : this.value);

                    var text = RG.numberFormat({
                        object:    this,
                        number:    value.toFixed(decimals),
                        unitspre:  units_pre,
                        unitspost: units_post
                    });

                } else {
                
                    var text = [];
                
                    for (var i=0; i<this.value.length; ++i) {
                        text[i] = RG.numberFormat({
                            object:    this,
                            number:    this.value[i].toFixed(decimals),
                            unitspre:  units_pre,
                            unitspost: units_post
                        });
                    }
                    
                    text = text.join(', ');
                }

                RG.text2(this, {

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:                  x,
                    y:                  y,
                    text:               text,
                    halign:             'center',
                    valign:             'center',
                    bounding:           bounding,
                    'bounding.fill':    boundingFill,
                    'bounding.stroke':  boundingStroke,
                    tag:                'value.text'
                });
            }
        };








        /**
        * This function draws the top title
        */
        this.drawTopTitle =
        this.DrawTopTitle = function ()
        {
            var x = this.centerx;
            var y = this.centery - 25;
            
            // Totally override the calculated positioning
            if (typeof(prop['chart.title.top.pos']) == 'number') {
                y = this.centery - (this.radius * prop['chart.title.top.pos']);
            }

            var textConf = RG.getTextConf({
                object: this,
                prefix: 'chart.title.top'
            });

            if (prop['chart.title.top']) {
                co.fillStyle = prop['chart.title.top.color'];
                RG.text2(this, {

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      x,
                    y:      y,
                    text:   String(prop['chart.title.top']),
                    halign: 'center',
                    valign: 'bottom',
                    tag:    'title.top'
                });
            }
        };








        /**
        * This function draws the bottom title
        */
        this.drawBottomTitle =
        this.DrawBottomTitle = function ()
        {
            var x = this.centerx;
            var y = this.centery + this.centerpinRadius + 10;
    
            // Totally override the calculated positioning
            if (typeof(prop['chart.title.bottom.pos']) == 'number') {
                y = this.centery + (this.radius * prop['chart.title.bottom.pos']);
            }
    
            if (prop['chart.title.bottom']) {
                co.fillStyle = prop['chart.title.bottom.color'];

                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.title.bottom'
                });

                RG.text2(this, {

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      x,
                    y:      y,
                    text:   String(prop['chart.title.bottom']),
                    halign: 'center',
                    valign: 'top',
                    tag:    'title.bottom'
                });
            }
        };








        /**
        * This function draws the Needle
        * 
        * @param number value The value to draw the needle for
        */
        this.drawNeedle =
        this.DrawNeedle = function (value, color, index)
        {
            var type = prop['chart.needle.type'];

            co.lineWidth   = 0.5;
            co.strokeStyle = 'gray';
            co.fillStyle   = color;
    
            var angle = (this.endAngle - this.startAngle) * ((value - this.min) / (this.max - this.min));
                angle += this.startAngle;
    
    
            // Work out the size of the needle
            if (   typeof(prop['chart.needle.size']) == 'object'
                && prop['chart.needle.size']
                && typeof(prop['chart.needle.size'][index]) == 'number') {
    
                var size = prop['chart.needle.size'][index];
    
            } else if (typeof(prop['chart.needle.size']) == 'number') {
                var size = prop['chart.needle.size'];
    
            } else {
                var size = this.radius - 25 - prop['chart.border.width'];
            }
    
            
    
            if (type == 'line') {
    
                co.beginPath();
                
                    co.lineWidth = prop['chart.needle.width'];
                    co.strokeStyle = color;
                    
                    co.arc(this.centerx,
                        this.centery,
                        size,
                        angle,
                        angle + 0.0001,
                        false
                    );
                    
                    co.lineTo(this.centerx, this.centery);
                    
                    if (prop['chart.needle.tail']) {
                        co.arc(this.centerx, this.centery, this.radius * 0.2  , angle + RG.PI, angle + 0.00001 + RG.PI, false);
                    }
                    
                    co.lineTo(this.centerx, this.centery);
        
                co.stroke();
                //co.fill();
    
            } else {
        
                co.beginPath();
                    co.arc(this.centerx, this.centery, size, angle, angle + 0.00001, false);
                    co.arc(this.centerx, this.centery, this.centerpinRadius * 0.5, angle + RG.HALFPI, angle + 0.00001 + RG.HALFPI, false);
                    
                    if (prop['chart.needle.tail']) {
                        co.arc(this.centerx, this.centery, this.radius * 0.2  , angle + RG.PI, angle + 0.00001 + RG.PI, false);
                    }
        
                    co.arc(this.centerx, this.centery, this.centerpinRadius * 0.5, angle - RG.HALFPI, angle - 0.00001 - RG.HALFPI, false);
                co.stroke();
                co.fill();
                
                /**
                * Store the angle in an object variable
                */
                this.angle = angle;
            }
        };








        /**
        * This draws the green background to the tickmarks
        */
        this.drawColorBands =
        this.DrawColorBands = function ()
        {
            if (RG.isArray(prop['chart.colors.ranges'])) {
    
                var ranges = prop['chart.colors.ranges'];
    
                for (var i=0; i<ranges.length; ++i) {
    
                    //co.strokeStyle = prop['chart.strokestyle'] ? prop['chart.strokestyle'] : ranges[i][2];
                    co.fillStyle = ranges[i][2];
                    co.lineWidth = 0;//prop['chart.linewidth.segments'];

                    co.beginPath();
                        co.arc(
                            this.centerx,
                            this.centery,
                            this.radius - 10 - prop['chart.border.width'],
                            (((ranges[i][0] - this.min) / (this.max - this.min)) * (this.endAngle - this.startAngle)) + this.startAngle,
                            (((ranges[i][1] - this.min) / (this.max - this.min)) * (this.endAngle - this.startAngle)) + this.startAngle,
                            false
                        );
    
                        co.arc(
                            this.centerx,
                            this.centery,
                            this.radius - 10 - prop['chart.border.width'] - (typeof ranges[i][3] === 'number' ? ranges[i][3] : 10),
                            (((ranges[i][1] - this.min) / (this.max - this.min)) * (this.endAngle - this.startAngle)) + this.startAngle,
                            (((ranges[i][0] - this.min) / (this.max - this.min)) * (this.endAngle - this.startAngle)) + this.startAngle,
                            true
                        );
                    co.closePath();
                    co.fill();
                }
    
                return;
            }

            /**
            * Draw the GREEN region
            */
            co.strokeStyle = prop['chart.colors.green.color'];
            co.fillStyle = prop['chart.colors.green.color'];
            
            var greenStart = this.startAngle;
            var greenEnd   = this.startAngle + (this.endAngle - this.startAngle) * ((prop['chart.colors.green.end'] - this.min) / (this.max - this.min))

            co.beginPath();
                co.arc(this.centerx, this.centery, this.radius - 10 - prop['chart.border.width'], greenStart, greenEnd, false);
                co.arc(this.centerx, this.centery, this.radius - (10 + prop['chart.colors.green.width']) - prop['chart.border.width'], greenEnd, greenStart, true);
            co.fill();
    
    
    
    
    
            /**
            * Draw the YELLOW region
            */
            co.strokeStyle = prop['chart.colors.yellow.color'];
            co.fillStyle = prop['chart.colors.yellow.color'];
            
            var yellowStart = greenEnd;
            var yellowEnd   = this.startAngle + (this.endAngle - this.startAngle) * ((prop['chart.colors.red.start'] - this.min) / (this.max - this.min))
    
            co.beginPath();
                co.arc(this.centerx, this.centery, this.radius - 10 - prop['chart.border.width'], yellowStart, yellowEnd, false);
                co.arc(this.centerx, this.centery, this.radius - (10 + prop['chart.colors.yellow.width']) - prop['chart.border.width'], yellowEnd, yellowStart, true);
            co.fill();
    
    
    
    
    
            /**
            * Draw the RED region
            */
            co.strokeStyle = prop['chart.colors.red.color'];
            co.fillStyle = prop['chart.colors.red.color'];
            
            var redStart = yellowEnd;
            var redEnd   = this.startAngle + (this.endAngle - this.startAngle) * ((this.max - this.min) / (this.max - this.min))
    
            co.beginPath();
                co.arc(this.centerx, this.centery, this.radius - 10 - prop['chart.border.width'], redStart, redEnd, false);
                co.arc(this.centerx, this.centery, this.radius - (10 + prop['chart.colors.red.width']) - prop['chart.border.width'], redEnd, redStart, true);
            co.fill();
        };








        /**
        * A placeholder function
        * 
        * @param object The event object
        */
        this.getShape = function (e) {};








        /**
        * A getValue method
        * 
        * @param object e An event object
        */
        this.getValue = function (e)
        {
            var mouseXY = RG.getMouseXY(e);
            var mouseX  = mouseXY[0];
            var mouseY  = mouseXY[1];
    
            var angle = RG.getAngleByXY(this.centerx, this.centery, mouseX, mouseY);
    
            if (angle >= 0 && angle <= RG.HALFPI) {
                angle += RG.TWOPI;
            }
    
            var value = ((angle - this.startAngle) / (this.endAngle - this.startAngle)) * (this.max - this.min);
                value = value + this.min;
    
            if (value < this.min) {
                value = this.min
            }
    
            if (value > this.max) {
                value = this.max
            }
    
            return value;
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
            var mouseXY = RGraph.getMouseXY(e);
    
            if (
                   mouseXY[0] > (this.centerx - this.radius)
                && mouseXY[0] < (this.centerx + this.radius)
                && mouseXY[1] > (this.centery - this.radius)
                && mouseXY[1] < (this.centery + this.radius)
                && RG.getHypLength(this.centerx, this.centery, mouseXY[0], mouseXY[1]) <= this.radius
                ) {
    
                return this;
            }
        };








        /**
        * This draws the gradient that goes around the Gauge chart
        */
        this.drawGradient =
        this.DrawGradient = function ()
        {
            if (prop['chart.border.gradient']) {
                
                co.beginPath();
        
                    var grad = co.createRadialGradient(this.centerx, this.centery, this.radius, this.centerx, this.centery, this.radius - 15);
                    grad.addColorStop(0, 'gray');
                    grad.addColorStop(1, 'white');
        
                    co.fillStyle = grad;
                    co.arc(this.centerx, this.centery, this.radius, 0, RG.TWOPI, false)
                    co.arc(this.centerx, this.centery, this.radius - 15, RG.TWOPI,0, true)
                co.fill();
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
            * Handle adjusting for the Bar
            */
            if (prop['chart.adjustable'] && RG.Registry.get('chart.adjusting') && RG.Registry.get('chart.adjusting').uid == this.uid) {
                this.value = this.getValue(e);
                //RG.Clear(this.canvas);
                RG.redrawCanvas(this.canvas);
                RG.fireCustomEvent(this, 'onadjust');
            }
        };








        /**
        * This method returns an appropriate angle for the given value (in RADIANS)
        * 
        * @param number value The value to get the angle for
        */
        this.getAngle = function (value)
        {
            // Higher than max
            if (value > this.max || value < this.min) {
                return null;
            }
    
            //var value = ((angle - this.startAngle) / (this.endAngle - this.startAngle)) * (this.max - this.min);
                //value = value + this.min;
    
            var angle = (((value - this.min) / (this.max - this.min)) * (this.endAngle - this.startAngle)) + this.startAngle;
            
            return angle;
        };








        /**
        * This allows for easy specification of gradients. Could optimise this not to repeatedly call parseSingleColors()
        */
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors['chart.background.color']     = RG.arrayClone(prop['chart.background.color']);
                this.original_colors['chart.colors.red.color']     = RG.arrayClone(prop['chart.colors.red.color']);
                this.original_colors['chart.colors.yellow.color']  = RG.arrayClone(prop['chart.colors.yellow.color']);
                this.original_colors['chart.colors.green.color']   = RG.arrayClone(prop['chart.colors.green.color']);
                this.original_colors['chart.border.inner']         = RG.arrayClone(prop['chart.border.inner']);
                this.original_colors['chart.border.outer']         = RG.arrayClone(prop['chart.border.outer']);
                this.original_colors['chart.colors.ranges']        = RG.arrayClone(prop['chart.colors.ranges']);
                this.original_colors['chart.needle.colors']        = RG.arrayClone(prop['chart.needle.colors']);
            }

            prop['chart.background.color']     = this.parseSingleColorForGradient(prop['chart.background.color']);
            prop['chart.colors.red.color']    = this.parseSingleColorForGradient(prop['chart.colors.red.color']);
            prop['chart.colors.yellow.color'] = this.parseSingleColorForGradient(prop['chart.colors.yellow.color']);
            prop['chart.colors.green.color']  = this.parseSingleColorForGradient(prop['chart.colors.green.color']);
            prop['chart.border.inner']         = this.parseSingleColorForGradient(prop['chart.border.inner']);
            prop['chart.border.outer']         = this.parseSingleColorForGradient(prop['chart.border.outer']);
            
            // Parse the chart.color.ranges value
            if (prop['chart.colors.ranges']) {
                
                var ranges = prop['chart.colors.ranges'];
    
                for (var i=0; i<ranges.length; ++i) {
                    ranges[i][2] = this.parseSingleColorForGradient(ranges[i][2], this.radius - 30);
                }
            }
    
            // Parse the chart.needle.colors value
            if (prop['chart.needle.colors']) {
                
                var colors = prop['chart.needle.colors'];
    
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
            }
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
        * 
        * @param string color    The color to look for a gradient in
        * @param radius OPTIONAL The start radius to start the gradient at.
        *                        If not suppllied the centerx value is used
        */
        this.parseSingleColorForGradient = function (color)
        {
            var radiusStart = arguments[1] || 0;

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
                var grad = co.createRadialGradient(
                    this.centerx,
                    this.centery,
                    radiusStart,
                    this.centerx,
                    this.centery,
                    this.radius
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
        * This function runs once only
        * (put at the end of the file (before any effects))
        */
        this.firstDrawFunc = function ()
        {
        };








        /**
        * Gauge Grow
        * 
        * This effect gradually increases the represented value
        * 
        * @param object       Options for the effect. You can pass frames here
        * @param function     An optional callback function
        */
        this.grow = function ()
        {
            var obj      = this,
                opt      = arguments[0] ? arguments[0] : {},
                callback = arguments[1] ? arguments[1] : function () {},
                frames   = opt.frames || 30,
                frame    = 0;

            // Don't want any strings
            if (typeof this.value === 'string') {
                this.value = RG.stringsToNumbers(this.value);
            }

            // Single pointer
            if (typeof this.value === 'number') {
    
                var origValue = Number(this.currentValue);
    
                if (this.currentValue == null) {
                    this.currentValue = this.min;
                    origValue = this.min;
                }
    
                var newValue  = this.value,
                    diff      = newValue - origValue;
    
    

                var iterator = function ()
                {
                    obj.value = ((frame / frames) * diff) + origValue;

                    if (obj.value > obj.max) obj.value = obj.max;
                    if (obj.value < obj.min) obj.value = obj.min;
        
                    //RGraph.clear(obj.canvas);
                    RG.redrawCanvas(obj.canvas);
        
                    if (frame++ < frames) {
                        RG.Effects.updateCanvas(iterator);
                    } else {
                        callback(obj);
                    }
                };
    
                iterator();



            /**
            * Multiple pointers
            */
            } else {

                if (this.currentValue == null) {
                    this.currentValue = [];
                    
                    for (var i=0; i<this.value.length; ++i) {
                        this.currentValue[i] = this.min;
                    }
                    
                    origValue = RG.arrayClone(this.currentValue);
                }

                var origValue = RG.arrayClone(this.currentValue);
                var newValue  = RG.arrayClone(this.value);
                var diff      = [];

                for (var i=0,len=newValue.length; i<len; ++i) {
                    diff[i] = newValue[i] - Number(this.currentValue[i]);
                }



                var iterator = function ()
                {
                    frame++;

                    for (var i=0,len=obj.value.length; i<len; ++i) {

                        obj.value[i] = ((frame / frames) * diff[i]) + origValue[i];

                        if (obj.value[i] > obj.max) obj.value[i] = obj.max;
                        if (obj.value[i] < obj.min) obj.value[i] = obj.min;
                    }

                    //RG.clear(obj.canvas);
                    RG.redrawCanvas(obj.canvas);


                    if (frame < frames) {
                        RG.Effects.updateCanvas(iterator);
                    } else {
                        callback(obj);
                    }
                };
        
                iterator();
            }
            
            return this;
        };








        /**
        * Register the object
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