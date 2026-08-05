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
// 実際の緯度経度（OpenStreetMapデータ）を投影して算出した座標をベースに、
// 名古屋駅まわりの密集駅だけ視認性のために少しずらしてある
const STATION_POS = {
  gifu:[287,129], 'owari-ichinomiya':[317,210], nagoya:[380,310], atsuta:[401,341],
  obu:[439,432], kariya:[474,446], anjo:[532,469], okazaki:[584,495], gamagori:[635,573], toyohashi:[751,618],
  chikusa:[430,300], kozoji:[500,239], tajimi:[557,185], toki:[603,166], ena:[770,94], nakatsugawa:[840,60],
  hatta:[345,345], kuwana:[233,388], yokkaichi:[193,467], kameyama:[60,552],
  'kintetsu-nagoya':[340,285], tsu:[104,640],
  higashiura:[445,477], handa:[416,519], taketoyo:[409,550],
  'mikawa-anjo':[513,461], 'gifu-hashima':[235,200],
  'higashi-okazaki':[592,475], chiryu:[497,434], 'jingu-mae':[420,360], 'meitetsu-nagoya':[320,330], 'meitetsu-gifu':[310,140],
  sanage:[600,346], 'toyota-shi':[583,373], hekinan:[457,534],
  akaike:[481,347],
  takabata:[359,375], fushimi:[415,285], sakae:[460,295], fujigaoka:[483,301],
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
  { cx:540, cy:260, rx:460, ry:300 }, // 北〜中央（中央線方面を含む広め）
  { cx:560, cy:480, rx:350, ry:190 }, // 東海道本線・三河/豊田の東西帯
  { cx:200, cy:420, rx:230, ry:280 }, // 岐阜・三重方面
  { cx:430, cy:495, rx:90,  ry:100 }, // 知多半島のつけね
  { cx:410, cy:555, rx:55,  ry:55  }, // 知多半島の先端
];

// 山アイコン（雰囲気だけの飾り）
const MOUNTAIN_ICONS = [ [560,220], [630,170], [700,250], [130,250] ];

// ── 旅行コース商品（¥3,000〜¥30,000。今は東海地方のみなのでこの範囲に収める）。路線をどう辿るかはお任せ設計、重複あり ──
// 高い金額のコースほど、道中で乗り換える路線・車両の種類が多くなるようにして、値段に見合うだけメダルがもらえるようにしてある
const TRAIN_COURSES = [
  { id:'c1', name:'となりまちさんぽ', price:3000, desc:'大府から半田までのんびり各駅停車の旅。',
    lines:['taketoyo'], stationIds:['obu','higashiura','handa'], vehicles:['jr-local'] },
  { id:'c2', name:'豊田市内ぶらり旅', price:5000, desc:'猿投・豊田市・赤池をまわるミニトリップ。',
    lines:['mikawa','toyota-line'], stationIds:['sanage','toyota-shi','akaike'], vehicles:['meitetsu-local'] },
  { id:'c3', name:'岡崎までおでかけ', price:7000, desc:'刈谷・安城を通って岡崎まで東海道本線でおでかけ。',
    lines:['tokaido'], stationIds:['kariya','anjo','okazaki'], vehicles:['jr-rapid'] },
  { id:'c4', name:'名古屋地下たんけん', price:9000, desc:'東山線に乗って名古屋の地下をたんけん。',
    lines:['higashiyama'], stationIds:['takabata','fushimi','sakae','nagoya','fujigaoka'], vehicles:['subway'] },
  { id:'c5', name:'三河湾ぐるりツアー', price:13000, desc:'豊橋から知立を通って碧南まで、名鉄の特急とふつうを乗り継いでぐるり。',
    lines:['meitetsu-nagoya','mikawa'], stationIds:['toyohashi','higashi-okazaki','chiryu','jingu-mae','meitetsu-nagoya','hekinan'], vehicles:['meitetsu-express','meitetsu-local'] },
  { id:'c6', name:'桑名・四日市の旅', price:16000, desc:'関西本線のふつうと近鉄特急を乗り継いでまわる三重県の旅。',
    lines:['kansai','kintetsu-nagoya'], stationIds:['hatta','kuwana','yokkaichi','kameyama','kintetsu-nagoya','tsu'], vehicles:['jr-local','kintetsu-express'] },
  { id:'c7', name:'中央線秘境ツアー', price:19000, desc:'千種から中津川まで、ふつうとしなのを乗り継いで山あいの中央本線を制覇。',
    lines:['chuo'], stationIds:['chikusa','kozoji','tajimi','toki','ena','nakatsugawa'], vehicles:['jr-local','jr-ltdexpress'] },
  { id:'c8', name:'新幹線ぴゅーん', price:22000, desc:'のぞみ・ひかりで豊橋から岐阜羽島まで一気にワープ。',
    lines:['shinkansen'], stationIds:['toyohashi','mikawa-anjo','gifu-hashima'], vehicles:['shinkansen'] },
  { id:'c9', name:'東海道本線コンプリート', price:26000, desc:'豊橋から岐阜まで、ふつう・かいそく・新快速を乗り継いで東海道本線を端から端まで完全制覇。',
    lines:['tokaido'], stationIds:['toyohashi','gamagori','okazaki','anjo','kariya','obu','atsuta','nagoya','owari-ichinomiya','gifu'], vehicles:['jr-local','jr-rapid','jr-shinkaisoku'] },
  { id:'c10', name:'東海オールスター大旅行', price:30000, desc:'名鉄岐阜・武豊など、残った駅を全部まわる東海制覇の総仕上げ。これまで乗り残した車両のメダルも全部もらえるスペシャルコース。',
    lines:['meitetsu-nagoya','taketoyo'], stationIds:['meitetsu-gifu','taketoyo','meitetsu-nagoya','nagoya','chiryu'],
    vehicles:['jr-local','meitetsu-local','jr-rapid','subway','meitetsu-express','kintetsu-express','jr-ltdexpress','shinkansen','jr-shinkaisoku','myusky'] },
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
  return `<div id="train-map-inner" style="position:absolute;top:0;left:0;transform-origin:0 0;will-change:transform">${svg}</div>`;
}

// ── 路線図：ピンチズーム & ドラッグパン ──
const mapZoomState = { scale: 1, tx: 0, ty: 0, minScale: 1, maxScale: 3 };
const mapPointers = new Map();
let mapPanStart = null;   // { x, y, tx, ty }（1本指ドラッグ用）
let mapPinch = null;      // { dist, scale, midX, midY, tx, ty }（2本指ピンチ用）

function clampMapTransform() {
  const mapEl = document.getElementById('train-map');
  if (!mapEl) return;
  const cw = mapEl.clientWidth, ch = mapEl.clientHeight;
  const iw = 1440 * mapZoomState.scale, ih = 1120 * mapZoomState.scale;
  const minTx = Math.min(0, cw - iw), minTy = Math.min(0, ch - ih);
  mapZoomState.tx = Math.max(minTx, Math.min(0, mapZoomState.tx));
  mapZoomState.ty = Math.max(minTy, Math.min(0, mapZoomState.ty));
}

function applyMapTransform() {
  const inner = document.getElementById('train-map-inner');
  if (!inner) return;
  clampMapTransform();
  inner.style.transform = `translate(${mapZoomState.tx}px, ${mapZoomState.ty}px) scale(${mapZoomState.scale})`;
}

function zoomMapAt(px, py, newScale) {
  newScale = Math.max(mapZoomState.minScale, Math.min(mapZoomState.maxScale, newScale));
  const ratio = newScale / mapZoomState.scale;
  mapZoomState.tx = px - (px - mapZoomState.tx) * ratio;
  mapZoomState.ty = py - (py - mapZoomState.ty) * ratio;
  mapZoomState.scale = newScale;
  applyMapTransform();
}

function initMapPanZoom() {
  const mapEl = document.getElementById('train-map');
  if (!mapEl || mapEl.dataset.pzInit) return;
  mapEl.dataset.pzInit = '1';

  mapEl.addEventListener('pointerdown', e => {
    try { mapEl.setPointerCapture(e.pointerId); } catch (err) { /* 2本目のタッチなどでは失敗することがあるが追跡には影響しない */ }
    mapPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (mapPointers.size === 1) {
      mapPanStart = { x: e.clientX, y: e.clientY, tx: mapZoomState.tx, ty: mapZoomState.ty };
      mapPinch = null;
    } else if (mapPointers.size === 2) {
      const pts = [...mapPointers.values()];
      const rect = mapEl.getBoundingClientRect();
      mapPinch = {
        dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        scale: mapZoomState.scale,
        midX: (pts[0].x + pts[1].x) / 2 - rect.left,
        midY: (pts[0].y + pts[1].y) / 2 - rect.top,
        tx: mapZoomState.tx, ty: mapZoomState.ty,
      };
      mapPanStart = null;
    }
  });

  mapEl.addEventListener('pointermove', e => {
    if (!mapPointers.has(e.pointerId)) return;
    mapPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (mapPointers.size === 1 && mapPanStart) {
      mapZoomState.tx = mapPanStart.tx + (e.clientX - mapPanStart.x);
      mapZoomState.ty = mapPanStart.ty + (e.clientY - mapPanStart.y);
      applyMapTransform();
    } else if (mapPointers.size === 2 && mapPinch) {
      const pts = [...mapPointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const newScale = Math.max(mapZoomState.minScale, Math.min(mapZoomState.maxScale, mapPinch.scale * (dist / mapPinch.dist)));
      const ratio = newScale / mapPinch.scale;
      mapZoomState.tx = mapPinch.midX - (mapPinch.midX - mapPinch.tx) * ratio;
      mapZoomState.ty = mapPinch.midY - (mapPinch.midY - mapPinch.ty) * ratio;
      mapZoomState.scale = newScale;
      applyMapTransform();
    }
  });

  const endPointer = e => {
    mapPointers.delete(e.pointerId);
    if (mapPointers.size === 1) {
      const [p] = [...mapPointers.values()];
      mapPanStart = { x: p.x, y: p.y, tx: mapZoomState.tx, ty: mapZoomState.ty };
      mapPinch = null;
    } else if (mapPointers.size === 0) {
      mapPanStart = null;
      mapPinch = null;
    }
  };
  mapEl.addEventListener('pointerup', endPointer);
  mapEl.addEventListener('pointercancel', endPointer);
  mapEl.addEventListener('pointerleave', endPointer);

  // ダブルタップ／ダブルクリックでズームイン⇔リセット
  let lastTapAt = 0, lastTapPos = null;
  mapEl.addEventListener('pointerup', e => {
    const now = Date.now();
    const nearLast = lastTapPos && Math.hypot(e.clientX - lastTapPos.x, e.clientY - lastTapPos.y) < 30;
    if (now - lastTapAt < 300 && nearLast) {
      const rect = mapEl.getBoundingClientRect();
      zoomMapAt(e.clientX - rect.left, e.clientY - rect.top, mapZoomState.scale > 1.4 ? 1 : 2);
      lastTapAt = 0;
    } else {
      lastTapAt = now;
      lastTapPos = { x: e.clientX, y: e.clientY };
    }
  });

  // マウスホイールでもズーム（PC確認用）
  mapEl.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = mapEl.getBoundingClientRect();
    zoomMapAt(e.clientX - rect.left, e.clientY - rect.top, mapZoomState.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
  }, { passive: false });
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
    const newVehicles = course.vehicles.filter(id => !riddenVehicles.has(id));
    const affordable = S.coins >= course.price;
    const vehicleNames = course.vehicles.map(id => VEHICLE_TYPES[id].name).join('・');
    const medalIcons = course.vehicles.map(id => buildVehicleMedalSVG(id, 32)).join('');
    return `<div style="background:#fdf8f0;border:1px solid #e0d5c0;border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:.85rem;font-weight:700;color:#2d2040">${esc(course.name)}</div>
        <div style="font-size:.82rem;font-weight:800;color:#c08000">¥${course.price.toLocaleString()}</div>
      </div>
      <div style="font-size:.72rem;color:#7a6a9a;line-height:1.5">${esc(course.desc)}</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${medalIcons}</div>
      <div style="font-size:.68rem;color:#c06010">🚃 ${esc(vehicleNames)}${newLines.length > 0 ? ` ・ 🎖路線メダル${newLines.length}個` : ''}${newVehicles.length > 0 ? ` ・ 🎖車両メダル${newVehicles.length}個` : ''}</div>
      <button onclick="buyTrainCourse('${course.id}')" ${affordable ? '' : 'disabled'} style="margin-top:2px;padding:7px;border-radius:99px;border:none;background:${affordable ? '#7c5cbf' : '#ccc'};color:#fff;font-size:.78rem;font-weight:700;font-family:inherit;cursor:${affordable ? 'pointer' : 'not-allowed'}">${affordable ? 'このコースで旅に出るぼ' : 'お金が足りないぼ'}</button>
    </div>`;
  }).join('');
}

function renderTrainJourney() {
  const total = allTokaiStationIds().length;
  const got = S.trainProgress.visitedStations.length;
  const pct = Math.round((got / total) * 100);
  const mapEl = document.getElementById('train-map');
  if (mapEl) mapEl.innerHTML = renderRouteMap();
  applyMapTransform();
  const legendEl = document.getElementById('train-legend');
  if (legendEl) legendEl.innerHTML = renderLineLegend();
  const progEl = document.getElementById('train-progress-text');
  if (progEl) progEl.textContent = `東海制覇：${got}/${total}駅（${pct}%）`;
  const shopEl = document.getElementById('train-course-shop');
  if (shopEl) shopEl.innerHTML = renderCourseShop();
}

function openTrainJourney() {
  document.getElementById('train-journey-modal').style.display = 'flex';
  initMapPanZoom();
  renderTrainJourney();
  // 最初は名古屋あたりが見えるように拡大率・位置を合わせる
  const mapEl = document.getElementById('train-map');
  if (mapEl) {
    const scale = 1440 / 900;
    const nx = STATION_POS.nagoya[0] * scale;
    const ny = STATION_POS.nagoya[1] * scale;
    mapZoomState.scale = 1;
    mapZoomState.tx = mapEl.clientWidth / 2 - nx;
    mapZoomState.ty = mapEl.clientHeight / 2 - ny;
    applyMapTransform();
  }
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

    // 出発演出は代表として1本目の車両の見た目を使う（複数車両でも文言では全部紹介する）
    const v = course.vehicles && course.vehicles.length ? VEHICLE_TYPES[course.vehicles[0]] : null;
    const color = v ? v.plate : '#6B9B4F';
    if (body) body.setAttribute('fill', color);
    if (nose) nose.setAttribute('fill', color);
    const vehicleNames = course.vehicles && course.vehicles.length ? course.vehicles.map(id => VEHICLE_TYPES[id].name).join('・') : '電車';
    if (label) label.textContent = `${vehicleNames}にのって「${course.name}」へしゅっぱつ！`;

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
  const newVehicles = (course.vehicles || []).filter(id => !riddenVehicles.has(id));
  newVehicles.forEach(id => riddenVehicles.add(id));
  S.trainProgress.riddenVehicles = [...riddenVehicles];

  S.trainProgress.toursDone.unshift({ courseId: course.id, name: course.name, price: course.price, at: Date.now() });
  S.trainProgress.toursDone = S.trainProgress.toursDone.slice(0, 50);

  newMedals.forEach(line => {
    S.collection.unshift({ type: 'medal', name: `${line.name} 記念メダル`, lineId: line.id, lineColor: line.color, obtainedAt: Date.now() });
  });
  newVehicles.forEach(vehicleId => {
    const v = VEHICLE_TYPES[vehicleId];
    S.collection.unshift({ type: 'vehicle-medal', name: `${v.name} メダル`, vehicleId, obtainedAt: Date.now() });
  });

  await saveShared({ coins: S.coins, collection: JSON.stringify(S.collection) });
  await saveState(); // trainProgressを含む通常フィールドの保存

  updateHeader();
  renderTrainJourney();
  updateCollectionBadge();

  const gotCount = newMedals.length + newVehicles.length;
  if (gotCount > 0) {
    showToast(`✨「${course.name}」で旅に出て、メダルを${gotCount}個ゲットしたぼ！`);
    const names = [...newMedals.map(l => l.name), ...newVehicles.map(id => VEHICLE_TYPES[id].name)];
    typeText(`ぎゃぼー！${names.join('・')}に乗ったぼ！`);
  } else {
    showToast(`✨「${course.name}」の旅から帰ってきたぼ！`);
    typeText('楽しい旅だったぼ！また行くぼ！');
  }
  bounce();
}
