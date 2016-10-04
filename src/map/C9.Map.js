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
            }
        };

        self._id        = options.id        || config.id;
        self._data      = options.data      || config.data;
        self._view      = options.view      || config.view;
        self._markers   = options.markers   || [];
        self._options   = options;
        self._layers    = options.layers    || config.layers;
        self.initMapConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/

    get id() {
        return this._id;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    get view() {
        return this._view;
    }

    get markers() {
        return this._markers;
    }

    get layers() {
        return this._layers;
    }

    get data() {
        return this._data;
    }
    /*=====  End of Getter  ======*/
    
    
    /*==============================
    =            Setter            =
    ==============================*/

    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }

    set height(newHeight) {
        if (newHeight) {
            this._height = newHeight;    
        }
    }

    set width(newWidth) {
        if (newWidth) {
            this._width = newWidth;
        }
    }

    set view(newView) {
        if (newView) {
            this._view = newView;
        }
    }

    set markers(newMarkers) {
        if (newMarkers) {
            this._markers = newMarkers;
        }
    }

    set layers(newLayers) {
        if (newLayers) {
            this._layers = newLayers;
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
        self.c9Markers = new ol.source.Vector({});
        //c9Objects contain all polygons, lines
        self.c9Objs = new ol.source.Vector({});
        //init all thing relating to user's data

        //layer
        self.initLayer();
        
        //quick markers
        self.initMarker();

        //object
        self.initObj();
    }

    draw() {
        var self = this;
        self.c9View = new ol.View({
            center: ol.proj.fromLonLat([self.view.lon, self.view.lat]),
            zoom: self.view.zoom > 2 ? self.view.zoom : 2,
            minZoom: 2,
        });
        self.c9Map = new ol.Map({
            target: self.id,
            layers: self.c9Layers,
            view: self.c9View,
            interactions : ol.interaction.defaults({doubleClickZoom :false})
        });

        //TODO - Create a function to gather all these event function
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
        var layers = self.layers;

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
     * Create marker
     * @param  {Number} latitude of marker
     * @param  {Number} longitude of marker
     * @param  {String} image source (support for both local and net)
     * @param  {Number} scale image if its size is too large - default = 1
     */
    createMarker(lat, lon, imgSrc = 'http://s21.postimg.org/blklb8scn/marker_icon.png', scale = 1){
        var self = this;

        var marker = new ol.Feature({
            type: 'c9GeoMarker',
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

        //add this marker to marker list (c9Markers)
        self.c9Markers.addFeature(marker);
    }

    /**
     * marker first set up
     */
    initMarker() {
        var self = this;
        //data
        var markers = self.markers;
        //add marker layer to layer list (c9Layers)
        self.c9Layers.push(new ol.layer.Vector({
            source: self.c9Markers
        }));

        if (markers.length === 0) return;

        if (markers instanceof Array) {
            markers.forEach(function(m, i) {
                self.createMarker(m.lat, m.lon, m.img, m.scale);
            });
        }
        else {
            self.createMarker(markers.lat, markers.lon, markers.img, markers.scale);
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

    /**
     * Create marker's flash effect
     * @param  {ol.Feature}
     */
    createMarkerEffect(feature){
        var self = this;
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

    updateInteraction(){
        var self = this;
        const LEFT_KEY = 37, RIGHT_KEY = 39, DURATION = 1000, LOAD_MAP_DELAY = 500;

        var getCoordinatesLonLat = function(f) {
            return ol.proj.transform(f.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
        }
        var getCoordinates = function(f) {
            return f.getGeometry().getCoordinates();
        }
        var transformCoordinates = function(c) {
            return ol.proj.transform(c, 'EPSG:3857', 'EPSG:4326');
        }
        var panAnimation = function(f){
            var pan = ol.animation.pan({
                duration: DURATION,
                source: (self.c9View.getCenter())
            });
            self.c9Map.beforeRender(pan);
            self.c9View.setCenter(getCoordinates(f));
        }
        /**
         * Caculate distance between marker and center view, plus direction compare with center
         * @param  {ol.Feature}
         * @return {[Number, Boolean]} Array of distance value and direction value (left if true, right if false)
         */
        var distanceAndDirection = function(f) {
            var center = transformCoordinates(self.c9View.getCenter());
            var fCoordinates = getCoordinatesLonLat(f);
            return [Math.sqrt(Math.pow(fCoordinates[0] - center[0], 2) + Math.pow(fCoordinates[1] - center[1], 2)), (fCoordinates[0] - center[0]) <= 0];
        }
        //register pointer move event to show cursor as pointer if user hover on markers
        self.c9Map.on('pointermove', function(evt) {
            self.c9Map.getTargetElement().style.cursor = self.c9Map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
        });

        //register map first render's event to show marker's effect
        self.c9Map.once('postrender', function(evt) {
            setTimeout(function(){
                self.c9Markers.getFeatures().forEach(function(f, i){
                    self.createMarkerEffect(f);
                })
            }, LOAD_MAP_DELAY);
        });

        //register click event to show effect on markers
        self.c9Map.on('click', function(evt){
            var f = self.c9Map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
                return feature;
            });
            if (f && f.get('type') == 'c9GeoMarker') {
                // self.createMarkerEffect(f);
                //test
                panAnimation(f)
            }
        });

        //register keydown event to change center view
        $(document).keydown(function(e) {
            var keydownAnimate = function(k) {
                var selectedFeature = undefined;
                var minDistance = Infinity;
                self.c9Markers.getFeatures().forEach(function(f, i) {
                    var checkAnimate = distanceAndDirection(f);

                    if (((checkAnimate[1] && k == LEFT_KEY) || (!checkAnimate[1] && k == RIGHT_KEY)) && checkAnimate[0] < minDistance && checkAnimate[0] != 0) {
                        minDistance = checkAnimate[0];
                        selectedFeature = f;
                    }
                });
                if (selectedFeature) {
                    setTimeout(self.createMarkerEffect(selectedFeature), LOAD_MAP_DELAY);
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
            }
        })
    }

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
     * @param  {[type]} type        [description]
     * @param  {[type]} data        [description]
     * @param  {[type]} strokeWidth [description]
     * @param  {[type]} strokeColor [description]
     * @param  {[type]} fillColor   [description]
     * @return {[type]}             [description]
     */
    createObj(type, data, strokeWidth, strokeColor, fillColor){
        var self = this;

        if (type != "polygon" && type != "line")
            throw "No support";

        if (data == self.c9Markers) {
            data = [];
            self.c9Markers.getFeatures().forEach(function (d) {
                data.push(ol.proj.transform(d.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326'));
            })
        }

        var obj = new ol.Feature({
            geometry: type == "polygon" ? new ol.geom.Polygon([data]) : new ol.geom.LineString(data, 'XY')
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
                    width: strokeWidth || 2,
                    color: strokeColor || "steelblue"
                }),
                fill: new ol.style.Fill({
                    color: fillColor || "rgba(0, 0, 255, 0.2)"
                })
            });
        }

        obj.setStyle(createObjStyle(strokeWidth, strokeColor, fillColor));

        //add this marker to marker list (c9Markers)
        self.c9Objs.addFeature(obj);
    }
}
