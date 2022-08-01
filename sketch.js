/// <reference path="TSDef/p5.global-mode.d.ts" />

//Tile images
const image_tiles = [];

//Flag to stop the algorithm
let should_stop = false;

//Array of tiles
let tiles = []

//State of each cell
const grid  = [];
const DIM   = 10;

//Possible cell states 
const BLANCK = 0;
const UP    = 1;
const RIGHT = 2;
const DOWN  = 3;
const LEFT  = 4;

/////FUNCTIONS
function createGrid(grid){
  for(let j = 0; j < DIM; j++){
    for(let i = 0; i < DIM; i++ ){
      grid[i + j * DIM] = new Cell(tiles.length, i, j)
    }
  }
}

function getCellWithLeastEntropy(){
  //Cell with the least entropy
  gridCopy = grid.slice();  //Copies the grid
  gridCopy = gridCopy.filter(noCollapsed => noCollapsed.is_Collapsed == false)
  gridCopy.sort((a,b) => {
    return a.possible_options.length - b.possible_options.length;
  })
  if(gridCopy.length == 0){
    should_stop = true;
    return;
  }
  let minEntropy = gridCopy[0].possible_options.length
  gridCopy = gridCopy.filter(min => min.possible_options.length == minEntropy)
  return gridCopy;
}

function collapseCell(grid){
    //[4.]
    //Cell with the least entropy
    gridCopy                          = getCellWithLeastEntropy(grid);             //Gets the group of the cells with the least entropy
    //console.log(gridCopy);
    //[5.]
    const cellChosen                  = random(gridCopy);                      //Picks a random cell from the group
    const x                           = cellChosen.x
    const y                           = cellChosen.y

    if(should_stop){
      should_stop = true;
      return;
    }

    grid[x + y * DIM].is_Collapsed    = true;                                  //Collapses the cell
    //[6.]
    const pick                        = random(cellChosen.possible_options);   //Choses an option from the options pool
    grid[x + y * DIM].possible_options= [pick];                                //Assigns the iption to the hosen cell
  
}

function updateEntropy(grid){
  for(let j = 0; j < DIM; j++){
    for(let i = 0; i < DIM; i++ ){
      let cell = grid[i + j * DIM]
      cell.check_valid_options(grid, tiles)
    }
  }
}
///ALGORITHM

function preload() {
  //[1.]
  //Loading the tile images
  const path = 'Tiles/Corners'
  for(let i = 0; i < 5; i++){
    image_tiles[i] = loadImage(`${path}/0${i}.png`)
  }
}

function setup(){ //Start en Unity
  createCanvas(500,500);
  //[1.]
  //Load and creating the tiles 
  tiles[0] = new Tile(image_tiles[0],[0,0,0,0])
  tiles[1] = new Tile(image_tiles[1],[1,1,0,1])
  tiles[2] = new Tile(image_tiles[2],[1,1,1,0])
  tiles[3] = new Tile(image_tiles[3],[0,1,1,1])
  tiles[4] = new Tile(image_tiles[4],[1,0,1,1])

  for(let i = 0; i < tiles.length; i++){
    tiles[i].index = i;
  }

  //[2.]
  //All cells star in an inactive state
  createGrid(grid);
  

  //[3. ]
  for(let i = 0; i < tiles.length; i++){
    const tile = tiles[i];
    tile.create_adjacent_rules(tiles);
  }
}

function draw() {
  background(0);
  
  //[4.] - [5.] - [6.]
  //Collapses the cell with the least entropy
  collapseCell(grid);

  updateEntropy(grid, tiles);
  //Dimesion f the grid
  const w = width  / DIM;
  const h = height / DIM;
  //Explores all the grid
  for(let j = 0; j < DIM; j++){
    for(let i = 0; i < DIM; i++ ){
      let cell = grid[i + j * DIM]
      //If the cell has been collapsed
      if(cell.is_Collapsed){
        let index = cell.possible_options[0];
        image(tiles[index].img, i * w, j * h, w, h)
      } else{
        //If not paint a black rect
        fill(0);
        stroke(255);
        rect(i * w, j * h, w , h)
      }
    }
  }
  if(should_stop){
  noLoop();
  }
}

function mousePressed() {
  draw();
};