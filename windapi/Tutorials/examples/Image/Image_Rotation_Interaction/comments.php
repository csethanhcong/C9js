In this example, we display an Image Interaction.<br><br>
First step : Image Displayer
var i = new <a>WIND</a>.<a>Image</a>('myimage',{'resizable':true,'draggable':true});<br><br>
'<span id="param">myimage</span>' is the identifier of the Image.<br>
To add an image to a collection named '<span id="param">myimages</span>'.<br>
We use the function bellow:<br>
	i.addCollection("myimages")<br>
Then we add the image using :<br>
	 i.addImage("http://erozate.iutbayonne.univ-pau.fr/windapi/Tutorials/Images/image_basque_country.jpg","myimages");
	 <br>
Second step : Creating  the annotation
var image_annot = i.<a>createAnnotation</a>("Landscape","Pays Basque");
	 <a>Landscape</a> is the type of the annotation.
	 <a>Pays Basque</a> is the entity of the annotation.<br>
Third step : Creating  the event	 
Then we create a SelectEvent object with two parameters:
- The event's type.(Here a left click)
- The annotation where the event will be triggered.	 <br>
Fourth step : Creating the reactions and the interactions	
Here we create an ExternalReaction object with two parameters:
- The annotation where the reaction will occur.
- The function that will occur.

var react1 = new WIND.<a>ExternalReaction</a>(image_annot,"rotate");

Then we create an Interaction object that will link an event and a series of reaction.

var i1 = new WIND.<a>Interaction</a>(evt1, new Array(react1));

Finally we activate the interaction that will run the reactions when the event is triggered.

i1.<a>activate</a>();
