'use strict';

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

function isGoodChoice(a) {
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

$(document).ready(() => {
  var x = getRandomInt(-10, 11);
  var y = getRandomInt(-10, 11);
  var a = {a11: 0, a12: 0, a21: 0, a22: 0};
  do {
    for (const [key, value] of Object.entries(a)) {
      a[key] = getRandomInt(-7, 8);
    }
  } while (!isGoodChoice(a));
  var b1 = a.a11*x + a.a12*y;
  var b2 = a.a21*x + a.a22*y;
  for (const [key, value] of Object.entries(a)) {
    placeCoefficient(value, key, true);
  }
  placeCoefficient(b1, 'b1', false);
  placeCoefficient(b2, 'b2', false);
});
