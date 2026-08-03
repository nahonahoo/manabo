// ==== まなぼみに / train-journey.js ====
// でんしゃのたび：東海エリアの実在路線をモデルにした「全国制覇」旅行ゲーム機能
// まなぼとみにぼで進捗は別々（お互いのお財布・コレクションには影響しない）

// ── 東海エリア路線データ（デフォルメ・簡略化） ──
const TOKAI_LINES = [
  { id:'tokaido', name:'JR東海道本線', color:'#F68B1E', stations:[
    {id:'toyohashi', name:'豊橋'}, {id:'gamagori', name:'蒲郡'}, {id:'okazaki', name:'岡崎'},
    {id:'anjo', name:'安城'}, {id:'kariya', name:'刈谷'}, {id:'obu', name:'大府'},
    {id:'atsuta', name:'熱田'}, {id:'nagoya', name:'名古屋'}, {id:'owari-ichinomiya', name:'尾張一宮'},
    {id:'gifu', name:'岐阜'},
  ]},
  { id:'chuo', name:'JR中央本線', color:'#F15A22', stations:[
    {id:'nagoya', name:'名古屋'}, {id:'chikusa', name:'千種'}, {id:'kozoji', name:'高蔵寺'},
    {id:'tajimi', name:'多治見'}, {id:'toki', name:'土岐市'}, {id:'ena', name:'恵那'},
    {id:'nakatsugawa', name:'中津川'},
  ]},
  { id:'kansai', name:'JR関西本線', color:'#0072BC', stations:[
    {id:'nagoya', name:'名古屋'}, {id:'hatta', name:'八田'}, {id:'kuwana', name:'桑名'},
    {id:'yokkaichi', name:'四日市'}, {id:'kameyama', name:'亀山'},
  ]},
  { id:'taketoyo', name:'JR武豊線', color:'#00A0DE', stations:[
    {id:'obu', name:'大府'}, {id:'higashiura', name:'東浦'}, {id:'handa', name:'半田'},
    {id:'taketoyo', name:'武豊'},
  ]},
  { id:'shinkansen', name:'東海道新幹線', color:'#1D2088', stations:[
    {id:'toyohashi', name:'豊橋'}, {id:'mikawa-anjo', name:'三河安城'}, {id:'nagoya', name:'名古屋'},
    {id:'gifu-hashima', name:'岐阜羽島'},
  ]},
  { id:'meitetsu-nagoya', name:'名鉄名古屋本線', color:'#E4002B', stations:[
    {id:'toyohashi', name:'豊橋'}, {id:'higashi-okazaki', name:'東岡崎'}, {id:'chiryu', name:'知立'},
    {id:'jingu-mae', name:'神宮前'}, {id:'meitetsu-nagoya', name:'名鉄名古屋'}, {id:'meitetsu-gifu', name:'名鉄岐阜'},
  ]},
  { id:'mikawa', name:'名鉄三河線', color:'#E85298', stations:[
    {id:'sanage', name:'猿投'}, {id:'toyota-shi', name:'豊田市'}, {id:'chiryu', name:'知立'},
    {id:'hekinan', name:'碧南'},
  ]},
  { id:'toyota-line', name:'名鉄豊田線', color:'#F39800', stations:[
    {id:'toyota-shi', name:'豊田市'}, {id:'akaike', name:'赤池'},
  ]},
  { id:'kintetsu-nagoya', name:'近鉄名古屋線', color:'#00A651', stations:[
    {id:'kintetsu-nagoya', name:'近鉄名古屋'}, {id:'kuwana', name:'桑名'}, {id:'yokkaichi', name:'四日市'},
    {id:'tsu', name:'津'},
  ]},
  { id:'higashiyama', name:'名古屋市営地下鉄東山線', color:'#FFD400', stations:[
    {id:'takabata', name:'高畑'}, {id:'fushimi', name:'伏見'}, {id:'sakae', name:'栄'},
    {id:'nagoya', name:'名古屋'}, {id:'fujigaoka', name:'藤が丘'},
  ]},
];

// 路線図（デフォルメ）用の駅座標。viewBox 0 0 900 700
const STATION_POS = {
  gifu:[60,380], 'owari-ichinomiya':[150,380], nagoya:[260,380], atsuta:[340,420],
  obu:[420,460], kariya:[500,460], anjo:[580,460], okazaki:[660,460], gamagori:[740,460], toyohashi:[820,420],
  chikusa:[300,320], kozoji:[360,260], tajimi:[420,210], toki:[480,170], ena:[550,130], nakatsugawa:[620,90],
  hatta:[230,490], kuwana:[260,540], yokkaichi:[300,590], kameyama:[360,630],
  'kintetsu-nagoya':[130,410], tsu:[220,620],
  higashiura:[420,530], handa:[420,600], taketoyo:[420,660],
  'mikawa-anjo':[660,380], 'gifu-hashima':[130,320],
  'higashi-okazaki':[660,530], chiryu:[540,530], 'jingu-mae':[340,480], 'meitetsu-nagoya':[195,420], 'meitetsu-gifu':[70,440],
  sanage:[540,650], 'toyota-shi':[540,590], hekinan:[650,620],
  akaike:[610,600],
  takabata:[180,590], fushimi:[190,500], sakae:[210,450], fujigaoka:[190,330],
};

// ── 旅行コース商品（¥3,000〜¥100,000）。路線をどう辿るかはお任せ設計、重複あり ──
const TRAIN_COURSES = [
  { id:'c1', name:'となりまちさんぽ', price:3000, desc:'大府から半田までのんびり各駅停車の旅。',
    lines:['taketoyo'], stationIds:['obu','higashiura','handa'] },
  { id:'c2', name:'豊田市内ぶらり旅', price:5000, desc:'猿投・豊田市・赤池をまわるミニトリップ。',
    lines:['mikawa','toyota-line'], stationIds:['sanage','toyota-shi','akaike'] },
  { id:'c3', name:'岡崎までおでかけ', price:8000, desc:'刈谷・安城を通って岡崎まで東海道本線でおでかけ。',
    lines:['tokaido'], stationIds:['kariya','anjo','okazaki'] },
  { id:'c4', name:'名古屋地下たんけん', price:12000, desc:'東山線に乗って名古屋の地下をたんけん。',
    lines:['higashiyama'], stationIds:['takabata','fushimi','sakae','nagoya','fujigaoka'] },
  { id:'c5', name:'三河湾ぐるりツアー', price:18000, desc:'豊橋から知立を通って碧南まで、名鉄でぐるり。',
    lines:['meitetsu-nagoya','mikawa'], stationIds:['toyohashi','higashi-okazaki','chiryu','jingu-mae','meitetsu-nagoya','hekinan'] },
  { id:'c6', name:'桑名・四日市の旅', price:25000, desc:'関西本線と近鉄でまわる三重県の旅。',
    lines:['kansai','kintetsu-nagoya'], stationIds:['hatta','kuwana','yokkaichi','kameyama','kintetsu-nagoya','tsu'] },
  { id:'c7', name:'中央線秘境ツアー', price:35000, desc:'千種から中津川まで、山あいの中央本線を制覇。',
    lines:['chuo'], stationIds:['chikusa','kozoji','tajimi','toki','ena','nakatsugawa'] },
  { id:'c8', name:'新幹線ぴゅーん', price:50000, desc:'のぞみ・ひかりで豊橋から岐阜羽島まで一気にワープ。',
    lines:['shinkansen'], stationIds:['toyohashi','mikawa-anjo','gifu-hashima'] },
  { id:'c9', name:'東海道本線コンプリート', price:70000, desc:'豊橋から岐阜まで、東海道本線を端から端まで完全制覇。',
    lines:['tokaido'], stationIds:['toyohashi','gamagori','okazaki','anjo','kariya','obu','atsuta','nagoya','owari-ichinomiya','gifu'] },
  { id:'c10', name:'東海オールスター大旅行', price:100000, desc:'名鉄岐阜・武豊など、残った駅を全部まわる東海制覇の総仕上げ。',
    lines:['meitetsu-nagoya','taketoyo'], stationIds:['meitetsu-gifu','taketoyo','meitetsu-nagoya','nagoya','chiryu'] },
];

function allTokaiStationIds() {
  const s = new Set();
  TOKAI_LINES.forEach(l => l.stations.forEach(st => s.add(st.id)));
  return [...s];
}

// ── 記念メダルSVG（路線カラーで色分け） ──
function buildMedalSVG(line, size=32) {
  return `<svg viewBox="0 0 40 40" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="${line.color}" stroke="#fff" stroke-width="2"/>
    <circle cx="20" cy="20" r="13" fill="#fffdf5"/>
    <text x="20" y="26" font-size="15" text-anchor="middle">🚃</text>
  </svg>`;
}

// ── 路線図（デフォルメ）レンダリング ──
function renderRouteMap() {
  const visited = new Set(S.trainProgress.visitedStations);
  let svg = `<svg viewBox="0 0 900 700" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#1a1410;border-radius:12px">`;
  TOKAI_LINES.forEach(line => {
    let d = '';
    line.stations.forEach((st, i) => {
      const p = STATION_POS[st.id];
      if (!p) return;
      d += (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1] + ' ';
    });
    const conquered = line.stations.every(st => visited.has(st.id));
    svg += `<path d="${d}" stroke="${line.color}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${conquered ? 1 : 0.55}"/>`;
  });
  const drawn = new Set();
  TOKAI_LINES.forEach(line => {
    line.stations.forEach(st => {
      if (drawn.has(st.id)) return;
      drawn.add(st.id);
      const p = STATION_POS[st.id];
      if (!p) return;
      const isVisited = visited.has(st.id);
      svg += `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="${isVisited ? '#ffd700' : '#3a3028'}" stroke="${isVisited ? '#fff' : '#5a4f42'}" stroke-width="2"/>`;
      svg += `<text x="${p[0]}" y="${p[1]-12}" font-size="13" fill="${isVisited ? '#fff' : '#8a7d6c'}" text-anchor="middle" font-family="sans-serif">${esc(st.name)}</text>`;
    });
  });
  svg += '</svg>';
  return svg;
}

function renderLineLegend() {
  const visited = new Set(S.trainProgress.visitedStations);
  return TOKAI_LINES.map(line => {
    const total = line.stations.length;
    const got = line.stations.filter(st => visited.has(st.id)).length;
    const conquered = got === total;
    return `<div style="display:flex;align-items:center;gap:8px;padding:6px 4px">
      <div style="width:12px;height:12px;border-radius:50%;background:${line.color};flex-shrink:0"></div>
      <div style="flex:1;font-size:.78rem;color:#3a2e4a">${esc(line.name)}</div>
      <div style="font-size:.72rem;font-weight:700;color:${conquered ? '#f0b000' : '#9a8caa'}">${conquered ? '🏆 せいはしたよ！' : `${got}/${total}えき`}</div>
    </div>`;
  }).join('');
}

// ── コースショップ ──
function renderCourseShop() {
  const riddenLines = new Set(S.trainProgress.riddenLines);
  return TRAIN_COURSES.map(course => {
    const newLines = course.lines.filter(id => !riddenLines.has(id));
    const affordable = S.coins >= course.price;
    return `<div style="background:#fdf8f0;border:1px solid #e0d5c0;border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:4px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:.85rem;font-weight:700;color:#2d2040">${esc(course.name)}</div>
        <div style="font-size:.82rem;font-weight:800;color:#c08000">¥${course.price.toLocaleString()}</div>
      </div>
      <div style="font-size:.72rem;color:#c08040;line-height:1.5">${esc(course.desc)}</div>
      ${newLines.length > 0 ? `<div style="font-size:.68rem;color:#c06010">🎖 はじめての路線メダル ${newLines.length}こもらえるよ！</div>` : ''}
      <button onclick="buyTrainCourse('${course.id}')" ${affordable ? '' : 'disabled'} style="margin-top:4px;padding:7px;border-radius:99px;border:none;background:${affordable ? '#e07830' : '#ccc'};color:#fff;font-size:.78rem;font-weight:700;font-family:inherit;cursor:${affordable ? 'pointer' : 'not-allowed'}">${affordable ? 'このコースでたびにでるよ' : 'おかねがたりないよ'}</button>
    </div>`;
  }).join('');
}

function renderTrainJourney() {
  const total = allTokaiStationIds().length;
  const got = S.trainProgress.visitedStations.length;
  const pct = Math.round((got / total) * 100);
  const mapEl = document.getElementById('train-map');
  if (mapEl) mapEl.innerHTML = renderRouteMap();
  const legendEl = document.getElementById('train-legend');
  if (legendEl) legendEl.innerHTML = renderLineLegend();
  const progEl = document.getElementById('train-progress-text');
  if (progEl) progEl.textContent = `とうかいせいは：${got}/${total}えき（${pct}%）`;
  const shopEl = document.getElementById('train-course-shop');
  if (shopEl) shopEl.innerHTML = renderCourseShop();
}

function openTrainJourney() {
  document.getElementById('train-journey-modal').style.display = 'flex';
  renderTrainJourney();
}
function closeTrainJourney() {
  document.getElementById('train-journey-modal').style.display = 'none';
}

async function buyTrainCourse(courseId) {
  const course = TRAIN_COURSES.find(c => c.id === courseId);
  if (!course) return;
  if (S.coins < course.price) { showToast('おかねがたりないよ…'); return; }

  S.coins -= course.price;
  const visited = new Set(S.trainProgress.visitedStations);
  course.stationIds.forEach(id => visited.add(id));
  S.trainProgress.visitedStations = [...visited];

  const ridden = new Set(S.trainProgress.riddenLines);
  const newMedals = [];
  course.lines.forEach(lineId => {
    if (!ridden.has(lineId)) {
      ridden.add(lineId);
      const line = TOKAI_LINES.find(l => l.id === lineId);
      if (line) newMedals.push(line);
    }
  });
  S.trainProgress.riddenLines = [...ridden];
  S.trainProgress.toursDone.unshift({ courseId: course.id, name: course.name, price: course.price, at: Date.now() });
  S.trainProgress.toursDone = S.trainProgress.toursDone.slice(0, 50);

  newMedals.forEach(line => {
    S.collection.unshift({ type: 'medal', name: `${line.name} きねんメダル`, lineId: line.id, lineColor: line.color, obtainedAt: Date.now() });
  });

  await saveShared({ coins: S.coins, collection: JSON.stringify(S.collection) });
  await saveState(); // trainProgressを含む通常フィールドの保存

  updateHeader();
  renderTrainJourney();
  updateCollectionBadge();

  if (newMedals.length > 0) {
    showToast(`✨「${course.name}」でたびにでて、きねんメダルを${newMedals.length}こゲットしたよ！`);
    typeText(`わあ！${newMedals.map(l => l.name).join('・')}にのったよ！`);
  } else {
    showToast(`✨「${course.name}」のたびからかえってきたよ！`);
    typeText('たのしいたびだったよ！またいくよ！');
  }
  bounce();
}
