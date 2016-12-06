"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require("./C9.Helper");

var _C2 = _interopRequireDefault(_C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataAdapter = function () {
    function DataAdapter(options, chartType, callback) {
        _classCallCheck(this, DataAdapter);

        var self = this;

        var config = {
            // ALL OPTIONS AVAILABLE IN DATA CONFIG
            keys: {
                name: "name",
                value: "value",
                x: "value.x",
                y: "value",
                coor: "coor",
                icon: "icon"
            },
            groups: [],
            stacks: [],
            timeFormat: false,

            // NO NEED TO ADD TO DATA OPTIONS
            // Just use to define default parameters
            colorRange: null
        };

        self._keys = _C2.default.merge(options.keys, config.keys);
        self._groups = options.groups || config.groups;
        self._stacks = options.stacks || config.stacks;
        self._timeFormat = options.timeFormat || config.timeFormat;
        self._colorRange = options.colorRange || config.colorRange;

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


    _createClass(DataAdapter, [{
        key: "updateConfig",

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        value: function updateConfig(config) {
            var self = this;

            self.options = _C2.default.mergeDeep(config, self.options);

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

    }, {
        key: "hasPlainData",
        value: function hasPlainData() {
            var self = this;

            return self.options.plain && _C2.default.isArray(self.options.plain) || !_C2.default.isEmpty(self.options.plain);
            // return !Helper.isEmpty(self.options.plain); // fix for map
        }
    }, {
        key: "hasFile",
        value: function hasFile() {
            var self = this;

            return _C2.default.isObject(self.options.file) && !_C2.default.isEmpty(self.options.file.url) && !_C2.default.isEmpty(self.options.file.type);
        }
    }, {
        key: "executePlainData",
        value: function executePlainData(callback) {
            var self = this;

            self.dataSource = self.options.plain;

            callback.call(self, self.dataSource);
        }
    }, {
        key: "executeFile",
        value: function executeFile(callback) {
            var self = this;

            self.file = self.options.file;

            if (!_C2.default.isEmpty(self.file)) {

                switch (self.file.type) {
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
    }, {
        key: "getDataTypeForBarChart",
        value: function getDataTypeForBarChart() {
            var self = this;

            if (!_C2.default.isEmpty(self.groups) && _C2.default.isArray(self.groups) && self.groups.length !== 1) {
                return "group";
            } else if (!_C2.default.isEmpty(self.stacks) && _C2.default.isArray(self.stacks)) {
                return "stack";
            }

            // default grouped bar if user do not defined groups for array value
            for (var i = self.dataSource.length - 1; i >= 0; i--) {
                if (_C2.default.isArray(_C2.default.get(self.keys.value, self.dataSource[i]))) return "group";
            }

            return "single";
        }
    }, {
        key: "getDataTarget",
        value: function getDataTarget(type, callback) {
            var self = this;

            // TESTING
            if (self.hasFile()) {
                self.executeFile(function (data) {
                    self.dataSource = data;
                    self.generateDataTarget(type);
                    callback.call(self, self.dataTarget);
                });
            } else if (self.hasPlainData()) {
                self.executePlainData(function (data) {
                    self.dataSource = data;
                    self.generateDataTarget(type);
                    callback.call(self, self.dataTarget);
                });
            }
        }
    }, {
        key: "generateDataTarget",
        value: function generateDataTarget(type) {
            var self = this;

            switch (type) {
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
                    self.dataTarget = self.dataSource;
                    break;
            }
        }
    }, {
        key: "getName",
        value: function getName(v) {
            return v.name;
        }
    }, {
        key: "getValue",
        value: function getValue(v) {
            var self = this;

            return _C2.default.get(self.keys, v);
        }

        /*=====  End of Main Functions  ======*/

        /*=================================================
        =            Normalize Data For Charts            =
        =================================================*/

    }, {
        key: "getDataTargetForBarChart",
        value: function getDataTargetForBarChart() {
            var self = this;

            var groups;
            var groupRefs;
            var stacks;
            var groupRefs;

            var _ret = function () {
                switch (self.getDataTypeForBarChart()) {
                    case "single":
                        var color = self.colorRange;
                        var groups = self.groups;

                        self.dataSource.forEach(function (data, index) {
                            var _data = [{
                                "name": _C2.default.get(self.keys.name, data),
                                "value": _C2.default.get(self.keys.value, data),
                                "y0": _C2.default.get(self.keys.value, data),
                                "y1": _C2.default.get(self.keys.value, data),
                                "group": groups[0] || 'data' + 1,
                                "data-ref": _C2.default.guid(),
                                "enable": true,
                                "color": color(0)
                            }];
                            self.dataTarget.push(_data);
                        });

                        // return self.dataTarget;
                        break;

                    case "group":
                        groups = self.groups;
                        groupRefs = [];
                        // Iterate over each group

                        self.dataSource.forEach(function (data, index) {
                            var _dsArray = _C2.default.get(self.keys.value, data);

                            var _stack = [],
                                _stackItem = {
                                "color": "#ffffff",
                                "y0": 0,
                                "y1": 1,
                                "group": "",
                                "name": "",
                                "data-ref": "",
                                "group-ref": "",
                                "enable": true
                            },
                                color = self.colorRange;

                            // Iterate each single bar in a group
                            if (_C2.default.isArray(_dsArray)) {
                                _dsArray.forEach(function (d, i) {
                                    if (groupRefs.length - 1 < i) groupRefs.push(_C2.default.guid());
                                    if (_C2.default.isEmpty(groups[i])) groups.push('data' + (i + 1));
                                    _stackItem = {
                                        "color": color(i),
                                        "y0": d,
                                        "y1": d > 0 ? d : 0,
                                        "group": groups[i],
                                        "name": _C2.default.get(self.keys.name, data),
                                        "value": d,
                                        "data-ref": _C2.default.guid(),
                                        "group-ref": groupRefs[i],
                                        "enable": true
                                    };
                                    _stack.push(_stackItem);
                                });
                            } else {
                                if (groupRefs.length == 0) groupRefs.push(_C2.default.guid());
                                if (_C2.default.isEmpty(groups[0])) groups.push('data1');
                                _stackItem = {
                                    "color": color(0),
                                    "y0": _dsArray,
                                    "y1": _dsArray > 0 ? _dsArray : 0,
                                    "group": groups[0],
                                    "name": _C2.default.get(self.keys.name, data),
                                    "value": _dsArray,
                                    "data-ref": _C2.default.guid(),
                                    "group-ref": groupRefs[0],
                                    "enable": true
                                };
                                _stack.push(_stackItem);
                            }

                            self.dataTarget.push(_stack);
                        });

                        self.groups = groups;
                        return {
                            v: self.dataTarget
                        };
                        break;

                    case "stack":
                        stacks = self.stacks;
                        groupRefs = [];
                        // Iterate over each group

                        self.dataSource.forEach(function (data, index) {
                            var _dsArray = _C2.default.get(self.keys.value, data);

                            var _stack = [],
                                _stackItem = {
                                "color": "#ffffff",
                                "y0": 0,
                                "y1": 1,
                                "group": "",
                                "name": "",
                                "data-ref": "",
                                "enable": true
                            },
                                color = self.colorRange;

                            // Iterate each single bar in a group
                            if (_C2.default.isArray(_dsArray)) {
                                (function () {
                                    var _negBase = 0;
                                    var _posBase = 0;
                                    _dsArray.forEach(function (d, i) {
                                        if (groupRefs.length - 1 < i) groupRefs.push(_C2.default.guid());
                                        if (_C2.default.isEmpty(stacks[i])) stacks.push('data' + (i + 1));
                                        _stackItem = {
                                            "color": color(i),
                                            "y0": d,
                                            "y1": d > 0 ? d + _posBase : _negBase,
                                            "group": stacks[i],
                                            "name": _C2.default.get(self.keys.name, data),
                                            "value": d,
                                            "data-ref": _C2.default.guid(),
                                            "group-ref": groupRefs[i],
                                            "enable": true
                                        };
                                        _stack.push(_stackItem);
                                        if (d > 0) _posBase += d;else _negBase += d;
                                    });
                                })();
                            } else {
                                if (groupRefs.length == 0) groupRefs.push(_C2.default.guid());
                                if (_C2.default.isEmpty(stacks[0])) stacks.push('data1');
                                _stackItem = {
                                    "color": color(0),
                                    "y0": _dsArray,
                                    "y1": _dsArray > 0 ? _dsArray : 0,
                                    "group": stacks[0],
                                    "name": _C2.default.get(self.keys.name, data),
                                    "value": _dsArray,
                                    "data-ref": _C2.default.guid(),
                                    "group-ref": groupRefs[0],
                                    "enable": true
                                };
                                _stack.push(_stackItem);
                            }

                            self.dataTarget.push(_stack);
                        });

                        self.stacks = stacks;
                        return {
                            v: self.dataTarget
                        };
                        break;

                    default:
                        return {
                            v: self.dataSource
                        };
                        break;
                }
            }();

            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
    }, {
        key: "getDataTargetForPieChart",
        value: function getDataTargetForPieChart() {
            var self = this;

            var color = self.colorRange;
            self.dataSource.forEach(function (data, index) {
                var _data = {
                    "color": color(index),
                    "name": _C2.default.get(self.keys.name, data),
                    "value": _C2.default.get(self.keys.value, data),
                    "data-ref": _C2.default.guid(),
                    "enable": true
                };
                self.dataTarget.push(_data);
            });

            return self.dataTarget;
        }
    }, {
        key: "getDataTargetForDonutChart",
        value: function getDataTargetForDonutChart() {
            var self = this;

            var color = self.colorRange;
            self.dataSource.forEach(function (data, index) {
                var _data = {
                    "color": color(index),
                    "data-ref": _C2.default.guid(),
                    "enable": true,
                    "name": _C2.default.get(self.keys.name, data),
                    "value": _C2.default.get(self.keys.value, data)
                };

                self.dataTarget.push(_data);
            });

            return self.dataTarget;
        }
    }, {
        key: "getDataTargetForTimelineChart",
        value: function getDataTargetForTimelineChart() {
            var self = this;

            var color = self.colorRange;

            self.dataSource.forEach(function (data, index) {

                var _data = {
                    // "color"     : color(index),
                    "icon": _C2.default.get(self.keys.icon, data),
                    "name": _C2.default.get(self.keys.name, data),
                    "value": [],
                    "data-ref": _C2.default.guid(),
                    "enable": true
                };

                var _dsArray = _C2.default.get(self.keys.value, data),
                    _valueArray = [],
                    _valueItem = {
                    "name": _C2.default.get(self.keys.name, data),
                    "start": null,
                    "end": null,
                    "color": "#fff",
                    "data-ref": null,
                    "enable": true,
                    "icon": null
                };

                if (_C2.default.isArray(_dsArray)) {
                    _dsArray.forEach(function (d, i) {
                        _valueItem = {
                            "name": _C2.default.get(self.keys.name, data),
                            "start": new Date(d.start),
                            "end": new Date(d.end),
                            "color": color(index),
                            "data-ref": _C2.default.guid(),
                            "enable": true,
                            "icon": _C2.default.get(self.keys.icon, data)
                        };
                        _valueArray.push(_valueItem);
                    });
                } else {
                    _valueItem = {
                        "name": _C2.default.get(self.keys.name, data),
                        "start": new Date(_dsArray.start),
                        "end": new Date(_dsArray.end),
                        "color": color(index),
                        "data-ref": _C2.default.guid(),
                        "enable": true,
                        "icon": _C2.default.get(self.keys.icon, data)
                    };
                    _valueArray.push(_valueItem);
                }
                _data.value = _valueArray;

                self.dataTarget.push(_data);
            });
            return self.dataTarget;
        }
    }, {
        key: "getDataTargetForLineChart",
        value: function getDataTargetForLineChart() {
            var self = this;

            var color = self.colorRange;
            self.dataSource.forEach(function (data, index) {
                var _data = {
                    "color": color(index),
                    "name": _C2.default.get(self.keys.name, data),
                    "value": [],
                    "data-ref": _C2.default.guid(),
                    "enable": true
                };

                var _valueXArray = _C2.default.get(self.keys.x, data),
                    _valueYArray = _C2.default.get(self.keys.y, data),
                    _valueArray = [],
                    _valueItem = {
                    "name": _C2.default.get(self.keys.name, data),
                    "valueX": null,
                    "valueY": null,
                    "data-ref": _C2.default.guid(),
                    "enable": true
                };

                if (_C2.default.isArray(_valueYArray)) {
                    /**
                     *
                     * CASE 1: [{name:, value: []}, {}, ..]
                     *
                     */

                    if (!_C2.default.isArray(_valueXArray)) {
                        _valueYArray.forEach(function (d, i) {
                            _valueItem = {
                                "name": _C2.default.get(self.keys.name, data),
                                "valueX": i,
                                "valueY": d,
                                "data-ref": _C2.default.guid(),
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

                        if (_C2.default.isArray(_valueXArray) && !self.timeFormat) {
                            _valueYArray.forEach(function (d, i) {
                                _valueItem = {
                                    "name": _C2.default.get(self.keys.name, data),
                                    "valueX": !_C2.default.isEmpty(_valueXArray[i]) ? _valueXArray[i] : i,
                                    "valueY": d,
                                    "data-ref": _C2.default.guid(),
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

                            if (_C2.default.isArray(_valueXArray) && self.timeFormat) {
                                (function () {
                                    var _parser = _C2.default.dateParser(self.timeFormat);

                                    _valueYArray.forEach(function (d, i) {
                                        _valueItem = {
                                            "name": _C2.default.get(self.keys.name, data),
                                            "valueX": !_C2.default.isEmpty(_valueXArray[i]) ? _parser(_valueXArray[i]) : i,
                                            "valueY": d,
                                            "data-ref": _C2.default.guid(),
                                            "enable": true
                                        };
                                        _valueArray.push(_valueItem);
                                    });
                                })();
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

    }, {
        key: "getDataTargetForMap",
        value: function getDataTargetForMap() {
            var self = this;

            var getDataValue = function getDataValue(key, data, isArray) {
                var _keys = key.split('.');
                var _value = _C2.default.get(key, data);
                var _v = void 0;
                if (_keys.length == 1 && _keys[0] == 'value' && !isArray) {
                    _v = _value;
                } else {
                    _v = new Object();
                    _v[_keys[_keys.length - 1]] = _value;
                }
                return _v;
            };

            var getData = function getData(data) {
                var _data = {
                    "name": _C2.default.get(self.keys.name, data),
                    "coor": _C2.default.get(self.keys.coor, data),
                    "value": null
                };
                if (_C2.default.isArray(self.keys.value)) {
                    self.keys.value.forEach(function (k) {
                        var _v = getDataValue(k, data, true);
                        _data.value = _C2.default.merge(_data.value, _v);
                    });
                } else {
                    _data.value = getDataValue(self.keys.value, data, false);
                }

                return _data;
            };

            if (!_C2.default.isArray(self.dataSource)) self.dataTarget = getData(self.dataSource);else self.dataSource.forEach(function (data) {
                self.dataTarget.push(getData(data));
            });

            return self.dataTarget;
        }

        /*=====    End of Normalize Data For Map   ======*/

        /*=============================================
        =            Data Input From Files            =
        =============================================*/

    }, {
        key: "getCsv",
        value: function getCsv(callback) {

            var self = this;

            d3.csv(self.file.url, function (err, data) {
                if (err) throw err;

                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
            });
        }
    }, {
        key: "getTsv",
        value: function getTsv(callback) {

            var self = this;

            d3.tsv(self.file.url, function (err, data) {
                if (err) throw err;

                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
            });
        }
    }, {
        key: "getText",
        value: function getText(callback) {

            var self = this;

            d3.text(self.file.url, function (err, data) {
                if (err) throw err;

                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
            });
        }
    }, {
        key: "getJson",
        value: function getJson(callback) {

            var self = this;

            d3.json(self.file.url, function (err, data) {
                if (err) throw err;

                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
            });
        }
    }, {
        key: "getXml",
        value: function getXml(callback) {

            var self = this;

            d3.xml(self.file.url, function (err, data) {
                if (err) throw err;

                // Convert the XML document to an array of objects.
                // Note that querySelectorAll returns a NodeList, not a proper Array,
                // so we must use map.call to invoke array methods.
                data = [].map.call(data.querySelectorAll("data"), function (d) {
                    return {
                        name: d.querySelector("name").textContent,
                        value: d.querySelector("value").textContent
                    };
                });

                if (!_C2.default.isEmpty(callback) && _C2.default.isFunction(callback)) callback.call(self, data);
            });
        }

        /*=====  End of Data Input From Files  ======*/

    }, {
        key: "options",
        get: function get() {
            return this._options;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        set: function set(arg) {
            if (arg) {
                this._options = arg;
            }
        }
    }, {
        key: "callback",
        get: function get() {
            return this._callback;
        }
    }, {
        key: "chartType",
        get: function get() {
            return this._chartType;
        }
    }, {
        key: "file",
        get: function get() {
            return this._file;
        },
        set: function set(arg) {
            if (arg) {
                this._file = arg;
            }
        }
    }, {
        key: "keys",
        get: function get() {
            return this._keys;
        },
        set: function set(arg) {
            if (arg) {
                this._keys = arg;
            }
        }
    }, {
        key: "dataSource",
        get: function get() {
            return this._dataSource;
        },
        set: function set(arg) {
            if (arg) {
                this._dataSource = arg;
            }
        }
    }, {
        key: "dataTarget",
        get: function get() {
            return this._dataTarget;
        },
        set: function set(arg) {
            if (arg) {
                this._dataTarget = arg;
            }
        }
    }, {
        key: "groups",
        get: function get() {
            return this._groups;
        },
        set: function set(arg) {
            if (arg) {
                this._groups = arg;
            }
        }
    }, {
        key: "stacks",
        get: function get() {
            return this._stacks;
        },
        set: function set(arg) {
            if (arg) {
                this._stacks = arg;
            }
        }
    }, {
        key: "colorRange",
        get: function get() {
            return this._colorRange;
        },
        set: function set(arg) {
            if (arg) {
                this._colorRange = arg;
            }
        }
    }, {
        key: "timeFormat",
        get: function get() {
            return this._timeFormat;
        },
        set: function set(arg) {
            if (arg) {
                this._timeFormat = arg;
            }
        }
    }]);

    return DataAdapter;
}();

exports.default = DataAdapter;