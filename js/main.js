function random(min, max, fraction) {
  if (min > max) {
    alert('Значение Oт не может быть больше чем До');
  } else {
    return Math.abs(min + Math.random() * (max - min)).toFixed(fraction);
  }
}

alert(random(2, 5, 1));

// я не ставлю console.log вместо alert потому что npm test выдает ошибку если в коде оставлять console log
