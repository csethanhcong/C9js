In this example, we add five annotation to the map ("Bayonne", "Pau", "Tarnos", "ARCANGUES", "BIARRITZ").<br>
We create a "click" event for each annotation.<br>
And for each event we create a reaction ("setFeatureStyle", "zoomWith", "focus", "hide", "show").<br>
If the "click" event is triggered, the corresponding reaction will occur.<br>
<ul>
<li>If we "click" on "Bayonne" (<span style="color:blue">Blue annotation</span>), the reaction "setFeatureStyle" will be activated on "Tarnos" (<span style="color:brown">Brown annotation</span>). Its new color will be red and white.</li>
<li>If we "click" on "Tarnos" (<span style="color:brown">Brown annotation</span>), the reaction "focus" will be activated on "Bayonne" (<span style="color:blue">Blue annotation</span>). The map will be centered on "Bayonne" and its ew color will be green and blue.</li>
<li>If we "click" on "Pau" (<span style="color:purple">Purple annotation</span>), the reaction "zoomWith" will be activated on "Tarnos" (<span style="color:brown">Brown annotation</span>) and "Bayonne" (<span style="color:blue">Blue annotation</span>).The map will be centered on both of the annotations.</li>
<li>If we "click" on "ARCANGUES" (<span style="color:green">Green annotation</span>), the reaction "hide" will be activated on Pau (<span style="color:purple">Purple annotation</span>). The annotation will disappear.</li>
<li>If we "click" on "Biarritz" (<span style="color:dimgrey">Black annotation</span>), the reaction "show" will be activated on Pau (<span style="color:purple">Purple annotation</span>). The annotation will reappear.</li>
</ul>