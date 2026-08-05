// ==== まなぼみに / mini-app.js split: pet-animation.js ====
// このファイルは元の mini-app.js から機能ごとに分割したものです（挙動は変更していません）


// 寝てる状態（zzz表示）
function petSleep() {
  setEye('normal'); setMouth('normal');
}

// 起きてる状態（zzz消す）
function petWake() { setEye('normal'); }

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
  if (S.knowledge.length === 0) { typeText('えへへ！なにかおしえてね！'); return; }
  const k = S.knowledge[Math.floor(Math.random() * S.knowledge.length)];
  const lines = [
    `「${k.topic}」ってすごいんだって！えへへ！`,
    `${k.topic}…おいしそう！（ちがうかも）`,
    `「${(k.summary || k.topic).slice(0, 15)}」…なんかふわふわしてる！`,
    `${k.topic}！${k.topic}！（なぜか2回いう）`,
    `「${k.topic}」おぼえたよ！うれしい！`,
    `ねえねえ、${k.topic}ってなあに？もっとおしえて！`,
  ];
  typeText(lines[Math.floor(Math.random() * lines.length)]);
  }, 200);
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
C: 子どもに身近な質問を投げる（「すきなたべものなあに？」「どんないろがすき？」「ねこってなんで鳴くの？」）
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

// ── ？クイズ（せいかいすると¥50もらえる一問一答） ──
// 1〜3分に1回？マークが出現し、タップするとクイズが出る。
// 出題範囲は「小学2年生の1学期（夏休み前）まで」に固定し、まだ習っていない範囲は出さない。
let pendingQuiz = null; // { question, answer, acceptableAnswers }
let quizFetchInFlight = false;

function startQuizLoop() {
  const today = new Date().toDateString();
  if (S.quizDate !== today) { S.quizCount = 0; S.quizDate = today; }
  scheduleNextQuiz();
}

function scheduleNextQuiz() {
  const delay = (1 + Math.random() * 2) * 60 * 1000; // 1〜3分
  setTimeout(async () => {
    await maybePrepareQuiz();
    scheduleNextQuiz();
  }, delay);
}

async function maybePrepareQuiz() {
  const today = new Date().toDateString();
  if (S.quizDate !== today) { S.quizCount = 0; S.quizDate = today; }
  if (S.quizCount >= 20) return;
  if (pendingQuiz || quizFetchInFlight) return; // 前のクイズにこたえるまで次は用意しない

  quizFetchInFlight = true;
  const sys = `ペット「${S.petName}」として、いっしょにあそんでいる子に一問一答クイズを1問だす。${S.persona ? `【性格メモ：${S.persona}】` : ''}
【キャラ】生意気で鋭くて好奇心おうせい。アホで破天荒な面もある愉快なキャラ。
【語尾】${gobiStr()} をランダムに。敬語禁止。
【出題範囲】小学2年生の1学期（夏休み前）までに学校でならう内容から出題する。ひらがな・カタカナ・かんたんな漢字（1年生でならう漢字が中心）・10〜20くらいまでのたしざんひきざん・みぢかな生きものや季節の話など。2年生の2学期以降の内容（九九など）や、むずかしい漢字・熟語は絶対に出さない。
【問題の性質】すごくかんたんで、みじかい言葉や数字ひとつで答えられる問題にする。
【トーン】やさしく・たのしく。まちがえてもぜんぜん責めない前提で出題する。
JSON形式のみで返す（コードブロック不要）：
{"question":"（だよ語尾で聞く問題文。ひらがな中心・20字以内）","answer":"（模範解答。できるだけみじかく）","acceptableAnswers":["表記ゆれを含む正解バリエーションを2〜4個（ひらがな/カタカナ/漢字の表記ゆれも含める）"]}`;

  try {
    const raw = await callGemini(sys, [{ role: 'user', parts: [{ text: '一問一答クイズを1問お願い。' }] }]);
    let p = parseJSON(raw);
    // JSON全体のパースに失敗した場合、question/answerだけ正規表現で抽出（sendChatのreply抽出と同じ考え方）
    if (!p?.question || !p?.answer) {
      const qm = raw.match(/"question"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      const am = raw.match(/"answer"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      if (qm && am) p = { question: qm[1].replace(/\\n/g,'\n'), answer: am[1].replace(/\\n/g,'\n'), acceptableAnswers: p?.acceptableAnswers };
    }
    if (p && p.question && p.answer) {
      pendingQuiz = {
        question: p.question,
        answer: p.answer,
        acceptableAnswers: Array.isArray(p.acceptableAnswers) && p.acceptableAnswers.length ? p.acceptableAnswers : [p.answer],
      };
      const badge = document.getElementById('quiz-badge');
      if (badge) badge.style.display = 'flex';
    } else {
      console.warn('quiz JSON parse failed, raw response:', raw);
    }
  } catch (e) {
    console.warn('quiz generate error', e);
  }
  quizFetchInFlight = false;
}

function normalizeQuizAnswer(s) {
  return String(s || '')
    .trim()
    .replace(/[\s　]+/g, '')
    .replace(/[。、！？．，.,!?]/g, '')
    .toLowerCase();
}

function checkQuizAnswer(userInput, acceptableAnswers) {
  const norm = normalizeQuizAnswer(userInput);
  if (!norm) return false;
  return (acceptableAnswers || []).some(a => {
    const na = normalizeQuizAnswer(a);
    if (!na) return false;
    if (norm === na) return true;
    if (na.length >= 2 && norm.length >= 2) return norm.includes(na) || na.includes(norm);
    return false;
  });
}

function openQuizModal() {
  if (!pendingQuiz) return;
  document.getElementById('quiz-question-text').textContent = pendingQuiz.question;
  const input = document.getElementById('quiz-answer-input');
  input.value = '';
  input.style.display = '';
  document.getElementById('quiz-btn-row').style.display = '';
  document.getElementById('quiz-result-area').style.display = 'none';
  document.getElementById('quiz-modal').style.display = 'flex';
  setTimeout(() => input.focus(), 100);
}

function closeQuizModal() {
  document.getElementById('quiz-modal').style.display = 'none';
  // 閉じても pendingQuiz は消さない（こたえないままとじても？マークはのこる）
}

// この問題はパス：ペナルティなしでこの問題だけ手放す。次の出現タイミングで新しい問題にかわる
function passQuiz() {
  pendingQuiz = null;
  const badge = document.getElementById('quiz-badge');
  if (badge) badge.style.display = 'none';
  closeQuizModal();
}

async function submitQuizAnswer() {
  if (!pendingQuiz) return;
  const input = document.getElementById('quiz-answer-input');
  const userAnswer = input.value.trim();
  if (!userAnswer) return;
  const quiz = pendingQuiz;
  const correct = checkQuizAnswer(userAnswer, quiz.acceptableAnswers);

  input.style.display = 'none';
  document.getElementById('quiz-btn-row').style.display = 'none';
  const resultArea = document.getElementById('quiz-result-area');
  resultArea.style.display = '';

  const badge = document.getElementById('quiz-badge');
  if (badge) badge.style.display = 'none';
  pendingQuiz = null;

  if (correct) {
    S.coins += 50;
    S.quizCount++;
    await saveShared({ coins: S.coins });
    await saveState();
    gainXP(1);
    resultArea.innerHTML = `<div style="color:#2a7a50;font-weight:700">✨ せいかい！+¥50 ゲットしたよ！</div>`;
    showToast('✨ クイズせいかい！+¥50');
    typeText('わあ！せいかい！+¥50もらったよ！');
    doExcited();
  } else {
    S.quizCount++;
    await saveState();
    resultArea.innerHTML = `<div style="color:#c08040">おしい…！こたえは「${esc(quiz.answer)}」だったよ。またチャレンジしてね！</div>`;
    typeText(`おしい！こたえは「${quiz.answer}」だったよ〜`);
    bounce();
  }
}

// ── 教えたとき花火アニメ（まなぼみに専用） ──
function showFireworks() {
  const colors = ['#ffb870','#ff9ec8','#b388ff','#80deea','#ffe066','#f48fb1'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999;overflow:hidden';
  document.body.appendChild(container);

  for (let i = 0; i < 18; i++) {
    const star = document.createElement('div');
    const x = 20 + Math.random() * 60; // 画面中央付近
    const y = 20 + Math.random() * 60;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 12 + Math.random() * 16;
    const tx = (Math.random() - 0.5) * 200;
    const ty = (Math.random() - 0.5) * 200;
    star.style.cssText = `
      position:absolute;left:${x}%;top:${y}%;
      width:${size}px;height:${size}px;
      background:${color};border-radius:50%;
      transform:scale(0);opacity:1;
      animation:fw ${0.5 + Math.random() * 0.5}s ease-out ${Math.random() * 0.3}s forwards;
      --tx:${tx}px;--ty:${ty}px;
    `;
    container.appendChild(star);
  }

  // テキスト
  const msg = document.createElement('div');
  msg.style.cssText = 'position:absolute;top:35%;left:0;right:0;text-align:center;font-size:2rem;animation:fwMsg .8s ease-out 0.2s both;pointer-events:none';
  msg.textContent = ['✨すごい！','🌟やったー！','💫えらい！','⭐かしこい！'][Math.floor(Math.random()*4)];
  container.appendChild(msg);

  setTimeout(() => container.remove(), 1500);
}

// 花火CSS（動的に追加）
if (!document.getElementById('fw-style')) {
  const s = document.createElement('style');
  s.id = 'fw-style';
  s.textContent = `
    @keyframes fw {
      0%{transform:scale(0) translate(0,0);opacity:1}
      100%{transform:scale(1) translate(var(--tx),var(--ty));opacity:0}
    }
    @keyframes fwMsg {
      0%{transform:scale(0.5);opacity:0}
      50%{transform:scale(1.3);opacity:1}
      100%{transform:scale(1);opacity:0}
    }
  `;
  document.head.appendChild(s);
}