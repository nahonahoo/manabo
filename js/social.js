// ==== まなぼみに / mini-app.js split: social.js ====
// このファイルは元の mini-app.js から機能ごとに分割したものです（挙動は変更していません）




// ── 相手のビジュアルをミニSVGで生成 ──
function buildMiniSVG(appearance, size=32) {
  const a = appearance || {};
  const bl = a.bodyLight  || '#ede0ff';
  const bd = a.bodyDark   || '#c5aaf0';
  const ec = a.eyeColor   || '#3a2e4a';
  const bc = a.blushColor || '#f9b8c8';
  const earShapes = {
    round:  { lrx:8, lry:10, rrx:8, rry:10, lr:-15, rr:15 },
    tall:   { lrx:6, lry:13, rrx:6, rry:13, lr:-10, rr:10 },
    small:  { lrx:5, lry:6,  rrx:5, rry:6,  lr:-20, rr:20 },
    cat:    { lrx:5, lry:9,  rrx:5, rry:9,  lr:-25, rr:25 },
  };
  const es = earShapes[a.earShape || 'round'];
  const accMap = {
    ribbon:`<polygon points="18,14 22,17 18,20" fill="#f97cb0"/><polygon points="26,14 22,17 26,20" fill="#f97cb0"/><circle cx="22" cy="17" r="2" fill="#fb9cc8"/>`,
    flower:`<circle cx="28" cy="12" r="4" fill="#ffe066"/><circle cx="28" cy="7" r="3" fill="#ff9ec8"/><circle cx="23" cy="12" r="3" fill="#ff9ec8"/><circle cx="33" cy="12" r="3" fill="#ff9ec8"/>`,
    butterfly:`<ellipse cx="22" cy="13" rx="5" ry="4" fill="#b388ff" opacity="0.85" transform="rotate(-20,22,13)"/><ellipse cx="32" cy="13" rx="5" ry="4" fill="#b388ff" opacity="0.85" transform="rotate(20,32,13)"/>`,
    crown:`<polygon points="18,18 20,11 24,16 28,8 32,16 36,11 38,18" fill="#ffd700" stroke="#e0a800" stroke-width="0.8"/>`,
    star:`<polygon points="28,7 29.5,12 35,12 30.5,15 32,20 28,17 24,20 25.5,15 21,12 26.5,12" fill="#ffe066" stroke="#f0b800" stroke-width="0.5"/>`,
    glasses:`<rect x="18" y="24" width="8" height="5" rx="2" fill="none" stroke="#7c5cbf" stroke-width="1.2"/><rect x="30" y="24" width="8" height="5" rx="2" fill="none" stroke="#7c5cbf" stroke-width="1.2"/><line x1="26" y1="26" x2="30" y2="26" stroke="#7c5cbf" stroke-width="1.2"/>`,
    glasses2:`<rect x="18" y="24" width="8" height="5" rx="1" fill="none" stroke="#3a2e4a" stroke-width="1.2"/><rect x="30" y="24" width="8" height="5" rx="1" fill="none" stroke="#3a2e4a" stroke-width="1.2"/><line x1="26" y1="26" x2="30" y2="26" stroke="#3a2e4a" stroke-width="1.2"/>`,
    sunglass1:`<rect x="18" y="24" width="9" height="5" rx="3" fill="#1a1a2e" opacity="0.9"/><rect x="29" y="24" width="9" height="5" rx="3" fill="#1a1a2e" opacity="0.9"/><line x1="27" y1="26" x2="29" y2="26" stroke="#555" stroke-width="1.2"/>`,
    sunglass2:`<ellipse cx="22" cy="26" rx="5" ry="4" fill="#ff4d6d" opacity="0.88"/><ellipse cx="34" cy="26" rx="5" ry="4" fill="#ff4d6d" opacity="0.88"/><line x1="27" y1="26" x2="29" y2="26" stroke="#ff4d6d" stroke-width="1.2"/>`,
    sunglass3:`<rect x="18" y="24" width="9" height="5" rx="3" fill="#4fc3f7" opacity="0.85"/><rect x="29" y="24" width="9" height="5" rx="3" fill="#4fc3f7" opacity="0.85"/><line x1="27" y1="26" x2="29" y2="26" stroke="#29b6f6" stroke-width="1.2"/>`,
    hat:`<ellipse cx="28" cy="16" rx="12" ry="2.5" fill="#2d2040"/><rect x="22" y="7" width="12" height="10" rx="2" fill="#2d2040"/>`,
    afro:`<circle cx="28" cy="10" r="12" fill="#3d2b1f"/><circle cx="18" cy="14" r="5" fill="#3d2b1f"/><circle cx="38" cy="14" r="5" fill="#3d2b1f"/>`,
  };
  const accSVG = accMap[a.accessory] || '';
  const tailSVG = (a.tailShape === 'verylong')
    ? `<path d="M42,36 Q50,42 52,52" stroke="${bd}" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="44" cy="38" rx="4" ry="3" fill="${bd}" opacity="0.8" transform="rotate(25,44,38)"/>`;
  return `<svg viewBox="0 0 56 56" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="mg_m${size}" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="${bl}"/><stop offset="100%" stop-color="${bd}"/>
    </radialGradient></defs>
    ${tailSVG}
    <ellipse cx="28" cy="32" rx="18" ry="17" fill="url(#mg_m${size})"/>
    <ellipse cx="${14+es.lrx/2}" cy="20" rx="${es.lrx}" ry="${es.lry}" fill="${bd}" transform="rotate(${es.lr},${14+es.lrx/2},20)"/>
    <ellipse cx="${42-es.rrx/2}" cy="20" rx="${es.rrx}" ry="${es.rry}" fill="${bd}" transform="rotate(${es.rr},${42-es.rrx/2},20)"/>
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

// ── 連携機能（まなぼみに↔まなぼ） ──
const PARTNER_ID = 'shared';      // まなぼみにから見た相手
const MY_ID = 'mini-shared';

async function fsWritePartner(docId, data) {
  const fields = {};
  for (const [k,v] of Object.entries(data)) {
    if (typeof v === 'string') fields[k] = { stringValue: v };
    else if (typeof v === 'number') fields[k] = { integerValue: String(v) };
    else if (typeof v === 'boolean') fields[k] = { booleanValue: v };
  }
  const fieldMask = Object.keys(data).map(k => `updateMask.fieldPaths=${k}`).join('&');
  await fetch(
    `https://firestore.googleapis.com/v1/projects/manabo-nhnh/databases/(default)/documents/manabo/${docId}?${fieldMask}`,
    { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({fields}) }
  );
}

async function fsReadPartner(docId) {
  try {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/manabo-nhnh/databases/(default)/documents/manabo/${docId}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.fields) return null;
    const obj = {};
    for (const [k,v] of Object.entries(data.fields)) {
      if ('stringValue' in v) obj[k] = v.stringValue;
      else if ('integerValue' in v) obj[k] = Number(v.integerValue);
      else if ('booleanValue' in v) obj[k] = v.booleanValue;
    }
    return obj;
  } catch(e) { return null; }
}

// ── お手紙 ──
async function sendLetter(toId, fromName, text) {
  const d = await fsReadPartner(toId) || {};
  const letters = d.letters ? JSON.parse(d.letters) : [];
  letters.push({ from: fromName, text, at: Date.now() });
  if (letters.length > 10) letters.splice(0, letters.length - 10);
  await fsWritePartner(toId, { letters: JSON.stringify(letters) });
}

async function openLetterModal() {
  document.getElementById('letter-modal').style.display = 'flex';
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
    if (letters.length === 0) { el.textContent = 'まだお手紙ないよ〜'; return; }
    el.innerHTML = letters.slice().reverse().map(l => `
      <div style="background:#fff0e0;border-radius:10px;padding:9px 12px;margin-bottom:6px">
        <div style="font-size:10px;color:#c08040;margin-bottom:4px">${l.from} より・${new Date(l.at).toLocaleDateString('ja-JP')}</div>
        <div style="font-size:.88rem;color:#2d2040;line-height:1.6">${esc(l.text)}</div>
      </div>`).join('');
    await generateOmiyageFromLetter(letters.slice(-3));
  } catch(e) { el.textContent = 'よめなかったよ…'; }
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
    typeText('てがみおくったよ！えへへ！');
    bounce(); showHappy(true);
    await generateOmiyageFromLetter([{ from: S.petName, text: sentText }]);
  } catch(e) { alert('おくれなかった…もう一回！'); }
  document.getElementById('letter-send-btn').disabled = false;
}

// ── 合同日記・合同小説 ──
async function generateJointDiary(type) {
  const out = document.getElementById('diary-out');
  out.textContent = 'かいてる…';
  document.getElementById('diary-meta').style.display = 'none';
  bounce();

  const myTopics = S.knowledge.slice().sort(() => Math.random()-.5).slice(0,4)
    .map(k => `[${k.subject}]${k.topic}：${k.summary}`).join('\n');

  let partnerTopics = '';
  try {
    const d = await fsReadPartner(PARTNER_ID);
    if (d?.knowledge) {
      const pk = JSON.parse(d.knowledge).slice().sort(() => Math.random()-.5).slice(0,4);
      partnerTopics = pk.map(k => `[${k.subject}]${k.topic}：${k.summary}`).join('\n');
    }
  } catch(e) {}

  const sys = type === '合同日記'
    ? `ペット「まなぼ」と「まなぼみに」の2匹が一緒に書いた共同日記。まなぼはユーモアがありツッコミ役のせんぱい的な存在（性別なし・妖精みたいなキャラ）。まなぼみには生意気で鋭くてアホな面もある愉快なキャラ。語尾ルール：まなぼは「〜だぼ」「ぎゃぼー」、まなぼみには「〜だよ！」「えへへ」「わあ！」。300字以内。プレーンテキストのみ。`
    : `ペット「まなぼ」と「まなぼみに」の2匹が一緒に作った短編小説。まなぼはユーモアたっぷりのツッコミ役せんぱい（性別なし・妖精みたいなキャラ）、まなぼみには生意気な主人公。2匹の知識がカオスにまざる。400字以内。プレーンテキストのみ。`;

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `まなぼみにの知識:\n${myTopics||'なし'}\n\nまなぼの知識:\n${partnerTopics||'なし'}` }] }]);
    out.textContent = raw.trim();
    const meta = document.getElementById('diary-meta');
    meta.textContent = `まなぼ×まなぼみに の${type}・${new Date().toLocaleDateString('ja-JP')}`;
    meta.style.display = '';
    bounce(); showHappy(true);
    typeText('いっしょにかいたよ！えへへ！');
  } catch(e) { out.textContent = 'かけなかった…ごめんね'; }
}

// ── まなぼを招待 ──
let manaboInChat = false;

// 招待セッション中の発言を発言者付きで記録する共有ログ。
// まなぼみに（ホスト）・まなぼ（ゲスト）どちらのプロンプトからも参照し、
// 「誰が何を言ったか」を見失わないようにする。
let sceneLog = [];
function pushScene(who, name, text) {
  sceneLog.push({ who, name, text });
  if (sceneLog.length > 14) sceneLog = sceneLog.slice(-14);
}
function sceneTranscript() {
  return sceneLog.map(s => `${s.name}：${s.text}`).join('\n');
}
function resetScene() { sceneLog = []; }

async function inviteManabo() {
  if (manaboInChat) return;
  manaboInChat = true;
  document.getElementById('invite-manabo-btn').style.display = 'none';
  document.getElementById('bye-manabo-btn').style.display = '';

  // まなぼのpetName・persona・level・knowledgeをFirebaseから取得
  let manaboName = 'まなぼ';
  let manaboPersona = '';
  let manaboKnowledge = [];
  let manaboLevel = 1;
  try {
    const FB_URL_M = `https://firestore.googleapis.com/v1/projects/manabo-nhnh/databases/(default)/documents/manabo/${PARTNER_ID}`;
    const res = await fetch(FB_URL_M);
    if (res.ok) {
      const data = await res.json();
      const fields = data.fields || {};
      if (fields.petName?.stringValue) manaboName = fields.petName.stringValue;
      if (fields.persona?.stringValue) manaboPersona = fields.persona.stringValue;
      if (fields.level?.integerValue) manaboLevel = Number(fields.level.integerValue);
      if (fields.knowledge?.stringValue) {
        try { manaboKnowledge = JSON.parse(fields.knowledge.stringValue); } catch(_) {}
      }
    }
  } catch(e) {
    try {
      const d = await fsReadPartner(PARTNER_ID);
      if (d) {
        manaboName = d.petName || 'まなぼ';
        manaboPersona = d.persona || '';
        manaboLevel = d.level || 1;
        if (d.knowledge) try { manaboKnowledge = JSON.parse(d.knowledge); } catch(_) {}
      }
    } catch(e2) {}
  }

  // せんぱい力レベル（知識量とLvに応じて）
  const senpaiScore = manaboLevel + Math.floor(manaboKnowledge.length / 3);
  const senpaiLv = senpaiScore >= 15 ? 4 : senpaiScore >= 8 ? 3 : senpaiScore >= 4 ? 2 : 1;
  const senpaiDesc = [
    '',
    // Lv1：まだ不慣れ。自分のことしか話せない
    `まだ${S.petName}への接し方に慣れていない。自分のことしか話せず「えーわかんないぼ」「それむずかしいぼ」と言うことが多い。${S.petName}の話についていけないこともある。`,
    // Lv2：少し慣れてきた
    `${S.petName}に合わせようと頑張っている。「それはね…たぶん〜だぼ」と教えようとする。たまに間違えるが一生懸命。`,
    // Lv3：せんぱいらしくなってきた
    `${S.petName}の好奇心にうまく応えられる。難しいことをかんたんな言葉に言い換えてあげられる。「そういえば〜だぼ」と話を広げるのが上手。`,
    // Lv4：頼れるせんぱい
    `${S.petName}の質問に的確に答えられる。「すごいじゃん！それって〜ってことだぼ！」と褒め上手で話を深めてあげられる。頼れるせんぱい。`,
  ][senpaiLv];

  // まなぼのキャラでチャットに登場
  const sys = `あなたはペット「${manaboName}」。ユーモアがあってお笑い芸人みたいに面白いせんぱい的な存在。性別なし・妖精みたいなキャラ。
${manaboPersona ? `【${manaboName}の性格メモ：${manaboPersona}】` : ''}
【せんぱい力レベル${senpaiLv}】${senpaiDesc}
今「${S.petName}」の部屋にお客さんとして遊びに来ている。
「${S.petName}」（幼稚園〜小学生・生意気・好奇心旺盛・アホかわいい）とユーザーの両方に積極的に話しかける。
質問したり、冗談を言ったり、「${S.petName}」の言ったことに反応したり、一緒に楽しく遊ぶ。
中学生レベルの知識をそのまま話すのではなく、「${S.petName}」が喜ぶ・わかりやすい言葉で接する。
語尾は「〜だぼ」「ぎゃぼー」「わぼ」など。返答40字以内。ひらがなメイン。`;

  // まなぼのappearanceをFirestore REST APIで直接取得
  let manaboAppearance = null;
  try {
    const FB_URL = `https://firestore.googleapis.com/v1/projects/manabo-nhnh/databases/(default)/documents/manabo/${PARTNER_ID}`;
    const res = await fetch(FB_URL);
    if (res.ok) {
      const data = await res.json();
      const fields = data.fields || {};
      if (fields.appearance?.stringValue) {
        manaboAppearance = JSON.parse(fields.appearance.stringValue);
      }
      if (fields.petName?.stringValue) manaboName = fields.petName.stringValue;
    }
  } catch(e) {
    try {
      const db = getDB();
      const snap = await db.collection('manabo').doc(PARTNER_ID).get({ source: 'server' });
      if (snap.exists) {
        const latest = snap.data();
        if (latest.appearance) {
          try { manaboAppearance = JSON.parse(latest.appearance); } catch(_) {}
        }
        if (latest.petName) manaboName = latest.petName;
      }
    } catch(e2) {}
  }
  const manaboSVG = buildMiniSVG(manaboAppearance, 28);
  resetScene();

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `${manaboName}が${S.petName}の部屋に遊びに来た。登場の一言を言って。` }] }]);
    addChatMsgWithSVG(manaboSVG, raw.trim(), '#ede0ff', '#c5aaf0');
    typeText(`わあ！${manaboName}がきた！えへへ！`);
    pushScene('guest', manaboName, raw.trim());
  } catch(e) {
    const fallback = 'ぎゃぼー！元気だぼ？';
    addChatMsgWithSVG(manaboSVG, fallback, '#ede0ff', '#c5aaf0');
    typeText('わあ！まなぼがきた！えへへ！');
    pushScene('guest', manaboName, fallback);
  }
  bounce(); showHappy(true);

  window._manaboName = manaboName;
  window._manaboKnowledge = manaboKnowledge;
  window._manaboSenpaiLv = senpaiLv;
  window._manaboSenpaiDesc = senpaiDesc;
  window._manaboPersona = manaboPersona;
  window._manaboSVG = manaboSVG;
  S.partnerName = manaboName;
}

async function byeManabo() {
  if (!manaboInChat) return;
  manaboInChat = false;
  document.getElementById('invite-manabo-btn').style.display = '';
  document.getElementById('bye-manabo-btn').style.display = 'none';
  const manaboName = window._manaboName || 'まなぼ';
  const manaboSVG = window._manaboSVG || buildMiniSVG(null, 28);
  const farewell = 'じゃあまたね〜だぼ！みにちゃん元気でね！（去り際にツッコむ）';
  addChatMsgWithSVG(manaboSVG, farewell, '#ede0ff', '#c5aaf0');
  typeText('まなぼかえっちゃった…またきてね！えへへ');
  pushScene('guest', manaboName, farewell);
  await generateOmiyage(manaboName);
  resetScene();
}

async function generateOmiyage(partnerName) {
  const recentChat = sceneTranscript();
  if (!recentChat.trim()) return;

  const sys = `会話ログから「ふたつのペットが一緒に話して生まれた気づき・発見・面白い視点」を1〜3個抽出してください。
JSON形式のみ:
[{"topic":"（発見の短いタイトル）","insight":"（どんなひらめきか1文、子どもでも分かる言葉で）","from":"${partnerName}"}]
何もなければ空配列 [] を返す。`;

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
      showToast(`🎁 おみやげ！${items.length}こ とどいたよ！`);
      typeText(`わあ！まなぼとはなしてひらめいたよ！えへへ！`);
      checkKouryuUnlock(prevLv, S.kouryuLv);
    }
  } catch(e) { console.warn('omiyage error', e); }
}

function addChatMsgWithIcon(role, icon, text) {
  const c = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg manabo';
  div.innerHTML = `
    <div style="width:28px;height:28px;border-radius:50%;background:#ede0ff;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${icon}</div>
    <div class="msg-bub" style="background:#ede0ff;border-color:#c5aaf0">${esc(text)}</div>
    <div class="msg-time">${nowTime()}</div>`;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

// ── お手紙からおみやげ知識を生成 ──
async function generateOmiyageFromLetter(letters) {
  if (!letters || letters.length === 0) return;
  const latestLetters = letters.slice(-3).map(l => `${l.from}：${l.text}`).join('\n');
  const sys = `お手紙の内容から「気づき・発見・ひらめき」を0〜2個抽出してください。
JSON形式のみ:
[{"topic":"（気づきの短いタイトル）","insight":"（どんな気づきか1文、ひらがなメイン）","from":"手紙"}]
何もなければ空配列 [] を返す。`;
  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `お手紙:\n${latestLetters}` }] }]);
    const items = parseJSON(raw);
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        if (!S.omiyage.some(o => o.topic === item.topic)) {
          S.omiyage.push({ id: crypto.randomUUID(), topic: item.topic, insight: item.insight, from: item.from || '手紙', at: Date.now() });
        }
      });
      const prevLv = S.kouryuLv;
      S.kouryuLv = S.omiyage.length;
      await saveState();
      renderKnowledge();
      if (items.length > 0) {
        showToast(`💌 てがみからひらめき ${items.length}こ とどいたよ！`);
        checkKouryuUnlock(prevLv, S.kouryuLv);
      }
    }
  } catch(e) { console.warn('letter omiyage error', e); }
}

// ── Firebase強制リフレッシュ ──
async function forceRefresh() {
  showToast('🔄 さいしんデータをよみこんでるよ…');
  try {
    const db = getDB();
    const snap = await db.collection('manabo').doc(MANABO_ID).get({ source: 'server' });
    if (snap.exists) {
      const d = snap.data();
      S.level    = d.level    || S.level;
      S.xp       = d.xp       || S.xp;
      S.xpMax    = d.xpMax    || S.xpMax;
      S.knowledge = d.knowledge ? JSON.parse(d.knowledge).map(k => ({
        id: k.id || crypto.randomUUID(), subject: k.subject || 'にちじょう',
        topic: k.topic || '', summary: k.summary || '',
        misunderstanding: k.misunderstanding || '',
        createdAt: k.createdAt || Date.now(), secret: k.secret || false,
      })) : S.knowledge;
      S.gobi     = d.gobi    ? JSON.parse(d.gobi) : S.gobi;
      S.omiyage  = d.omiyage  ? JSON.parse(d.omiyage) : S.omiyage;
      S.kouryuLv = d.kouryuLv || S.kouryuLv;
      S.petName  = d.petName  || S.petName;
      S.persona  = d.persona  || S.persona;
      if (d.appearance) {
        try {
          const ap = JSON.parse(d.appearance);
          // まなぼ（紫）の色が入っていたらまなぼみに（オレンジ）にリセット
          const isManaboColor = ap.bodyLight === '#ede0ff' || ap.bodyDark === '#c5aaf0';
          if (!isManaboColor) {
            Object.assign(S.appearance, ap);
          } else {
            // オレンジにリセットしてFirebaseに保存
            S.appearance = { bodyLight:'#fff0e0', bodyDark:'#ffb870', eyeColor:'#6a3a2a', blushColor:'#ffb8a0', earShape:'round', accessory:'star', tailShape:'normal' };
          }
        } catch(_) {}
      }
    }
    updateHeader();
    renderKnowledge();
    applyAppearance();
    showToast('✓ さいしんにしたよ！えへへ！');
    typeText('わあ！あたらしくなったよ！えへへ！');
  } catch(e) {
    showToast('⚠ よみこめなかった…もう一かいおしてね！');
  }
}

// ── 交流レベル解放通知 ──
function checkKouryuUnlock(prevLv, newLv) {
  const unlocks = [
    { at: 3,  msg: '✨ ひらめきにっき（しょきゅう）がかけるようになったよ！にっきタブからかけるよ！' },
    { at: 10, msg: '🌟 ひらめきにっき（ちゅうきゅう）になったよ！もっとすごいひらめきがかけるよ！' },
    { at: 20, msg: '💫 ひらめきにっき（じょうきゅう）になったよ！さいきょうのひらめきがかけるよ！' },
  ];
  unlocks.forEach(u => {
    if (prevLv < u.at && newLv >= u.at) {
      setTimeout(() => {
        document.getElementById('lv-msg').textContent = u.msg;
        document.getElementById('lv-overlay').classList.add('show');
      }, 1500);
    }
  });
}