import Helper from './C9.Helper';

export default class DataAdapter {

    constructor(options, chartType, callback) {

        var self = this;

        var config = {
            // ALL OPTIONS AVAILABLE IN DATA CONFIG
            keys: {
                name: "name",
                value: "value",
                x: "value.x",
                y: "value",
                coor: "coor"
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

        self._dataSource = [];
        self._dataTarget = []; // Initialize new Array to use Array methods
        self._dataRefs = [];

        self._options = options;
        self._chartType = chartType;
        self._callback = callback;

        self.updateConfig(config);
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get options() {
        return this._options;
    }

    get callback() {
        return this._callback;
    }

    get chartType() {
        return this._chartType;
    }

    get file() {
        return this._file;
    }

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
    set options(arg) {
        if (arg) {
            this._options = arg;
        }
    }

    set file(arg) {
        if (arg) {
            this._file = arg;
        }
    }

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
    updateConfig(config) {
        var self = this;

        self.options = Helper.mergeDeep(config, self.options);

        // self.initDataSource();
    }

    // initDataSource() {
    //     var self = this;

    //     // if (self.hasPlainData()) {
    //     //     self.executePlainData();
    //     // }
    //     // TESTING
    //     //  else if (self.hasFile()) {
    //     //     self.executeFile();
    //     // }
    // }

    hasPlainData() {
        var self = this;

        // return options.plain && Helper.isArray(options.plain);
        return !Helper.isEmpty(self.options.plain); // fix for map
    }

    hasFile() {
        var self = this;

        return Helper.isObject(self.options.file) 
            && !Helper.isEmpty(self.options.file.url) 
            && !Helper.isEmpty(self.options.file.type);
    }

    executePlainData(callback) {
        var self = this;

        self.dataSource = self.options.plain;

        callback.call(self, self.dataSource);
    }

    executeFile(callback) {
        var self = this;

        self.file  = self.options.file;

        if (!Helper.isEmpty(self.file)) {

            switch(self.file.type) {
                case "csv":
                    self.getCsv(callback);
                    break;
                case "tsv":
                    self.getTsv(callback);
                    break;
                case "text":
                    self.getText(callback);
                    break;
                case "json":
                    self.getJson(callback);
                    break;
                case "xml":
                    self.getXml(callback);
                    break;
                case "xhr":
                    self.getJson(callback);
                    break;
                default:
                    self.getJson(callback);
                    break;
            }
        }
    }

    getDataTypeForBarChart() {
        var self = this;

        if (!Helper.isEmpty(self.groups) && Helper.isArray(self.groups) && self.groups.length !== 1) {
            return "group";
        } else if (!Helper.isEmpty(self.stacks) && Helper.isArray(self.stacks)) {
            return "stack";
        }

        // default grouped bar if user do not defined groups for array value
        for (var i = self.dataSource.length - 1; i >= 0; i--) {
            if (Helper.isArray(Helper.get(self.keys.value, self.dataSource[i])))
                return "group";
        }

        return "single";
    }

    getDataTarget(type, callback) {
        var self = this;

        // TESTING
        if (self.hasFile()) {
            self.executeFile(function(data) {
                self.dataSource = data;
                self.generateDataTarget(type);
                callback.call(self, self.dataTarget);
            });

        } else if (self.hasPlainData()) {
            self.executePlainData(function(data) {
                self.dataSource = data;
                self.generateDataTarget(type);
                callback.call(self, self.dataTarget);
            });
        }
    }

    generateDataTarget(type) {
        var self = this;

        switch(type) {
            case "bar":
                self.getDataTargetForBarChart();
                break;

            case "line":
               self.getDataTargetForLineChart();
                break;

            case "pie":
               self.getDataTargetForPieChart();
                break;

            case "donut":
               self.getDataTargetForDonutChart();
                break;

            case "timeline":
               self.getDataTargetForTimelineChart();
                break;

            case "map":
               self.getDataTargetForMap();
                break;

            default:
               self.dataSource;
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
                let color = self.colorRange;
                let groups = self.groups;

                self.dataSource.forEach(function(data, index) {
                    let _data = [{
                        "name" : Helper.get(self.keys.name, data),
                        "value": Helper.get(self.keys.value, data),
                        "y0" : Helper.get(self.keys.value, data),
                        "y1" : Helper.get(self.keys.value, data),
                        "group": groups[0] || 'data' + (1),
                        "data-ref": Helper.guid(),
                        "enable" : true,
                        "color": color(0),
                    }];
                    self.dataTarget.push(_data);
                });

                // return self.dataTarget;
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
                            if (Helper.isEmpty(groups[i]))
                                groups.push('data' + (i+1));
                            _stackItem = {
                                "color": color(i),
                                "y0": d,
                                "y1": d > 0 ? d : 0,
                                "group": groups[i],
                                "name": Helper.get(self.keys.name, data),
                                "value": d,
                                "data-ref": Helper.guid(),
                                "group-ref": groupRefs[i],
                                "enable"    : true,
                            };
                            _stack.push(_stackItem);
                        });
                    } else {
                        if (groupRefs.length == 0)
                            groupRefs.push(Helper.guid());
                        if (Helper.isEmpty(groups[0]))
                            groups.push('data1');
                        _stackItem = {
                            "color": color(0),
                            "y0": _dsArray,
                            "y1": _dsArray > 0 ? _dsArray : 0,
                            "group": groups[0],
                            "name": Helper.get(self.keys.name, data),
                            "value": _dsArray,
                            "data-ref": Helper.guid(),
                            "group-ref": groupRefs[0],
                            "enable"    : true,
                        };
                        _stack.push(_stackItem);
                    }

                    self.dataTarget.push(_stack);
                });

                self.groups = groups;
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
                            if (Helper.isEmpty(stacks[i]))
                                stacks.push('data' + (i+1));
                            _stackItem = {
                                "color": color(i),
                                "y0": d,
                                "y1": d > 0 ? d + _posBase : _negBase,
                                "group": stacks[i],
                                "name": Helper.get(self.keys.name, data),
                                "value": d,
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
                        if (Helper.isEmpty(stacks[0]))
                            stacks.push('data1');
                        _stackItem = {
                            "color": color(0),
                            "y0": _dsArray,
                            "y1": _dsArray > 0 ? _dsArray : 0,
                            "group": stacks[0],
                            "name": Helper.get(self.keys.name, data),
                            "value": _dsArray,
                            "data-ref": Helper.guid(),
                            "group-ref": groupRefs[0],
                            "enable"    : true,
                        };
                        _stack.push(_stackItem);
                    }

                    self.dataTarget.push(_stack);
                });

                self.stacks = stacks;
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
    
    /*=================================================
    =              Normalize Data For Map             =
    =================================================*/

    getDataTargetForMap() {
        var self = this;

        var getDataValue = function(key, data, isArray){
            let _keys = key.split('.');
            let _value = Helper.get(key, data);
            let _v;
            if (_keys.length == 1 && keys[0] == 'value' && !isArray) {
                _v = _value;
            } else {
                _v = new Object();
                _v[_keys[_keys.length - 1]] = _value;
            }
            return _v;
        }

        var getData = function(data) {
            let _data = {
                "name": Helper.get(self.keys.name, data),
                "coor": Helper.get(self.keys.coor, data),
                "value": null
            }
            if (Helper.isArray(self.keys.value)) {
                self.keys.value.forEach(function(k) {
                    let _v = getDataValue(k, data, true);
                    _data.value = Helper.merge(_data.value, _v);
                });
            }
            else {
                _data.value = getDataValue(self.keys.value, data, false);
            }

            return _data;
        }

        if (!Helper.isArray(self.dataSource)) 
            self.dataTarget = getData(self.dataSource);
        else 
            self.dataSource.forEach(function(data) {
                self.dataTarget.push(getData(data));
            });

        return self.dataTarget;
    }

    /*=====    End of Normalize Data For Map   ======*/
    

    /*=============================================
    =            Data Input From Files            =
    =============================================*/
    
    getCsv(callback) {

        var self = this;

        d3.csv(self.file.url, function(err, data) {
            if (err) throw err;

            if (!Helper.isEmpty(callback) && Helper.isFunction(callback))
                callback.call(self, data);
        });
    }

    getTsv(callback) {

        var self = this;

        d3.tsv(self.file.url, function(err, data) {
            if (err) throw err;
            
            if (!Helper.isEmpty(callback) && Helper.isFunction(callback))
                callback.call(self, data);
        });

    }

    getText(callback) {

        var self = this;

        d3.text(self.file.url, function(err, data) {
            if (err) throw err;
            
            if (!Helper.isEmpty(callback) && Helper.isFunction(callback))
                callback.call(self, data);
        });

    }

    getJson(callback) {

        var self = this;

        d3.json(self.file.url, function(err, data) {
            if (err) throw err;

            if (!Helper.isEmpty(callback) && Helper.isFunction(callback))
                callback.call(self, data);
        });
    }

    getXml(callback) {

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

            if (!Helper.isEmpty(callback) && Helper.isFunction(callback))
                callback.call(self, data);
        });
    }
    
    /*=====  End of Data Input From Files  ======*/
    

}