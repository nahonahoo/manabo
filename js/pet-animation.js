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