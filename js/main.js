let simbolsAfterComma;

function random(min, max, simbolsAfterComma) {
  if (min > max) {
    console.log("Значение от не может быть больше чем до");
  } else {
    return Math.abs(min + Math.random() * (max - min)).toFixed(
      simbolsAfterComma
    );
  }
}

console.log(random(2, 5, 1));
