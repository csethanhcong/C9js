'use strict';

export default class Tooltip {
    constructor(options, body, data) {
        var config = {
            show: true,
            position: top,
            offset: [-10, 0],
            class: 'd3-tip',
        };

        this._show      = options.show || config.show;
        this._position  = options.position || config.position;
        this._offset    = options.offset || config.offset;
        this._class     = options.class || config.class;

    }

    /*==============================
    =            Getter            =
    ==============================*/
    get show() {
        return this._show;
    }


    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set show(newShow) {
        if (newShow) {
            this._show = newShow;
        }
    }


    /*=====  End of Setter  ======*/

    /*======================================
    =            Main Functions            =
    ======================================*/

    /*=====  End of Main Functions  ======*/

}