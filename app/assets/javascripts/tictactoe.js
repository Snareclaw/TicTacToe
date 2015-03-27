$(document).ready(function() {
  // Initialize the player symbols, the index of the first player as the current player, a check for the game being over, and the number of remaining tiles..
  var players = ['X', 'O'];
  var current_player = 0;
  var game_over = false;
  var remaining_tiles = 9;

  // Initialize the board. It is represented by an length 3 array of length 3 arrays.
  // Values: -1 is no player mark, 0 is player 0's mark, 1 is player 1's mark.
  var board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
  
  // Define a function that compares 3 cells, and returns true if they're all the same player and false otherwise.
  function compare(x, y, z) {
    return (x == y) && (x == z) && (x > -1)
  }
  
  // Define a function that checks the board for a win. Outputs true if a winner is found, false otherwise.
  function winner() {
    if (compare(board[0][0], board[1][1], board[2][2]) || compare(board[0][1], board[1][1], board[2][1]) ||
        compare(board[0][2], board[1][1], board[2][0]) || compare(board[1][0], board[1][1], board[1][2]) ||
        compare(board[0][0], board[0][1], board[0][2]) || compare(board[0][0], board[1][0], board[2][0]) ||
        compare(board[0][2], board[1][2], board[2][2]) || compare(board[2][0], board[2][1], board[2][2])) {
      return true;
    }
    else {
      return false;
    }
  }
    

  // Define the action that occurs if a cell is clicked on.
  $('#board td').unbind('click').click(function() {
    // Check for errors and output a message if found.
    if (game_over === true) {
      document.getElementById('error').innerHTML = "ERROR: Game already ended. No moves can be made.";
    }
    else if ($(this).text()!= '-') {
      document.getElementById('error').innerHTML = "ERROR: That spot has already been selected!";
    }
    else {
      // Delete any error messages left from previous actions.
      if (document.getElementById('error').innerHTML != "") {
        document.getElementById('error').innerHTML = "";
      }
      // Set the current tile to the current player's marker.
      this.innerHTML = players[current_player];
      var coord = $(this).attr("id");
      board[coord[0]][coord[1]] = current_player;
      remaining_tiles -= 1;
      // Check for game ending conditions
      if (winner()) {
        document.getElementById('announcement').innerHTML = "Winner: Player " + players[current_player];
        game_over = true
      }
      else if (remaining_tiles == 0) {
        document.getElementById('announcement').innerHTML = "Draw";
        game_over = true;
      }
      else {
        // If no win, switch players.
        current_player = (current_player + 1) % 2;
        document.getElementById('player-id').innerHTML = players[current_player];
      }
    }    
  })

  // Define the action that restarts the game if restart if clicked on.
  $('#restart').unbind('click').click(function() {
    // Reinitialize default values
    current_player = 0;
    game_over = false;
    remaining_tiles = 9;
    board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    
    // Reset the announcement and clear errors
    document.getElementById('announcement').innerHTML = "It is Player <span id='player-id'>X</span>'s turn.</h2>";
    document.getElementById('error').innerHTML = "";

    // Clear all cells
    document.getElementById('00').innerHTML = "-";
    document.getElementById('01').innerHTML = "-";
    document.getElementById('02').innerHTML = "-";
    document.getElementById('10').innerHTML = "-";
    document.getElementById('11').innerHTML = "-";
    document.getElementById('12').innerHTML = "-";
    document.getElementById('20').innerHTML = "-";
    document.getElementById('21').innerHTML = "-";
    document.getElementById('22').innerHTML = "-"; 
  })

})
