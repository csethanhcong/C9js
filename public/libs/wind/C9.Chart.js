class Chart {
	constructor(width, height, data) {
		this._width 	= width;
		this._height 	= height;
		this._data 		= data;
	};

	get width() {
		return this._width;
	};

	set width(newWidth){
        if(newWidth){ 
            this.width = newWidth;
        }
    };

	get height() {
		return this._height;
	};

	set height(newHeight){
        if(newHeight){ 
            this.height = newHeight;
        }
    };

	get data() {
		return this._data;
	};

	set data(newData){
        if(newData){ 
            this.data = newData;
        }
    };

	draw() {
		d3.select('body')
			.append("svg")
			.attr("width", this._width)
			.attr("height", this._height)
			.append("circle")
			.attr("cx", 25)
			.attr("cy", 25)
			.attr("r", 25)
			.style("fill", "purple");
	}
}
