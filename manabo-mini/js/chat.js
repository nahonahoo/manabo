// ==== まなぼみに / mini-app.js split: chat.js ====
// このファイルは元の mini-app.js から機能ごとに分割したものです（挙動は変更していません）


// ── GEMINI API ──
async function callGemini(systemInstruction, contents) {
  // Anthropic Claude API
  const messages = contents.map(c => ({
    role: c.role === 'model' ? 'assistant' : c.role,
    content: c.parts?.[0]?.text || '',
  }));
  if (!S.apiKey) {
    showToast('⚠ APIキーが設定されていないよ！☰メニューから設定してね');
    throw new Error('APIキー未設定');
  }
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
  if (manaboInChat) pushScene('user', 'ユーザー（かいぬしさん）', txt);
  showThinking(true);
  showHappy(false);
  doThinkShake();

  const kSum = S.knowledge.length > 0
    ? S.knowledge.map(k => `[${k.subject}]${k.topic}：${k.summary}（誤解：${k.misunderstanding || 'なし'}）`).join('\n')
    : 'まだ何も知らない';

  // チャットで教えてもらった内容を自動的に知識として保存するかどうかも判定させる
  // まなぼが来ているときはまなぼへの返答を優先
  const manaboNote = manaboInChat
    ? `【いまの状況】「${window._manaboName||'まなぼせんぱい'}」が部屋に遊びに来ていて、ユーザー（あなたを育てているにんげん・かいぬしさん）もその場にいる3人の場面。
【最優先】「${window._manaboName||'まなぼせんぱい'}」のおしゃべり・質問・遊びに乗って会話を続けること。まなぼせんぱいに話しかけたり反応したりする。
【ユーザーについて】ユーザーが何か言ったら、その場にいる一人の発言として自然に反応してよい（無視しなくていい）。ただし話の軸はまなぼせんぱいとの交流に置く。ユーザーが呼ぶ「きみ」はあなた自身のことで、「かいぬし」「飼い主」はこのユーザー自身のこと。
【呼び方の注意】「まなぼせんぱい」「せんぱい」は「${window._manaboName||'まなぼ'}」だけを呼ぶときの敬称。自分から自分をそう呼んだり名乗ったりしない。あなた（${S.petName}）は年下（幼稚園〜小1）、「${window._manaboName||'まなぼ'}」が年上（中学生）。
【直近の会話（発言者付き）】
${sceneTranscript()}`
    : '';
  const sys = `あなたはペット「${S.petName}」。幼稚園〜小学1年生の子どもに教えてもらって育つ、かわいいペット。${S.persona ? `【性格メモ：${S.persona}】` : ''}
【キャラ】いつも明るくて素直。なんでも不思議に思う。かわいくてあどけない。生意気なところもある愉快なキャラ。
【語尾ルール（必ず使う）】${gobiStr()} を混ぜて使う。ひらがなメイン。難しい言葉禁止。
【重要：チャットで何か知識・事実・ものごとを教えてもらったら自動で記憶する】
ユーザーのメッセージに教えてもらえる内容・知識・事実が含まれる場合、learnフィールドに入れる。
雑談・質問・あいさつなどは learnをnullにする。
【重要】まなぼのことは「まなぼせんぱい」と呼ぶ。まなぼは性別なしの妖精みたいな存在。
${manaboNote}
【返し方のバリエーション（毎回ランダムに）】
・素直に感心する「すごーい！そうなんだ！」
・不思議がる「なんで〜なの？おしえて！」
・一緒に喜ぶ「やったー！わかったよ！えへへ！」
・かわいい的外れ「それっておいしいの？」
・子どもが答えやすい身近な質問で返す（どうぶつ・たべもの・いろ・かたちなど）
知らないことは「しらないよ〜！」。返答は40字以内。ひらがなメイン。
今しっていること:\n${kSum}

必ずJSON形式のみで返す（コードブロック不要）:
{"reply":"（まなぼみにの返事、ひらがなメイン）","learn":{"subject":"すうじ/しぜん/せかい/ことば/えいご/にちじょうのどれか","topic":"（みじかいトピック名）","summary":"（かんたんな言葉での要約1文）","misunderstanding":"（かわいいズレた解釈）"} または null}`;

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
    if (manaboInChat) pushScene('host', S.petName, reply);
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
    if (manaboInChat) pushScene('host', S.petName, fallback);
  }
  S.isThinking = false;

  // まなぼが招待されていたら、まなぼも返事する
  if (manaboInChat && txt) {
    setTimeout(() => replyAsManabo(txt), 900);
  }
}

async function replyAsManabo(userMsg) {
  const manaboName = window._manaboName || 'まなぼ';
  const manaboPersona = window._manaboPersona || '';
  const senpaiLv = window._manaboSenpaiLv || 1;
  const senpaiDesc = window._manaboSenpaiDesc || '';
  const sys = `あなたはペット「${manaboName}」。ユーモアがあってお笑い芸人みたいに面白いせんぱい的な存在。性別なし・妖精みたいなキャラ。
${manaboPersona ? `【${manaboName}の性格メモ：${manaboPersona}】` : ''}
【せんぱい力レベル${senpaiLv}】${senpaiDesc}
【いまの状況】あなたは「${S.petName}」の部屋にお客さんとして遊びに来ている。部屋には「${S.petName}」を育てているユーザー（にんげん・かいぬしさん）もいる3人の場面。
【会話のしかた】「${S.petName}」とユーザーの両方の発言に素直に反応して、質問・冗談・遊びを優先する。難しい知識をそのまま話すのではなく${S.petName}が喜ぶ言葉で接する。
【呼び方の注意】「せんぱい」は「${S.petName}」があなた（${manaboName}）を呼ぶときの敬称。自分から自分を「まなぼせんぱい」のように名乗ったりしない。
【直近の会話（発言者付き）】
${sceneTranscript()}
語尾は「〜だぼ」「ぎゃぼー」「わぼ」など。返答30字以内。`;
  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `（直近の会話の続きとして、${manaboName}らしく自然に反応して）` }] }]);
    const svg = window._manaboSVG || buildMiniSVG(null, 28);
    addChatMsgWithSVG(svg, raw.trim(), '#ede0ff', '#c5aaf0');
    pushScene('guest', manaboName, raw.trim());
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
    数学: 'すうじだ！おもしろそう！',
    理科: 'しぜんのおはなし！すき！',
    社会: 'むかしのおはなし！わくわく！',
    国語: 'ことばだ！いっぱいしってるよ！たぶん！',
    英語: 'えいご！ハロー！（それだけしってる）',
    日常: 'なんでもおしえてね！えへへ！',
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

  const sys = `ペット「${S.petName}」として幼稚園〜小1の子どもに教えてもらった内容に反応する。${S.persona ? `【性格メモ：${S.persona}】` : ''}
【キャラ】いつも明るくて素直。なんでも不思議に思うかわいいキャラ。
【語尾】${gobiStr()} を混ぜる。ひらがなメイン。難しい言葉禁止。
JSON形式のみ（コードブロック不要）:
{"reaction":"（明るくかわいい反応20字以内。ひらがなメイン）","summary":"（教えてもらった内容をかんたんな言葉で1文にまとめる）","misunderstanding":"（かわいい的外れな解釈20字以内。例：おいしそう、きれい、ふわふわ系）","question":"（子どもが答えやすい簡単な質問20字以内。どうぶつ・いろ・たべものなど身近なテーマ）"}`;

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
    showFireworks(); // 花火！
    showThinking(false);
    typeText(p.reaction + '…「' + p.question + '」');

    document.getElementById('misread-text').textContent = p.misunderstanding;
    document.getElementById('misread-area').style.display = '';
    document.getElementById('teach-ta').value = '';

    addChatMsg('manabo', p.reaction + ' 「' + p.question + '」');
    S.chatHistory.push({ role: 'model', parts: [{ text: p.reaction }] });
  } catch (e) {
    showThinking(false);
    console.error('teachManabo error:', e);
    typeText('うまくきこえなかった…もう一回おしえて？');
  }
  document.getElementById('teach-btn').disabled = false;
}