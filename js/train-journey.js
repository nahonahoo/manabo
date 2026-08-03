// ==== manabo / train-journey.js ====
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

// 駅名のふりがな
const STATION_READING = {
  gifu:'ぎふ', 'owari-ichinomiya':'おわりいちのみや', nagoya:'なごや', atsuta:'あつた',
  obu:'おおぶ', kariya:'かりや', anjo:'あんじょう', okazaki:'おかざき', gamagori:'がまごおり', toyohashi:'とよはし',
  chikusa:'ちくさ', kozoji:'こうぞうじ', tajimi:'たじみ', toki:'ときし', ena:'えな', nakatsugawa:'なかつがわ',
  hatta:'はった', kuwana:'くわな', yokkaichi:'よっかいち', kameyama:'かめやま',
  'kintetsu-nagoya':'きんてつなごや', tsu:'つ',
  higashiura:'ひがしうら', handa:'はんだ', taketoyo:'たけとよ',
  'mikawa-anjo':'みかわあんじょう', 'gifu-hashima':'ぎふはしま',
  'higashi-okazaki':'ひがしおかざき', chiryu:'ちりゅう', 'jingu-mae':'じんぐうまえ', 'meitetsu-nagoya':'めいてつなごや', 'meitetsu-gifu':'めいてつぎふ',
  sanage:'さなげ', 'toyota-shi':'とよたし', hekinan:'へきなん',
  akaike:'あかいけ',
  takabata:'たかばた', fushimi:'ふしみ', sakae:'さかえ', fujigaoka:'ふじがおか',
};

// 路線図の背景（ざっくりした地形）。楕円を重ねて東海地方っぽいシルエットにする
const LAND_SHAPE = [
  { cx:450, cy:250, rx:440, ry:230 }, // 北側（中央線方面）
  { cx:450, cy:420, rx:440, ry:110 }, // メインの東西帯（東海道本線）
  { cx:250, cy:460, rx:190, ry:100 }, // 名古屋南（地下鉄クラスター）
  { cx:430, cy:480, rx:75,  ry:55  }, // 知多半島のつけね
  { cx:420, cy:590, rx:60,  ry:100 }, // 知多半島
  { cx:415, cy:665, rx:45,  ry:45  }, // 知多半島の先端
  { cx:210, cy:470, rx:100, ry:60  }, // 三重方面のつけね
  { cx:260, cy:560, rx:120, ry:80  }, // 三重方面
  { cx:290, cy:635, rx:100, ry:55  }, // 三重方面の南
  { cx:580, cy:580, rx:150, ry:110 }, // 三河・豊田方面の内陸
];

// 山アイコン（雰囲気だけの飾り）
const MOUNTAIN_ICONS = [ [560,220], [630,170], [700,250], [130,250] ];

// ── 旅行コース商品（¥3,000〜¥100,000）。路線をどう辿るかはお任せ設計、重複あり ──
const TRAIN_COURSES = [
  { id:'c1', name:'となりまちさんぽ', price:3000, desc:'大府から半田までのんびり各駅停車の旅。',
    lines:['taketoyo'], stationIds:['obu','higashiura','handa'], vehicle:'jr-local' },
  { id:'c2', name:'豊田市内ぶらり旅', price:5000, desc:'猿投・豊田市・赤池をまわるミニトリップ。',
    lines:['mikawa','toyota-line'], stationIds:['sanage','toyota-shi','akaike'], vehicle:'meitetsu-local' },
  { id:'c3', name:'岡崎までおでかけ', price:8000, desc:'刈谷・安城を通って岡崎まで東海道本線でおでかけ。',
    lines:['tokaido'], stationIds:['kariya','anjo','okazaki'], vehicle:'jr-rapid' },
  { id:'c4', name:'名古屋地下たんけん', price:12000, desc:'東山線に乗って名古屋の地下をたんけん。',
    lines:['higashiyama'], stationIds:['takabata','fushimi','sakae','nagoya','fujigaoka'], vehicle:'subway' },
  { id:'c5', name:'三河湾ぐるりツアー', price:18000, desc:'豊橋から知立を通って碧南まで、名鉄でぐるり。',
    lines:['meitetsu-nagoya','mikawa'], stationIds:['toyohashi','higashi-okazaki','chiryu','jingu-mae','meitetsu-nagoya','hekinan'], vehicle:'meitetsu-express' },
  { id:'c6', name:'桑名・四日市の旅', price:25000, desc:'関西本線と近鉄でまわる三重県の旅。',
    lines:['kansai','kintetsu-nagoya'], stationIds:['hatta','kuwana','yokkaichi','kameyama','kintetsu-nagoya','tsu'], vehicle:'kintetsu-express' },
  { id:'c7', name:'中央線秘境ツアー', price:35000, desc:'千種から中津川まで、山あいの中央本線を制覇。',
    lines:['chuo'], stationIds:['chikusa','kozoji','tajimi','toki','ena','nakatsugawa'], vehicle:'jr-ltdexpress' },
  { id:'c8', name:'新幹線ぴゅーん', price:50000, desc:'のぞみ・ひかりで豊橋から岐阜羽島まで一気にワープ。',
    lines:['shinkansen'], stationIds:['toyohashi','mikawa-anjo','gifu-hashima'], vehicle:'shinkansen' },
  { id:'c9', name:'東海道本線コンプリート', price:70000, desc:'豊橋から岐阜まで、東海道本線を端から端まで完全制覇。',
    lines:['tokaido'], stationIds:['toyohashi','gamagori','okazaki','anjo','kariya','obu','atsuta','nagoya','owari-ichinomiya','gifu'], vehicle:'jr-shinkaisoku' },
  { id:'c10', name:'東海オールスター大旅行', price:100000, desc:'名鉄岐阜・武豊など、残った駅を全部まわる東海制覇の総仕上げ。',
    lines:['meitetsu-nagoya','taketoyo'], stationIds:['meitetsu-gifu','taketoyo','meitetsu-nagoya','nagoya','chiryu'], vehicle:'myusky' },
];

// ── 車両メダル用データ（実在の名前・実在に近い配色でデザイン） ──
const VEHICLE_TYPES = {
  'jr-local':        { name:'ふつう',       plate:'#6B9B4F', band:null,      bandOpacity:0,    border:'#8a8a8a', textFill:'#ffffff', textStroke:'#6B9B4F', express:false, fontSize:14 },
  'meitetsu-local':   { name:'名鉄ふつう',   plate:'#C62030', band:null,      bandOpacity:0,    border:'#8a8a8a', textFill:'#ffffff', textStroke:'#C62030', express:false, fontSize:12 },
  'jr-rapid':        { name:'かいそく',     plate:'#ffffff', band:'#E8720C', bandOpacity:0.85, border:'#b0b0b0', textFill:'#7a3d00', textStroke:'#ffffff', express:true,  fontSize:13 },
  'subway':          { name:'N1000形',     plate:'#FFD400', band:'#2b2b2b', bandOpacity:0.22, border:'#555555', textFill:'#2b2b2b', textStroke:'#FFD400', express:false, fontSize:11 },
  'meitetsu-express': { name:'名鉄特急',    plate:'#E4002B', band:'#ffffff', bandOpacity:0.2,  border:'#b0b0b0', textFill:'#ffffff', textStroke:'#E4002B', express:true,  fontSize:12 },
  'kintetsu-express': { name:'ひのとり',    plate:'#6B1E3C', band:'#000000', bandOpacity:0.25, border:'#c9a227', textFill:'#f3d98a', textStroke:'#6B1E3C', express:true,  fontSize:13 },
  'jr-ltdexpress':   { name:'しなの',       plate:'#ffffff', band:'#2E7D32', bandOpacity:0.85, border:'#e8720c', textFill:'#1b4d1e', textStroke:'#ffffff', express:true,  fontSize:14 },
  shinkansen:        { name:'のぞみ',       plate:'#003DA5', band:'#ffffff', bandOpacity:0.15, border:'#d4a017', textFill:'#ffffff', textStroke:'#003DA5', express:true,  fontSize:14 },
  'jr-shinkaisoku':  { name:'新快速',       plate:'#ffffff', band:'#FF6B00', bandOpacity:0.9,  border:'#999999', textFill:'#7a3d00', textStroke:'#ffffff', express:false, fontSize:13 },
  myusky:            { name:'ミュースカイ', plate:'#F39800', band:'#ffffff', bandOpacity:0.3,  border:'#b8860b', textFill:'#ffffff', textStroke:'#F39800', express:true,  fontSize:12 },
};

// ── 車両メダルSVG（先頭車のオーバル型ネームプレート風） ──
function buildVehicleMedalSVG(vehicleId, size=32) {
  const v = VEHICLE_TYPES[vehicleId];
  if (!v) return '';
  const h = Math.round(size * 0.625);
  const band = v.band ? `<path d="M2,30 L62,10 L62,30 Z" fill="${v.band}" opacity="${v.bandOpacity}"/>` : '';
  const speedLines = v.express ? `
    <line x1="4" y1="14" x2="12" y2="12" stroke="${v.band && v.band !== v.plate ? v.band : '#ffffff'}" stroke-width="1.5" opacity="0.7"/>
    <line x1="4" y1="20" x2="14" y2="18" stroke="${v.band && v.band !== v.plate ? v.band : '#ffffff'}" stroke-width="1.5" opacity="0.5"/>` : '';
  return `<svg viewBox="0 0 64 40" width="${size}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="20" rx="31" ry="19" fill="${v.border}"/>
    <ellipse cx="32" cy="20" rx="29" ry="17" fill="${v.plate}"/>
    ${band}
    ${speedLines}
    <text x="32" y="25" font-size="${v.fontSize}" font-weight="900" fill="${v.textFill}" text-anchor="middle" font-family="sans-serif" letter-spacing="0.5" stroke="${v.textStroke}" stroke-width="3" style="paint-order:stroke">${esc(v.name)}</text>
  </svg>`;
}

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
  // 実寸を大きめに描画して、指でスクロールしながら見られるようにする（viewBoxは900x700のまま）
  let svg = `<svg viewBox="0 0 900 700" width="1440" height="1120" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:12px">`;
  // 海（背景）
  svg += `<rect x="0" y="0" width="900" height="700" fill="#6ec6e8"/>`;
  // 陸地（ざっくりした地形。楕円を重ねて東海地方っぽいシルエットに）
  LAND_SHAPE.forEach(e => {
    svg += `<ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" fill="#f5ecd4"/>`;
  });
  // 山アイコン（雰囲気だけ）
  MOUNTAIN_ICONS.forEach(([mx, my]) => {
    svg += `<path d="M${mx-14},${my+10} L${mx},${my-12} L${mx+14},${my+10} Z" fill="#8fbf7a" opacity="0.8"/>`;
  });
  TOKAI_LINES.forEach(line => {
    let d = '';
    line.stations.forEach((st, i) => {
      const p = STATION_POS[st.id];
      if (!p) return;
      d += (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1] + ' ';
    });
    const conquered = line.stations.every(st => visited.has(st.id));
    svg += `<path d="${d}" stroke="${line.color}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${conquered ? 1 : 0.6}"/>`;
  });
  const drawn = new Set();
  TOKAI_LINES.forEach(line => {
    line.stations.forEach(st => {
      if (drawn.has(st.id)) return;
      drawn.add(st.id);
      const p = STATION_POS[st.id];
      if (!p) return;
      const isVisited = visited.has(st.id);
      const reading = STATION_READING[st.id] || '';
      svg += `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="${isVisited ? '#ffd700' : '#fffdf5'}" stroke="${isVisited ? '#c08000' : '#a89878'}" stroke-width="2"/>`;
      svg += `<text x="${p[0]}" y="${p[1]-23}" font-size="9" fill="${isVisited ? '#a06a00' : '#8a7d6c'}" text-anchor="middle" font-family="sans-serif">${esc(reading)}</text>`;
      svg += `<text x="${p[0]}" y="${p[1]-12}" font-size="13" font-weight="${isVisited ? '700' : '400'}" fill="${isVisited ? '#7a4a00' : '#6b5d4a'}" text-anchor="middle" font-family="sans-serif">${esc(st.name)}</text>`;
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
      <div style="font-size:.72rem;font-weight:700;color:${conquered ? '#f0b000' : '#9a8caa'}">${conquered ? '🏆 せいは！' : `${got}/${total}駅`}</div>
    </div>`;
  }).join('');
}

// ── コースショップ ──
function renderCourseShop() {
  const riddenLines = new Set(S.trainProgress.riddenLines);
  const riddenVehicles = new Set(S.trainProgress.riddenVehicles || []);
  return TRAIN_COURSES.map(course => {
    const newLines = course.lines.filter(id => !riddenLines.has(id));
    const newVehicle = course.vehicle && !riddenVehicles.has(course.vehicle);
    const affordable = S.coins >= course.price;
    const v = course.vehicle ? VEHICLE_TYPES[course.vehicle] : null;
    return `<div style="background:#fdf8f0;border:1px solid #e0d5c0;border-radius:10px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start">
      ${v ? `<div style="flex-shrink:0;margin-top:2px">${buildVehicleMedalSVG(course.vehicle, 44)}</div>` : ''}
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:.85rem;font-weight:700;color:#2d2040">${esc(course.name)}</div>
          <div style="font-size:.82rem;font-weight:800;color:#c08000">¥${course.price.toLocaleString()}</div>
        </div>
        <div style="font-size:.72rem;color:#7a6a9a;line-height:1.5">${esc(course.desc)}</div>
        <div style="font-size:.68rem;color:#c06010">${v ? `🚃 ${esc(v.name)}` : ''}${newLines.length > 0 ? ` ・ 🎖路線メダル${newLines.length}個` : ''}${newVehicle ? ' ・ 🎖車両メダル' : ''}</div>
        <button onclick="buyTrainCourse('${course.id}')" ${affordable ? '' : 'disabled'} style="margin-top:2px;padding:7px;border-radius:99px;border:none;background:${affordable ? '#7c5cbf' : '#ccc'};color:#fff;font-size:.78rem;font-weight:700;font-family:inherit;cursor:${affordable ? 'pointer' : 'not-allowed'}">${affordable ? 'このコースで旅に出るぼ' : 'お金が足りないぼ'}</button>
      </div>
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
  if (progEl) progEl.textContent = `東海制覇：${got}/${total}駅（${pct}%）`;
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

let trainTravelInProgress = false;

async function buyTrainCourse(courseId) {
  if (trainTravelInProgress) return;
  const course = TRAIN_COURSES.find(c => c.id === courseId);
  if (!course) return;
  if (S.coins < course.price) { showToast('お金が足りないぼ…'); return; }

  trainTravelInProgress = true;
  await playTrainAnimation(course);
  await finishTrainCourse(course);
  trainTravelInProgress = false;
}

// 電車が横切る出発アニメーション（約10秒）
function playTrainAnimation(course) {
  return new Promise(resolve => {
    const overlay = document.getElementById('train-travel-overlay');
    const wrap = document.getElementById('travel-train-wrap');
    const body = document.getElementById('travel-train-body');
    const nose = document.getElementById('travel-train-nose');
    const ties = document.getElementById('travel-ties');
    const clouds = document.getElementById('travel-clouds');
    const label = document.getElementById('travel-label');
    const pop = document.getElementById('travel-clack-pop');
    if (!overlay || !wrap) { resolve(); return; }

    const v = course.vehicle ? VEHICLE_TYPES[course.vehicle] : null;
    const color = v ? v.plate : '#6B9B4F';
    if (body) body.setAttribute('fill', color);
    if (nose) nose.setAttribute('fill', color);
    if (label) label.textContent = `${v ? v.name : '電車'}にのって「${course.name}」へしゅっぱつ！`;

    // アニメーションを最初から再生し直すため、いったんクラス/アニメーションをリセット
    [wrap, document.getElementById('travel-train'), ties, clouds].forEach(el => {
      if (!el) return;
      el.style.animation = 'none';
      void el.offsetWidth; // reflow
      el.style.animation = '';
    });

    overlay.style.display = 'flex';

    const words = ['ガタン', 'ゴトン', 'ガタン', 'ゴトン'];
    let wi = 0;
    const popTimer = setInterval(() => {
      if (!pop) return;
      pop.textContent = words[wi % words.length];
      pop.classList.remove('travel-clack-pop');
      void pop.offsetWidth;
      pop.classList.add('travel-clack-pop');
      wi++;
    }, 900);

    setTimeout(() => {
      clearInterval(popTimer);
      overlay.style.display = 'none';
      resolve();
    }, 9800);
  });
}

async function finishTrainCourse(course) {
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

  const riddenVehicles = new Set(S.trainProgress.riddenVehicles || []);
  const newVehicle = course.vehicle && !riddenVehicles.has(course.vehicle) ? course.vehicle : null;
  if (newVehicle) riddenVehicles.add(newVehicle);
  S.trainProgress.riddenVehicles = [...riddenVehicles];

  S.trainProgress.toursDone.unshift({ courseId: course.id, name: course.name, price: course.price, at: Date.now() });
  S.trainProgress.toursDone = S.trainProgress.toursDone.slice(0, 50);

  newMedals.forEach(line => {
    S.collection.unshift({ type: 'medal', name: `${line.name} 記念メダル`, lineId: line.id, lineColor: line.color, obtainedAt: Date.now() });
  });
  if (newVehicle) {
    const v = VEHICLE_TYPES[newVehicle];
    S.collection.unshift({ type: 'vehicle-medal', name: `${v.name} メダル`, vehicleId: newVehicle, obtainedAt: Date.now() });
  }

  await saveShared({ coins: S.coins, collection: JSON.stringify(S.collection) });
  await saveState(); // trainProgressを含む通常フィールドの保存

  updateHeader();
  renderTrainJourney();
  updateCollectionBadge();

  const gotCount = newMedals.length + (newVehicle ? 1 : 0);
  if (gotCount > 0) {
    showToast(`✨「${course.name}」で旅に出て、メダルを${gotCount}個ゲットしたぼ！`);
    const names = [...newMedals.map(l => l.name), ...(newVehicle ? [VEHICLE_TYPES[newVehicle].name] : [])];
    typeText(`ぎゃぼー！${names.join('・')}に乗ったぼ！`);
  } else {
    showToast(`✨「${course.name}」の旅から帰ってきたぼ！`);
    typeText('楽しい旅だったぼ！また行くぼ！');
  }
  bounce();
}
