// ==== manabo / app.js split: customize.js ====
// このファイルは元の app.js から機能ごとに分割したものです（挙動は変更していません）


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

// ── パーソナライズ ──
function openPersonalize() {
  closeDrawer();
  document.getElementById('p13-name').value = S.petName;
  document.getElementById('p13-persona').value = S.persona;
  renderGobiList();
  document.getElementById('personalize-modal').style.display = 'flex';
}

function closePersonalize() {
  document.getElementById('personalize-modal').style.display = 'none';
}

// 旧関数はエイリアスとして残す（モーダルIDだけ変わった）
function openGobiEditor() { openPersonalize(); }
function closeGobiEditor() { closePersonalize(); }

function savePetName() {
  const name = document.getElementById('p13-name').value.trim();
  if (!name) return;
  S.petName = name;
  saveState();
  showResult('p13-result', `「${name}」に変えたぼ！`);
  typeText(`あたらしいなまえ…「${name}」…かっこいいぼ！`);
  bounce();
}

function savePersona() {
  S.persona = document.getElementById('p13-persona').value.trim();
  saveState();
  showResult('p13-result', '性格メモを保存したぼ！');
  typeText('きゃっぽー！なんかかわったぼ？');
  bounce();
}

function showResult(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 2500);
}

function renderGobiList() {
  const el = document.getElementById('gobi-list');
  el.innerHTML = S.gobi.map((g, i) => `
    <div style="display:flex;align-items:center;gap:8px;background:#fdf8f0;border:1px solid #e8ddf5;border-radius:10px;padding:7px 11px">
      <span style="flex:1;font-size:.88rem;color:#2d2040;font-weight:500">${esc(g)}</span>
      <button onclick="deleteGobi(${i})"
        style="padding:3px 9px;border-radius:99px;border:1px solid #f0b0b0;background:#fde8e8;color:#c03030;font-size:.72rem;cursor:pointer;font-family:inherit">消す</button>
    </div>`).join('');
}

function addGobi() {
  const inp = document.getElementById('gobi-input');
  const val = inp.value.trim();
  if (!val) return;
  if (S.gobi.includes(val)) { alert('もう入ってるぼ'); return; }
  S.gobi.push(val);
  inp.value = '';
  saveState();
  renderGobiList();
}

function deleteGobi(i) {
  if (S.gobi.length <= 1) { alert('語尾は1個以上必要だぼ'); return; }
  S.gobi.splice(i, 1);
  saveState();
  renderGobiList();
}

function resetGobi() {
  if (!confirm('語尾をデフォルトに戻す？')) return;
  S.gobi = [...DEFAULT_GOBI];
  saveState();
  renderGobiList();
}

// ── 見た目カスタマイズ ──

const EAR_SHAPES = {
  round: {
    lRx:12, lRy:15, lIRx:5.5, lIRy:8,
    rRx:12, rRy:15, rIRx:5.5, rIRy:8,
    lRot:-15, rRot:15,
  },
  tall: {
    lRx:9, lRy:20, lIRx:4, lIRy:12,
    rRx:9, rRy:20, rIRx:4, rIRy:12,
    lRot:-10, rRot:10,
  },
  small: {
    lRx:8, lRy:9, lIRx:3.5, lIRy:5,
    rRx:8, rRy:9, rIRx:3.5, rIRy:5,
    lRot:-20, rRot:20,
  },
  cat: {
    lRx:8, lRy:14, lIRx:3.5, lIRy:9,
    rRx:8, rRy:14, rIRx:3.5, rIRy:9,
    lRot:-25, rRot:25,
  },
};

function applyAppearance() {
  const a = S.appearance;

  // グラデーション色
  const mg = document.getElementById('mg');
  if (mg) {
    mg.querySelectorAll('stop')[0].setAttribute('stop-color', a.bodyLight);
    mg.querySelectorAll('stop')[1].setAttribute('stop-color', a.bodyDark);
  }

  // 顔ベース（体より明るい色）
  const face = document.getElementById('face-e');
  if (face) face.setAttribute('fill', a.bodyLight);

  // 耳色（体色寄り）
  const earL = document.getElementById('ear-l');
  const earR = document.getElementById('ear-r');
  const armL = document.getElementById('arm-l');
  const armR = document.getElementById('arm-r');
  const tail = document.getElementById('tail-e');
  [earL, earR, armL, armR, tail].forEach(el => {
    if (el) el.setAttribute('fill', a.bodyDark + '99'); // 少し透明
  });

  // 耳の形
  const shape = EAR_SHAPES[a.earShape] || EAR_SHAPES.round;
  if (earL) {
    earL.setAttribute('rx', shape.lRx); earL.setAttribute('ry', shape.lRy);
    earL.setAttribute('transform', `rotate(${shape.lRot},48,53)`);
  }
  const earLIn = document.getElementById('ear-l-in');
  if (earLIn) {
    earLIn.setAttribute('rx', shape.lIRx); earLIn.setAttribute('ry', shape.lIRy);
    earLIn.setAttribute('transform', `rotate(${shape.lRot},50,54)`);
  }
  if (earR) {
    earR.setAttribute('rx', shape.rRx); earR.setAttribute('ry', shape.rRy);
    earR.setAttribute('transform', `rotate(${shape.rRot},112,53)`);
  }
  const earRIn = document.getElementById('ear-r-in');
  if (earRIn) {
    earRIn.setAttribute('rx', shape.rIRx); earRIn.setAttribute('ry', shape.rIRy);
    earRIn.setAttribute('transform', `rotate(${shape.rRot},110,54)`);
  }

  // 目の色
  ['eye-l','eye-r'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('fill', a.eyeColor);
  });
  // まばたき・びっくり目も同色に
  document.querySelectorAll('#blink-g rect, #surprise-g ellipse').forEach(el => {
    el.setAttribute('fill', a.eyeColor);
  });
  // 細目
  document.querySelectorAll('#happy-eye-g path').forEach(el => {
    el.setAttribute('stroke', a.eyeColor);
  });

  // ほっぺの色
  const blush = document.getElementById('blush');
  if (blush) {
    blush.querySelectorAll('stop')[0].setAttribute('stop-color', a.blushColor);
  }

  // 鼻・口の色（体色から派生）
  const nose = document.getElementById('nose-e');
  if (nose) nose.setAttribute('fill', a.bodyDark);
  const mouth = document.getElementById('mouth-p');
  if (mouth) mouth.setAttribute('stroke', a.bodyDark);

  // しっぽ
  applyTail();

  // アクセサリー
  ['ribbon-g','flower-g','butterfly-g','crown-g','star-g','glasses-g','glasses2-g','sunglass1-g','sunglass2-g','sunglass3-g','hat-g','mohican-g','blondewig-g','afro-g'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  if (a.accessory !== 'none') {
    const acc = document.getElementById(a.accessory + '-g');
    if (acc) acc.style.display = '';
  }
}

function previewAppearance() {
  S.appearance.bodyLight  = document.getElementById('c-body-light').value;
  S.appearance.bodyDark   = document.getElementById('c-body-dark').value;
  S.appearance.eyeColor   = document.getElementById('c-eye').value;
  S.appearance.blushColor = document.getElementById('c-blush').value;
  applyAppearance();
}

function setEarShape(shape) {
  S.appearance.earShape = shape;
  // ボタンの選択状態更新
  ['round','tall','small','cat'].forEach(s => {
    const btn = document.getElementById('ear-btn-' + s);
    if (!btn) return;
    btn.className = 'acc-btn' + (s === shape ? ' acc-active' : '');
  });
  applyAppearance();
}

function setAccessory(acc) {
  S.appearance.accessory = acc;
  ['none','ribbon','flower','butterfly','crown','star','glasses','glasses2','sunglass1','sunglass2','sunglass3','hat','afro'].forEach(a => {
    const btn = document.getElementById('acc-btn-' + a);
    if (!btn) return;
    const active = a === acc;
    btn.classList.toggle('acc-active', active);
  });
  applyAppearance();
}

function saveAppearance() {
  previewAppearance();
  saveState();
  showResult('p13-result', '見た目を保存したぼ！');
  typeText('きゃっぽー！おしゃれになったぼ？');
  bounce();
}

function resetAppearance() {
  S.appearance = {
    bodyLight: '#ede0ff', bodyDark: '#c5aaf0',
    eyeColor: '#3a2e4a', blushColor: '#f9b8c8',
    earShape: 'round', accessory: 'none', tailShape: 'normal',
  };
  // カラーピッカーをリセット
  document.getElementById('c-body-light').value = S.appearance.bodyLight;
  document.getElementById('c-body-dark').value  = S.appearance.bodyDark;
  document.getElementById('c-eye').value         = S.appearance.eyeColor;
  document.getElementById('c-blush').value       = S.appearance.blushColor;
  setEarShape('round');
  setAccessory('none');
  saveState();
  showResult('p13-result', 'もとにもどしたぼ！');
}

// パーソナライズ画面を開くときにカラーピッカーを現在値で初期化
const _origOpenPersonalize = openPersonalize;
openPersonalize = function() {
  _origOpenPersonalize();
  const a = S.appearance;
  document.getElementById('c-body-light').value = a.bodyLight;
  document.getElementById('c-body-dark').value  = a.bodyDark;
  document.getElementById('c-eye').value         = a.eyeColor;
  document.getElementById('c-blush').value       = a.blushColor;
  setEarShape(a.earShape);
  setAccessory(a.accessory);
  setTailShape(a.tailShape || 'normal');
};

// ── しっぽ形状 ──
const TAIL_SHAPES = {
  normal:   `<ellipse cx="120" cy="104" rx="8" ry="6" fill="COLOR" transform="rotate(25,120,104)"/>`,
  verylong: `<path d="M118,100 Q145,115 150,140 Q155,160 140,170" stroke="COLOR" stroke-width="10" fill="none" stroke-linecap="round"/>`,
};

function setTailShape(shape) {
  S.appearance.tailShape = shape;
  ['normal','verylong'].forEach(s => {
    const btn = document.getElementById('tail-btn-' + s);
    if (btn) btn.classList.toggle('acc-active', s === shape);
  });
  applyTail();
}

function applyTail() {
  const tg = document.getElementById('tail-g');
  if (!tg) return;
  const shape = S.appearance.tailShape || 'normal';
  const color = S.appearance.bodyDark || '#daccf7';
  const svgStr = (TAIL_SHAPES[shape] || TAIL_SHAPES.normal).replace(/COLOR/g, color);
  tg.innerHTML = svgStr;
}