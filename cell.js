class Cell{
    constructor(value){
        this.possible_options    = [];
        this.is_Collapsed   = false;
        
        for(let i = 0 ; i < value; i++){
            this.possible_options[i] = i;
        }
    }
}