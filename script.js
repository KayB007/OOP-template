/* Opdracht Objectgeorienteerd programmeren
   Informatica - Emmauscollege Rotterdam
*/

/* ******************************************************* */
/* instellingen om foutcontrole van je code beter te maken */
/* ******************************************************* */
///<reference path="p5.global-mode.d.ts" />
"use strict"


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
// var xPositions = [];
// var yPositions = [];
// var speedX = [];
// var speedY = [];
var mensen;
const BREEDTE = 20;



/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  //var maxXpos = width-BREEDTE
  /*for (var i = 0; i < 20; i++) {
    xPositions.push(random(width-BREEDTE));
    yPositions.push(random(height-BREEDTE));
    speedX.push(random(-10,10));
    speedY.push(random(-10,10));
  } */

  mensen = [
    {
      x: 100,
      y: 100,
      speedX: -2,
      speedY: 10,
      update() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
      }
    },
    {
      x: 200,
      y: 200,
      speedX: 10,
      speedY: 10,
      update() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
      }
    }
  ];
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // zwarte achtergrond
  background(0, 0, 0);

  //for loop
  /*for (var i = 0; i < xPositions.length; i++) {
    // teken
    noStroke;
    fill(255, 255, 255);
    rect(xPositions[i], yPositions[i], BREEDTE, BREEDTE);

    // update positie
    xPositions[i] = xPositions[i] + speedX[i];
    yPositions[i] = yPositions[i] + speedY[i];

    // stuiter evt. tegen de kanten
    if (xPositions[i] <= 0 || xPositions[i] + BREEDTE >= width) {
      speedX[i] = speedX[i] * -1;
    }

    if (yPositions[i] <= 0 || yPositions[i] + BREEDTE >= height) {
      speedY[i] = speedY[i] * -1;
    }
  }*/

  for (var i = 0; i < mensen.length; i++) {
    // teken
    noStroke;
    fill(255, 255, 255);
    rect(mensen[i].x, mensen[i].y, BREEDTE, BREEDTE);

    // update positie
    mensen[i].update();

    // stuiter evt. tegen de kanten
    if (mensen[i].x <= 0 || mensen[i].x + BREEDTE >= width) {
      mensen[i].speedX = mensen[i].speedX * -1;
    }

    if (mensen[i].y <= 0 || mensen[i].y + BREEDTE >= height) {
      mensen[i].speedY = mensen[i].speedY * -1;
    }
  }
}
