const scoreUI = document.getElementById('score');
const bulletsCountUI = document.getElementById('bullets-count');
const bulletProgressUI = document.getElementById('bullet-progress');
const alertsUI = document.getElementById('alerts');
const reloadingBulletsUI = document.getElementById('reloading-bullets');
const reloadingBulletsProgressUI = document.getElementById('reloading-bullets-progress');
const playerLivesUI = document.getElementById('player-lives');


bulletProgressUI.max = game.player.repeateShotTime;
bulletsCountUI.innerHTML = game.player.bulletsCount;
reloadingBulletsProgressUI.max = game.player.bulletsReloadTime;
playerLivesUI.innerHTML = game.player.lives;

