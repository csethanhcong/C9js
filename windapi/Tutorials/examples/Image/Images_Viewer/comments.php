Within this example, we display an Photo component.<br><br>
var i = new <a>WIND</a>.<a>Image</a>('myimage',{'resizable':true,'draggable':true,'top':50});<br><br>
'<span id="param">myimage</span>' is the identifier of the Image.<br>
The position '<span id="options">top</span>' is 50px.<br>
<span id="options">resizable</span>:true means that the size can be changed using the mouse.<br>
<span id="options">draggable</span>:true means that the position can be changed using the mouse.<br><br>
 i.addCollection("myimages"); <br>
 Add a collection to an image component i named '<span id="param">myimage</span>'.<br><br>
 i.addImage("GeneratedImages/image_basque_country.jpg","myimages"); Add image to image component i with path "GeneratedImages/image_basque_country.jpg"<br>
 and to collection "myimages".<br>
 i.addImageToCollection("GeneratedImages2/surf.jpg","myimages"); Add image to collection to '<span id="param">myimages</span>'<br>
 i.addSwitchBar("myimages"); Add the switch Bar to switch images.
  