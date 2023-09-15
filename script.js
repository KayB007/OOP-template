/* Opdracht Objectgeorienteerd programmeren
   Informatica - Emmauscollege Rotterdam
*/

/* ******************************************************* */
/* instellingen om foutcontrole van je code beter te maken */
/* ******************************************************* */
///<reference path="p5.global-mode.d.ts" />
"use strict"

class Actor {
  x;
  y;
  speedX;
  speedY;
  breedte;
  isBesmet;

  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.isBesmet = false;

  }
  show() {
   
  }

  isOverlappend(andereMens) {
    // zet teruggeefwaarde standaard op false
    var overlappend = false;

    // zet teruggeefwaarde op true als er een overlap is
    if (
      (this.x >= andereMens.x &&
        this.x <= andereMens.x + andereMens.breedte &&
        this.y >= andereMens.y &&
        this.y <= andereMens.y + andereMens.breedte)
      ||
      (this.x + this.breedte >= andereMens.x &&
        this.x + this.breedte <= andereMens.x + andereMens.breedte &&
        this.y >= andereMens.y &&
        this.y <= andereMens.y + andereMens.breedte)
      ||
      (this.x + this.breedte >= andereMens.x &&
        this.x + this.breedte <= andereMens.x + andereMens.breedte &&
        this.y + this.breedte >= andereMens.y &&
        this.y + this.breedte <= andereMens.y + andereMens.breedte)
      ||
      (this.x >= andereMens.x &&
        this.x <= andereMens.x + andereMens.breedte &&
        this.y + this.breedte >= andereMens.y &&
        this.y + this.breedte <= andereMens.y + andereMens.breedte)

    ) {

      overlappend = true;
    }

    // stuur de teruggeefwaarde terug
    return overlappend;
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

class Mens extends Actor {
  constructor(x, y, speedX, speedY) {
    super(x, y, speedX, speedY)
    this.breedte = 20;
  }

  show(){
    super.show();

    noStroke();
    if (this.isBesmet === true) {
      fill(255, 0, 0);      // rood
    }
    else {
      fill(255, 255, 255);  // wit
    }

    rect(this.x, this.y, this.breedte, this.breedte);
  }
};

class Kat extends Actor {
  constructor(x, y, speedX, speedY) {
    super(x, y, speedX, speedY)
    this.breedte = 10;
  }

  show(){
    super.show();

    noStroke();
    if (this.isBesmet === true) {
      fill(255, 165, 0);      // rood
    }
    else {
      fill(0, 0, 255);  // wit
    }

    rect(this.x, this.y, this.breedte, this.breedte);
  }
};




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var mensen = [];
var aantalMensen = 25;
var aantalKatten = 30;
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

  for (var i = 0; i < aantalMensen; i++) {
    mensen.push(new Mens(random(0, 1280 - BREEDTE), random(0, 720 - BREEDTE), random(-10, 10), random(-10, 10)))
  }
  for (var i = 0; i < aantalKatten; i++) {
    mensen.push(new Kat(random(0, 1280 - BREEDTE), random(0, 720 - BREEDTE), random(-10, 10), random(-10, 10)))
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
  // ga alle mensen langs
  for (var i = 0; i < mensen.length; i++) {
    var mensA = mensen[i];
    // ga met mensA opnieuw alle mensen langs om te checken op overlap, behalve met zichzelf
    for (var j = 0; j < mensen.length; j++) {
      var mensB = mensen[j];
      if (mensA != mensB) {
        // check overlap
        var mensenOverlappen = mensA.isOverlappend(mensB);
        if (mensenOverlappen) {
          // check of er een besmetting optreedt
          if (mensA.isBesmet || mensB.isBesmet) {
            // als er één besmet is, wordt ze allebei besmet
            // als ze allebei besmet zijn, verandert deze code niets.
            mensA.isBesmet = true;
            mensB.isBesmet = true;
          }
        }
      }
    }
  }


  for (var i = 0; i < mensen.length; i++) {
    // teken
    mensen[i].show();

    // update positie
    mensen[i].update();
  }
}
