// ==== manabo / app.js split: state.js ====
// このファイルは元の app.js から機能ごとに分割したものです（挙動は変更していません）

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
  coins: 0,                // 所持金（まなぼ円）
  shopItems: [],           // ショップ出品中アイテム（最大10個）
  inventory: [],           // アイテムボックス
  craftCount: 0,           // 今日の発明回数
  craftDate: '',           // 発明回数リセット日
  saleHistory: [],         // 売れたアイテムの記録（新しい順）
  collection: [],          // パートナーから買ったコレクション（再出品不可・新しい順）
  collectionSeenCount: 0,  // コレクションを最後に開いたときの件数（未読バッジ用）
  letters: [],             // 受け取ったお手紙（最新10件）
  trainProgress: { visitedStations: [], riddenLines: [], riddenVehicles: [], toursDone: [] }, // でんしゃのたび進捗（自分専用・外部から書き換えられない）
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

// coins/shopItems/inventory/craftCount/craftDate/saleHistory/collection/lettersは
// 「まなぼみに」やショップなど外部から書き換えられるため、saveState()の丸ごと保存には含めない。
// 変更した操作だけがsaveShared()で狙って保存する
// （そうしないと、古いメモリのまま別の保存が走った時に外部の変更を消してしまう）
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
      trainProgress: JSON.stringify(S.trainProgress),
    }, { merge: true });
    // 保存成功後にヘッダーだけ更新（重複を避けるため最小限）
    updateHeader();
  } catch(e) {
    console.warn('Firestore save error:', e);
    try {
      localStorage.setItem('manabo_backup', JSON.stringify({
        level: S.level, xp: S.xp, xpMax: S.xpMax, knowledge: S.knowledge
      }));
    } catch(_) {}
  }
}

// coins/shopItems/inventory/craftCount/craftDate/saleHistory/collection/letters専用の部分保存。
// 渡したフィールドだけをマージ書き込みする（他のフィールドは一切触らない）
async function saveShared(fields) {
  try {
    const db = getDB();
    await db.collection('manabo').doc(MANABO_ID).set(fields, { merge: true });
    updateHeader();
  } catch(e) {
    console.warn('Firestore save error (shared):', e);
  }
}

async function loadState() {
  S.apiKey = loadApiKeyLocal();
  try {
    const db = getDB();
    // 常にサーバーから直接取得（キャッシュバイパス）
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
      S.petName   = d.petName   || 'まなぼ';
      S.persona   = d.persona   || '';
      S.coins     = d.coins     || 0;
      S.shopItems = d.shopItems  ? JSON.parse(d.shopItems)  : [];
      S.inventory = d.inventory  ? JSON.parse(d.inventory)  : [];
      S.craftCount = d.craftCount || 0;
      S.craftDate  = d.craftDate  || '';
      S.saleHistory = d.saleHistory ? JSON.parse(d.saleHistory) : [];
      S.collection = d.collection ? JSON.parse(d.collection) : [];
      S.collectionSeenCount = d.collectionSeenCount || 0;
      S.letters = d.letters ? JSON.parse(d.letters) : [];
      S.trainProgress = d.trainProgress ? JSON.parse(d.trainProgress) : { visitedStations: [], riddenLines: [], riddenVehicles: [], toursDone: [] };
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