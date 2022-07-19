class Cell{
    constructor(value, x, y ){
        this.possible_options   = [];
        this.is_Collapsed       = false;
        this.x                  = x;
        this.y                  = y;

        for(let i = 0 ; i < value; i++){
            this.possible_options[i] = i;
        }
    }

    check_valid_options(grid, tiles){
        //Check UP
        if(this.y > 0){ //If it is not at the top
            let cell_up = grid[this.x + (this.y - 1)* DIM]
            if(cell_up.is_Collapsed){
                this.possible_options = this.possible_options.filter(x => tiles[cell_up.possible_options[0]].down.includes(x)); //Interesects the current options with the available options
                //console.log("I am:" + this.x + this.y + " - new options: " + this.possible_options)
            }

        }
        //Check RIGHT
        if(this.x < DIM - 1){ //If it is not at the right side
            let cell_right = grid[this.x + 1 + this.y * DIM]
            if(cell_right.is_Collapsed){
                this.possible_options = this.possible_options.filter(x => tiles[cell_right.possible_options[0]].left.includes(x)); //Interesects the current options with the available options
                //console.log("I am:" + this.x + this.y + " - new options: " + this.possible_options)
            }
        }
        //Check DOWN
        if(this.y < DIM - 1){ //If it is not at the bottom
            let cell_down = grid[this.x + (this.y + 1) * DIM]
            if(cell_down.is_Collapsed){
                this.possible_options = this.possible_options.filter(x => tiles[cell_down.possible_options[0]].up.includes(x)); //Interesects the current options with the available options
                //console.log("I am:" + this.x + this.y + " - new options: " + this.possible_options)
            }
        }
        //Check LEFT
        if(this.x > 0){ //If it is not at the left side
            let cell_left = grid[this.x -1 + this.y * DIM]
            if(cell_left.is_Collapsed){
                this.possible_options = this.possible_options.filter(x => tiles[cell_left.possible_options[0]].right.includes(x)); //Interesects the current options with the available options
                //console.log("I am:" + this.x + this.y + " - new options: " + this.possible_options)
            }
        }
        
    }
}