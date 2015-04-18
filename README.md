# Summary

This project is a simple Tic Tac Toe game for two players, written using HTML/CSS and Javascript, and built on the Ruby on Rails framework. Play now at http://calm-atoll-9489.herokuapp.com/

# Table of Contents

* [Requirements](#reqs)
* [How to Play](#how-to-play)
* [Future Improvements/Expansions](#future-features)
* [Credit](#credit)

# <a name="reqs"></a>Requirements

This application was built primarily with HTML/CSS and Javascript, and uses simple methods that should be supported on all major browsers.

# <a name="how-to-play"></a>How to Play

Starting with player A, each player takes turns choosing where to place their marker (either X for player A or O for player B). Each marker is placed by left clicking once on the cell that the player wants to place their piece on. The current player is displayed at the top of the page.

When a game ends, the game will display one of three outcomes at the top, depending on which was reached:
- Winner: Player A
- Winner: Player B
- Draw

Players can click on Restart? in order to reset the game, or press Undo to undo the previous move.

# <a name="future-features"></a>Future Improvements/Expansions

The code was designed to make improvements relatively easy. Current player increments as well as representations are designed so that adding new players is as easy as adding another symbol to the player list.

The undo function allows for either 1 or as many undos as desired, which can be switched between by commenting one line of code. A possible future improvement would be to implement a form that would let players choose how many undos to allow, between 0 and 9 (inclusive).

Currently the board is limited to 3x3. Enlarging it would require redesigning how winning combinations are checked, however that can be done in the winner function, so that the rest of the code does not need to be changed.

Another possible feature is the addition of tracking the number of wins a player has, whether locally in Javascript, or in a database using Rails.

# <a name="credit"></a>Credit
Written by Andrew Zhao (2015)

Some topics in www.stackoverflow.com were used to debug issues that occurred, such as dealing with postgresql to upload to Heroku and an issue where click events were firing twice instead of once.
