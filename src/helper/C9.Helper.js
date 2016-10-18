var Helper = {
    
    each: function(loopable, callback, self, reverse) {
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
        } else if (typeof loopable === 'object') {
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

    setValue: function(value, key) {
        var self = this;
        self[key] = value;
    },

    setPrefix: function(config) {
        var constPrefix = '_';
        if (config) {
            return constPrefix + config;
        }
    },

    isEmpty: function(value) {
        return value === null || value === undefined || (Util.isArray(value) && value.length === 0) || (Util.isArray(value) && Util.isEmpty(value[0]));
    },

    isObject: function(object) {
        return !Util.isEmpty(object) && typeof(object) === 'object';
    },

    isArray: function(array) {
        return !Util.isEmpty(array) && (Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]');
    },

    isFunction: function(func) {
        return !Util.isEmpty(func) && typeof(func) === 'function';
    },

    merge: function(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj2) { if (!Util.isEmpty(obj2[attrname])) obj3[attrname] = obj2[attrname]; }
        for (var attrname in obj1) { if (!Util.isEmpty(obj1[attrname])) obj3[attrname] = obj1[attrname]; }
        return obj3;
    },

    mergeDeep: function(target, source) {
        return mergeDeep(target, source);
    },

    get: function(_key, _data){
        var _keys = _key.split(".");
        var _current = _data;
        var self = this;
        
        for(var i=0, len=_keys.length; i<len; i++){
            var _fun = _keys[i].split("|");
            
            if(_fun && _fun.length == 2){
                _keys[i] = _fun[0];
                _fun = _fun[1];
            }
            else{
                _fun = null;
            }
            
            if('undefined' == typeof(_current[_keys[i]])){
                return '';
            }
            else{
                _current = _current[_keys[i]];
            }
            
            if(null !== _fun){
                _current = self.filter[_fun].call(this, _current);
            }
        }
        
        return _current;
    },

    max: function(arr) {
        return Math.max(...arr);
    }, 

    min: function(arr) {
        return Math.min(...arr);
    }, 

    sum: function(arr) {
        return arr.reduce(function(a, b) { return a + b; }, 0);
    },

    guid: function() {
        return 'c9-xxxxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, 
                v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    getMinMax: function(data, type, isLogaric) {
        var self  = this;
        var _temp = new Array();
        var _min  = 0,
            _max  = 0;
        if (type == "stack")
            data.forEach(function (d){
                d.forEach(function (s){
                    if (s.y0 > 0)
                        _temp.push(s.y1);
                    else
                        _temp.push(s.y1 + s.y0);
                })
            })
        else
            data.forEach(function (d){
                d.forEach(function (s){
                    _temp.push(s.y0);
                })
            });

        var _newMin = self.min(_temp);
        var _newMax = self.max(_temp);
        if (_newMin < _min || isLogaric)
            _min = _newMin;
        if (_newMax > _max)
            _max = _newMax;

        return {min: _min, max: _max};
    },
    dateParser: function(format) {
        return d3.time.format(format).parse;
    },
    dateFormatter: function(format) {
        return d3.time.format(format);
    },
    // Convert color 'from' to 'to' (if any) in propotion of 'p'
    // Use to lighten/darken specific color
    shadeColor: function(p, from, to) {
        if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
        if(!this.sbcRip)this.sbcRip=function(d){
            var l=d.length,RGB=new Object();
            if(l>9){
                d=d.split(",");
                if(d.length<3||d.length>4)return null;//ErrorCheck
                RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
            }else{
                if(l==8||l==6||l<4)return null; //ErrorCheck
                if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
                d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
            }
            return RGB;}
        var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
        if(!f||!t)return null; //ErrorCheck
        if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
        else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
    }
};

var Util = {
    isEmpty: function(value) {
        return value === null || value === undefined;
    },

    isArray: function(array) {
        return Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]';
    },

    isObject: function(object) {
        return (object && typeof object === 'object' && !Array.isArray(object));
    }
};

function mergeDeep(target, source) {
    if (Util.isObject(target) && Util.isObject(source)) {
        for (const key in source) {
            if (Util.isObject(source[key])) {
                if (!target[key]) Object.assign(target, {
                    [key]: {}
                });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {
                    [key]: source[key]
                });
            }
        }
    }
    return target;
}

module.exports = Helper;
