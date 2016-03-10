Within this example, we display a List component.<br><br>
var l = new <a>WIND</a>.<a>List</a>('list',{'name':'List','header':true,'color':'crimson','border':'coral 8px inset','width':800,'height':200,'left':100,'top':50});<br>
<span id="options">name</span>:List is the name of the component displayed on the header.<br>
<span id="options">header</span>:true means that the header is diplayed.<br>
<span id="options">color</span>:crimson the color of the header.<br>
<span id="options">border</span>:coral 8px inset the style of the border.<br>
<span id="options">width</span> and <span id="options">height</span>: size of the list.<br>
<span id="options">left</span> and <span id="options">top</span><br><br>
Then we add a groupe of items named "Lieu".<br>
var gp1 = l.<a>createGroup</a>("Lieu");<br><br>
And finally we add items to the groupe.<br>
gp1.<a>addItem</a>("Anglet");<br>
gp1.<a>addItem</a>("Bayonne");<br><br>