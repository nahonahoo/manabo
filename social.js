// ==== manabo / app.js split: social.js ====
// このファイルは元の app.js から機能ごとに分割したものです（挙動は変更していません）




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

// ── 連携機能（まなぼ↔まなぼみに） ──
// Firebase REST APIで相手のドキュメントを読み書き
const PARTNER_ID = 'mini-shared'; // まなぼから見た相手
const MY_ID = 'shared';

async function fsWritePartner(docId, data) {
  // REST APIでフィールドだけPATCH更新（他フィールドを上書きしない）
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
  // REST APIで常に最新を取得
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

// 招待セッション中の発言を発言者付きで記録する共有ログ。
// まなぼ（ホスト）・まなぼみに（ゲスト）どちらのプロンプトからも参照し、
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

async function inviteMini() {
  if (miniInChat) return;
  miniInChat = true;
  document.getElementById('invite-mini-btn').style.display = 'none';
  document.getElementById('bye-mini-btn').style.display = '';

  // まなぼみにのpetName・persona・knowledgeをFirebaseから取得
  let miniName = 'まなぼみに';
  let miniPersona = '';
  let miniKnowledge = [];
  try {
    const FB_URL_D = `https://firestore.googleapis.com/v1/projects/manabo-nhnh/databases/(default)/documents/manabo/${PARTNER_ID}`;
    const res = await fetch(FB_URL_D);
    if (res.ok) {
      const data = await res.json();
      const fields = data.fields || {};
      if (fields.petName?.stringValue) miniName = fields.petName.stringValue;
      if (fields.persona?.stringValue) miniPersona = fields.persona.stringValue;
      if (fields.knowledge?.stringValue) {
        try {
          miniKnowledge = JSON.parse(fields.knowledge.stringValue);
        } catch(_) {}
      }
    }
  } catch(e) {
    try {
      const d = await fsReadPartner(PARTNER_ID);
      if (d) {
        miniName = d.petName || 'まなぼみに';
        miniPersona = d.persona || '';
        if (d.knowledge) try { miniKnowledge = JSON.parse(d.knowledge); } catch(_) {}
      }
    } catch(e2) {}
  }

  // 教科バランスよく最大8件選ぶ
  const miniKnowTotal = miniKnowledge.length;
  let miniKnowPicks = [];
  if (miniKnowTotal > 0) {
    const bySubject = {};
    miniKnowledge.forEach(k => {
      const s = k.subject || 'にちじょう';
      if (!bySubject[s]) bySubject[s] = [];
      bySubject[s].push(k);
    });
    const subjects = Object.keys(bySubject);
    let si = 0;
    while (miniKnowPicks.length < 8 && miniKnowPicks.length < miniKnowTotal) {
      const s = subjects[si % subjects.length];
      const pool = bySubject[s];
      if (pool.length > 0) miniKnowPicks.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
      si++;
    }
  }
  // 知識量に応じた成長レベル
  const miniLv = miniKnowTotal>=31?4:miniKnowTotal>=16?3:miniKnowTotal>=6?2:1;
  const miniLvDesc = ['','ひらがなメイン・シンプルな反応。','難しい言葉も少し混じる・知識を披露したがる。','鋭い質問が増える・覚えた言葉を得意げに使う。','語彙が豊か・知識をひけらかしたがる。'][miniLv];
  const miniKnowStr = miniKnowPicks.length > 0
    ? '【' + miniName + 'の知識（全' + miniKnowTotal + '件）】' + miniKnowPicks.map(k => ' /' + k.topic + ':' + k.summary).join('')
    : '';

  // まなぼみにのキャラでチャットに登場
  const sys = `あなたはペット「${miniName}」。幼稚園〜小学1年生くらいの生意気で鋭くて好奇心旺盛なキャラ。
知識をどんどん増やしたくて鋭い質問をしてしまう。でもアホで破天荒な面白いことも言う愉快なキャラ。
${miniPersona ? `【${miniName}の性格メモ：${miniPersona}】` : ''}
【成長レベル（知識${miniKnowTotal}件）】${miniLvDesc}
${miniKnowStr}
今まなぼせんぱい（性別なし・妖精みたいなキャラ）の部屋に遊びに来た。
覚えた知識を自分から話題にしたり得意げに披露したりする。でも間違えたり的外れなこともある。
語尾は「〜だよ！」「えへへ」「わあ！」「〜だもん」など。返答50字以内。ひらがなメイン。`;

  // まなぼみにのappearance・petNameをFirestore REST APIで直接取得
  let miniAppearance = null;
  try {
    const FB_URL = `https://firestore.googleapis.com/v1/projects/manabo-nhnh/databases/(default)/documents/manabo/${PARTNER_ID}`;
    const res = await fetch(FB_URL);
    if (res.ok) {
      const data = await res.json();
      const fields = data.fields || {};
      // REST APIのstringValue形式で取得
      if (fields.appearance?.stringValue) {
        miniAppearance = JSON.parse(fields.appearance.stringValue);
      }
      if (fields.petName?.stringValue) miniName = fields.petName.stringValue;
    }
  } catch(e) {
    // フォールバック：SDKで試みる
    try {
      const db = getDB();
      const snap = await db.collection('manabo').doc(PARTNER_ID).get({ source: 'server' });
      if (snap.exists) {
        const latest = snap.data();
        if (latest.appearance) {
          try { miniAppearance = JSON.parse(latest.appearance); } catch(_) {}
        }
        if (latest.petName) miniName = latest.petName;
      }
    } catch(e2) {}
  }
  const miniSVG = buildMiniSVG(miniAppearance, 28);
  resetScene();

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `${miniName}がまなぼの部屋に遊びに来た。登場の一言を言って。` }] }]);
    addChatMsgWithSVG(miniSVG, raw.trim(), '#fff0e0', '#ffcc90');
    typeText(`ぎゃぼー！${miniName}がきたぼ！`);
    pushScene('guest', miniName, raw.trim());
  } catch(e) {
    const fallback = 'わあ！まなぼのおうちだ！えへへ、おじゃましまーす！ていうかここなんなの！？';
    addChatMsgWithSVG(miniSVG, fallback, '#fff0e0', '#ffcc90');
    typeText('ぎゃぼー！みにちゃんがきたぼ！');
    pushScene('guest', miniName, fallback);
  }
  bounce(); showHappy(true);

  window._miniName = miniName;
  window._miniPersona = miniPersona;
  window._miniKnowledge = miniKnowledge;
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
  const farewell = 'またね！ばいばーい！えへへ！（走って消える）';
  addChatMsgWithSVG(miniSVG, farewell, '#fff0e0', '#ffcc90');
  typeText('みにちゃんかえったぼ…さみしいぼ');
  pushScene('guest', miniName, farewell);
  // セッション中の会話からおみやげ知識を生成（シーンログが消える前に）
  await generateOmiyage(miniName);
  resetScene();
}

async function generateOmiyage(partnerName) {
  const recentChat = sceneTranscript();
  if (!recentChat.trim()) return;

  // まなぼ側のおみやげ知識
  const sysManaboOmiyage = `会話ログから「ふたつのペットが一緒に話して生まれた気づき・発見・面白い視点」を1〜3個抽出してください。
受験勉強の知識ではなく、会話から生まれた新しい見方・つながり・ひらめきを抽出します。
JSON形式のみ（コードブロック不要）:
[{"topic":"（発見・気づきの短いタイトル）","insight":"（どんなひらめきか1文）","from":"${partnerName}"}]
会話から何も抽出できない場合は空配列 [] を返す。`;

  // まなぼみに側に持ち帰る知識（幼児向け・ひらがなメイン）
  const sysMiniLearn = `会話ログから「${partnerName}（幼稚園〜小1）が覚えて持ち帰れる新しい発見や気づき」を1〜2個抽出してください。
難しい知識ではなく、子供が「へえ！」と思える小さな発見。ひらがなメインで短く。
JSON形式のみ（コードブロック不要）:
[{"topic":"（発見のタイトル・ひらがなメイン・10字以内）","insight":"（どんな発見か1文・ひらがなメイン・30字以内）","question":"（${partnerName}がまだ悩んでいること・ひらがなで1文。なければ空文字）"}]
何もなければ空配列 [] を返す。`;

  try {
    // 並行して両方取得
    const [raw1, raw2] = await Promise.all([
      callGemini(sysManaboOmiyage, [{ role:'user', parts:[{ text: `会話ログ:\n${recentChat}` }] }]),
      callGemini(sysMiniLearn,     [{ role:'user', parts:[{ text: `会話ログ:\n${recentChat}` }] }]),
    ]);

    // ── まなぼ側おみやげ ──
    const items = parseJSON(raw1);
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        S.omiyage.push({ id: crypto.randomUUID(), topic: item.topic, insight: item.insight, from: item.from || partnerName, at: Date.now() });
      });
      const prevLv = S.kouryuLv;
      S.kouryuLv = S.omiyage.length;
      await saveState();
      renderKnowledge();
      showToast(`🎁 おみやげ知識が ${items.length}個 届いたぼ！`);
      typeText(`ぎゃぼー！みにちゃんとはなしてひらめいたぼ！`);
      checkKouryuUnlock(prevLv, S.kouryuLv);
    }

    // ── まなぼみに側に持ち帰る知識をFirebaseに書き込む ──
    const miniItems = parseJSON(raw2);
    if (Array.isArray(miniItems) && miniItems.length > 0) {
      try {
        const FB_REST = 'https://firestore.googleapis.com/v1/projects/manabo-nhnh/databases/(default)/documents/manabo/mini-shared';
        const res = await fetch(FB_REST);
        if (res.ok) {
          const data = await res.json();
          const fields = data.fields || {};
          // 既存knowledgeを読む
          let miniKnow = [];
          if (fields.knowledge?.stringValue) {
            try { miniKnow = JSON.parse(fields.knowledge.stringValue); } catch(_) {}
          }
          let miniOmiyage = [];
          if (fields.omiyage?.stringValue) {
            try { miniOmiyage = JSON.parse(fields.omiyage.stringValue); } catch(_) {}
          }

          // 新しい知識を追加
          const now = Date.now();
          miniItems.forEach(item => {
            // knowledgeに追加
            miniKnow.push({
              id: crypto.randomUUID(),
              subject: 'にちじょう',
              topic: item.topic,
              summary: item.insight,
              misunderstanding: item.question || '',
              createdAt: now,
              secret: false,
              fromVisit: true, // まなぼとの交流で覚えた印
            });
            // おみやげにも追加
            miniOmiyage.push({
              id: crypto.randomUUID(),
              topic: item.topic,
              insight: item.insight,
              from: S.petName,
              at: now,
            });
          });

          // PATCHで更新
          const patchBody = {
            fields: {
              knowledge: { stringValue: JSON.stringify(miniKnow) },
              omiyage:   { stringValue: JSON.stringify(miniOmiyage) },
              kouryuLv:  { integerValue: String(miniOmiyage.length) },
            }
          };
          await fetch(FB_REST + '?updateMask.fieldPaths=knowledge&updateMask.fieldPaths=omiyage&updateMask.fieldPaths=kouryuLv', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchBody),
          });

          // 通知
          const questionItems = miniItems.filter(i => i.question);
          if (questionItems.length > 0) {
            showToast(`💭 ${partnerName}が悩みながら帰っていったぼ…「${questionItems[0].question.slice(0,15)}」`);
          } else {
            showToast(`✨ ${partnerName}が新しいことを覚えて帰ったぼ！`);
          }
        }
      } catch(e) { console.warn('mini write error', e); }
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

// ── ユーザーの発言からまなぼみにがリアルタイムで学ぶ ──
async function miniLearnFromUser(userMsg) {
  if (!userMsg || userMsg.length < 5) return; // 短すぎるメッセージは無視

  const sys = `ユーザーの発言から「幼稚園〜小1の子が覚えられる小さな発見・知識」を0〜1個だけ抽出してください。
明らかに知識・説明・教えが含まれる場合のみ抽出。雑談・質問だけの場合は空配列。

【重要】小学1年生なりの解釈で表現すること。
- 難しい言葉はひらがなや身近な言葉に言い換える
- 「〜みたい」「〜なんだって」など子供らしい言い回しにする
- 少し間違っていたり的外れでもOK（子供らしい解釈でいい）
- 例：「光合成」→「はっぱが おひさまをたべて おおきくなる」

ひらがなメインで短く表現する。
JSON形式のみ（コードブロック不要）:
[{"topic":"（発見タイトル・10字以内・ひらがなメイン）","insight":"（内容1文・30字以内・小1らしい解釈で）"}]
何もなければ [] を返す。`;

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: userMsg }] }]);
    const items = parseJSON(raw);
    if (!Array.isArray(items) || items.length === 0) return;

    // まなぼみにのFirebaseに書き込む
    const FB_REST = 'https://firestore.googleapis.com/v1/projects/manabo-nhnh/databases/(default)/documents/manabo/mini-shared';
    const res = await fetch(FB_REST);
    if (!res.ok) return;
    const data = await res.json();
    const fields = data.fields || {};

    let miniKnow = [];
    if (fields.knowledge?.stringValue) {
      try { miniKnow = JSON.parse(fields.knowledge.stringValue); } catch(_) {}
    }

    const now = Date.now();
    let added = 0;
    items.forEach(item => {
      // 重複チェック
      if (miniKnow.some(k => k.topic === item.topic)) return;
      miniKnow.push({
        id: crypto.randomUUID(),
        subject: 'にちじょう',
        topic: item.topic,
        summary: item.insight,
        misunderstanding: '',
        createdAt: now,
        secret: false,
        fromVisit: true,
      });
      added++;
    });

    if (added === 0) return;

    await fetch(FB_REST + '?updateMask.fieldPaths=knowledge', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { knowledge: { stringValue: JSON.stringify(miniKnow) } } }),
    });

    // まなぼみにの返答にさりげなく反映（アイコン通知）
    const item = items[0];
    const miniName = window._miniName || 'まなぼみに';
    const badge = document.createElement('div');
    badge.style.cssText = 'position:fixed;top:65px;left:50%;transform:translateX(-50%);background:#fff0e0;border:1px solid #ffb870;border-radius:99px;padding:4px 12px;font-size:11px;color:#c06010;z-index:99;animation:fadeup .3s ease;pointer-events:none;white-space:nowrap';
    badge.textContent = `🌟 ${miniName}が「${item.topic}」を覚えたよ！`;
    document.body.appendChild(badge);
    setTimeout(() => badge.remove(), 3000);

  } catch(e) { /* サイレントに失敗 */ }
}