Within this example, we display a List component.<br><br>
var l = new <a>WIND</a>.<a>List</a>('list',{'resizable':true,'draggable':true,'top':50});<br>
<span id="options">resizable</span>:true means that the size can be changed using the mouse.<br>
<span id="options">draggable</span>:true means that the position can be changed using the mouse.<br><br>
Then we add a groupe of items named "Lieu".<br>
var gp1 = l.<a>createGroup</a>("Lieu");<br><br>
And finally we add items to the groupe.<br>
gp1.<a>addItem</a>("Anglet");<br>
gp1.<a>addItem</a>("Bayonne");<br><br>