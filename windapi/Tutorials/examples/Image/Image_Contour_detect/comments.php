Within this example, we display an Image contour.<br><br>
var i = new <a>WIND</a>.<a>Image</a>('myimage',{'resizable':true,'draggable':true});<br><br>

'<span id="param">myimage</span>' is the identifier of the Image.<br>

To add a collection to an image component i named '<span id="param">myimage</span>'.<br>

We use the function bellow:<br>
	i.addCollection("myimages")<br>

	Then we add the image using :<br>
	i.addImage("GeneratedImages/image_basque_country.jpg","myimages");<br>

Finally, we apply the function contourdetect();<br>
			i.contourdetect();			 

