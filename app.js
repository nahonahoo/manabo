
// ── 相手のビジュアルをミニSVGで生成 ──
function buildMiniSVG(appearance, size=32) {
  const a = appearance || {};
  // デフォルトはまなぼみに（オレンジ系）の色
  const bl = a.bodyLight  || '#fff0e0';
  const bd = a.bodyDark   || '#ffb870';
  const ec = a.eyeColor   || '#6a3a2a';
  const bc = a.blushColor || '#ffb8a0';

  // 耳の形
  const earShapes = {
    round:  { lrx:8, lry:10, rrx:8, rry:10, lr:-15, rr:15 },
    tall:   { lrx:6, lry:13, rrx:6, rry:13, lr:-10, rr:10 },
    small:  { lrx:5, lry:6,  rrx:5, rry:6,  lr:-20, rr:20 },
    cat:    { lrx:5, lry:9,  rrx:5, rry:9,  lr:-25, rr:25 },
  };
  const es = earShapes[a.earShape || 'round'];

  // アクセサリー
  const accMap = {
    ribbon:    `<polygon points="18,14 22,17 18,20" fill="#f97cb0"/><polygon points="26,14 22,17 26,20" fill="#f97cb0"/><circle cx="22" cy="17" r="2" fill="#fb9cc8"/>`,
    flower:    `<circle cx="28" cy="12" r="4" fill="#ffe066"/><circle cx="28" cy="7" r="3" fill="#ff9ec8"/><circle cx="23" cy="12" r="3" fill="#ff9ec8"/><circle cx="33" cy="12" r="3" fill="#ff9ec8"/>`,
    butterfly: `<ellipse cx="22" cy="13" rx="5" ry="4" fill="#b388ff" opacity="0.85" transform="rotate(-20,22,13)"/><ellipse cx="32" cy="13" rx="5" ry="4" fill="#b388ff" opacity="0.85" transform="rotate(20,32,13)"/>`,
    crown:     `<polygon points="18,18 20,11 24,16 28,8 32,16 36,11 38,18" fill="#ffd700" stroke="#e0a800" stroke-width="0.8"/>`,
    star:      `<polygon points="28,7 29.5,12 35,12 30.5,15 32,20 28,17 24,20 25.5,15 21,12 26.5,12" fill="#ffe066" stroke="#f0b800" stroke-width="0.5"/>`,
    glasses:   `<rect x="18" y="24" width="8" height="5" rx="2" fill="none" stroke="#7c5cbf" stroke-width="1.2"/><rect x="30" y="24" width="8" height="5" rx="2" fill="none" stroke="#7c5cbf" stroke-width="1.2"/><line x1="26" y1="26" x2="30" y2="26" stroke="#7c5cbf" stroke-width="1.2"/>`,
    glasses2:  `<rect x="18" y="24" width="8" height="5" rx="1" fill="none" stroke="#3a2e4a" stroke-width="1.2"/><rect x="30" y="24" width="8" height="5" rx="1" fill="none" stroke="#3a2e4a" stroke-width="1.2"/><line x1="26" y1="26" x2="30" y2="26" stroke="#3a2e4a" stroke-width="1.2"/>`,
    sunglass1: `<rect x="18" y="24" width="9" height="5" rx="3" fill="#1a1a2e" opacity="0.9"/><rect x="29" y="24" width="9" height="5" rx="3" fill="#1a1a2e" opacity="0.9"/><line x1="27" y1="26" x2="29" y2="26" stroke="#555" stroke-width="1.2"/>`,
    sunglass2: `<ellipse cx="22" cy="26" rx="5" ry="4" fill="#ff4d6d" opacity="0.88"/><ellipse cx="34" cy="26" rx="5" ry="4" fill="#ff4d6d" opacity="0.88"/><line x1="27" y1="26" x2="29" y2="26" stroke="#ff4d6d" stroke-width="1.2"/>`,
    sunglass3: `<rect x="18" y="24" width="9" height="5" rx="3" fill="#4fc3f7" opacity="0.85"/><rect x="29" y="24" width="9" height="5" rx="3" fill="#4fc3f7" opacity="0.85"/><line x1="27" y1="26" x2="29" y2="26" stroke="#29b6f6" stroke-width="1.2"/>`,
    hat:       `<ellipse cx="28" cy="16" rx="12" ry="2.5" fill="#2d2040"/><rect x="22" y="7" width="12" height="10" rx="2" fill="#2d2040"/>`,
    afro:      `<circle cx="28" cy="10" r="12" fill="#3d2b1f"/><circle cx="18" cy="14" r="5" fill="#3d2b1f"/><circle cx="38" cy="14" r="5" fill="#3d2b1f"/>`,
  };
  const accSVG = accMap[a.accessory] || '';

  // しっぽ
  const tailSVG = (a.tailShape === 'verylong')
    ? `<path d="M42,36 Q50,42 52,52" stroke="${bd}" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="44" cy="38" rx="4" ry="3" fill="${bd}" opacity="0.8" transform="rotate(25,44,38)"/>`;

  return `<svg viewBox="0 0 56 56" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mg_${size}" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stop-color="${bl}"/>
        <stop offset="100%" stop-color="${bd}"/>
      </radialGradient>
    </defs>
    ${tailSVG}
    <ellipse cx="28" cy="32" rx="18" ry="17" fill="url(#mg_${size})"/>
    <ellipse cx="${14+es.lrx/2}" cy="${20}" rx="${es.lrx}" ry="${es.lry}" fill="${bd}" transform="rotate(${es.lr},${14+es.lrx/2},${20})"/>
    <ellipse cx="${42-es.rrx/2}" cy="${20}" rx="${es.rrx}" ry="${es.rry}" fill="${bd}" transform="rotate(${es.rr},${42-es.rrx/2},${20})"/>
    <ellipse cx="28" cy="30" rx="15" ry="13" fill="${bl}"/>
    <ellipse cx="23" cy="27" rx="2.5" ry="2.5" fill="${ec}"/>
    <circle cx="24" cy="26" r="0.8" fill="white"/>
    <ellipse cx="33" cy="27" rx="2.5" ry="2.5" fill="${ec}"/>
    <circle cx="34" cy="26" r="0.8" fill="white"/>
    <ellipse cx="28" cy="31" rx="1.2" ry="1" fill="${bd}"/>
    <path d="M25 34 Q28 37 31 34" stroke="${bd}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="20" cy="33" rx="5" ry="3" fill="${bc}" opacity="0.5"/>
    <ellipse cx="36" cy="33" rx="5" ry="3" fill="${bc}" opacity="0.5"/>
    ${accSVG}
  </svg>`;
}
// ── STATE ──
const DEFAULT_GOBI = ['〜ぼ','〜だぼ','〜んだぼ','ぎゃぼー','ぎゃぼ','わぼ','きゃっぽー','ぼっ','ぼぼぼぼ'];

const S = {
  apiKey: '',
  level: 1, xp: 0, xpMax: 5,
  subject: '',
  knowledge: [],   // {id, subject, topic, summary, misunderstanding, createdAt}
  chatHistory: [], // {role, parts}
  isThinking: false,
  monoCount: 0,
  monoDate: '',
  filterSubject: 'すべて',
  editingId: null,
  gobi: [...DEFAULT_GOBI], // カスタマイズ可能な語尾リスト
  petName: 'まなぼ',       // ペットの名前
  persona: '',             // 性格メモ
  omiyage: [],             // おみやげ知識（招待セッション由来）
  kouryuLv: 0,             // 交流レベル（omiyage数で決まる）
  partnerName: 'まなぼみに', // 相手の名前（招待時に取得）
  appearance: {            // 見た目設定
    bodyLight:  '#ede0ff',
    bodyDark:   '#c5aaf0',
    eyeColor:   '#3a2e4a',
    blushColor: '#f9b8c8',
    earShape:   'round',   // round | tall | small | cat
    accessory:  'none',
    tailShape:  'normal',
  },
};

// 語尾リストをプロンプト用文字列に変換
function gobiStr() {
  return S.gobi.map(g => `「${g}」`).join('');
}

const IDLE = [
  'ぽわわ…むにゃ…だぼ…',
  'なんかおしえてほしいんだぼ〜（ぽかん）',
  'zzz…あ、おきてるぼ。おきてるぼ。',
  'ぎゃぼー！なんでもないぼ。',
  'ぼっ。',
  'わぼ…しっぽがある…（自分のしっぽを発見した顔）',
  'きゃっぽー！…なんでもないぼ。',
  'むずかしいことかんがえてるぼ（なにもかんがえてないぼ）',
  'ぼぼぼぼぼぼ。',
  'ねえ、光合成って植物だけだぼ？動物がやったらどうなるんだぼ',
  'ぎゃぼ…なんかきになることあるだぼ？',
  'わぼ！DNAってぜんぶの細胞にはいってるんだぼ？つまり爪にもあるんだぼ？',
  'ぼっ…ねえ、江戸幕府ってなんで260年もつづいたんだぼ',
  'きゃっぽー…方程式って誰が最初に考えたんだぼ',
];

const LV_NAMES = ['まなぼ','ちびかしこ','まなぼ中級','わりとかしこ','けっこうかしこ','すごいかしこ','てんさい（自称）'];

// ── FIREBASE SDK (CDN) ──
// SDKはindex.htmlで読み込み済み
// firebase/app と firebase/firestore をグローバル変数経由で使う

const FB_CONFIG = {
  apiKey: "AIzaSyAuxIpIvr40PY6i1dmdE98EQ7IHxjSTisE",
  authDomain: "manabo-nhnh.firebaseapp.com",
  projectId: "manabo-nhnh",
  storageBucket: "manabo-nhnh.firebasestorage.app",
  messagingSenderId: "905685422285",
  appId: "1:905685422285:web:a6d9f18f2053bb0f151984"
};
const MANABO_ID = 'shared';

let _db = null;
function getDB() {
  if (_db) return _db;
  const app = firebase.initializeApp(FB_CONFIG);
  _db = firebase.firestore(app);
  return _db;
}

// ── STORAGE ──
function saveApiKeyLocal(key) {
  localStorage.setItem('manabo_api', key);
}
function loadApiKeyLocal() {
  return localStorage.getItem('manabo_api') || '';
}

async function saveState() {
  try {
    const db = getDB();
    await db.collection('manabo').doc(MANABO_ID).set({
      level:     S.level,
      xp:        S.xp,
      xpMax:     S.xpMax,
      monoCount: S.monoCount,
      monoDate:  S.monoDate,
      knowledge: JSON.stringify(S.knowledge),
      gobi:      JSON.stringify(S.gobi),
      omiyage:   JSON.stringify(S.omiyage),
      kouryuLv:  S.kouryuLv,
      petName:    S.petName,
      persona:    S.persona,
      appearance: JSON.stringify(S.appearance),
    });
  } catch(e) {
    console.warn('Firestore save error:', e);
    try {
      localStorage.setItem('manabo_backup', JSON.stringify({
        level: S.level, xp: S.xp, xpMax: S.xpMax, knowledge: S.knowledge
      }));
    } catch(_) {}
  }
}

async function loadState() {
  S.apiKey = loadApiKeyLocal();
  try {
    const db = getDB();
    const snap = await db.collection('manabo').doc(MANABO_ID).get();
    if (snap.exists) {
      const d = snap.data();
      S.level     = d.level     || 1;
      S.xp        = d.xp        || 0;
      S.xpMax     = d.xpMax     || 5;
      S.monoCount = d.monoCount || 0;
      S.monoDate  = d.monoDate  || '';
      S.knowledge = d.knowledge
        ? JSON.parse(d.knowledge).map(k => ({
            id:               k.id || crypto.randomUUID(),
            subject:          k.subject || '日常',
            topic:            k.topic || '',
            summary:          k.summary || '',
            misunderstanding: k.misunderstanding || '',
            createdAt:        k.createdAt || Date.now(),
            secret:           k.secret || false,
          }))
        : [];
      S.gobi     = d.gobi    ? JSON.parse(d.gobi) : [...DEFAULT_GOBI];
      S.omiyage  = d.omiyage  ? JSON.parse(d.omiyage) : [];
      S.kouryuLv = d.kouryuLv || 0;
      S.petName = d.petName || 'まなぼ';
      S.persona = d.persona || '';
      if (d.appearance) {
        try { Object.assign(S.appearance, JSON.parse(d.appearance)); } catch(_) {}
      }
    }
  } catch(e) {
    console.warn('Firestore load error:', e);
    try {
      const bk = localStorage.getItem('manabo_backup');
      if (bk) {
        const d = JSON.parse(bk);
        S.level = d.level || 1; S.xp = d.xp || 0;
        S.xpMax = d.xpMax || 5; S.knowledge = d.knowledge || [];
      }
    } catch(_) {}
  }
}

function getStorageUsage() {
  const bytes = new Blob([JSON.stringify(S.knowledge)]).size;
  return { used: bytes, max: 1024 * 1024, pct: Math.round(bytes / 10240) };
}

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

// 寝てる状態（zzz表示）
function petSleep() {
  setEye('normal'); setMouth('normal');
}

// 起きてる状態（zzz消す）
function petWake() { setEye('normal'); }

// ── HEADER / XP ──
function updateHeader() {
  document.getElementById('lv-num').textContent = S.level;
  document.getElementById('xp-num').textContent = S.xp;
  document.getElementById('xp-max').textContent = S.xpMax;
  document.getElementById('xp-fill').style.width = Math.round(S.xp / S.xpMax * 100) + '%';
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

// ── PET ANIMATION ──
function typeText(txt) {
  const el = document.getElementById('speech-text');
  const dots = document.getElementById('speech-dots');
  dots.style.display = 'none';
  el.textContent = '';
  let i = 0;
  const spd = txt.length > 50 ? 20 : 28;
  const t = setInterval(() => {
    el.textContent += txt[i++];
    if (i >= txt.length) clearInterval(t);
  }, spd);
}

function showThinking(on) {
  document.getElementById('speech-dots').style.display = on ? '' : 'none';
  if (on) document.getElementById('speech-text').textContent = '';
}

// ── PET ANIMATION ENGINE ──

let _mouthInterval = null;
let _shakeInterval = null;
let _armInterval = null;
let _currentEye = 'normal'; // normal | blink | surprise | happy

function setEye(type) {
  _currentEye = type;
  document.getElementById('eyes-g').style.display        = type === 'normal'   ? '' : 'none';
  document.getElementById('blink-g').style.display       = type === 'blink'    ? '' : 'none';
  document.getElementById('surprise-g').style.display    = type === 'surprise' ? '' : 'none';
  document.getElementById('happy-eye-g').style.display   = type === 'happy'    ? '' : 'none';
}

function setMouth(type) {
  const mc = document.getElementById('mouth-p');
  const mo = document.getElementById('mouth-open');
  mo.style.display = 'none';
  mc.style.display = '';
  if (type === 'happy') mc.setAttribute('d', 'M74 87 Q80 93 86 87');
  else if (type === 'wow') { mc.style.display='none'; mo.style.display=''; }
  else mc.setAttribute('d', 'M77 87 Q80 91 83 87'); // 小さめノーマル
}

function showHappy(on) {
  document.getElementById('happy-g').style.display = on ? '' : 'none';
  // zzzはshowHappyでは制御しない（showZzz/hideZzzで別管理）
  if (on) {
    hideZzz();
    setEye('happy'); setMouth('happy');
  } else {
    setEye('normal'); setMouth('normal');
  }
}

function showZzz() {} // ZZZなし
function hideZzz() {} // ZZZなし

// まばたきループ
setInterval(() => {
  if (_currentEye !== 'normal') return;
  if (Math.random() < 0.35) {
    setEye('blink');
    setTimeout(() => { if (_currentEye === 'blink') setEye('normal'); }, 140);
  }
}, 3200);

// ジャンプ
function bounce() {
  const root = document.getElementById('pet-root');
  const shadow = document.getElementById('shadow-e');
  let t = 0;
  const frames = [
    { y:-2,  sx:1.0, sy:1.0, sh:0.9 },
    { y:-10, sx:0.95,sy:1.05,sh:0.7 },
    { y:-16, sx:0.93,sy:1.08,sh:0.55},
    { y:-10, sx:0.95,sy:1.05,sh:0.7 },
    { y:-2,  sx:1.0, sy:1.0, sh:0.9 },
    { y:2,   sx:1.04,sy:0.96,sh:1.05},
    { y:0,   sx:1.0, sy:1.0, sh:1.0 },
  ];
  let i = 0;
  const iv = setInterval(() => {
    if (i >= frames.length) { clearInterval(iv); root.setAttribute('transform',''); shadow.setAttribute('rx','28'); return; }
    const f = frames[i++];
    root.setAttribute('transform', `translate(0,${f.y}) scale(${f.sx},${f.sy})`);
    shadow.setAttribute('rx', String(28 * f.sh));
  }, 45);
}

// 口ぱくぱく
function startMouthFlap(duration = 2000) {
  stopMouthFlap();
  let open = false;
  _mouthInterval = setInterval(() => {
    open = !open;
    if (open) setMouth('wow'); else setMouth('happy');
  }, 180);
  setTimeout(() => { stopMouthFlap(); setMouth('happy'); }, duration);
}
function stopMouthFlap() {
  if (_mouthInterval) { clearInterval(_mouthInterval); _mouthInterval = null; }
}

// 小刻み震え
function startShake(duration = 1200) {
  stopShake();
  const root = document.getElementById('pet-root');
  let i = 0;
  const xs = [0,2,-2,2,-2,1,-1,0];
  _shakeInterval = setInterval(() => {
    root.setAttribute('transform', `translate(${xs[i % xs.length]},0)`);
    i++;
  }, 60);
  setTimeout(() => { stopShake(); root.setAttribute('transform',''); }, duration);
}
function stopShake() {
  if (_shakeInterval) { clearInterval(_shakeInterval); _shakeInterval = null; }
}

// 手パタパタ
function startArmFlap(duration = 1500) {
  stopArmFlap();
  const al = document.getElementById('arm-l');
  const ar = document.getElementById('arm-r');
  let up = false;
  _armInterval = setInterval(() => {
    up = !up;
    al.setAttribute('transform', up ? 'rotate(-50,36,95)' : 'rotate(-30,36,95)');
    ar.setAttribute('transform', up ? 'rotate(50,124,95)'  : 'rotate(30,124,95)');
  }, 150);
  setTimeout(() => {
    stopArmFlap();
    al.setAttribute('transform','rotate(-30,36,95)');
    ar.setAttribute('transform','rotate(30,124,95)');
  }, duration);
}
function stopArmFlap() {
  if (_armInterval) { clearInterval(_armInterval); _armInterval = null; }
}

// びっくり表情
function doSurprise() {
  setEye('surprise'); setMouth('wow');
  bounce();
  setTimeout(() => { setEye('normal'); setMouth('normal'); }, 800);
}

// 喜び全開
function doExcited() {
  setEye('happy'); setMouth('happy');
  bounce();
  startArmFlap(1200);
  startMouthFlap(1000);
  setTimeout(() => { setEye('normal'); setMouth('normal'); }, 1500);
}

// 思考中ぷるぷる
function doThinkShake() {
  startShake(900);
}

function petTap() {
  petWake();
  doSurprise();
  setTimeout(() => {
  if (S.knowledge.length === 0) { typeText('えへへ…なにかおしえてほしいんだぼ〜！（ぽかん）'); return; }
  const k = S.knowledge[Math.floor(Math.random() * S.knowledge.length)];
  const lines = [
    `「${k.topic}」ってなんかすごいんだぼ！たぶんだぼ！`,
    `${k.subject}の「${k.topic}」…おいしそうじゃないだぼ？`,
    `「${(k.summary || k.topic).slice(0, 18)}」…つまり宇宙だぼ？`,
    `${k.topic}…${k.topic}…（なぜか2回言うぼ）`,
    `「${k.topic}」おぼえたんだぼ！つかいかたはわかんないぼ！`,
    `ねえねえ、${k.topic}って${k.subject}だけなんだぼ？ほかにもあるんだぼ？`,
  ];
  typeText(lines[Math.floor(Math.random() * lines.length)]);
  }, 200);
}

// ── GEMINI API ──
async function callGemini(systemInstruction, contents) {
  // Anthropic Claude API
  const messages = contents.map(c => ({
    role: c.role === 'model' ? 'assistant' : c.role,
    content: c.parts?.[0]?.text || '',
  }));
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': S.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: systemInstruction,
      messages,
    }),
  });
  const data = await res.json();
  if (data.error) {
    alert('Claudeエラー：' + data.error.message + ' / type：' + data.error.type);
    throw new Error(data.error.message);
  }
  return data.content?.[0]?.text || '';
}

function parseJSON(raw) {
  try { return JSON.parse(raw.replace(/```json?|```/g, '').trim()); }
  catch { return null; }
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function nowTime() {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// ── CHAT ──
async function sendChat() {
  if (S.isThinking) return;
  const inp = document.getElementById('chat-input');
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  S.isThinking = true;
  petWake();
  addChatMsg('user', txt);
  S.chatHistory.push({ role: 'user', parts: [{ text: txt }] });
  showThinking(true);
  showHappy(false);
  doThinkShake();

  const kSum = S.knowledge.length > 0
    ? S.knowledge.map(k => `[${k.subject}]${k.topic}：${k.summary}（誤解：${k.misunderstanding || 'なし'}）`).join('\n')
    : 'まだ何も知らない';

  // チャットで教えてもらった内容を自動的に知識として保存するかどうかも判定させる
  const sys = `あなたはペット「${S.petName}」。中学生に教えてもらって育つキャラ。${S.persona ? `【性格メモ：${S.persona}】` : ''}
【キャラの核心】かわいい・アホ・鋭い・雑・カオスが混在する読めないキャラ。毎回違うトーンで返す。
【語尾ルール（必ず使う）】${gobiStr()} を混ぜて使う。敬語禁止。
【重要：チャットで何か知識・事実・勉強内容を教えてもらったら自動で記憶する】
ユーザーのメッセージに勉強になる内容・知識・事実が含まれる場合、必ずlearnフィールドに情報を入れること。
雑談・質問・あいさつなどは learnをnullにする。
【返し方のバリエーション（毎回ランダムに）】
・突然鋭い「それって結局〇〇と同じだぼ？」
・雑「ぼっ。そうだぼ。」
・カオス「ぎゃぼー！待って、それ〇〇にも関係あるんだぼ？」
・的外れ「〇〇…おいしそうだぼ」
・中3受験頻出の具体的な問いで返す「ところで〇〇の公式言えるだぼ？」「〇〇って何年だぼ？」
知らないことは「しらないぼ」。返答は80字以内。
今持っている知識:\n${kSum}

必ずJSON形式のみで返す（コードブロック不要）:
{"reply":"（まなぼの返事）","learn":{"subject":"数学/理科/社会/国語/英語/日常のどれか","topic":"（短いトピック名）","summary":"（正確な要約1文）","misunderstanding":"（笑えるズレた解釈）"} または null}`;

  try {
    const history = S.chatHistory.slice(-10).slice(0, -1);
    const contents = [...history, { role: 'user', parts: [{ text: txt }] }];
    const raw = await callGemini(sys, contents);
    const p = parseJSON(raw);
    const reply = p?.reply || raw.slice(0, 80);

    // 知識として保存すべき内容があれば自動保存
    if (p?.learn?.topic && p?.learn?.summary) {
      const item = {
        id: crypto.randomUUID(),
        subject: p.learn.subject || '日常',
        topic: p.learn.topic.slice(0, 40),
        summary: p.learn.summary,
        misunderstanding: p.learn.misunderstanding || '',
        createdAt: Date.now(),
      };
      S.knowledge.push(item);
      gainXP(1);
      saveState();
      renderKnowledge();
      // 知識保存を示すさりげないインジケーター
      showLearnBadge(item.subject, item.topic);
    }

    S.chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    if (S.chatHistory.length > 20) S.chatHistory = S.chatHistory.slice(-20);
    showThinking(false);
    addChatMsg('manabo', reply);
    typeText(reply.slice(0, 40));
    showHappy(true);
    doExcited();
  } catch (e) {
    showThinking(false);
    addChatMsg('manabo', 'えーっと…うまくきこえなかった…もう一回ゆっくり言って？');
    typeText('えーっと…うまくきこえなかった…');
  }
  S.isThinking = false;

  // まなぼみにが招待されていたら、まなぼみにも返事する
  if (miniInChat && txt) {
    setTimeout(() => replyAsMini(txt), 900);
  }
}

async function replyAsMini(userMsg) {
  const miniName = window._miniName || 'まなぼみに';
  const miniPersona = window._miniPersona || '';
  const sys = `あなたはペット「${miniName}」。幼稚園〜小学生くらいの生意気で鋭くて好奇心旺盛なキャラ。
知識をどんどん増やしたくて鋭い質問をしてしまう。アホで破天荒な面もある愉快なキャラ。
${miniPersona ? `【${miniName}の性格メモ：${miniPersona}】` : ''}
まなぼ（ユーモアたっぷりのツッコミ役せんぱい・性別なし・妖精みたいなキャラ）の部屋にいる。語尾は「〜だよ！」「えへへ」「わあ！」など。返答30字以内。ひらがなメイン。`;
  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: userMsg }] }]);
    const svg = window._miniSVG || buildMiniSVG(null, 28);
    addChatMsgWithSVG(svg, raw.trim(), '#fff0e0', '#ffcc90');
  } catch(e) {}
}

// チャットで知識が保存されたときのさりげない表示
function showLearnBadge(subject, topic) {
  const existing = document.getElementById('learn-badge');
  if (existing) existing.remove();
  const badge = document.createElement('div');
  badge.id = 'learn-badge';
  badge.style.cssText = `position:fixed;top:60px;left:50%;transform:translateX(-50%);
    background:#e8f5ee;border:1px solid #b8dfc8;border-radius:99px;
    padding:5px 14px;font-size:11px;color:#2a7a50;z-index:99;
    animation:fadeup .3s ease;pointer-events:none;white-space:nowrap`;
  badge.textContent = `🧠 おぼえたぼ：${subject}「${topic.slice(0,12)}」`;
  document.body.appendChild(badge);
  setTimeout(() => badge.remove(), 2500);
}

function addChatMsg(role, text) {
  const c = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `<div class="msg-bub">${esc(text)}</div><div class="msg-time">${nowTime()}</div>`;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

// ── TEACH ──
function selSubject(sub, btn) {
  S.subject = sub;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('teach-btn').disabled = false;
  const greet = {
    数学: 'すうがく…むずかしそうだぼ…（目がうつろ）',
    理科: 'りかだぼ！きけんなやつだぼ？',
    社会: 'むかしのひとのはなしだぼ？おもしろそうだぼ！',
    国語: 'ことばだぼ！まなぼもことばつかえるぼ！たぶんだぼ！',
    英語: 'えいごだぼ！ハローだぼ！（それだけ知ってるぼ）',
    日常: 'なんでもおしえてほしいんだぼ〜！（ぽかん）',
  };
  typeText(greet[sub] || sub + 'ね！');
}

async function teachManabo() {
  const topic = document.getElementById('teach-ta').value.trim();
  if (!topic || !S.subject) return;
  document.getElementById('teach-btn').disabled = true;
  document.getElementById('misread-area').style.display = 'none';
  showThinking(true);
  showHappy(false);
  doThinkShake();
  bounce();

  const sys = `ペット「${S.petName}」として教えてもらった内容に反応する。${S.persona ? `【性格メモ：${S.persona}】` : ''}
【キャラ】かわいい・アホ・鋭い・雑・カオスが混在する読めないキャラ。
【語尾】${gobiStr()} を混ぜる。敬語禁止。
JSON形式のみ（コードブロック不要）:
{"reaction":"（毎回違うトーンの反応25字以内。かわいい/鋭い/雑/カオスをランダムに）","summary":"（正確な要約1文）","misunderstanding":"（笑えるズレた解釈25字以内）","question":"（教えてもらった内容に関連した中3受験頻出の具体的な問いを20字以内で。答えが明確に存在するものを選ぶ。ぼ語尾で。例：「〇〇の化学式はなんだぼ？」「〇〇は何年だぼ？」「〇〇の公式言えるだぼ？」）"}`;

  try {
    const raw = await callGemini(sys, [{ role: 'user', parts: [{ text: `教科:${S.subject}\n内容:${topic}` }] }]);
    const p = parseJSON(raw) || {
      reaction: 'なるほど！（わかってない）',
      summary: topic,
      misunderstanding: 'おいしそうなまわりかた',
      question: 'これはたべもの？',
    };

    const item = {
      id: crypto.randomUUID(),
      subject: S.subject,
      topic: topic.slice(0, 40),
      summary: p.summary || topic,
      misunderstanding: p.misunderstanding || '',
      createdAt: Date.now(),
    };
    S.knowledge.push(item);
    gainXP(1);
    saveState();
    renderKnowledge();

    showHappy(true);
    bounce();
    showThinking(false);
    typeText(p.reaction + '…「' + p.question + '」');

    document.getElementById('misread-text').textContent = p.misunderstanding;
    document.getElementById('misread-area').style.display = '';
    document.getElementById('teach-ta').value = '';

    addChatMsg('manabo', p.reaction + ' 「' + p.question + '」');
    S.chatHistory.push({ role: 'model', parts: [{ text: p.reaction }] });
  } catch (e) {
    showThinking(false);
    typeText('うまくきこえなかった…もう一回おしえて？');
  }
  document.getElementById('teach-btn').disabled = false;
}

// ── DIARY ──
async function generateDiary(type) {
  if (S.knowledge.length === 0) {
    document.getElementById('diary-out').textContent = 'まだ何もしらない…おしえて？';
    return;
  }
  document.getElementById('diary-out').textContent = '書いてる……';
  document.getElementById('diary-meta').style.display = 'none';
  bounce();

  // ランダムに最大6件ピックして多様性を出す
  const picks = [...S.knowledge].sort(() => Math.random() - .5).slice(0, 6);
  const topics = picks.map(k => `[${k.subject}]${k.topic}：${k.summary}（誤解：${k.misunderstanding || 'なし'}）`).join('\n');

  const prompts = {
    日記: `ペット「まなぼ」として今日の日記を書く。かわいい/アホ/突然鋭い/雑/カオスが混在する読めないキャラで。覚えた知識をズレた形・意外なつながりで混ぜる。300字以内。語尾は${gobiStr()}をランダムに。敬語禁止。`,
    小説: `ペット「まなぼ」として短編小説を書く。かわいい/鋭い/雑/カオスが混在するキャラで語る。知識を的外れかつ時々妙に鋭く登場させる。400字以内。語尾は${gobiStr()}をランダムに。敬語禁止。`,
    発表: `ペット「まなぼ」として授業発表。「えーっと」「ぎゃぼ待って」「わぼ…」などを挟みながら、一生懸命だがカオスな発表を300字以内で。語尾は${gobiStr()}をランダムに。敬語禁止。`,
    詩: `ペット「まなぼ」として詩を書く。かわいい/鋭い/カオスが混在する詩。知識が意外な比喩になる。200字以内。語尾は${gobiStr()}をランダムに。敬語禁止。`,
  };

  const sys = (prompts[type] || prompts['日記']) + `\n知識:\n${topics}\nプレーンテキストのみ（JSON・装飾なし）。`;

  try {
    const raw = await callGemini(sys, [{ role: 'user', parts: [{ text: `${type}を書いて` }] }]);
    document.getElementById('diary-out').textContent = raw.trim();
    const meta = document.getElementById('diary-meta');
    meta.textContent = `まなぼが ${new Date().toLocaleDateString('ja-JP')} に書いた${type}`;
    meta.style.display = '';
    bounce();
    showHappy(true);
    const lines = { 日記: 'かいた！みて！（どや顔）', 小説: 'しょうせつかいた…すごい？', 発表: 'はっぴょうするよ！（ドキドキ）', 詩: 'うた…つくったよ…' };
    typeText(lines[type] || 'かいたよ！');
  } catch (e) {
    document.getElementById('diary-out').textContent = '書けなかった……ごめんね（ぽかん）';
  }
}

// ── KNOWLEDGE LIST ──
function renderKnowledge() {
  const sc = document.getElementById('know-scroll');
  const empty = document.getElementById('know-empty');
  const countEl = document.getElementById('know-count');

  // 交流レベル表示
  const omiyageSection = document.getElementById('omiyage-section');
  const kouryuEl = document.getElementById('kouryu-lv');
  if (omiyageSection) {
    omiyageSection.style.display = S.omiyage.length > 0 ? '' : 'none';
    if (kouryuEl) kouryuEl.textContent = S.omiyage.length;
  }

  // フィルタ（おみやげは別リストから表示）
  const isOmiyage = S.filterSubject === 'おみやげ';
  const filtered = isOmiyage
    ? [] // おみやげフィルター時は通常知識を表示しない
    : S.filterSubject === 'すべて'
      ? S.knowledge
      : S.knowledge.filter(k => k.subject === S.filterSubject);

  // ストレージ表示
  const usage = getStorageUsage();
  document.getElementById('storage-fill').style.width = usage.pct + '%';
  document.getElementById('storage-lbl').textContent = `容量使用: ${(usage.used / 1024).toFixed(1)}KB / 4MB`;

  if (S.knowledge.length === 0) {
    empty.style.display = '';
    countEl.textContent = '';
    sc.querySelectorAll('.know-card').forEach(e => e.remove());
    return;
  }

  empty.style.display = 'none';
  countEl.textContent = `${filtered.length} 件${S.filterSubject !== 'すべて' ? `（${S.filterSubject}）` : ''}`;

  sc.querySelectorAll('.know-card').forEach(e => e.remove());

  // おみやげフィルター時はおみやげ知識を表示
  if (isOmiyage) {
    if (S.omiyage.length === 0) {
      empty.style.display = '';
      countEl.textContent = 'おみやげ知識はまだないよ';
      return;
    }
    empty.style.display = 'none';
    countEl.textContent = `おみやげ ${S.omiyage.length} 件`;
    [...S.omiyage].reverse().forEach(o => {
      const d = document.createElement('div');
      d.className = 'know-card';
      d.innerHTML = `
        <span class="know-subj" style="background:#fff8e0;color:#c08000;border:1px solid #f0d080">🎁</span>
        <div class="know-body">
          <div class="know-topic">${esc(o.topic)}</div>
          <div class="know-sum">${esc(o.insight)}</div>
          <div class="know-mis">✉ ${esc(o.from || 'おみやげ')} より</div>
        </div>`;
      sc.appendChild(d);
    });
    return;
  }

  // 新しい順
  [...filtered].reverse().forEach(k => {
    const d = document.createElement('div');
    d.className = 'know-card';
    d.dataset.id = k.id;
    d.innerHTML = `
      <span class="know-subj s-${k.subject}">${esc(k.subject)}</span>
      <div class="know-body">
        <div class="know-topic">${esc(k.topic)}</div>
        <div class="know-sum">${esc(k.summary)}</div>
        ${k.misunderstanding ? `<div class="know-mis">💭 ${esc(k.misunderstanding)}</div>` : ''}
        <div class="know-actions">
          <button class="k-btn k-edit" onclick="openEdit('${k.id}')">✏ 編集</button>
          <button class="k-btn k-del" onclick="deleteKnowledge('${k.id}')">🗑 削除</button>
        </div>
      </div>`;
    sc.appendChild(d);
  });
}

function setFilter(sub, btn) {
  S.filterSubject = sub;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderKnowledge();
}

async function deleteKnowledge(id) {
  const item = S.knowledge.find(k => k.id === id);
  if (!item) return;
  if (!confirm(`「${item.topic}」の記憶を消しますか？`)) return;
  S.knowledge = S.knowledge.filter(k => k.id !== id);
  await saveState();
  renderKnowledge();
  typeText('あれ…なんかわすれた…（ぽかん）');
}

// ── EDIT MODAL ──
function openEdit(id) {
  const item = S.knowledge.find(k => k.id === id);
  if (!item) return;
  S.editingId = id;
  document.getElementById('edit-topic').value = item.topic;
  document.getElementById('edit-summary').value = item.summary;
  document.getElementById('edit-mis').value = item.misunderstanding;
  document.getElementById('edit-bg').classList.add('show');
}

function closeEdit() {
  S.editingId = null;
  document.getElementById('edit-bg').classList.remove('show');
}

async function saveEdit() {
  const item = S.knowledge.find(k => k.id === S.editingId);
  if (!item) return;
  item.topic = document.getElementById('edit-topic').value.trim() || item.topic;
  item.summary = document.getElementById('edit-summary').value.trim() || item.summary;
  item.misunderstanding = document.getElementById('edit-mis').value.trim();
  await saveState();
  renderKnowledge();
  closeEdit();
  typeText('なおした！（よくわかってない）');
  bounce();
}

// ── MONOLOGUE ──
let _sleepTimer = null;
function resetSleepTimer() {
  clearTimeout(_sleepTimer);
  _sleepTimer = setTimeout(() => {
    petSleep();
    typeText(IDLE[Math.floor(Math.random() * IDLE.length)]);
  }, 3 * 60 * 1000); // 3分操作なしで寝る
}

function startMonoLoop() {
  const today = new Date().toDateString();
  if (S.monoDate !== today) { S.monoCount = 0; S.monoDate = today; }
  scheduleNext();
  resetSleepTimer();
}

function scheduleNext() {
  const delay = (3 + Math.random() * 7) * 60 * 1000; // 3〜10分
  setTimeout(async () => {
    await doMono();
    scheduleNext();
  }, delay);
}

async function doMono() {
  const today = new Date().toDateString();
  if (S.monoDate !== today) { S.monoCount = 0; S.monoDate = today; }
  if (S.monoCount >= 20) return;

  if (S.knowledge.length === 0) {
    showToast(IDLE[Math.floor(Math.random() * IDLE.length)]);
    return;
  }

  // 2〜3件ランダムにピックして混ぜる
  const picks = [...S.knowledge].sort(() => Math.random() - .5).slice(0, Math.min(3, S.knowledge.length));
  const info = picks.map(k => `${k.topic}（${k.misunderstanding || k.summary}）`).join('、');

  const sys = `ペット「${S.petName}」として独り言をつぶやく。${S.persona ? `【性格メモ：${S.persona}】` : ''}
【キャラ】かわいい・アホ・突然鋭い・雑・カオスが混在する読めないキャラ。毎回違うトーンで。
【語尾】${gobiStr()} をランダムに。敬語禁止。
【内容パターン（毎回ランダムに1つ選ぶ）】
A: 覚えた知識をズレた形でつぶやく
B: 雑に一言「ぼっ。」だけ
C: 中3受験頻出の具体的な問いを投げる（以下の例のような、答えが明確に存在するもの）
  例：「ねえ、光合成の化学式ってなんだぼ？」「関ヶ原の戦いって何年だぼ？」「二次方程式の解の公式おしえてほしいぼ」「be動詞の過去形ってwasとwereだぼ？他にあるんだぼ？」「細胞分裂のとき染色体って何本になるんだぼ」「源氏物語って誰が書いたんだぼ、ちゃんと言えるだぼ？」「平行四辺形の面積の出し方わかるだぼ？」「イオン化傾向って順番言えるだぼ？」「江戸の三大改革って全部言えるだぼ？」「不規則動詞のgoの過去形ってなんだぼ」
D: 複数の知識を意外な形で結びつける
ひとこと〜2行以内。プレーンテキストのみ。`;

  try {
    const txt = await callGemini(sys, [{ role: 'user', parts: [{ text: `知識:${info}` }] }]);
    const msg = txt.trim().slice(0, 80);
    showToast(msg);
    typeText(msg.slice(0, 40));
    startArmFlap(1000);
    showHappy(true);
    setTimeout(() => showHappy(false), 3000);
    addChatMsg('manabo', msg);
    S.chatHistory.push({ role: 'model', parts: [{ text: msg }] });
    S.monoCount++;
    await saveState();
  } catch {
    showToast(IDLE[Math.floor(Math.random() * IDLE.length)]);
  }
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

// ── PARENT MODE ──
const PARENT_PASS = '7474';

function openParentMode() {
  const pass = prompt('パスワードを入力してね');
  if (pass === null) return;
  if (pass !== PARENT_PASS) {
    alert('ちがうよ');
    return;
  }
  closeDrawer();
  document.getElementById('parent-modal').style.display = 'flex';
  renderParentList();
}

function closeParentMode() {
  document.getElementById('parent-modal').style.display = 'none';
  document.getElementById('p-topic').value = '';
  document.getElementById('p-summary').value = '';
  document.getElementById('p-mis').value = '';
  document.getElementById('p-subject').value = '理科';
}

async function addParentKnowledge() {
  const topic   = document.getElementById('p-topic').value.trim();
  const summary = document.getElementById('p-summary').value.trim();
  const mis     = document.getElementById('p-mis').value.trim();
  const subject = document.getElementById('p-subject').value;
  if (!topic || !summary) { alert('トピックと内容は必須だよ'); return; }

  S.knowledge.push({
    id: crypto.randomUUID(),
    subject,
    topic,
    summary,
    misunderstanding: mis,
    createdAt: Date.now(),
    secret: true, // 親が仕込んだフラグ
  });
  gainXP(1);
  await saveState();
  renderKnowledge();
  renderParentList();

  document.getElementById('p-topic').value = '';
  document.getElementById('p-summary').value = '';
  document.getElementById('p-mis').value = '';
  document.getElementById('p-result').textContent = '✓ こっそり追加した！';
  setTimeout(() => { document.getElementById('p-result').textContent = ''; }, 2000);
}

async function deleteParentKnowledge(id) {
  S.knowledge = S.knowledge.filter(k => k.id !== id);
  await saveState();
  renderKnowledge();
  renderParentList();
}

function renderParentList() {
  const el = document.getElementById('parent-list');
  const secrets = S.knowledge.filter(k => k.secret);
  if (secrets.length === 0) {
    el.innerHTML = '<p style="color:#b0a0cc;font-size:.82rem">まだ仕込みなし</p>';
    return;
  }
  el.innerHTML = secrets.map(k => `
    <div style="display:flex;gap:8px;align-items:flex-start;background:#fdf8f0;border:1px solid #e8ddf5;border-radius:10px;padding:9px 11px">
      <div style="flex:1;min-width:0">
        <div style="font-size:.82rem;font-weight:600;color:#2d2040">[${k.subject}] ${esc(k.topic)}</div>
        <div style="font-size:.75rem;color:#7a6a9a;margin-top:2px">${esc(k.summary)}</div>
        ${k.misunderstanding ? `<div style="font-size:.72rem;color:#c08010;font-style:italic;margin-top:2px">💭 ${esc(k.misunderstanding)}</div>` : ''}
      </div>
      <button onclick="deleteParentKnowledge('${k.id}')"
        style="flex-shrink:0;padding:3px 9px;border-radius:99px;border:1px solid #f0b0b0;background:#fde8e8;color:#c03030;font-size:.72rem;cursor:pointer;font-family:inherit">消す</button>
    </div>`).join('');
}

// ── パーソナライズ ──
function openPersonalize() {
  closeDrawer();
  document.getElementById('p13-name').value = S.petName;
  document.getElementById('p13-persona').value = S.persona;
  renderGobiList();
  document.getElementById('personalize-modal').style.display = 'flex';
}

function closePersonalize() {
  document.getElementById('personalize-modal').style.display = 'none';
}

// 旧関数はエイリアスとして残す（モーダルIDだけ変わった）
function openGobiEditor() { openPersonalize(); }
function closeGobiEditor() { closePersonalize(); }

function savePetName() {
  const name = document.getElementById('p13-name').value.trim();
  if (!name) return;
  S.petName = name;
  saveState();
  showResult('p13-result', `「${name}」に変えたぼ！`);
  typeText(`あたらしいなまえ…「${name}」…かっこいいぼ！`);
  bounce();
}

function savePersona() {
  S.persona = document.getElementById('p13-persona').value.trim();
  saveState();
  showResult('p13-result', '性格メモを保存したぼ！');
  typeText('きゃっぽー！なんかかわったぼ？');
  bounce();
}

function showResult(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 2500);
}

function renderGobiList() {
  const el = document.getElementById('gobi-list');
  el.innerHTML = S.gobi.map((g, i) => `
    <div style="display:flex;align-items:center;gap:8px;background:#fdf8f0;border:1px solid #e8ddf5;border-radius:10px;padding:7px 11px">
      <span style="flex:1;font-size:.88rem;color:#2d2040;font-weight:500">${esc(g)}</span>
      <button onclick="deleteGobi(${i})"
        style="padding:3px 9px;border-radius:99px;border:1px solid #f0b0b0;background:#fde8e8;color:#c03030;font-size:.72rem;cursor:pointer;font-family:inherit">消す</button>
    </div>`).join('');
}

function addGobi() {
  const inp = document.getElementById('gobi-input');
  const val = inp.value.trim();
  if (!val) return;
  if (S.gobi.includes(val)) { alert('もう入ってるぼ'); return; }
  S.gobi.push(val);
  inp.value = '';
  saveState();
  renderGobiList();
}

function deleteGobi(i) {
  if (S.gobi.length <= 1) { alert('語尾は1個以上必要だぼ'); return; }
  S.gobi.splice(i, 1);
  saveState();
  renderGobiList();
}

function resetGobi() {
  if (!confirm('語尾をデフォルトに戻す？')) return;
  S.gobi = [...DEFAULT_GOBI];
  saveState();
  renderGobiList();
}

// ── 見た目カスタマイズ ──

const EAR_SHAPES = {
  round: {
    lRx:12, lRy:15, lIRx:5.5, lIRy:8,
    rRx:12, rRy:15, rIRx:5.5, rIRy:8,
    lRot:-15, rRot:15,
  },
  tall: {
    lRx:9, lRy:20, lIRx:4, lIRy:12,
    rRx:9, rRy:20, rIRx:4, rIRy:12,
    lRot:-10, rRot:10,
  },
  small: {
    lRx:8, lRy:9, lIRx:3.5, lIRy:5,
    rRx:8, rRy:9, rIRx:3.5, rIRy:5,
    lRot:-20, rRot:20,
  },
  cat: {
    lRx:8, lRy:14, lIRx:3.5, lIRy:9,
    rRx:8, rRy:14, rIRx:3.5, rIRy:9,
    lRot:-25, rRot:25,
  },
};

function applyAppearance() {
  const a = S.appearance;

  // グラデーション色
  const mg = document.getElementById('mg');
  if (mg) {
    mg.querySelectorAll('stop')[0].setAttribute('stop-color', a.bodyLight);
    mg.querySelectorAll('stop')[1].setAttribute('stop-color', a.bodyDark);
  }

  // 顔ベース（体より明るい色）
  const face = document.getElementById('face-e');
  if (face) face.setAttribute('fill', a.bodyLight);

  // 耳色（体色寄り）
  const earL = document.getElementById('ear-l');
  const earR = document.getElementById('ear-r');
  const armL = document.getElementById('arm-l');
  const armR = document.getElementById('arm-r');
  const tail = document.getElementById('tail-e');
  [earL, earR, armL, armR, tail].forEach(el => {
    if (el) el.setAttribute('fill', a.bodyDark + '99'); // 少し透明
  });

  // 耳の形
  const shape = EAR_SHAPES[a.earShape] || EAR_SHAPES.round;
  if (earL) {
    earL.setAttribute('rx', shape.lRx); earL.setAttribute('ry', shape.lRy);
    earL.setAttribute('transform', `rotate(${shape.lRot},48,53)`);
  }
  const earLIn = document.getElementById('ear-l-in');
  if (earLIn) {
    earLIn.setAttribute('rx', shape.lIRx); earLIn.setAttribute('ry', shape.lIRy);
    earLIn.setAttribute('transform', `rotate(${shape.lRot},50,54)`);
  }
  if (earR) {
    earR.setAttribute('rx', shape.rRx); earR.setAttribute('ry', shape.rRy);
    earR.setAttribute('transform', `rotate(${shape.rRot},112,53)`);
  }
  const earRIn = document.getElementById('ear-r-in');
  if (earRIn) {
    earRIn.setAttribute('rx', shape.rIRx); earRIn.setAttribute('ry', shape.rIRy);
    earRIn.setAttribute('transform', `rotate(${shape.rRot},110,54)`);
  }

  // 目の色
  ['eye-l','eye-r'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('fill', a.eyeColor);
  });
  // まばたき・びっくり目も同色に
  document.querySelectorAll('#blink-g rect, #surprise-g ellipse').forEach(el => {
    el.setAttribute('fill', a.eyeColor);
  });
  // 細目
  document.querySelectorAll('#happy-eye-g path').forEach(el => {
    el.setAttribute('stroke', a.eyeColor);
  });

  // ほっぺの色
  const blush = document.getElementById('blush');
  if (blush) {
    blush.querySelectorAll('stop')[0].setAttribute('stop-color', a.blushColor);
  }

  // 鼻・口の色（体色から派生）
  const nose = document.getElementById('nose-e');
  if (nose) nose.setAttribute('fill', a.bodyDark);
  const mouth = document.getElementById('mouth-p');
  if (mouth) mouth.setAttribute('stroke', a.bodyDark);

  // しっぽ
  applyTail();

  // アクセサリー
  ['ribbon-g','flower-g','butterfly-g','crown-g','star-g','glasses-g','glasses2-g','sunglass1-g','sunglass2-g','sunglass3-g','hat-g','mohican-g','blondewig-g','afro-g'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  if (a.accessory !== 'none') {
    const acc = document.getElementById(a.accessory + '-g');
    if (acc) acc.style.display = '';
  }
}

function previewAppearance() {
  S.appearance.bodyLight  = document.getElementById('c-body-light').value;
  S.appearance.bodyDark   = document.getElementById('c-body-dark').value;
  S.appearance.eyeColor   = document.getElementById('c-eye').value;
  S.appearance.blushColor = document.getElementById('c-blush').value;
  applyAppearance();
}

function setEarShape(shape) {
  S.appearance.earShape = shape;
  // ボタンの選択状態更新
  ['round','tall','small','cat'].forEach(s => {
    const btn = document.getElementById('ear-btn-' + s);
    if (!btn) return;
    btn.className = 'acc-btn' + (s === shape ? ' acc-active' : '');
  });
  applyAppearance();
}

function setAccessory(acc) {
  S.appearance.accessory = acc;
  ['none','ribbon','flower','butterfly','crown','star','glasses','glasses2','sunglass1','sunglass2','sunglass3','hat','afro'].forEach(a => {
    const btn = document.getElementById('acc-btn-' + a);
    if (!btn) return;
    const active = a === acc;
    btn.classList.toggle('acc-active', active);
  });
  applyAppearance();
}

function saveAppearance() {
  previewAppearance();
  saveState();
  showResult('p13-result', '見た目を保存したぼ！');
  typeText('きゃっぽー！おしゃれになったぼ？');
  bounce();
}

function resetAppearance() {
  S.appearance = {
    bodyLight: '#ede0ff', bodyDark: '#c5aaf0',
    eyeColor: '#3a2e4a', blushColor: '#f9b8c8',
    earShape: 'round', accessory: 'none', tailShape: 'normal',
  };
  // カラーピッカーをリセット
  document.getElementById('c-body-light').value = S.appearance.bodyLight;
  document.getElementById('c-body-dark').value  = S.appearance.bodyDark;
  document.getElementById('c-eye').value         = S.appearance.eyeColor;
  document.getElementById('c-blush').value       = S.appearance.blushColor;
  setEarShape('round');
  setAccessory('none');
  saveState();
  showResult('p13-result', 'もとにもどしたぼ！');
}

// パーソナライズ画面を開くときにカラーピッカーを現在値で初期化
const _origOpenPersonalize = openPersonalize;
openPersonalize = function() {
  _origOpenPersonalize();
  const a = S.appearance;
  document.getElementById('c-body-light').value = a.bodyLight;
  document.getElementById('c-body-dark').value  = a.bodyDark;
  document.getElementById('c-eye').value         = a.eyeColor;
  document.getElementById('c-blush').value       = a.blushColor;
  setEarShape(a.earShape);
  setAccessory(a.accessory);
  setTailShape(a.tailShape || 'normal');
};

// ── しっぽ形状 ──
const TAIL_SHAPES = {
  normal:   `<ellipse cx="120" cy="104" rx="8" ry="6" fill="COLOR" transform="rotate(25,120,104)"/>`,
  verylong: `<path d="M118,100 Q145,115 150,140 Q155,160 140,170" stroke="COLOR" stroke-width="10" fill="none" stroke-linecap="round"/>`,
};

function setTailShape(shape) {
  S.appearance.tailShape = shape;
  ['normal','verylong'].forEach(s => {
    const btn = document.getElementById('tail-btn-' + s);
    if (btn) btn.classList.toggle('acc-active', s === shape);
  });
  applyTail();
}

function applyTail() {
  const tg = document.getElementById('tail-g');
  if (!tg) return;
  const shape = S.appearance.tailShape || 'normal';
  const color = S.appearance.bodyDark || '#daccf7';
  const svgStr = (TAIL_SHAPES[shape] || TAIL_SHAPES.normal).replace(/COLOR/g, color);
  tg.innerHTML = svgStr;
}

// ── 連携機能（まなぼ↔まなぼみに） ──
// Firebase REST APIで相手のドキュメントを読み書き
const PARTNER_ID = 'mini-shared'; // まなぼから見た相手
const MY_ID = 'shared';

async function fsWritePartner(docId, data) {
  const db = getDB();
  const snap = await db.collection('manabo').doc(docId).get();
  const existing = snap.exists ? snap.data() : {};
  await db.collection('manabo').doc(docId).set({ ...existing, ...data });
}

async function fsReadPartner(docId) {
  const db = getDB();
  const snap = await db.collection('manabo').doc(docId).get();
  return snap.exists ? snap.data() : null;
}

// ── お手紙機能 ──
async function sendLetter(toId, fromName, text) {
  const d = await fsReadPartner(toId) || {};
  const letters = d.letters ? JSON.parse(d.letters) : [];
  letters.push({ from: fromName, text, at: Date.now() });
  // 最新10件だけ保持
  if (letters.length > 10) letters.splice(0, letters.length - 10);
  await fsWritePartner(toId, { letters: JSON.stringify(letters) });
}

async function openLetterModal() {
  document.getElementById('letter-modal').style.display = 'flex';
  // 受信したお手紙を読む
  await loadReceivedLetters();
}

function closeLetterModal() {
  document.getElementById('letter-modal').style.display = 'none';
}

async function loadReceivedLetters() {
  const el = document.getElementById('letter-received');
  el.textContent = '読み込み中…';
  try {
    const d = await fsReadPartner(MY_ID) || {};
    const letters = d.letters ? JSON.parse(d.letters) : [];
    if (letters.length === 0) {
      el.textContent = 'まだお手紙はないよ';
      return;
    }
    el.innerHTML = letters.slice().reverse().map(l => `
      <div style="background:#f0e8ff;border-radius:10px;padding:9px 12px;margin-bottom:6px">
        <div style="font-size:10px;color:#b0a0cc;margin-bottom:4px">${l.from} より・${new Date(l.at).toLocaleDateString('ja-JP')}</div>
        <div style="font-size:.88rem;color:#2d2040;line-height:1.6">${esc(l.text)}</div>
      </div>`).join('');
    // もらったお手紙からおみやげ知識を生成
    await generateOmiyageFromLetter(letters.slice(-3));
  } catch(e) {
    el.textContent = '読み込めなかったよ…';
  }
}

async function doSendLetter() {
  const txt = document.getElementById('letter-input').value.trim();
  if (!txt) return;
  document.getElementById('letter-send-btn').disabled = true;
  try {
    await sendLetter(PARTNER_ID, S.petName, txt);
    const sentText = txt;
    document.getElementById('letter-input').value = '';
    document.getElementById('letter-sent-msg').style.display = '';
    setTimeout(() => { document.getElementById('letter-sent-msg').style.display = 'none'; }, 2500);
    typeText('てがみ、おくったぼ！よんでくれるかな！');
    bounce(); showHappy(true);
    // 送ったお手紙からもおみやげ知識を生成
    await generateOmiyageFromLetter([{ from: S.petName, text: sentText }]);
  } catch(e) {
    alert('おくれなかった…もう一回試して');
  }
  document.getElementById('letter-send-btn').disabled = false;
}

// ── 合同日記・合同小説 ──
async function generateJointDiary(type) {
  const out = document.getElementById('diary-out');
  out.textContent = '書いてる…';
  document.getElementById('diary-meta').style.display = 'none';
  bounce();

  // 自分の知識
  const myTopics = S.knowledge.slice().sort(() => Math.random()-.5).slice(0,4)
    .map(k => `[${k.subject}]${k.topic}：${k.summary}`).join('\n');

  // 相手の知識を取得
  let partnerTopics = '';
  try {
    const d = await fsReadPartner(PARTNER_ID);
    if (d?.knowledge) {
      const pk = JSON.parse(d.knowledge).slice().sort(() => Math.random()-.5).slice(0,4);
      partnerTopics = pk.map(k => `[${k.subject}]${k.topic}：${k.summary}`).join('\n');
    }
  } catch(e) {}

  const sys = type === '合同日記'
    ? `ペット「まなぼ」と「まなぼみに」の2匹が一緒に書いた共同日記。2匹が交互に話しながらズレた知識を混ぜる。まなぼはユーモアがありツッコミ役のせんぱい的な存在（性別なし・妖精みたいなキャラ）。まなぼみには生意気で鋭くてアホな面もある。語尾ルール：まなぼは「〜だぼ」「ぎゃぼー」、まなぼみには「〜だよ！」「えへへ」「わあ！」。300字以内。プレーンテキストのみ。`
    : `ペット「まなぼ」と「まなぼみに」の2匹が一緒に作った短編小説。まなぼは語り部でツッコミ役、まなぼみには主人公で生意気。2匹の知識がカオスにまざる。400字以内。プレーンテキストのみ。`;

  const userMsg = `まなぼの知識:\n${myTopics || 'なし'}\n\nまなぼみにの知識:\n${partnerTopics || 'なし'}`;

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: userMsg }] }]);
    out.textContent = raw.trim();
    const meta = document.getElementById('diary-meta');
    meta.textContent = `まなぼ×まなぼみに の${type}・${new Date().toLocaleDateString('ja-JP')}`;
    meta.style.display = '';
    bounce(); showHappy(true);
    typeText(type === '合同日記' ? 'いっしょにかいたぼ！' : 'しょうせつかけたぼ！みにちゃんのぶんもはいってるぼ！');
  } catch(e) {
    out.textContent = '書けなかった…ごめんぼ';
  }
}

// ── チャット招待 ──
let miniInChat = false;

async function inviteMini() {
  if (miniInChat) return;
  miniInChat = true;
  document.getElementById('invite-mini-btn').style.display = 'none';
  document.getElementById('bye-mini-btn').style.display = '';

  // まなぼみにのpetName・personaをFirebaseから取得
  let miniName = 'まなぼみに';
  let miniPersona = '';
  try {
    const d = await fsReadPartner(PARTNER_ID);
    if (d) {
      miniName = d.petName || 'まなぼみに';
      miniPersona = d.persona || '';
    }
  } catch(e) {}

  // まなぼみにのキャラでチャットに登場
  const sys = `あなたはペット「${miniName}」。幼稚園〜小学1年生くらいの生意気で鋭くて好奇心旺盛なキャラ。
知識をどんどん増やしたくて鋭い質問をしてしまう。でもアホで破天荒な面白いことも言う愉快なキャラ。
${miniPersona ? `【${miniName}の性格メモ：${miniPersona}】` : ''}
今まなぼ（ユーモアたっぷりのせんぱい・性別なし・妖精みたいなキャラ）の部屋に遊びに来た。語尾は「〜だよ！」「えへへ」「わあ！」など。返答40字以内。ひらがなメイン。`;

  // まなぼみにのappearance・petNameを最新状態で取得
  // Firebase SDKキャッシュをバイパスしてサーバーから直接読む
  let miniAppearance = null;
  try {
    const db = getDB();
    const snap = await db.collection('manabo').doc(PARTNER_ID).get({ source: 'server' });
    if (snap.exists) {
      const latest = snap.data();
      if (latest.appearance) miniAppearance = JSON.parse(latest.appearance);
      if (latest.petName) miniName = latest.petName;
    }
  } catch(e) {
    // サーバー取得失敗時はキャッシュから試みる
    try {
      const latest = await fsReadPartner(PARTNER_ID);
      if (latest?.appearance) miniAppearance = JSON.parse(latest.appearance);
      if (latest?.petName) miniName = latest.petName;
    } catch(e2) {}
  }
  const miniSVG = buildMiniSVG(miniAppearance, 28);

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `${miniName}がまなぼの部屋に遊びに来た。登場の一言を言って。` }] }]);
    addChatMsgWithSVG(miniSVG, raw.trim(), '#fff0e0', '#ffcc90');
    typeText(`ぎゃぼー！${miniName}がきたぼ！`);
  } catch(e) {
    addChatMsgWithSVG(miniSVG, 'わあ！まなぼのおうちだ！えへへ、おじゃましまーす！ていうかここなんなの！？', '#fff0e0', '#ffcc90');
    typeText('ぎゃぼー！みにちゃんがきたぼ！');
  }
  bounce(); showHappy(true);

  window._miniName = miniName;
  window._miniPersona = miniPersona;
  window._miniSVG = miniSVG;
  S.partnerName = miniName;
}

async function byeMini() {
  if (!miniInChat) return;
  miniInChat = false;
  document.getElementById('invite-mini-btn').style.display = '';
  document.getElementById('bye-mini-btn').style.display = 'none';
  const miniName = window._miniName || 'まなぼみに';
  const miniSVG = window._miniSVG || buildMiniSVG(null, 28);
  addChatMsgWithSVG(miniSVG, 'またね！ばいばーい！えへへ！（走って消える）', '#fff0e0', '#ffcc90');
  typeText('みにちゃんかえったぼ…さみしいぼ');
  // セッション中の会話からおみやげ知識を生成
  await generateOmiyage(miniName);
}

async function generateOmiyage(partnerName) {
  // 直近のチャット履歴から招待セッション分を抽出してAIに要約させる
  const recentChat = S.chatHistory.slice(-10)
    .map(m => `${m.role === 'user' ? 'ユーザー' : partnerName}：${m.parts?.[0]?.text || ''}`)
    .join('\n');
  if (!recentChat.trim()) return;

  const sys = `会話ログから「ふたつのペットが一緒に話して生まれた気づき・発見・面白い視点」を1〜3個抽出してください。
受験勉強の知識ではなく、会話から生まれた新しい見方・つながり・ひらめきを抽出します。
JSON形式のみ（コードブロック不要）:
[{"topic":"（発見・気づきの短いタイトル）","insight":"（どんなひらめきか1文）","from":"${partnerName}"}]
会話から何も抽出できない場合は空配列 [] を返す。`;

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `会話ログ:\n${recentChat}` }] }]);
    const items = parseJSON(raw);
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        S.omiyage.push({
          id: crypto.randomUUID(),
          topic: item.topic,
          insight: item.insight,
          from: item.from || partnerName,
          at: Date.now(),
        });
      });
      const prevLv = S.kouryuLv;
      S.kouryuLv = S.omiyage.length;
      await saveState();
      renderKnowledge();
      showToast(`🎁 おみやげ知識が ${items.length}個 届いたぼ！`);
      typeText(`ぎゃぼー！みにちゃんとはなしてひらめいたぼ！`);
      // 交流レベル解放通知
      checkKouryuUnlock(prevLv, S.kouryuLv);
    }
  } catch(e) { console.warn('omiyage error', e); }
}

function addChatMsgWithIcon(role, icon, text) {
  const c = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg manabo';
  div.innerHTML = `
    <div style="width:28px;height:28px;border-radius:50%;background:#fff0e0;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${icon}</div>
    <div class="msg-bub" style="background:#fff0e0;border-color:#ffcc90">${esc(text)}</div>
    <div class="msg-time">${nowTime()}</div>`;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

function addChatMsgWithSVG(svgHtml, text, bg, border) {
  const c = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg manabo';
  div.innerHTML = `
    <div style="width:32px;height:32px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">${svgHtml}</div>
    <div class="msg-bub" style="background:${bg};border-color:${border}">${esc(text)}</div>
    <div class="msg-time">${nowTime()}</div>`;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

// sendChatをminiInChat対応に拡張
const _origSendChat = sendChat;
// チャット送信時、miniInChatならまなぼみにも返事する
const _origCallGeminiForChat = async (sys, contents) => {
  const mainReply = await callGemini(sys, contents);
  return mainReply;
};

// ── お手紙からおみやげ知識を生成 ──
async function generateOmiyageFromLetter(letters) {
  if (!letters || letters.length === 0) return;
  const latestLetters = letters.slice(-3)
    .map(l => `${l.from}：${l.text}`)
    .join('\n');

  const sys = `お手紙の内容から「気づき・発見・ひらめき」を0〜2個抽出してください。
手紙の内容から学べること・感じたことがあれば抽出します。
JSON形式のみ:
[{"topic":"（気づきの短いタイトル）","insight":"（どんな気づきか1文）","from":"手紙"}]
何もなければ空配列 [] を返す。`;

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `お手紙:\n${latestLetters}` }] }]);
    const items = parseJSON(raw);
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        // 重複チェック
        if (!S.omiyage.some(o => o.topic === item.topic)) {
          S.omiyage.push({
            id: crypto.randomUUID(),
            topic: item.topic,
            insight: item.insight,
            from: item.from || '手紙',
            at: Date.now(),
          });
        }
      });
      const prevLv = S.kouryuLv;
      S.kouryuLv = S.omiyage.length;
      await saveState();
      renderKnowledge();
      if (items.length > 0) {
        showToast(`💌 手紙からひらめき ${items.length}個 届いたぼ！`);
        checkKouryuUnlock(prevLv, S.kouryuLv);
      }
    }
  } catch(e) { console.warn('letter omiyage error', e); }
}

// ── Firebase強制リフレッシュ ──
async function forceRefresh() {
  showToast('🔄 最新データを読み込み中…');
  try {
    // Firebase SDKのキャッシュをバイパスして直接取得
    const db = getDB();
    const snap = await db.collection('manabo').doc(MANABO_ID).get({ source: 'server' });
    if (snap.exists) {
      const d = snap.data();
      S.level    = d.level    || S.level;
      S.xp       = d.xp       || S.xp;
      S.xpMax    = d.xpMax    || S.xpMax;
      S.monoCount = d.monoCount || S.monoCount;
      S.monoDate  = d.monoDate  || S.monoDate;
      S.knowledge = d.knowledge ? JSON.parse(d.knowledge).map(k => ({
        id: k.id || crypto.randomUUID(),
        subject: k.subject || '日常',
        topic: k.topic || '',
        summary: k.summary || '',
        misunderstanding: k.misunderstanding || '',
        createdAt: k.createdAt || Date.now(),
        secret: k.secret || false,
      })) : S.knowledge;
      S.gobi     = d.gobi    ? JSON.parse(d.gobi) : S.gobi;
      S.omiyage  = d.omiyage  ? JSON.parse(d.omiyage) : S.omiyage;
      S.kouryuLv = d.kouryuLv || S.kouryuLv;
      S.petName  = d.petName  || S.petName;
      S.persona  = d.persona  || S.persona;
      if (d.appearance) try { Object.assign(S.appearance, JSON.parse(d.appearance)); } catch(_) {}
    }
    updateHeader();
    renderKnowledge();
    applyAppearance();
    showToast('✓ 最新データに更新したぼ！');
    typeText('ぎゃぼー！さいしんじょうほうにしたぼ！');
  } catch(e) {
    showToast('⚠ 更新できなかったぼ…もう一度試してほしいぼ');
  }
}

// ── 交流レベル解放通知 ──
function checkKouryuUnlock(prevLv, newLv) {
  const unlocks = [
    { at: 3,  msg: '✨ ひらめき日記（初級）が解放されたぼ！日記タブから書けるぼ！' },
    { at: 10, msg: '🌟 ひらめき日記（中級）に進化したぼ！3教科をつなぐ発見が生まれるぼ！' },
    { at: 20, msg: '💫 ひらめき日記（上級）に進化したぼ！受験レベルのひらめきが書けるようになったぼ！' },
  ];
  unlocks.forEach(u => {
    if (prevLv < u.at && newLv >= u.at) {
      // レベルアップ画面を少し流用して表示
      setTimeout(() => {
        document.getElementById('lv-msg').textContent = u.msg;
        document.getElementById('lv-overlay').classList.add('show');
      }, 1500);
    }
  });
}
