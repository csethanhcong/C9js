In this example, we add four annotation to the map ("Bayonne", "Pau", "Tarnos", "ARCANGUES").<br>
We create a different event for each annotation ("click", "mouseleave", "mousedown", "dblclick").<br>
For all the events we create the same reaction ("hide").<br>
If any event is triggered, the ("hide") reaction will occur on the corresponding annotation.<br>
<ul>
<li>If we "click" on "Bayonne" (<span style="color:blue">Blue annotation</span>), the "hide" reaction will be activated on "Pau" (<span style="color:purple">Purple annotation</span>) which will make it disappear.</li>
<li>If the cursor is on "Pau" (<span style="color:purple">Purple annotation</span>) and leaves the annotation then the "mouseleave" event is triggered and the "hide" reaction will be activated on "ARCANGUES" (<span style="color:dimgrey">Black annotation</span>) which will make it disappear.</li>
<li>If the mouse button is pushed down while the cursor is on "Tarnos" (<span style="color:brown">Brown annotation</span>) then the "mousedown" event is triggered and the "hide" reaction will be activated on "Bayonne" (<span style="color:blue">Blue annotation</span>) which will make it disappear.</li>
<li>If a "dblclick" event is triggered on "ARCANGUES" (<span style="color:dimgrey">Black annotation</span>), the "hide" reaction will be activated on "Tarnos" (<span style="color:brown">Brown annotation</span>) which will make it disappear.</li>
</ul>