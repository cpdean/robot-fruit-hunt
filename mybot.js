function new_game() {
}

function not_empty(board_cell){
  return board_cell != 0;
}

function get_fruit_positions(){
  //create a map of {fruit_type : [ (xlocation,ylocation), ... ], ... }
  var fruit_types = get_number_of_item_types();

  //init empty array
  var fruit_type_map = {}
  for (var i = 1; i <= fruit_types; i++){
    fruit_type_map[i] = new Array();
  }

  //scan board and populate map
  for(var col in get_board()){
    for(var row in get_board()[col]){
      var cell_contents = get_board()[col][row];
      if(not_empty(cell_contents)){
        fruit_type_map[cell_contents].push([col,row]);
      }
    }
  }

  return fruit_type_map;
}

function fruit_distances(){
  // returns a structure that holds fruit positions
  // grouped by distance
  // { distance : [coord tuples at that distance], ... }
  var positions = get_fruit_positions();
  var robo_x = get_my_x();
  var robo_y = get_my_y();


  var distances = {};

  for(var type in positions){
    var fruits = positions[type];
    for(var i in fruits){
      var x = fruits[i][0];
      var y = fruits[i][1];
      var dx = Math.abs(x-robo_x);
      var dy = Math.abs(y-robo_y);
      var dist = dx+dy;
      distances[dist] = distances[dist] || new Array();
      distances[dist].push([x,y]);
    }
  }
  return distances;
}

function make_move() {
  var fd = fruit_distances();
  for(var i in fd){
    console.log(i);
    console.log("============");
    for(var j in fd[i]){
      console.log(fd[i][j]);
    }
  }

  var board = get_board();
  // we found an item! take it!
  if (board[get_my_x()][get_my_y()] > 0) {
    return TAKE;
  }

  var rand = Math.random() * 4;

  if (rand < 1) return NORTH;
  if (rand < 2) return SOUTH;
  if (rand < 3) return EAST;
  if (rand < 4) return WEST;

  return PASS;
}
