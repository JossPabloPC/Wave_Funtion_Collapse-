/// <reference path="TSDef/p5.global-mode.d.ts" />

//Tile images
const tiles = [];

//State of each cell
const grid  = [];
const DIM   = 2;

//Possible cell states 
const BLANCK = 0;
const UP    = 1;
const RIGHT = 2;
const DOWN  = 3;
const LEFT  = 4;

/////FUNCTIONS
function createGrid(){
  for(let i = 0; i < DIM * DIM; i++){
    grid[i]= {
      collapsed: false,
      options: [BLANCK,UP,RIGHT,DOWN,LEFT]
    }
  }
}

function getCellWithLeastEntropy(){
  //Cell with the least entropy
  gridCopy = grid.slice();  //Copies the grid
  gridCopy.sort((a,b) => {
    return a.options.length - b.options.length;
  })
  let minEntropy = gridCopy[0].options.length
  gridCopy = gridCopy.filter(min => min.options.length == minEntropy)
  return gridCopy;
}

function collapseCell(){
    //Cell with the least entropy
    gridCopy              = getCellWithLeastEntropy();    //Gets the group of the cells with the least entropy
    const cellChosen      = random(gridCopy);             //Picks a random cell from the group
    cellChosen.collapsed  = true;                         //Collapses the cell
    const pick            = random(cellChosen.options);   //Choses an option from the options pool
    cellChosen.options    = [pick];                       //Assigns the iption to the hosen cell
  
}
///ALGORITHM

function preload() {
  //Loading the tile images
  tiles[0] = loadImage("Tiles/Corners/00_Empty.png")
  tiles[1] = loadImage("Tiles/Corners/01_Up.png")
  tiles[2] = loadImage("Tiles/Corners/02_Right.png")
  tiles[3] = loadImage("Tiles/Corners/03_Down.png")
  tiles[4] = loadImage("Tiles/Corners/04_Left.png")
}

function setup(){
  createCanvas(400,400);

  //All cells star in an inactive state
  createGrid();
  
}

function draw() {
  background(0);
  
  //Collapses the cell with the least entropy
  collapseCell();


  //Dimesion f the grid
  const w = width  / DIM;
  const h = height / DIM;
  //Explores all the grid
  for(let j = 0; j < DIM; j++){
    for(let i = 0; i < DIM; i++ ){
      let cell = grid[i + j * DIM]
      //If the cell has been collapsed
      if(cell.collapsed){
        let index = cell.options[0];
        image(tiles[index], i * w, j * h, w, h)
      } else{
        //If not paint a black rect
        fill(0);
        stroke(255);
        rect(i * w, j * h, w , h)
      }
    }
  }

noLoop();

}