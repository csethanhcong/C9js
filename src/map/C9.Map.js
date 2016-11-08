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
            format: null
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
        self.initObj();

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

        //create popup overlay
        self.c9Popup = new ol.Overlay({
            positioning: 'bottom-center',
            element: document.getElementById('c9MapPopup')
        });

        //add overlay to contain popup
        self.c9Map.addOverlay(self.c9Popup);

        //adapt data to obj
        self.update(self.dataSource);

        self.updateInteraction();

    }
    /*=====  End of Main Functions  ======*/

    /**
     * Create layer
     * @param  {String} type of layer
     * @param  {source} source data defined by C9
     */
    createLayer(type, source = undefined){
        var self = this;
        var layer = new ol.layer[type];
        layer.setSource(self.setupSource(source));
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
                self.createLayer(l.type, l.source);
            })
        }
        else {
            self.createLayer(layers.type, layers.source);
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
                    source: this.setupSource(s.source)
                });
                break;
            default: 
                source = new ol.source.OSM();
                break;

        }
        return source;
    }

    

    updateInteraction(){
        var self = this;
        const LEFT_KEY = 37, RIGHT_KEY = 39, DEL_KEY = 46, DURATION = 1000, LOAD_MAP_DELAY = 500;

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
            var capitalizeFirstLetter = function(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
            var strongSpan = function(strong, span) { if (span == '' || Helper.isEmpty(span)) return ""; return "<strong>" + capitalizeFirstLetter(strong) + ":</strong>" + "<span> " + span + "</span></br>"; };
            var result = strongSpan("Name", data.name) + strongSpan("Lon", data.coor.lon) + strongSpan("Lat", data.coor.lat), v;

            for (var i in v = data.value) {
                result += strongSpan(i, v[i]);
            }
            return result;
        }
        /*************************************************************/
        
        //register pointer move event to show cursor as pointer if user hover on markers
        self.c9Map.on('pointermove', function(evt) {
            var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
                self.lastHoveredObj = feature;
                return feature;
            });
            self.c9Map.getTargetElement().style.cursor = f ? 'pointer' : '';
            if (f) {
                // self.createMarkerEffect(f);
                /************* LIGHTEN COLOR ***********/
                if (f.get('type') != 'c9-marker'){
                    var fStyle = f.getStyle();
                    var defaultStyle = f.get('c9-style');

                    if (!(fStyle.getStroke().getWidth() != defaultStyle.strokeWidth 
                        && fStyle.getStroke().getColor() != defaultStyle.strokeColor 
                        && fStyle.getFill().getColor() != defaultStyle.fillColor))
                        f.setStyle(new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                width: fStyle.getStroke().getWidth() + 2,
                                color: self.getLightenColor(fStyle.getStroke().getColor())
                            }),
                            fill: new ol.style.Fill({
                                color: self.getLightenColor(fStyle.getFill().getColor())
                            })
                        }));
                }

                /****************************************/

                /************** SHOW POPUP *************/
                self.c9Popup.getElement().style.display = 'none';

                // panAnimation(f);
                
                try {
                    if (self.options.format) self.options.format(f.get('data'));
                }
                catch(err) {
                    throw "Check data format again";
                    return;
                }

                var content = self.options.format ? self.options.format(f.get('data')) : formatPopup(f.get('data'));
                if (Helper.isEmpty(content) || content.toString().trim() == "") return;

                self.c9Popup.getElement().style.display = 'block';
                self.c9Popup.getElement().innerHTML = content;
                self.c9Popup.setPosition(getCenter(f));
                /****************************************/
                // var stop = new CustomEvent("click", {detail: {message: "stop"}});
                // self.c9Map.dispatchEvent(stop);
            }
            if (!f) {
                self.c9Popup.getElement().style.display = 'none';

                //remove last obj style
                if (!Helper.isEmpty(self.lastHoveredObj) && self.lastHoveredObj.get('type') != 'c9-marker') {
                    var defaultStyle = self.lastHoveredObj.get('c9-style');
                    self.lastHoveredObj.setStyle(new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            width: defaultStyle.strokeWidth,
                            color: defaultStyle.strokeColor
                        }),
                        fill: new ol.style.Fill({
                            color: defaultStyle.fillColor
                        })
                    }));
                }   
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
                    if (!Helper.isEmpty(self.lastSelectedObj)) self.c9Objs.removeFeature(self.lastSelectedObj);
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
    initObj() {
        var self = this;

        //add layer Vector to layer list (c9Layers)
        self.c9Layers.push(new ol.layer.Vector({
            source: self.c9Objs
        }));
    }

    /**
     * [createObj description]
     * @param  {Object} coordinate
     * @param  {Object} some options: strokeWidth,strokeColor,fillColor,imgSrc,scale
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

            marker.setStyle(createMarkerStyle(imgSrc, scale));

            //add this marker to marker list (c9Objs)
            self.c9Objs.addFeature(marker);
        }

        var coorAndType = self.normalizeCoordinate(data.coor);

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

        var strokeWidth = options ? options.strokeWidth : 2;
        var strokeColor = options ? options.strokeColor : "steelblue";
        var fillColor   = options ? options.fillColor   : "rgba(0, 0, 255, 0.2)";

        var obj = new ol.Feature({
            'data-ref': '',
            type: "c9-" + coorAndType.type,
            data: data,
            'c9-style': {
                strokeWidth: strokeWidth,
                strokeColor: strokeColor,
                fillColor  : fillColor
            },
            geometry: coorAndType.type == "polygon" ? new ol.geom.Polygon([coorAndType.coor]) : new ol.geom.LineString(coorAndType.coor)
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

        obj.setStyle(createObjStyle(strokeWidth, strokeColor, fillColor));

        //add this marker to marker list (c9Objs)
        self.c9Objs.addFeature(obj);
    }

    //x - lon, y - lat
    normalizeCoordinate(coor){
        var normCoor = [], type;
        if ((Helper.isObject(coor) && coor.length == undefined) || (Helper.isArray(coor) && coor.length == 2 && !isNaN(coor[0]) && !isNaN(coor[1]))) {
            //is marker
            type = "marker";
            if (coor.length == undefined) {
                if (Helper.isEmpty(coor.lat) || Helper.isEmpty(coor.lon))
                    return;
                normCoor = [coor.lon, coor. lat];
            }
            else {
                normCoor = coor;
            }
            
        } else if (Helper.isArray(coor)) {
            coor.forEach(function(c) {
                //if data error, skip that data
                if (Helper.isObject(c) && c.length == undefined) {
                    if (!Helper.isEmpty(c.lat) && !Helper.isEmpty(c.lon))
                        normCoor.push([c.lon, c.lat]);
                }
                else if (Helper.isArray(c) && c.length == 2 && !isNaN(c[0]) && !isNaN(c[1])) {
                    normCoor.push(c);
                }
            })
        }
        if (Helper.isEmpty(type)) {
            if (normCoor.length == 2)
                type = "line";
            else type = "polygon";
        }
        return {
            coor: normCoor,
            type: type
        };
    }

    update(data){
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

    //TODO - add set obj style function
    setObjStyle(){


    }
}
