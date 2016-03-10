We display a simple image that we created before.<br>
var i = new WIND.Image(''myImage',{'resizable':true,'draggable':true,'top':50})<br>
			i.addCollection("myimages");<br>
			i.addImage("http://erozate.iutbayonne.univ-pau.fr/windapi/Tutorials/Images/image_basque_country.jpg","myimages");<br>
Then we create four annotations with the createAnnotation() method.<br>

var text_annot = t.createAnnotation("Word","Bar",1,1,1,{"style":"background-color:red;color:white;"});<br>
var image_annot = i.createAnnotation("Landscape","Pays Basque");<br>

Then we create a SelectEvent object with two parameters:<br>
- The event's type.(Here a left click)<br>
- The annotation where the event will be triggered. var evt1 = new WIND.SelectEvent("click", [text_annot]);<br>

Then the trigger method allows to execute a javaScript function when the event is triggered<br>

evt1.trigger(function(e){});<br>

Here we create an ExternalReaction object with two parameters:<br>
- The annotation where the reaction will occur.<br>
- The function that will occur.<br>

var react1 = new WIND.ExternalReaction(image_annot, "rotate");<br>

Then we create an Interaction object that will link an event and a series of reaction.<br>

var i1 = new WIND.Interaction(evt1, new Array(react1));<br>

Finally we activate the interaction that will run the reactions when the event is triggered.<br>

i1.activate(); <br>