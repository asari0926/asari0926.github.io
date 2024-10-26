// プレイヤーと敵のHPおよびMPの初期値
let playerHp = 100;
let playerMp = 1000;
let enemyHp = 50;

// 呪文のダメージとMPコスト設定
const spells = {
  fire: { damage: 30, mpCost: 5 },
  water: { damage: 20, mpCost: 5 },
  thunder: { damage: 15, mpCost: 5 }
};

// 呪文を唱える関数
function castSpell(spell) {
  // MPが足りない場合のチェック
  if (playerMp < spells[spell].mpCost) {
    document.getElementById("message").textContent = "MPが足りません！";
    return;
  }

  // プレイヤーの呪文攻撃
  playerMp -= spells[spell].mpCost;
  enemyHp -= spells[spell].damage;
  document.getElementById("player-mp").textContent = Math.max(0, playerMp);
  document.getElementById("enemy-hp").textContent = Math.max(0, enemyHp);
  document.getElementById("message").textContent = `プレイヤーが${spell}の呪文で${spells[spell].damage}ダメージ！`;

  // 敵が倒されたかをチェック
  if (enemyHp <= 0) {
    document.getElementById("message").textContent = "おめでとう！敵を倒した！";
    disableButtons();
    return;
  }

  // 敵の反撃
  enemyAttack();
}

// 敵の攻撃関数
function enemyAttack() {
  const enemyDamage = Math.floor(Math.random() * 10) + 5; // 5～15のダメージ
  playerHp -= enemyDamage;
  document.getElementById("player-hp").textContent = Math.max(0, playerHp);
  document.getElementById("message").textContent += ` 敵が${enemyDamage}ダメージを与えた！`;

  // プレイヤーのHPが0以下なら敗北
  if (playerHp <= 0) {
    document.getElementById("message").textContent = "残念！プレイヤーが倒されました…";
    disableButtons();
  }
}

// ボタンを無効化する関数
function disableButtons() {
  document.querySelectorAll("#spell-buttons button").forEach(button => {
    button.disabled = true;
  });
}
