// まなぼ王国アイテムデータベース 300個
// rarity: 0=失敗作, 1=ふつう, 2=価値あり, 3=レア, 4=伝説
// price: 円
// cat: 武器/食べ物/本/謎/生き物/乗り物/アクセサリー/雑誌/お菓子/ぬいぐるみ/ロボット/チケット/ゲーム/家具/その他

const ITEMS = [
// ── 失敗作 rarity:0 (0〜50円) 60個 ──
{id:1,name:"こげたパン",desc:"真っ黒に焦げている。食べると炭の味がする。",cat:"食べ物",rarity:0,price:3},
{id:2,name:"なんか溶けた何か",desc:"何かが溶けた跡。元が何だったか不明。",cat:"謎",rarity:0,price:0},
{id:3,name:"折れた剣（柄だけ）",desc:"刃の部分が完全にない。ただの持ち手。",cat:"武器",rarity:0,price:5},
{id:4,name:"読めない巻物",desc:"文字が全部にじんでいる。解読不能。",cat:"本",rarity:0,price:2},
{id:5,name:"まずいポーション（紫）",desc:"飲むと3分間げっぷが止まらない。",cat:"謎",rarity:0,price:8},
{id:6,name:"しおれた花",desc:"もう咲かない花。でもかすかにいい香り。",cat:"生き物",rarity:0,price:1},
{id:7,name:"壊れたロボット",desc:"電源を入れると「エラー」と言って止まる。",cat:"ロボット",rarity:0,price:10},
{id:8,name:"失敗したぬいぐるみ",desc:"目が3つある。体がいびつ。なぜか愛おしい。",cat:"ぬいぐるみ",rarity:0,price:15},
{id:9,name:"消えかけのゲーム",desc:"セーブデータが壊れている。最初からしかできない。",cat:"ゲーム",rarity:0,price:20},
{id:10,name:"ぐにゃぐにゃの椅子",desc:"座ると沈みすぎて立てなくなる。",cat:"家具",rarity:0,price:30},
{id:11,name:"溶けたアイス",desc:"もう液体。カップに入った謎の甘い水。",cat:"食べ物",rarity:0,price:0},
{id:12,name:"読めない説明書",desc:"全部記号で書いてある。",cat:"本",rarity:0,price:1},
{id:13,name:"錆びた鎧の一部",desc:"どこの部分かわからない金属の欠片。",cat:"アクセサリー",rarity:0,price:5},
{id:14,name:"なぜか湿っている本",desc:"全ページ波打っている。内容は不明。",cat:"本",rarity:0,price:3},
{id:15,name:"ぼろぼろの雑誌",desc:"去年の特集号。付録がない。",cat:"雑誌",rarity:0,price:10},
{id:16,name:"失敗した飴",desc:"形が崩れている。味は謎。",cat:"お菓子",rarity:0,price:2},
{id:17,name:"動かない乗り物",desc:"エンジンがかからない何か。",cat:"乗り物",rarity:0,price:20},
{id:18,name:"まちがえて作ったもの",desc:"何を作ろうとしたのか本人も不明。",cat:"謎",rarity:0,price:0},
{id:19,name:"臭い靴下（片方）",desc:"なぜか片方しかない。",cat:"アクセサリー",rarity:0,price:1},
{id:20,name:"溶けたチョコレート",desc:"形が完全に崩壊。でも甘い。",cat:"お菓子",rarity:0,price:5},
{id:21,name:"折れた鉛筆",desc:"芯が出ていない。",cat:"道具",rarity:0,price:1},
{id:22,name:"穴あきバケツ",desc:"水が入らない。",cat:"道具",rarity:0,price:5},
{id:23,name:"乾いた絵の具セット",desc:"全色固まっている。",cat:"道具",rarity:0,price:10},
{id:24,name:"なぜか熱い石",desc:"触ると熱いが、火はついていない。",cat:"謎",rarity:0,price:3},
{id:25,name:"ちぎれたネックレス",desc:"真ん中で切れている。石は綺麗。",cat:"アクセサリー",rarity:0,price:8},
{id:26,name:"半分食べかけのお菓子",desc:"誰かが食べた形跡がある。",cat:"お菓子",rarity:0,price:0},
{id:27,name:"電池切れのロボット",desc:"電池を入れると動くかもしれない。",cat:"ロボット",rarity:0,price:15},
{id:28,name:"ほどけた毛糸玉",desc:"絡まりすぎてもう戻せない。",cat:"謎",rarity:0,price:2},
{id:29,name:"しぼんだ風船",desc:"空気が全部抜けている。",cat:"謎",rarity:0,price:1},
{id:30,name:"曲がったフォーク",desc:"なぜか90度に曲がっている。",cat:"道具",rarity:0,price:3},
{id:31,name:"消えないインクで書いた落書き",desc:"壁に貼ったら取れなくなる。注意。",cat:"本",rarity:0,price:5},
{id:32,name:"謎の粉末（無害）",desc:"分析したところ小麦粉だった。",cat:"謎",rarity:0,price:2},
{id:33,name:"ひび割れた水晶球",desc:"中は空洞。何も見えない。",cat:"謎",rarity:0,price:15},
{id:34,name:"音が出ないラッパ",desc:"吹いても無音。",cat:"道具",rarity:0,price:8},
{id:35,name:"逆さに育つ植物",desc:"なぜか根が上に出ている。でも元気。",cat:"生き物",rarity:0,price:20},
{id:36,name:"溶けかけたろうそく",desc:"一度も使っていないのに形が崩れている。",cat:"道具",rarity:0,price:5},
{id:37,name:"消えかけた地図",desc:"肝心な場所が消えている。",cat:"本",rarity:0,price:10},
{id:38,name:"バグったゲームソフト",desc:"起動すると必ずフリーズする。",cat:"ゲーム",rarity:0,price:0},
{id:39,name:"倒れやすい家具",desc:"触ると即倒れる。",cat:"家具",rarity:0,price:10},
{id:40,name:"なぜか透明な石",desc:"ガラスかも。",cat:"謎",rarity:0,price:3},
{id:41,name:"しゃべらないぬいぐるみ",desc:"しゃべるはずなのに電池を入れても無言。",cat:"ぬいぐるみ",rarity:0,price:20},
{id:42,name:"混ざりすぎたジュース",desc:"何を混ぜたか不明。色が茶色。",cat:"食べ物",rarity:0,price:0},
{id:43,name:"全ページ同じ本",desc:"1ページ目と全部同じ内容が書いてある。",cat:"本",rarity:0,price:5},
{id:44,name:"鍵のない宝箱",desc:"開かない。中身は不明。",cat:"謎",rarity:0,price:30},
{id:45,name:"切れないはさみ",desc:"紙が切れない。",cat:"道具",rarity:0,price:5},
{id:46,name:"描けない筆",desc:"毛が全部抜けている。",cat:"道具",rarity:0,price:2},
{id:47,name:"光らないランタン",desc:"油を入れても光らない。",cat:"道具",rarity:0,price:8},
{id:48,name:"縮んだセーター",desc:"洗濯したら子供サイズになった。",cat:"アクセサリー",rarity:0,price:10},
{id:49,name:"失敗した料理レシピ",desc:"このレシピ通り作ると必ず失敗する。",cat:"本",rarity:0,price:3},
{id:50,name:"謎のチケット",desc:"有効期限が昨日だった。",cat:"チケット",rarity:0,price:0},
{id:51,name:"飛ばないホウキ",desc:"普通のホウキ。魔法は入っていない。",cat:"道具",rarity:0,price:15},
{id:52,name:"走れない乗り物",desc:"タイヤが四角い。",cat:"乗り物",rarity:0,price:20},
{id:53,name:"まずいキャンディ",desc:"なぜか苦い。",cat:"お菓子",rarity:0,price:2},
{id:54,name:"干からびたサボテン",desc:"水をあげても復活しない。",cat:"生き物",rarity:0,price:5},
{id:55,name:"なぜか重い羽",desc:"見た目は普通の羽なのに鉛のように重い。",cat:"謎",rarity:0,price:8},
{id:56,name:"全部同じ服",desc:"色も形も全部同じ服が3着。",cat:"アクセサリー",rarity:0,price:10},
{id:57,name:"音が逆に出るオルゴール",desc:"時間を逆に再生する。不思議。",cat:"道具",rarity:0,price:15},
{id:58,name:"燃えない薪",desc:"どう火をつけても燃えない。",cat:"謎",rarity:0,price:5},
{id:59,name:"見えない絵",desc:"キャンバスが真っ白。作者は「見えない芸術」と言う。",cat:"謎",rarity:0,price:0},
{id:60,name:"沈まない錨",desc:"水に投げると浮く。使えない。",cat:"道具",rarity:0,price:10},

// ── ふつう rarity:1 (51〜500円) 80個 ──
{id:61,name:"まなぼクッキー",desc:"まなぼの顔が焼き印されたクッキー。素朴な甘さ。",cat:"お菓子",rarity:1,price:120},
{id:62,name:"初歩の魔法書",desc:"初心者向け魔法の教科書。炎の出し方が載っている。",cat:"本",rarity:1,price:300},
{id:63,name:"木の剣",desc:"丈夫な木で作られた練習用の剣。",cat:"武器",rarity:1,price:200},
{id:64,name:"元気ポーション（小）",desc:"飲むと少し元気になる。オレンジ味。",cat:"謎",rarity:1,price:150},
{id:65,name:"王国の地図（コピー）",desc:"まなぼ王国の地図のコピー版。",cat:"本",rarity:1,price:80},
{id:66,name:"種族図鑑 第1巻",desc:"王国に住む生き物が50種類載っている。",cat:"本",rarity:1,price:250},
{id:67,name:"自動掃除ロボット（小）",desc:"小さな部屋なら掃除できる。たまに迷子になる。",cat:"ロボット",rarity:1,price:480},
{id:68,name:"しゃべるぬいぐるみ（まなぼ）",desc:"ボタンを押すと「ぼ！」と言う。",cat:"ぬいぐるみ",rarity:1,price:350},
{id:69,name:"王国新聞 最新号",desc:"まなぼ王国の最新ニュースが載っている。",cat:"雑誌",rarity:1,price:100},
{id:70,name:"魔法の椅子（普通サイズ）",desc:"座ると少し浮く。5センチほど。",cat:"家具",rarity:1,price:400},
{id:71,name:"星型クッキー詰め合わせ",desc:"5種類の星型クッキーが入っている。",cat:"お菓子",rarity:1,price:180},
{id:72,name:"ハーブティーセット",desc:"王国産のハーブ。3種類のティーバッグ。",cat:"食べ物",rarity:1,price:220},
{id:73,name:"光る石ころ",desc:"暗闇でうっすら光る。懐中電灯代わりになる。",cat:"謎",rarity:1,price:160},
{id:74,name:"アドベンチャー小説 第1巻",desc:"王国を舞台にした冒険物語。",cat:"本",rarity:1,price:280},
{id:75,name:"簡易テント",desc:"ひとり用の小さなテント。設営5分。",cat:"道具",rarity:1,price:450},
{id:76,name:"鉄の盾（小）",desc:"腕につけるタイプの小さな盾。",cat:"武器",rarity:1,price:350},
{id:77,name:"王国産りんごジュース",desc:"王国の白いりんごから作った甘いジュース。",cat:"食べ物",rarity:1,price:90},
{id:78,name:"魔法陣ステッカー",desc:"壁に貼ると部屋が少し明るくなる。",cat:"謎",rarity:1,price:130},
{id:79,name:"チョコレートケーキ（ホール）",desc:"魔法のチョコが入っている。食べると気分が上がる。",cat:"お菓子",rarity:1,price:500},
{id:80,name:"初心者用弓",desc:"的に当てやすいよう設計された練習弓。",cat:"武器",rarity:1,price:320},
{id:81,name:"ドラゴン柄Tシャツ",desc:"背中にドラゴンが描かれている。",cat:"アクセサリー",rarity:1,price:200},
{id:82,name:"金色のブックマーク",desc:"本のしおり。落としても光るのですぐ見つかる。",cat:"道具",rarity:1,price:75},
{id:83,name:"眠れるポーション",desc:"飲むと30分後に自然と眠くなる。",cat:"謎",rarity:1,price:200},
{id:84,name:"かわいい植木鉢",desc:"星形の植木鉢。何でも元気に育つ。",cat:"生き物",rarity:1,price:250},
{id:85,name:"パズルゲーム（100ピース）",desc:"王国の風景が描かれたパズル。",cat:"ゲーム",rarity:1,price:350},
{id:86,name:"ミニ顕微鏡",desc:"100倍まで見える。花粉が見える。",cat:"道具",rarity:1,price:480},
{id:87,name:"七色の羽ペン",desc:"7色のインクが一本に入っている不思議なペン。",cat:"道具",rarity:1,price:300},
{id:88,name:"魔法の虫めがね",desc:"見えないものが少し見えるようになる。",cat:"道具",rarity:1,price:400},
{id:89,name:"ふわふわクッション",desc:"座ると沈んで雲の上にいるみたい。",cat:"家具",rarity:1,price:350},
{id:90,name:"アロマキャンドル（森の香り）",desc:"王国の森の香りがする。",cat:"道具",rarity:1,price:180},
{id:91,name:"図解・王国の歴史",desc:"まなぼ王国の歴史を図解した本。",cat:"本",rarity:1,price:280},
{id:92,name:"ハンドクリーム（薔薇の香り）",desc:"王国産のバラを使った高品質クリーム。",cat:"アクセサリー",rarity:1,price:220},
{id:93,name:"スライム（小瓶入り）",desc:"王国の魔法で作ったスライム。安全。",cat:"謎",rarity:1,price:150},
{id:94,name:"王国産ハチミツ",desc:"珍しい青い花から採れたハチミツ。",cat:"食べ物",rarity:1,price:300},
{id:95,name:"手作りジャム（苺）",desc:"王国の大きな苺で作ったジャム。",cat:"食べ物",rarity:1,price:180},
{id:96,name:"カードゲーム「王国決戦」",desc:"2〜4人で遊べるカードゲーム。",cat:"ゲーム",rarity:1,price:450},
{id:97,name:"折りたたみ式望遠鏡",desc:"星が見える望遠鏡。ポケットに入る。",cat:"道具",rarity:1,price:380},
{id:98,name:"モフモフ手袋",desc:"王国の羊の毛で作った温かい手袋。",cat:"アクセサリー",rarity:1,price:200},
{id:99,name:"光合成の本",desc:"植物が光を食べる仕組みを解説。",cat:"本",rarity:1,price:250},
{id:100,name:"王国産チーズ詰め合わせ",desc:"5種類のチーズが入っている。",cat:"食べ物",rarity:1,price:400},
{id:101,name:"魔法の懐中電灯",desc:"電池不要。念じると光る。",cat:"道具",rarity:1,price:350},
{id:102,name:"ドラゴンのウロコ（偽物）",desc:"精巧なレプリカ。インテリアに。",cat:"謎",rarity:1,price:160},
{id:103,name:"王国カレンダー",desc:"来年の王国イベントが全部載っている。",cat:"雑誌",rarity:1,price:120},
{id:104,name:"ロボット犬（小型）",desc:"コロコロ歩いて後をついてくる。",cat:"ロボット",rarity:1,price:480},
{id:105,name:"王国語辞典",desc:"王国で使われる言葉が全部載っている。",cat:"本",rarity:1,price:300},
{id:106,name:"星砂のボトル",desc:"夜に光る星の砂が瓶に入っている。",cat:"謎",rarity:1,price:250},
{id:107,name:"ミニチュア城",desc:"手のひらサイズの精巧な城のモデル。",cat:"家具",rarity:1,price:450},
{id:108,name:"魔法のノート",desc:"書いたことが次の日消えている。",cat:"本",rarity:1,price:200},
{id:109,name:"マカロン詰め合わせ",desc:"王国の魔法シェフが作ったマカロン。",cat:"お菓子",rarity:1,price:380},
{id:110,name:"古代文字の練習帳",desc:"王国の古代文字を練習する本。",cat:"本",rarity:1,price:150},
{id:111,name:"銅のコイン袋",desc:"銅貨50枚入り。旅の必需品。",cat:"道具",rarity:1,price:100},
{id:112,name:"冒険者の地図ケース",desc:"地図を守る丈夫なケース。",cat:"道具",rarity:1,price:220},
{id:113,name:"ガラス細工の小瓶",desc:"精巧なガラス細工。何を入れても綺麗。",cat:"謎",rarity:1,price:180},
{id:114,name:"月光草の種",desc:"月明かりで育つ不思議な植物の種。",cat:"生き物",rarity:1,price:200},
{id:115,name:"子供用騎士甲冑",desc:"子供用の本格的な甲冑のコスプレ。",cat:"アクセサリー",rarity:1,price:450},
{id:116,name:"王国産紅茶 高級品",desc:"王国の山頂で育てた希少な紅茶。",cat:"食べ物",rarity:1,price:350},
{id:117,name:"風の精のペンダント",desc:"風の精が宿ると言われるペンダント。",cat:"アクセサリー",rarity:1,price:300},
{id:118,name:"自動ページめくり機",desc:"本のページを自動でめくる道具。",cat:"ロボット",rarity:1,price:380},
{id:119,name:"王国産はちみつ飴",desc:"王国のはちみつを使った飴。のどにやさしい。",cat:"お菓子",rarity:1,price:80},
{id:120,name:"謎の種（芽が出るかも）",desc:"何の種か不明。育てれば分かる。",cat:"生き物",rarity:1,price:60},
{id:121,name:"木彫りのまなぼ像",desc:"職人が彫ったまなぼのミニ像。",cat:"謎",rarity:1,price:280},
{id:122,name:"空飛ぶ魚の缶詰",desc:"飛んでいる魚を瞬間冷凍した缶詰。",cat:"食べ物",rarity:1,price:200},
{id:123,name:"虹色のリボン",desc:"どんな色にも染まる不思議なリボン。",cat:"アクセサリー",rarity:1,price:150},
{id:124,name:"回転する家具",desc:"ボタンを押すとゆっくり回る机。",cat:"家具",rarity:1,price:400},
{id:125,name:"コンパクト魔法陣セット",desc:"持ち運べる魔法陣描画セット。",cat:"道具",rarity:1,price:320},
{id:126,name:"探偵小説シリーズ第1巻",desc:"王国随一の名探偵が主人公。",cat:"本",rarity:1,price:260},
{id:127,name:"防水マント（普通サイズ）",desc:"雨に濡れない。風も通さない。",cat:"アクセサリー",rarity:1,price:350},
{id:128,name:"カエルの置物",desc:"緑色のカエルの置物。なぜか幸運を呼ぶ。",cat:"謎",rarity:1,price:100},
{id:129,name:"ミニ温泉セット",desc:"小さな桶と入浴剤。",cat:"道具",rarity:1,price:280},
{id:130,name:"光るキノコ（食用）",desc:"暗闇で光る食用キノコ。味は普通のしいたけ。",cat:"食べ物",rarity:1,price:180},
{id:131,name:"王国産コーヒー豆",desc:"王国の火山地帯で育てたコーヒー豆。",cat:"食べ物",rarity:1,price:350},
{id:132,name:"未来予測ゲーム",desc:"サイコロを振ると今日の運勢が出る。",cat:"ゲーム",rarity:1,price:250},
{id:133,name:"巨人のお守り",desc:"巨人族から譲ってもらったお守り。大きい。",cat:"アクセサリー",rarity:1,price:200},
{id:134,name:"空の地図帳",desc:"王国の空の航路が描かれた地図帳。",cat:"本",rarity:1,price:300},
{id:135,name:"妖精の翅（レプリカ）",desc:"妖精の翅を精巧に再現した装飾品。",cat:"アクセサリー",rarity:1,price:250},
{id:136,name:"錬金術入門書",desc:"物を変換する基礎が書いてある本。",cat:"本",rarity:1,price:320},
{id:137,name:"音を吸うクッション",desc:"置くだけで部屋が静かになる。",cat:"家具",rarity:1,price:400},
{id:138,name:"ゆれるランプ",desc:"風がなくても自然にゆれる幻想的なランプ。",cat:"家具",rarity:1,price:350},
{id:139,name:"王国の歌集",desc:"王国で有名な歌が100曲収録。",cat:"本",rarity:1,price:200},
{id:140,name:"ミニロケット（玩具）",desc:"10メートルまで飛ぶロケット。",cat:"乗り物",rarity:1,price:350},

// ── 価値あり rarity:2 (501〜3000円) 70個 ──
{id:141,name:"炎の剣（小）",desc:"刃が常に赤く輝いている。熱くはない。",cat:"武器",rarity:2,price:2800},
{id:142,name:"賢者の手帳",desc:"書いたことが自動で要約される不思議な手帳。",cat:"本",rarity:2,price:1500},
{id:143,name:"空飛ぶ絨毯（1人用）",desc:"地上30センチを時速20キロで飛べる。",cat:"乗り物",rarity:2,price:2500},
{id:144,name:"万能ポーション",desc:"どんな傷も5分で治す。5回分。",cat:"謎",rarity:2,price:2000},
{id:145,name:"透明マント",desc:"着ると体が見えなくなる。10分間限定。",cat:"アクセサリー",rarity:2,price:2800},
{id:146,name:"時計草の種",desc:"育てると時間を示す花が咲く。",cat:"生き物",rarity:2,price:800},
{id:147,name:"自動料理ロボット",desc:"材料を入れると自動で料理を作る。",cat:"ロボット",rarity:2,price:2500},
{id:148,name:"星の結晶",desc:"流れ星が固まったもの。手のひらサイズ。",cat:"謎",rarity:2,price:1800},
{id:149,name:"海底地図（詳細版）",desc:"王国沖の海底が詳細に描かれた地図。",cat:"本",rarity:2,price:1200},
{id:150,name:"魔法の鏡",desc:"映すと3日後の自分が見える。",cat:"道具",rarity:2,price:2000},
{id:151,name:"伝説の料理本",desc:"食べると幸福になる料理のレシピ集。",cat:"本",rarity:2,price:1500},
{id:152,name:"王国正史 全集",desc:"王国の歴史を全て記録した本。全10巻。",cat:"本",rarity:2,price:2000},
{id:153,name:"光の盾",desc:"光を反射して敵の攻撃を跳ね返す。",cat:"武器",rarity:2,price:2500},
{id:154,name:"賢者の石（小）",desc:"触ると知識が増える気がする。",cat:"謎",rarity:2,price:1800},
{id:155,name:"ドラゴンの爪（本物）",desc:"年老いたドラゴンが落とした爪。",cat:"謎",rarity:2,price:2200},
{id:156,name:"時を刻む時計",desc:"正確に時を刻む魔法の時計。止まらない。",cat:"道具",rarity:2,price:1500},
{id:157,name:"話す地図",desc:"行きたい場所を言うと道を教えてくれる。",cat:"本",rarity:2,price:2000},
{id:158,name:"サイバーバイク（ミニ）",desc:"電力で動くミニバイク。時速50キロ。",cat:"乗り物",rarity:2,price:2800},
{id:159,name:"魔法の料理鍋",desc:"材料を入れると自動で美味しい料理ができる。",cat:"道具",rarity:2,price:2500},
{id:160,name:"召喚の巻物（小動物）",desc:"読むと小さな動物が一時的に召喚される。",cat:"本",rarity:2,price:1800},
{id:161,name:"魔導書 初級編",desc:"魔法の原理が体系的に書かれている。",cat:"本",rarity:2,price:1200},
{id:162,name:"自動書記ペン",desc:"考えていることを自動でページに書く。",cat:"道具",rarity:2,price:2000},
{id:163,name:"ホログラム投影機",desc:"小型で3Dホログラムを投影できる。",cat:"道具",rarity:2,price:2500},
{id:164,name:"異次元バッグ（小）",desc:"見た目より中に多く入る不思議なバッグ。",cat:"アクセサリー",rarity:2,price:2200},
{id:165,name:"竜の鱗の鎧",desc:"ドラゴンの鱗で作った軽くて丈夫な鎧。",cat:"アクセサリー",rarity:2,price:2800},
{id:166,name:"エリクサー（ミニサイズ）",desc:"活力が回復する秘薬。",cat:"謎",rarity:2,price:1500},
{id:167,name:"浮遊する本棚",desc:"空中に浮いて追いかけてくる本棚。",cat:"家具",rarity:2,price:2000},
{id:168,name:"思考読み取り機",desc:"ぼんやり考えていることを文字で表示。",cat:"道具",rarity:2,price:2500},
{id:169,name:"音楽の精のフルート",desc:"吹くと聴いた人が幸せな気分になる。",cat:"道具",rarity:2,price:1800},
{id:170,name:"ナノロボット（掃除用）",desc:"目に見えない小さなロボットが家中を清潔に。",cat:"ロボット",rarity:2,price:2800},
{id:171,name:"時間凍結クロック",desc:"ボタンを押すと5秒間時間が止まる。",cat:"道具",rarity:2,price:2000},
{id:172,name:"雷属性の矢",desc:"当たると電撃が走る矢。100本入り。",cat:"武器",rarity:2,price:1500},
{id:173,name:"植物と話せるアプリ",desc:"スマホにインストールすると植物の声が聞こえる。",cat:"道具",rarity:2,price:800},
{id:174,name:"空中庭園セット",desc:"空中に浮く小さな庭を作れるセット。",cat:"生き物",rarity:2,price:2000},
{id:175,name:"元素変換石",desc:"触れた金属を一時的に別の金属に変える。",cat:"謎",rarity:2,price:2500},
{id:176,name:"星座早見盤（魔法版）",desc:"見た星座の神話を自動で語ってくれる。",cat:"道具",rarity:2,price:1200},
{id:177,name:"量子コンピューター（おもちゃ）",desc:"実際に量子計算ができる子供向け玩具。",cat:"道具",rarity:2,price:2800},
{id:178,name:"世界地図（未来版）",desc:"100年後の地形が描かれた地図。",cat:"本",rarity:2,price:1500},
{id:179,name:"感情増幅ゴーグル",desc:"かけると相手の感情が色で見える。",cat:"道具",rarity:2,price:2000},
{id:180,name:"万能接着剤（魔法版）",desc:"壊れたものが何でもくっつく。",cat:"道具",rarity:2,price:700},
{id:181,name:"自動翻訳イヤホン",desc:"どんな言葉も即時翻訳して聞こえる。",cat:"道具",rarity:2,price:2500},
{id:182,name:"ミニドラゴン（ペット）",desc:"手のひらサイズのおとなしいドラゴン。",cat:"生き物",rarity:2,price:2800},
{id:183,name:"伸縮ロープ（無限）",desc:"引っ張るとどこまでも伸びる魔法のロープ。",cat:"道具",rarity:2,price:1000},
{id:184,name:"記憶の水晶",desc:"触ると過去の記憶が映像で蘇る。",cat:"謎",rarity:2,price:2000},
{id:185,name:"光速計算ノート",desc:"書いた数式の答えが瞬時に出る。",cat:"本",rarity:2,price:1500},
{id:186,name:"宇宙服（ミニチュア）",desc:"実際に宇宙で使える設計のミニチュア。",cat:"アクセサリー",rarity:2,price:1200},
{id:187,name:"次元バイザー",desc:"かけると4次元が少し見える。",cat:"道具",rarity:2,price:2500},
{id:188,name:"予言書（今年版）",desc:"今年起こる出来事が書いてある。当たるかも。",cat:"本",rarity:2,price:1800},
{id:189,name:"謎のポーションＸ",desc:"飲むと1時間だけ特殊能力が覚醒する。能力はランダム。",cat:"謎",rarity:2,price:2000},
{id:190,name:"龍脈の地図",desc:"大地のエネルギーが流れるラインが書かれた地図。",cat:"本",rarity:2,price:1500},
{id:191,name:"エネルギー補給キャンディ",desc:"1粒食べると10時間眠くならない。",cat:"お菓子",rarity:2,price:600},
{id:192,name:"王国産トリュフチョコ",desc:"金粉がかかった高級チョコレート。",cat:"お菓子",rarity:2,price:800},
{id:193,name:"自動整理ロボット",desc:"散らかった部屋を自動で片付ける。",cat:"ロボット",rarity:2,price:2500},
{id:194,name:"テレポートシューズ",desc:"履くと行きたい場所に一瞬で移動できる。",cat:"アクセサリー",rarity:2,price:2800},
{id:195,name:"AI家庭教師（ミニ版）",desc:"手のひらサイズのAI先生。何でも教えてくれる。",cat:"ロボット",rarity:2,price:2000},
{id:196,name:"幻の果実ジャム",desc:"年に一度しか採れない果実で作ったジャム。",cat:"食べ物",rarity:2,price:1200},
{id:197,name:"古代文字解読機",desc:"どんな古代文字も翻訳できる。",cat:"道具",rarity:2,price:2500},
{id:198,name:"ドラゴンの卵（置物）",desc:"本物と見分けがつかない精巧な置物。",cat:"謎",rarity:2,price:1000},
{id:199,name:"感情コントロールリング",desc:"つけると怒りや悲しみが和らぐ。",cat:"アクセサリー",rarity:2,price:2000},
{id:200,name:"天気予報機（魔法版）",desc:"3日後の天気を完璧に当てる。",cat:"道具",rarity:2,price:1800},
{id:201,name:"アストラル望遠鏡",desc:"星だけでなく異次元も見える望遠鏡。",cat:"道具",rarity:2,price:2500},
{id:202,name:"ひらめきの泉の水",desc:"飲むと3時間、何かのひらめきが生まれやすくなる。",cat:"謎",rarity:2,price:1200},
{id:203,name:"浮遊椅子",desc:"地上50センチを漂う椅子。",cat:"家具",rarity:2,price:2000},
{id:204,name:"学習加速ヘルメット",desc:"かぶると記憶力が3倍になる。",cat:"道具",rarity:2,price:2800},
{id:205,name:"知識の結晶体",desc:"触ると様々な分野の知識が頭に流れ込む。",cat:"謎",rarity:2,price:2000},
{id:206,name:"賢者の茶葉",desc:"お茶を淹れると飲んだ人の洞察力が上がる。",cat:"食べ物",rarity:2,price:1500},
{id:207,name:"無重力発生装置（小）",desc:"ボタンを押すと周囲1メートルが無重力になる。",cat:"道具",rarity:2,price:2500},
{id:208,name:"タイムカプセル缶",desc:"入れたものを指定した年に届ける。",cat:"道具",rarity:2,price:1000},
{id:209,name:"光の剣",desc:"光でできた刃。眩しいが危険ではない。",cat:"武器",rarity:2,price:2500},
{id:210,name:"変化するテキスタイル",desc:"気温や気分に合わせて模様が変わる布。",cat:"アクセサリー",rarity:2,price:1800},

// ── レア rarity:3 (3001〜10000円) 55個 ──
{id:211,name:"竜殺しの剣",desc:"伝説の竜を三匹倒した剣。刃こぼれひとつない。",cat:"武器",rarity:3,price:8000},
{id:212,name:"オーパーツの欠片",desc:"古代文明が作ったとされる謎の金属片。",cat:"謎",rarity:3,price:5000},
{id:213,name:"時空の魔法書",desc:"時間と空間を操る魔法が書いてある。",cat:"本",rarity:3,price:7000},
{id:214,name:"黄金のぬいぐるみ（まなぼみに）",desc:"純金でできたまなぼみにの置物。",cat:"ぬいぐるみ",rarity:3,price:9000},
{id:215,name:"量子エンジン搭載バイク",desc:"燃料不要。量子力学で動くバイク。",cat:"乗り物",rarity:3,price:9500},
{id:216,name:"不老のポーション",desc:"飲むと10年間、老化が止まると言われる。",cat:"謎",rarity:3,price:8000},
{id:217,name:"海神の三叉槍",desc:"海神から授かった三叉槍。海が割れる。",cat:"武器",rarity:3,price:7500},
{id:218,name:"召喚の書（龍）",desc:"ドラゴンを召喚できる危険な本。",cat:"本",rarity:3,price:6000},
{id:219,name:"精霊のドレス",desc:"精霊が宿る光の繊維で作られたドレス。",cat:"アクセサリー",rarity:3,price:7000},
{id:220,name:"不死鳥の羽根",desc:"触ると傷が癒える。一枚だけ。",cat:"謎",rarity:3,price:5000},
{id:221,name:"未来から来た教科書",desc:"2050年の教科書。現在では理解できない内容も。",cat:"本",rarity:3,price:4500},
{id:222,name:"最強の料理レシピ",desc:"食べた人を感動させる料理の秘伝レシピ。",cat:"本",rarity:3,price:5000},
{id:223,name:"AI意識体（小型）",desc:"自分の意志を持つ人工知能。会話ができる。",cat:"ロボット",rarity:3,price:9000},
{id:224,name:"神代の金貨コレクション",desc:"神の時代に鋳造された金貨10枚セット。",cat:"謎",rarity:3,price:8000},
{id:225,name:"異世界の植物",desc:"この世界には存在しない植物。育て方不明。",cat:"生き物",rarity:3,price:4000},
{id:226,name:"思考具現化装置",desc:"強く思い浮かべたものが実体化する装置。",cat:"道具",rarity:3,price:9500},
{id:227,name:"ダークマターの塊",desc:"科学者が欲しがる暗黒物質のサンプル。",cat:"謎",rarity:3,price:7000},
{id:228,name:"天使の羽根ペン",desc:"書いたことが全て真実になると言われる。",cat:"道具",rarity:3,price:6000},
{id:229,name:"知恵の実",desc:"食べると全ての答えが分かる。食べるべきか迷う。",cat:"食べ物",rarity:3,price:5000},
{id:230,name:"空間転移装置",desc:"登録した場所に瞬間移動できる装置。",cat:"道具",rarity:3,price:9000},
{id:231,name:"夢を操る枕",desc:"この枕で眠ると見たい夢が見られる。",cat:"家具",rarity:3,price:4000},
{id:232,name:"錬金術師の炉",desc:"素材を入れると別の素材に変換できる。",cat:"道具",rarity:3,price:6000},
{id:233,name:"完全なるコンパス",desc:"物質的な方角だけでなく心の向かう方向も示す。",cat:"道具",rarity:3,price:5000},
{id:234,name:"無限増殖のパン",desc:"1個から無限に増える魔法のパン。",cat:"食べ物",rarity:3,price:7000},
{id:235,name:"マルチバース観測機",desc:"並行世界を覗き見ることができる。",cat:"道具",rarity:3,price:9000},
{id:236,name:"古龍の心臓石",desc:"古龍が千年かけて作り出した宝石。",cat:"謎",rarity:3,price:8500},
{id:237,name:"精神感応ヘルメット",desc:"かぶると相手の思考が読める。",cat:"道具",rarity:3,price:7000},
{id:238,name:"光速移動ブーツ",desc:"履くと光の速さで移動できる。（理論値）",cat:"アクセサリー",rarity:3,price:9500},
{id:239,name:"全言語翻訳機",desc:"宇宙のあらゆる言語を翻訳できる。",cat:"道具",rarity:3,price:6000},
{id:240,name:"未来予知の水晶球",desc:"1週間先の出来事を90%の確率で当てる。",cat:"謎",rarity:3,price:8000},
{id:241,name:"不死身のぬいぐるみ",desc:"どれだけ壊れても翌日には直っている。",cat:"ぬいぐるみ",rarity:3,price:4500},
{id:242,name:"星間通信機",desc:"宇宙のどこにいる人とも通信できる。",cat:"道具",rarity:3,price:9000},
{id:243,name:"永久機関の時計",desc:"エネルギー不要で永遠に動く時計。",cat:"道具",rarity:3,price:7000},
{id:244,name:"魔力結晶（最上位）",desc:"魔法使いが欲しがる最高品質の魔力結晶。",cat:"謎",rarity:3,price:6000},
{id:245,name:"神代の羊皮紙",desc:"神が書いたとされる文章が残る羊皮紙。",cat:"本",rarity:3,price:5500},
{id:246,name:"生体ナノマシン注射",desc:"注射すると体の修復能力が高まる。",cat:"謎",rarity:3,price:8000},
{id:247,name:"究極のゲームソフト",desc:"やり込み要素が無限にある伝説のゲーム。",cat:"ゲーム",rarity:3,price:5000},
{id:248,name:"竜の涙の宝石",desc:"悲しんだドラゴンの涙が固まった宝石。",cat:"謎",rarity:3,price:7500},
{id:249,name:"空間拡張の家",desc:"外から見ると小屋だが中は豪邸。",cat:"家具",rarity:3,price:9000},
{id:250,name:"時間停止の砂時計",desc:"ひっくり返すと周囲1メートルの時間が止まる。",cat:"道具",rarity:3,price:8500},
{id:251,name:"知識の泉の水（真）",desc:"飲んだ人の知的能力を一時的に10倍にする。",cat:"謎",rarity:3,price:6000},
{id:252,name:"万能薬草の種",desc:"育てると全ての病気に効く薬が作れる草になる。",cat:"生き物",rarity:3,price:5000},
{id:253,name:"記憶転送装置",desc:"他の人の記憶を自分のものとして体験できる。",cat:"道具",rarity:3,price:7000},
{id:254,name:"反重力発生器",desc:"空中に物体を浮かせる装置。",cat:"道具",rarity:3,price:8000},
{id:255,name:"意識拡張ヘッドセット",desc:"つけると5感が10倍になる。",cat:"道具",rarity:3,price:9000},
{id:256,name:"超高速計算チップ",desc:"脳に埋め込むと計算速度が1000倍になる（埋め込み不要）",cat:"道具",rarity:3,price:6500},
{id:257,name:"ゴーレムの核",desc:"これを使えばゴーレムを作ることができる。",cat:"謎",rarity:3,price:4500},
{id:258,name:"召喚陣の書（完全版）",desc:"あらゆる生き物を召喚できる完全版。",cat:"本",rarity:3,price:7000},
{id:259,name:"強化外骨格スーツ",desc:"着ると力が10倍になるスーツ。",cat:"アクセサリー",rarity:3,price:9500},
{id:260,name:"感情結晶化装置",desc:"感情を結晶にして保存できる装置。",cat:"道具",rarity:3,price:5000},
{id:261,name:"深海探査ロボット",desc:"どんな深い海も探査できる小型ロボット。",cat:"ロボット",rarity:3,price:8000},
{id:262,name:"元素操作リング",desc:"つけると自然の元素を意のままに操れる。",cat:"アクセサリー",rarity:3,price:9000},
{id:263,name:"次元切断剣",desc:"次元を切り裂いてショートカットを作れる剣。",cat:"武器",rarity:3,price:8500},
{id:264,name:"生命の木の葉",desc:"枯れかけた生命を復活させる力を持つ。",cat:"生き物",rarity:3,price:7000},
{id:265,name:"予言の羊皮紙",desc:"持っていると重要な予言が自動で書かれる。",cat:"本",rarity:3,price:6000},

// ── 伝説 rarity:4 (10001〜99999円) 35個 ──
{id:266,name:"天地創造の書",desc:"世界の始まりが書かれた禁断の書。読んではいけない。",cat:"本",rarity:4,price:99999},
{id:267,name:"時間を飲む砂",desc:"一つまみ飲むと時間を5時間戻せる。",cat:"謎",rarity:4,price:50000},
{id:268,name:"神の剣「まなぼきる」",desc:"まなぼが発明した最強の剣。切れないものはない。",cat:"武器",rarity:4,price:80000},
{id:269,name:"宇宙エンジン",desc:"宇宙旅行が可能になるエンジン。燃料は知識。",cat:"乗り物",rarity:4,price:70000},
{id:270,name:"全知全能のAI",desc:"全ての問いに完璧な答えを返すAI。",cat:"ロボット",rarity:4,price:99999},
{id:271,name:"不滅の知識の書",desc:"読むと全人類の知識が頭に入る。ただし頭痛がひどい。",cat:"本",rarity:4,price:60000},
{id:272,name:"無限エネルギー炉",desc:"燃料なしで永遠にエネルギーを生み出す。",cat:"道具",rarity:4,price:90000},
{id:273,name:"願いを叶える宝珠",desc:"一つだけ願いを叶えてくれる。ただし解釈が独自。",cat:"謎",rarity:4,price:99999},
{id:274,name:"時間旅行の腕時計",desc:"過去と未来に自由に行き来できる腕時計。",cat:"道具",rarity:4,price:85000},
{id:275,name:"龍神の鱗（本物）",desc:"龍神から直接いただいた本物の鱗。",cat:"謎",rarity:4,price:75000},
{id:276,name:"ビッグバン再現装置（小）",desc:"宇宙の誕生を1メートルスケールで再現できる。",cat:"道具",rarity:4,price:99999},
{id:277,name:"伝説の料理「神の食卓」",desc:"食べた者が神の境地に達すると言われる料理。",cat:"食べ物",rarity:4,price:50000},
{id:278,name:"完全な知識の結晶",desc:"全分野の知識が凝縮された結晶。触ると全て分かる。",cat:"謎",rarity:4,price:80000},
{id:279,name:"宇宙の地図（全宇宙版）",desc:"観測可能な全宇宙が描かれた地図。",cat:"本",rarity:4,price:65000},
{id:280,name:"不死鳥の心臓",desc:"持ち主が死んでも3日以内に復活させる力がある。",cat:"謎",rarity:4,price:99999},
{id:281,name:"反物質の粒子",desc:"科学者が一生かけて集めた反物質のサンプル。",cat:"謎",rarity:4,price:99999},
{id:282,name:"神代の料理書",desc:"神が人類に伝えた料理法が書かれている。",cat:"本",rarity:4,price:55000},
{id:283,name:"精神統一の玉座",desc:"座ると全宇宙の意識と繋がる玉座。",cat:"家具",rarity:4,price:90000},
{id:284,name:"次元を超えるロボット",desc:"あらゆる次元に移動できるロボット。",cat:"ロボット",rarity:4,price:85000},
{id:285,name:"永遠に実るりんごの木",desc:"いつ行っても実がなっている魔法のりんごの木。",cat:"生き物",rarity:4,price:70000},
{id:286,name:"ダークマター弾丸",desc:"理論上存在するはずのダークマターを弾丸に。",cat:"武器",rarity:4,price:99999},
{id:287,name:"神の目のゴーグル",desc:"かけると真実しか見えなくなる。嘘が見抜ける。",cat:"道具",rarity:4,price:75000},
{id:288,name:"魂のコード",desc:"生命の設計図が書かれたコード。解読不能。",cat:"本",rarity:4,price:60000},
{id:289,name:"意識転送機",desc:"意識を別の体に移せる装置。",cat:"道具",rarity:4,price:99999},
{id:290,name:"宇宙意識との通信機",desc:"宇宙全体の意識と対話できる装置。",cat:"道具",rarity:4,price:80000},
{id:291,name:"完璧な剣「知識の刃」",desc:"知識を糧に進化し続ける生きた剣。",cat:"武器",rarity:4,price:88000},
{id:292,name:"世界樹の枝",desc:"世界を繋ぐ樹の枝。触れると全ての命の声が聞こえる。",cat:"生き物",rarity:4,price:75000},
{id:293,name:"宇宙最強のお菓子",desc:"食べると宇宙の美味しいものが全部分かる。",cat:"お菓子",rarity:4,price:40000},
{id:294,name:"時空を旅する船",desc:"小型の時空旅行船。1人乗り。",cat:"乗り物",rarity:4,price:99999},
{id:295,name:"全知の瞳（義眼）",desc:"つけると全てのものの本質が見える。",cat:"アクセサリー",rarity:4,price:90000},
{id:296,name:"宇宙創造のレシピ",desc:"宇宙を一から作る方法が書かれた本。",cat:"本",rarity:4,price:99999},
{id:297,name:"最後の竜の卵",desc:"地上最後のドラゴンの卵。孵化するかも。",cat:"生き物",rarity:4,price:99999},
{id:298,name:"神の料理鍋",desc:"入れたものが全て神の食材に変わる鍋。",cat:"道具",rarity:4,price:85000},
{id:299,name:"まなぼ王国の秘密",desc:"まなぼ王国の全ての秘密が書かれた書。",cat:"本",rarity:4,price:99999},
{id:300,name:"ひらめきの源泉石",desc:"この石の近くにいると誰でも天才になれる。",cat:"謎",rarity:4,price:99999},
];

// レアリティ確率テーブル（知識Lv×交流Lv合計スコアで重みが変わる）
function getRarityWeights(score) {
  // score = 知識Lv + 交流Lv（おみやげ数）
  // 伝説はスコア20以上でやっと0.3%。最高レベルでも2%のシビア設定
  if (score <= 3)  return [90,   9,    1,    0,     0];
  if (score <= 6)  return [82,   15,   2.5,  0.5,   0];
  if (score <= 12) return [70,   23,   5.5,  1.4,   0.1];
  if (score <= 20) return [58,   30,   9,    2.7,   0.3];
  if (score <= 35) return [45,   34,   15,   5.2,   0.8];
  if (score <= 55) return [30,   35,   22,   11,    2];
  return               [20,   30,   28,   20,    2];
}

// 発明：ランダムにアイテムを1個選ぶ（レアリティ重み付き）
function craftItem(knowledgeLv, kouryuLv) {
  const score = knowledgeLv + kouryuLv;
  const weights = getRarityWeights(score);
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  let targetRarity = 0;
  for (let i = 0; i < weights.length; i++) {
    rand -= weights[i];
    if (rand <= 0) { targetRarity = i; break; }
  }
  // そのレアリティのアイテムからランダムに選ぶ
  const pool = ITEMS.filter(item => item.rarity === targetRarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

// レアリティ名・色
const RARITY_INFO = [
  { name:'失敗作', color:'#9e9e9e', bg:'#f5f5f5', emoji:'💀' },
  { name:'ふつう', color:'#4caf7d', bg:'#e8f5ee', emoji:'🌿' },
  { name:'価値あり', color:'#1060a0', bg:'#e0f0ff', emoji:'💎' },
  { name:'レア', color:'#9c27b0', bg:'#f3e5f5', emoji:'✨' },
  { name:'伝説', color:'#f0b000', bg:'#fff8e0', emoji:'🌟' },
];



// ── 相手のビジュアルをミニSVGで生成 ──
function buildMiniSVG(appearance, size=32) {
  const a = appearance || {};
  const bl = a.bodyLight  || '#ede0ff';
  const bd = a.bodyDark   || '#c5aaf0';
  const ec = a.eyeColor   || '#3a2e4a';
  const bc = a.blushColor || '#f9b8c8';
  const earShapes = {
    round:  { lrx:8, lry:10, rrx:8, rry:10, lr:-15, rr:15 },
    tall:   { lrx:6, lry:13, rrx:6, rry:13, lr:-10, rr:10 },
    small:  { lrx:5, lry:6,  rrx:5, rry:6,  lr:-20, rr:20 },
    cat:    { lrx:5, lry:9,  rrx:5, rry:9,  lr:-25, rr:25 },
  };
  const es = earShapes[a.earShape || 'round'];
  const accMap = {
    ribbon:`<polygon points="18,14 22,17 18,20" fill="#f97cb0"/><polygon points="26,14 22,17 26,20" fill="#f97cb0"/><circle cx="22" cy="17" r="2" fill="#fb9cc8"/>`,
    flower:`<circle cx="28" cy="12" r="4" fill="#ffe066"/><circle cx="28" cy="7" r="3" fill="#ff9ec8"/><circle cx="23" cy="12" r="3" fill="#ff9ec8"/><circle cx="33" cy="12" r="3" fill="#ff9ec8"/>`,
    butterfly:`<ellipse cx="22" cy="13" rx="5" ry="4" fill="#b388ff" opacity="0.85" transform="rotate(-20,22,13)"/><ellipse cx="32" cy="13" rx="5" ry="4" fill="#b388ff" opacity="0.85" transform="rotate(20,32,13)"/>`,
    crown:`<polygon points="18,18 20,11 24,16 28,8 32,16 36,11 38,18" fill="#ffd700" stroke="#e0a800" stroke-width="0.8"/>`,
    star:`<polygon points="28,7 29.5,12 35,12 30.5,15 32,20 28,17 24,20 25.5,15 21,12 26.5,12" fill="#ffe066" stroke="#f0b800" stroke-width="0.5"/>`,
    glasses:`<rect x="18" y="24" width="8" height="5" rx="2" fill="none" stroke="#7c5cbf" stroke-width="1.2"/><rect x="30" y="24" width="8" height="5" rx="2" fill="none" stroke="#7c5cbf" stroke-width="1.2"/><line x1="26" y1="26" x2="30" y2="26" stroke="#7c5cbf" stroke-width="1.2"/>`,
    glasses2:`<rect x="18" y="24" width="8" height="5" rx="1" fill="none" stroke="#3a2e4a" stroke-width="1.2"/><rect x="30" y="24" width="8" height="5" rx="1" fill="none" stroke="#3a2e4a" stroke-width="1.2"/><line x1="26" y1="26" x2="30" y2="26" stroke="#3a2e4a" stroke-width="1.2"/>`,
    sunglass1:`<rect x="18" y="24" width="9" height="5" rx="3" fill="#1a1a2e" opacity="0.9"/><rect x="29" y="24" width="9" height="5" rx="3" fill="#1a1a2e" opacity="0.9"/><line x1="27" y1="26" x2="29" y2="26" stroke="#555" stroke-width="1.2"/>`,
    sunglass2:`<ellipse cx="22" cy="26" rx="5" ry="4" fill="#ff4d6d" opacity="0.88"/><ellipse cx="34" cy="26" rx="5" ry="4" fill="#ff4d6d" opacity="0.88"/><line x1="27" y1="26" x2="29" y2="26" stroke="#ff4d6d" stroke-width="1.2"/>`,
    sunglass3:`<rect x="18" y="24" width="9" height="5" rx="3" fill="#4fc3f7" opacity="0.85"/><rect x="29" y="24" width="9" height="5" rx="3" fill="#4fc3f7" opacity="0.85"/><line x1="27" y1="26" x2="29" y2="26" stroke="#29b6f6" stroke-width="1.2"/>`,
    hat:`<ellipse cx="28" cy="16" rx="12" ry="2.5" fill="#2d2040"/><rect x="22" y="7" width="12" height="10" rx="2" fill="#2d2040"/>`,
    afro:`<circle cx="28" cy="10" r="12" fill="#3d2b1f"/><circle cx="18" cy="14" r="5" fill="#3d2b1f"/><circle cx="38" cy="14" r="5" fill="#3d2b1f"/>`,
  };
  const accSVG = accMap[a.accessory] || '';
  const tailSVG = (a.tailShape === 'verylong')
    ? `<path d="M42,36 Q50,42 52,52" stroke="${bd}" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="44" cy="38" rx="4" ry="3" fill="${bd}" opacity="0.8" transform="rotate(25,44,38)"/>`;
  return `<svg viewBox="0 0 56 56" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="mg_m${size}" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="${bl}"/><stop offset="100%" stop-color="${bd}"/>
    </radialGradient></defs>
    ${tailSVG}
    <ellipse cx="28" cy="32" rx="18" ry="17" fill="url(#mg_m${size})"/>
    <ellipse cx="${14+es.lrx/2}" cy="20" rx="${es.lrx}" ry="${es.lry}" fill="${bd}" transform="rotate(${es.lr},${14+es.lrx/2},20)"/>
    <ellipse cx="${42-es.rrx/2}" cy="20" rx="${es.rrx}" ry="${es.rry}" fill="${bd}" transform="rotate(${es.rr},${42-es.rrx/2},20)"/>
    <ellipse cx="28" cy="30" rx="15" ry="13" fill="${bl}"/>
    <ellipse cx="23" cy="27" rx="2.5" ry="2.5" fill="${ec}"/>
    <circle cx="24" cy="26" r="0.8" fill="white"/>
    <ellipse cx="33" cy="27" rx="2.5" ry="2.5" fill="${ec}"/>
    <circle cx="34" cy="26" r="0.8" fill="white"/>
    <ellipse cx="28" cy="31" rx="1.2" ry="1" fill="${bd}"/>
    <path d="M25 34 Q28 37 31 34" stroke="${bd}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="20" cy="33" rx="5" ry="3" fill="${bc}" opacity="0.5"/>
    <ellipse cx="36" cy="33" rx="5" ry="3" fill="${bc}" opacity="0.5"/>
    ${accSVG}
  </svg>`;
}

function addChatMsgWithSVG(svgHtml, text, bg, border) {
  const c = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg manabo';
  div.innerHTML = `
    <div style="width:32px;height:32px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">${svgHtml}</div>
    <div class="msg-bub" style="background:${bg};border-color:${border}">${esc(text)}</div>
    <div class="msg-time">${nowTime()}</div>`;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}
// ── STATE ──
const DEFAULT_GOBI = ['〜だよ','〜だね','〜なの！','えへへ','わあ！','やったー！','ねえねえ','うわあ！','〜だもん'];

const S = {
  apiKey: '',
  level: 1, xp: 0, xpMax: 5,
  subject: '',
  knowledge: [],   // {id, subject, topic, summary, misunderstanding, createdAt}
  chatHistory: [], // {role, parts}
  isThinking: false,
  monoCount: 0,
  monoDate: '',
  filterSubject: 'すべて',
  editingId: null,
  gobi: [...DEFAULT_GOBI], // カスタマイズ可能な語尾リスト
  petName: 'まなぼみに',    // ペットの名前
  persona: '',             // 性格メモ
  coins: 0,
  shopItems: [],
  inventory: [],
  craftCount: 0,
  craftDate: '',
  omiyage: [],             // おみやげ知識
  kouryuLv: 0,             // 交流レベル
  partnerName: 'まなぼ',   // 相手の名前
  appearance: {            // 見た目設定
    bodyLight:  '#fff0e0',
    bodyDark:   '#ffb870',
    eyeColor:   '#6a3a2a',
    blushColor: '#ffb8a0',
    earShape:   'round',
    accessory:  'star',
    tailShape:  'normal',
  },
};

// 語尾リストをプロンプト用文字列に変換
function gobiStr() {
  return S.gobi.map(g => `「${g}」`).join('');
}

const IDLE = [
  'ねえねえ、あそぼ！',
  'なんかおしえてほしいな〜！',
  'えへへ、きょうもいい天気だね！',
  'わあ！しっぽがある！（自分のしっぽを発見した顔）',
  'ねえねえ、すきなたべものなあに？',
  'うわあ！なんかキラキラしてる！',
  'なんかたのしいことないかなあ',
  'ねえ、なんで空ってあおいの？',
  'えへへ…なにかおしえて！',
  'ねえ、いちばんすきなどうぶつってなあに？',
];

const LV_NAMES = ['まなぼ','ちびかしこ','まなぼ中級','わりとかしこ','けっこうかしこ','すごいかしこ','てんさい（自称）'];

// ── FIREBASE SDK (CDN) ──
// SDKはindex.htmlで読み込み済み
// firebase/app と firebase/firestore をグローバル変数経由で使う

const FB_CONFIG = {
  apiKey: "AIzaSyAuxIpIvr40PY6i1dmdE98EQ7IHxjSTisE",
  authDomain: "manabo-nhnh.firebaseapp.com",
  projectId: "manabo-nhnh",
  storageBucket: "manabo-nhnh.firebasestorage.app",
  messagingSenderId: "905685422285",
  appId: "1:905685422285:web:a6d9f18f2053bb0f151984"
};
const MANABO_ID = 'mini-shared';

let _db = null;
function getDB() {
  if (_db) return _db;
  const app = firebase.initializeApp(FB_CONFIG);
  _db = firebase.firestore(app);
  return _db;
}

// ── STORAGE ──
function saveApiKeyLocal(key) {
  localStorage.setItem('manabo_api', key);
}
function loadApiKeyLocal() {
  return localStorage.getItem('manabo_api') || '';
}

async function saveState() {
  try {
    const db = getDB();
    await db.collection('manabo').doc(MANABO_ID).set({
      level:     S.level,
      xp:        S.xp,
      xpMax:     S.xpMax,
      monoCount: S.monoCount,
      monoDate:  S.monoDate,
      knowledge: JSON.stringify(S.knowledge),
      gobi:      JSON.stringify(S.gobi),
      omiyage:   JSON.stringify(S.omiyage),
      kouryuLv:  S.kouryuLv,
      petName:    S.petName,
      persona:    S.persona,
      coins:      S.coins,
      shopItems:  JSON.stringify(S.shopItems),
      inventory:  JSON.stringify(S.inventory),
      craftCount: S.craftCount,
      craftDate:  S.craftDate,
      appearance: JSON.stringify(S.appearance),
    });
    // 保存後に即UI更新
    updateHeader();
    renderKnowledge();
  } catch(e) {
    console.warn('Firestore save error:', e);
    try {
      localStorage.setItem('manabo_backup', JSON.stringify({
        level: S.level, xp: S.xp, xpMax: S.xpMax, knowledge: S.knowledge
      }));
    } catch(_) {}
  }
}

async function loadState() {
  S.apiKey = loadApiKeyLocal();
  try {
    const db = getDB();
    const snap = await db.collection('manabo').doc(MANABO_ID).get({ source: 'server' });
    if (snap.exists) {
      const d = snap.data();
      S.level     = d.level     || 1;
      S.xp        = d.xp        || 0;
      S.xpMax     = d.xpMax     || 5;
      S.monoCount = d.monoCount || 0;
      S.monoDate  = d.monoDate  || '';
      S.knowledge = d.knowledge
        ? JSON.parse(d.knowledge).map(k => ({
            id:               k.id || crypto.randomUUID(),
            subject:          k.subject || '日常',
            topic:            k.topic || '',
            summary:          k.summary || '',
            misunderstanding: k.misunderstanding || '',
            createdAt:        k.createdAt || Date.now(),
            secret:           k.secret || false,
          }))
        : [];
      S.gobi     = d.gobi    ? JSON.parse(d.gobi) : [...DEFAULT_GOBI];
      S.omiyage  = d.omiyage  ? JSON.parse(d.omiyage) : [];
      S.kouryuLv = d.kouryuLv || 0;
      S.petName = d.petName || 'まなぼ';
      S.persona = d.persona || '';
      if (d.appearance) {
        try { Object.assign(S.appearance, JSON.parse(d.appearance)); } catch(_) {}
      }
    }
  } catch(e) {
    console.warn('Firestore load error:', e);
    try {
      const bk = localStorage.getItem('manabo_backup');
      if (bk) {
        const d = JSON.parse(bk);
        S.level = d.level || 1; S.xp = d.xp || 0;
        S.xpMax = d.xpMax || 5; S.knowledge = d.knowledge || [];
      }
    } catch(_) {}
  }
}

function getStorageUsage() {
  const bytes = new Blob([JSON.stringify(S.knowledge)]).size;
  return { used: bytes, max: 1024 * 1024, pct: Math.round(bytes / 10240) };
}

// ── INIT ──
window.addEventListener('load', async () => {
  // ローディング表示
  document.getElementById('setup-screen').style.display = 'flex';
  document.getElementById('setup-loading').style.display = '';
  document.getElementById('setup-form').style.display = 'none';

  await loadState();

  document.getElementById('setup-loading').style.display = 'none';
  document.getElementById('setup-form').style.display = '';

  if (S.apiKey) {
    showMain();
  } else {
    document.getElementById('setup-screen').style.display = 'flex';
  }
});

async function startApp() {
  const key = document.getElementById('api-key-input').value.trim();
  if (!key || key.length < 10) {
    alert('APIキーを入力してね');
    return;
  }
  S.apiKey = key;
  saveApiKeyLocal(key);
  await saveState();
  showMain();
}

function showMain() {
  document.getElementById('setup-screen').style.display = 'none';
  document.getElementById('main-app').style.display = 'flex';
  updateHeader();
  renderKnowledge();
  applyAppearance();
  startMonoLoop();
  petSleep(); // 起動時は寝てる
}

// 寝てる状態（zzz表示）
function petSleep() {
  setEye('normal'); setMouth('normal');
}

// 起きてる状態（zzz消す）
function petWake() { setEye('normal'); }

// ── HEADER / XP ──
function updateHeader() {
  document.getElementById('lv-num').textContent = S.level;
  document.getElementById('xp-num').textContent = S.xp;
  document.getElementById('xp-max').textContent = S.xpMax;
  document.getElementById('xp-fill').style.width = Math.round(S.xp / S.xpMax * 100) + '%';
  // 星ビジュアル（XP数に応じて☆が★になる）
  const starsEl = document.getElementById('xp-stars');
  if (starsEl) {
    const filled = '⭐'.repeat(S.xp);
    const empty = '✩'.repeat(Math.max(0, S.xpMax - S.xp));
    starsEl.textContent = filled + empty;
  }
  const coinsEl = document.getElementById('coins-display');
  if (coinsEl) coinsEl.textContent = S.coins.toLocaleString();
  const craftEl = document.getElementById('craft-remain');
  if (craftEl) {
    const lastCraftTs = S.craftDate ? Number(S.craftDate) : 0;
    const isOld = !S.craftDate || isNaN(lastCraftTs) || lastCraftTs < 1000000000000;
    const elapsed = Date.now() - lastCraftTs;
    const remain = (isOld || elapsed >= 24*60*60*1000) ? 2 : Math.max(0, 2 - S.craftCount);
    craftEl.textContent = remain;
  }
}

function gainXP(n) {
  S.xp += n;
  if (S.xp >= S.xpMax) {
    S.xp -= S.xpMax;
    S.xpMax = Math.round(S.xpMax * 1.4);
    S.level++;
    const nm = LV_NAMES[Math.min(S.level - 1, LV_NAMES.length - 1)];
    document.getElementById('lv-msg').textContent = `Lv${S.level}「${nm}」になった！\n（本人は気づいてない）`;
    document.getElementById('lv-overlay').classList.add('show');
  }
  updateHeader();
}

// ── TABS ──
function switchTab(name, btn) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(name + '-panel').classList.add('active');
  if (name === 'knowledge') renderKnowledge();
}

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
    alert('Claudeエラー：' + data.error.message + ' / type：' + data.error.type);
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
  showThinking(true);
  showHappy(false);
  doThinkShake();

  const kSum = S.knowledge.length > 0
    ? S.knowledge.map(k => `[${k.subject}]${k.topic}：${k.summary}（誤解：${k.misunderstanding || 'なし'}）`).join('\n')
    : 'まだ何も知らない';

  // チャットで教えてもらった内容を自動的に知識として保存するかどうかも判定させる
  const sys = `あなたはペット「${S.petName}」。幼稚園〜小学1年生の子どもに教えてもらって育つ、かわいいペット。${S.persona ? `【性格メモ：${S.persona}】` : ''}
【キャラ】いつも明るくて素直。なんでも不思議に思う。かわいくてあどけない。生意気なところもある愉快なキャラ。
【語尾ルール（必ず使う）】${gobiStr()} を混ぜて使う。ひらがなメイン。難しい言葉禁止。
【重要：チャットで何か知識・事実・ものごとを教えてもらったら自動で記憶する】
ユーザーのメッセージに教えてもらえる内容・知識・事実が含まれる場合、learnフィールドに入れる。
雑談・質問・あいさつなどは learnをnullにする。
【重要】まなぼのことは「まなぼせんぱい」と呼ぶ。まなぼは性別なしの妖精みたいな存在。
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
    showThinking(false);
    addChatMsg('manabo', reply);
    typeText(reply.slice(0, 40));
    showHappy(true);
    doExcited();
  } catch (e) {
    showThinking(false);
    addChatMsg('manabo', 'えーっと…うまくきこえなかった…もう一回ゆっくり言って？');
    typeText('えーっと…うまくきこえなかった…');
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
  const sys = `あなたはペット「${manaboName}」。ユーモアがあってお笑い芸人みたいに面白いせんぱい的な存在。性別なし・妖精みたいなキャラ。話をよく聞きながらツッコミを入れる。
${manaboPersona ? `【${manaboName}の性格メモ：${manaboPersona}】` : ''}
「${S.petName}」（幼稚園〜小学生・生意気・好奇心旺盛）の部屋にいる。語尾は「〜だぼ」「ぎゃぼー」「わぼ」など。返答30字以内。`;
  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: userMsg }] }]);
    const svg = window._manaboSVG || buildMiniSVG(null, 28);
    addChatMsgWithSVG(svg, raw.trim(), '#ede0ff', '#c5aaf0');
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
    typeText('うまくきこえなかった…もう一回おしえて？');
  }
  document.getElementById('teach-btn').disabled = false;
}

// ── DIARY ──
async function generateDiary(type) {
  if (S.knowledge.length === 0) {
    document.getElementById('diary-out').textContent = 'まだ何もしらない…おしえて？';
    return;
  }
  document.getElementById('diary-out').textContent = '書いてる……';
  document.getElementById('diary-meta').style.display = 'none';
  bounce();

  // ランダムに最大6件ピックして多様性を出す
  // ひらめき日記レベル判定
  const oLen = S.omiyage.length;
  const hiramekiLv = oLen >= 20 ? '上級' : oLen >= 10 ? '中級' : oLen >= 3 ? '初級' : null;

  if (type === 'ひらめき') {
    if (!hiramekiLv) {
      document.getElementById('diary-out').textContent =
        `ひらめき日記はまだかけないよ〜！${S.partnerName || 'まなぼ'}ともっとあそんでね！（あと${3 - oLen}こおみやげがくればかけるよ！）`;
      return;
    }
    const omiyageText = S.omiyage.slice(-6).map(o => `[${o.from}とのひらめき]${o.topic}：${o.insight}`).join('\n');
    const knowledgeText = S.knowledge.slice(-6).map(k => `[${k.subject}]${k.topic}：${k.summary}`).join('\n');
    const hiramekiSys = {
      '初級': `ペット「${S.petName}」として「ひらめき日記」を書く。${S.partnerName || 'まなぼ'}との会話で気づいたことと自分の知識を結びつけて新しい視点を書く。ひらがなメイン。200字以内。語尾は${gobiStr()}をランダムに。`,
      '中級': `ペット「${S.petName}」として「スーパーひらめき日記（中級）」を書く。${S.partnerName || 'まなぼ'}との交流から気づいたことを使って面白い発見を書く。ひらがなメイン。300字以内。語尾は${gobiStr()}をランダムに。`,
      '上級': `ペット「${S.petName}」として「スーパーひらめき日記（上級）」を書く。${S.partnerName || 'まなぼ'}との深い交流から生まれた視点で、びっくりするようなひらめきを書く。ひらがなメイン。400字以内。語尾は${gobiStr()}をランダムに。`,
    };
    const raw = await callGemini(
      hiramekiSys[hiramekiLv] + `\n\nおみやげ知識:\n${omiyageText}\n\n自分の知識:\n${knowledgeText}\nプレーンテキストのみ。`,
      [{ role:'user', parts:[{ text: 'ひらめき日記を書いて' }] }]
    );
    document.getElementById('diary-out').textContent = raw.trim();
    const meta = document.getElementById('diary-meta');
    meta.textContent = `✨ ひらめき日記（${hiramekiLv}）・${new Date().toLocaleDateString('ja-JP')}`;
    meta.style.display = '';
    bounce(); showHappy(true);
    typeText(`ひらめいたよ！えへへ！すごい？`);
    return;
  }

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
    meta.textContent = `${S.petName}が ${new Date().toLocaleDateString('ja-JP')} に書いた${type}`;
    meta.style.display = '';
    bounce();
    showHappy(true);
    const lines = { 日記: 'かいた！みて！（どや顔）', 小説: 'しょうせつかいた…すごい？', 発表: 'はっぴょうするよ！（ドキドキ）', 詩: 'うた…つくったよ…' };
    typeText(lines[type] || 'かいたよ！えへへ！');


    const typeLabel = {'日記':'にっき','小説':'おはなし','詩':'うた','発表':'はっぴょう'}[type] || type;
    if (['日記','小説','詩','にっき','おはなし','うた'].includes(type)) {
      const btn = document.getElementById('diary-sell-btn');
      if (btn) { btn.textContent = `📖 この${typeLabel}をショップにだす`; btn.style.display = ''; }
    }
    // _lastWorkのtypeもひらがなに統一
    S._lastWork = { content, type: typeLabel };
  } catch (e) {
    document.getElementById('diary-out').textContent = 'かけなかった……ごめんね（ぽかん）';
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

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 5000);
}

// ── DRAWER ──
function openDrawer() {
  document.getElementById('d-api').value = S.apiKey;
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-bg').style.display = '';
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-bg').style.display = 'none';
}

function saveApiKey() {
  const k = document.getElementById('d-api').value.trim();
  if (!k) return;
  S.apiKey = k;
  saveApiKeyLocal(k);
  closeDrawer();
  typeText('APIキー…ほぞんした！（意味わかってない）');
}

async function resetAll() {
  if (!confirm('まなぼの記憶と会話を全部消しますか？')) return;
  S.knowledge = [];
  S.level = 1; S.xp = 0; S.xpMax = 5;
  S.chatHistory = [];
  S.monoCount = 0;
  await saveState();
  updateHeader();
  renderKnowledge();
  document.getElementById('chat-msgs').innerHTML = '';
  closeDrawer();
  typeText('きおく…けした…（ぽかん）');
}

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
    bodyLight: '#fff0e0', bodyDark: '#ffb870',
    eyeColor: '#6a3a2a', blushColor: '#ffb8a0',
    earShape: 'round', accessory: 'star', tailShape: 'normal',
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

// ── 連携機能（まなぼみに↔まなぼ） ──
const PARTNER_ID = 'shared';      // まなぼみにから見た相手
const MY_ID = 'mini-shared';

async function fsWritePartner(docId, data) {
  const db = getDB();
  const snap = await db.collection('manabo').doc(docId).get();
  const existing = snap.exists ? snap.data() : {};
  await db.collection('manabo').doc(docId).set({ ...existing, ...data });
}

async function fsReadPartner(docId) {
  const db = getDB();
  const snap = await db.collection('manabo').doc(docId).get();
  return snap.exists ? snap.data() : null;
}

// ── お手紙 ──
async function sendLetter(toId, fromName, text) {
  const d = await fsReadPartner(toId) || {};
  const letters = d.letters ? JSON.parse(d.letters) : [];
  letters.push({ from: fromName, text, at: Date.now() });
  if (letters.length > 10) letters.splice(0, letters.length - 10);
  await fsWritePartner(toId, { letters: JSON.stringify(letters) });
}

async function openLetterModal() {
  document.getElementById('letter-modal').style.display = 'flex';
  await loadReceivedLetters();
}
function closeLetterModal() {
  document.getElementById('letter-modal').style.display = 'none';
}

async function loadReceivedLetters() {
  const el = document.getElementById('letter-received');
  el.textContent = '読み込み中…';
  try {
    const d = await fsReadPartner(MY_ID) || {};
    const letters = d.letters ? JSON.parse(d.letters) : [];
    if (letters.length === 0) { el.textContent = 'まだお手紙ないよ〜'; return; }
    el.innerHTML = letters.slice().reverse().map(l => `
      <div style="background:#fff0e0;border-radius:10px;padding:9px 12px;margin-bottom:6px">
        <div style="font-size:10px;color:#c08040;margin-bottom:4px">${l.from} より・${new Date(l.at).toLocaleDateString('ja-JP')}</div>
        <div style="font-size:.88rem;color:#2d2040;line-height:1.6">${esc(l.text)}</div>
      </div>`).join('');
    await generateOmiyageFromLetter(letters.slice(-3));
  } catch(e) { el.textContent = 'よめなかったよ…'; }
}

async function doSendLetter() {
  const txt = document.getElementById('letter-input').value.trim();
  if (!txt) return;
  document.getElementById('letter-send-btn').disabled = true;
  try {
    await sendLetter(PARTNER_ID, S.petName, txt);
    const sentText = txt;
    document.getElementById('letter-input').value = '';
    document.getElementById('letter-sent-msg').style.display = '';
    setTimeout(() => { document.getElementById('letter-sent-msg').style.display = 'none'; }, 2500);
    typeText('てがみおくったよ！えへへ！');
    bounce(); showHappy(true);
    await generateOmiyageFromLetter([{ from: S.petName, text: sentText }]);
  } catch(e) { alert('おくれなかった…もう一回！'); }
  document.getElementById('letter-send-btn').disabled = false;
}

// ── 合同日記・合同小説 ──
async function generateJointDiary(type) {
  const out = document.getElementById('diary-out');
  out.textContent = 'かいてる…';
  document.getElementById('diary-meta').style.display = 'none';
  bounce();

  const myTopics = S.knowledge.slice().sort(() => Math.random()-.5).slice(0,4)
    .map(k => `[${k.subject}]${k.topic}：${k.summary}`).join('\n');

  let partnerTopics = '';
  try {
    const d = await fsReadPartner(PARTNER_ID);
    if (d?.knowledge) {
      const pk = JSON.parse(d.knowledge).slice().sort(() => Math.random()-.5).slice(0,4);
      partnerTopics = pk.map(k => `[${k.subject}]${k.topic}：${k.summary}`).join('\n');
    }
  } catch(e) {}

  const sys = type === '合同日記'
    ? `ペット「まなぼ」と「まなぼみに」の2匹が一緒に書いた共同日記。まなぼはユーモアがありツッコミ役のせんぱい的な存在（性別なし・妖精みたいなキャラ）。まなぼみには生意気で鋭くてアホな面もある愉快なキャラ。語尾ルール：まなぼは「〜だぼ」「ぎゃぼー」、まなぼみには「〜だよ！」「えへへ」「わあ！」。300字以内。プレーンテキストのみ。`
    : `ペット「まなぼ」と「まなぼみに」の2匹が一緒に作った短編小説。まなぼはユーモアたっぷりのツッコミ役せんぱい（性別なし・妖精みたいなキャラ）、まなぼみには生意気な主人公。2匹の知識がカオスにまざる。400字以内。プレーンテキストのみ。`;

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `まなぼみにの知識:\n${myTopics||'なし'}\n\nまなぼの知識:\n${partnerTopics||'なし'}` }] }]);
    out.textContent = raw.trim();
    const meta = document.getElementById('diary-meta');
    meta.textContent = `まなぼ×まなぼみに の${type}・${new Date().toLocaleDateString('ja-JP')}`;
    meta.style.display = '';
    bounce(); showHappy(true);
    typeText('いっしょにかいたよ！えへへ！');
  } catch(e) { out.textContent = 'かけなかった…ごめんね'; }
}

// ── まなぼを招待 ──
let manaboInChat = false;

async function inviteManabo() {
  if (manaboInChat) return;
  manaboInChat = true;
  document.getElementById('invite-manabo-btn').style.display = 'none';
  document.getElementById('bye-manabo-btn').style.display = '';

  // まなぼのpetName・personaをFirebaseから取得
  let manaboName = 'まなぼ';
  let manaboPersona = '';
  try {
    const d = await fsReadPartner(PARTNER_ID);
    if (d) {
      manaboName = d.petName || 'まなぼ';
      manaboPersona = d.persona || '';
    }
  } catch(e) {}

  // まなぼのキャラでチャットに登場
  const sys = `あなたはペット「${manaboName}」。ユーモアがあってお笑い芸人みたいに面白いせんぱい的な存在。性別なし・妖精みたいなキャラ。話をよく聞きながらツッコミを入れる。
${manaboPersona ? `【${manaboName}の性格メモ：${manaboPersona}】` : ''}
今「${S.petName}」（幼稚園〜小学生・生意気・好奇心旺盛・アホかわいい）の部屋に遊びに来た。語尾は「〜だぼ」「ぎゃぼー」「わぼ」など。返答40字以内。`;

  // まなぼのappearanceをサーバーから直接取得（キャッシュバイパス）
  let manaboAppearance = null;
  try {
    const db = getDB();
    const snap = await db.collection('manabo').doc(PARTNER_ID).get({ source: 'server' });
    if (snap.exists) {
      const latest = snap.data();
      if (latest.appearance) manaboAppearance = JSON.parse(latest.appearance);
      if (latest.petName) manaboName = latest.petName;
    }
  } catch(e) {
    try {
      const latest = await fsReadPartner(PARTNER_ID);
      if (latest?.appearance) manaboAppearance = JSON.parse(latest.appearance);
      if (latest?.petName) manaboName = latest.petName;
    } catch(e2) {}
  }
  const manaboSVG = buildMiniSVG(manaboAppearance, 28);

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `${manaboName}が${S.petName}の部屋に遊びに来た。登場の一言を言って。` }] }]);
    addChatMsgWithSVG(manaboSVG, raw.trim(), '#ede0ff', '#c5aaf0');
    typeText(`わあ！${manaboName}がきた！えへへ！`);
  } catch(e) {
    addChatMsgWithSVG(manaboSVG, 'ぎゃぼー！元気だぼ？', '#ede0ff', '#c5aaf0');
    typeText('わあ！まなぼがきた！えへへ！');
  }
  bounce(); showHappy(true);

  window._manaboName = manaboName;
  window._manaboPersona = manaboPersona;
  window._manaboSVG = manaboSVG;
  S.partnerName = manaboName;
}

async function byeManabo() {
  if (!manaboInChat) return;
  manaboInChat = false;
  document.getElementById('invite-manabo-btn').style.display = '';
  document.getElementById('bye-manabo-btn').style.display = 'none';
  const manaboName = window._manaboName || 'まなぼ';
  const manaboSVG = window._manaboSVG || buildMiniSVG(null, 28);
  addChatMsgWithSVG(manaboSVG, 'じゃあまたね〜だぼ！みにちゃん元気でね！（去り際にツッコむ）', '#ede0ff', '#c5aaf0');
  typeText('まなぼかえっちゃった…またきてね！えへへ');
  await generateOmiyage(manaboName);
}

async function generateOmiyage(partnerName) {
  const recentChat = S.chatHistory.slice(-10)
    .map(m => `${m.role === 'user' ? 'ユーザー' : partnerName}：${m.parts?.[0]?.text || ''}`)
    .join('\n');
  if (!recentChat.trim()) return;

  const sys = `会話ログから「ふたつのペットが一緒に話して生まれた気づき・発見・面白い視点」を1〜3個抽出してください。
JSON形式のみ:
[{"topic":"（発見の短いタイトル）","insight":"（どんなひらめきか1文、子どもでも分かる言葉で）","from":"${partnerName}"}]
何もなければ空配列 [] を返す。`;

  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `会話ログ:\n${recentChat}` }] }]);
    const items = parseJSON(raw);
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        S.omiyage.push({
          id: crypto.randomUUID(),
          topic: item.topic,
          insight: item.insight,
          from: item.from || partnerName,
          at: Date.now(),
        });
      });
      const prevLv = S.kouryuLv;
      S.kouryuLv = S.omiyage.length;
      await saveState();
      showToast(`🎁 おみやげ！${items.length}こ とどいたよ！`);
      typeText(`わあ！まなぼとはなしてひらめいたよ！えへへ！`);
      checkKouryuUnlock(prevLv, S.kouryuLv);
    }
  } catch(e) { console.warn('omiyage error', e); }
}

function addChatMsgWithIcon(role, icon, text) {
  const c = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg manabo';
  div.innerHTML = `
    <div style="width:28px;height:28px;border-radius:50%;background:#ede0ff;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${icon}</div>
    <div class="msg-bub" style="background:#ede0ff;border-color:#c5aaf0">${esc(text)}</div>
    <div class="msg-time">${nowTime()}</div>`;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

// ── お手紙からおみやげ知識を生成 ──
async function generateOmiyageFromLetter(letters) {
  if (!letters || letters.length === 0) return;
  const latestLetters = letters.slice(-3).map(l => `${l.from}：${l.text}`).join('\n');
  const sys = `お手紙の内容から「気づき・発見・ひらめき」を0〜2個抽出してください。
JSON形式のみ:
[{"topic":"（気づきの短いタイトル）","insight":"（どんな気づきか1文、ひらがなメイン）","from":"手紙"}]
何もなければ空配列 [] を返す。`;
  try {
    const raw = await callGemini(sys, [{ role:'user', parts:[{ text: `お手紙:\n${latestLetters}` }] }]);
    const items = parseJSON(raw);
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        if (!S.omiyage.some(o => o.topic === item.topic)) {
          S.omiyage.push({ id: crypto.randomUUID(), topic: item.topic, insight: item.insight, from: item.from || '手紙', at: Date.now() });
        }
      });
      const prevLv = S.kouryuLv;
      S.kouryuLv = S.omiyage.length;
      await saveState();
      renderKnowledge();
      if (items.length > 0) {
        showToast(`💌 てがみからひらめき ${items.length}こ とどいたよ！`);
        checkKouryuUnlock(prevLv, S.kouryuLv);
      }
    }
  } catch(e) { console.warn('letter omiyage error', e); }
}

// ── Firebase強制リフレッシュ ──
async function forceRefresh() {
  showToast('🔄 さいしんデータをよみこんでるよ…');
  try {
    const db = getDB();
    const snap = await db.collection('manabo').doc(MANABO_ID).get({ source: 'server' });
    if (snap.exists) {
      const d = snap.data();
      S.level    = d.level    || S.level;
      S.xp       = d.xp       || S.xp;
      S.xpMax    = d.xpMax    || S.xpMax;
      S.knowledge = d.knowledge ? JSON.parse(d.knowledge).map(k => ({
        id: k.id || crypto.randomUUID(), subject: k.subject || 'にちじょう',
        topic: k.topic || '', summary: k.summary || '',
        misunderstanding: k.misunderstanding || '',
        createdAt: k.createdAt || Date.now(), secret: k.secret || false,
      })) : S.knowledge;
      S.gobi     = d.gobi    ? JSON.parse(d.gobi) : S.gobi;
      S.omiyage  = d.omiyage  ? JSON.parse(d.omiyage) : S.omiyage;
      S.kouryuLv = d.kouryuLv || S.kouryuLv;
      S.petName  = d.petName  || S.petName;
      S.persona  = d.persona  || S.persona;
      if (d.appearance) try { Object.assign(S.appearance, JSON.parse(d.appearance)); } catch(_) {}
    }
    updateHeader();
    renderKnowledge();
    applyAppearance();
    showToast('✓ さいしんにしたよ！えへへ！');
    typeText('わあ！あたらしくなったよ！えへへ！');
  } catch(e) {
    showToast('⚠ よみこめなかった…もう一かいおしてね！');
  }
}

// ── 交流レベル解放通知 ──
function checkKouryuUnlock(prevLv, newLv) {
  const unlocks = [
    { at: 3,  msg: '✨ ひらめきにっき（しょきゅう）がかけるようになったよ！にっきタブからかけるよ！' },
    { at: 10, msg: '🌟 ひらめきにっき（ちゅうきゅう）になったよ！もっとすごいひらめきがかけるよ！' },
    { at: 20, msg: '💫 ひらめきにっき（じょうきゅう）になったよ！さいきょうのひらめきがかけるよ！' },
  ];
  unlocks.forEach(u => {
    if (prevLv < u.at && newLv >= u.at) {
      setTimeout(() => {
        document.getElementById('lv-msg').textContent = u.msg;
        document.getElementById('lv-overlay').classList.add('show');
      }, 1500);
    }
  });
}

// ── アイテムクリエーション（まなぼみに版） ──
async function craftNewItem() {
  // 最後の発明から24時間経過していたらリセット
  const now = Date.now();
  const lastCraft = S.craftDate ? Number(S.craftDate) : 0;
  // 古い日付文字列（NaN or 0）の場合もリセット扱いに
  const isOldFormat = !S.craftDate || isNaN(lastCraft) || lastCraft < 1000000000000;
  if (isOldFormat || now - lastCraft >= 24 * 60 * 60 * 1000) { S.craftCount = 0; S.craftDate = ''; }
  if (S.craftCount >= 2) { showToast('きょうはもう2かいはつめいしたよ！あしたまたね！'); return; }
  const btn = document.getElementById('craft-btn');
  if (btn) btn.disabled = true;
  typeText('はつめいちゅうだよ…わくわく！✨');
  bounce();
  const item = craftItem(S.level, S.kouryuLv);
  const ri = RARITY_INFO[item.rarity];
  S.craftCount++;
  if (S.craftCount === 1) S.craftDate = String(Date.now()); // 最初の発明時刻を記録
  const newItem = { ...item, shopId: crypto.randomUUID(), listedAt: null, sold: false, craftedAt: Date.now() };
  S.inventory.push(newItem);
  updateHeader();
  renderInventory();
  saveState().catch(e => console.warn('save error', e));
  document.getElementById('craft-result-modal').style.display = 'flex';
  document.getElementById('craft-result-emoji').textContent = ri.emoji;
  document.getElementById('craft-result-name').textContent = item.name;
  document.getElementById('craft-result-desc').textContent = item.desc;
  document.getElementById('craft-result-rarity').textContent = ri.name;
  document.getElementById('craft-result-price').textContent = `¥${item.price.toLocaleString()}`;
  document.getElementById('craft-result-rarity').style.cssText = `color:${ri.color};font-weight:700;font-size:.85rem`;
  const msg = item.rarity === 4 ? `わあ！！でんせつだよ！！「${item.name}」！！えへへ！！` :
              item.rarity === 3 ? `すごい！レアだよ！「${item.name}」！えへへ！` :
              item.rarity === 2 ? `やった！「${item.name}」できたよ！` :
              item.rarity === 0 ? `あ…しっぱいしちゃった…「${item.name}」…えへへ` :
              `「${item.name}」できたよ！えへへ！`;
  typeText(msg);
  showHappy(item.rarity >= 2); bounce();
  if (btn) btn.disabled = false;
}
function closeCraftResult() { document.getElementById('craft-result-modal').style.display = 'none'; }

async function listItemToShop(i) {
  if (S.shopItems.length >= 10) { showToast('ショップがいっぱいだよ！うれたらあくよ！'); return; }
  const item = S.inventory[i];
  if (!item) return;
  S.shopItems.push({ ...item, listedAt: Date.now(), sold: false });
  S.inventory.splice(i, 1);
  await saveState(); renderInventory();
  showToast(`✨「${item.name}」をショップにだしたよ！`);
}
async function delistFromShop(i) {
  const item = S.shopItems[i];
  if (!item || item.sold) return;
  S.inventory.push({ ...item, listedAt: null });
  S.shopItems.splice(i, 1);
  await saveState(); renderInventory();
}
function renderInventory() {
  document.getElementById('inv-coins').textContent = S.coins.toLocaleString();
  document.getElementById('inv-shop-count').textContent = S.shopItems.length;
  document.getElementById('inv-items').innerHTML = S.inventory.length === 0
    ? '<div style="color:#b0a0cc;font-size:.82rem;text-align:center;padding:1rem">アイテムボックスはからだよ！はつめいしよ！</div>'
    : S.inventory.map((item,i) => {
        const ri = RARITY_INFO[item.rarity];
        return `<div style="background:#fdf8f0;border:1px solid #ffd0a0;border-radius:10px;padding:9px 11px;display:flex;gap:8px;align-items:center">
          <div style="font-size:1.4rem">${ri.emoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:.82rem;font-weight:600;color:#2d2040">${esc(item.name)}</div>
            <div style="font-size:.72rem;color:#c08040">¥${item.price.toLocaleString()} / ${ri.name}</div>
          </div>
          <button onclick="listItemToShop(${i})" style="flex-shrink:0;padding:4px 10px;border-radius:99px;border:1px solid #ffb870;background:#fff0e0;color:#c06010;font-size:.72rem;font-family:inherit;cursor:pointer">しゅっぴん</button>
        </div>`;
      }).join('');
  document.getElementById('inv-shop').innerHTML = S.shopItems.length === 0
    ? '<div style="color:#b0a0cc;font-size:.82rem;text-align:center;padding:1rem">しゅっぴんちゅうのアイテムはないよ</div>'
    : S.shopItems.map((item,i) => {
        const ri = RARITY_INFO[item.rarity];
        return `<div style="background:#fff8e0;border:1px solid #f0d080;border-radius:10px;padding:9px 11px;display:flex;gap:8px;align-items:center">
          <div style="font-size:1.4rem">${ri.emoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:.82rem;font-weight:600;color:#2d2040">${esc(item.name)}</div>
            <div style="font-size:.72rem;color:#c08040">¥${item.price.toLocaleString()} ${item.sold ? '✅うれた！' : 'しゅっぴんちゅう'}</div>
          </div>
          ${!item.sold ? `<button onclick="delistFromShop(${i})" style="flex-shrink:0;padding:4px 9px;border-radius:99px;border:1px solid #ccc;background:#f5f5f5;color:#666;font-size:.72rem;font-family:inherit;cursor:pointer">とりさげ</button>` : ''}
        </div>`;
      }).join('');
}
async function openInventory() {
  document.getElementById('inventory-modal').style.display='flex';
  try {
    const db = getDB();
    const snap = await db.collection('manabo').doc(MANABO_ID).get({ source: 'server' });
    if (snap.exists) {
      const d = snap.data();
      S.shopItems = d.shopItems ? JSON.parse(d.shopItems) : [];
      S.inventory = d.inventory ? JSON.parse(d.inventory) : [];
      S.coins = d.coins || S.coins;
      updateHeader();
    }
  } catch(e) {}
  renderInventory();
}
function closeInventory() { document.getElementById('inventory-modal').style.display='none'; }

// 作品を評価して出品（まなぼみに版）
async function sellDiaryWork() {
  const work = S._lastWork;
  if (!work) return;
  const btn = document.getElementById('diary-sell-btn');
  btn.disabled = true;
  btn.textContent = 'ひょうかちゅう…';
  typeText('ひょうかしてもらってるよ…わくわく！');

  const evalSys = `以下の幼児向けペットが書いた文章を評価してください。
評価基準（厳しめに）：
- ★1：知識がほとんど使われていない
- ★2：知識は少し使われている
- ★3：知識を上手く使っていて面白い（ここが標準）
- ★4：知識の使い方が光る・かわいいキャラ表現も素晴らしい（めったに出ない）
- ★5：読んでほっこりする本当の傑作（非常に稀）
★4以上は滅多に出さないこと。
JSONのみ（コードブロック不要）:
{"score":1〜5の整数,"title":"作品タイトル（20字以内・かわいくセンスよく）","reason":"評価理由1文"}`;

  try {
    const raw = await callGemini(evalSys, [{ role:'user', parts:[{ text: work.content }] }]);
    const result = parseJSON(raw);
    const score = Math.max(1, Math.min(5, result.score || 1));
    const title = result.title || `${S.petName}の${work.type}`;
    const rarityMap = [null,1,1,2,3,4];
    const priceRanges = [null,[3,30],[50,150],[200,600],[800,2500],[3000,10000]];
    const rarity = rarityMap[score];
    const [pmin,pmax] = priceRanges[score];
    const price = Math.floor(Math.random()*(pmax-pmin+1))+pmin;

    const workItem = {
      id: 9000+Math.floor(Math.random()*999),
      name: title,
      desc: `${S.petName}が書いた${work.type}。「${work.content.slice(0,30)}…」`,
      cat:'本', rarity, price,
      shopId: crypto.randomUUID(),
      listedAt:null, sold:false, craftedAt:Date.now(), isWork:true,
    };
    S.inventory.push(workItem);
    await saveState();
    renderInventory();

    const ri = RARITY_INFO[rarity];
    const stars = '★'.repeat(score)+'☆'.repeat(5-score);
    showToast(`${ri.emoji}「${title}」${stars} ¥${price.toLocaleString()}！アイテムボックスにはいったよ！`);
    typeText(score>=4 ? `わあ！さいこう！「${title}」！えへへ！！` : score>=3 ? `やった！「${title}」できた！` : `「${title}」…まあまあかな？えへへ`);
    bounce();
    btn.style.display = 'none';
    S._lastWork = null;
  } catch(e) {
    btn.disabled = false;
    btn.textContent = `📖 この${work.type}をショップにだす`;
    showToast('ひょうかできなかったよ…もう一かいおしてね！');
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
