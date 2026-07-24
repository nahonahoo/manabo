// ==== manabo / app.js split: core-ui.js ====
// このファイルは元の app.js から機能ごとに分割したものです（挙動は変更していません）


// ── INIT ──
window.addEventListener('load', async () => {
  // ローディング表示
  document.getElementById('setup-screen').style.display = 'flex';
  document.getElementById('setup-loading').style.display = '';
  document.getElementById('setup-form').style.display = 'none';

  await loadState();

  document.getElementById('setup-loading').style.display = 'none';
  document.getElementById('setup-form').style.display = '';

  if (S.apiKey) {
    showMain();
  } else {
    document.getElementById('setup-screen').style.display = 'flex';
  }
});

async function startApp() {
  const key = document.getElementById('api-key-input').value.trim();
  if (!key || key.length < 10) {
    alert('APIキーを入力してね');
    return;
  }
  S.apiKey = key;
  saveApiKeyLocal(key);
  await saveState();
  showMain();
}

function showMain() {
  document.getElementById('setup-screen').style.display = 'none';
  document.getElementById('main-app').style.display = 'flex';
  updateHeader();
  renderKnowledge();
  applyAppearance();
  startMonoLoop();
  petSleep(); // 起動時は寝てる
}

// ── HEADER / XP ──
function updateHeader() {
  document.getElementById('lv-num').textContent = S.level;
  document.getElementById('xp-num').textContent = S.xp;
  document.getElementById('xp-max').textContent = S.xpMax;
  document.getElementById('xp-fill').style.width = Math.round(S.xp / S.xpMax * 100) + '%';
  const coinsEl = document.getElementById('coins-display');
  if (coinsEl) coinsEl.textContent = S.coins.toLocaleString();
  const craftEl = document.getElementById('craft-remain');
  if (craftEl) {
    const lastCraftTs = S.craftDate ? Number(S.craftDate) : 0;
    const isOld = !S.craftDate || isNaN(lastCraftTs) || lastCraftTs < 1000000000000;
    const elapsed = Date.now() - lastCraftTs;
    const remain = (isOld || elapsed >= 24*60*60*1000) ? 2 : Math.max(0, 2 - S.craftCount);
    craftEl.textContent = remain;
  }
}

function gainXP(n) {
  S.xp += n;
  if (S.xp >= S.xpMax) {
    S.xp -= S.xpMax;
    S.xpMax = Math.round(S.xpMax * 1.4);
    S.level++;
    const nm = LV_NAMES[Math.min(S.level - 1, LV_NAMES.length - 1)];
    document.getElementById('lv-msg').textContent = `Lv${S.level}「${nm}」になった！\n（本人は気づいてない）`;
    document.getElementById('lv-overlay').classList.add('show');
  }
  updateHeader();
}

// ── TABS ──
function switchTab(name, btn) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(name + '-panel').classList.add('active');
  if (name === 'knowledge') renderKnowledge();
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 5000);
}

// ── DRAWER ──
function openDrawer() {
  document.getElementById('d-api').value = S.apiKey;
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-bg').style.display = '';
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-bg').style.display = 'none';
}

function saveApiKey() {
  const k = document.getElementById('d-api').value.trim();
  if (!k) return;
  S.apiKey = k;
  saveApiKeyLocal(k);
  closeDrawer();
  typeText('APIキー…ほぞんした！（意味わかってない）');
}

async function resetAll() {
  if (!confirm('まなぼの記憶と会話を全部消しますか？')) return;
  S.knowledge = [];
  S.level = 1; S.xp = 0; S.xpMax = 5;
  S.chatHistory = [];
  S.monoCount = 0;
  await saveState();
  updateHeader();
  renderKnowledge();
  document.getElementById('chat-msgs').innerHTML = '';
  closeDrawer();
  typeText('きおく…けした…（ぽかん）');
}