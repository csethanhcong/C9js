'use strict';

import Helper from '../../helper/C9.Helper';

export
default class Table {
    constructor(options, body, data) {
        var config = {
            container: "body",
            show: false,
            headings: ["Name", "Value"],
            style: "stripe", // || "stripe"
            serial: true,
            hover: {
                enable: true,
                callback: null
            },
            click: {
                enable: true,
                callback: null
            }
        };

        var self = this;

        self._container = options.container || config.container;
        self._show = options.show ? options.show : config.show;
        self._headings = options.headings || config.headings;
        self._style = options.style || config.style;
        self._serial = options.serial || config.serial;
        self._hover = Helper.merge(options.hover, config.hover);
        self._click = Helper.merge(options.click, config.click);

        self._data = data;
        self._body = body;

    }

    /*==============================
    =            Getter            =
    ==============================*/
    get data() {
        return this._data;
    }

    get body() {
        return this._body;
    }

    get container() {
        return this._container;
    }

    get show() {
        return this._show;
    }

    get headings() {
        return this._headings;
    }

    get style() {
        return this._style;
    }

    get serial() {
        return this._serial;
    }

    get hover() {
        return this._hover;
    }

    get click() {
        return this._click;
    }

    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set data(arg) {
        if (arg) {
            this._data = arg;
        }
    }

    set body(arg) {
        if (arg) {
            this._body = arg;
        }
    }

    set container(arg) {
        if (arg) {
            this._container = arg;
        }
    }

    set show(arg) {
        if (arg) {
            this._show = arg;
        }
    }

    set headings(arg) {
        if (arg) {
            this._headings = arg;
        }
    }

    set style(arg) {
        if (arg) {
            this._style = arg;
        }
    }

    set serial(arg) {
        if (arg) {
            this._serial = arg;
        }
    }

    set hover(arg) {
        if (arg) {
            this._hover = arg;
        }
    }

    set click(arg) {
        if (arg) {
            this._click = arg;
        }
    }

    /*=====  End of Setter  ======*/

    /*======================================
    =            Main Functions            =
    ======================================*/
    draw() {
        var self = this;

        if (self.show) {

            var headTbl = d3.select(self.container).append("table").attr('class', 'c9-table c9-table-header'),
                thead = headTbl.append("thead"),

                bodyTbl = d3.select(self.container)
                                .append("div").attr('class', 'c9-table-container')
                                    .append("table").attr('class', function() {
                                        if (self.style === 'default') return 'c9-table c9-table-body';
                                        else if (self.style === 'stripe') return 'c9-table c9-table-body c9-stripe';
                                    }),
                tbody = bodyTbl.append("tbody");

            // Append serial no heading
            // Bind each statistic to a line of the table
            // Show serial no.
            var hRows = thead.append("tr");

            if (self.serial) {
                hRows.append("th")
                    .text("#");
            }

            hRows.selectAll("thead")
                .data(self.headings)
                .enter()
                .append("th")
                    .text(function(d) {
                        return d;
                    });

            


            // Bind each statistic to a line of the table
            // Show serial no.
            var bRows = tbody
                .selectAll("tr")
                .data(self.data)
                    .enter()
                        .append("tr");

            if (self.serial) {
                bRows.append("td")
                    .text(function(d, i) {
                        return i + 1;
                    });
            }


            // Add statistic names to each row
            bRows.append("td")
                    .text(function(d) {
                        return d.name;
                    });


            // Add values to each row
            bRows.append("td")
                    .text(function(d) {
                        return d.value;
                    });

        }

    }
    /*=====  End of Main Functions  ======*/

}