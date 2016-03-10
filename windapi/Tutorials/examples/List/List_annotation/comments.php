Within this example, we display a List component.<br>
var l = new <a>WIND</a>.<a>List</a>('list',{'top':50});<br><br>
Then we add a groupe of items named "Lieu".<br>
var gp1 = l.<a>createGroup</a>("Lieu");<br><br>
And finally we add items to the groupe.<br>
gp1.<a>addItem</a>("Anglet");<br>
gp1.<a>addItem</a>("Bayonne");<br><br>
Finally we create the annotation.<br>
l.<a>createAnnotation</a>("Town","Anglet",1,1,{"style":"background-color:blue;color:white"});<br>
-<span id="param">Town</span> and <span id="param">Anglet</span> are the type and the entity of the annotation.<br>
-<span id="param">1</span>,<span id="param">1</span> are the IDs of the groupe and the item.<br>
-<span id="param">{"style":"background-color:blue;color:white"}</span> is the style of the annotation.<br>