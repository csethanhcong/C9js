'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Title = function () {
    function Title(options, svg, width, height, margin) {
        _classCallCheck(this, Title);

        var config = {
            title_show: true,
            title_text: "Sample Chart",
            title_position: 'top',
            title_size: "14px"
        };

        this._titleShow = options.title_show || config.title_show;
        this._titleText = options.title_text || config.title_text;
        this._titlePosition = options.title_position || config.title_position;
        this._titleSize = options.title_size || config.title_size;

        this._svg = svg;

        if (this._titleShow) {
            // Select CURRENT svg container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            var text = d3.select(this._svg[0][0].parentNode).append("g").append("text").attr("class", "title");

            // Get title width: text.node().getComputedTextLength()          
            text.attr("x", (width - text.node().getComputedTextLength()) / 2).attr("y", this.setYLocation(height, margin)).attr("text-anchor", "middle").style("font-size", this._titleSize).text(this._titleText);
        }
    }

    /*==============================
    =            Getter            =
    ==============================*/

    _createClass(Title, [{
        key: 'setYLocation',


        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/
        value: function setYLocation(height, margin) {
            if (this.titlePosition === 'top') {
                return margin.top / 2;
            } else if (this.titlePosition === 'bottom') {
                return height - margin.bottom / 2;
            }
        }
        /*=====  End of Main Functions  ======*/

    }, {
        key: 'titleShow',
        get: function get() {
            return this._titleShow;
        },


        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/

        set: function set(newTitleShow) {
            if (newTitleShow) {
                this._titleShow = newTitleShow;
            }
        }
    }, {
        key: 'titleText',
        get: function get() {
            return this._titleText;
        },
        set: function set(newTitleText) {
            if (newTitleText) {
                this._titleText = newTitleText;
            }
        }
    }, {
        key: 'titlePosition',
        get: function get() {
            return this._titlePosition;
        },
        set: function set(newTitlePosition) {
            if (newTitlePosition) {
                this._titlePosition = newTitlePosition;
            }
        }
    }, {
        key: 'titleSize',
        get: function get() {
            return this._titleSize;
        },
        set: function set(newTitleSize) {
            if (newTitleSize) {
                this._titleSize = newtitleSize;
            }
        }
    }]);

    return Title;
}();