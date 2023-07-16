# A sidescroller, inspired by Parodius/Gradius, Vampire Survivor and Batafuraiko

Made for js1024 https://js1024.fun contest. Minified version is under 1k js.

Playable here: https://js1024.fun/demos/2023/26

Weapon system is inspired by "Bullet Hell" from Vampire Survivor. In the mid-late game you spam a lot of bullets everywhere.

Like Gradius/Parodius, you have to destroy an entire group of enemies to get an upgrade.
There were no bytes to make a pickup, so instead you get upgade immediately. 

Initially, there was a screen flash that indicated getting an upgrade, but I had to sack it to save bytes.
As a replacement, one of the weapons (radial shot) were removed from the main set and is used 
to indicate that you got the upgrade, and as an extra minor bonus for doing that.

There are four weapons in your arsenal, which all are actually just one, but with altered arc and number of shots per volley.
Upgrading a weapon increases it's rate of fire (initially it's 0 for all except the first). 
Which weapon is upgraded depends on which weapon was used to make the final shot on the enemy group.
Upgraded weapon is the next in the order: killing with first weapon upgrades the second one, etc. and kill with the last one upgrades the first one.
On one hand that makes the player not completely rely on one weapon. On the other, gives some control over which weapon to upgrade.

I had no bytes for the fancy graphics, so all objects are just circles. But enemies have their size proportional to their hps.
Which has several functions. First, reducing size indicates the damage dealt. Second, bigger enemies limit the visibility and available space
for the player. Eventually, most of the screen becomes red.

There is also a trail effect on all objects, made simply by using a semi-transparent rectangle to clear the screen.

Enemy groups spawn on cooldown, but to make the early game more dynamic, the next wave is spawned immediately each time you finish off a group.

You die after a single contact with the enemy. But there is a "meta progression" element - when you die, the game is reset, 
but your first weapon get upgrades proportional to the total number of upgrades you had.