// ==== manabo / app.js split: diary-knowledge.js ====
// このファイルは元の app.js から機能ごとに分割したものです（挙動は変更していません）


// ── DIARY ──
async function generateDiary(type) {
  if (S.knowledge.length === 0) {
    document.getElementById('diary-out').textContent = 'まだ何もしらない…おしえて？';
    return;
  }
  document.getElementById('diary-out').textContent = '書いてる……';
  document.getElementById('diary-meta').style.display = 'none';
  document.getElementById('diary-sell-btn').style.display = 'none';
  bounce();

  const picks = [...S.knowledge].sort(() => Math.random() - .5).slice(0, 6);
  const topics = picks.map(k => `[${k.subject}]${k.topic}：${k.summary}（誤解：${k.misunderstanding || 'なし'}）`).join('\n');

  const prompts = {
    日記: `ペット「まなぼ」として今日の日記を書く。かわいい/アホ/突然鋭い/雑/カオスが混在する読めないキャラで。覚えた知識をズレた形・意外なつながりで混ぜる。300字以内。語尾は${gobiStr()}をランダムに。敬語禁止。`,
    小説: `ペット「まなぼ」として短編小説を書く。かわいい/鋭い/雑/カオスが混在するキャラで語る。知識を的外れかつ時々妙に鋭く登場させる。400字以内。語尾は${gobiStr()}をランダムに。敬語禁止。`,
    発表: `ペット「まなぼ」として授業発表。「えーっと」「ぎゃぼ待って」「わぼ…」などを挟みながら、一生懸命だがカオスな発表を300字以内で。語尾は${gobiStr()}をランダムに。敬語禁止。`,
    詩: `ペット「まなぼ」として詩を書く。かわいい/鋭い/カオスが混在する詩。知識が意外な比喩になる。200字以内。語尾は${gobiStr()}をランダムに。敬語禁止。`,
  };

  const sys = (prompts[type] || prompts['日記']) + `\n知識:\n${topics}\nプレーンテキストのみ（JSON・装飾なし）。`;

  try {
    const raw = await callGemini(sys, [{ role: 'user', parts: [{ text: `${type}を書いて` }] }]);
    const content = raw.trim();
    document.getElementById('diary-out').textContent = content;
    const meta = document.getElementById('diary-meta');
    meta.textContent = `まなぼが ${new Date().toLocaleDateString('ja-JP')} に書いた${type}`;
    meta.style.display = '';
    bounce();
    showHappy(true);
    const lines = { 日記: 'かいた！みて！（どや顔）', 小説: 'しょうせつかいた…すごい？', 発表: 'はっぴょうするよ！（ドキドキ）', 詩: 'うた…つくったよ…' };
    typeText(lines[type] || 'かいたよ！');

    // 作品をS._lastWorkに一時保存（出品用）
    S._lastWork = { content, type, topics };

    // 出品ボタンを表示（日記・小説・詩のみ）
    if (['日記','小説','詩'].includes(type)) {
      const btn = document.getElementById('diary-sell-btn');
      btn.textContent = `📖 この${type}をショップに出品する`;
      btn.style.display = '';
    }
  } catch (e) {
    document.getElementById('diary-out').textContent = '書けなかった……ごめんね（ぽかん）';
  }
}

// 作品をAIに評価させて出品
async function sellDiaryWork() {
  const work = S._lastWork;
  if (!work) return;

  const btn = document.getElementById('diary-sell-btn');
  btn.disabled = true;
  btn.textContent = '評価中……';
  typeText('はんだんちゅうだぼ…ぼぼ…✨');

  const evalSys = `以下のペットが書いた文章を評価してください。
評価基準（厳しめに）：
- ★1：内容が薄い・知識がほぼ使われていない
- ★2：知識は使われているが浅い
- ★3：知識を上手く活かしていて面白い（ここが標準）
- ★4：知識が深く・正確で・かつキャラクターらしい表現が光る（めったに出ない）
- ★5：読んで本当に感心する傑作・知識の質が高く役に立つ内容（非常に稀）
★4以上は滅多に出さないこと。知識の正確さと深さを最重視する。
JSONのみ返す（コードブロック不要）:
{"score":1〜5の整数,"title":"作品タイトル（20字以内・センスよく）","reason":"評価理由1文"}`;

  try {
    const raw = await callGemini(evalSys, [{ role:'user', parts:[{ text: work.content }] }]);
    const result = parseJSON(raw);
    const score = Math.max(1, Math.min(5, result.score || 1));
    const title = result.title || `まなぼの${work.type}`;

    // スコア→レアリティ・価格
    const rarityMap = [null, 1, 1, 2, 3, 4];
    const priceRanges = [null, [3,30], [50,150], [200,600], [800,2500], [3000,10000]];
    const rarity = rarityMap[score];
    const [pmin, pmax] = priceRanges[score];
    const price = Math.floor(Math.random() * (pmax - pmin + 1)) + pmin;

    // アイテムとしてinventoryに追加
    const workItem = {
      id: 9000 + Math.floor(Math.random() * 999),
      name: title,
      desc: `まなぼが書いた${work.type}。「${work.content.slice(0,30)}…」`,
      cat: '本',
      rarity,
      price,
      shopId: crypto.randomUUID(),
      listedAt: null,
      sold: false,
      craftedAt: Date.now(),
      isWork: true,
    };

    S.inventory.push(workItem);
    await saveState();
    renderInventory();

    const ri = RARITY_INFO[rarity];
    const scoreStars = '★'.repeat(score) + '☆'.repeat(5-score);
    showToast(`${ri.emoji}「${title}」${scoreStars} ¥${price.toLocaleString()}でアイテムボックスに追加したぼ！`);
    typeText(score >= 4 ? `ぎゃぼー！傑作だぼ！「${title}」！！` : score >= 3 ? `おお！「${title}」ができたぼ！` : `「${title}」…まあまあだぼ。`);
    bounce();
    btn.style.display = 'none';
    S._lastWork = null;
  } catch(e) {
    btn.disabled = false;
    btn.textContent = `📖 この${work.type}をショップに出品する`;
    showToast('評価できなかったぼ…もう一回押してみてほしいぼ');
  }
}

// ── KNOWLEDGE LIST ──
function renderKnowledge() {
  const sc = document.getElementById('know-scroll');
  const empty = document.getElementById('know-empty');
  const countEl = document.getElementById('know-count');

  // 交流レベル表示
  const omiyageSection = document.getElementById('omiyage-section');
  const kouryuEl = document.getElementById('kouryu-lv');
  if (omiyageSection) {
    omiyageSection.style.display = S.omiyage.length > 0 ? '' : 'none';
    if (kouryuEl) kouryuEl.textContent = S.omiyage.length;
  }

  // フィルタ（おみやげは別リストから表示）
  const isOmiyage = S.filterSubject === 'おみやげ';
  const filtered = isOmiyage
    ? [] // おみやげフィルター時は通常知識を表示しない
    : S.filterSubject === 'すべて'
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

  // おみやげフィルター時はおみやげ知識を表示
  if (isOmiyage) {
    if (S.omiyage.length === 0) {
      empty.style.display = '';
      countEl.textContent = 'おみやげ知識はまだないよ';
      return;
    }
    empty.style.display = 'none';
    countEl.textContent = `おみやげ ${S.omiyage.length} 件`;
    [...S.omiyage].reverse().forEach(o => {
      const d = document.createElement('div');
      d.className = 'know-card';
      d.innerHTML = `
        <span class="know-subj" style="background:#fff8e0;color:#c08000;border:1px solid #f0d080">🎁</span>
        <div class="know-body">
          <div class="know-topic">${esc(o.topic)}</div>
          <div class="know-sum">${esc(o.insight)}</div>
          <div class="know-mis">✉ ${esc(o.from || 'おみやげ')} より</div>
        </div>`;
      sc.appendChild(d);
    });
    return;
  }

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