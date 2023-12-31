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
    * The odometer constructor. Pass it the ID of the canvas tag, the start value of the odo,
    * the end value, and the value that the pointer should point to.
    * 
    * @param string id    The ID of the canvas tag
    * @param int    start The start value of the Odo
    * @param int    end   The end value of the odo
    * @param int    value The indicated value (what the needle points to)
    */
    RGraph.Odometer = function (conf)
    {
        /**
        * Allow for object config style
        */
        if (   typeof conf === 'object'
            && typeof conf.value !== 'undefined'
            && typeof conf.id === 'string') {

            var id                        = conf.id
            var canvas                    = document.getElementById(id);
            var min                       = conf.min;
            var max                       = conf.max;
            var value                     = conf.value;
            var parseConfObjectForOptions = true; // Set this so the config is parsed (at the end of the constructor)
        
        } else {
        
            var id     = conf;
            var canvas = document.getElementById(id);
            var min    = arguments[1];
            var max    = arguments[2];
            var value  = arguments[3];
        }




        this.id                = id;
        this.canvas            = canvas;
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d", {alpha: (typeof id === 'object' && id.alpha === false) ? false : true}) : null;
        this.canvas.__object__ = this;
        this.type              = 'odo';
        this.isRGraph          = true;
        this.min               = RGraph.stringsToNumbers(min);
        this.max               = RGraph.stringsToNumbers(max);
        this.value             = RGraph.stringsToNumbers(value);
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
            /*'chart.scale.zerostart':             'chart.zerostart',
            'chart.margin.left':                 'chart.gutter.left',
            'chart.margin.right':                'chart.gutter.right',
            'chart.margin.top':                  'chart.gutter.top',
            'chart.margin.bottom':               'chart.gutter.bottom',
            'chart.colors.background':           'chart.background.color',
            'chart.colors.green.max':            'chart.green.max',
            'chart.colors.red.min':              'chart.red.min',
            'chart.colors.green.color':          'chart.green.color',
            'chart.colors.yellow.color':         'chart.yellow.color',
            'chart.colors.red.color':            'chart.red.color',
            'chart.scale.units.pre':             'chart.units.pre',
            'chart.scale.units.post':            'chart.units.post',
            'chart.labels.margin':               'chart.label.area',
            'chart.tickmarks.large.color':       'chart.tickmarks.big.color',
            'chart.annotatable.color':           'chart.annotate.color',
            'chart.annotatable.linewidth':       'chart.annotate.linewidth',
            'chart.resizable.handle.background': 'chart.resize.handle.background',
            'chart.key.position.margin.boxed':   'chart.key.position.gutter.boxed',
            'chart.labels.value':             'chart.value.text',
            'chart.labels.value.decimals':    'chart.value.text.decimals',
            'chart.labels.value.units.pre':   'chart.value.units.pre',
            'chart.labels.value.units.post':  'chart.value.units.post'*/
        };





        /**
        * Compatibility with older browsers
        */
        //RGraph.OldBrowserCompat(this.context);


        this.properties =
        {
            'chart.background.border':     'black',
            'chart.background.color':      '#eee',
            'chart.background.lines.color': '#ddd',
            
            'chart.centerx':                null,
            'chart.centery':                null,
            'chart.radius':                 null,

            'chart.labels.margin':             35,
            'chart.labels.font':               null,
            'chart.labels.size':               null,
            'chart.labels.color':              null,
            'chart.labels.bold':               null,
            'chart.labels.italic':             null,
            'chart.labels.value':             false,
            'chart.labels.value.decimals':    0,
            'chart.labels.value.units.pre':   '',
            'chart.labels.value.units.post':  '',
            'chart.labels.value.font':   null,
            'chart.labels.value.size':   null,
            'chart.labels.value.color':  null,
            'chart.labels.value.bold':   null,
            'chart.labels.value.italic': null,

            'chart.needle.color':           'black',
            'chart.needle.width':           2,
            'chart.needle.head':            true,
            'chart.needle.tail':            true,
            'chart.needle.type':            'pointer',
            'chart.needle.extra':            [],
            'chart.needle.triangle.border': '#aaa',

            'chart.text.size':              12,
            'chart.text.color':             'black',
            'chart.text.font':              'Arial, Verdana, sans-serif',
            'chart.text.bold':              false,
            'chart.text.italic':            false,
            'chart.text.accessible':               false,
            'chart.text.accessible.overflow':      'visible',
            'chart.text.accessible.pointerevents': false,

            'chart.colors.green.max':              max * 0.75,
            'chart.colors.green.color':            'Gradient(white:#0c0)',
            'chart.colors.yellow.color':           'Gradient(white:#ff0)',
            'chart.colors.red.min':                max * 0.9,
            'chart.colors.red.color':              'Gradient(white:#f00)',


            'chart.margin.left':            25,
            'chart.margin.right':           25,
            'chart.margin.top':             25,
            'chart.margin.bottom':          25,

            'chart.title':                  '',
            'chart.title.background':       null,
            'chart.title.hpos':             null,
            'chart.title.vpos':             null,
            'chart.title.font':             null,
            'chart.title.bold':             null,
            'chart.title.italic':           null,
            'chart.title.size':             null,
            'chart.title.color':            null,
            'chart.title.x':                null,
            'chart.title.y':                null,
            'chart.title.halign':           null,
            'chart.title.valign':           null,
            
            'chart.contextmenu':            null,

            'chart.linewidth':              1,
            
            'chart.shadow.inner':           false,
            'chart.shadow.inner.color':     'black',
            'chart.shadow.inner.offsetx':   3,
            'chart.shadow.inner.offsety':   3,
            'chart.shadow.inner.blur':      6,
            'chart.shadow.outer':           false,
            'chart.shadow.outer.color':     'black',
            'chart.shadow.outer.offsetx':   3,
            'chart.shadow.outer.offsety':   3,
            'chart.shadow.outer.blur':      6,
            
            'chart.annotatable':            false,
            'chart.annotatable.color':         'black',
            
            'chart.scale.decimals':         0,
            'chart.scale.point':            '.',
            'chart.scale.thousand':         ',',
            'chart.scale.units.pre':        '',
            'chart.scale.units.post':       '',
            'chart.scale.zerostart':        false,
            
            'chart.resizable':              false,
            'chart.resizable.handle.adjust':   [0,0],
            'chart.resizable.handle.background': null,
            
            'chart.border':                 false,
            'chart.border.color1':          '#BEBCB0',
            'chart.border.color2':          '#F0EFEA',
            'chart.border.color3':          '#BEBCB0',

            'chart.tickmarks':              true,
            'chart.tickmarks.highlighted':  false,
            'chart.tickmarks.large.color':  '#999',

            'chart.labels':                 null,

            'chart.key':                    null,
            'chart.key.background':         'white',
            'chart.key.position':           'graph',
            'chart.key.shadow':             false,
            'chart.key.shadow.color':       '#666',
            'chart.key.shadow.blur':        3,
            'chart.key.shadow.offsetx':     2,
            'chart.key.shadow.offsety':     2,
            'chart.key.position.margin.boxed':false,
            'chart.key.position.x':         null,
            'chart.key.position.y':         null,
            'chart.key.halign':             'right',
            'chart.key.color.shape':        'square',
            'chart.key.rounded':            true,
            'chart.key.colors':             null,
            'chart.key.labels.size':        null,
            'chart.key.labels.font':        null,
            'chart.key.labels.color':       null,
            'chart.key.labels.bold':        null,
            'chart.key.labels.italic':      null,
            'chart.key.labels.offsetx':      0,
            'chart.key.labels.offsety':      0,

            'chart.adjustable':             false,

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
        * A peudo setter
        * 
        * @param name  string The name of the property to set
        * @param value mixed  The value of the property
        */
        this.set =
        this.Set = function (name, value)
        {
            /**
            * the number of arguments is only one and it's an
            * object - parse it for configuration data and return.
            */
            if (arguments.length === 1 && typeof name === 'object') {
                RG.parseObjectStyleConfig(this, name);
                return this;
            }







    
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


            prop[name] = value;
    
            return this;
        };








        /**
        * A getter
        * 
        * @param name  string The name of the property to get
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

    
            if (name == 'chart.value') {
                return this.value;
            }
    
            return prop[name.toLowerCase()];
        };








        /**
        * Draws the odometer
        */
        this.draw =
        this.Draw = function ()
        {
            /**
            * Fire the onbeforedraw event
            */
            RG.fireCustomEvent(this, 'onbeforedraw');
    
            
            /**
            * Set the current value
            */
            this.currentValue = this.value;
    
            /**
            * No longer allow values outside the range of the Odo
            */
            if (this.value > this.max) {
                this.value = this.max;
            }
    
            if (this.value < this.min) {
                this.value = this.min;
            }



            /**
            * Make the margins easy ro access
            */            
            this.marginLeft   = prop['chart.margin.left'];
            this.marginRight  = prop['chart.margin.right'];
            this.marginTop    = prop['chart.margin.top'];
            this.marginBottom = prop['chart.margin.bottom'];
    
            // Work out a few things
            this.radius   = Math.min(
                (ca.width - this.marginLeft - this.marginRight) / 2,
                (ca.height - this.marginTop - this.marginBottom) / 2
            ) - (prop['chart.border'] ? 25 : 0);

            this.diameter   = 2 * this.radius;
            this.centerx    = ((ca.width - this.marginLeft- this.marginRight) / 2) + this.marginLeft;
            this.centery    = ((ca.height - this.marginTop - this.marginBottom) / 2) + this.marginTop;
            this.range      = this.max - this.min;
            this.coordsText = [];
            
            /**
            * Move the centerx if the key is defined
            */
            if (prop['chart.key'] && prop['chart.key'].length > 0 && ca.width > ca.height) this.centerx = 5 + this.radius;
            if (typeof prop['chart.centerx'] === 'number') this.centerx = prop['chart.centerx'];
            if (typeof prop['chart.centery'] === 'number') this.centery = prop['chart.centery'];
    
            
            /**
            * Allow custom setting of the radius
            */
            if (typeof prop['chart.radius'] === 'number') {
                this.radius = prop['chart.radius'];
                
                if (prop['chart.border']) {
                    this.radius -= 25;
                }
            }
    
    
            /**
            * Parse the colors for gradients. Its down here so that the center X/Y can be used
            */
            if (!this.colorsParsed) {
    
                this.parseColors();
    
                // Don't want to do this again
                this.colorsParsed = true;
            }
    
    
    
            co.lineWidth = prop['chart.linewidth'];
    
            // Draw the background
            this.drawBackground();
    
            // And lastly, draw the labels
            this.drawLabels();
    
            // Draw the needle
            this.drawNeedle(this.value, prop['chart.needle.color']);
            
            /**
            * Draw any extra needles
            */
            if (prop['chart.needle.extra'].length > 0) {
                for (var i=0; i<prop['chart.needle.extra'].length; ++i) {
                    var needle = prop['chart.needle.extra'][i];
                    this.drawNeedle(needle[0], needle[1], needle[2]);
                }
            }

            /**
            * Draw the key if requested
            */
            if (prop['chart.key'] && prop['chart.key'].length > 0) {
                // Build a colors array out of the needle colors
                var colors = [prop['chart.needle.color']];
                
                if (prop['chart.needle.extra'].length > 0) {
                    for (var i=0; i<prop['chart.needle.extra'].length; ++i) {
                        var needle = prop['chart.needle.extra'][i];
                        colors.push(needle[1]);
                    }
                }
    
                RG.drawKey(this, prop['chart.key'], colors);
            }
            
            
            /**
            * Setup the context menu if required
            */
            if (prop['chart.contextmenu']) {
                RG.showContext(this);
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
        * Draws the background
        */
        this.drawBackground =
        this.DrawBackground = function ()
        {
            co.beginPath();

            /**
            * Turn on the shadow if need be
            */
            if (prop['chart.shadow.outer']) {
                RG.setShadow(
                    this,
                    prop['chart.shadow.outer.color'],
                    prop['chart.shadow.outer.offsetx'],
                    prop['chart.shadow.outer.offsety'],
                    prop['chart.shadow.outer.blur']
                );
            }
    
            var backgroundColor = prop['chart.background.color'];
    
            // Draw the grey border
            co.fillStyle = backgroundColor;
            co.arc(this.centerx, this.centery, this.radius, 0.0001, RG.TWOPI, false);
            co.fill();
    
            /**
            * Turn off the shadow
            */
            RG.noShadow(this);

    
            // Draw a circle
            co.strokeStyle = '#666';
            co.arc(this.centerx, this.centery, this.radius, 0, RG.TWOPI, false);
    
            // Now draw a big white circle to make the lines appear as tick marks
            // This is solely for Chrome
            co.fillStyle = backgroundColor;
            co.arc(this.centerx, this.centery, this.radius, 0, RG.TWOPI, false);
            co.fill();
    
            /**
            * Draw more tickmarks
            */
            if (prop['chart.tickmarks']) {
                co.beginPath();
                co.strokeStyle = '#bbb';
            
                for (var i=0; i<=360; i+=3) {
                    co.arc(this.centerx, this.centery, this.radius, 0, i / 57.3, false);
                    co.lineTo(this.centerx, this.centery);
                }
                co.stroke();
            }
    
            co.beginPath();
            co.lineWidth   = 1;
            co.strokeStyle = 'black';
    
            // Now draw a big white circle to make the lines appear as tick marks
            co.fillStyle   = backgroundColor;
            co.strokeStyle = backgroundColor;
            co.arc(this.centerx, this.centery, this.radius - 5, 0, RG.TWOPI, false);
            co.fill();
            co.stroke();

            // Gray lines at 18 degree intervals
            co.beginPath();
            co.strokeStyle = prop['chart.background.lines.color'];
            for (var i=0; i<360; i+=18) {
                co.arc(this.centerx, this.centery, this.radius, 0, RG.degrees2Radians(i), false);
                co.lineTo(this.centerx, this.centery);
            }
            co.stroke();

            // Redraw the outer circle
            co.beginPath();
            co.strokeStyle = prop['chart.background.border'];
            co.arc(this.centerx, this.centery, this.radius, 0, RG.TWOPI, false);
            co.stroke();
    
            /**
            * Now draw the center bits shadow if need be
            */
            if (prop['chart.shadow.inner']) {
                co.beginPath();
                RG.setShadow(
                    this,
                    prop['chart.shadow.inner.color'],
                    prop['chart.shadow.inner.offsetx'],
                    prop['chart.shadow.inner.offsety'],
                    prop['chart.shadow.inner.blur']
                );
                co.arc(this.centerx, this.centery, this.radius - prop['chart.labels.margin'], 0, RG.TWOPI, 0);
                co.fill();
                co.stroke();
        
                /**
                * Turn off the shadow
                */
                RG.noShadow(this);
            }
    
            /*******************************************************
            * Draw the green area
            *******************************************************/
            var greengrad = prop['chart.colors.green.color'];
    
            // Draw the "tick highlight"
            if (prop['chart.tickmarks.highlighted']) {
                co.beginPath();
                co.lineWidth = 5;
                co.strokeStyle = greengrad;
                co.arc(this.centerx, this.centery, this.radius - 2.5,
                
                    -1 * RG.HALFPI,
                    (((prop['chart.colors.green.max'] - this.min)/ (this.max - this.min)) * RG.TWOPI) - RG.HALFPI,
                    0);
    
                co.stroke();
                
                co.lineWidth = 1;
            }

            co.beginPath();
                co.fillStyle = greengrad;
                co.arc(
                        this.centerx,
                        this.centery,
                        this.radius - prop['chart.labels.margin'],
                        0 - RG.HALFPI,
                        (((prop['chart.colors.green.max'] - this.min)/ (this.max - this.min)) * RG.TWOPI) - RG.HALFPI,
                        false
                       );
                co.lineTo(this.centerx, this.centery);
            co.closePath();
            co.fill();
    
    
            /*******************************************************
            * Draw the yellow area
            *******************************************************/
            var yellowgrad = prop['chart.colors.yellow.color'];
    
            // Draw the "tick highlight"
            if (prop['chart.tickmarks.highlighted']) {
                co.beginPath();
                co.lineWidth = 5;
                co.strokeStyle = yellowgrad;
                co.arc(this.centerx, this.centery, this.radius - 2.5, (
                
                    ((prop['chart.colors.green.max'] - this.min) / (this.max - this.min)) * RG.TWOPI) - RG.HALFPI,
                    (((prop['chart.colors.red.min'] - this.min) / (this.max - this.min)) * RG.TWOPI) - RG.HALFPI,
                    0);
    
                co.stroke();
                
                co.lineWidth = 1;
            }
    
            co.beginPath();
                co.fillStyle = yellowgrad;
                co.arc(
                        this.centerx,
                        this.centery,
                        this.radius - prop['chart.labels.margin'],
                        ( ((prop['chart.colors.green.max'] - this.min) / (this.max - this.min)) * RG.TWOPI) - RG.HALFPI,
                        ( ((prop['chart.colors.red.min'] - this.min) / (this.max - this.min)) * RG.TWOPI) - RG.HALFPI,
                        false
                       );
                co.lineTo(this.centerx, this.centery);
            co.closePath();
            co.fill();
    
            /*******************************************************
            * Draw the red area
            *******************************************************/
            var redgrad = prop['chart.colors.red.color'];
    
            // Draw the "tick highlight"
            if (prop['chart.tickmarks.highlighted']) {
                co.beginPath();
                co.lineWidth = 5;
                co.strokeStyle = redgrad;
                co.arc(this.centerx, this.centery, this.radius - 2.5,(((prop['chart.colors.red.min'] - this.min) / (this.max - this.min)) * RG.TWOPI) - RG.HALFPI,RG.TWOPI - RG.HALFPI,0);
                co.stroke();
                
                co.lineWidth = 1;
            }

            co.beginPath();
                co.fillStyle = redgrad;
                co.strokeStyle = redgrad;
                co.arc(
                        this.centerx,
                        this.centery,
                        this.radius - prop['chart.labels.margin'],
                        (((prop['chart.colors.red.min'] - this.min) / (this.max - this.min)) * RG.TWOPI) - RG.HALFPI,
                        RG.TWOPI - RG.HALFPI,
                        false
                       );
                co.lineTo(this.centerx, this.centery);
            co.closePath();
            co.fill();
    
    
            /**
            * Draw the thick border
            */
            if (prop['chart.border']) {
    
                var grad = co.createRadialGradient(this.centerx, this.centery, this.radius, this.centerx, this.centery, this.radius + 20);
                grad.addColorStop(0, prop['chart.border.color1']);
                grad.addColorStop(0.5, prop['chart.border.color2']);
                grad.addColorStop(1, prop['chart.border.color3']);
    
                
                co.beginPath();
                    co.fillStyle   = grad;
                    co.strokeStyle = 'rgba(0,0,0,0)'
                    co.lineWidth   = 0.001;
                    co.arc(this.centerx, this.centery, this.radius + 20, 0, RG.TWOPI, 0);
                    co.arc(this.centerx, this.centery, this.radius - 2, RG.TWOPI, 0, 1);
                co.fill();
            }
            
            // Put the linewidth back to what it was
            co.lineWidth = prop['chart.linewidth'];
    
    
            /**
            * Draw the title if specified
            */
            if (prop['chart.title']) {
                RG.drawTitle(
                    this,
                    prop['chart.title'],
                    this.centery - this.radius,
                    null,
                    prop['chart.title.size'] ? prop['chart.title.size'] : prop['chart.text.size'] + 2
                );
            }
    

            // Draw the big tick marks
            if (!prop['chart.tickmarks.highlighted']) {
                for (var i=18; i<=360; i+=36) {
                    co.beginPath();
                        co.strokeStyle = prop['chart.tickmarks.large.color'];
                        co.lineWidth = 2;
                        co.arc(this.centerx, this.centery, this.radius - 1, RG.toRadians(i), RG.toRadians(i+0.01), false);
                        co.arc(this.centerx, this.centery, this.radius - 7, RG.toRadians(i), RG.toRadians(i+0.01), false);
                    co.stroke();
                }
            }
        };








        /**
        * Draws the needle of the odometer
        * 
        * @param number value The value to represent
        * @param string color The color of the needle
        * @param number       The OPTIONAL length of the needle
        */
        this.drawNeedle =
        this.DrawNeedle = function (value, color)
        {
            // The optional length of the needle
            var length = arguments[2] ? arguments[2] : this.radius - prop['chart.labels.margin'];
    
            // ===== First draw a grey background circle =====
            
            co.fillStyle = '#999';
    
            co.beginPath();
                co.moveTo(this.centerx, this.centery);
                co.arc(this.centerx, this.centery, 10, 0, RG.TWOPI, false);
                co.fill();
            co.closePath();
    
            co.fill();
    
            // ===============================================
            
            co.fillStyle = color
            co.strokeStyle = '#666';
    
            // Draw the centre bit
            co.beginPath();
                co.moveTo(this.centerx, this.centery);
                co.arc(this.centerx, this.centery, 8, 0, RG.TWOPI, false);
                co.fill();
            co.closePath();
            
            co.stroke();
            co.fill();
    
            if (prop['chart.needle.type'] == 'pointer') {
    
                co.strokeStyle = color;
                co.lineWidth   = prop['chart.needle.width'];
                co.lineCap     = 'round';
                co.lineJoin    = 'round';
                
                // Draw the needle
                co.beginPath();
                    // The trailing bit on the opposite side of the dial
                    co.beginPath();
                        co.moveTo(this.centerx, this.centery);
                        
                        if (prop['chart.needle.tail']) {
    
                            co.arc(this.centerx,
                                   this.centery,
                                   20,
                                    (((value / this.range) * 360) + 90) / (180 / RG.PI),
                                   (((value / this.range) * 360) + 90 + 0.01) / (180 / RG.PI), // The 0.01 avoids a bug in ExCanvas and Chrome 6
                                   false
                                  );
                        }
    
                    // Draw the long bit on the opposite side
                    co.arc(this.centerx,
                            this.centery,
                            length - 10,
                            (((value / this.range) * 360) - 90) / (180 / RG.PI),
                            (((value / this.range) * 360) - 90 + 0.1 ) / (180 / RG.PI), // The 0.1 avoids a bug in ExCanvas and Chrome 6
                            false
                           );
                co.closePath();
                
                //co.stroke();
                //co.fill();
            
    
            } else if (prop['chart.needle.type'] == 'triangle') {
    
                co.lineWidth = 0.01;
                co.lineEnd  = 'square';
                co.lineJoin = 'miter';
    
                /**
                * This draws the version of the pointer that becomes the border
                */
                co.beginPath();
                    co.fillStyle = prop['chart.needle.triangle.border'];
                    co.arc(this.centerx, this.centery, 11, (((value / this.range) * 360)) / 57.3, ((((value / this.range) * 360)) + 0.01) / 57.3, 0);
                    co.arc(this.centerx, this.centery, 11, (((value / this.range) * 360) + 180) / 57.3, ((((value / this.range) * 360) + 180) + 0.01)/ 57.3, 0);
                    co.arc(this.centerx, this.centery, length - 5, (((value / this.range) * 360) - 90) / 57.3, ((((value / this.range) * 360) - 90) / 57.3) + 0.01, 0);
                co.closePath();
                co.fill();
    
                co.beginPath();
                co.arc(this.centerx, this.centery, 15, 0, RG.TWOPI, 0);
                co.closePath();
                co.fill();
    
                // This draws the pointer
                co.beginPath();
                co.strokeStyle = 'black';
                co.fillStyle = color;
                co.arc(this.centerx, this.centery, 7, (((value / this.range) * 360)) / 57.3, ((((value / this.range) * 360)) + 0.01) / 57.3, 0);
                co.arc(this.centerx, this.centery, 7, (((value / this.range) * 360) + 180) / 57.3, ((((value / this.range) * 360) + 180) + 0.01)/ 57.3, 0);
                co.arc(this.centerx, this.centery, length - 13, (((value / this.range) * 360) - 90) / 57.3, ((((value / this.range) * 360) - 90) / 57.3) + 0.01, 0);
                co.closePath();
                co.stroke();
                co.fill();


                /**
                * This is here to accommodate the MSIE/ExCanvas combo
                */
                co.beginPath();
                co.arc(this.centerx, this.centery, 7, 0, RG.TWOPI, 0);
                co.closePath();
                co.fill();
            }
    
    
            co.stroke();
            co.fill();
    
            // Draw the mini center circle
            co.beginPath();
            co.fillStyle = color;
            co.arc(this.centerx, this.centery, prop['chart.needle.type'] == 'pointer' ? 7 : 12, 0.01, RG.TWOPI, false);
            co.fill();
    
            // This draws the arrow at the end of the line
            if (prop['chart.needle.head'] && prop['chart.needle.type'] == 'pointer') {
                co.lineWidth = 1;
                co.fillStyle = color;
    
                // round, bevel, miter
                co.lineJoin = 'miter';
                co.lineCap  = 'butt';
    
                co.beginPath();
                    co.arc(this.centerx, this.centery, length - 5, (((value / this.range) * 360) - 90) / 57.3, (((value / this.range) * 360) - 90 + 0.1) / 57.3, false);
    
                    co.arc(this.centerx,
                           this.centery,
                           length - 20,
                           RG.degrees2Radians( ((value / this.range) * 360) - (length < 60 ? 80 : 85) ),
                           RG.degrees2Radians( ((value / this.range) * 360) - (length < 60 ? 100 : 95) ),
                           1);
                co.closePath();
        
                co.fill();
                //co.stroke();
            }


            /**
            * Draw a white circle at the centre
            */
            co.beginPath();
            co.fillStyle = 'gray';
            co.moveTo(this.centerx, this.centery);
            co.arc(this.centerx,this.centery,2,0,6.2795,false);
            co.closePath();
    
            co.fill();
        };








        /**
        * Draws the labels for the Odo
        */
        this.drawLabels =
        this.DrawLabels = function ()
        {
            var centerx    = this.centerx,
                centery    = this.centery,
                r          = this.radius - (prop['chart.labels.margin'] / 2) - 5,
                start      = this.min,
                end        = this.max,
                decimals   = prop['chart.scale.decimals'],
                point      = prop['chart.scale.point'], 
                thousand   = prop['chart.scale.thousand'],
                labels     = prop['chart.labels'],
                units_pre  = prop['chart.scale.units.pre'],
                units_post = prop['chart.scale.units.post'];
    
            co.beginPath();
            co.fillStyle = prop['chart.text.color'];
            
            var textConf = RG.getTextConf({
                object: this,
                prefix: 'chart.labels'
            });

            /**
            * If labels are specified, use those
            */
            if (labels) {
                for (var i=0; i<labels.length; ++i) {

                    RG.text2(this,{
                     
                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:      centerx + (Math.cos(((i / labels.length) * RG.TWOPI) - RG.HALFPI) * (this.radius - (prop['chart.labels.margin'] / 2) ) ), // Sin A = Opp / Hyp
                        y:      centery + (Math.sin(((i / labels.length) * RG.TWOPI) - RG.HALFPI) * (this.radius - (prop['chart.labels.margin'] / 2) ) ), // Cos A = Adj / Hyp
                        text:   String(labels[i]),
                        valign: 'center',
                        halign: 'center',
                        tag:    'labels'
                    });
                }
    
            /**
            * If not, use the maximum value
            */
            } else {

                this.scale2 = RG.getScale2(this, {
                    'scale.max':          this.max,
                    'scale.strict':       true,
                    'scale.min':          this.min,
                    'scale.thousand':     prop['chart.scale.thousand'],
                    'scale.point':        prop['chart.scale.point'],
                    'scale.decimals':     prop['chart.scale.decimals'],
                    'scale.labels.count': 10,
                    'scale.round':        false,
                    'scale.units.pre':    prop['chart.scale.units.pre'],
                    'scale.units.post':   prop['chart.scale.units.post']
                });

                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx + (0.588 * r ),y:centery - (0.809 * r ),text:RG.numberFormat({object: this, number: (((end - start) * (1/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:36,tag: 'scale'});
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx + (0.951 * r ),y:centery - (0.309 * r),text:RG.numberFormat({object: this, number: (((end - start) * (2/10)) + start).toFixed(decimals), unitspre:units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:72,tag: 'scale'});
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx + (0.949 * r),y:centery + (0.31 * r),text:RG.numberFormat({object: this, number: (((end - start) * (3/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:108,tag: 'scale'});
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx + (0.588 * r ),y:centery + (0.809 * r ),text:RG.numberFormat({object: this, number: (((end - start) * (4/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:144,tag: 'scale'});
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx,y:centery + r,text:RG.numberFormat({object: this, number: (((end - start) * (5/10)) + start).toFixed(decimals),unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:180,tag: 'scale'});
    
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx - (0.588 * r ),y:centery + (0.809 * r ),text:RG.numberFormat({object: this, number: (((end - start) * (6/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:216,tag: 'scale'});
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx - (0.949 * r),y:centery + (0.300 * r),text:RG.numberFormat({object: this, number: (((end - start) * (7/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:252,tag: 'scale'});
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx - (0.951 * r),y:centery - (0.309 * r),text:RG.numberFormat({object: this, number: (((end - start) * (8/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:288,tag: 'scale'});
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx - (0.588 * r ),y:centery - (0.809 * r ),text:RG.numberFormat({object: this, number: (((end - start) * (9/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:324,tag: 'scale'});
                RG.text2(this, {font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx,y:centery - r,text: RG.numberFormat({object: this, number: (((end - start) * (10/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',tag: 'scale'});
            }
            
            co.fill();

            /**
            * Draw the text label below the center point
            */
            if (prop['chart.labels.value']) {
                co.strokeStyle = 'black';
    
                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.labels.value'
                });

                RG.text2(this, {

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:            centerx,
                    y:            centery + textConf.size + 15,
                    text:         String(prop['chart.labels.value.units.pre'] + this.value.toFixed(prop['chart.labels.value.decimals']) + prop['chart.labels.value.units.post']),
                    halign:       'center',
                    valign:       'center',
                    bounding:     true,
                    boundingFill: 'rgba(255,255,255,0.7)',
                    boundingStroke: 'rgba(0,0,0,0)',
                    tag:          'value.text'
                });
            }
        };








        /**
        * A placeholder function
        * 
        * @param object The event object
        */
        this.getShape = function (e) {};








        /**
        * This function returns the pertinent value at the point of click
        * 
        * @param object The event object
        */
        this.getValue = function (e)
        {
            var mouseXY = RG.getMouseXY(e)
            var angle   = RG.getAngleByXY(this.centerx, this.centery, mouseXY[0], mouseXY[1]);
                angle  += RG.HALFPI;
            
            if (mouseXY[0] >= this.centerx && mouseXY[1] <= this.centery) {
                angle -= RG.TWOPI;
            }
    
            var value = ((angle / RG.TWOPI) * (this.max - this.min)) + this.min;
    
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
            var mouseXY = RG.getMouseXY(e);
            var radius  = RG.getHypLength(this.centerx, this.centery, mouseXY[0], mouseXY[1]);
    
            if (
                   mouseXY[0] > (this.centerx - this.radius)
                && mouseXY[0] < (this.centerx + this.radius)
                && mouseXY[1] > (this.centery - this.radius)
                && mouseXY[1] < (this.centery + this.radius)
                && radius <= this.radius
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
            * Handle adjusting for the Bar
            */
            if (prop['chart.adjustable'] && RG.Registry.get('chart.adjusting') && RG.Registry.get('chart.adjusting').uid == this.uid) {
                this.value = this.getValue(e);
                RG.clear(ca);
                RG.redrawCanvas(ca);
                RG.fireCustomEvent(this, 'onadjust');
            }
        };








        /**
        * This method returns the appropriate angle for a value
        * 
        * @param number value The value
        */
        this.getAngle = function (value)
        {
            // Higher than max or lower than min
            if (value > this.max || value < this.min) {
                return null;
            }
    
            var angle = (((value - this.min) / (this.max - this.min)) * RG.TWOPI);
                angle -= RG.HALFPI;
    
            return angle;
        };








        /**
        * This allows for easy specification of gradients
        */
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors['chart.colors.green.color']  = RG.arrayClone(prop['chart.colors.green.color']);
                this.original_colors['chart.colors.yellow.color'] = RG.arrayClone(prop['chart.colors.yellow.color']);
                this.original_colors['chart.colors.red.color']    = RG.arrayClone(prop['chart.colors.red.color']);
            }

            // Parse the basic colors
            prop['chart.colors.green.color']  = this.parseSingleColorForGradient(prop['chart.colors.green.color']);
            prop['chart.colors.yellow.color'] = this.parseSingleColorForGradient(prop['chart.colors.yellow.color']);
            prop['chart.colors.red.color']    = this.parseSingleColorForGradient(prop['chart.colors.red.color']);
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
                var grad = co.createRadialGradient(this.centerx, this.centery, 0, this.centerx, this.centery, this.radius);
    
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
        * Odo Grow
        * 
        * This effect gradually increases the represented value
        * 
        * @param              An object of effect properties - eg: {frames: 30}
        * @param function     An optional callback function
        */
        this.grow = function ()
        {
            var obj       = this;
            var opt       = arguments[0] || {};
            var frames    = opt.frames || 30;
            var frame     = 0;
            var current   = obj.currentValue || 0;
            var origValue = Number(obj.currentValue);
            var newValue  = obj.value;
            var diff      = newValue - origValue;
            var step      = (diff / frames);
            var callback  = arguments[1] || function () {};



            function iterator ()
            {
                obj.value = origValue + (frame * step);
    
                RG.clear(obj.canvas);
                RG.redrawCanvas(obj.canvas);
    
                if (frame++ < frames) {
                    RG.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }

            iterator();
            
            return this;
        };








        /**
        * Register the object
        */
        RG.register(this);








        /**
        * This is the 'end' of the constructor so if the first argument
        * contains configuration data - handle that.
        */
        if (parseConfObjectForOptions) {
            RG.parseObjectStyleConfig(this, conf.options);
        }
    };