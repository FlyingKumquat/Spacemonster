Spacemonster v.1.1-1.8
======

Spacemonster is a JavaScript addon for [Rebuild the Universe](http://rebuildtheuniverse.com/).

This is not for cheating, it simply adds new "helpers" to the game and changes how some things are displayed. Everything in Spacemonster is an option that is disabled by default so you can pick and choose what you'd like see/change.

How to Use/Install
-----
Create a Bookmark and name it "Spacemonster" (or whatever you want to call it) then copy & paste the below code into the URL text box and click Save. Next, go [Rebuild the Universe](http://rebuildtheuniverse.com/) (wait for the page to fully load) and click the Bookmark you just created. If done correctly, you should see a new option on the navigation bar that reads "Spacemonster".
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
* __Game Update Rate__
  * Allows users to adjust how often the game updates. _(min:[1 time per 10 seconds], max[60 times per 1 second])_
* __Spacemonster Update Rate__
  * Allows users to adjust how often Spacemonster updates. _(1 to 60 times per second)_
* __Auto Save Game Frequency__
  * Allows users to adjust how often the game automatically saves. _(30 seconds to 15 minutes with a max of "never")_
* __Scroll Top Atom Bar__
  * This option allows users to lock the top Atom bar in place to keep it from scrolling with the page.
* __Notifications Position__
  * Allows users to change which corner notifications appear. _(because reasons)_
