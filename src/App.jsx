import { useState } from 'react';
import './App.css';

// --- ★ データ定義 (韓国語の読み仮名を完全統一) ---
const appData = {
  // ==========================================
  // 🇺🇸 英語 (US)
  // ==========================================
  en: {
    title: "Native Phrase Book 🇺🇸",
    voiceLang: "en-US",
    categories: {
      cafe: [
        { text: "It's my go-to.", jp: "いつものやつです（定番です）。", desc: "Go-to＝お気に入り、定番。" },
        { text: "Can I get this to go?", jp: "持ち帰りでお願いします。", desc: "Takeout よりも To go。" },
        { text: "It's on me.", jp: "ここは私がおごるよ。", desc: "お会計時のキメ台詞。" },
        { text: "Do you have wifi here?", jp: "ここにWi-Fiはありますか？", desc: "海外カフェの必須フレーズ。" },
        { text: "I'm craving a latte.", jp: "無性にラテが飲みたいなあ。", desc: "Crave＝〜が欲しくてたまらない。" },
        { text: "This spot is a hidden gem.", jp: "ここは穴場なんだ。", desc: "Hidden gem＝隠れた宝石。" },
        { text: "Can I have extra whip?", jp: "ホイップ多めにできますか？", desc: "Extra＝追加、多め。" },
        { text: "Let's grab a coffee.", jp: "ちょっとコーヒーでも飲みに行こうよ。", desc: "Grab＝サクッと行く。" }
      ],
      school: [
        { text: "I pulled an all-nighter.", jp: "徹夜しちゃったよ。", desc: "All-nighter＝徹夜。" },
        { text: "Did you ace the test?", jp: "テスト、楽勝だった？", desc: "Ace＝完璧にこなす。" },
        { text: "I'm totally wiped out.", jp: "もうヘトヘトだよ。", desc: "Wiped out＝全滅、疲れ果てた。" },
        { text: "Don't slack off!", jp: "サボるなよ！", desc: "Slack off＝怠ける。" },
        { text: "I'm cramming for the exam.", jp: "一夜漬けで詰め込み勉強中だよ。", desc: "Cram＝詰め込む。" },
        { text: "Let's ditch class.", jp: "授業サボってどこか行こうぜ。", desc: "Ditch＝捨てる、サボる。" },
        { text: "He's a teacher's pet.", jp: "あいつ、先生のお気に入りだからな。", desc: "媚びを売る優等生のこと。" },
        { text: "My mind went blank.", jp: "頭が真っ白になった。", desc: "テストで答えが飛んだ時に。" }
      ],
      friends: [
        { text: "Wanna hang out?", jp: "今日あそばない？", desc: "Hang out＝目的なく一緒に過ごす。" },
        { text: "I'm down.", jp: "いいよ！（賛成！）", desc: "誘いに対するポジティブな返事。" },
        { text: "Let's grab a bite.", jp: "なんか軽く食べに行こうよ。", desc: "Grab a bite＝サクッと食べる。" },
        { text: "Hit me up later.", jp: "あとで連絡してよ。", desc: "Hit me up＝連絡ちょうだい。" },
        { text: "No biggie.", jp: "大したことないよ（気にしないで）。", desc: "No big deal の略。" },
        { text: "Same here.", jp: "私も同じ（私の方こそ）。", desc: "Me too よりも大人っぽい同調。" },
        { text: "You wanna come over?", jp: "うちに来ない？", desc: "Come over＝（家に）来る。" },
        { text: "I gotta bounce.", jp: "そろそろ行かなくちゃ。", desc: "Bounce＝弾むように去る。" }
      ],
      date: [
         { text: "You look stunning.", jp: "すごく素敵だよ。", desc: "Beautiful よりも衝撃的な美しさ。" },
         { text: "I had a blast today.", jp: "今日はめちゃくちゃ楽しかった。", desc: "Blast＝爆発するほど楽しい。" },
         { text: "Let's split the bill.", jp: "割り勘にしよう。", desc: "Split＝割る。" },
         { text: "Pick you up at 7?", jp: "7時に迎えに行くね？", desc: "車社会の定番フレーズ。" },
         { text: "We just clicked.", jp: "私たち、すぐに意気投合したの。", desc: "Click＝カチッとハマる。" },
         { text: "She's a keeper.", jp: "彼女は絶対に手放しちゃダメだよ。", desc: "Keepすべき大切な人。" },
         { text: "Are you seeing anyone?", jp: "付き合ってる人はいるの？", desc: "Seeing＝付き合っている。" },
         { text: "I'm falling for you.", jp: "好きになりかけている。", desc: "恋に落ちている途中。" }
      ],
      shopping: [
         { text: "I'm just browsing, thanks.", jp: "見ているだけです。", desc: "店員さんへの鉄板の返し。" },
         { text: "Is this on sale?", jp: "これはセール品ですか？", desc: "On sale＝特売中。" },
         { text: "It's a bit out of my budget.", jp: "ちょっと予算オーバーかな。", desc: "Budget＝予算。" },
         { text: "Do you have this in M?", jp: "これのMサイズはありますか？", desc: "In black?（黒は？）など応用可能。" },
         { text: "Can I try this on?", jp: "試着してもいいですか？", desc: "Try on＝試着する。" },
         { text: "It's a steal!", jp: "めちゃくちゃお買い得だね！", desc: "Steal＝タダみたいな安さ。" },
         { text: "Does this match?", jp: "これ（服の組み合わせ）、合ってる？", desc: "Match＝調和する。" },
         { text: "I'll take it.", jp: "これにします（買います）。", desc: "購入決定の合図。" }
      ],
      airport: [
         { text: "I have a layover in LA.", jp: "ロスで乗り継ぎがあるんだ。", desc: "乗り継ぎ＝Layover。" },
         { text: "Is my flight on time?", jp: "フライトは定刻通りですか？", desc: "On time＝時間通り。" },
         { text: "Window seat, please.", jp: "窓側の席をお願いします。", desc: "通路側は Aisle seat。" },
         { text: "Where is baggage claim?", jp: "手荷物受取所はどこですか？", desc: "荷物を受け取る場所。" },
         { text: "I have nothing to declare.", jp: "申告するものはありません。", desc: "税関での決まり文句。" },
         { text: "I'm totally jet-lagged.", jp: "時差ボケがひどいよ。", desc: "Jet lag＝時差ボケ。" },
         { text: "Can I get a blanket?", jp: "ブランケットをもらえますか？", desc: "機内が寒い時に。" },
         { text: "It's a long-haul flight.", jp: "長距離フライトなんだ。", desc: "Long-haul＝長距離。" }
      ],
      hostfamily: [
         { text: "It smells good!", jp: "すごくいい匂いがする！", desc: "料理を褒める時の定番。" },
         { text: "I'm stuffed.", jp: "もうお腹いっぱい！", desc: "Stuffed＝詰め込まれた（満腹）。" },
         { text: "Can I help with the dishes?", jp: "お皿洗い、手伝いましょうか？", desc: "好感度アップ間違いなし。" },
         { text: "What time is curfew?", jp: "門限は何時ですか？", desc: "Curfew＝門限。" },
         { text: "I'll be back by 6.", jp: "6時までには戻ります。", desc: "By＝期限。" },
         { text: "Can I use the washer?", jp: "洗濯機を使ってもいいですか？", desc: "Washer＝洗濯機。" },
         { text: "Thank you for having me.", jp: "受け入れてくれてありがとう。", desc: "去り際の挨拶。" },
         { text: "Make yourself at home.", jp: "自分の家だと思ってくつろいでね。", desc: "言われたらリラックスしてOK。" }
      ],
      class: [
         { text: "Can I borrow a pen?", jp: "ペンを借りてもいい？", desc: "Borrow＝借りる。" },
         { text: "I didn't catch that.", jp: "聞き取れませんでした。", desc: "Catch＝捕まえる（聞き取る）。" },
         { text: "Is this on the test?", jp: "これってテストに出ますか？", desc: "最重要質問。" },
         { text: "Can I go to the restroom?", jp: "トイレに行ってもいいですか？", desc: "学校では Bathroom ではなく Restroom。" },
         { text: "My brain is fried.", jp: "もう頭がパンクしそう。", desc: "脳みそが揚げ物になった（疲労困憊）。" },
         { text: "What page are we on?", jp: "今どこのページですか？", desc: "迷子になった時に。" },
         { text: "Did you do the homework?", jp: "宿題やった？", desc: "授業前の定番。" },
         { text: "Can you explain that again?", jp: "もう一度説明してくれますか？", desc: "わからない時は素直に。" }
      ]
    }
  },
  
  // ==========================================
  // 🇰🇷 韓国語 (KR) - 読み仮名完全対応版
  // ==========================================
  kr: {
    title: "Native Phrase Book 🇰🇷",
    voiceLang: "ko-KR",
    categories: {
      cafe: [
        { text: "아아 주세요 (A-a ju-se-yo).", jp: "アイスアメリカーノください。", desc: "「アイス・アメリカーノ」の略。韓国カフェの基本。" },
        { text: "포장해 주세요 (Po-jang-hae ju-se-yo).", jp: "持ち帰りにしてください。", desc: "包装（ポジャン）＝持ち帰り。" },
        { text: "와이파이 비밀번호 뭐예요? (Wa-i-pa-i bi-mil-beon-ho mwo-ye-yo?)", jp: "Wi-Fiのパスワードは何ですか？", desc: "韓国カフェはWi-Fi完備が基本。" },
        { text: "영수증은 버려 주세요 (Yeong-su-jeung-eun beo-ryeo ju-se-yo).", jp: "レシートは捨ててください。", desc: "不要な場合は先に言うのがスマート。" },
        { text: "진동벨 울리면 알려주세요 (Jin-dong-bel ul-li-myeon al-lyeo-ju-se-yo).", jp: "呼び出しベルが鳴ったら教えて。", desc: "韓国カフェは振動ベルが主流。" },
        { text: "샷 추가해 주세요 (Syat chu-ga-hae ju-se-yo).", jp: "ショット追加してください。", desc: "濃いめが好きな時に。" },
        { text: "휘핑은 빼 주세요 (Hwi-ping-eun ppae ju-se-yo).", jp: "ホイップは抜いてください。", desc: "ダイエット中などに。" },
        { text: "여기 자리 있어요? (Yeo-gi ja-ri i-sseo-yo?)", jp: "ここ、席空いてますか？", desc: "混雑時に必須の確認。" }
      ],
      school: [
        { text: "벼락치기 했어 (Bye-rak-chi-gi hae-sseo).", jp: "一夜漬けしたよ。", desc: "稲妻（ピョラク）のように打つ＝一夜漬け。" },
        { text: "시험 망쳤어 (Si-heom mang-chyeo-sseo).", jp: "テスト終わった（やらかした）...", desc: "マンチョッソ＝台無しにした。" },
        { text: "땡땡이 치자! (Ttaeng-ttaeng-i chi-ja!)", jp: "サボろうぜ！", desc: "授業をサボって遊ぶこと。" },
        { text: "족보 있어? (Jok-bo i-sseo?)", jp: "過去問持ってる？", desc: "チョッポ＝族譜（家系図）だが、大学では「過去問」の意味。" },
        { text: "학점 잘 나왔어? (Hak-jeom jal na-wa-sseo?)", jp: "単位（成績）よかった？", desc: "韓国の学生は成績（ハクチョム）に敏感。" },
        { text: "재수강 해야돼 (Jae-su-gang hae-ya-dwae).", jp: "再履修しなきゃ。", desc: "成績が悪くて同じ授業を取り直すこと。" },
        { text: "과팅 할래? (Gwa-ting hal-lae?)", jp: "学科ごとの合コンしない？", desc: "グァ（学科）＋ミーティング（合コン）。" },
        { text: "오늘 휴강이래 (O-neul hyu-gang-i-rae).", jp: "今日、休講だって。", desc: "一番嬉しい言葉。" }
      ],
      friends: [
        { text: "밥 먹었어? (Bap meo-geo-sseo?)", jp: "ご飯食べた？（元気？）", desc: "挨拶代わりの言葉。本当に食べたか聞く意図は薄い。" },
        { text: "대박 (Dae-bak).", jp: "やばっ！／すごい！", desc: "良いことにも悪いことにも使える万能語。" },
        { text: "꿀잼이야 (Kkul-jaem-i-ya).", jp: "超おもしろい！", desc: "蜂蜜（ックル）＋面白い（チェム）。" },
        { text: "읽씹 당했어 (Ik-ssip dang-hae-sseo).", jp: "既読スルーされた。", desc: "読んで（イク）無視する（シッ）。" },
        { text: "불금 보내자! (Bul-geum bo-nae-ja!)", jp: "花金を楽しもう！", desc: "燃える（プル）金曜日（クム）。" },
        { text: "지금 어디야? (Ji-geum eo-di-ya?)", jp: "今どこ？", desc: "待ち合わせの定番。" },
        { text: "헐 (Heol).", jp: "はぁ...（呆）／えぇっ（驚）。", desc: "言葉を失った時のリアクション。" },
        { text: "내가 쏠게! (Nae-ga ssol-ge!)", jp: "私がごちそうするよ（撃つよ）！", desc: "おごる＝撃つ（ッソルゲ）。カッコイイ表現。" }
      ],
      date: [
        { text: "썸 타는 중이야 (Sseom ta-neun jung-i-ya).", jp: "いい感じの人がいるんだ。", desc: "Some（サム）＝付き合う前の微妙な関係。" },
        { text: "라면 먹고 갈래? (Ra-myeon meok-go gal-lae?)", jp: "ラーメン食べていく？", desc: "家への誘い文句（かなり意味深）。" },
        { text: "오늘부터 1일 (O-neul-bu-teo i-ril).", jp: "今日から付き合って1日目。", desc: "交際開始日を記念する文化。" },
        { text: "모솔이야 (Mo-sol-i-ya).", jp: "母胎ソロ（一度も恋人がいたことない）。", desc: "母親のお腹にいた時からソロ。" },
        { text: "밀당 하지마 (Mil-dang ha-ji-ma).", jp: "駆け引きしないで。", desc: "押す（ミル）引く（タン）＝駆け引き。" },
        { text: "이상형이 뭐예요? (I-sang-hyeong-i mwo-ye-yo?)", jp: "理想のタイプは？", desc: "合コンでの定番質問。" },
        { text: "첫눈에 반했어 (Cheot-nun-e ban-hae-sseo).", jp: "一目惚れした。", desc: "ドラマのような展開。" },
        { text: "더치페이 하자 (Deo-chi-pe-i ha-ja).", jp: "割り勘にしよう。", desc: "ダッチペイ＝割り勘。" }
      ],
      shopping: [
        { text: "이거 얼마예요? (I-geo eol-ma-ye-yo?)", jp: "これいくらですか？", desc: "基本中の基本。" },
        { text: "깎아 주세요~ (Kka-kka ju-se-yo).", jp: "まけてください〜。", desc: "市場では愛嬌よく言うのがコツ。" },
        { text: "입어봐도 돼요? (I-beo-bwa-do dwae-yo?)", jp: "着てみてもいいですか？", desc: "試着の確認。" },
        { text: "신상이에요? (Sin-sang-i-e-yo?)", jp: "新商品（新作）ですか？", desc: "シンサン＝新商品。" },
        { text: "서비스 주세요! (Seo-bi-su ju-se-yo!)", jp: "おまけしてください！", desc: "韓国では「サービス」＝無料のおまけ。" },
        { text: "환불 돼요? (Hwan-bul dwae-yo?)", jp: "払い戻し（返品）できますか？", desc: "購入前の確認。" },
        { text: "너무 비싸요 (Neo-mu bi-ssa-yo).", jp: "高すぎます。", desc: "値段交渉の第一歩。" },
        { text: "현금 영수증 해주세요 (Hyeon-geum yeong-su-jeung hae-ju-se-yo).", jp: "現金領収書をください。", desc: "年末調整で必要になるため。" }
      ],
      airport: [
        { text: "창가 자리 주세요 (Chang-ga ja-ri ju-se-yo).", jp: "窓側の席をください。", desc: "チャンガ＝窓側。" },
        { text: "통로 자리 주세요 (Tong-no ja-ri ju-se-yo).", jp: "通路側の席をください。", desc: "トンロ＝通路。" },
        { text: "수하물 어디서 찾아요? (Su-ha-mul eo-di-seo cha-ja-yo?)", jp: "手荷物はどこで受け取りますか？", desc: "スハムル＝受託手荷物。" },
        { text: "비행기 놓쳤어요 (Bi-haeng-gi no-chyeo-sseo-yo).", jp: "飛行機に乗り遅れました。", desc: "緊急事態。" },
        { text: "환전 어디서 해요? (Hwan-jeon eo-di-seo hae-yo?)", jp: "両替はどこでしますか？", desc: "ファンジョン＝両替。" },
        { text: "면세점 어디예요? (Myeon-se-jeom eo-di-ye-yo?)", jp: "免税店はどこですか？", desc: "ミョンセジョム＝免税店。" },
        { text: "탑승 시간이 언제예요? (Tap-seung si-gan-i eon-je-ye-yo?)", jp: "搭乗時間はいつですか？", desc: "タプスン＝搭乗。" },
        { text: "여권 보여주세요 (Yeo-kwon bo-yeo-ju-se-yo).", jp: "パスポートを見せてください。", desc: "入国審査で言われる言葉。" }
      ],
      hostfamily: [
        { text: "잘 먹겠습니다! (Jal meok-ge-sseum-ni-da!)", jp: "いただきます！", desc: "食事前の元気な挨拶。" },
        { text: "잘 먹었습니다! (Jal meok-eo-sseum-ni-da!)", jp: "ごちそうさまでした！", desc: "食後の感謝。" },
        { text: "설거지는 제가 할게요 (Seol-geo-ji-neun je-ga hal-ge-yo).", jp: "お皿洗いは私がやります。", desc: "ソルゴジ＝皿洗い。" },
        { text: "김치 진짜 맛있어요 (Kim-chi jin-jja ma-si-sseo-yo).", jp: "キムチ、本当に美味しいです。", desc: "キムチを褒めると喜ばれる。" },
        { text: "통금 시간 있어요? (Tong-geum si-gan i-sseo-yo?)", jp: "門限はありますか？", desc: "トングム＝通行禁止＝門限。" },
        { text: "친구 데려와도 돼요? (Chin-gu de-ryeo-wa-do dwae-yo?)", jp: "友達を連れてきてもいいですか？", desc: "事前の許可は必須。" },
        { text: "빨래 어디다 둬요? (Ppal-lae eo-di-da dwo-yo?)", jp: "洗濯物はどこに置けばいいですか？", desc: "ッパルレ＝洗濯。" },
        { text: "방해해서 죄송해요 (Bang-hae-hae-seo joe-song-hae-yo).", jp: "お邪魔してすみません。", desc: "謙虚な姿勢。" }
      ],
      class: [
        { text: "출튀 했어 (Chul-twi hae-sseo).", jp: "出席だけ取って逃げた。", desc: "出席（チュル）＋逃げる（トィ）。" },
        { text: "대리 출석 부탁해 (Dae-ri chul-seok bu-tak-hae).", jp: "代返（代わりに出席）お願い。", desc: "テリ＝代理。" },
        { text: "교수님! (Gyo-su-nim!)", jp: "教授（先生）！", desc: "大学では先生を「教授様（キョスニム）」と呼ぶ。" },
        { text: "과제 다 했어? (Gwa-je da hae-sseo?)", jp: "課題（宿題）全部やった？", desc: "クァジェ＝課題。" },
        { text: "발표 긴장돼 (Bal-pyo gin-jang-dwae).", jp: "発表、緊張する。", desc: "パルピョ＝プレゼン。" },
        { text: "휴강이래 (Hyu-gang-i-rae).", jp: "休講だって。", desc: "ヒュガン＝休講。" },
        { text: "재미없는 수업 (Jae-mi-eom-neun su-eop).", jp: "つまらない授業（面白くない授業）。", desc: "直球な感想。" },
        { text: "질문 있어요! (Jil-mun i-sseo-yo!)", jp: "質問あります！", desc: "積極的な姿勢。" }
      ]
    }
  },

  // ==========================================
  // 🇨🇳 中国語 (CN)
  // ==========================================
  cn: {
    title: "Native Phrase Book 🇨🇳",
    voiceLang: "zh-CN",
    categories: {
      cafe: [
        { text: "一杯冰美式 (Yī bēi bīng měishì).", jp: "アイスアメリカーノ一杯。", desc: "中国でも若者はアメリカーノ（美式）が好き。" },
        { text: "打包 (Dǎbāo).", jp: "持ち帰りで。", desc: "包む（バオ）＝テイクアウト。" },
        { text: "扫哪里？ (Sǎo nǎlǐ?)", jp: "（QRコードは）どこをスキャンすればいい？", desc: "中国はスマホ決済が主流。" },
        { text: "去冰，少糖 (Qù bīng, shǎo táng).", jp: "氷なし、砂糖少なめで。", desc: "ドリンクスタンドでの必須カスタマイズ用語。" },
        { text: "这里有人吗？ (Zhèlǐ yǒu rén ma?)", jp: "ここ、空いてますか？", desc: "直訳：ここに人はいますか？" },
        { text: "密码是多少？ (Mìmǎ shì duōshǎo?)", jp: "（Wi-Fiの）パスワードはいくつですか？", desc: "ミィマ＝パスワード。" },
        { text: "我要大杯 (Wǒ yào dàbēi).", jp: "Lサイズでお願いします。", desc: "大杯＝Lサイズ、中杯＝Mサイズ。" },
        { text: "推荐什么？ (Tuījiàn shénme?)", jp: "おすすめは何ですか？", desc: "迷った時に。" }
      ],
      school: [
        { text: "临时抱佛脚 (Línshí bào fójiǎo).", jp: "一夜漬け（泥縄）。", desc: "困った時だけ仏様の足を抱く＝土壇場の神頼み。" },
        { text: "学霸 (Xué bà).", jp: "ガリ勉／超優秀な人。", desc: "勉強（学）の覇者。" },
        { text: "我太难了 (Wǒ tài nán le).", jp: "もう無理（人生つらい）。", desc: "SNSで流行った、疲れ果てた時の言葉。" },
        { text: "挂科了 (Guà kē le).", jp: "単位落とした。", desc: "木に引っかかる（挂）＝不合格。" },
        { text: "逃课 (Táo kè).", jp: "授業をサボる。", desc: "逃げる（タオ）授業（クー）。" },
        { text: "点名了吗？ (Diǎnmíng le ma?)", jp: "出席とった？", desc: "遅刻した時に聞く言葉。" },
        { text: "这是必修课 (Zhè shì bìxiū kè).", jp: "これは必修科目だ。", desc: "落とせない授業。" },
        { text: "不想上学 (Bùxiǎng shàngxué).", jp: "学校行きたくない。", desc: "万国共通の悩み。" }
      ],
      friends: [
        { text: "吃了吗？ (Chī le ma?)", jp: "ご飯食べた？（調子どう？）", desc: "伝統的な挨拶。" },
        { text: "牛逼 (Niúbī).", jp: "すげぇ！／やばい！", desc: "最高にすごい時に使うスラング（男性がよく使う）。" },
        { text: "笑死 (Xiào sǐ).", jp: "ウケる（笑い死ぬ）。", desc: "日本語の「ワロタ」に近い感覚。" },
        { text: "太棒了 (Tài bàng le).", jp: "最高だ！／やったね！", desc: "素晴らしい成果を上げた時に。" },
        { text: "我们要去哪里？ (Wǒmen yào qù nǎlǐ?)", jp: "どこ行くの？", desc: "遊びの計画。" },
        { text: "没门儿 (Méiménr).", jp: "ありえない／無理。", desc: "ドア（門）がない＝方法がない。" },
        { text: "咱们走吧 (Zánmen zǒu ba).", jp: "行こうぜ。", desc: "咱们＝私たち（親しい間柄）。" },
        { text: "也是醉了 (Yěshì zuìle).", jp: "もう勘弁してよ（呆）。", desc: "酔っ払うほど訳がわからない＝呆れた。" }
      ],
      date: [
         { text: "土味情话 (Tǔwèi qínghuà).", jp: "クサイ説得文句。", desc: "ダサいけど笑える口説き文句のこと。" },
         { text: "单身狗 (Dānshēn gǒu).", jp: "独身（恋人がいない人）。", desc: "独身の犬。自虐的に使う。" },
         { text: "我请客 (Wǒ qǐngkè).", jp: "私がおごるよ。", desc: "客を招待する＝おごる。" },
         { text: "你很漂亮 (Nǐ hěn piàoliang).", jp: "君はとても綺麗だ。", desc: "ストレートな褒め言葉。" },
         { text: "各付各的吧 (Gè fù gè de ba).", jp: "割り勘にしよう。", desc: "「それぞれ自分の分を払おう」という意味。" },
         { text: "渣男 (Zhā nán).", jp: "クズ男。", desc: "搾りかす（渣）のような男＝プレイボーイ。" },
         { text: "撒娇 (Sājiāo).", jp: "甘える。", desc: "カップル間のいちゃつき。" },
         { text: "我喜欢你 (Wǒ xǐhuān nǐ).", jp: "君が好きだ。", desc: "告白の基本。" }
      ],
      shopping: [
        { text: "太贵了 (Tài guì le).", jp: "高すぎるよ。", desc: "値切る前のジャブ。" },
        { text: "便宜点儿吧 (Piányí diǎnr ba).", jp: "ちょっと安くしてよ。", desc: "値切りの基本フレーズ。" },
        { text: "有打折吗？ (Yǒu dǎzhé ma?)", jp: "割引はありますか？", desc: "打折＝割引。" },
        { text: "这就是爆款 (Zhè jiùshì bàokuǎn).", jp: "これがヒット商品（バズり商品）です。", desc: "爆発的に売れている型。" },
        { text: "能试穿吗？ (Néng shìchuān ma?)", jp: "試着できますか？", desc: "試穿＝試着。" },
        { text: "我要这个 (Wǒ yào zhège).", jp: "これにします。", desc: "指差して注文。" },
        { text: "可以退货吗？ (Kěyǐ tuìhuò ma?)", jp: "返品できますか？", desc: "退貨＝返品。" },
        { text: "买买买 (Mǎi mǎi mǎi).", jp: "爆買いする。", desc: "買う！買う！買う！" }
      ],
      airport: [
        { text: "护照 (Hùzhào).", jp: "パスポート。", desc: "旅の必需品。" },
        { text: "登机口在哪里？ (Dēngjīkǒu zài nǎlǐ?)", jp: "搭乗口はどこですか？", desc: "登機口＝搭乗ゲート。" },
        { text: "行李托运 (Xínglǐ tuōyùn).", jp: "荷物を預ける。", desc: "托運＝預け入れ。" },
        { text: "晚点了 (Wǎndiǎn le).", jp: "（飛行機が）遅れている。", desc: "時間が晩くなる＝遅延。" },
        { text: "靠窗的座位 (Kàochuāng de zuòwèi).", jp: "窓側の席。", desc: "靠＝寄りかかる、窓。" },
        { text: "过海关 (Guò hǎiguān).", jp: "税関を通る。", desc: "海関＝税関。" },
        { text: "我想换钱 (Wǒ xiǎng huànqián).", jp: "両替したいのですが。", desc: "換銭＝両替。" },
        { text: "一路顺风 (Yīlù shùnfēng).", jp: "良い旅を（道中ご無事で）。", desc: "追い風に乗って＝順調な旅を。" }
      ],
      hostfamily: [
        { text: "好吃 (Hǎochī).", jp: "美味しい。", desc: "ハオチー。" },
        { text: "我吃饱了 (Wǒ chī bǎo le).", jp: "お腹いっぱいです。", desc: "飽＝満腹。" },
        { text: "打扰了 (Dǎrǎo le).", jp: "お邪魔します。", desc: "邪魔をしてすみません＝訪問の挨拶。" },
        { text: "我可以洗澡吗？ (Wǒ kěyǐ xǐzǎo ma?)", jp: "シャワーを浴びてもいいですか？", desc: "洗澡＝入浴。" },
        { text: "需要帮忙吗？ (Xūyào bāngmáng ma?)", jp: "手伝いましょうか？", desc: "気遣いの一言。" },
        { text: "我回来了 (Wǒ huílái le).", jp: "ただいま。", desc: "帰宅時の挨拶。" },
        { text: "您辛苦了 (Nín xīnkǔ le).", jp: "お疲れ様でした。", desc: "目上の人への労い。" },
        { text: "这是给您的礼物 (Zhè shì gěi nín de lǐwù).", jp: "これはあなたへのプレゼントです。", desc: "お土産を渡す時に。" }
      ],
      class: [
        { text: "老师好 (Lǎoshī hǎo).", jp: "先生、こんにちは。", desc: "授業の始まりと終わりの挨拶。" },
        { text: "听不懂 (Tīng bù dǒng).", jp: "聞いて理解できません。", desc: "一番使うフレーズ。" },
        { text: "请再说一遍 (Qǐng zài shuō yībiàn).", jp: "もう一度言ってください。", desc: "遍＝回。" },
        { text: "作业交了吗？ (Zuòyè jiāo le ma?)", jp: "宿題出した？", desc: "交＝提出する。" },
        { text: "我忘了 (Wǒ wàng le).", jp: "忘れました。", desc: "言い訳の基本。" },
        { text: "借我一支笔 (Jiè wǒ yī zhī bǐ).", jp: "ペンを一本貸して。", desc: "借＝貸す・借りる。" },
        { text: "考试重点 (Kǎoshì zhòngdiǎn).", jp: "テストの重要ポイント。", desc: "ここが出るぞ。" },
        { text: "下课 (Xiàkè).", jp: "授業終了。", desc: "一番待ち遠しい合図。" }
      ]
    }
  },

  // ==========================================
  // 🇫🇷 フランス語 (FR)
  // ==========================================
  fr: {
    title: "Native Phrase Book 🇫🇷",
    voiceLang: "fr-FR",
    categories: {
      cafe: [
        { text: "Un café, s'il vous plaît.", jp: "コーヒーを一杯ください。", desc: "基本中の基本。" },
        { text: "C'est ma tournée.", jp: "ここは私がおごるよ。", desc: "Tournée＝（お酒などの）一巡。" },
        { text: "L'addition, s'il vous plaît.", jp: "お会計をお願いします。", desc: "指でサインを書く仕草でも通じる。" },
        { text: "Une carafe d'eau.", jp: "（無料の）お水をお願いします。", desc: "ミネラルウォーターは有料なので注意。" },
        { text: "Sur place ou à emporter ?", jp: "店内ですか、持ち帰りですか？", desc: "Emporter＝持ち帰る。" },
        { text: "Où sont les toilettes ?", jp: "トイレはどこですか？", desc: "カフェで借りることが多い。" },
        { text: "Un allongé.", jp: "薄めのコーヒー（アメリカーノ的）。", desc: "エスプレッソをお湯で伸ばしたもの。" },
        { text: "Je peux m'asseoir ici ?", jp: "ここに座ってもいいですか？", desc: "相席の確認。" }
      ],
      school: [
        { text: "J'ai passé une nuit blanche.", jp: "徹夜しちゃった。", desc: "Nuit blanche＝白い夜（眠らない夜）。" },
        { text: "Sécher les cours.", jp: "授業をサボる。", desc: "授業を「乾かす」＝サボる。" },
        { text: "C'est la galère.", jp: "超大変（最悪だ）。", desc: "Galère＝苦役船。苦労している時に使う。" },
        { text: "J'ai raté mon examen.", jp: "試験に落ちた（失敗した）。", desc: "Rater＝逃す、失敗する。" },
        { text: "Tu as révisé ?", jp: "復習（勉強）した？", desc: "テスト前の確認。" },
        { text: "C'est un intello.", jp: "彼はガリ勉だ。", desc: "Intelligentの略だが、皮肉っぽく使う。" },
        { text: "On a congé.", jp: "休みだ（休講だ）。", desc: "Congé＝休暇。" },
        { text: "J'ai la flemme.", jp: "めんどくさい（やる気がない）。", desc: "フランス人が大好きな言葉。" }
      ],
      friends: [
        { text: "Ça roule ?", jp: "順調？（元気？）", desc: "「転がってる？」＝うまくいってる？" },
        { text: "C'est ouf !", jp: "やばいね！（すごい）", desc: "Fou（狂ってる）を逆さに読んだスラング（Verlan）。" },
        { text: "Laisse tomber.", jp: "もういいよ（気にしないで）。", desc: "「落ちるままにしておけ」＝放っておけ。" },
        { text: "On se capte plus tard.", jp: "またあとで連絡するね。", desc: "Capte＝電波をキャッチする＝連絡とる。" },
        { text: "Wesh !", jp: "よぉ！（若者言葉）", desc: "団地発祥の挨拶スラング。" },
        { text: "T'inquiète.", jp: "心配するな（大丈夫）。", desc: "Ne t'inquiète pas の省略形。" },
        { text: "C'est n'importe quoi.", jp: "めちゃくちゃだ（ありえない）。", desc: "不平不満を言う時の定番。" },
        { text: "Mec / Meuf.", jp: "男／女（あいつ、お前）。", desc: "英語のGuyに近い。MeufはFemmeの逆さ読み。" }
      ],
      date: [
         { text: "Tu es ravissante.", jp: "君はうっとりするほど美しい。", desc: "最上級の褒め言葉。" },
         { text: "On se fait une bouffe ?", jp: "何か食べに行かない？", desc: "Bouffe＝メシ（スラング）。" },
         { text: "Tu veux boire un verre ?", jp: "一杯飲みに行かない？", desc: "デートの誘いの定番。" },
         { text: "Je t'aime.", jp: "愛してる。", desc: "重みのある言葉。" },
         { text: "Il m'a posé un lapin.", jp: "すっぽかされた。", desc: "「私にウサギを置いた」＝待ちぼうけ。" },
         { text: "C'est mon type.", jp: "私のタイプだ。", desc: "直球。" },
         { text: "On partage ?", jp: "シェアする？（割り勘する？）", desc: "フランスは割り勘より「次は私が」文化。" },
         { text: "Embrasse-moi.", jp: "キスして。", desc: "Baiserは別の意味になるので注意！Embrasserを使う。" }
      ],
      shopping: [
        { text: "C'est trop cher.", jp: "高すぎます。", desc: "Trop＝〜すぎる。" },
        { text: "Je regarde juste.", jp: "見ているだけです。", desc: "店員をかわす言葉。" },
        { text: "C'est les soldes !", jp: "セール中だ！", desc: "Solde＝セール。" },
        { text: "Vous avez la taille au-dessus ?", jp: "上のサイズはありますか？", desc: "Au-dessous＝下のサイズ。" },
        { text: "Je le prends.", jp: "これにします。", desc: "Prendre＝取る。" },
        { text: "Ça coûte combien ?", jp: "いくらですか？", desc: "値段を聞く。" },
        { text: "Cabine d'essayage.", jp: "試着室。", desc: "Essayer＝試す。" },
        { text: "Remboursement.", jp: "返金。", desc: "返品したい時に。" }
      ],
      airport: [
        { text: "Votre passeport, s'il vous plaît.", jp: "パスポートをお願いします。", desc: "入国審査にて。" },
        { text: "J'ai rien à déclarer.", jp: "申告するものはありません。", desc: "Rien＝何もない。" },
        { text: "Le vol est retardé.", jp: "フライトが遅れています。", desc: "Retard＝遅刻。" },
        { text: "Où sont les bagages ?", jp: "荷物はどこですか？", desc: "Bagages＝荷物。" },
        { text: "Embarquement immédiat.", jp: "まもなく搭乗開始。", desc: "空港のアナウンス。" },
        { text: "Côté fenêtre.", jp: "窓側。", desc: "Côté couloir＝通路側。" },
        { text: "J'ai le mal de l'air.", jp: "飛行機酔いしました。", desc: "Mal de mer＝船酔い。" },
        { text: "Bon voyage !", jp: "良い旅を！", desc: "ボン・ヴォヤージュ。" }
      ],
      hostfamily: [
        { text: "C'est délicieux !", jp: "とても美味しいです！", desc: "味を褒める。" },
        { text: "Merci pour l'accueil.", jp: "おもてなしをありがとう。", desc: "Accueil＝歓迎、受付。" },
        { text: "Je peux vous aider ?", jp: "手伝いましょうか？", desc: "何かする時に。" },
        { text: "Bonne nuit.", jp: "おやすみなさい。", desc: "寝る前の挨拶。" },
        { text: "À demain.", jp: "また明日。", desc: "明日会おう。" },
        { text: "Je vais me coucher.", jp: "もう寝ます。", desc: "Coucher＝寝る。" },
        { text: "Le dîner est prêt ?", jp: "夕食はできましたか？", desc: "Dîner＝夕食。" },
        { text: "Je rentre vers 18h.", jp: "18時頃に戻ります。", desc: "Vers＝〜頃。" }
      ],
      class: [
        { text: "J'ai pas compris.", jp: "わかりませんでした。", desc: "Comprendre＝理解する。" },
        { text: "Vous pouvez répéter ?", jp: "繰り返してもらえますか？", desc: "聞き取れなかった時に。" },
        { text: "C'est pour quand ?", jp: "期限はいつですか？", desc: "宿題の締め切り確認。" },
        { text: "Je suis en retard.", jp: "遅刻しました。", desc: "Retard＝遅れ。" },
        { text: "Prête-moi ton stylo.", jp: "ペン貸して。", desc: "Prêter＝貸す。" },
        { text: "Quelle page ?", jp: "何ページ？", desc: "授業についていけない時。" },
        { text: "C'est facile.", jp: "簡単だ。", desc: "Difficile＝難しい。" },
        { text: "Silence !", jp: "静かに！", desc: "先生がよく言う。" }
      ]
    }
  },

  // ==========================================
  // 🇩🇪 ドイツ語 (DE)
  // ==========================================
  de: {
    title: "Native Phrase Book 🇩🇪",
    voiceLang: "de-DE",
    categories: {
      cafe: [
        { text: "Einen Kaffee, bitte.", jp: "コーヒーを一杯ください。", desc: "Bitte（ビッテ）は魔法の言葉。" },
        { text: "Die Rechnung, bitte.", jp: "お会計をお願いします。", desc: "テーブル会計が一般的。" },
        { text: "Zum Mitnehmen.", jp: "持ち帰りで。", desc: "Mitnehmen＝持って行く。" },
        { text: "Stimmt so.", jp: "お釣りはとっておいて（チップです）。", desc: "会計時に端数を切り上げて渡す。" },
        { text: "Ist hier noch frei?", jp: "ここ空いてますか？", desc: "相席文化がある。" },
        { text: "Sonst noch etwas?", jp: "他に注文はありますか？", desc: "店員さんに聞かれる。" },
        { text: "Ohne Zucker.", jp: "砂糖なしで。", desc: "Ohne＝〜なしで。" },
        { text: "Wo ist die Toilette?", jp: "トイレはどこですか？", desc: "Toilette（トワレッテ）。" }
      ],
      school: [
        { text: "Blaumachen.", jp: "サボる。", desc: "「青くする」＝仕事を休む、サボる。" },
        { text: "Ich verstehe nur Bahnhof.", jp: "全然ちんぷんかんぷんだ。", desc: "「駅のことしか分からない」＝全く理解不能。" },
        { text: "Streber.", jp: "ガリ勉。", desc: "先生に気に入られようと努力する人。" },
        { text: "Spickzettel.", jp: "カンニングペーパー。", desc: "Spicken＝のぞき見る。" },
        { text: "Ich habe verschlafen.", jp: "寝坊した。", desc: "遅刻の言い訳。" },
        { text: "Klausur.", jp: "試験（筆記試験）。", desc: "ドイツの大学生の天敵。" },
        { text: "Hitzefrei.", jp: "暑すぎて休校。", desc: "ドイツ独自の素敵な制度。" },
        { text: "Viel Erfolg!", jp: "（テスト前などに）頑張って！", desc: "直訳：多くの成功を。" }
      ],
      friends: [
        { text: "Was geht?", jp: "調子どう？", desc: "英語の What's up? に相当。" },
        { text: "Geil!", jp: "最高！／やばい！", desc: "本来は性的な意味だが、若者は「超クール」の意味で使う。" },
        { text: "Na?", jp: "よぉ。（元気？）", desc: "世界一短い挨拶。親しい間柄で使う。" },
        { text: "Kein Bock.", jp: "やる気ないわ（めんどくさい）。", desc: "Bock＝雄ヤギ（やる気の象徴）。" },
        { text: "Alter!", jp: "マジかよ！／おい！", desc: "驚いた時や呼びかけに使う。" },
        { text: "Alles klar?", jp: "大丈夫？／わかった？", desc: "万能な確認フレーズ。" },
        { text: "Bis später.", jp: "またあとで。", desc: "別れ際の挨拶。" },
        { text: "Prost!", jp: "乾杯！", desc: "ビールを飲む時の合図。" }
      ],
      date: [
         { text: "Ich liebe dich.", jp: "愛してる。", desc: "本当に深い関係になってから言う重い言葉。" },
         { text: "Ich hab dich lieb.", jp: "大好きだよ。", desc: "友達や家族、恋人に気軽に使える。" },
         { text: "Du siehst gut aus.", jp: "素敵だね（見た目がいいね）。", desc: "外見を褒める。" },
         { text: "Willst du was trinken?", jp: "何か飲みに行かない？", desc: "誘い文句。" },
         { text: "Getrennte Kassen.", jp: "別会計で。", desc: "ドイツはきっちり割り勘文化。" },
         { text: "Kuss.", jp: "キス。", desc: "Küssen＝キスする。" },
         { text: "Du fehlst mir.", jp: "君がいなくて寂しい。", desc: "直訳：私には君が欠けている。" },
         { text: "Schatz.", jp: "ダーリン／ハニー。", desc: "直訳は「宝物」。カップルの呼び名。" }
      ],
      shopping: [
        { text: "Das ist zu teuer.", jp: "高すぎます。", desc: "Teuer＝高い。" },
        { text: "Ich schaue mich nur um.", jp: "見ているだけです。", desc: "Umschauen＝見回す。" },
        { text: "Haben Sie das in Rot?", jp: "これの赤はありますか？", desc: "色違いを探す時。" },
        { text: "Kassenzettel.", jp: "レシート。", desc: "Kasse（レジ）の紙。" },
        { text: "Tüte, bitte.", jp: "袋をください。", desc: "ドイツのスーパーでは袋は有料。" },
        { text: "Angebot.", jp: "特売品（オファー）。", desc: "お得な商品。" },
        { text: "Ich nehme es.", jp: "これにします。", desc: "購入決定。" },
        { text: "Wo ist die Umkleidekabine?", jp: "試着室はどこですか？", desc: "長い単語だが重要。" }
      ],
      airport: [
        { text: "Abflug.", jp: "出発。", desc: "Ankunft＝到着。" },
        { text: "Reisepass, bitte.", jp: "パスポートをお願いします。", desc: "Reise（旅）Pass。" },
        { text: "Ich habe nichts zu verzollen.", jp: "申告するものはありません。", desc: "Zoll＝税関。" },
        { text: "Verspätung.", jp: "遅れ。", desc: "ドイツ鉄道でもよく聞く言葉。" },
        { text: "Gepäck.", jp: "荷物。", desc: "Handgepäck＝手荷物。" },
        { text: "Boarding.", jp: "搭乗。", desc: "英語そのままで通じることも多い。" },
        { text: "Guten Flug!", jp: "良いフライトを！", desc: "旅立つ人へ。" },
        { text: "Ausgang.", jp: "出口。", desc: "Eingang＝入り口。" }
      ],
      hostfamily: [
        { text: "Lecker!", jp: "美味しい！", desc: "ドイツ語で一番大事な単語かも。" },
        { text: "Ich bin satt.", jp: "お腹いっぱいです。", desc: "もう食べられない時。" },
        { text: "Darf ich duschen?", jp: "シャワーを浴びてもいいですか？", desc: "Darf ich＝〜してもいいですか？" },
        { text: "Guten Morgen.", jp: "おはよう。", desc: "朝の挨拶。" },
        { text: "Schlaf gut.", jp: "よく寝てね（おやすみ）。", desc: "寝る前の挨拶。" },
        { text: "Kann ich helfen?", jp: "手伝いましょうか？", desc: "Helfen＝手伝う。" },
        { text: "Wann gibt es Essen?", jp: "ご飯はいつですか？", desc: "食事時間の確認。" },
        { text: "Vielen Dank für alles.", jp: "いろいろありがとう。", desc: "感謝を伝える。" }
      ],
      class: [
        { text: "Ich habe eine Frage.", jp: "質問があります。", desc: "Frage＝質問。" },
        { text: "Wie bitte?", jp: "何て言いましたか？（え？）", desc: "聞き返す時の定番。" },
        { text: "Hausaufgaben.", jp: "宿題。", desc: "家（Haus）の課題（Aufgaben）。" },
        { text: "Darf ich auf die Toilette?", jp: "トイレに行ってもいいですか？", desc: "学校での許可。" },
        { text: "Seite.", jp: "ページ。", desc: "Seite 10＝10ページ。" },
        { text: "Das ist schwer.", jp: "難しい。", desc: "Schwer＝重い、難しい。" },
        { text: "Pause.", jp: "休憩。", desc: "休み時間。" },
        { text: "Ruhe, bitte!", jp: "静かにしてください！", desc: "先生の口癖。" }
      ]
    }
  },

  // ==========================================
  // 🇪🇸 スペイン語 (ES)
  // ==========================================
  es: {
    title: "Native Phrase Book 🇪🇸",
    voiceLang: "es-ES",
    categories: {
      cafe: [
        { text: "Un café con leche, por favor.", jp: "カフェラテをください。", desc: "Con leche＝牛乳入り。" },
        { text: "La cuenta, por favor.", jp: "お会計をお願いします。", desc: "指でサインを書くジェスチャーと共に。" },
        { text: "Para llevar.", jp: "持ち帰りで。", desc: "Para＝〜のために、Llevar＝運ぶ。" },
        { text: "¿Tienen wifi?", jp: "Wi-Fiはありますか？", desc: "発音は「ウィフィ」に近い。" },
        { text: "Sin azúcar.", jp: "砂糖なしで。", desc: "Sin＝〜なしで。" },
        { text: "Un vaso de agua.", jp: "お水を一杯ください。", desc: "Vaso＝コップ。" },
        { text: "¿Está ocupado?", jp: "ここ、空いてますか（使ってますか）？", desc: "Ocupado＝使用中。" },
        { text: "Me cobra, por favor.", jp: "お会計をお願いします（カジュアル）。", desc: "Cobrar＝代金を受け取る。" }
      ],
      school: [
        { text: "Hacer pellas.", jp: "サボる。", desc: "授業をサボる（スペインの表現）。" },
        { text: "Es pan comido.", jp: "楽勝だよ（朝飯前だ）。", desc: "「食べられたパン」＝簡単すぎる。" },
        { text: "Empollón.", jp: "ガリ勉。", desc: "卵を温める（Empollar）＝椅子に座りっぱなしで勉強する人。" },
        { text: "Me ha suspendido.", jp: "（先生に）落とされた。", desc: "Suspensos＝不合格。" },
        { text: "Aprobar.", jp: "合格する。", desc: "単位を取る。" },
        { text: "Chuleta.", jp: "カンニングペーパー。", desc: "本来は「骨付き肉」の意味。" },
        { text: "Tengo un examen.", jp: "試験がある。", desc: "Examen＝試験。" },
        { text: "Qué rollo.", jp: "超つまんねー（退屈）。", desc: "授業がつまらない時に。" }
      ],
      friends: [
        { text: "¿Qué tal?", jp: "元気？／どう？", desc: "一番よく使う挨拶。" },
        { text: "¡Mola!", jp: "いいね！／クールだね！", desc: "スペインの若者がよく使う。「イケてる」の意味。" },
        { text: "Tío / Tía.", jp: "お前／君（親友への呼びかけ）。", desc: "直訳は叔父/叔母だが、友達同士で「Hey dude」的に使う。" },
        { text: "Me parto.", jp: "爆笑（ウケる）。", desc: "「自分が割れる」＝笑いすぎて割れる。" },
        { text: "Vale.", jp: "OK／わかった。", desc: "スペイン人が1日100回言う言葉。" },
        { text: "No pasa nada.", jp: "大丈夫／問題ない。", desc: "直訳：何も起こらない。" },
        { text: "Estoy hecho polvo.", jp: "もうクタクタだ。", desc: "粉（Polvo）になっちゃうほど疲れた。" },
        { text: "¡Venga!", jp: "行こう！／さあ！／よし！", desc: "気合を入れる時や同意する時。" }
      ],
      date: [
         { text: "Te quiero.", jp: "大好きだよ。", desc: "Te amo（愛してる）よりカジュアルで使いやすい。" },
         { text: "Eres mi media naranja.", jp: "君は僕の運命の人だ。", desc: "「半分のオレンジ」＝完璧な片割れ。" },
         { text: "Me gustas.", jp: "君が好きだ。", desc: "Gustar＝好かれる。" },
         { text: "¿Quieres tomar algo?", jp: "何か飲みに行かない？", desc: "デートの誘い。" },
         { text: "Pagamos a medias.", jp: "割り勘にしよう。", desc: "Medias＝半分。" },
         { text: "Estás muy guapa/guapo.", jp: "すごく綺麗だ／かっこいい。", desc: "外見を褒める。" },
         { text: "Un beso.", jp: "キス。", desc: "Besar＝キスする。" },
         { text: "Flechazo.", jp: "一目惚れ。", desc: "Flecha（矢）が刺さった状態。" }
      ],
      shopping: [
        { text: "¿Cuánto cuesta?", jp: "いくらですか？", desc: "値段を聞く基本。" },
        { text: "Es muy caro.", jp: "高すぎます。", desc: "Caro＝高い。" },
        { text: "Me lo llevo.", jp: "これにします（持って行きます）。", desc: "購入決定。" },
        { text: "Solo estoy mirando.", jp: "見ているだけです。", desc: "Mirar＝見る。" },
        { text: "Rebajas.", jp: "セール。", desc: "バーゲンのこと。" },
        { text: "Probador.", jp: "試着室。", desc: "Probar＝試す。" },
        { text: "¿Aceptan tarjeta?", jp: "カードは使えますか？", desc: "Tarjeta＝カード。" },
        { text: "Es una ganga.", jp: "お買い得だ（掘り出し物だ）。", desc: "Ganga＝安売り品。" }
      ],
      airport: [
        { text: "El pasaporte, por favor.", jp: "パスポートをお願いします。", desc: "入国審査。" },
        { text: "Salidas / Llegadas.", jp: "出発／到着。", desc: "掲示板を見る時に重要。" },
        { text: "He perdido mi maleta.", jp: "スーツケースを無くしました。", desc: "ロストバゲージ。" },
        { text: "Tarjeta de embarque.", jp: "搭乗券。", desc: "Embarque＝搭乗。" },
        { text: "Retrasado.", jp: "遅延。", desc: "飛行機が遅れている。" },
        { text: "Asiento de ventanilla.", jp: "窓側の席。", desc: "Ventana＝窓。" },
        { text: "Buen viaje.", jp: "良い旅を。", desc: "見送りの言葉。" },
        { text: "Aduana.", jp: "税関。", desc: "荷物検査。" }
      ],
      hostfamily: [
        { text: "¡Está riquísimo!", jp: "すごく美味しいです！", desc: "Rico＝美味しい、豊か。" },
        { text: "Estoy lleno/a.", jp: "お腹いっぱいです。", desc: "Lleno＝満タン。" },
        { text: "Muchas gracias por todo.", jp: "いろいろありがとうございます。", desc: "感謝を伝える。" },
        { text: "Buenas noches.", jp: "おやすみなさい。", desc: "こんばんは、兼おやすみ。" },
        { text: "¿Puedo ayudar?", jp: "手伝いましょうか？", desc: "Ayudar＝手伝う。" },
        { text: "Voy a salir.", jp: "出かけてきます。", desc: "Salir＝出る。" },
        { text: "Hasta luego.", jp: "また後で（行ってきます）。", desc: "日常の挨拶。" },
        { text: "La cena está lista.", jp: "夕食ができましたよ。", desc: "Lista＝準備完了。" }
      ],
      class: [
        { text: "No entiendo.", jp: "わかりません。", desc: "Entender＝理解する。" },
        { text: "¿Puede repetir?", jp: "繰り返してもらえますか？", desc: "聞き取れなかった時。" },
        { text: "Tengo una pregunta.", jp: "質問があります。", desc: "Pregunta＝質問。" },
        { text: "Deberes.", jp: "宿題。", desc: "やるべきこと。" },
        { text: "¿Me dejas un boli?", jp: "ボールペン貸してくれる？", desc: "Boli＝Bolígrafo。" },
        { text: "Qué hora es?", jp: "今何時？", desc: "授業中気になること。" },
        { text: "Silencio, por favor.", jp: "静かにしてください。", desc: "先生の言葉。" },
        { text: "Es fácil / difícil.", jp: "簡単／難しい。", desc: "授業の感想。" }
      ]
    }
  }
};

// （...上の appData はそのまま残してください...）

// --- カードコンポーネント ---
function PhraseCard({ item, isQuizMode, delay, voiceLang }) {
  const [isRevealed, setIsRevealed] = useState(false);

  // クイズモード解除時に答えを隠すリセット
  if (!isQuizMode && isRevealed) {
    setIsRevealed(false);
  }

  const playAudio = (e) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(item.text);
    utterance.lang = voiceLang; 
    window.speechSynthesis.speak(utterance);
  };

  const handleCardClick = () => {
    if (isQuizMode) {
      setIsRevealed(true);
      if (!isRevealed) {
        const utterance = new SpeechSynthesisUtterance(item.text);
        utterance.lang = voiceLang;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(item.text);
      utterance.lang = voiceLang;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div 
      className={`phrase-card animate-pop-in ${isQuizMode && !isRevealed ? 'quiz-hidden' : ''}`} 
      style={{animationDelay: delay}}
      onClick={handleCardClick}
    >
      <div className="card-header">
        <div className="phrase-en">
          {isQuizMode && !isRevealed ? "???" : item.text}
        </div>
        {(!isQuizMode || isRevealed) && (
          <button className="audio-button" onClick={playAudio} title="Play Audio">🔊</button>
        )}
      </div>
      <div className="phrase-jp">{item.jp}</div>
      <div className={`phrase-desc ${isQuizMode && !isRevealed ? 'blur-text' : ''}`}>
        {item.desc}
      </div>
      {isQuizMode && !isRevealed && (
        <div className="tap-hint">Tap to Show</div>
      )}
    </div>
  );
}

// --- メインコンポーネント ---
function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [category, setCategory] = useState(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const currentData = appData[currentLang];

  const handleStartClick = () => {
    setShowWelcomeScreen(false);
  };

  const switchLang = (lang) => {
    setCurrentLang(lang);
    setCategory(null);
  };

  // 言語に応じたフォントクラスを決定
  const getLangClass = () => {
    if (currentLang === 'cn') return 'font-cn';
    if (currentLang === 'kr') return 'font-kr';
    return 'font-en'; // default
  };

  if (showWelcomeScreen) {
    return (
      <div className="welcome-screen">
        <div className="hero-text-section animate-slide-in-left">
          <h1 className="welcome-title">
            <span className="title-accent">Global Talk.</span><br />
            学校では教わらない<br />リアルな日常会話
          </h1>
          <p className="welcome-subtitle">
            教科書は置いて、街へ出よう。<br />
            世界6カ国のネイティブ表現を集めました。
          </p>
          <button className="start-button" onClick={handleStartClick}>
            Let's Go ✈️
          </button>
        </div>

        <div className="hero-gallery-container">
          <div className="floating-gallery">
            <img className="gallery-img img1 float-slow" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80" alt="Smiling student" />
            <img className="gallery-img img2 float-mid" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Group study" />
            <img className="gallery-img img3 float-fast" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" alt="Smiling male student" />
            <img className="gallery-img img4 float-slow" src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" alt="Friends laughing" />
            <img className="gallery-img img5 float-mid" src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80" alt="Students talking" />
            <img className="gallery-img img6 float-fast" src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80" alt="Casual conversation" />
            <img className="gallery-img img7 float-slow" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80" alt="Smart student smiling" />
            <img className="gallery-img img8 float-mid" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Diverse group" />
            <img className="gallery-img img9 float-fast" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" alt="Students collaborating" />
            <img className="gallery-img img10 float-slow" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" alt="Friendly smile" />
          </div>
          <div className="hero-blob blob-1"></div>
          <div className="hero-blob blob-2"></div>
        </div>
      </div>
    );
  }

  // ★ ここで言語ごとのクラス(font-cn等)を付与
  return (
    <div className={`app-screen animate-fade-in ${getLangClass()}`}>
      <header className="app-header">
        <h2>{currentData.title}</h2>
        
        <div className="header-controls">
          {/* 国旗のみのボタングループ */}
          <div className="lang-switcher">
            <button className={currentLang === 'en' ? 'active-lang' : ''} onClick={() => switchLang('en')} title="English">🇺🇸</button>
            <button className={currentLang === 'kr' ? 'active-lang' : ''} onClick={() => switchLang('kr')} title="Korean">🇰🇷</button>
            <button className={currentLang === 'cn' ? 'active-lang' : ''} onClick={() => switchLang('cn')} title="Chinese">🇨🇳</button>
            <button className={currentLang === 'fr' ? 'active-lang' : ''} onClick={() => switchLang('fr')} title="French">🇫🇷</button>
            <button className={currentLang === 'de' ? 'active-lang' : ''} onClick={() => switchLang('de')} title="German">🇩🇪</button>
            <button className={currentLang === 'es' ? 'active-lang' : ''} onClick={() => switchLang('es')} title="Spanish">🇪🇸</button>
          </div>

          <div className="mode-switch">
            <label className="switch-label">
              <span className={!isQuizMode ? "active-mode" : ""}>Study</span>
              <div className="toggle-switch">
                <input type="checkbox" checked={isQuizMode} onChange={() => setIsQuizMode(!isQuizMode)} />
                <span className="slider"></span>
              </div>
              <span className={isQuizMode ? "active-mode" : ""}>Quiz</span>
            </label>
          </div>
        </div>
      </header>

      <div className="app-container">
        <section className="selection-section">
          <h3>Choose a Situation</h3>
          <div className="button-group">
            {Object.keys(currentData.categories).map(key => (
               currentData.categories[key].length > 0 && (
                <button 
                  key={key}
                  className={category === key ? 'active' : ''} 
                  onClick={() => setCategory(key)}
                >
                  {key === 'cafe' && '☕ カフェ'}
                  {key === 'school' && '🏫 学校'}
                  {key === 'date' && '❤️ デート'}
                  {key === 'shopping' && '🛍️ 買い物'}
                  {key === 'friends' && '🙌 友達'}
                  {key === 'airport' && '✈️ 空港'}
                  {key === 'hostfamily' && '🏠 ステイ'}
                  {key === 'class' && '✏️ 授業中'}
                </button>
               )
            ))}
          </div>
        </section>

        <section className="result-section">
          {category ? (
            <div className="cards-grid">
              {currentData.categories[category].map((item, index) => (
                <PhraseCard 
                  key={index} 
                  item={item} 
                  isQuizMode={isQuizMode} 
                  delay={`${index * 0.1}s`}
                  voiceLang={currentData.voiceLang}
                />
              ))}
            </div>
          ) : (
            <div className="placeholder-container">
              <p className="placeholder-text">👈 カテゴリを選択してください</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;