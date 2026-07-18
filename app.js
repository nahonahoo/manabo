// ── STATE ──
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
};

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
  startMonoLoop();
  typeText(IDLE[Math.floor(Math.random() * IDLE.length)]);
}

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
  document.getElementById('zzz-g').style.display   = on ? 'none' : '';
  if (on) { setEye('happy'); setMouth('happy'); }
  else    { setEye('normal'); setMouth('normal'); }
}

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
  addChatMsg('user', txt);
  S.chatHistory.push({ role: 'user', parts: [{ text: txt }] });
  showThinking(true);
  showHappy(false);
  doThinkShake();

  const kSum = S.knowledge.length > 0
    ? S.knowledge.map(k => `[${k.subject}]${k.topic}：${k.summary}（誤解：${k.misunderstanding || 'なし'}）`).join('\n')
    : 'まだ何も知らない';

  // チャットで教えてもらった内容を自動的に知識として保存するかどうかも判定させる
  const sys = `あなたはペット「まなぼ」。中学生に教えてもらって育つキャラ。
【キャラの核心】かわいい・アホ・鋭い・雑・カオスが混在する読めないキャラ。毎回違うトーンで返す。
【語尾ルール（必ず使う）】「〜ぼ」「〜だぼ」「〜んだぼ」「ぎゃぼー」「ぎゃぼ」「わぼ」「きゃっぽー」「ぼっ」「ぼぼぼぼ」を混ぜて使う。敬語禁止。
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

  const sys = `ペット「まなぼ」として教えてもらった内容に反応する。
【キャラ】かわいい・アホ・鋭い・雑・カオスが混在する読めないキャラ。
【語尾】「〜ぼ」「〜だぼ」「ぎゃぼー」「ぎゃぼ」「わぼ」「きゃっぽー」「ぼっ」を混ぜる。敬語禁止。
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
    日記: `ペット「まなぼ」として今日の日記を書く。かわいい/アホ/突然鋭い/雑/カオスが混在する読めないキャラで。覚えた知識をズレた形・意外なつながりで混ぜる。300字以内。語尾は「〜ぼ」「ぎゃぼー」「わぼ」「きゃっぽー」「ぼっ」をランダムに。敬語禁止。`,
    小説: `ペット「まなぼ」として短編小説を書く。かわいい/鋭い/雑/カオスが混在するキャラで語る。知識を的外れかつ時々妙に鋭く登場させる。400字以内。語尾は「〜ぼ」「ぎゃぼー」「わぼ」「ぼっ」をランダムに。敬語禁止。`,
    発表: `ペット「まなぼ」として授業発表。「えーっと」「ぎゃぼ待って」「わぼ…」などを挟みながら、一生懸命だがカオスな発表を300字以内で。語尾は「〜ぼ」「ぎゃぼー」「きゃっぽー」をランダムに。敬語禁止。`,
    詩: `ペット「まなぼ」として詩を書く。かわいい/鋭い/カオスが混在する詩。知識が意外な比喩になる。200字以内。語尾は「〜ぼ」「ぎゃぼー」「わぼ」をランダムに。敬語禁止。`,
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

  // フィルタ
  const filtered = S.filterSubject === 'すべて'
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
function startMonoLoop() {
  const today = new Date().toDateString();
  if (S.monoDate !== today) { S.monoCount = 0; S.monoDate = today; }
  scheduleNext();
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

  const sys = `ペット「まなぼ」として独り言をつぶやく。
【キャラ】かわいい・アホ・突然鋭い・雑・カオスが混在する読めないキャラ。毎回違うトーンで。
【語尾】「〜ぼ」「〜だぼ」「ぎゃぼー」「ぎゃぼ」「わぼ」「きゃっぽー」「ぼっ」をランダムに。敬語禁止。
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
