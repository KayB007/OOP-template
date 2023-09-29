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
  #isBesmet;

  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.#isBesmet = false;

  }

  getIsBesmet() {
    return this.#isBesmet;
  }

  setIsBesmet(besmetting) {
    this.#isBesmet = besmetting;
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
    if (this.x <= 0 || this.x + BREEDTEMENS >= width) {
      this.speedX = this.speedX * -1;
    }

    if (this.y <= 0 || this.y + BREEDTEMENS >= height) {
      this.speedY = this.speedY * -1;
    }
  }
};

class Mens extends Actor {
  constructor(x, y, speedX, speedY) {
    super(x, y, speedX, speedY)
    this.breedte = 20;
  }

  show() {
    super.show();

    noStroke();
    if (this.getIsBesmet() === true) {
      fill(255, 0, 0);      // rood
    }
    else {
      fill(255, 255, 255);  // wit
    }

    rect(this.x, this.y, this.breedte, this.breedte);
  }
};

class Dokter extends Mens {
  constructor(x, y, speedX, speedY) {
    super(x, y, speedX, speedY);
  }

  setIsBesmet(besmetting) {
    super.setIsBesmet(false);
  }

  show() {
    super.show();

    strokeWeight(5);
    stroke(255, 0, 0);
    line(this.x + this.breedte / 2, this.y,
      this.x + this.breedte / 2, this.y + this.breedte);
    line(this.x, this.y + this.breedte / 2,
      this.x + this.breedte, this.y + this.breedte / 2);
  }

};

class Kat extends Actor {
  constructor(x, y, speedX, speedY) {
    super(x, y, speedX, speedY)
    this.breedte = 10;
  }

  show() {
    super.show();

    noStroke();
    if (this.getIsBesmet(true)) {
      fill(255, 165, 0);      // oranje
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
var aantalKatten = 10;
var aantalDoktoren = 10;
var BREEDTEMENS = 20;
var BREEDTEKAT = 10;

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
    mensen.push(new Mens(random(0, 1280 - BREEDTEMENS), random(0, 720 - BREEDTEMENS), random(-5, 5),  random(-5, 5)))
  }
  for (var i = 0; i < aantalKatten; i++) {
    mensen.push(new Kat(random(0, 1280 - BREEDTEKAT), random(0, 720 - BREEDTEKAT),  random(-5, 5),  random(-5, 5)))
  }
  for (var i = 0; i < aantalDoktoren; i++) {
    mensen.push(new Dokter(random(0, 1280 - BREEDTEKAT), random(0, 720 - BREEDTEKAT),  random(-5, 5),  random(-5, 5)))
  }

  mensen[0].setIsBesmet(true);
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
          if (mensA.getIsBesmet() || mensB.getIsBesmet()) {
            if (mensA instanceof Dokter || mensB instanceof Dokter) {
              // minimaal één van de mensen is dokter,
              // dus ze worden / blijven beide gezond
              mensA.setIsBesmet(false)
              mensB.setIsBesmet(false)
            }
            else {
              // geen van de mensen is dokter, dus
              // als er één besmet is, wordt ze allebei besmet
              // als ze allebei besmet zijn, verandert deze code niets.
              mensA.setIsBesmet(true)
              mensB.setIsBesmet(true)
            }
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

