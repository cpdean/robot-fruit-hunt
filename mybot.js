function new_game() {
}

function not_empty(board_cell){
  return board_cell != 0;
}

function make_move() {
   //create a map of {fruit_type : [ (xlocation,ylocation), ... ], ... }
   var fruit_types = get_number_of_item_types();
   //init empty array
   var fruit_type_map = {}
   for (var i = 0; i < fruit_types; i++){
     fruit_type_map[i] = new Array();
   }
   //scan board and populate map
   for(var col : get_board()){
     for(var row : get_board()[col]){
       var cell_contents = get_board()[col][row];
       if(not_empty(cell_contents)){
         fruit_type_map[cell_contents].push([col,row]);
       }
     }
   }



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
