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
var mensen = [];
const BREEDTE = 20;
var aantal = 25;



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


  class ClassMensen {
    x;
    y;
    speedX;
    speedY;
    isBesmet;

    constructor(x, y, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY;
      this.isBesmet = false;

    }
    show() {
      noStroke();
      if (this.isBesmet === true) {
        fill(255, 0, 0);      // rood
      }
      else {
        fill(255, 255, 255);  // wit
      }
  
      rect(this.x, this.y, BREEDTE, BREEDTE);
    }

    update() {
      this.x = this.x + this.speedX;
      this.y = this.y + this.speedY;
    
      // stuiter evt. tegen de kanten
     if (this.x <= 0 || this.x + BREEDTE >= width) {
      this.speedX = this.speedX * -1;
    }

    if (this.y <= 0 || this.y + BREEDTE >= height) {
      this.speedY = this.speedY * -1;
    }
    }
};

for (var i = 0; i < aantal; i++) {
  mensen.push(new ClassMensen(random(0, 1280 - BREEDTE), random(0, 720 - BREEDTE), random(-10, 10), random(-10, 10)))
}

mensen[0].isBesmet = true;
};

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // zwarte achtergrond
  background(0, 0, 0);

  //for loop

  for (var i = 0; i < aantal; i++) {
    // teken
    noStroke;
    fill(255, 255, 255);
    rect(mensen[i].x, mensen[i].y, BREEDTE, BREEDTE);

    // update positie
    mensen[i].update();
  }
}
