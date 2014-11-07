Spacemonster v.1.0
======

Spacemonster is a JavaScript addon for [Rebuild the Universe](http://rebuildtheuniverse.com/).

This is not for cheating, it simply adds new "helpers" to the game and changes how some thing are displayed. Everything in Spacemonster is an option that is disabled by default so you can pick and choose what you'd like see/change.

How to Use/Install
-----
Create a Bookmark and name it "Spacemonster" (or whatever you want to call it) then copy & paste the below code into the URL text box and click Save. Next, go [Rebuild the Universe](http://rebuildtheuniverse.com/) (wait for the page to fully load) and click the Bookmark you just created. If done correctly, you should see a new option on DripStat's navigation bar that reads "Spacemonster".
```JavaScript
javascript:(function(){
	$.getScript('https://rawgit.com/FlyingKumquat/Spacemonster/master/spacemonster.js')
}());
```

Alternatively, you can copy & paste the `$.getScript` function directly into the browser's console. Information on how to open your browser's console can be found [here](http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers).
```JavaScript
$.getScript('https://rawgit.com/FlyingKumquat/Spacemonster/master/spacemonster.js')
```

Features/Config Options
-----
* __Display Unit Types__
  * Displays the Unit Type in the top right corner of each unit in the Units section
* __Color Units by Type__
  * Colors the inner shadow of each unit in the Units Section according to the Unit Type
* __Disable Unaffordable Buttons__
  * Disables Buy Buttons (X5, X10, MAX, etc.) if you cannot afford to make the purchase
* __Glow Unit on Next__
  * Creates a "Glow" on a unit when you can afford to buy up to the next bonus
* __Display Buy Buttons__
  * Allows you to enable/disable various Buy Buttons: X5, X10, X25, X50, X100, NEXT, MAX _("NEXT" buys up to the next bonus)_