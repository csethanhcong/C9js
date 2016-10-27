import Helper from './C9.Helper';

export default class DataAdapter {

    constructor(options) {

        var self = this;

        var config = {
            // ALL OPTIONS AVAILABLE IN DATA CONFIG
            keys: {
                name: "name",
                value: "value",
                x: "value.x",
                y: "value"
            },
            groups: [],
            stacks: [],
            timeFormat: false,

            // NO NEED TO ADD TO DATA OPTIONS
            // Just use to define default parameters
            colorRange: null,
        };

        self._keys      = Helper.merge(options.keys, config.keys);
        self._groups    = options.groups    || config.groups;
        self._stacks    = options.stacks    || config.stacks;
        self._timeFormat    = options.timeFormat    || config.timeFormat;
        self._colorRange= options.colorRange|| config.colorRange;

        self._dataSource = null;
        self._dataTarget = []; // Initialize new Array to use Array methods
        self._dataRefs = [];
        self.initDataSource(options);


    }

    /*==============================
    =            Getter            =
    ==============================*/
    get keys() {
        return this._keys;
    }

    get dataSource() {
        return this._dataSource;
    }

    get dataTarget() {
        return this._dataTarget;
    }

    get groups() {
        return this._groups;
    }

    get stacks() {
        return this._stacks;
    }

    get colorRange() {
        return this._colorRange;
    }

    get timeFormat() {
        return this._timeFormat;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set keys(arg) {
        if (arg) {
            this._keys = arg;
        }
    }

    set dataSource(arg) {
        if (arg) {
            this._dataSource = arg;
        }
    }

    set dataTarget(arg) {
        if (arg) {
            this._dataTarget = arg;
        }
    }

    set groups(arg) {
        if (arg) {
            this._groups = arg;
        }
    }

    set stacks(arg) {
        if (arg) {
            this._stacks = arg;
        }
    }

    set colorRange(arg) {
        if (arg) {
            this._colorRange = arg;
        }
    }

    set timeFormat(arg) {
        if (arg) {
            this._timeFormat = arg;
        }
    }
    /*=====  End of Setter  ======*/

    /*======================================
    =            Main Functions            =
    ======================================*/
    initDataSource(options) {
        var self = this;

        if (self.hasPlainData(options)) {
            self.executePlainData(options);
        } else if (self.hasFile(options)) {
            self.executeFile(options);
        }
    }

    hasPlainData(options) {
        return options.plain && Helper.isArray(options.plain);
    }

    hasFile(options) {
        return options.file && Helper.isObject(options.file);
    }

    executePlainData(options) {
        var self = this;

        self._dataSource = options.plain;
    }

    executeFile(options) {
        var self = this;

        self._file  = Helper.merge(options.file, config.file);

        if (self._file && self._file.type) {

            switch(self._file.type) {
                case "csv":
                    self._dataSource = self.getCsv();
                    break;
                case "tsv":
                    self._dataSource = self.getTsv();
                    break;
                case "text":
                    self._dataSource = self.getText();
                    break;
                case "json":
                    self._dataSource = self.getJson();
                    break;
                case "xml":
                    self._dataSource = self.getXml();
                    break;
                case "xhr":
                    self._dataSource = self.getJson();
                    break;
                default:
                    self._dataSource = self.getJson();
                    break;
            }
        }
    }

    getDataTypeForBarChart() {
        var self = this;

        if (!Helper.isEmpty(self.groups) && Helper.isArray(self.groups)) {
            return "group";
        } else if (!Helper.isEmpty(self.stacks) && Helper.isArray(self.stacks)) {
            return "stack";
        }

        return "single";
    }

    getDataTarget(chartType) {
        var self = this;

        switch(chartType) {
            case "bar":
                return self.getDataTargetForBarChart();
                break;

            case "line":
                return self.getDataTargetForLineChart();
                break;

            case "pie":
                return self.getDataTargetForPieChart();
                break;

            case "donut":
                return self.getDataTargetForDonutChart();
                break;

            case "timeline":
                return self.getDataTargetForTimelineChart();
                break;
            default:
                return self.dataSource;
                break;
        }
    }

    getName(v) {
        return v.name; 
    }

    getValue(v) {
        var self = this;

        return Helper.get(self.keys, v);
    }

    /*=====  End of Main Functions  ======*/

    /*=================================================
    =            Normalize Data For Charts            =
    =================================================*/
    getDataTargetForBarChart() {
        var self = this;

        switch(self.getDataTypeForBarChart()) {
            case "single":
                self.dataSource.forEach(function(data, index) {
                    let _data = [{
                        "name" : Helper.get(self.keys.name, data),
                        "y0" : Helper.get(self.keys.value, data),
                        "y1" : Helper.get(self.keys.value, data),
                        "data-ref": Helper.guid(),
                        "enable" : true,
                    }];
                    self.dataTarget.push(_data);
                });

                return self.dataTarget;
                break;

            case "group":
                var groups = self.groups;
                var groupRefs = [];
                // Iterate over each group
                self.dataSource.forEach(function(data, index) {
                    let _dsArray    = Helper.get(self.keys.value, data);

                    let _stack      = [],
                        _stackItem = {
                            "color": "#ffffff",
                            "y0": 0,
                            "y1": 1,
                            "group": "",
                            "name": "",
                            "data-ref": "",
                            "group-ref": "",
                            "enable"    : true,
                        },
                        color = self.colorRange;

                    // Iterate each single bar in a group
                    if (Helper.isArray(_dsArray)) {
                        _dsArray.forEach(function(d, i) {
                            if (groupRefs.length - 1 < i)
                                groupRefs.push(Helper.guid());
                            _stackItem = {
                                "color": color(i),
                                "y0": d,
                                "y1": d > 0 ? d : 0,
                                "group": groups[i] || i,
                                "name": Helper.get(self.keys.name, data),
                                "data-ref": Helper.guid(),
                                "group-ref": groupRefs[i],
                                "enable"    : true,
                            };
                            _stack.push(_stackItem);
                        });
                    } else {
                        if (groupRefs.length == 0)
                            groupRefs.push(Helper.guid());
                        _stackItem = {
                            "color": color(0),
                            "y0": _dsArray,
                            "y1": _dsArray > 0 ? _dsArray : 0,
                            "group": groups[0] || 0,
                            "name": Helper.get(self.keys.name, data),
                            "data-ref": Helper.guid(),
                            "group-ref": groupRefs[0],
                            "enable"    : true,
                        };
                        _stack.push(_stackItem);
                    }

                    self.dataTarget.push(_stack);
                });

                return self.dataTarget;
                break;

            case "stack":
                var stacks = self.stacks;
                var groupRefs = [];
                // Iterate over each group
                self.dataSource.forEach(function(data, index) {
                    let _dsArray    = Helper.get(self.keys.value, data);

                    let _stack      = [],
                        _stackItem = {
                            "color": "#ffffff",
                            "y0": 0,
                            "y1": 1,
                            "group": "",
                            "name": "",
                            "data-ref": "",
                            "enable"    : true,
                        },
                        color = self.colorRange;

                    // Iterate each single bar in a group
                    if (Helper.isArray(_dsArray)) {
                        let _negBase = 0;
                        let _posBase = 0;
                        _dsArray.forEach(function(d, i) {
                            if (groupRefs.length - 1 < i)
                                groupRefs.push(Helper.guid());
                            _stackItem = {
                                "color": color(i),
                                "y0": d,
                                "y1": d > 0 ? d + _posBase : _negBase,
                                "group": stacks[i] || i,
                                "name": Helper.get(self.keys.name, data),
                                "data-ref": Helper.guid(),
                                "group-ref": groupRefs[i],
                                "enable"    : true,
                            };
                            _stack.push(_stackItem);
                            if (d > 0) _posBase += d;
                            else _negBase += d;
                        });
                    } else {
                        if (groupRefs.length == 0)
                            groupRefs.push(Helper.guid());
                        _stackItem = {
                            "color": color(0),
                            "y0": _dsArray,
                            "y1": _dsArray > 0 ? _dsArray : 0,
                            "group": stacks[0] || 0,
                            "name": Helper.get(self.keys.name, data),
                            "data-ref": Helper.guid(),
                            "group-ref": groupRefs[0],
                            "enable"    : true,
                        };
                        _stack.push(_stackItem);
                    }

                    self.dataTarget.push(_stack);
                });

                return self.dataTarget;
                break;

            default:
                return self.dataSource;
                break;
        }
    
    }

    getDataTargetForPieChart() {
        var self = this;

        let color = self.colorRange;
        self.dataSource.forEach(function(data, index) {
            let _data = {
                "color"     : color(index),
                "name"      : Helper.get(self.keys.name, data),
                "value"     : Helper.get(self.keys.value, data),
                "data-ref"  : Helper.guid(),
                "enable"    : true,
            };
            self.dataTarget.push(_data);
        });

        return self.dataTarget;

    }

    getDataTargetForDonutChart() {
        var self = this;

        let color = self.colorRange;
        self.dataSource.forEach(function(data, index) {
            let _data = {
                "color"     : color(index),
                "data-ref"  : Helper.guid(),
                "enable"    : true,
                "name"      : Helper.get(self.keys.name, data),
                "value"     : Helper.get(self.keys.value, data),
            };

            self.dataTarget.push(_data);
        });

        return self.dataTarget;

    }

    getDataTargetForTimelineChart() {
        var self = this;

        let color = self.colorRange;

        self.dataSource.forEach(function(data, index) {

            let _data = {
                // "color"     : color(index),
                "icon"      : data.icon,
                "name"      : Helper.get(self.keys.name, data),
                "value"     : [],
                "data-ref"  : Helper.guid(),
                "enable"    : true,
            };

            let _dsArray    = Helper.get(self.keys.value, data),
                _valueArray = [],
                _valueItem  = {
                    "name": Helper.get(self.keys.name, data),
                    "start": null ,
                    "end": null ,
                    "color": "#fff",
                    "data-ref": null,
                    "enable": true
                };

            if (Helper.isArray(_dsArray)) {
                _dsArray.forEach(function(d, i) {
                    _valueItem = {
                        "name": Helper.get(self.keys.name, data),
                        "start": new Date(d.start),
                        "end": new Date(d.end) ,
                        "color": color(index),
                        "data-ref": Helper.guid(),
                        "enable": true,
                    };
                    _valueArray.push(_valueItem);
                });
            } else {
                _valueItem = {
                    "name": Helper.get(self.keys.name, data),
                    "start": new Date(d.start),
                    "end": new Date(d.end) ,
                    "color": color(index),
                    "data-ref": Helper.guid(),
                    "enable": true,
                };
                _valueArray.push(_valueItem);
            }
            _data.value = _valueArray;

            self.dataTarget.push(_data);
        });
        return self.dataTarget;

    }
    
    getDataTargetForLineChart() {
        var self = this;

        let color = self.colorRange;
        self.dataSource.forEach(function(data, index) {
            let _data = {
                "color"     : color(index),
                "name"      : Helper.get(self.keys.name, data),
                "value"    : [],
                "data-ref"  : Helper.guid(),
                "enable"    : true,
            };

            let _valueXArray = Helper.get(self.keys.x, data),
                _valueYArray = Helper.get(self.keys.y, data),
                _valueArray = [],
                _valueItem  = {
                    "name"  : Helper.get(self.keys.name, data),
                    "valueX": null,
                    "valueY": null,
                    "data-ref": Helper.guid(),
                    "enable": true
                };

            if (Helper.isArray(_valueYArray)) {
                /**
                 *
                 * CASE 1: [{name:, value: []}, {}, ..]
                 *
                 */
                
                if (!Helper.isArray(_valueXArray)) {
                    _valueYArray.forEach(function(d, i) {
                        _valueItem = {
                            "name"  : Helper.get(self.keys.name, data),
                            "valueX": i,
                            "valueY": d,
                            "data-ref": Helper.guid(),
                            "enable": true
                        };
                        _valueArray.push(_valueItem);
                    });
                } else 

                /**
                 *
                 * CASE 2: [{name:, value: {x: [], y:[]}, {}, ..]
                 *
                 */
                
                if (Helper.isArray(_valueXArray) && !self.timeFormat) {
                    _valueYArray.forEach(function(d, i) {
                        _valueItem = {
                            "name"  : Helper.get(self.keys.name, data),
                            "valueX": !Helper.isEmpty(_valueXArray[i]) ? _valueXArray[i] : i,
                            "valueY": d,
                            "data-ref": Helper.guid(),
                            "enable": true
                        };
                        _valueArray.push(_valueItem);
                    });
                } else 

                /**
                 *
                 * CASE 3: [{name:, value: {x: [], y:[]}, {}, ..] with config `timeFormat`
                 *
                 */
                
                if (Helper.isArray(_valueXArray) && self.timeFormat) {
                    let _parser = Helper.dateParser(self.timeFormat);

                    _valueYArray.forEach(function(d, i) {
                        _valueItem = {
                            "name"  : Helper.get(self.keys.name, data),
                            "valueX": !Helper.isEmpty(_valueXArray[i]) ? _parser(_valueXArray[i]) : i,
                            "valueY": d,
                            "data-ref": Helper.guid(),
                            "enable": true
                        };
                        _valueArray.push(_valueItem);
                    });
                }
            }

            _data.value = _valueArray;

            self.dataTarget.push(_data);
        });

        return self.dataTarget;

    }
    /*=====  End of Normalize Data For Charts  ======*/
    
    /*=============================
    =            Utils            =
    =============================*/
    // getBarColorForBarChart() {
    //     var self = this;

    //     var color = self.colorRange;
    //     if (typeof color == 'string') {
    //         try {
    //             return d3.scale[color]();    
    //         }
    //         catch(err) {
    //             return function(i) {
    //                 return color;
    //             };
    //         }
    //     } else if (typeof color == 'object') {
    //         return d3.scale.ordinal().range(color);
    //     }
    // }
    
    
    /*=====  End of Utils  ======*/
    

    /*=============================================
    =            Data Input From Files            =
    =============================================*/
    
    getCsv() {

        var self = this;

        d3.csv(self.file.url, function(err, data) {
            if (err) throw err;
            
            return data;
        });

    }

    getTsv() {

        var self = this;

        d3.tsv(self.file.url, function(err, data) {
            if (err) throw err;
            
            return data;
        });

    }

    getText() {

        var self = this;

        d3.text(self.file.url, function(err, data) {
            if (err) throw err;
            
            return JSON.parse(data);
        });

    }

    getJson() {
        var self = this;

        d3.json(self.file.url, function(err, data) {
            if (err) throw err;
            
            return data;
        });
    }

    getXml() {
        var self = this;

        d3.xml(self.file.url, function(err, data) {
            if (err) throw err;
            
            // Convert the XML document to an array of objects.
            // Note that querySelectorAll returns a NodeList, not a proper Array,
            // so we must use map.call to invoke array methods.
            data = [].map.call(data.querySelectorAll("data"), function(d) {
                return {
                    name: d.querySelector("name").textContent,
                    value: d.querySelector("value").textContent
                };
            });

            return data;
        });
    }
    
    /*=====  End of Data Input From Files  ======*/
    

}