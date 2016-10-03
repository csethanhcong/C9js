"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _C = require("./C9.Helper");

var _C2 = _interopRequireDefault(_C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataAdapter = function () {
    function DataAdapter(options) {
        _classCallCheck(this, DataAdapter);

        var self = this;

        var config = {
            // ALL OPTIONS AVAILABLE IN DATA CONFIG
            keys: {
                name: "name",
                value: "value"
            },
            groups: [],
            stacks: [],

            // NO NEED TO ADD TO DATA OPTIONS
            // Just use to define default parameters
            colorRange: null
        };

        self._keys = _C2.default.merge(options.keys, config.keys);
        self._groups = options.groups || config.groups;
        self._stacks = options.stacks || config.stacks;
        self._colorRange = options.colorRange || config.colorRange;

        self._dataSource = null;
        self._dataTarget = []; // Initialize new Array to use Array methods
        self.initDataSource(options);
    }

    /*==============================
    =            Getter            =
    ==============================*/


    _createClass(DataAdapter, [{
        key: "initDataSource",

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        value: function initDataSource(options) {
            var self = this;

            if (self.hasPlainData(options)) {
                self.executePlainData(options);
            } else if (self.hasFile(options)) {
                self.executeFile(options);
            }
        }
    }, {
        key: "hasPlainData",
        value: function hasPlainData(options) {
            return options.plain && _C2.default.isArray(options.plain);
        }
    }, {
        key: "hasFile",
        value: function hasFile(options) {
            return options.file && _C2.default.isObject(options.file);
        }
    }, {
        key: "executePlainData",
        value: function executePlainData(options) {
            var self = this;

            self._dataSource = options.plain;
        }
    }, {
        key: "executeFile",
        value: function executeFile(options) {
            var self = this;

            self._file = _C2.default.merge(options.file, config.file);

            if (self._file && self._file.type) {

                switch (self._file.type) {
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
    }, {
        key: "getDataTypeForBarChart",
        value: function getDataTypeForBarChart() {
            var self = this;

            if (!_C2.default.isEmpty(self.groups) && _C2.default.isArray(self.groups)) {
                return "group";
            } else if (!_C2.default.isEmpty(self.stacks) && _C2.default.isArray(self.stacks)) {
                return "stack";
            }

            return "single";
        }
    }, {
        key: "getDataTarget",
        value: function getDataTarget(chartType) {
            var self = this;

            switch (chartType) {
                case "bar":
                    return self.getDataTargetForBarChart();
                    break;

                case "line":

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

            switch (self.getDataTypeForBarChart()) {
                case "single":
                    self.dataSource.forEach(function (data, index) {
                        var _stack = [];
                        var _data = {
                            "max": _C2.default.get(self.keys.value, data),
                            "stack": [{
                                "name": _C2.default.get(self.keys.name, data),
                                "y0": 0,
                                "y1": _C2.default.get(self.keys.value, data),
                                "enable": true
                            }]
                        };
                        self.dataTarget.push(_data);
                    });

                    return self.dataTarget;
                    break;

                case "group":
                    var groups = self.groups;

                    // Iterate over each group
                    self.dataSource.forEach(function (data, index) {
                        var _group = {
                            "max": null,
                            "stack": []
                        },
                            _dsArray = _C2.default.get(self.keys.value, data);

                        // If Group has only 1 value, so MAX = this.value
                        if (_C2.default.isArray(_dsArray)) {
                            _group.max = _C2.default.max(_dsArray);
                        } else {
                            _group.max = _dsArray;
                        }

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
                            _dsArray.forEach(function (d, i) {
                                _stackItem = {
                                    "color": color(i),
                                    "y0": 0,
                                    "y1": d,
                                    "group": groups[i] || i,
                                    "name": _C2.default.get(self.keys.name, data),
                                    "data-ref": _C2.default.guid(),
                                    "enable": true
                                };
                                _stack.push(_stackItem);
                            });
                        } else {
                            _stackItem = {
                                "color": color(0),
                                "y0": 0,
                                "y1": _dsArray,
                                "group": groups[0] || 0,
                                "name": _C2.default.get(self.keys.name, data),
                                "data-ref": _C2.default.guid(),
                                "enable": true
                            };
                            _stack.push(_stackItem);
                        }
                        _group.stack = _stack;

                        self.dataTarget.push(_group);
                    });

                    return self.dataTarget;
                    break;

                case "stack":
                    var stacks = self.stacks;

                    // Iterate over each group
                    self.dataSource.forEach(function (data, index) {
                        var _group = {
                            "max": null,
                            "stack": []
                        },
                            _dsArray = _C2.default.get(self.keys.value, data);

                        // If Group has only 1 value, so MAX = this.value
                        if (_C2.default.isArray(_dsArray)) {
                            _group.max = _C2.default.sum(_dsArray);
                        } else {
                            _group.max = _dsArray;
                        }

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
                                var _tempY0 = 0;
                                _dsArray.forEach(function (d, i) {
                                    _stackItem = {
                                        "color": color(i),
                                        "y0": _tempY0,
                                        "y1": _tempY0 + d,
                                        "group": stacks[i] || i,
                                        "name": _C2.default.get(self.keys.name, data),
                                        "data-ref": _C2.default.guid(),
                                        "enable": true
                                    };
                                    _stack.push(_stackItem);
                                    // Increase tempY0 by d to restore previous y0
                                    _tempY0 += d;
                                });
                            })();
                        } else {
                            _stackItem = {
                                "color": color(0),
                                "y0": 0,
                                "y1": _dsArray,
                                "group": stacks[0] || 0,
                                "name": _C2.default.get(self.keys.name, data),
                                "data-ref": _C2.default.guid(),
                                "enable": true
                            };
                            _stack.push(_stackItem);
                        }
                        _group.stack = _stack;

                        self.dataTarget.push(_group);
                    });

                    return self.dataTarget;
                    break;

                default:
                    return self.dataSource;
                    break;
            }
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
        key: "getDataTargetForTimelineChart",
        value: function getDataTargetForTimelineChart() {
            var self = this;

            var color = self.colorRange;

            self.dataSource.forEach(function (data, index) {

                var _data = {
                    // "color"     : color(index),
                    "icon": data.icon,
                    "name": _C2.default.get(self.keys.name, data),
                    "value": [],
                    "data-ref": _C2.default.guid(),
                    "enable": true
                };

                var _dsArray = _C2.default.get(self.keys.value, data),
                    _valueArray = [],
                    _valueItem = {
                    "start": null,
                    "end": null,
                    "color": "#fff",
                    "data-ref": null,
                    "enable": true
                };

                if (_C2.default.isArray(_dsArray)) {
                    _dsArray.forEach(function (d, i) {
                        _valueItem = {
                            "start": d.start,
                            "end": d.end,
                            "color": color(index),
                            "data-ref": _C2.default.guid(),
                            "enable": true
                        };
                        _valueArray.push(_valueItem);
                    });
                } else {
                    _valueItem = {
                        "start": d.start,
                        "end": d.end,
                        "color": color(index),
                        "data-ref": _C2.default.guid(),
                        "enable": true
                    };
                    _valueArray.push(_valueItem);
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

    }, {
        key: "getCsv",
        value: function getCsv() {

            var self = this;

            d3.csv(self.file.url, function (err, data) {
                if (err) throw err;

                return data;
            });
        }
    }, {
        key: "getTsv",
        value: function getTsv() {

            var self = this;

            d3.tsv(self.file.url, function (err, data) {
                if (err) throw err;

                return data;
            });
        }
    }, {
        key: "getText",
        value: function getText() {

            var self = this;

            d3.text(self.file.url, function (err, data) {
                if (err) throw err;

                return JSON.parse(data);
            });
        }
    }, {
        key: "getJson",
        value: function getJson() {
            var self = this;

            d3.json(self.file.url, function (err, data) {
                if (err) throw err;

                return data;
            });
        }
    }, {
        key: "getXml",
        value: function getXml() {
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

                return data;
            });
        }

        /*=====  End of Data Input From Files  ======*/

    }, {
        key: "keys",
        get: function get() {
            return this._keys;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
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
    }]);

    return DataAdapter;
}();

exports.default = DataAdapter;