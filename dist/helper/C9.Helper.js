'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Helper = {

    each: function each(loopable, callback, self, reverse) {
        // Check to see if null or undefined firstly.
        var i, len;
        if (self.isArray(loopable)) {
            len = loopable.length;
            if (reverse) {
                for (i = len - 1; i >= 0; i--) {
                    callback.call(self, loopable[i], i);
                }
            } else {
                for (i = 0; i < len; i++) {
                    callback.call(self, loopable[i], i);
                }
            }
        } else if ((typeof loopable === 'undefined' ? 'undefined' : _typeof(loopable)) === 'object') {
            var keys = Object.keys(loopable);
            len = keys.length;
            for (i = 0; i < len; i++) {
                callback.call(self, loopable[keys[i]], keys[i]);
            }
        }
    },

    // setDefaultConfig: function() {
    //     var self = this;

    //     if (self.defaultConfig == null || self.defaultConfig === undefined) {
    //         return;
    //     } else {
    //         self.lastConfig = self.merge(Chart._options, Chart);
    //         self.each(self.lastConfig, function(value, index) {
    //             // var prefixCfg = self.setPrefix(index);
    //             self.setValue(self.lastConfig[index], index);
    //         }, self);
    //     }
    // }

    setValue: function setValue(value, key) {
        var self = this;
        self[key] = value;
    },

    setPrefix: function setPrefix(config) {
        var constPrefix = '_';
        if (config) {
            return constPrefix + config;
        }
    },

    isEmpty: function isEmpty(value) {
        return value === null || value === undefined || Util.isArray(value) && value.length === 0;
    },

    isObject: function isObject(object) {
        return !Util.isEmpty(object) && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
    },

    isArray: function isArray(array) {
        return Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]';
    },

    isFunction: function isFunction(func) {
        return !Util.isEmpty(func) && typeof func === 'function';
    },

    merge: function merge(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        return obj3;
    },

    get: function get(_key, _data) {
        var _keys = _key.split(".");
        var _current = _data;
        var self = this;

        for (var i = 0, len = _keys.length; i < len; i++) {
            var _fun = _keys[i].split("|");

            if (_fun && _fun.length == 2) {
                _keys[i] = _fun[0];
                _fun = _fun[1];
            } else {
                _fun = null;
            }

            if ('undefined' == typeof _current[_keys[i]]) {
                return '';
            } else {
                _current = _current[_keys[i]];
            }

            if (null !== _fun) {
                _current = self.filter[_fun].call(this, _current);
            }
        }

        return _current;
    },

    max: function max(arr) {
        return Math.max.apply(Math, _toConsumableArray(arr));
    },

    sum: function sum(arr) {
        return arr.reduce(function (a, b) {
            return a + b;
        }, 0);
    },

    guid: function guid() {
        return 'c9-xxxxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }

};

var Util = {
    isEmpty: function isEmpty(value) {
        return value === null || value === undefined;
    },

    isArray: function isArray(array) {
        return Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]';
    }
};

module.exports = Helper;