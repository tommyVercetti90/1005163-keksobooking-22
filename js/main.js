// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }
// alert(getRandomArbitrary(-3, 10));

function random(min, max) {
  return Math.abs(min + Math.random().toFixed(1) * (max - min));
}

alert(random(-2, 0));
