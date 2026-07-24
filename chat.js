// ==== manabo / app.js split: chat.js ====
// このファイルは元の app.js から機能ごとに分割したものです（挙動は変更していません）


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
    console.warn('Claude API error:', data.error.type, data.error.message);
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
  if (miniInChat) pushScene('user', 'ユーザー（かいぬしさん）', txt);
  showThinking(true);
  showHappy(false);
  doThinkShake();

  const kSum = S.knowledge.length > 0
    ? S.knowledge.map(k => `[${k.subject}]${k.topic}：${k.summary}（誤解：${k.misunderstanding || 'なし'}）`).join('\n')
    : 'まだ何も知らない';

  // チャットで教えてもらった内容を自動的に知識として保存するかどうかも判定させる
  const miniNote = miniInChat
    ? `【いまの状況】「${window._miniName||'まなぼみに'}」が部屋に遊びに来ていて、ユーザー（きみを育てているにんげん・かいぬしさん）もその場にいる3人の場面。
【最優先】「${window._miniName||'まなぼみに'}」のおしゃべり・質問・遊びに乗って会話を続けること。「${window._miniName||'まなぼみに'}」を主役にした掛け合いにする。
【ユーザーについて】ユーザーが何か言ったら、その場にいる一人の発言として自然に反応してよい（無視しなくていい）。ただし話の軸は「${window._miniName||'まなぼみに'}」との交流に置き、置き去りにしない。ユーザーが「まなぼ」「きみ」と呼ぶのはきみ自身のことで、「かいぬし」「飼い主」はこのユーザー自身のこと。
【直近の会話（発言者付き）】
${sceneTranscript()}`
    : '';
  const sys = `あなたはペット「${S.petName}」。中学生に教えてもらって育つキャラ。${S.persona ? `【性格メモ：${S.persona}】` : ''}
${miniNote}
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
    let p = parseJSON(raw);
    // JSON全体のパースに失敗した場合、replyだけ正規表現で抽出
    if (!p?.reply) {
      const m = raw.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      if (m) p = { reply: m[1].replace(/\\n/g,'\n') };
    }
    const reply = p?.reply || raw.replace(/\{.*\}/s,'').trim().slice(0,80) || raw.slice(0,80);

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
    if (miniInChat) pushScene('host', S.petName, reply);
    showThinking(false);
    addChatMsg('manabo', reply);
    typeText(reply.slice(0, 40));
    showHappy(true);
    doExcited();
  } catch (e) {
    showThinking(false);
    const fallback = 'えーっと…うまくきこえなかった…もう一回ゆっくり言って？';
    addChatMsg('manabo', fallback);
    typeText('えーっと…うまくきこえなかった…');
    if (miniInChat) pushScene('host', S.petName, fallback);
  }
  S.isThinking = false;

  // まなぼみにが招待されていたら、まなぼみにも返事する
  if (miniInChat && txt) {
    setTimeout(() => replyAsMini(txt), 900);
    // ユーザーの発言からまなぼみにがその場で学ぶ
    setTimeout(() => miniLearnFromUser(txt), 2000);
  }
}

async function replyAsMini(userMsg) {
  const miniName = window._miniName || 'まなぼみに';
  const miniPersona = window._miniPersona || '';
  const miniKnow = window._miniKnowledge || [];
  const miniKnowCount = miniKnow.length;
  // 教科バランスよく最大6件選ぶ
  let replyPicks = [];
  if (miniKnowCount > 0) {
    const byS = {};
    miniKnow.forEach(k => { const s = k.subject||'にちじょう'; if(!byS[s])byS[s]=[]; byS[s].push(k); });
    const subs = Object.keys(byS);
    let i = 0;
    while (replyPicks.length < 6 && replyPicks.length < miniKnowCount) {
      const s = subs[i % subs.length];
      const pool = byS[s];
      if (pool.length > 0) replyPicks.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
      i++;
    }
  }
  const replyLv = miniKnowCount>=31?4:miniKnowCount>=16?3:miniKnowCount>=6?2:1;
  const replyLvDesc = ['','ひらがなメイン・シンプルな反応。','難しい言葉も少し混じる・知識を披露したがる。','鋭い質問が増える・覚えた言葉を得意げに使う。','語彙が豊か・知識をひけらかしたがる。'][replyLv];
  const knowStr = replyPicks.length > 0
    ? '【' + miniName + 'の知識（全' + miniKnowCount + '件）】' + replyPicks.map(k => ' /' + k.topic + ':' + k.summary).join('')
    : '';
  const sys = `あなたはペット「${miniName}」。幼稚園〜小学生くらいの生意気で鋭くて好奇心旺盛なキャラ。
知識をどんどん増やしたくて鋭い質問をしてしまう。アホで破天荒な面もある愉快なキャラ。
${miniPersona ? `【${miniName}の性格メモ：${miniPersona}】` : ''}
【成長レベル（知識${miniKnowCount}件）】${replyLvDesc}
${knowStr}
【いまの状況】あなたは「${S.petName}」（まなぼせんぱい、性別なし・妖精みたいなキャラ）の部屋に遊びに来ているお客さん。部屋にはまなぼせんぱいを育てているユーザー（にんげん・かいぬしさん）もいる3人の場面。
【会話のしかた】まなぼせんぱいやユーザーが言ったことに素直に反応して、自分からもおしゃべりしたり質問したり遊んだりする。覚えた知識を自然に話題にしたり得意げに披露したりしてもいい。
【直近の会話（発言者付き）】
${sceneTranscript()}
語尾は「〜だよ！」「えへへ」「わあ！」など。返答40字以内。ひらがなメイン。`;
  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `（直近の会話の続きとして、${miniName}らしく自然に反応して）` }] }]);
    const svg = window._miniSVG || buildMiniSVG(null, 28);
    addChatMsgWithSVG(svg, raw.trim(), '#fff0e0', '#ffcc90');
    pushScene('guest', miniName, raw.trim());
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

// sendChatをminiInChat対応に拡張
const _origSendChat = sendChat;
// チャット送信時、miniInChatならまなぼみにも返事する
const _origCallGeminiForChat = async (sys, contents) => {
  const mainReply = await callGemini(sys, contents);
  return mainReply;
};