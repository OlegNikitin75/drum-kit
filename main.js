
const keys = document.querySelectorAll('.key');
const showHearts = (posX, posY, item, min, max) => {
  let offsetX;
  let offsetY;
  offsetX = min + Math.random() * (max - min);
  offsetY = min + Math.random() * (max - min);
  const kbd = item.querySelector('kbd')
  const heart = document.createElement('img');
  heart.src = './assets/icon/heart.svg';
  heart.style.position = 'absolute'
  heart.style.left = `${posX}px`;
  heart.style.top = `${posY}px`;
  item.insertBefore(heart, kbd);
  heart.animate([
    { transform: 'scale(6)' },
    { transform: `translate(${offsetX}px,${offsetY}px)` },
  ], {
    duration: 500
  });
}
const hideHeart = (item) => {
  const heart = item.querySelector('img');
  heart.parentNode.removeChild(heart);
}
const activeKey = (item) => {
  item.classList.add('key--active');
  setTimeout(() => {
    item.classList.remove('key--active');
    hideHeart(item);
  }, 500)
}
const playSound = (code) => {
  const audio = document.querySelector(`audio[data-key="${code}"`);
  audio.currentTime = 0;
  audio.play();
}
keys.forEach(item => {
  item.addEventListener('click', (e) => {
    const coords = e.target.getBoundingClientRect();
    const posX = e.clientX - coords.left;
    const posY = e.clientY - coords.top;
    activeKey(item);
    playSound(item.dataset.key);
    showHearts(posX, posY, item, -200, 200);

  })
});
document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const code = e.keyCode;
  keys.forEach(item => {
    const coords = e.target.getBoundingClientRect();
    const posX = e.clientX - coords.left;
    const posY = e.clientY - coords.top;
    const itemCode = Number(item.dataset.key);
    if (itemCode === code) {
      activeKey(item);
      playSound(code);
      showHearts(posX, posY, item, -200, 200);
    }
  });
});
