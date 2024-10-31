// プレイヤーと敵のHPおよびMPの初期値
let playerHp = 200;
let playerMp = 100;
let enemyHp = generateEnemyHp(); // 新しい敵のHPを生成

// 呪文と攻撃のダメージとMPコスト設定
const spells = {
  attack: { damage: 10, mpCost: 0 },
  fire: { damage: 30, mpCost: 10 },
  water: { damage: 20, mpCost: 5 },
  thunder: { damage: 15, mpCost: 3 }
};

// ボタンにイベントリスナーを追加して呪文や攻撃を発動
document.getElementById("attack-button").addEventListener("click", function() {
  castSpell("attack");
});
document.getElementById("fire-button").addEventListener("click", function() {
  castSpell("fire");
});
document.getElementById("water-button").addEventListener("click", function() {
  castSpell("water");
});
document.getElementById("thunder-button").addEventListener("click", function() {
  castSpell("thunder");
});

// 呪文や攻撃を使う関数
function castSpell(spell) {
  // MPが足りない場合のチェック
  if (playerMp < spells[spell].mpCost) {
    document.getElementById("message").textContent = "MPが足りません！";
    return;
  }

  // プレイヤーの攻撃または呪文
  playerMp -= spells[spell].mpCost;
  enemyHp -= spells[spell].damage;
  document.getElementById("player-mp").textContent = Math.max(0, playerMp);
  document.getElementById("enemy-hp").textContent = Math.max(0, enemyHp);
  document.getElementById("message").textContent = `プレイヤーが${spell}で${spells[spell].damage}ダメージ！`;

  // 敵が倒されたかをチェック
  if (enemyHp <= 0) {
    document.getElementById("message").textContent += " 敵を倒した！新たな敵が現れた！";
    resetEnemy(); // 敵のHPをリセットして新たな敵を出現
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

// 新たな敵を出現させる関数
function resetEnemy() {
  enemyHp = generateEnemyHp(); // 新しい敵のHPを生成
  document.getElementById("enemy-hp").textContent = enemyHp;
}

// 標準偏差30、平均50の正規分布から敵のHPを生成する関数
function generateEnemyHp() {
  const mean = 50; // 平均値
  const stddev = 30; // 標準偏差
  let hp;

  // 正規分布に従うランダムなHPを生成し、最小値を1に制限
  do {
    hp = Math.round(mean + stddev * (Math.random() * 2 - 1));
  } while (hp < 1);

  return hp;
}

// ボタンを無効化する関数
function disableButtons() {
  document.querySelectorAll("#spell-buttons button").forEach(button => {
    button.disabled = true;
  });
}
