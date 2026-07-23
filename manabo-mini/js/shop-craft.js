// ==== まなぼみに / mini-app.js split: shop-craft.js ====
// このファイルは元の mini-app.js から機能ごとに分割したものです（挙動は変更していません）


// レアリティ確率テーブル（知識Lv×交流Lv合計スコアで重みが変わる）
function getRarityWeights(score) {
  // score = 知識Lv + 交流Lv（おみやげ数）
  // 伝説はスコア20以上でやっと0.3%。最高レベルでも2%のシビア設定
  if (score <= 3)  return [90,   9,    1,    0,     0];
  if (score <= 6)  return [82,   15,   2.5,  0.5,   0];
  if (score <= 12) return [70,   23,   5.5,  1.4,   0.1];
  if (score <= 20) return [58,   30,   9,    2.7,   0.3];
  if (score <= 35) return [45,   34,   15,   5.2,   0.8];
  if (score <= 55) return [30,   35,   22,   11,    2];
  return               [20,   30,   28,   20,    2];
}

// 発明：ランダムにアイテムを1個選ぶ（レアリティ重み付き）
function craftItem(knowledgeLv, kouryuLv) {
  const score = knowledgeLv + kouryuLv;
  const weights = getRarityWeights(score);
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  let targetRarity = 0;
  for (let i = 0; i < weights.length; i++) {
    rand -= weights[i];
    if (rand <= 0) { targetRarity = i; break; }
  }
  // そのレアリティのアイテムからランダムに選ぶ
  const pool = ITEMS.filter(item => item.rarity === targetRarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── アイテムクリエーション（まなぼみに版） ──
async function craftNewItem() {
  // 最後の発明から24時間経過していたらリセット
  const now = Date.now();
  const lastCraft = S.craftDate ? Number(S.craftDate) : 0;
  // 古い日付文字列（NaN or 0）の場合もリセット扱いに
  const isOldFormat = !S.craftDate || isNaN(lastCraft) || lastCraft < 1000000000000;
  if (isOldFormat || now - lastCraft >= 24 * 60 * 60 * 1000) { S.craftCount = 0; S.craftDate = ''; }
  if (S.craftCount >= 2) { showToast('きょうはもう2かいはつめいしたよ！あしたまたね！'); return; }
  const btn = document.getElementById('craft-btn');
  if (btn) btn.disabled = true;
  typeText('はつめいちゅうだよ…わくわく！✨');
  bounce();
  const item = craftItem(S.level, S.kouryuLv);
  const ri = RARITY_INFO[item.rarity];
  S.craftCount++;
  if (S.craftCount === 1) S.craftDate = String(Date.now()); // 最初の発明時刻を記録
  const newItem = { ...item, shopId: crypto.randomUUID(), listedAt: null, sold: false, craftedAt: Date.now() };
  S.inventory.push(newItem);
  updateHeader();
  renderInventory();
  saveState().catch(e => console.warn('save error', e));
  document.getElementById('craft-result-modal').style.display = 'flex';
  document.getElementById('craft-result-emoji').textContent = ri.emoji;
  document.getElementById('craft-result-name').textContent = item.name;
  document.getElementById('craft-result-desc').textContent = item.desc;
  document.getElementById('craft-result-rarity').textContent = ri.name;
  document.getElementById('craft-result-price').textContent = `¥${item.price.toLocaleString()}`;
  document.getElementById('craft-result-rarity').style.cssText = `color:${ri.color};font-weight:700;font-size:.85rem`;
  const msg = item.rarity === 4 ? `わあ！！でんせつだよ！！「${item.name}」！！えへへ！！` :
              item.rarity === 3 ? `すごい！レアだよ！「${item.name}」！えへへ！` :
              item.rarity === 2 ? `やった！「${item.name}」できたよ！` :
              item.rarity === 0 ? `あ…しっぱいしちゃった…「${item.name}」…えへへ` :
              `「${item.name}」できたよ！えへへ！`;
  typeText(msg);
  showHappy(item.rarity >= 2); bounce();
  if (btn) btn.disabled = false;
}
function closeCraftResult() { document.getElementById('craft-result-modal').style.display = 'none'; }

async function listItemToShop(i) {
  if (S.shopItems.length >= 10) { showToast('ショップがいっぱいだよ！うれたらあくよ！'); return; }
  const item = S.inventory[i];
  if (!item) return;
  S.shopItems.push({ ...item, listedAt: Date.now(), sold: false });
  S.inventory.splice(i, 1);
  await saveState(); renderInventory();
  showToast(`✨「${item.name}」をショップにだしたよ！`);
}
async function delistFromShop(i) {
  const item = S.shopItems[i];
  if (!item || item.sold) return;
  S.inventory.push({ ...item, listedAt: null });
  S.shopItems.splice(i, 1);
  await saveState(); renderInventory();
}
function renderInventory() {
  document.getElementById('inv-coins').textContent = S.coins.toLocaleString();
  document.getElementById('inv-shop-count').textContent = S.shopItems.length;
  document.getElementById('inv-items').innerHTML = S.inventory.length === 0
    ? '<div style="color:#b0a0cc;font-size:.82rem;text-align:center;padding:1rem">アイテムボックスはからだよ！はつめいしよ！</div>'
    : S.inventory.map((item,i) => {
        const ri = RARITY_INFO[item.rarity];
        return `<div style="background:#fdf8f0;border:1px solid #ffd0a0;border-radius:10px;padding:9px 11px;display:flex;gap:8px;align-items:center">
          <div style="font-size:1.4rem">${ri.emoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:.82rem;font-weight:600;color:#2d2040">${esc(item.name)}</div>
            <div style="font-size:.72rem;color:#c08040">¥${item.price.toLocaleString()} / ${ri.name}</div>
          </div>
          <button onclick="listItemToShop(${i})" style="flex-shrink:0;padding:4px 10px;border-radius:99px;border:1px solid #ffb870;background:#fff0e0;color:#c06010;font-size:.72rem;font-family:inherit;cursor:pointer">しゅっぴん</button>
        </div>`;
      }).join('');
  document.getElementById('inv-shop').innerHTML = S.shopItems.length === 0
    ? '<div style="color:#b0a0cc;font-size:.82rem;text-align:center;padding:1rem">しゅっぴんちゅうのアイテムはないよ</div>'
    : S.shopItems.map((item,i) => {
        const ri = RARITY_INFO[item.rarity];
        return `<div style="background:#fff8e0;border:1px solid #f0d080;border-radius:10px;padding:9px 11px;display:flex;gap:8px;align-items:center">
          <div style="font-size:1.4rem">${ri.emoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:.82rem;font-weight:600;color:#2d2040">${esc(item.name)}</div>
            <div style="font-size:.72rem;color:#c08040">¥${item.price.toLocaleString()} ${item.sold ? '✅うれた！' : 'しゅっぴんちゅう'}</div>
          </div>
          ${!item.sold ? `<button onclick="delistFromShop(${i})" style="flex-shrink:0;padding:4px 9px;border-radius:99px;border:1px solid #ccc;background:#f5f5f5;color:#666;font-size:.72rem;font-family:inherit;cursor:pointer">とりさげ</button>` : ''}
        </div>`;
      }).join('');
}
async function openInventory() {
  document.getElementById('inventory-modal').style.display='flex';
  try {
    const db = getDB();
    const snap = await db.collection('manabo').doc(MANABO_ID).get({ source: 'server' });
    if (snap.exists) {
      const d = snap.data();
      S.shopItems = d.shopItems ? JSON.parse(d.shopItems) : [];
      S.inventory = d.inventory ? JSON.parse(d.inventory) : [];
      S.coins = d.coins || S.coins;
      updateHeader();
    }
  } catch(e) {}
  renderInventory();
}
function closeInventory() { document.getElementById('inventory-modal').style.display='none'; }
