import Helper from './C9.Helper';

export default class DataAdapter {

    constructor(options) {

        var self = this;

        var config = {

            data: null,
            keyDefine: null,
            file: {
                type: null, // csv, tsv, txt, json, xml, xhr
                url: null,
            },

        };

        self._data      = options.data      || config.data;
        self._keyDefine = options.keyDefine || config.keyDefine;
        self._file      = Helper.merge(options.file, config.file);

        self.init();

    }

    /*==============================
    =            Getter            =
    ==============================*/
    get data() {
        return this._data;
    }

    get keyDefine() {
        return this._keyDefine;
    }

    get file() {
        return this._file;
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

    set keyDefine(arg) {
        if (arg) {
            this._keyDefine = arg;
        }
    }

    set file(arg) {
        if (arg) {
            this._file = arg;
        }
    }
    /*=====  End of Setter  ======*/

    /*======================================
    =            Main Functions            =
    ======================================*/
    init() {
        var self = this;

        if (self._file) {
            if (self._file.type === "csv") {

                self._data = self.getCsv();

            } else if (self._file.type === "tsv") {

                self._data = self.getTsv();

            } else if (self._file.type === "text") {

                self._data = self.getText();

            } else if (self._file.type === "json") {

                self._data = self.getJson();

            } else if (self._file.type === "xml") {

                self._data = self.getXml();

            } else if (self._file.type === "xhr") {

                self._data = self.getJson();

            }
        }
    }

    getCsv() {

        var self = this;

        d3.csv(self.file.url, function(err, data) {
            if (err) throw err;
            
            console.dir(data);
            return data;
        });

    }

    getTsv() {

        var self = this;

        d3.tsv(self.file.url, function(err, data) {
            if (err) throw err;
            
            return data;
        });

    }

    getText() {

        var self = this;

        d3.text(self.file.url, function(err, data) {
            if (err) throw err;
            
            return JSON.parse(data);
        });

    }

    getJson() {
        var self = this;

        d3.json(self.file.url, function(err, data) {
            if (err) throw err;
            
            return data;
        });
    }

    getXml() {
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

            return data;
        });
    }
    /*=====  End of Main Functions  ======*/

}