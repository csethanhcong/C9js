export default class Map {
    constructor(options) {
        var self    = this;
        var config  = {
            // container
            id: "body",
            
            // Layers:
            // BingMaps, OSM, Raster, Tile, TileImage, Vector, VectorTile,...
            // REF: http://openlayers.org/en/latest/apidoc/ol.source.html?stableonly=true
            layer: "OSM", 
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
        self._width     = options.width     || config.width;
        self._data      = options.data      || config.data;
        self._height    = options.height    || config.height;
        self._view      = options.view      || config.view;
        self._markers   = options.markers   || [];
        self._options   = options;
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

    /*=====  End of Setter  ======*/
    
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    
    initMapConfig() {
        var vectorSource = new ol.source.Vector({
        });
        var styles = {};
        this.markers.forEach(function(m, i) {
            var marker = new ol.Feature({
                type: 'c9GeoMarker' + i,
                geometry: new ol.geom.Point(ol.proj.fromLonLat([m[1], m[0]]))
            });
            if (m[2] === undefined)
                styles['c9GeoMarker' + i] = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: 'https://farm9.staticflickr.com/8427/28670431094_0c20eb415a_o_d.png',
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
        
            
        this.map = new ol.Map({
            target: this.id,
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              }),
              new ol.layer.Vector({
                source: vectorSource,
                style: function(feature) {
                    return styles[feature.get('type')];
                }
              })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([this.view.lon, this.view.lat]),
                zoom: this.view.zoom
            })
        });
    }

    /*=====  End of Main Functions  ======*/

}
