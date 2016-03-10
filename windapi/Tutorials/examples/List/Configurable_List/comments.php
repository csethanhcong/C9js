Within this example, we display a List component.<br><br>
var l = new <a>WIND</a>.<a>List</a>('list',{'configurable':true,'top':50});<br>
<span id="options">configurable</span>:true means that the list can be configured from a menu. However with this menu we can only change the list's name.<br><br>
Then we add a groupe of items named "Lieu".<br>
var gp1 = l.<a>createGroup</a>("Lieu");<br><br>
And finally we add items to the groupe.<br>
gp1.<a>addItem</a>("Anglet");<br>
gp1.<a>addItem</a>("Bayonne");<br><br>