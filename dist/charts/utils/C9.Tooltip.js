'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tooltip = function () {
    function Tooltip(options, body, data) {
        _classCallCheck(this, Tooltip);

        var config = {
            show: true,
            position: top,
            offset: [-10, 0],
            class: 'd3-tip'
        };

        this._show = options.show || config.show;
        this._position = options.position || config.position;
        this._offset = options.offset || config.offset;
        this._class = options.class || config.class;
    }

    /*==============================
    =            Getter            =
    ==============================*/


    _createClass(Tooltip, [{
        key: 'show',
        get: function get() {
            return this._show;
        }

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        ,
        set: function set(newShow) {
            if (newShow) {
                this._show = newShow;
            }
        }

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/

        /*=====  End of Main Functions  ======*/

    }]);

    return Tooltip;
}();

exports.default = Tooltip;