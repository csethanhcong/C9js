'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require('../helper/C9.Helper');

var _C2 = _interopRequireDefault(_C);

var _C3 = require('../charts/utils/C9.Tooltip');

var _C4 = _interopRequireDefault(_C3);

var _C5 = require('../helper/C9.DataAdapter');

var _C6 = _interopRequireDefault(_C5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map(options) {
        _classCallCheck(this, Map);

        var self = this;
        var config = {
            // container
            id: "body",
            // Layers:
            // BingMaps, OSM, Raster, Tile, TileImage, Vector, VectorTile,...
            // REF: http://openlayers.org/en/latest/apidoc/ol.source.html?stableonly=true
            layers: null,
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

        self._options = _C2.default.mergeDeep(config, options);
        self._dataSource = self._options.data;
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

    _createClass(Map, [{
        key: 'initMapConfig',

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/

        value: function initMapConfig() {
            var self = this;

            //c9Layers contain all layers
            self.c9Layers = [];
            //c9Markers contain all markers
            // self.c9Markers = new ol.source.Vector({});
            //c9Objects contain all polygons, lines
            self.c9Objs = new ol.source.Vector({});
            self.c9GeojsonObjs = [];
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
    }, {
        key: 'draw',
        value: function draw() {
            var self = this;
            var view = self.options.view,
                id = self.options.id;

            self.c9View = new ol.View({
                center: ol.proj.fromLonLat([view.lon, view.lat]),
                zoom: view.zoom > 2 ? view.zoom : 2,
                minZoom: 2
            });
            self.c9Map = new ol.Map({
                target: id,
                layers: self.c9Layers,
                view: self.c9View,
                interactions: ol.interaction.defaults({ doubleClickZoom: false })
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
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            });
            /********************************************************/
            //adapt data to obj
            self.addData(self.dataSource);
            //define interaction
            self.updateInteraction();
        }
        /*=====  End of Main Functions  ======*/

        /**
         * Create layer
         * @param  {String} type of layer
         * @param  {source} source data defined by C9
         */

    }, {
        key: 'createLayer',
        value: function createLayer(options) {
            var self = this;
            if (_C2.default.isEmpty(options)) return;

            var type = options.type || 'Tile',
                source = options.source || { name: 'OSM' };
            // style = options.style;

            var layer = new ol.layer[type]();
            layer.setSource(self.setupSource(source));
            // if (!Helper.isEmpty(style)) layer.setStyle(style);

            //adapt source data to c9obj
            //support maximum 2 source level
            var containFeature = true,
                vs;
            try {
                vs = layer.getSource();
                vs.getFeatures();
            } catch (err) {
                try {
                    vs = layer.getSource().getSource();
                    vs.getFeatures();
                } catch (err) {
                    containFeature = false;
                }
            }

            if (containFeature) {
                var readFormat = function readFormat(feature) {
                    var result = {};
                    feature.getKeys().forEach(function (k) {
                        result[k] = feature.getProperties()[k];
                    });
                    result['id'] = feature.getId();
                    return result;
                };
                var setStyle = function setStyle() {
                    if (!_C2.default.isEmpty(options.style)) {
                        try {
                            self.setStyle({ obj: layer.getSource(), style: options.style });
                        } catch (err) {
                            try {
                                self.setStyle({ obj: vs, style: options.style });
                            } catch (err) {
                                try {
                                    self.setStyle({ obj: layer, style: options.style });
                                } catch (err) {
                                    throw 'Cannot set style for this source';
                                }
                            }
                        }
                    }
                };
                //register layer loaded event to set data for obj
                vs.once('change', function (e) {
                    if (vs.getState() == 'ready') {
                        var objs = vs.getFeatures();
                        self.c9GeojsonObjs.push(layer.getSource());
                        // self.c9Objs.addFeatures(objs);

                        objs.forEach(function (o) {
                            o.set('data', readFormat(o));
                            o.set('type', 'c9-geojson');
                        });

                        //read data from url
                        if (!_C2.default.isEmpty(options.data) && _C2.default.isFunction(options.data.condition) && !_C2.default.isEmpty(options.data.file) && !_C2.default.isEmpty(options.data.file.url) && !_C2.default.isEmpty(options.data.file.type)) {
                            var da = new _C6.default(options.data);
                            da.getDataTarget('', function (data) {
                                var condition = options.data.condition;
                                var process = options.data.process;

                                if (!_C2.default.isEmpty(process) && _C2.default.isFunction(process)) data = process(data);

                                objs.forEach(function (o) {
                                    if (_C2.default.isArray(data)) {
                                        for (var i = 0; i < data.length; i++) {
                                            if (condition(o, data[i])) {
                                                for (var j in data[i]) {
                                                    o.get('data')[j] = data[i][j];
                                                }
                                                break;
                                            }
                                        }
                                    } else if (condition(o, data)) {
                                        for (var i in data) {
                                            o.get('data')[i] = data[i];
                                        }
                                    }
                                });
                                setStyle();
                            });
                        } else setStyle();
                    }
                });
            }

            self.c9Layers.push(layer);

            if (!_C2.default.isEmpty(self.c9Map)) self.c9Map.addLayer(layer);

            return layer;
        }

        /**
         * Init Layer base on first user's data
         */

    }, {
        key: 'initLayer',
        value: function initLayer() {
            var self = this;
            var layers = self.options.layers;

            if (layers instanceof Array) {
                layers.forEach(function (l, i) {
                    self.createLayer({ type: l.type, source: l.source, style: l.style, condition: l.condition, data: l.data });
                });
            } else if (_C2.default.isObject(layers)) {
                self.createLayer({ type: layers.type, source: layers.source, style: layers.style, condition: layers.condition, data: layers.data });
            }
        }

        /**
         * Setup source for layer
         * @param  {Object} source data style defined by c9
         * @return {String} return source (ol.source)
         */

    }, {
        key: 'setupSource',
        value: function setupSource(s) {
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
                                color: 'rgba(255, 255, 255, 0.2)'
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

    }, {
        key: 'updateInteraction',
        value: function updateInteraction() {
            var self = this;
            var LEFT_KEY = 37,
                RIGHT_KEY = 39,
                DEL_KEY = 46,
                DURATION = 1000,
                LOAD_MAP_DELAY = 500;

            // add default interaction of ol3
            // self.c9Map.addInteraction(self.c9DefaultHoverStyle = new ol.interaction.Select({
            //     condition: ol.events.condition.pointerMove
            // }));

            //normal: stroke 'rgb(49, 159, 211)' width: 1
            //        fill '#fff'


            /******************* SOME HELPER FUNCTION ********************/
            var getCenterLonLat = function getCenterLonLat(f) {
                return ol.proj.transform(getCenter(f), 'EPSG:3857', 'EPSG:4326');
            };
            var getCenter = function getCenter(f) {
                return ol.extent.getCenter(f.getGeometry().getExtent());
            };
            var transformCoordinates = function transformCoordinates(c) {
                return ol.proj.transform(c, 'EPSG:3857', 'EPSG:4326');
            };
            /**
             * Create pan animation on object
             * @param  {ol.Feature}
             */
            var panAnimation = function panAnimation(feature) {
                if (self.c9View.getCenter()[0] == getCenter(feature)[0] && self.c9View.getCenter()[1] == getCenter(feature)[1]) return;

                var pan = ol.animation.pan({
                    duration: DURATION,
                    source: self.c9View.getCenter()
                });
                self.c9Map.beforeRender(pan);
                self.c9View.setCenter(getCenter(feature));
            };
            /**
             * Create marker's flash effect
             * @param  {ol.Feature}
             */
            var createMarkerEffect = function createMarkerEffect(feature) {
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
            };
            /**
             * Caculate distance between marker and center view, plus direction compare with center
             * @param  {ol.Feature}
             * @return {[Number, Boolean]} Array of distance value and direction value (left if true, right if false)
             */
            var distanceAndDirection = function distanceAndDirection(f) {
                var center = transformCoordinates(self.c9View.getCenter());
                var fCoordinates = getCenterLonLat(f);
                return [Math.sqrt(Math.pow(fCoordinates[0] - center[0], 2) + Math.pow(fCoordinates[1] - center[1], 2)), fCoordinates[0] - center[0] <= 0];
            };
            var formatPopup = function formatPopup(data) {
                if (_C2.default.isEmpty(data)) return;
                var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                };
                var strongSpan = function strongSpan(strong, span) {
                    if (span == '' || _C2.default.isEmpty(span) || _C2.default.isObject(span)) return "";return "<strong>" + capitalizeFirstLetter(strong) + ":</strong>" + "<span> " + span + "</span></br>";
                };
                var result = strongSpan("Name", data.name),
                    v;
                if (!_C2.default.isEmpty(data.coor)) result += strongSpan("Lon", data.coor.lon || data.coor[0]) + strongSpan("Lat", data.coor.lat || data.coor[1]);

                for (var i in v = data.value) {
                    result += strongSpan(i, v[i]);
                }
                return result;
            };
            /*************************************************************/

            //register pointer move event to show cursor as pointer if user hover on markers
            self.c9Map.on('pointermove', function (evt) {
                var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                    return feature;
                });

                // new hover style
                if (f !== self.lastHoveredObj) {
                    if (self.lastHoveredObj) {
                        if (self.lastHoveredObj.get('type') != "c9-geojson" && self.lastHoveredObj.get('c9-style')) self.lastHoveredObj.setStyle(self.lastHoveredObj.get('c9-style'));else self.c9CustomHover.getSource().removeFeature(self.lastHoveredObj);
                    }
                    if (f) {
                        var fStyle = f.get('c9-style'),
                            strokeColor = 'rgb(0, 153, 255)',
                            strokeWidth = 3,
                            fillColor = 'rgba(255, 255, 255, 0.2)';
                        if (fStyle) {
                            strokeColor = fStyle.getStroke().getColor() == '#319FD3' ? 'rgb(0, 153, 255)' : self.getLightenColor(fStyle.getStroke().getColor());
                            strokeWidth = fStyle.getStroke().getWidth() + 2;
                            fillColor = fStyle.getFill().getColor() == 'rgba(255, 255, 255, 0.2)' ? 'rgba(255, 255, 255, 0.2)' : self.getLightenColor(fStyle.getFill().getColor());
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
                        if (fStyle) f.setStyle(newStyle);else {
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
                    } catch (err) {
                        throw "Check data format again";
                        return;
                    }

                    var content = self.options.tooltip.format ? self.options.tooltip.format(f.get('data')) : formatPopup(f.get('data'));
                    if (_C2.default.isEmpty(content) || content.toString().trim() == "") return;

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
            self.c9Map.once('postrender', function (evt) {
                setTimeout(function () {
                    self.c9Objs.getFeatures().forEach(function (f, i) {
                        if (f.get('type') == 'c9-marker') createMarkerEffect(f);
                    });
                }, LOAD_MAP_DELAY);
            });

            //register click event to show effect on markers
            self.c9Map.on('click', function (evt) {

                // if (evt instanceof CustomEvent) return;
                var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
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
                if (!f) self.c9Popup.getElement().style.display = 'none';
            });

            //register keydown event to change center view
            document.addEventListener('keydown', function (e) {
                var keydownAnimate = function keydownAnimate(k) {
                    var selectedFeature = undefined;
                    var minDistance = Infinity;
                    self.c9Objs.getFeatures().forEach(function (f, i) {
                        if (f.get('type') == "c9-marker") {
                            var checkAnimate = distanceAndDirection(f);

                            if ((checkAnimate[1] && k == LEFT_KEY || !checkAnimate[1] && k == RIGHT_KEY) && checkAnimate[0] < minDistance && checkAnimate[0] != 0) {
                                minDistance = checkAnimate[0];
                                selectedFeature = f;
                            }
                        }
                    });
                    if (selectedFeature) {
                        setTimeout(createMarkerEffect(selectedFeature), LOAD_MAP_DELAY);
                        panAnimation(selectedFeature);
                    }
                };
                switch (e.keyCode) {
                    case LEFT_KEY:
                        keydownAnimate(LEFT_KEY);
                        break;
                    case RIGHT_KEY:
                        keydownAnimate(RIGHT_KEY);
                        break;
                    case DEL_KEY:
                        // if (!Helper.isEmpty(self.lastSelectedObj) && (!Helper.isEmpty(self.lastSelectedObj.get('type')) || self.lastSelectedObj.get('type') != 'c9-geojson')) self.c9Objs.removeFeature(self.lastSelectedObj);
                        break;
                }
            });
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

    }, {
        key: 'createObject',
        value: function createObject(options) {
            var self = this;
            if (_C2.default.isEmpty(options) || _C2.default.isEmpty(options.data)) return;
            var data = options.data,
                style = options.style;
            /**
             * Create marker
             * @param  {Number} latitude of marker
             * @param  {Number} longitude of marker
             * @param  {String} image source (support for both local and net)
             * @param  {Number} scale image if its size is too large - default = 1
             */
            var createMarker = function createMarker(data, coor, options) {

                if (!_C2.default.isArray(coor) && coor.length != 2) return;

                var DEFAULT_SRC = 'http://s21.postimg.org/blklb8scn/marker_icon.png';
                var DEFAULT_SCALE = 1;

                var lat = coor[1],
                    lon = coor[0],
                    imgSrc = options ? options.imgSrc || DEFAULT_SRC : DEFAULT_SRC,
                    scale = options ? options.scale || DEFAULT_SCALE : DEFAULT_SCALE;

                var marker = new ol.Feature({
                    'data-ref': '',
                    type: 'c9-marker',
                    data: data,
                    // 'c9-id': ,
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
                });

                /**
                 * Create marker style
                 * @param  {String} image source
                 * @param  {Number} scale
                 * @return {ol.style.Style} return marker style
                 */
                var createMarkerStyle = function createMarkerStyle(imgSrc, scale) {
                    return new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1], //middle-width and bottom-height of image
                            src: imgSrc,
                            scale: scale
                        })
                    });
                };
                // marker.set('c9-style', markerStyle);
                marker.setStyle(createMarkerStyle(imgSrc, scale));

                //add this marker to marker list (c9Objs)
                self.c9Objs.addFeature(marker);
                return marker;
            };

            var coorAndType = self.normalizeCoordinate(data.coor);
            if (coorAndType.coor == null) return;

            //marker
            if (coorAndType.type == "marker") {
                return createMarker(data, coorAndType.coor, style);
            }

            // if (data == self.c9Markers) {
            //     data = [];
            //     self.c9Markers.getFeatures().forEach(function (d) {
            //         data.push(ol.proj.transform(d.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326'));
            //     })
            // }

            var strokeWidth = style ? style.strokeWidth || 1 : 1,
                strokeColor = style ? style.strokeColor || "#319FD3" : "#319FD3",
                fillColor = style ? style.fillColor || "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.2)";

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
            var createObjStyle = function createObjStyle(strokeWidth, strokeColor, fillColor) {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width: strokeWidth,
                        color: strokeColor
                    }),
                    fill: new ol.style.Fill({
                        color: fillColor
                    })
                });
            };

            var objStyle = createObjStyle(strokeWidth, strokeColor, fillColor);
            obj.set('c9-style', objStyle);
            obj.setStyle(objStyle);

            //add this marker to marker list (c9Objs)
            self.c9Objs.addFeature(obj);
            return obj;
        }

        /**
         * normalize coordinate
         * currently only support marker, linestring, polygon and multipolygon
         * @coor  {Array} coordinate of object
         * @return {Array} coordinate was normalized
         */

    }, {
        key: 'normalizeCoordinate',
        value: function normalizeCoordinate(coor) {
            var normCoor = [],
                type,
                error = { coor: null, type: null };
            if (_C2.default.isObject(coor) && coor.length == undefined || _C2.default.isArray(coor) && coor.length == 2 && !isNaN(coor[0]) && !isNaN(coor[1])) {
                // marker - [] - {}
                type = "marker";
                if (coor.length == undefined) {
                    if (_C2.default.isEmpty(coor.lat) || _C2.default.isEmpty(coor.lon)) return error;
                    normCoor = [coor.lon, coor.lat];
                } else {
                    normCoor = coor;
                }
            } else if (_C2.default.isArray(coor)) {
                // linestring - [{},{}] - [[],[]] - [{},[]] - [[],{}]
                var isArrayOrObject = function isArrayOrObject(obj) {
                    var result = {};
                    if (_C2.default.isObject(obj) && obj.length == undefined) {
                        result['check'] = !_C2.default.isEmpty(obj.lat) && !_C2.default.isEmpty(obj.lon);
                        if (result['check']) result['coor'] = [obj.lon, obj.lat];
                    } else {
                        result['check'] = _C2.default.isArray(obj) && obj.length == 2 && !isNaN(obj[0]) && !isNaN(obj[1]);
                        if (result['check']) result['coor'] = obj;
                    }
                    return result;
                };

                // check data inside to eliminate case: multipolygon contains 2 polygons
                if (coor.length == 2 && isArrayOrObject(coor[0]).check && isArrayOrObject(coor[1]).check) {
                    type = "line";
                    normCoor.push(isArrayOrObject(coor[0]).coor);
                    normCoor.push(isArrayOrObject(coor[1]).coor);
                }
                //polygon || multipolygon
                else if (coor.length >= 1) {
                        // multipolygon [[[[] || {}, ...]], [[[] || {}, ...]], ...]
                        if (!_C2.default.isEmpty(coor[0][0]) && !_C2.default.isEmpty(coor[0][0][0])) {
                            type = "multipolygon";
                            coor.forEach(function (pc, i) {
                                if (_C2.default.isArray(pc) && pc.length == 1) {
                                    normCoor.push([[]]);
                                    pc[0].forEach(function (c) {
                                        // data - [] || {}
                                        var obj = isArrayOrObject(c);
                                        if (obj.check) normCoor[i][0].push(obj.coor);
                                    });
                                    // cannot create polygon with the number of points is less than 2
                                    if (normCoor[i][0].length <= 2) return error;
                                } else return error; // because data format is not true
                            });
                        }
                        // polygon [[[] || {}, ...]]
                        else {
                                type = "polygon";
                                normCoor.push([]);
                                coor[0].forEach(function (c) {
                                    // data - [] || {}
                                    var obj = isArrayOrObject(c);
                                    if (obj.check) normCoor[0].push(obj.coor);
                                });
                                if (normCoor[0].length <= 2) return error;
                            }
                    } else return error;
            }
            return {
                coor: normCoor,
                type: type
            };
        }

        /**
         * create obj base on user data
         * @data  {Object} data structure: {coor: [], name: , value: }
         * return list of created object
         */

    }, {
        key: 'addData',
        value: function addData(data) {
            if (_C2.default.isEmpty(data) || _C2.default.isEmpty(data.plain) && _C2.default.isEmpty(data.file)) return;
            var self = this;

            var da = new _C6.default(data);
            da.getDataTarget('map', function (data) {
                self.data = data;
                if (!_C2.default.isEmpty(self.c9Map)) {
                    if (_C2.default.isArray(self.data)) self.data.forEach(function (d, i) {
                        self.createObject({ data: d });
                    });else self.createObject({ data: self.data });
                }
            });
        }
    }, {
        key: 'getObjects',
        value: function getObjects() {
            var c9GeojsonObjs = [];
            this.c9GeojsonObjs.forEach(function (o) {
                try {
                    c9GeojsonObjs = c9GeojsonObjs.concat(o.getSource().getFeatures());
                } catch (err) {
                    try {
                        c9GeojsonObjs = c9GeojsonObjs.concat(o.getFeatures());
                    } catch (err) {}
                }
            });
            return this.c9Objs.getFeatures().concat(c9GeojsonObjs);
        }
    }, {
        key: 'getMap',
        value: function getMap() {
            return this.c9Map;
        }

        /**
         * Custom Event Listener
         * @param  {[type]}   eventType [description]
         * @param  {Function} callback  [description]
         */

    }, {
        key: 'on',
        value: function on(eventType, callback) {
            var self = this;
            // Update Event Factory
            var eventFactoryViewport = {
                'click': function click(evt) {
                    var f = self.c9Map.forEachFeatureAtPixel(self.c9Map.getEventPixel(evt), function (feature, layer) {
                        return feature;
                    });
                    if (_C2.default.isFunction(callback) && f) {
                        callback.call(this, f);
                    }
                },
                'pointermove': function pointermove(evt) {
                    var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                        return feature;
                    });
                    if (_C2.default.isFunction(callback) && f) {
                        callback.call(this, f);
                    }
                },
                'postrender': function postrender(evt) {
                    if (_C2.default.isFunction(callback)) {
                        callback.call(this, evt);
                    }
                }
            };

            if (eventType == "click") self.c9Map.getViewport().addEventListener(eventType, eventFactoryViewport[eventType]);else if (eventType == "pointermove") self.c9Map.on(eventType, eventFactoryViewport[eventType]);else if (eventType == "postrender") self.c9Map.once(eventType, eventFactoryViewport[eventType]);
        }
    }, {
        key: 'getLightenColor',
        value: function getLightenColor(color) {
            if (color.includes('rgba')) {
                var alpha = color.split(',')[color.split(',').length - 1].replace(')', '');
                var currentColor = color.replace(',' + alpha, '').replace('a', '');
                var newColor = _C2.default.shadeColor(-0.2, currentColor);
                return 'rgba(' + newColor.split('(')[1].split(')')[0] + ',' + alpha.trim() + ')';
            } else return _C2.default.shadeColor(-0.2, color);
        }

        /**
         * set style: consist of layer, source and obj
         * @obj   {ol.layer || ol.source || ol.Feature}
         * @style {function || ol.style} style function || ol.style
         */

    }, {
        key: 'setStyle',
        value: function setStyle(options) {
            if (_C2.default.isEmpty(options) || _C2.default.isEmpty(options.obj) || _C2.default.isEmpty(options.style)) return;
            //create style for obj
            if (_C2.default.isFunction(options.style) || options.style instanceof ol.style.Style) {
                options.obj.setStyle(options.style);
            } else {
                var DEFAULT_SRC = 'http://s21.postimg.org/blklb8scn/marker_icon.png';
                var DEFAULT_SCALE = 1;

                var strokeColor = options.style.strokeColor ? options.style.strokeColor : '#319FD3',
                    strokeWidth = options.style.strokeWidth ? options.style.strokeColor : 1,
                    fillColor = options.style.fillColor ? options.style.fillColor : 'rgba(255, 255, 255, 0.2)',
                    imgSrc = options.style.type == 'marker' || options.style.type == 'c9-marker' ? options.style.imgSrc || DEFAULT_SRC : null,
                    scale = options.style.type == 'marker' || options.style.type == 'c9-marker' ? options.style.scale || DEFAULT_SCALE : null;

                var style;

                if (imgSrc != null) options.obj.setStyle(style = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1], //middle-width and bottom-height of image
                        src: imgSrc,
                        scale: scale
                    })
                }));else options.obj.setStyle(style = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: strokeColor,
                        width: strokeWidth
                    }),
                    fill: new ol.style.Fill({
                        color: fillColor
                    })
                }));

                options.obj.set('c9-style', style);
            }
        }

        // TODO - set hover style

        /**
         * create a layer from geojson file
         * @url  {String} url of geojson file
         */

    }, {
        key: 'createLayerFromGeojson',
        value: function createLayerFromGeojson(options) {
            var self = this;
            if (_C2.default.isEmpty(options) || _C2.default.isEmpty(options.url)) return;

            self.createLayer({
                type: "Image",
                source: {
                    name: "ImageVector",
                    source: {
                        name: 'Vector',
                        url: options.url,
                        format: 'GeoJSON'
                    }
                },
                data: options.data,
                style: options.style
            });
            //create style
            // self.setStyle({obj: layer.getSource(), style: options.style});

            // if (!Helper.isEmpty(options.style)) {
            //     if (Helper.isFunction(style) || style instanceof ol.style.Style) {
            //         layer.getSource().setStyle(options.style);
            //     }
            //     else {
            //         var strokeColor = options.style.strokeColor ? options.style.strokeColor : '#319FD3',
            //             strokeWidth = options.style.strokeWidth ? options.style.strokeColor : 1,
            //             fillColor   = options.style.fillColor   ? options.style.fillColor   : 'rgba(255, 255, 255, 0.2)';

            //         layer.getSource().setStyle(new ol.style.Style({
            //             stroke: new ol.style.Stroke({
            //                 color: strokeColor,
            //                 width: strokeWidth
            //             }),
            //             fill: new ol.style.Fill({
            //                 color: fillColor
            //             })
            //         }))
            //     }
            // }
        }
    }, {
        key: 'dataSource',
        get: function get() {
            return this._dataSource;
        },

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

        set: function set(newData) {
            if (newData) {
                this._dataSource = newData;
            }
        }
    }, {
        key: 'data',
        get: function get() {
            return this._data;
        },
        set: function set(newData) {
            if (newData) {
                this._data = newData;
            }
        }
    }, {
        key: 'options',
        get: function get() {
            return this._options;
        }
    }]);

    return Map;
}();

exports.default = Map;