Within this example, we display how to add items to the graph .<br><br>
var g = new <a>WIND</a>.<a>Graphics</a>('myGraph',{'resizable':true,'draggable':true,'top':50});<br><br>
'<span id="param">myGraph</span>' is the identifier of the Graph.<br>

Then we add a group of items named "items".<br>
var gp1 = l.createGroup(items);<br>

And finally we add items to the group.<br>
gp1.addItem({x: '2014-06-11', y: 10});<br>
gp1.addItem({x: '2014-06-12', y: 25});<br>
			