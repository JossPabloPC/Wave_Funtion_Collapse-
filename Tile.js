class Tile{
    constructor(img, sockets, i){
        this.img        = img;
        this.sockets    = sockets;
        this.up         = [];
        this.right      = [];
        this.down       = [];
        this.left       = [];
        if( i !== undefined){
            this.index = i;
        }
    }

    create_adjacent_rules(tiles){
        for(let i = 0; i < tiles.length; i++){
            let tile = tiles[i]; //Current tile

            //Check UP
            if(this.sockets[0] == tile.sockets[2]){
                this.up.push(i);
            }

            //Check Right
            if(this.sockets[1] == tile.sockets[3]){
                this.right.push(i);
            }

            //Check Down
            if(this.sockets[2] == tile.sockets[0]){
                this.down.push(i);
            }

            //Check Left
            if(this.sockets[3] == tile.sockets[1]){
                this.left.push(i);
            }

        }
    }
}