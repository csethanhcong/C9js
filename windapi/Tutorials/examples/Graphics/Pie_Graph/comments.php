Within this example, we display how to draw a Pie Graph .<br><br>
var g = new <a>WIND</a>.<a>Graphic</a>('myGraph',{'resizable':true,'draggable':true,'top':50});<br><br>
'<span id="param">myGraph</span>' is the identifier of the Graph.<br>
<br> Then we add the values into our variable PieChartData and we separate them with commas.
<br>	var PieChartData = [
<br>				{
<br>					value: 10, (the proportional value for the piece in the pie)
<br>					color:"#F7464A", (the colour of the piece we want)
<br>					highlight: "#FF5A5E",(the colour when we put the mouse over the pie part)
<br>					label: "a" (the name of this part)
<br>				}

