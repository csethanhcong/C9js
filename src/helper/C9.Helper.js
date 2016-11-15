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

    // Overlap source by target
    merge: function(target, source){
        var obj3 = {};
        for (var attrname in source) { if (!Util.isEmpty(source[attrname])) obj3[attrname] = source[attrname]; }
        for (var attrname in target) { if (!Util.isEmpty(target[attrname])) obj3[attrname] = target[attrname]; }
        return obj3;
    },

    // Overlap target by source
    mergeDeep: function(target, source) {
        return mergeDeep(target, source);
    },

    get: function(_key, _data){
        var _keys = _key.split(".");
        var _current = _data;

        for (var i = 0; i < _keys.length; i++) {

            if ('undefined' == typeof(_current[_keys[i]])) {
                return '';
            } else {
                _current = _current[_keys[i]];
            }
        }

        return _current;
    },
    
    set: function(_key, _value, _context) {
        var _current = _context;  // a moving reference to internal objects within obj
        var _keys = _key.split('.');
        var len = _keys.length;
        for(var i = 0; i < len-1; i++) {
            var _handle = _keys[i];
            if( !_current[_handle] ) _current[_handle] = {}
            _current = _current[_handle];
        }

        _current[_keys[len-1]] = _value;
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
        if (type == "stack") {
            data.forEach(function (d){
                d.forEach(function (s){
                    if (s.y0 > 0)
                        _temp.push(s.y1);
                    else
                        _temp.push(s.y1 + s.y0);
                })
            })
        } else {
            data.forEach(function (d){
                d.forEach(function (s){
                    _temp.push(s.y0);
                })
            });
        }


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
        // Convert color from 'Name' to 'Hex'
        from = Util.convertColorToHex(from) || from;
        
        if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
        if(!this.sbcRip)
            this.sbcRip=function(d) {
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
                return RGB;
            }
        var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=this.sbcRip(from),t=this.sbcRip(to);
        if(!f||!t)return null; //ErrorCheck
        if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
        else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
    },
    //smooth scroll c9 table
    scroll: function(element, to, duration) {
        var self = this;
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            self.scroll(element, to, duration - 10);
        }, 10);
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
    },

    convertColorToHex: function(colour) {
        var colours = {
            "aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
            "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
            "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
            "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
            "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
            "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
            "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
            "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
            "honeydew":"#f0fff0","hotpink":"#ff69b4",
            "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
            "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
            "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
            "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
            "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
            "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
            "navajowhite":"#ffdead","navy":"#000080",
            "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
            "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
            "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
            "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
            "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
            "violet":"#ee82ee",
            "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
            "yellow":"#ffff00","yellowgreen":"#9acd32"
        };

        if (typeof colours[colour.toLowerCase()] != 'undefined')
            return colours[colour.toLowerCase()];

        return false;
    }
};

function mergeDeep(target, source) {
    if (Util.isObject(target) && Util.isObject(source)) {
        for (const key in source) {
            if (Util.isObject(source[key])) {
                if (Helper.isEmpty(target[key])) {
                    Object.assign(target, {
                        [key]: {}
                    });
                }
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
