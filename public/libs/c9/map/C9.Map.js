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
            controls: ol.control.defaults({
                attribution: false
            }),
            viewSetting: {
                center: [0, 0],
                zoom: 2
            },
            
        };

        self._id        = options.id        || config.id;
        self._width     = options.width     || config.width;
        self._data      = options.data      || config.data;
        self._height    = options.height    || config.height;
        self._colorRange= options.color_range|| config.color_range;
        self._margin    = self.extend(options.margin, config.margin);
        self._svg       = null;
        self._options   = options;

        self.initMapConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    /*=====  End of Getter  ======*/
    
    
    /*==============================
    =            Setter            =
    ==============================*/
    /*=====  End of Setter  ======*/
    
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    
    initMapConfig() {
        self.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            controls: self.controls.extend([self.attribution]),
            target: self.id,
            view: new ol.View(self.viewSetting)
        });
    }

    /*=====  End of Main Functions  ======*/

}
