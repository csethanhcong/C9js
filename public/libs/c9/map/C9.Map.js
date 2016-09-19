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
                source: "OSM"
            }, 
            view: {
                lat: 0,
                lon: 0,
                zoom: 2
            },
            controls: ol.control.defaults({
                attribution: false
            })
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

        //layers
        self.c9Layers = [];
        self.initLayer();
        
        //data
        self.initData();
        //quick markers
        self.initMarker();
    }

    draw() {
        var self = this;
        var view = self.view;
        self.map = new ol.Map({
            target: self.id,
            layers: self.c9Layers,
            view: new ol.View({
                center: ol.proj.fromLonLat([view.lon, view.lat]),
                zoom: view.zoom,
            })
        });
    }
    /*=====  End of Main Functions  ======*/

    

    //tile layer setup
    initLayer() {
        var self = this;
        self.layers.forEach(function(l, i) {
            var layer = new ol.layer[l.type];
            layer.setSource(self.setupSource(l.source));
            self.c9Layers.push(layer);
        })
    }

    //marker setup
    initMarker() {
        var self = this;
        var markers = this.markers;
        
        if (markers.length === 0) return;

        var vectorSource = new ol.source.Vector({
        });
        var styles = {};
        if (typeof(markers[0]) === 'object')
            markers.forEach(function(m, i) {
                var marker = new ol.Feature({
                    type: 'c9GeoMarker' + i,
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([m[1], m[0]]))
                });
                
                if (m[2] === undefined)
                    styles['c9GeoMarker' + i] = new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png',
                        })
                    })
                else
                    styles['c9GeoMarker' + i] = new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: m[2],
                            scale: m[3] === undefined ? 1 : m[3]
                        })
                    });
                    
                vectorSource.addFeature(marker);
            });
        //only 1 marker
        else {
            var marker = new ol.Feature({
                type: 'c9GeoMarker',
                geometry: new ol.geom.Point(ol.proj.fromLonLat([markers[1], markers[0]]))
            });
            
            if (markers[2] === undefined)
                styles['c9GeoMarker'] = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png',
                    })
                })
            else
                styles['c9GeoMarker'] = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: markers[2],
                        scale: markers[3] === undefined ? 1 : markers[3]
                    })
                });
                
            vectorSource.addFeature(marker);
        }

        self.c9Layers.push(new ol.layer.Vector({
            source: vectorSource,
            style: function(feature) {
                return styles[feature.get('type')];
            }
        }));
    }

    //source setup
    setupSource(s){
        var source = undefined;
        switch (s.name) {
            case 'BingMaps':
                source = new ol.source.BingMaps({
                    key: s.key,
                    imagerySet: s.imagerySet === undefined ? 'Road' : s.imagerySet
                });
                break;
            case 'Stamen':
                source = new ol.source.Stamen({
                    layer: s.layer === undefined ? 'watercolor' : s.layer
                });
                break;
            /********** TileJSON require ol >= v3.8.2 **********/
            case 'TileJSON':
                source = new ol.source.TileJSON({
                    url: s.url,
                    crossOrigin: s.crossOrigin === undefined ? 'anonymous' : s.crossOrigin
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
                        extractStyles: s.extractStyles === undefined ? true : false
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
}
