// ==== まなぼみに / mini-app.js split: state.js ====
// このファイルは元の mini-app.js から機能ごとに分割したものです（挙動は変更していません）

// ── STATE ──
const DEFAULT_GOBI = ['〜だよ','〜だね','〜なの！','えへへ','わあ！','やったー！','ねえねえ','うわあ！','〜だもん'];

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
  petName: 'まなぼみに',    // ペットの名前
  persona: '',             // 性格メモ
  coins: 0,
  shopItems: [],
  inventory: [],
  craftCount: 0,
  craftDate: '',
  omiyage: [],             // おみやげ知識
  kouryuLv: 0,             // 交流レベル
  partnerName: 'まなぼ',   // 相手の名前
  appearance: {            // 見た目設定
    bodyLight:  '#fff0e0',
    bodyDark:   '#ffb870',
    eyeColor:   '#6a3a2a',
    blushColor: '#ffb8a0',
    earShape:   'round',
    accessory:  'star',
    tailShape:  'normal',
  },
};

// 語尾リストをプロンプト用文字列に変換
function gobiStr() {
  return S.gobi.map(g => `「${g}」`).join('');
}

const IDLE = [
  'ねえねえ、あそぼ！',
  'なんかおしえてほしいな〜！',
  'えへへ、きょうもいい天気だね！',
  'わあ！しっぽがある！（自分のしっぽを発見した顔）',
  'ねえねえ、すきなたべものなあに？',
  'うわあ！なんかキラキラしてる！',
  'なんかたのしいことないかなあ',
  'ねえ、なんで空ってあおいの？',
  'えへへ…なにかおしえて！',
  'ねえ、いちばんすきなどうぶつってなあに？',
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
const MANABO_ID = 'mini-shared';

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
      coins:      S.coins,
      shopItems:  JSON.stringify(S.shopItems),
      inventory:  JSON.stringify(S.inventory),
      craftCount: S.craftCount,
      craftDate:  S.craftDate,
      appearance: JSON.stringify(S.appearance),
    });
    // 保存後に即UI更新
    updateHeader();
    renderKnowledge();
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
    const snap = await db.collection('manabo').doc(MANABO_ID).get({ source: 'server' });
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