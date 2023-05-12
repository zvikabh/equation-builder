'use strict';

var a = {a11: 0, a12: 0, a21: 0, a22: 0};
var x, y;

function getRandomInt(min, max) {
  // The maximum is exclusive and the minimum is inclusive.
  return Math.floor(Math.random() * (max - min) + min);
}

function placeCoefficient(coef, id, dontWriteOnes) {
  if (coef >= 0) {
    if (dontWriteOnes && coef == 1) {
      $('#' + id).text('');
    } else {
      $('#' + id).text(coef);
    }
  } else {
    $('#pre-' + id).html('&minus;');
    if (dontWriteOnes && coef == -1) {
      $('#' + id).text('');
    } else {
      $('#' + id).text(-coef);
    }
  }
}

function isGoodChoice() {
  for (const [key, value] of Object.entries(a)) {
    if (value == 0) {
      return false;
    }
  }
  if (a.a11 * a.a22 == a.a12 * a.a21) {
    return false;  // Linearly dependent set of equations.
  }
  return true;
}

function check() {
  var userX = parseInt($('#x-input').val());
  var userY = parseInt($('#y-input').val());
  if (x == userX && y == userY) {
    $('#win').show();
  } else {
    $('#loss').show();
  }
}

$(document).ready(() => {
  x = getRandomInt(-10, 11);
  y = getRandomInt(-10, 11);
  do {
    for (const [key, value] of Object.entries(a)) {
      a[key] = getRandomInt(-7, 8);
    }
  } while (!isGoodChoice());
  var b1 = a.a11*x + a.a12*y;
  var b2 = a.a21*x + a.a22*y;
  for (const [key, value] of Object.entries(a)) {
    placeCoefficient(value, key, true);
  }
  placeCoefficient(b1, 'b1', false);
  placeCoefficient(b2, 'b2', false);
});
