Within this example, we display an Image brightness.<br><br>
var i = new <a>WIND</a>.<a>Image</a>('myimage',{'resizable':true,'draggable':true,'top':50}});<br><br>
We changed the brightness.<br>
'<span id="param">myimage</span>' is the identifier of the Image.<br>

To add a collection to an image component i named '<span id="param">myimage</span>'.<br>
We use the function bellow:<br>
	i.addCollection("myimages")<br>
Then we add the image using :<br>
	i.addImage("GeneratedImages/image_basque_country.jpg","myimages");<br>
Finally, we apply the function brightness() by giving it a value of brightness;<br>
	i.brightness(60);

