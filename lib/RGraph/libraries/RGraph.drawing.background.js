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
    
    /**
    * Having this here means that the RGraph libraries can be included in any order, instead of you having
    * to include the common core library first.
    */

    // Define the RGraph global variable
    RGraph = window.RGraph || {isRGraph: true};
    RGraph.Drawing = RGraph.Drawing || {};

    /**
    * The constructor. This function sets up the object. It only takes the ID (the HTML attribute) of the canvas as the
    * first argument - the gutters are set as properties.
    * 
    * @param string id    The canvas tag ID
    */
    RGraph.Drawing.Background = function (conf)
    {
        /**
        * Allow for object config style
        */
        if (   typeof conf === 'object'
            && typeof conf.id === 'string') {

            var id                        = conf.id,
                canvas                    = document.getElementById(id),
                parseConfObjectForOptions = true; // Set this so the config is parsed (at the end of the constructor)
        
        } else {
        
            var id     = conf,
                canvas = document.getElementById(id);
        }




        this.id                = id;
        this.canvas            = document.getElementById(this.id);
        this.context           = this.canvas.getContext('2d');
        this.canvas.__object__ = this;
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false




        // This is a list of new property names that are used now in place of
        // the old names.
        //
        // *** When adding this list to a new chart library don't forget ***
        // *** the bit of code that also goes in the .set() function     ***
        this.propertyNameAliases = {
            //'chart.margin.top':                    'chart.gutter.top',
            //'chart.margin.bottom':                 'chart.gutter.bottom',
            //'chart.margin.left':                   'chart.gutter.left',
            //'chart.margin.right':                  'chart.gutter.right',
            //'chart.background.bars.color1':        'chart.background.barcolor1',
            //'chart.background.bars.color2':        'chart.background.barcolor2',
            //'chart.background.grid.linewidth':     'chart.background.grid.width',
            //'chart.background.grid.hlines.count':  'chart.background.grid.autofit.numhlines',
            //'chart.background.grid.vlines.count':  'chart.background.grid.autofit.numvlines',
            //'chart.xaxis.title':                   'chart.title.xaxis',
            //'chart.xaxis.title.size':              'chart.title.xaxis.size',
            //'chart.xaxis.title.font':              'chart.title.xaxis.font',
            //'chart.xaxis.title.bold':              'chart.title.xaxis.bold',
            //'chart.xaxis.title.x':                 'chart.title.xaxis.x',
            //'chart.xaxis.title.y':                 'chart.title.xaxis.y',
            //'chart.xaxis.title.pos':               'chart.title.xaxis.pos',
            //'chart.yaxis.title':                   'chart.title.yaxis',
            //'chart.yaxis.title.size':              'chart.title.yaxis.size',
            //'chart.yaxis.title.font':              'chart.title.yaxis.font',
            //'chart.yaxis.title.bold':              'chart.title.yaxis.bold',
            //'chart.yaxis.title.color':             'chart.title.yaxis.color',
            //'chart.yaxis.title.x':                 'chart.title.yaxis.x',
            //'chart.yaxis.title.y':                 'chart.title.yaxis.y',
            //'chart.yaxis.title.pos':               'chart.title.yaxis.pos'
            /* [NEW]:[OLD] */
        };




        /**
        * This defines the type of this shape
        */
        this.type = 'drawing.background';


        /**
        * This facilitates easy object identification, and should always be true
        */
        this.isRGraph = true;


        /**
        * This adds a uid to the object that you can use for identification purposes
        */
        this.uid = RGraph.CreateUID();


        /**
        * This adds a UID to the canvas for identification purposes
        */
        this.canvas.uid = this.canvas.uid ? this.canvas.uid : RGraph.createUID();




        /**
        * Some example background properties
        */
        this.properties =
        {
            'chart.background.bars.count':  null,
            'chart.background.bars.color1': 'rgba(0,0,0,0)',
            'chart.background.bars.color2': 'rgba(0,0,0,0)',
            'chart.background.grid':        true,
            'chart.background.grid.color':  '#ddd',
            'chart.background.grid.linewidth':  1,
            'chart.background.grid.vlines': true,
            'chart.background.grid.hlines': true,
            'chart.background.grid.border': true,
            'chart.background.grid.autofit':true,
            'chart.background.grid.hlines.count': 5,
            'chart.background.grid.vlines.count': 20,
            'chart.background.grid.dashed': false,
            'chart.background.grid.dotted': false,
            'chart.background.image':       null,
            'chart.background.image.stretch': true,
            'chart.background.image.x':     null,
            'chart.background.image.y':     null,
            'chart.background.image.w':     null,
            'chart.background.image.h':     null,
            'chart.background.image.align': null,
            'chart.background.color':       null,

            'chart.margin.left':        25,
            'chart.margin.right':       25,
            'chart.margin.top':         25,
            'chart.margin.bottom':      30,

            'chart.text.color':         'black', // Gradients aren't supported for this color
            'chart.text.size':          12,
            'chart.text.font':          'Arial, Verdana, sans-serif',
            'chart.text.bold':          false,
            'chart.text.italic':        false,
            'chart.text.accessible':    true,
            'chart.text.accessible.overflow':      'visible',
            'chart.text.accessible.pointerevents': false,

            'chart.events.click':       null,
            'chart.events.mousemove':   null,

            'chart.tooltips':           null,
            'chart.tooltips.highlight': true,
            'chart.tooltips.event':     'onclick',

            'chart.highlight.stroke':       'rgba(0,0,0,0)',
            'chart.highlight.fill':         'rgba(255,255,255,0.7)',

            'chart.linewidth':          1,

            'chart.title':            '',
            'chart.title.background': null, // Gradients aren't supported for this color
            'chart.title.hpos':       null,
            'chart.title.vpos':       null,
            'chart.title.font':       null,
            'chart.title.size':       null,
            'chart.title.color':      null,
            'chart.title.bold':       null,
            'chart.title.italic':     null,
            'chart.title.x':          null,
            'chart.title.y':          null,
            'chart.title.halign':     null,
            'chart.title.valign':     null,
            
            'chart.xaxis.title':      '',
            'chart.xaxis.title.bold':   null,
            'chart.xaxis.title.italic': null,
            'chart.xaxis.title.size':   null,
            'chart.xaxis.title.font':   null,
            'chart.xaxis.title.color':  null,
            'chart.xaxis.title.x':      null,
            'chart.xaxis.title.y':      null,
            'chart.xaxis.title.pos':    null,
            
            'chart.yaxis.title':       '',
            'chart.yaxis.title.bold':  null,
            'chart.yaxis.title.size':  null,
            'chart.yaxis.title.font':  null,
            'chart.yaxis.title.color': null,
            'chart.yaxis.title.italic':null,
            'chart.yaxis.title.x':     null,
            'chart.yaxis.title.y':     null,
            'chart.yaxis.title.pos':   null,

            'chart.clearto':          'rgba(0,0,0,0)'
        }





        /**
        * A simple check that the browser has canvas support
        */
        if (!this.canvas) {
            alert('[DRAWING.BACKGROUND] No canvas support');
            return;
        }



        /**
        * Create the dollar object so that functions can be added to them
        */
        this.$0 = {};



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
            pa   = RG.Path,
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
        * A setter method for setting graph properties. It can be used like this: obj.Set('chart.strokestyle', '#666');
        * 
        * @param name  string The name of the property to set OR it can be a map
        *                     of name/value settings like what you set in the constructor
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
        * A getter method for retrieving graph properties. It can be used like this: obj.Get('chart.strokestyle');
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

            return prop[name.toLowerCase()];
        };








        /**
        * Draws the circle
        */
        this.draw =
        this.Draw = function ()
        {
            /**
            * Fire the onbeforedraw event
            */
            RG.fireCustomEvent(this, 'onbeforedraw');

            
            /***********************
            * DRAW BACKGROUND HERE *
            ***********************/
            this.marginLeft   = prop['chart.margin.left'];
            this.marginRight  = prop['chart.margin.right'];
            this.marginTop    = prop['chart.margin.top'];
            this.marginBottom = prop['chart.margin.bottom'];
    
    
            /**
            * Parse the colors. This allows for simple gradient syntax
            */
            if (!this.colorsParsed) {
    
                this.parseColors();
    
                // Don't want to do this again
                this.colorsParsed = true;
            }

            /**
            * Set the shadow
            */
            RG.drawBackgroundImage(this);
            RG.Background.draw(this);

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
            * Fire the ondraw event
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
        * The getObjectByXY() worker method
        */
        this.getObjectByXY = function (e)
        {
            if (this.getShape(e)) {
                return this;
            }
        };








        /**
        * Not used by the class during creating the shape, but is used by event handlers
        * to get the coordinates (if any) of the selected bar
        * 
        * @param object e The event object
        * @param object   OPTIONAL You can pass in the bar object instead of the
        *                          function using "this"
        */
        this.getShape = function (e)
        {
            var mouseXY = RG.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1];

            if (
                   mouseX >= this.marginLeft
                && mouseX <= (ca.width - this.marginRight)
                && mouseY >= this.marginTop
                && mouseY <= (ca.height - this.marginBottom)
               ) {

                var tooltip = prop['chart.tooltips'] ? prop['chart.tooltips'][0] : null
                
                return {
                    0: this, 1: 0 /* the index */, 2: tooltip,
                    'object': this,'index': 0, 'tooltip': tooltip
                };
            }
            
            return null;
        };








        /**
        * Each object type has its own Highlight() function which highlights the appropriate shape
        * 
        * @param object shape The shape to highlight
        */
        this.highlight =
        this.Highlight = function (shape)
        {
            if (prop['chart.tooltips.highlight']) {
                if (typeof prop['chart.highlight.style'] === 'function') {
                    (prop['chart.highlight.style'])(shape);
                } else {
                    pa2(co,
                        'b r % % % % f % s %',
                        prop['chart.margin.left'],
                        prop['chart.margin.top'],
                        ca.width - prop['chart.margin.left'] - prop['chart.margin.right'],
                        ca.height - prop['chart.margin.top'] - prop['chart.margin.bottom'],
                        prop['chart.highlight.fill'],
                        prop['chart.highlight.stroke']
                    );
                }
            }
        };








        /**
        * This allows for easy specification of gradients
        */
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors['chart.background.color']      = RG.arrayClone(prop['chart.background.color']);
                this.original_colors['chart.background.grid.color'] = RG.arrayClone(prop['chart.background.grid.color']);
                this.original_colors['chart.highlight.stroke']      = RG.arrayClone(prop['chart.highlight.stroke']);
                this.original_colors['chart.highlight.fill']        = RG.arrayClone(prop['chart.highlight.fill']);
            }





            /**
            * Parse various properties for colors
            */
            prop['chart.background.color']      = this.parseSingleColorForGradient(prop['chart.background.color']);
            prop['chart.background.grid.color'] = this.parseSingleColorForGradient(prop['chart.background.grid.color']);
            prop['chart.highlight.stroke']      = this.parseSingleColorForGradient(prop['chart.highlight.stroke']);
            prop['chart.highlight.fill']        = this.parseSingleColorForGradient(prop['chart.highlight.fill']);
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
            if (!color) {
                return color;
            }

            if (typeof color === 'string' && color.match(/^gradient\((.*)\)$/i)) {

                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                // Split and create the gradient
                var parts = RegExp.$1.split(':'),
                    grad = co.createLinearGradient(
                        this.marginLeft,
                        this.marginTop,
                        ca.width - this.marginRight,
                        ca.height - this.marginRight
                    ),
                    diff = 1 / (parts.length - 1);
    
                //grad.addColorStop(0, RG.trim(parts[0]));
    
                for (var j=0; j<parts.length; j+=1) {
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
        * Objects are now always registered so that the chart is redrawn if need be.
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