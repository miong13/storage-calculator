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

    RGraph     = window.RGraph || {isRGraph: true};
    RGraph.SVG = RGraph.SVG || {};

// Module pattern
(function (win, doc, undefined)
{
    var RG  = RGraph,
        ua  = navigator.userAgent,
        ma  = Math,
        win = window,
        doc = document;



    RG.SVG.SemiCircularProgress = function (conf)
    {
        //
        // A setter that the constructor uses (at the end)
        // to set all of the properties
        //
        // @param string name  The name of the property to set
        // @param string value The value to set the property to
        //
        this.set = function (name, value)
        {
            if (arguments.length === 1 && typeof name === 'object') {
                for (i in arguments[0]) {
                    if (typeof i === 'string') {
                        
                        name  = ret.name;
                        value = ret.value;

                        this.set(name, value);
                    }
                }
            } else {

                    
                var ret = RG.SVG.commonSetter({
                    object: this,
                    name:   name,
                    value:  value
                });
                
                name  = ret.name;
                value = ret.value;

                this.properties[name] = value;

                // If setting the colors, update the originalColors
                // property too
                if (name === 'colors') {
                    this.originalColors = RG.SVG.arrayClone(value);
                    this.colorsParsed = false;
                }
            }

            return this;
        };








        /**
        * A getter.
        * 
        * @param name  string The name of the property to get
        */
        this.get = function (name)
        {
            return this.properties[name];
        };








        this.min             = RG.SVG.stringsToNumbers(conf.min);
        this.max             = RG.SVG.stringsToNumbers(conf.max);
        this.value           = RG.SVG.stringsToNumbers(conf.value);
        this.id              = conf.id;
        this.uid             = RG.SVG.createUID();
        this.container       = document.getElementById(this.id);
        this.layers          = {}; // MUST be before the SVG tag is created!
        this.svg             = RG.SVG.createSVG({object: this,container: this.container});
        this.isRGraph        = true;
        this.width           = Number(this.svg.getAttribute('width'));
        this.height          = Number(this.svg.getAttribute('height'));
        this.data            = conf.data;
        this.type            = 'semicircularprogress';
        this.colorsParsed    = false;
        this.originalColors  = {};
        this.gradientCounter = 1;
        this.nodes           = {};
        this.shadowNodes     = [];

        // Bounds checking
        if (this.value > this.max) this.value = this.max;
        if (this.value < this.min) this.value = this.min;






        // This is a list of new property names that are used now in place of
        // the old names.
        //
        // *** When adding this list to a new chart library don't forget ***
        // *** the bit of code that also goes in the .set() function     ***
        this.propertyNameAliases = {
            //marginTop:     'gutterLeft',
            //marginBottom:  'gutterRight',
            //marginLeft:    'gutterTop',
            //marginRight:   'gutterBottom',
            //colorsStroke:  'strokestyle',
            //scaleUnitsPre:  'unitsPre',
            //scaleUnitsPost: 'unitsPost'
            /* [NEW]:[OLD] */
        };






        // Add this object to the ObjectRegistry
        RG.SVG.OR.add(this);

        // Set the DIV container to be inline-block
        this.container.style.display = 'inline-block';

        this.properties =
        {
            centerx: null,
            centery: null,
            radius:  null,
            
            width: 60,

            marginLeft:    35,
            marginRight:   35,
            marginTop:     35,
            marginBottom:  35,

            backgroundStrokeLinewidth: 0.25,
            backgroundStroke:          'gray',
            backgroundFill:            'Gradient(white:#aaa)',
            backgroundFillOpacity:     0.25,

            colors: ['#0c0'],
            colorsStroke: '#666',

            textColor:      'black',
            textFont:       'Arial, Verdana, sans-serif',
            textSize:       12,
            textBold:       false,
            textItalic:     false,

            scaleUnitsPre:  '',
            scaleUnitsPost: '',
            scalePoint:     '.',
            scaleThousand:  ',',
            scaleDecimals:  0,
            scaleFormatter: null,
            
            labelsMin:          true,
            labelsMinSpecific:  null,
            labelsMinPoint:     null,
            labelsMinThousand:  null,
            labelsMinFormatter: null,
            labelsMinFont:      null,
            labelsMinSize:      null,
            labelsMinBold:      null,
            labelsMinItalic:    null,
            labelsMinColor:     null,
            labelsMinDecimals:  null,
            labelsMinUnitsPre:  null,
            labelsMinUnitsPost: null,
            
            labelsMax:          true,
            labelsMaxSpecific:  null,
            labelsMaxPoint:     null,
            labelsMaxThousand:  null,
            labelsMaxFormatter: null,
            labelsMaxFont:      null,
            labelsMaxSize:      null,
            labelsMaxBold:      null,
            labelsMaxItalic:    null,
            labelsMaxColor:     null,
            labelsMaxDecimals:  null,
            labelsMaxUnitsPre:  null,
            labelsMaxUnitsPost: null,
            
            labelsCenter:          true,
            labelsCenterSpecific:  null,
            labelsCenterPoint:     null,
            labelsCenterThousand:  null,
            labelsCenterFormatter: null,
            labelsCenterFont:      null,
            labelsCenterSize:      40,
            labelsCenterBold:      true,
            labelsCenterItalic:    null,
            labelsCenterColor:     null,
            labelsCenterDecimals:  null,
            labelsCenterUnitsPre:  null,
            labelsCenterUnitsPost: null,
            
            linewidth: 0,

            tooltips: null,
            tooltipsOverride: null,
            tooltipsEffect: 'fade',
            tooltipsCssClass: 'RGraph_tooltip',
            tooltipsEvent: 'click',

            highlightStroke: 'rgba(0,0,0,0)',
            highlightFill: 'rgba(255,255,255,0.7)',
            highlightLinewidth: 1,

            title: '',
            titleX: null,
            titleY: null,
            titleHalign: 'center',
            titleValign: null,
            titleFont:   null,
            titleSize:   null,
            titleColor:  null,
            titleBold:   null,
            titleItalic: null,

            titleSubtitle: null,
            titleSubtitleX: null,
            titleSubtitleY: null,
            titleSubtitleHalign: 'center',
            titleSubtitleValign: null,
            titleSubtitleSize:   null,
            titleSubtitleColor:  '#aaa',
            titleSubtitleFont:   null,
            titleSubtitleBold:   null,
            titleSubtitleItalic: null

            //shadow: false,
            //shadowOffsetx: 2,
            //shadowOffsety: 2,
            //shadowBlur: 2,
            //shadowOpacity: 0.25
        };




        //
        // Copy the global object properties to this instance
        //
        RG.SVG.getGlobals(this);





        /**
        * "Decorate" the object with the generic effects if the effects library has been included
        */
        if (RG.SVG.FX && typeof RG.SVG.FX.decorate === 'function') {
            RG.SVG.FX.decorate(this);
        }




        var prop = this.properties;








        //
        // The draw method draws the Bar chart
        //
        this.draw = function ()
        {
            // Fire the beforedraw event
            RG.SVG.fireCustomEvent(this, 'onbeforedraw');


            // Reset this to prevent it from growing
            this.nodes = {};

            // Should the first thing that's done inthe.draw() function
            // except for the onbeforedraw event
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));



            // Create the defs tag if necessary
            RG.SVG.createDefs(this);



            // Add these
            this.graphWidth  = this.width - prop.marginLeft - prop.marginRight;
            this.graphHeight = this.height - prop.marginTop - prop.marginBottom;



            // Work out the center point
            this.centerx = (this.graphWidth / 2) + prop.marginLeft;
            this.centery = this.height - prop.marginBottom;
            this.radius  = ma.min(this.graphWidth / 2, this.graphHeight);



            // Allow the user to override the calculated centerx/y/radius
            this.centerx = typeof prop.centerx === 'number' ? prop.centerx : this.centerx;
            this.centery = typeof prop.centery === 'number' ? prop.centery : this.centery;
            this.radius  = typeof prop.radius  === 'number' ? prop.radius  : this.radius;

            //
            // Allow the centerx/centery/radius to be a plus/minus
            //
            if (typeof prop.radius  === 'string' && prop.radius.match(/^\+|-\d+$/) )   this.radius  += parseFloat(prop.radius);
            if (typeof prop.centerx === 'string' && prop.centerx.match(/^\+|-\d+$/) ) this.centerx += parseFloat(prop.centerx);
            if (typeof prop.centery === 'string' && prop.centery.match(/^\+|-\d+$/) ) this.centery += parseFloat(prop.centery);
            
            // Set the width of the meter
            this.progressWidth = prop.width || (this.radius / 3);
            
            
            
            // Parse the colors for gradients
            RG.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();





            // Draw the segments
            this.path = this.drawMeter();



            // Draw the title and subtitle
            RG.SVG.drawTitle(this);



            // Draw the labels
            this.drawLabels();
            
            

            
            
            // Add the attribution link. If you're adding this elsewhere on your page/site
            // and you don't want it displayed then there are options available to not
            // show it.
            RG.SVG.attribution(this);



            // Add the tooltip event listener
            if (!RG.SVG.isNull(prop.tooltips) && prop.tooltips[0]) {

                var obj = this;

                //
                // Add tooltip event listeners
                //
                this.path.addEventListener(prop.tooltipsEvent, function (e)
                {
                    obj.removeHighlight();
                
                    // Show the tooltip
                    RG.SVG.tooltip({
                        object: obj,
                        index: 0,
                        group: null,
                        sequentialIndex: 0,
                        text: prop.tooltips[0],
                        event: e
                    });
                    
                    // Highlight the rect that has been clicked on
                    obj.highlight(e.target);
                }, false);
                
                this.path.addEventListener('mousemove', function (e)
                {
                    e.target.style.cursor = 'pointer'
                }, false);
            }


            // Add the event listener that clears the highlight if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            var obj = this;
            doc.body.addEventListener('mousedown', function (e)
            {
                obj.removeHighlight();
            }, false);



            // Fire the draw event
            RG.SVG.fireCustomEvent(this, 'ondraw');



            return this;
        };








        //
        // Draws the meter
        //
        this.drawMeter = function ()
        {
            //
            // Draw the background to the meter
            //
            var path = RG.SVG.TRIG.getArcPath({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius,
                start: RG.SVG.TRIG.PI + RG.SVG.TRIG.HALFPI,
                end: RG.SVG.TRIG.HALFPI,
                anticlockwise: false
            }); 
            
            var path2 = RG.SVG.TRIG.getArcPath({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius - this.progressWidth,
                end: RG.SVG.TRIG.PI + RG.SVG.TRIG.HALFPI,
                start: RG.SVG.TRIG.HALFPI,
                anticlockwise: true,
                moveto: false
            });

            // This element is repeated AFTER the green bar that indicates
            // the value so that the stroke appears AFTER the indicator bar
            var background = RG.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.svg.all,
                attr: {
                    d: path + " L " + (this.centerx + this.radius - this.progressWidth)  + " " + this.centery + path2 + " L " + (this.centerx - this.radius) + " " + this.centery,
                    fill:           prop.backgroundFill || prop.colors[0],
                    'stroke-width': 0,
                    'fill-opacity': prop.backgroundFillOpacity
                }
            });
            
            // Store a reference to the background
            this.nodes.background = background;



            //
            // This draws the bar that indicates the value
            //
            var angle = ((this.value - this.min) / (this.max - this.min)) * RG.SVG.TRIG.PI; // Because the Meter is always a semi-circle

            // Take off half a pi because our origin is the noth axis
            angle -= RG.SVG.TRIG.HALFPI;


            // Now get the path of the inner indicator bar
            var path = RG.SVG.TRIG.getArcPath({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius,
                start: RG.SVG.TRIG.PI + RG.SVG.TRIG.HALFPI,
                end: angle,
                anticlockwise: false
            });
            
            var path2 = RG.SVG.TRIG.getArcPath({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius - this.progressWidth,
                start: angle,
                end: angle,
                anticlockwise: false,
                array: true
            });

            var path3 = RG.SVG.TRIG.getArcPath({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius - this.progressWidth,
                start: angle,
                end: RG.SVG.TRIG.PI + RG.SVG.TRIG.HALFPI,
                anticlockwise: true,
                moveto: false
            });
            

            // Create a group for the indicator bar. At a later point any
            //highlight can be also appended to this group
            var group = RG.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svg.all,
                attr: {
                    id: 'indicator-bar-group'
                }
            });

            // Now draw the path
            var path = RG.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: group,
                attr: {
                    d: path + " L{1} {2} ".format(
                        path2[1],
                        path2[2]
                    ) + path3 + ' z',
                    fill: prop.colors[0],
                    stroke: 'black',
                    'stroke-width': prop.linewidth
                }
            });

            // Store a reference to the bar in the nodes array and the
            // group as well. If necessary any highlight thats later
            // added can be appended to this group
            this.nodes.barGroup = group;
            this.nodes.bar      = path;
            
            // This node is added so that the background stroke appears
            // ABOVE the coloured indicator bar
            var backgroundStroke = RG.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.svg.all,
                attr: {
                    d:              this.nodes.background.getAttribute('d'),
                    stroke:         prop.backgroundStroke,
                    fill:           'rgba(0,0,0,0)',
                    'stroke-width':  prop.backgroundStrokeLinewidth,
                    'stroke-linecap': 'square'
                },
                style: {
                    pointerEvents: 'none'
                }
            });
            
            this.nodes.backgroundStroke = backgroundStroke;

            return path;
        };








        //
        // Draw the labels
        //
        this.drawLabels = function ()
        {
            // Draw the min label
            if (prop.labelsMin) {

                var min = RG.SVG.numberFormat({
                    object:    this,
                    num:       this.min.toFixed(typeof prop.labelsMinDecimals === 'number' ? prop.labelsMinDecimals : prop.scaleDecimals),
                    prepend:   typeof prop.labelsMinUnitsPre  === 'string'   ? prop.labelsMinUnitsPre  : prop.scaleUnitsPre,
                    append:    typeof prop.labelsMinUnitsPost === 'string'   ? prop.labelsMinUnitsPost : prop.scaleUnitsPost,
                    point:     typeof prop.labelsMinPoint     === 'string'   ? prop.labelsMinPoint     : prop.scalePoint,
                    thousand:  typeof prop.labelsMinThousand  === 'string'   ? prop.labelsMinThousand  : prop.scaleThousand,
                    formatter: typeof prop.labelsMinFormatter === 'function' ? prop.labelsMinFormatter : prop.scaleFormatter
                });

                var text = RG.SVG.text({
                    object: this,
                    parent: this.svg.all,
                    tag: 'labels.min',
                    text: typeof prop.labelsMinSpecific === 'string' ? prop.labelsMinSpecific : min,
                    x: this.centerx - this.radius + (this.progressWidth / 2),
                    y: this.centery + 5 + prop.backgroundStrokeLinewidth,
                    valign: 'top',
                    halign: 'center',

                    font:   prop.labelsMinFont   || prop.textFont,
                    size:   typeof prop.labelsMinSize === 'number' ? prop.labelsMinSize : prop.textSize,
                    bold:   typeof prop.labelsMinBold === 'boolean' ? prop.labelsMinBold : prop.textBold,
                    italic: typeof prop.labelsMinItalic === 'boolean' ? prop.labelsMinItalic : prop.textItalic,
                    color:  prop.labelsMinColor  || prop.textColor
                });
                
                this.nodes.labelsMin = text;
            }







            // Draw the max label
            if (prop.labelsMax) {

                var max = RG.SVG.numberFormat({
                    object:    this,
                    num:       this.max.toFixed(typeof prop.labelsMaxDecimals === 'number' ? prop.labelsMaxDecimals : prop.scaleDecimals),
                    prepend:   typeof prop.labelsMaxUnitsPre  === 'string'   ? prop.labelsMaxUnitsPre  : prop.scaleUnitsPre,
                    append:    typeof prop.labelsMaxUnitsPost === 'string'   ? prop.labelsMaxUnitsPost : prop.scaleUnitsPost,
                    point:     typeof prop.labelsMaxPoint     === 'string'   ? prop.labelsMaxPoint     : prop.scalePoint,
                    thousand:  typeof prop.labelsMaxThousand  === 'string'   ? prop.labelsMaxThousand  : prop.scaleThousand,
                    formatter: typeof prop.labelsMaxFormatter === 'function' ? prop.labelsMaxFormatter : prop.scaleFormatter
                });

                var text = RG.SVG.text({
                    object: this,
                    parent: this.svg.all,
                    tag:    'labels.max',
                    text:   typeof prop.labelsMaxSpecific === 'string' ? prop.labelsMaxSpecific : max,
                    
                    x:      this.centerx + this.radius - (this.progressWidth / 2),
                    y:      this.centery + 5 + prop.backgroundStrokeLinewidth,
                    
                    valign: 'top',
                    halign: 'center',

                    font:   prop.labelsMaxFont   || prop.textFont,
                    size:   typeof prop.labelsMaxSize === 'number' ? prop.labelsMaxSize : prop.textSize,
                    bold:   typeof prop.labelsMaxBold === 'boolean' ? prop.labelsMaxBold : prop.textBold,
                    italic: typeof prop.labelsMaxItalic === 'boolean' ? prop.labelsMaxItalic : prop.textItalic,
                    color:  prop.labelsMaxColor  || prop.textColor
                });
                
                // Store a reference to the text node
                this.nodes.labelsMax = text;
            }







             // Draw the center label
            if (prop.labelsCenter) {

                var center = RG.SVG.numberFormat({
                    object:    this,
                    num:       this.value.toFixed(typeof prop.labelsCenterDecimals === 'number' ? prop.labelsCenterDecimals : prop.scaleDecimals),
                    prepend:   typeof prop.labelsCenterUnitsPre  === 'string' ? prop.labelsCenterUnitsPre  : prop.scaleUnitsPre,
                    append:    typeof prop.labelsCenterUnitsPost === 'string' ? prop.labelsCenterUnitsPost : prop.scaleUnitsPost,
                    point:     typeof prop.labelsCenterPoint     === 'string' ? prop.labelsCenterPoint     : prop.scalePoint,
                    thousand:  typeof prop.labelsCenterThousand  === 'string' ? prop.labelsCenterThousand  : prop.scaleThousand,
                    formatter: typeof prop.labelsCenterFormatter === 'function' ? prop.labelsCenterFormatter : prop.scaleFormatter
                });

                var text = RG.SVG.text({
                    object: this,
                    parent: this.svg.all,
                    tag:    'labels.center',
                    text:   typeof prop.labelsCenterSpecific === 'string' ? prop.labelsCenterSpecific : center,
                    x:      this.centerx,
                    y:      this.centery,
                    valign: 'bottom',
                    halign: 'center',
                    font:   prop.labelsCenterFont   || prop.textFont,
                    size:   typeof prop.labelsCenterSize === 'number' ? prop.labelsCenterSize : prop.textSize,
                    bold:   typeof prop.labelsCenterBold === 'boolean' ? prop.labelsCenterBold : prop.textBold,
                    italic: typeof prop.labelsCenterItalic === 'boolean' ? prop.labelsCenterItalic : prop.textItalic,
                    color:  prop.labelsCenterColor  || prop.textColor
                });
                
                // Store a reference to the center label
                this.nodes.labelsCenter = text;
            }
        };








        /**
        * This function can be used to highlight a segment on the chart
        *
        * @param object segment The segment to highlight
        */
        this.highlight = function (segment)
        {
            // Remove any highlight that's already been
            // installed
            this.removeHighlight();

            var highlight = RG.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.nodes.barGroup,
                attr: {
                    d: this.path.getAttribute('d'),
                    fill: prop.highlightFill,
                    stroke: prop.highlightStroke,
                    'stroke-width': prop.highlightLinewidth
                },
                style: {
                    pointerEvents: 'none'
                }
            });
            
            // Store the highlight node in the registry
            RG.SVG.REG.set('highlight', highlight);

            // Add the event listener that clears the highlight path if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            var obj = this;
            doc.body.addEventListener('mousedown', function (e)
            {
                obj.removeHighlight();

            }, false);
        };








        /**
        * This function can be used to remove the highlight that is added
        * by tooltips
        */
        this.removeHighlight = function ()
        {
            var highlight = RG.SVG.REG.get('highlight');

            if (highlight) {
                highlight.parentNode.removeChild(highlight);
                highlight = null;
            }
        };








        /**
        * This allows for easy specification of gradients
        */
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:          RG.SVG.arrayClone(prop.colors),
                    highlightFill:   RG.SVG.arrayClone(prop.highlightFill),
                    backgroundColor: RG.SVG.arrayClone(prop.backgroundColor)
                }
            }


            // colors
            var colors = prop.colors;

            if (colors) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RG.SVG.parseColorLinear({
                        object: this,
                         color: colors[i],
                         start: this.centerx - this.radius,
                           end: this.centerx + this.radius,
                           direction: 'horizontal'
                    });
                }
            }

            // Highlight fill
            prop.highlightFill = RG.SVG.parseColorLinear({
                object: this,
                color: prop.highlightFill,
                start: prop.marginLeft,
                  end: this.width - prop.marginRight,
                direction: 'horizontal'
            });
            
            // Background color

            // Background color
            prop.backgroundColor = RG.SVG.parseColorLinear({
                object: this,
                color: prop.backgroundColor,
                start: prop.marginLeft,
                  end: this.width - prop.marginRight,
                  direction: 'horizontal'
            });
        };








        //
        // The Bar chart grow effect
        //
        this.grow = function ()
        {
            var opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                obj      = this,
                value    = opt.value;

            //
            // Copy the data
            //
            value = this.value;

            this.draw();

            var iterate = function ()
            {
                var   multiplier = frame / frames
                    * RG.SVG.FX.getEasingMultiplier(frames, frame)
                    * RG.SVG.FX.getEasingMultiplier(frames, frame);

                obj.value = value * multiplier;
                
                RG.SVG.redraw();

                if (frame++ < frames) {
                    RG.SVG.FX.update(iterate);
                } else if (opt.callback) {
                    obj.value = value;
                    RG.SVG.redraw();
                    (opt.callback)(obj);
                }
            };

            iterate();
            
            return this;
        };








        /**
        * Using a function to add events makes it easier to facilitate method
        * chaining
        *
        * @param string   type The type of even to add
        * @param function func
        */
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }

            RG.SVG.addCustomEventListener(this, type, func);

            return this;
        };








        //
        // Used in chaining. Runs a function there and then - not waiting for
        // the events to fire (eg the onbeforedraw event)
        //
        // @param function func The function to execute
        //
        this.exec = function (func)
        {
            func(this);

            return this;
        };








        //
        // Remove highlight from the chart (tooltips)
        //
        this.removeHighlight = function ()
        {
            var highlight = RG.SVG.REG.get('highlight');
            if (highlight && highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
            }
            
            RG.SVG.REG.set('highlight', null);
        };








        //
        // Set the options that the user has provided
        //
        for (i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }
    };
    
    
    
    return this;




// End module pattern
})(window, document);