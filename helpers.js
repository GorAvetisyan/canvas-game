function randomNumber(min, max) { 
  return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2){
  if (rect1.x < rect2.x + rect2.size &&
    rect1.x + rect1.size > rect2.x &&
    rect1.y < rect2.y + rect2.size &&
    rect1.y + rect1.size > rect2.y) {
      return true;
    }
}