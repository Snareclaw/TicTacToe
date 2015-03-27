$(document).ready(function() {
  // Initialize the player symbols, the index of the first player as the current player, a check for the game being over, and the number of remaining tiles.
  var players = ['X', 'O'];
  var num_players = players.length;
  var current_player = 0;
  var game_over = false;
  var remaining_tiles = 9;

  // Initalize empty stack of moves for undo capabilities. Variable undone is only needed if limiting the player to one undo (so that one player cannot undo the entire game).
  var move_stack = [];
  var undone = false;

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
      document.getElementById('error').innerHTML = "";

      // Set the current tile to the current player's marker.
      this.innerHTML = players[current_player];
      var coord = $(this).attr("id");
      board[coord[0]][coord[1]] = current_player;
      remaining_tiles -= 1;

      // Add the move to the stack and mark that a new move was made, enabling limit-one-undo
      move_stack.push(coord);
      undone = false;

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
        current_player = (current_player + 1) % num_players;
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
    move_stack = [];
    board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    
    // This is technically not needed, but it never hurts to be safe.
    undone = false;

    // Reset the announcement and clear errors
    document.getElementById('announcement').innerHTML = "It is Player <span id='player-id'>X</span>'s turn.";
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

  // Define the action that undoes the last move if clicked on.
  $('#undo').unbind('click').click(function() {
    // Check that only a move has not already been undone, and that at least one move has been made. 
    if (move_stack.length === 0) {
      document.getElementById('error').innerHTML = "ERROR: No moves left to undo!";
    }
    else if(undone === true) {
      document.getElementById('error').innerHTML = "ERROR: Move was already undone. Cannot undo opponent's move.";
    }
    else {
      // Clear any error messages.
      document.getElementById('error').innerHTML = '';

      // Retrieve the last move made and set that cell to empty.
      prev_move = move_stack.pop();
      document.getElementById(prev_move).innerHTML = '-';
      board[prev_move[0]][prev_move[1]] = -1;

      // Increment back the tiles remaining.
      remaining_tiles += 1;

      if (game_over === true) {
        // Reset game_over status and message in case it was changed.
        game_over = false;
        document.getElementById('announcement').innerHTML = "It is Player <span id='player-id'>" + players[current_player] + "</span>'s turn."
      }
      else {
        // Otherwise increment current player back one.
        current_player = current_player - 1;
        if (current_player < 0) {
          current_player = num_players - 1;
        }

        document.getElementById('player-id').innerHTML = players[current_player];
      }

      // Mark that an undo was the most recent action. Comment this out if allowing any amount of undos.
      undone = true;
    }
  })
})
