import Helper from '../helper/C9.Helper';
import Tooltip from '../charts/utils/C9.Tooltip';
import DataAdapter from '../helper/C9.DataAdapter';
export default class Map {
    constructor(options) {
        var self    = this;
        var config  = {
            // container
            id: "body",
            // Layers:
            // BingMaps, OSM, Raster, Tile, TileImage, Vector, VectorTile,...
            // REF: http://openlayers.org/en/latest/apidoc/ol.source.html?stableonly=true
            layers: {
                type: "Tile",
                source: {
                    name: "OSM"
                }
            }, 
            view: {
                lat: 0,
                lon: 0,
                zoom: 2
            },
            data: null,
            tooltip: {
                format: null
            }
        };

        self._options = Helper.mergeDeep(config, options);
        self._dataSource      = self._options.data;
        self.initMapConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/

    // get id() {
    //     return this._options.id;
    // }

    // get height() {
    //     return this._height;
    // }

    // get width() {
    //     return this._width;
    // }

    // get view() {
    //     return this._view;
    // }

    // get markers() {
    //     return this._markers;
    // }

    // get layers() {
    //     return this._layers;
    // }

    get dataSource() {
        return this._dataSource;
    }

    get data() {
        return this._data;
    }

    get options() {
        return this._options;
    }
    /*=====  End of Getter  ======*/
    
    
    /*==============================
    =            Setter            =
    ==============================*/

    // set id(newId) {
    //     if (newId) {
    //         this._options.id = newId;
    //     }
    // }

    // set height(newHeight) {
    //     if (newHeight) {
    //         this._height = newHeight;    
    //     }
    // }

    // set width(newWidth) {
    //     if (newWidth) {
    //         this._width = newWidth;
    //     }
    // }

    // set view(newView) {
    //     if (newView) {
    //         this._view = newView;
    //     }
    // }

    // set markers(newMarkers) {
    //     if (newMarkers) {
    //         this._markers = newMarkers;
    //     }
    // }

    // set layers(newLayers) {
    //     if (newLayers) {
    //         this._layers = newLayers;
    //     }
    // }

    set dataSource(newData) {
        if (newData) {
            this._dataSource = newData;
        }
    }

    set data(newData) {
        if (newData) {
            this._data = newData;
        }
    }
    /*=====  End of Setter  ======*/
    
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    
    initMapConfig() {
        var self = this;

        //c9Layers contain all layers
        self.c9Layers = [];
        //c9Markers contain all markers
        // self.c9Markers = new ol.source.Vector({});
        //c9Objects contain all polygons, lines
        self.c9Objs = new ol.source.Vector({});
        //init all thing relating to user's data

        //layer
        self.initLayer();
        
        //quick markers
        // self.initMarker();

        //object
        // self.initObj();

        //init popup
        var popup = document.createElement('div');
        popup.id = 'c9MapPopup';
        popup.className = 'c9-map-tooltip-container c9-custom-tooltip-container c9-tooltip-top';
        document.body.appendChild(popup);
    }

    draw() {
        var self = this;
        var view = self.options.view,
            id   = self.options.id;

        self.c9View = new ol.View({
            center: ol.proj.fromLonLat([view.lon, view.lat]),
            zoom: view.zoom > 2 ? view.zoom : 2,
            minZoom: 2,
        });
        self.c9Map = new ol.Map({
            target: id,
            layers: self.c9Layers,
            view: self.c9View,
            interactions : ol.interaction.defaults({doubleClickZoom: false})
        });

        /******************** ADD C9 OBJECTS ********************/
        self.c9ObjsLayer = new ol.layer.Vector({ 
            source: self.c9Objs,
            map: self.c9Map
        });
        /********************************************************/

        /********************* ADD C9 POPUP *********************/
        self.c9Popup = new ol.Overlay({
            positioning: 'bottom-center',
            element: document.getElementById('c9MapPopup')
        });

        //add overlay to contain popup
        self.c9Map.addOverlay(self.c9Popup);
        /********************************************************/

        /********************* HOVER STYLE **********************/
        self.c9CustomHover = new ol.layer.Vector({
            source: new ol.source.Vector(),
            map: self.c9Map,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgb(0, 153, 255)',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.6)'
                })
            })
        });
        /********************************************************/
        //adapt data to obj
        self.update(self.dataSource);
        //define interaction
        self.updateInteraction();

    }
    /*=====  End of Main Functions  ======*/

    /**
     * Create layer
     * @param  {String} type of layer
     * @param  {source} source data defined by C9
     */
    createLayer(options){
        var self = this;
        if (Helper.isEmpty(options)) return;
        
        var type = options.type || 'Tile',
            source = options.source || {name: 'OSM'};
            // style = options.style;

        var layer = new ol.layer[type];
        layer.setSource(self.setupSource(source));
        // if (!Helper.isEmpty(style)) layer.setStyle(style);

        //adapt source data to c9obj
        //support maximum 2 source level
        var containFeature = true, s;
        try {
            s = layer.getSource();
            s.getFeatures();
        }
        catch (err) {
            try {
                s = layer.getSource().getSource();
                s.getFeatures();
            }
            catch (err) {
                containFeature = false;    
            }
        }
        if (containFeature) {
            var readFormat = function(feature) {
                var result = {};
                feature.getKeys().forEach(function(k) {
                    result[k] = feature.getProperties()[k];
                });
                return result;
            }
            
            //register layer loaded event to set data for obj
            s.once('change', function(e) {
                if (s.getState() == 'ready') {
                    var objs = s.getFeatures();
                    // self.c9Objs.addFeatures(objs);

                    objs.forEach(function(o) {
                        //set data & some attrs
                        var type = o.getGeometry().getType();
                        o.set('data', readFormat(o));
                        // o.set('type', 'c9-' + (type == 'point' ? 'marker' : type.toLowerCase()));
                        // if (type.toLowerCase() == 'polygon' || type.toLowerCase() == 'multipolygon' || type.toLowerCase() == 'line') {
                        //     o.set('c9-style', {
                        //         strokeWidth: 2,
                        //         strokeColor: 'steelblue',
                        //         fillColor: 'rgba(0, 0, 255, 0.1)'
                        //     });
                            // set style
                            // o.setStyle(new ol.style.Style({
                            //     stroke: new ol.style.Stroke({
                            //         width: 2,
                            //         color: 'steelblue'
                            //     }),
                            //     fill: new ol.style.Fill({
                            //         color: 'rgba(0, 0, 255, 0.1)'
                            //     })
                            // }))    
                        // } 
                        // else if (type.toLowerCase() == 'point') {
                        //     o.setStyle(new ol.style.Style({
                        //         image: new ol.style.Icon({
                        //             anchor: [0.5, 1], //middle-width and bottom-height of image
                        //             src: 'http://s21.postimg.org/blklb8scn/marker_icon.png',
                        //             scale: 1
                        //         })
                        //     }))
                        // }
                    });
                }
            })
        }

        self.c9Layers.push(layer);
    }

    /**
     * Init Layer base on first user's data
     */
    initLayer() {
        var self = this;
        var layers = self.options.layers;

        if (layers instanceof Array) {
            layers.forEach(function(l, i) {
                self.createLayer({type: l.type, source: l.source, style: l.style});
            })
        }
        else {
            self.createLayer({type: layers.type, source: layers.source, style: layers.style});
        }
    }

    /**
     * Setup source for layer
     * @param  {Object} source data style defined by c9
     * @return {String} return source (ol.source)
     */
    setupSource(s){
        var source = undefined;
        switch (s.name) {
            case 'BingMaps':
                source = new ol.source.BingMaps({
                    key: s.key,
                    imagerySet: s.imagerySet || 'Road'
                });
                break;
            case 'Stamen':
                source = new ol.source.Stamen({
                    layer: s.layer || 'watercolor'
                });
                break;
            /********** TileJSON require ol >= v3.8.2 **********/
            case 'TileJSON':
                source = new ol.source.TileJSON({
                    url: s.url,
                    crossOrigin: s.crossOrigin || 'anonymous'
                });
                break;
            case 'TileArcGISRest':
                source = new ol.source.TileArcGISRest({
                    url: s.url
                });
                break;
            case 'Vector':
                source = new ol.source.Vector({
                    url: s.url,
                    format: s.format === undefined ? null : new ol.format[s.format]({
                        extractStyles: s.extractStyles || false
                    })
                });
                break;
            case 'Cluster':
                source = new ol.source.Cluster({
                    distance: s.distance || 20,
                    source: this.setupSource(s.source)
                });
                break;
            case 'ImageVector':
                source = new ol.source.ImageVector({
                    source: this.setupSource(s.source),
                    // default style
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.6)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#319FD3',
                            width: 1
                        })
                    })
                });
                break;
            default: 
                source = new ol.source.OSM();
                break;

        }

        return source;
    }

    /**
     * define some interactions
     */
    updateInteraction(){
        var self = this;
        const LEFT_KEY = 37, RIGHT_KEY = 39, DEL_KEY = 46, DURATION = 1000, LOAD_MAP_DELAY = 500;

        // add default interaction of ol3
        // self.c9Map.addInteraction(self.c9DefaultHoverStyle = new ol.interaction.Select({
        //     condition: ol.events.condition.pointerMove
        // }));

        //normal: stroke 'rgb(49, 159, 211)' width: 1
        //        fill '#fff'
        

        /******************* SOME HELPER FUNCTION ********************/
        var getCenterLonLat = function(f) {
            return ol.proj.transform(getCenter(f), 'EPSG:3857', 'EPSG:4326');
        }
        var getCenter = function(f) {
            return ol.extent.getCenter(f.getGeometry().getExtent());
        }
        var transformCoordinates = function(c) {
            return ol.proj.transform(c, 'EPSG:3857', 'EPSG:4326');
        }
        /**
         * Create pan animation on object
         * @param  {ol.Feature}
         */
        var panAnimation = function(feature){
            if (self.c9View.getCenter()[0] == getCenter(feature)[0] && self.c9View.getCenter()[1] == getCenter(feature)[1]) return;

            var pan = ol.animation.pan({
                duration: DURATION,
                source: (self.c9View.getCenter())
            });
            self.c9Map.beforeRender(pan);
            self.c9View.setCenter(getCenter(feature));
        }
        /**
         * Create marker's flash effect
         * @param  {ol.Feature}
         */
        var createMarkerEffect = function(feature){
            var duration = 3000;
            var start = new Date().getTime();
            var listenerKey;

            function animate(event) {
                var vectorContext = event.vectorContext;
                var frameState = event.frameState;
                var flashGeom = feature.getGeometry().clone();
                var elapsed = frameState.time - start;
                var elapsedRatio = elapsed / duration;
                // radius will be 5 at start and 30 at end.
                var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
                var opacity = ol.easing.easeOut(1 - elapsedRatio);

                var style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: radius,
                        snapToPixel: false,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(255, 0, 0, ' + opacity + ')',
                            width: 0.25 + opacity
                        })
                    })
                });

                vectorContext.setStyle(style);
                vectorContext.drawGeometry(flashGeom);
                if (elapsed > duration) {
                    ol.Observable.unByKey(listenerKey);
                    return;
                }
                // tell OL3 to continue postcompose animation
                self.c9Map.render();
            }
            listenerKey = self.c9Map.on('postcompose', animate);
        }
        /**
         * Caculate distance between marker and center view, plus direction compare with center
         * @param  {ol.Feature}
         * @return {[Number, Boolean]} Array of distance value and direction value (left if true, right if false)
         */
        var distanceAndDirection = function(f) {
            var center = transformCoordinates(self.c9View.getCenter());
            var fCoordinates = getCenterLonLat(f);
            return [Math.sqrt(Math.pow(fCoordinates[0] - center[0], 2) + Math.pow(fCoordinates[1] - center[1], 2)), (fCoordinates[0] - center[0]) <= 0];
        }
        var formatPopup = function(data) {
            if (Helper.isEmpty(data)) return;
            var capitalizeFirstLetter = function(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
            var strongSpan = function(strong, span) { if (span == '' || Helper.isEmpty(span)) return ""; return "<strong>" + capitalizeFirstLetter(strong) + ":</strong>" + "<span> " + span + "</span></br>"; };
            var result = strongSpan("Name", data.name), v;
            if (!Helper.isEmpty(data.coor)) result += (strongSpan("Lon", data.coor.lon) + strongSpan("Lat", data.coor.lat));

            for (var i in v = data.value) {
                result += strongSpan(i, v[i]);
            }
            return result;
        }
        /*************************************************************/
        
        //register pointer move event to show cursor as pointer if user hover on markers
        self.c9Map.on('pointermove', function(evt) {
            var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
                return feature;
            });

            // new hover style
            if (f !== self.lastHoveredObj) {
                if (self.lastHoveredObj) {
                    if (self.lastHoveredObj.get('type')) 
                        self.lastHoveredObj.setStyle(self.lastHoveredObj.get('c9-type'));
                    else
                        self.c9CustomHover.getSource().removeFeature(self.lastHoveredObj);
                }
                if (f) {
                    var fStyle = f.get('c9-style'), strokeColor = 'rgb(0, 153, 255)', strokeWidth = 3, fillColor = 'rgba(255, 255, 255, 0.6)';
                    if (fStyle) {
                        strokeColor = fStyle.getStroke().getColor() == '#319FD3' ? 'rgb(0, 153, 255)' : self.getLightenColor(fStyle.getStroke().getColor());
                        strokeWidth = fStyle.getStroke().getWidth() + 2;
                        fillColor   = fStyle.getFill().getColor() == 'rgba(255, 255, 255, 0.6)' ? 'rgba(255, 255, 255, 0.6)' : self.getLightenColor(fStyle.getFill().getColor());
                    }
                    var newStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: strokeColor,
                            width: strokeWidth
                        }),
                        fill: new ol.style.Fill({
                            color: fillColor
                        })
                    });
                    if (fStyle) 
                        f.setStyle(newStyle);
                    else {
                        self.c9CustomHover.setStyle(newStyle);
                        self.c9CustomHover.getSource().addFeature(f);    
                    }
                }
                self.lastHoveredObj = f;
            }
            if (f) {
                self.c9Map.getTargetElement().style.cursor = 'pointer';
                // self.createMarkerEffect(f);
                /************* LIGHTEN COLOR ***********/
                // if (f.get('type') == 'c9-line' || f.get('type') == 'c9-polygon' || f.get('type') == 'c9-multipolygon'){
                //     var fStyle = f.getStyle();
                //     var defaultStyle = f.get('c9-style');

                //     if (fStyle.getStroke().getWidth() == defaultStyle.strokeWidth)
                //         f.setStyle(new ol.style.Style({
                //             stroke: new ol.style.Stroke({
                //                 width: fStyle.getStroke().getWidth() + 2,
                //                 color: self.getLightenColor(fStyle.getStroke().getColor())
                //             }),
                //             fill: new ol.style.Fill({
                //                 color: self.getLightenColor(fStyle.getFill().getColor())
                //             })
                //         }));
                // }

                // if (f !== self.lastHoveredObj) {
                //     if (self.lastHoveredObj) {
                //         self.c9CustomHover.getSource().removeFeature(self.lastHoveredObj);
                //     }
                //     if (f) {
                //         self.c9CustomHover.getSource().addFeature(f);
                //     }
                //     self.lastHoveredObj = f;
                // }

                /****************************************/

                /************** SHOW POPUP *************/
                self.c9Popup.getElement().style.display = 'none';

                // panAnimation(f);
                
                try {
                    if (self.options.tooltip.format) self.options.tooltip.format(f.get('data'));
                }
                catch(err) {
                    throw "Check data format again";
                    return;
                }

                var content = self.options.tooltip.format ? self.options.tooltip.format(f.get('data')) : formatPopup(f.get('data'));
                if (Helper.isEmpty(content) || content.toString().trim() == "") return;

                self.c9Popup.getElement().style.display = 'block';
                self.c9Popup.getElement().innerHTML = content;
                // self.c9Popup.setPosition(getCenter(f));
                self.c9Popup.setPosition(evt.coordinate);
                /****************************************/
                // var stop = new CustomEvent("click", {detail: {message: "stop"}});
                // self.c9Map.dispatchEvent(stop);
            }
            if (!f) {
                self.c9Map.getTargetElement().style.cursor = '';
                self.c9Popup.getElement().style.display = 'none';

                //remove last obj style
                // if (!Helper.isEmpty(self.lastHoveredObj) && (self.lastHoveredObj.get('type') == 'c9-line' || self.lastHoveredObj.get('type') == 'c9-polygon' || self.lastHoveredObj.get('type') == 'c9-multipolygon')) {
                //     var defaultStyle = self.lastHoveredObj.get('c9-style');
                //     self.lastHoveredObj.setStyle(defaultStyle);
                // }   
            }
        });

        //register map first render's event to show marker's effect
        self.c9Map.once('postrender', function(evt) {
            setTimeout(function(){
                self.c9Objs.getFeatures().forEach(function(f, i){
                    if (f.get('type') == 'c9-marker')
                        createMarkerEffect(f);
                })
            }, LOAD_MAP_DELAY);
        });

        //register click event to show effect on markers
        self.c9Map.on('click', function(evt){

            // if (evt instanceof CustomEvent) return;
            var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
                self.lastSelectedObj = feature;
                return feature;
            });
            if (f) {
                // self.createMarkerEffect(f);
                // self.c9Popup.getElement().style.display = 'none';

                panAnimation(f);
                
                // try {
                //     if (self.options.format) self.options.format(f.get('data'));
                // }
                // catch(err) {
                //     throw "Check data format again";
                //     return;
                // }

                // var content = self.options.format ? self.options.format(f.get('data')) : formatPopup(f.get('data'));
                // if (Helper.isEmpty(content) || content.toString().trim() == "") return;

                // self.c9Popup.getElement().style.display = 'block';
                // self.c9Popup.getElement().innerHTML = content;
                // self.c9Popup.setPosition(getCenter(f));

                // // var stop = new CustomEvent("click", {detail: {message: "stop"}});
                // // self.c9Map.dispatchEvent(stop);
            }
            if (!f)
                self.c9Popup.getElement().style.display = 'none';
        });

        //register keydown event to change center view
        document.addEventListener('keydown', function(e) {
            var keydownAnimate = function(k) {
                var selectedFeature = undefined;
                var minDistance = Infinity;
                self.c9Objs.getFeatures().forEach(function(f, i) {
                    if (f.get('type') == "c9-marker") {
                        var checkAnimate = distanceAndDirection(f);

                        if (((checkAnimate[1] && k == LEFT_KEY) || (!checkAnimate[1] && k == RIGHT_KEY)) && checkAnimate[0] < minDistance && checkAnimate[0] != 0) {
                            minDistance = checkAnimate[0];
                            selectedFeature = f;
                        }
                    }
                });
                if (selectedFeature) {
                    setTimeout(createMarkerEffect(selectedFeature), LOAD_MAP_DELAY);
                    panAnimation(selectedFeature);
                }
            }
            switch(e.keyCode) {
                case LEFT_KEY:
                    keydownAnimate(LEFT_KEY);
                    break;
                case RIGHT_KEY:
                    keydownAnimate(RIGHT_KEY);
                    break;
                case DEL_KEY:
                    if (!Helper.isEmpty(self.lastSelectedObj) && !Helper.isEmpty(self.lastSelectedObj.get('type'))) self.c9Objs.removeFeature(self.lastSelectedObj);
                    break;
            }
        })
    }

    // /**
    //  * marker first set up
    //  */
    // initMarker() {
    //     var self = this;
    //     //data
    //     var markers = self.markers;
    //     //add marker layer to layer list (c9Layers)
    //     self.c9Layers.push(new ol.layer.Vector({
    //         source: self.c9Markers
    //     }));

    //     if (markers.length === 0) return;

    //     if (markers instanceof Array) {
    //         markers.forEach(function(m, i) {
    //             self.createMarker({lat: m.lat, lon: m.lon, imgSrc: m.img, scale: m.scale});
    //         });
    //     }
    //     else {
    //         self.createMarker({lat: markers.lat, lon: markers.lon, imgSrc: markers.img, scale: markers.scale});
    //     }
    // }
    /**
     * obj first set up
     */
    // initObj() {
    //     var self = this;

    //     //add layer Vector to layer list (c9Layers)
    //     self.c9Layers.push(new ol.layer.Vector({
    //         source: self.c9Objs
    //     }));
    // }

    /**
     * create c9 obj
     * @data  {Object} coordinate
     * @options  {Object} some options: strokeWidth,strokeColor,fillColor,imgSrc,scale
     * @return {}
     */
    createObj(data, options){
        var self = this;

        /**
         * Create marker
         * @param  {Number} latitude of marker
         * @param  {Number} longitude of marker
         * @param  {String} image source (support for both local and net)
         * @param  {Number} scale image if its size is too large - default = 1
         */
        var createMarker = function(data, coor, options){

            if (!Helper.isArray(coor) && coor.length != 2) return;

            const DEFAULT_SRC = 'http://s21.postimg.org/blklb8scn/marker_icon.png'
            const DEFAULT_SCALE = 1;

            var lat    = coor[1],
                lon    = coor[0],
                imgSrc = options ? (options.imgSrc || DEFAULT_SRC) : DEFAULT_SRC,
                scale  = options ? (options.scale  || DEFAULT_SCALE) : DEFAULT_SCALE;

            var marker = new ol.Feature({
                'data-ref': '',
                type: 'c9-marker',
                data: data,
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
            });

            /**
             * Create marker style
             * @param  {String} image source
             * @param  {Number} scale
             * @return {ol.style.Style} return marker style
             */
            var createMarkerStyle = function(imgSrc, scale){
                return new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1], //middle-width and bottom-height of image
                        src: imgSrc,
                        scale: scale
                    })
                });
            }

            var markerStyle = createMarkerStyle(imgSrc, scale);
            marker.set('c9-style', markerStyle);
            marker.setStyle(markerStyle);

            //add this marker to marker list (c9Objs)
            self.c9Objs.addFeature(marker);
        }

        var coorAndType = self.normalizeCoordinate(data.coor);
        if (coorAndType.coor == null) return;

        //marker
        if (coorAndType.type == "marker") {
            createMarker(data, coorAndType.coor, options);
            return;
        }

        // if (data == self.c9Markers) {
        //     data = [];
        //     self.c9Markers.getFeatures().forEach(function (d) {
        //         data.push(ol.proj.transform(d.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326'));
        //     })
        // }

        var strokeWidth = options ? options.strokeWidth : 1;
        var strokeColor = options ? options.strokeColor : "#319FD3";
        var fillColor   = options ? options.fillColor   : "rgba(255, 255, 255, 0.6)";

        var obj = new ol.Feature({
            'data-ref': '',
            type: "c9-" + coorAndType.type,
            data: data,
            geometry: coorAndType.type == "polygon" ? new ol.geom.Polygon(coorAndType.coor) : coorAndType.type == "line" ? new ol.geom.LineString(coorAndType.coor) : new ol.geom.MultiPolygon(coorAndType.coor)
        });

        obj.getGeometry().transform('EPSG:4326', 'EPSG:3857');

        /**
         * Create obj style
         * @param  {Number} stroke width
         * @param  {String} stroke color
         * @param  {String} fill color
         * @return {ol.style.Style} return obj style
         */
        var createObjStyle = function(strokeWidth, strokeColor, fillColor){
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: strokeWidth,
                    color: strokeColor                
                }),
                fill: new ol.style.Fill({
                    color: fillColor
                })
            });
        }

        var objStyle = createObjStyle(strokeWidth, strokeColor, fillColor);
        obj.set('c9-style', objStyle);
        obj.setStyle(objStyle);

        //add this marker to marker list (c9Objs)
        self.c9Objs.addFeature(obj);
    }

    /**
     * normalize coordinate
     * currently only support marker, linestring, polygon and multipolygon
     * @coor  {Array} coordinate of object
     * @return {Array} coordinate was normalized
     */
    normalizeCoordinate(coor){
        var normCoor = [], type, error = {coor: null, type: null};
        if ((Helper.isObject(coor) && coor.length == undefined) || (Helper.isArray(coor) && coor.length == 2 && !isNaN(coor[0]) && !isNaN(coor[1]))) {
            // marker - [] - {}
            type = "marker";
            if (coor.length == undefined) {
                if (Helper.isEmpty(coor.lat) || Helper.isEmpty(coor.lon))
                    return error;
                normCoor = [coor.lon, coor. lat];
            }
            else {
                normCoor = coor;
            }
            
        } else if (Helper.isArray(coor)) {
            // linestring - [{},{}] - [[],[]] - [{},[]] - [[],{}]
            var isArrayOrObject = function(obj) {
                var result = {};
                if (Helper.isObject(obj) && obj.length == undefined) {
                    result['check'] = !Helper.isEmpty(obj.lat) && !Helper.isEmpty(obj.lon);
                    if (result['check']) result['coor'] = [obj.lon, obj.lat];
                }
                else {
                    result['check'] = Helper.isArray(obj) && obj.length == 2 && !isNaN(obj[0]) && !isNaN(obj[1]);
                    if (result['check']) result['coor'] = obj;
                }
                return result;
            }

            // check data inside to eliminate case: multipolygon contains 2 polygons
            if (coor.length == 2 && isArrayOrObject(coor[0]).check && isArrayOrObject(coor[1]).check) {
                type = "line";
                normCoor.push(isArrayOrObject(coor[0]).coor);
                normCoor.push(isArrayOrObject(coor[1]).coor);
            }
            // multipolygon [[[[] || {}, ...]], [[[] || {}, ...]], ...]
            else if (coor.length >= 2){
                type = "multipolygon";
                coor.forEach(function(pc, i) {
                    if (Helper.isArray(pc) && pc.length == 1) {
                        normCoor.push([[]]);
                        pc[0].forEach(function(c) {
                            // data - [] || {}
                            var obj = isArrayOrObject(c);
                            if (obj.check) normCoor[i][0].push(obj.coor);
                        })
                        // cannot create polygon with the number of points is less than 2
                        if (normCoor[i][0].length <= 2) return error; 
                    }
                    else return error; // because data format is not true
                })
            }
            // polygon [[[] || {}, ...]]
            else if (coor.length == 1) {
                type = "polygon";
                normCoor.push([]);
                coor[0].forEach(function(c) {
                    // data - [] || {}
                    var obj = isArrayOrObject(c);
                    if (obj.check) normCoor[0].push(obj.coor);
                })
                if (normCoor[0].length <= 2) return error;
            }
            else return error;
        }
        return {
            coor: normCoor,
            type: type
        };
    }

    /**
     * create obj base on user data
     * @data  {Object} data structure: {coor: [], name: , value: }
     */
    update(data){
        if (Helper.isEmpty(data)) return;
        var self = this;

        var da = new DataAdapter(data);
        self.data = da.getDataTarget('map');

        if (!Helper.isEmpty(self.c9Map)) {
            if (Helper.isArray(self.data))
                self.data.forEach(function(d){
                    self.createObj(d);
                })
            else
                self.createObj(self.data);
        }
    }

    getObjs(){
        return this.c9Objs.getFeatures();
    }

    getLayers() {
        return this.c9Layers;
    }

    /**
     * Custom Event Listener
     * @param  {[type]}   eventType [description]
     * @param  {Function} callback  [description]
     */
    on(eventType, callback) {
        var self = this;
        // Update Event Factory
        let eventFactoryViewport = {
            'click': function(evt) {
                var f = self.c9Map.forEachFeatureAtPixel(self.c9Map.getEventPixel(evt), function(feature, layer){
                    return feature;
                });
                if (Helper.isFunction(callback) && f) {
                    callback.call(this, f.get('data'));
                }
            },
            'pointermove': function(evt) {
                var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
                    return feature;
                });
                if (Helper.isFunction(callback) && f) {
                    callback.call(this, f.get('data'));
                }
            }
        }

        if (eventType == "click")
            self.c9Map.getViewport().addEventListener(eventType, eventFactoryViewport[eventType]);
        else
            self.c9Map.on(eventType, eventFactoryViewport[eventType]);
    }

    getLightenColor(color) {
        if (color.includes('rgba')) {
            var alpha = color.split(',')[color.split(',').length - 1].replace(')', '');
            var currentColor = color.replace(',' + alpha, '').replace('a', '');
            var newColor = Helper.shadeColor(-0.2, currentColor);
            return 'rgba(' + newColor.split('(')[1].split(')')[0] + ',' + alpha.trim() + ')';
        }
        else
            return Helper.shadeColor(-0.2, color);
    }

    /**
     * set style: consist of layer, source and obj
     * @obj   {ol.layer || ol.source || ol.Feature}
     * @style {function || ol.style} style function || ol.style
     */
    setStyle(obj, style){
        if (Helper.isEmpty(obj) || Helper.isEmpty(style)) return;
        obj.setStyle(style);
    }
}
