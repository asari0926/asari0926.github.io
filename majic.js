// プレイヤーと敵のHP
let playerHp = 100;
let enemyHp = 50;

// 呪文（じゅもん）のダメージ
const spells = {
  fire: 15,      // 炎の呪文
  water: 10,     // 水の呪文
  thunder: 20    // 雷の呪文
};

// 呪文を使って攻撃する関数
function castSpell(spell) {
  if (enemyHp <= 0 || playerHp <= 0) {
    return;  // ゲームが終わっている場合は何もしない
  }

  // 選んだ呪文のダメージ
  const damage = spells[spell];
  enemyHp -= damage;
  document.getElementById("enemy-hp").textContent = Math.max(0, enemyHp);

  // メッセージ表示
  document.getElementById("message").textContent = `${spell}の呪文で敵に${damage}ダメージを与えた！`;

  // 敵の反撃
  enemyAttack();
  
  // 勝敗チェック
  checkWinOrLose();
}

// 敵の反撃
function enemyAttack() {
  const enemyDamage = Math.floor(Math.random() * 15) + 1;  // 1～15のダメージ
  playerHp -= enemyDamage;
  document.getElementById("player-hp").textContent = Math.max(0, playerHp);
  document.getElementById("message").textContent += ` 敵から${enemyDamage}ダメージを受けた！`;
}

// 勝敗のチェック
function checkWinOrLose() {
  if (enemyHp <= 0) {
    document.getElementById("message").textContent = "おめでとう！敵を倒した！";
    disableButtons();
  } else if (playerHp <= 0) {
    document.getElementById("message").textContent = "残念（ざんねん）！やられてしまった！";
    disableButtons();
  }
}

// 呪文ボタンを無効にする関数
function disableButtons() {
  const buttons = document.querySelectorAll("#spell-buttons button");
  buttons.forEach(button => button.disabled = true);
}
