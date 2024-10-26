// プレイヤーと敵のHP
let playerHp = 100;
let enemyHp = 50;

// 戦うボタンのクリックイベントを設定
document.getElementById("fight-button").addEventListener("click", fight);

function fight() {
  // プレイヤーの攻撃ダメージ
  const playerDamage = Math.floor(Math.random() * 15) + 5;  // 5～20のダメージ
  enemyHp -= playerDamage;
  document.getElementById("enemy-hp").textContent = Math.max(0, enemyHp);
  document.getElementById("message").textContent = `プレイヤーが敵に${playerDamage}ダメージ！`;

  // 敵のHPが0以下なら勝利メッセージ
  if (enemyHp <= 0) {
    document.getElementById("message").textContent = "おめでとう！敵を倒した！";
    disableButton();
    return;
  }

  // 敵の反撃
  const enemyDamage = Math.floor(Math.random() * 15) + 1; // 1～15のダメージ
  playerHp -= enemyDamage;
  document.getElementById("player-hp").textContent = Math.max(0, playerHp);
  document.getElementById("message").textContent += ` 敵がプレイヤーに${enemyDamage}ダメージ！`;

  // プレイヤーのHPが0以下なら敗北メッセージ
  if (playerHp <= 0) {
    document.getElementById("message").textContent = "残念！プレイヤーが倒されました…";
    disableButton();
  }
}

// ボタンを無効化する関数
function disableButton() {
  document.getElementById("fight-button").disabled = true;
}
