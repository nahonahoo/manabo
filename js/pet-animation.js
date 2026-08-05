// ==== manabo / app.js split: pet-animation.js ====
// このファイルは元の app.js から機能ごとに分割したものです（挙動は変更していません）


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

// ── ？クイズ（正解すると¥50もらえる一問一答） ──
// アプリ起動時にすぐ？マークが用意され、以後は1〜3分に1回のペースで次が出現する。
// 出題範囲は「中学1年生〜中学3年生1学期（夏休み前）まで」に固定し、まだ習っていない範囲・簡単すぎる小学校範囲は出さない。
let pendingQuiz = null; // { question, answer, acceptableAnswers }
let quizFetchInFlight = false;

function startQuizLoop() {
  const today = new Date().toDateString();
  if (S.quizDate !== today) { S.quizCount = 0; S.quizDate = today; }
  maybePrepareQuiz(); // 起動直後から？マークが出るように、待たずに1問用意する
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
  if (pendingQuiz || quizFetchInFlight) return; // 前回のクイズが答えられるまで次は用意しない

  quizFetchInFlight = true;
  const sys = `ペット「${S.petName}」として、飼い主に一問一答クイズを1問出す。${S.persona ? `【性格メモ：${S.persona}】` : ''}
【キャラ】かわいい・アホ・鋭い・雑・カオスが混在する読めないキャラ。
【語尾】${gobiStr()} を混ぜる。敬語禁止。
【出題範囲】中学１年生〜中学３年生の1学期（夏休み前）までに学校で習う内容から出題する。中学生には簡単すぎる小学校レベルの問題は絶対に出さない。中学３年生の２学期以降に習う範囲も絶対に出題しないこと。
【教科】数学・理科・社会・国語・英語のどれか1つをランダムに選ぶ。
【問題の性質】一問一答形式。用語・年号・公式・単語など、短い言葉ではっきり答えが決まる問題にする。長い説明が要る問題は避ける。
【難易度】学年相応・頑張れば思い出せるレベル。難しすぎない。
JSON形式のみで返す（コードブロック不要）：
{"question":"（まなぼの語尾で聞く問題文。30字以内）","answer":"（模範解答。できるだけ短く）","acceptableAnswers":["表記ゆれ・言い方違いを含む正解バリエーションを3〜5個（ひらがな/カタカナ/漢字、送り仮名の有無なども含める）"]}`;

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
  // 閉じても pendingQuiz は消さない（答えないまま閉じても？マークは残り、後で答えられる）
}

// この問題はパス：ペナルティなしでこの問題だけ手放す。次の出現タイミングで新しい問題に変わる
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
    resultArea.innerHTML = `<div style="color:#2a7a50;font-weight:700">✨ せいかい！+¥50 ゲットしたぼ！</div>`;
    showToast('✨ クイズせいかい！+¥50');
    typeText('やった！正解だぼ！+¥50もらったぼ！');
    doExcited();
  } else {
    S.quizCount++;
    await saveState();
    resultArea.innerHTML = `<div style="color:#7a6a9a">おしい…！こたえは「${esc(quiz.answer)}」だったぼ。またチャレンジしてほしいぼ！</div>`;
    typeText(`おしい！こたえは「${quiz.answer}」だったぼ〜`);
    bounce();
  }
}