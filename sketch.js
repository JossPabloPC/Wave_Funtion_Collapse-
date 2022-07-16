/// <reference path="TSDef/p5.global-mode.d.ts" />

//Tile images
const tiles = [];

function preload() {
  //Loading the tile images
  tiles[0] = loadImage("Tiles/Corners/00_Empty.png")
  tiles[1] = loadImage("Tiles/Corners/01_Corner.png")
  tiles[2] = loadImage("Tiles/Corners/02_Corner.png")
  tiles[3] = loadImage("Tiles/Corners/03_Corner.png")
  tiles[4] = loadImage("Tiles/Corners/04_Corner.png")
}

function setup(){
  createCanvas(400,400);
}

function draw() {
  background(0);
  image(tiles[0], 0, 0);
  image(tiles[1], 10 , 0);
  image(tiles[2], 20, 0);
  image(tiles[3], 10, 10);
  image(tiles[4], 0, 10);
}