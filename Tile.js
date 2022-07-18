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
}