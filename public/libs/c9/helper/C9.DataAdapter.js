import Helper from './C9.Helper';

export default class DataAdapter {

    constructor(options) {

        var self = this;

        var config = {
            keys: {
                name: "name",
                value: "value"
            }
        };

        self._keys      = Helper.merge(options.keys, config.keys);

        if (self.hasPlainData(options)) {
            self.executePlainData(options);
        } else if (self.hasFile(options)) {
            self.executeFile(options);
        }


    }

    /*==============================
    =            Getter            =
    ==============================*/
    get keys() {
        return this._keys;
    }

    get data() {
        return this._data;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set keys(arg) {
        if (arg) {
            this._keys = arg;
        }
    }

    set data(arg) {
        if (arg) {
            this._data = arg;
        }
    }
    /*=====  End of Setter  ======*/

    /*======================================
    =            Main Functions            =
    ======================================*/
    hasPlainData(options) {
        return options.plain && Helper.isArray(options.plain);
    }

    hasFile(options) {
        return options.file && Helper.isObject(options.file);
    }

    executePlainData(options) {
        self._data = options.plain;
    }

    executeFile(options) {
        var self = this;

        self._file      = Helper.merge(options.file, config.file);

        if (self._file && self._file.type) {

            switch(self._file.type) {
                case "csv":
                    self._data = self.getCsv();
                    break;
                case "tsv":
                    self._data = self.getTsv();
                    break;
                case "text":
                    self._data = self.getText();
                    break;
                case "json":
                    self._data = self.getJson();
                    break;
                case "xml":
                    self._data = self.getXml();
                    break;
                case "xhr":
                    self._data = self.getJson();
                    break;
                default:
                    self._data = self.getJson();
                    break;
            }
        }
    }

    getName(v) {
        return v.name; 
    }

    getValue(v) {
        var self = this;

        return Helper.get(self.keys, v);
    }

    getCsv() {

        var self = this;

        d3.csv(self.file.url, function(err, data) {
            if (err) throw err;
            
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