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

  //All sells star in an inactive state
  for(let i = 0; i < DIM * DIM; i++){
    grid[i]= {
      collapsed: false,
      options: [BLANCK,UP,RIGHT,DOWN,LEFT]
    }
  }
}

function draw() {
  background(0);
  image(tiles[0], 0, 0);
  image(tiles[1], 10 , 0);
  image(tiles[2], 20, 0);
  image(tiles[3], 10, 10);
  image(tiles[4], 0, 10);
}