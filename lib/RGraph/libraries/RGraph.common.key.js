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

    RGraph      = window.RGraph || {isRGraph: true};
    RGraph.HTML = RGraph.HTML || {};

// Module pattern
(function (win, doc, undefined)
{
    var RG = RGraph,
        ua = navigator.userAgent,
        ma = Math;




    /**
    * Draws the graph key (used by various graphs)
    * 
    * @param object obj The graph object
    * @param array  key An array of the texts to be listed in the key
    * @param colors An array of the colors to be used
    */
    RG.drawKey =
    RG.DrawKey = function (obj, key, colors)
    {
        if (!key) {
            return;
        }

        var ca   = obj.canvas,
            co   = obj.context,
            prop = obj.properties,

            // Key positioned in the margin
            keypos   = prop['chart.key.position'],
            textsize = prop['chart.text.size'],
            key_non_null    = [],
            colors_non_null = [];

        co.lineWidth = 1;

        co.beginPath();

        /**
        * Change the older chart.key.vpos to chart.key.position.y
        */
        if (typeof(prop['chart.key.vpos']) == 'number') {
            obj.set('chart.key.position.y', prop['chart.key.vpos'] * obj.get('chart.margin.top'));
        }

        /**
        * Account for null values in the key
        */
        for (var i=0; i<key.length; ++i) {
            if (key[i] != null) {
                colors_non_null.push(colors[i]);
                key_non_null.push(key[i]);
            }
        }
        
        key    = key_non_null;
        colors = colors_non_null;
        
        // The key does not use accessible text
        var textAccessible = false;
        
        if (typeof prop['chart.key.text.accessible'] === 'boolean') {
            textAccessible = prop['chart.key.text.accessible'];
        }



























        /**
        * This does the actual drawing of the key when it's in the graph
        * 
        * @param object obj The graph object
        * @param array  key The key items to draw
        * @param array colors An aray of colors that the key will use
        */
        function DrawKey_graph (obj, key, colors)
        {
            var marginLeft   = obj.marginLeft,
                marginRight  = obj.marginRight,
                marginTop    = obj.marginTop,
                marginBottom = obj.marginBottom,
                hpos         = prop['chart.yaxis.position'] == 'right' ? marginLeft + 10 : ca.width - marginRight - 10,
                vpos         = marginTop + 10,
                title        = prop['chart.title'],
                hmargin      = 8, // This is the size of the gaps between the blob of color and the text
                vmargin      = 4, // This is the vertical margin of the key
                fillstyle    = prop['chart.key.background'],
                strokestyle  = '#333',
                height       = 0,
                width        = 0;
                
                // Get the text configuration
                var textConf = RG.getTextConf({
                    object: obj,
                    prefix: 'chart.key.labels'
                });

            blob_size = textConf.size; // The blob of color
            text_size = textConf.size;

            if (!obj.coords) obj.coords = {};
            obj.coords.key = [];

            // Need to set this so that measuring the text works out OK
            co.font = (textConf.italic ? 'italic ' : '') +
                      (textConf.bold ? 'bold ' : '') +
                      textConf.size + 'pt ' +
                      textConf.font;
    
            // Work out the longest bit of text
            for (i=0; i<key.length; ++i) {
                width = Math.max(
                    width,
                    co.measureText(key[i]).width);
            }
    
            width += 5;
            width += blob_size;
            width += 5;
            width += 5;
            width += 5;
    
            /**
            * Now we know the width, we can move the key left more accurately
            */
            if (   prop['chart.yaxispos'] == 'left'
                || (obj.type === 'pie' && !prop['chart.yaxis.position'])
                || (obj.type === 'hbar' && !prop['chart.yaxis.position'])
                || (obj.type === 'hbar' && prop['chart.yaxis.position'] === 'center')
                || (obj.type === 'hbar' && prop['chart.yaxis.position'] === 'right')
                || (obj.type === 'rscatter' && !prop['chart.yaxis.position'])
                || (obj.type === 'radar' && !prop['chart.yaxis.position'])
                || (obj.type === 'rose' && !prop['chart.yaxis.position'])
                || (obj.type === 'funnel' && !prop['chart.yaxis.position'])
                || (obj.type === 'vprogress' && !prop['chart.yaxis.position'])
                || (obj.type === 'hprogress' && !prop['chart.yaxis.position'])
               ) {

                hpos -= width;
            }

            /**
            * Horizontal alignment
            */
            if (typeof(prop['chart.key.halign']) == 'string') {
                if (prop['chart.key.halign'] == 'left') {
                    hpos = marginLeft + 10;
                } else if (prop['chart.key.halign'] == 'right') {
                    hpos = ca.width - marginRight  - width;
                }
            }
    
            /**
            * Specific location coordinates
            */
            if (typeof(prop['chart.key.position.x']) == 'number') {
                hpos = prop['chart.key.position.x'];
            }
            
            if (typeof(prop['chart.key.position.y']) == 'number') {
                vpos = prop['chart.key.position.y'];
            }
    
    
            // Stipulate the shadow for the key box
            if (prop['chart.key.shadow']) {
                co.shadowColor   = prop['chart.key.shadow.color'];
                co.shadowBlur    = prop['chart.key.shadow.blur'];
                co.shadowOffsetX = prop['chart.key.shadow.offsetx'];
                co.shadowOffsetY = prop['chart.key.shadow.offsety'];
            }
    
    
    
    
            // Draw the box that the key resides in
            co.beginPath();
                co.fillStyle   = prop['chart.key.background'];
                co.strokeStyle = 'black';

            if (typeof(prop['chart.key.position.graph.boxed']) == 'undefined' || (typeof(prop['chart.key.position.graph.boxed']) == 'boolean' && prop['chart.key.position.graph.boxed']) ) {
                if (arguments[3] != false) {
        
                    co.lineWidth = typeof(prop['chart.key.linewidth']) == 'number' ? prop['chart.key.linewidth'] : 1;
    
                    // The older square rectangled key
                    if (prop['chart.key.rounded'] == true) {
                        co.beginPath();
                            co.strokeStyle = strokestyle;
                            RG.strokedCurvyRect(co, Math.round(hpos), Math.round(vpos), width - 5, 5 + ( (text_size + 5) * RG.getKeyLength(key)),4);
                        co.stroke();
                        co.fill();
    
                        RG.NoShadow(obj);
                
                    } else {
                        co.strokeRect(Math.round(hpos), Math.round(vpos), width - 5, 5 + ( (text_size + 5) * RG.getKeyLength(key)));
                        co.fillRect(Math.round(hpos), Math.round(vpos), width - 5, 5 + ( (text_size + 5) * RG.getKeyLength(key)));
                    }
                }
            }

            RG.NoShadow(obj);
    
            co.beginPath();
    
                /**
                * Custom colors for the key
                */
                if (prop['chart.key.colors']) {
                    colors = prop['chart.key.colors'];
                }

    
    
                ////////////////////////////////////////////////////////////////////////////////////////////
    
    

                // Draw the labels given
                for (var i=key.length - 1; i>=0; i--) {

                    var j = Number(i) + 1;

                    /**
                    * Draw the blob of color
                    */
                    // An array element, string
                    if (typeof prop['chart.key.color.shape'] === 'object' && typeof prop['chart.key.color.shape'][i] === 'string') {
                        var blob_shape = prop['chart.key.color.shape'][i];
                    
                    // An array element, function
                    } else if (typeof prop['chart.key.color.shape'] === 'object' && typeof prop['chart.key.color.shape'][i] === 'function') {
                        var blob_shape = prop['chart.key.color.shape'][i];
                    
                    // No array - just a string
                    } else if (typeof prop['chart.key.color.shape'] === 'string') {
                        var blob_shape = prop['chart.key.color.shape'];
                    
                    // No array - just a function
                    } else if (typeof prop['chart.key.color.shape'] === 'function') {
                        var blob_shape = prop['chart.key.color.shape'];

                    // Unknown
                    } else {
                        var blob_shape = 'rect';
                    }

                    if (blob_shape == 'circle') {
                        co.beginPath();
                            co.fillStyle = colors[i];
                            co.arc(hpos + 5 + (blob_size / 2), vpos + (5 * j) + (text_size * j) - text_size + (blob_size / 2), blob_size / 2, 0, 6.26, 0);
                        co.fill();
                    
                    } else if (blob_shape == 'line') {
                        co.beginPath();
                            co.strokeStyle = colors[i];
                            co.moveTo(hpos + 5, vpos + (5 * j) + (text_size * j) - text_size + (blob_size / 2));
                            co.lineTo(hpos + blob_size + 5, vpos + (5 * j) + (text_size * j) - text_size + (blob_size / 2));
                        co.stroke();
                    
                    } else if (blob_shape == 'triangle') {
                        co.beginPath();
                            co.strokeStyle = colors[i];
                            co.moveTo(hpos + 5, vpos + (5 * j) + (text_size * j) - text_size + blob_size);
                            co.lineTo(hpos + (blob_size / 2) + 5, vpos + (5 * j) + (text_size * j) - text_size );
                            co.lineTo(hpos + blob_size + 5, vpos + (5 * j) + (text_size * j) - text_size + blob_size);
                        co.closePath();
                        co.fillStyle =  colors[i];
                        co.fill();

                    } else if (typeof blob_shape === 'function') {

                        blob_shape({
                            object: obj,
                            color: colors[i],
                            x: hpos + 5,
                            y: vpos + (5 * j) + (text_size * j) - text_size,
                            width: text_size,
                            height: text_size + 1
                        });
                    } else {
                        co.fillStyle =  colors[i];
                        co.fillRect(
                            hpos + 5,
                            vpos + (5 * j) + (text_size * j) - text_size,
                            text_size,
                            text_size + 1
                        );
                    }
                    
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    

                    co.beginPath();
                    //co.fillStyle = typeof text_color == 'object' ? text_color[i] : text_color;
                    


                    ret = RG.text2(obj, {
                        
                        font:       textConf.font,
                        size:       textConf.size,
                        bold:       textConf.bold,
                        italic:     textConf.italic,
                        color:      typeof textConf.color == 'object' ? textConf.color[i] : textConf.color,

                        x:          hpos + blob_size + 5 + 5 + (prop['chart.key.labels.offsetx'] || 0),
                        y:          vpos + (5 * j) + (text_size * j) + 3 + (prop['chart.key.labels.offsety'] || 0),
                        text:       key[i],
                        accessible: textAccessible
                    });

                    obj.coords.key[i] = [
                        ret.x,
                        ret.y,
                        ret.width,
                        ret.height,
                        key[i],
                        colors[i],
                        obj
                    ];
                }
            co.fill();
        }























        /**
        * This does the actual drawing of the key when it's in the margin
        * 
        * @param object obj The graph object
        * @param array  key The key items to draw
        * @param array colors An aray of colors that the key will use
        */
        function DrawKey_margin (obj, key, colors)
        {
            var text_size    = typeof(prop['chart.key.labels.size']) == 'number' ? prop['chart.key.labels.size'] : prop['chart.text.size'],
                text_bold    = prop['chart.key.labels.bold'],
                text_italic  = prop['chart.key.labels.italic'],
                text_font    = prop['chart.key.labels.font'] || prop['chart.key.font'] || prop['chart.text.font'],
                text_color   = prop['chart.key.labels.color'] || prop['chart.text.color'],
                marginLeft   = obj.marginLeft,
                marginRight  = obj.marginRight,
                marginTop    = obj.marginTop,
                marginBottom = obj.marginBottom,
                hpos         = ((ca.width - marginLeft - marginRight) / 2) + obj.marginLeft,
                vpos         = marginTop - text_size - 5,
                title        = prop['chart.title'],
                blob_size    = text_size, // The blob of color
                hmargin      = 8, // This is the size of the gaps between the blob of color and the text
                vmargin      = 4, // This is the vertical margin of the key
                fillstyle    = prop['chart.key.background'],
                strokestyle  = '#999',
                length       = 0;

            if (!obj.coords) obj.coords = {};
            obj.coords.key = [];
    
    
    
            // Need to work out the length of the key first
            co.font = (obj.properties['chart.key.labels.italic'] ? 'italic ' : '') + (obj.properties['chart.key.labels.bold'] ? 'bold ' : '') + text_size + 'pt ' + text_font;

            for (i=0; i<key.length; ++i) {
                length += hmargin;
                length += blob_size;
                length += hmargin;
                length += co.measureText(key[i]).width;
            }
            length += hmargin;
    
    
    
    
            /**
            * Work out hpos since in the Pie it isn't necessarily dead center
            */
            if (obj.type == 'pie') {
                if (prop['chart.align'] == 'left') {
                    var hpos = obj.radius + marginLeft;
                    
                } else if (prop['chart.align'] == 'right') {
                    var hpos = ca.width - obj.radius - marginRight;
    
                } else {
                    hpos = ca.width / 2;
                }
            }
    
    
    
    
    
            /**
            * This makes the key centered
            */  
            hpos -= (length / 2);
    
    
            /**
            * Override the horizontal/vertical positioning
            */
            if (typeof(prop['chart.key.position.x']) == 'number') {
                hpos = prop['chart.key.position.x'];
            }
            if (typeof(prop['chart.key.position.y']) == 'number') {
                vpos = prop['chart.key.position.y'];
            }
    
    
    
            /**
            * Draw the box that the key sits in
            */
            if (   obj.get('chart.key.position.gutter.boxed')
                || obj.get('chart.key.position.margin.boxed')
               ) {
    
                if (prop['chart.key.shadow']) {
                    co.shadowColor   = prop['chart.key.shadow.color'];
                    co.shadowBlur    = prop['chart.key.shadow.blur'];
                    co.shadowOffsetX = prop['chart.key.shadow.offsetx'];
                    co.shadowOffsetY = prop['chart.key.shadow.offsety'];
                }
    
                
                co.beginPath();
                    co.fillStyle = fillstyle;
                    co.strokeStyle = strokestyle;
    
                    if (prop['chart.key.rounded']) {
                        RG.strokedCurvyRect(co, hpos, vpos - vmargin, length, text_size + vmargin + vmargin)
                        // Odd... RG.filledCurvyRect(co, hpos, vpos - vmargin, length, text_size + vmargin + vmargin);
                    } else {
                        co.rect(hpos, vpos - vmargin, length, text_size + vmargin + vmargin);
                    }
                    
                co.stroke();
                co.fill();
    
    
                RG.NoShadow(obj);
            }
    
    
            /**
            * Draw the blobs of color and the text
            */
    
            // Custom colors for the key
            if (prop['chart.key.colors']) {
                colors = prop['chart.key.colors'];
            }
    
            for (var i=0, pos=hpos; i<key.length; ++i) {
                pos += hmargin;
    
    
    
                //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
                // Draw the blob of color
                if (typeof prop['chart.key.color.shape'] === 'object' && typeof prop['chart.key.color.shape'][i] === 'string') {
                    var blob_shape = prop['chart.key.color.shape'][i];
                
                } else if (typeof prop['chart.key.color.shape'] === 'object' && typeof prop['chart.key.color.shape'][i] === 'function') {
                    var blob_shape = prop['chart.key.color.shape'][i];
                
                // No array - just a function
                } else if (typeof prop['chart.key.color.shape'] === 'function') {
                    var blob_shape = prop['chart.key.color.shape'];
                
                } else if (typeof(prop['chart.key.color.shape']) == 'string') {
                    var blob_shape = prop['chart.key.color.shape'];
                
                } else {
                    var blob_shape = 'square';
                }
    
    
                /**
                * Draw the blob of color - line
                */
                if (blob_shape =='line') {
                    
                    co.beginPath();
                        co.strokeStyle = colors[i];
                        co.moveTo(pos, vpos + (blob_size / 2));
                        co.lineTo(pos + blob_size, vpos + (blob_size / 2));
                    co.stroke();
                    
                // Circle
                } else if (blob_shape == 'circle') {
                    
                    co.beginPath();
                        co.fillStyle = colors[i];
                        co.moveTo(pos, vpos + (blob_size / 2));
                        co.arc(pos + (blob_size / 2), vpos + (blob_size / 2), (blob_size / 2), 0, 6.28, 0);
                    co.fill();
                
                } else if (blob_shape == 'triangle') {
                
                    co.fillStyle = colors[i];
                    co.beginPath();
                        co.strokeStyle = colors[i];
                        co.moveTo(pos, vpos + blob_size);
                        co.lineTo(pos + (blob_size / 2), vpos);
                        co.lineTo(pos + blob_size, vpos + blob_size);
                    co.closePath();
                    co.fill();

                } else if (typeof blob_shape === 'function') {

                    blob_shape({
                        object: obj,
                        color: colors[i],
                        x: pos,
                        y: vpos,
                        width: blob_size,
                        height: blob_size
                    });

                } else {
                
                    co.beginPath();
                        co.fillStyle = colors[i];
                        co.rect(pos, vpos, blob_size, blob_size);
                    co.fill();
                }
    
    
    
                //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    
                pos += blob_size;
                
                pos += hmargin;
    
                co.beginPath();
                    co.fillStyle = (typeof text_color === 'object') ? text_color[i] : text_color;

                    var ret = RG.Text2(obj, {
                        
                        font:       text_font,
                        bold:       text_bold,
                        size:       text_size,
                        italic:     text_italic,
                        
                        x:          pos +  + (prop['chart.key.labels.offsetx'] || 0),
                        y:          vpos + text_size + 1 +  + (prop['chart.key.labels.offsety'] || 0),
                        text:       key[i],
                        accessible: textAccessible
                    });
                co.fill();
                pos += co.measureText(key[i]).width;
            
                obj.coords.key[i] = [
                    ret.x,
                    ret.y,
                    ret.width,
                    ret.height,
                    key[i],
                    colors[i],
                    obj
                ];
            }
        }




        if (keypos && (keypos === 'gutter' || keypos === 'margin')) {
            DrawKey_margin(obj, key, colors);
        } else if (keypos && (keypos === 'graph' || keypos === 'chart') ) {
            DrawKey_graph(obj, key, colors);
        } else {
            alert('[COMMON] (' + obj.id + ') Unknown key position: ' + keypos);
        }






        if (prop['chart.key.interactive']) {

            if (!RGraph.Drawing || !RGraph.Drawing.Rect) {
                alert('[INTERACTIVE KEY] The drawing API Rect library does not appear to have been included (which the interactive key uses)');
            }



            /**
            * Check that the RGraph.common.dynamic.js file has been included
            */
            if (!RGraph.InstallWindowMousedownListener) {
                alert('[INTERACTIVE KEY] The dynamic library does not appear to have been included');
            }



            // Determine the maximum width of the labels
            for (var i=0,len=obj.coords.key.length,maxlen=0; i<len; i+=1) {
                maxlen = Math.max(maxlen, obj.coords.key[i][2]);
            }
    

            //obj.coords.key.forEach(function (value, index, arr)
            //{
            for (var i=0,len=obj.coords.key.length; i<len; i+=1) {
            
                // Because the loop would have finished when the i variable is needed - put
                // the onclick function inside a new context so that the value of the i
                // variable is what we expect when the key has been clicked
                (function (idx)
                {
                    var arr   = obj.coords.key;
                    var value = obj.coords.key[idx];
                    var index = idx;
    

                    var rect = new RGraph.Drawing.Rect(obj.id,value[0], value[1], (prop['chart.key.position'] === 'gutter' || prop['chart.key.position'] === 'margin') ? value[2] : maxlen, value[3])
                        .set('colorsFill', 'rgba(0,0,0,0)')
                        .draw();
                    
                    rect.onclick = function (e, shape)
                    {
                        var co  = rect.context;
    
                        co.fillStyle = prop['chart.key.interactive.highlight.label'];
                        co.fillRect(shape.x, shape.y, shape.width, shape.height);
    
                        if (typeof obj.interactiveKeyHighlight == 'function') {
                            
                            obj.Set('chart.key.interactive.index', idx);

                            RG.FireCustomEvent(obj, 'onbeforeinteractivekey');
                            obj.interactiveKeyHighlight(index);
                            RG.FireCustomEvent(obj, 'onafterinteractivekey');
                        }
                    }
                    
                    rect.onmousemove = function (e, shape)
                    {
                        return true;
                    }
                })(i);
            }
        }
    };




    /**
    * Returns the key length, but accounts for null values
    * 
    * @param array key The key elements
    */
    RG.getKeyLength = function (key)
    {
        var length = 0;

        for (var i=0,len=key.length; i<len; i+=1) {
            if (key[i] != null) {
                ++length;
            }
        }

        return length;
    };




    /**
    * Create a TABLE based HTML key. There's lots of options so it's
    * suggested that you consult the documentation page
    * 
    * @param mixed id   This should be a string consisting of the ID of the container
    * @param object prop An object map of the various properties that you can use to
    *                    configure the key. See the documentation page for a list.
    */
    RGraph.HTML.key =
    RGraph.HTML.Key = function (id, prop)
    {
        var div = doc.getElementById(id);
        var uid = RG.createUID();

        
        /**
        * Create the table that becomes the key
        */
        var str = '<table border="0" cellspacing="0" cellpadding="0" id="rgraph_key_' + uid + '" style="display: inline;' + (function ()
            {
                var style = ''
                for (i in prop.tableCss) {
                    if (typeof i === 'string') {
                        style = style + i + ': ' + prop.tableCss[i] + ';';
                    }
                }
                return style;
            })() + '" ' + (prop.tableClass ? 'class="' + prop.tableClass + '"' : '') + '>';



        /**
        * Add the individual key elements
        */
        for (var i=0; i<prop.labels.length; i+=1) {
            str += '<tr><td><div style="' + (function ()
            {
                var style = '';

                for (var j in prop.blobCss) {
                    if (typeof j === 'string') {
                        style = style + j + ': ' + prop.blobCss[j] + ';';
                    }
                }

                return style;
            })() + 'display: inline-block; margin-right: 5px; margin-top: 4px; width: 15px; height: 15px; background-color: ' + prop.colors[i] + '"' + (prop.blobClass ? 'class="' + prop.blobClass + '"' : '') + '>&nbsp;</div><td>' + (prop.links && prop.links[i] ? '<a href="' + prop.links[i] + '">' : '') + '<span ' + (prop.labelClass ? 'class="' + prop.labelClass + '"' : '') + '" style="' + (function ()
            {
                var style = '';

                for (var j in prop.labelCss) {
                    if (typeof j === 'string') {
                        style = style + j + ': ' + prop.labelCss[j] + ';';
                    }
                }

                return style;
            })() + ' ' + (function ()
            {
                var style = '';

                if (prop['labelCss_' + i]) {

                    for (var j in prop['labelCss_' + i]) {
                        style = style + j + ': ' + prop['labelCss_' + i][j] + ';';
                    }
                }

                return style ? style + '"' : '"';
            })() + '>' + prop.labels[i] + '</span>' + (prop.links && prop.links[i] ? '</a>' : '') + '</td></tr>';
        }

        div.innerHTML += (str + '</table>');

        // Return the TABLE object that is the HTML key
        return doc.getElementById('rgraph_key_' + uid);
    };




// End module pattern
})(window, document);