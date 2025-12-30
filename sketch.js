let spriteSheet;
let walkSheet;
let jumpSheet;
let pushSheet;
let toolSheet;
let spriteSheet2;
let smileSheet2;
let downSheet2;
let spriteSheet3;
let singSheet4;
let spriteSheet5;
let bgImage;
let walkSheet5;
let birds = []; // 鳥群陣列
let fireworks = []; // 煙火陣列
let confetti = []; // 彩帶陣列
let healthItems = []; // 補血道具陣列
let halos = []; // 光環特效陣列


let stopAnimation = [];
let walkAnimation = [];
let jumpAnimation = [];
let pushAnimation = [];
let toolAnimation = [];
let stopAnimation2 = [];
let smileAnimation2 = [];
let downAnimation2 = [];
let stopAnimation3 = [];
let singAnimation4 = [];
let walkAnimation5 = [];
let stopAnimation5 = [];
let stopAnimation4 = [];


const stopNumberOfFrames = 15;
const walkNumberOfFrames = 9;
const jumpNumberOfFrames = 14;
const pushNumberOfFrames = 4;
const toolNumberOfFrames = 5;


const stopNumberOfFrames2 = 8;
const smileNumberOfFrames2 = 5;
const downNumberOfFrames2 = 12;
const stopNumberOfFrames3 = 8;
const singNumberOfFrames4 = 8;
const walkNumberOfFrames5 = 7;
const stopNumberOfFrames5 = 5;
const stopNumberOfFrames4 = 8;


let frameWidth;
let walkFrameWidth;
let frameWidth3, frameHeight3;
let frameWidth4, frameHeight4;
let singFrameWidth4, singFrameHeight4;
let frameWidth5, frameHeight5;
let walkFrameWidth5, walkFrameHeight5;


// 角色的位置和速度
let x, y, x2, y2, x3, y3, x4, y4, x5, y5, x5_orig, y5_orig;
let speed = 5;
let direction = 1; // 1 for right, -1 for left
let direction2 = 1; // 1 for right, -1 for left for character 2


// 跳躍相關變數
let isJumping = false;
let velocityY = 0;
let gravity = 0.6;
let jumpStrength = -15; // 負數代表向上
let groundY;


// 角色2 狀態相關變數
let isSmiling2 = false;
let isDown2 = false; // 新增：角色2是否被擊倒的狀態
let downFrame2 = 0;
const downAnimationSpeed2 = 8; // 倒下動畫速度
let smileFrame2 = 0;
const smileAnimationSpeed2 = 8; // 數字越小越快
const proximityThreshold = 150; // 觸發微笑的距離
const verticalProximityThreshold = 100; // 觸發對話的垂直距離


// 對話相關變數
let nameInput;
let playerName = '';
let conversationState = 0; // 0: idle, 1: asking, 2: correct, 3: incorrect
let character2Feedback = ""; // 角色2的回饋文字
let score = 0; // 記分板分數
let visualScore = 0; // 用於平滑顯示分數
const targetScore = 5; // 目標分數
let playerHealth = 100; // 玩家血量
const maxHealth = 100; // 最大血量
let healthShakeTimer = 0; // 血量條抖動計時器

// 角色2 題目 (動物與自然常識)
const character2Questions = [
  { q: "海豚是魚嗎？", a: false, correct: "沒錯，海豚是哺乳類！", wrong: "不對喔，海豚是哺乳類。", h: "想想看，海豚是怎麼呼吸的？" },
  { q: "蝙蝠是鳥嗎？", a: false, correct: "答對了，蝙蝠是哺乳類。", wrong: "錯了，蝙蝠是哺乳類動物。", h: "蝙蝠雖然會飛，但牠們是胎生的喔。" },
  { q: "蜘蛛是昆蟲嗎？", a: false, correct: "真厲害，蜘蛛是蛛形綱。", wrong: "蜘蛛有8隻腳，昆蟲是6隻喔。", h: "數數看蜘蛛有幾隻腳？昆蟲通常只有6隻。" },
  { q: "章魚有三顆心臟嗎？", a: true, correct: "太強了，這都知道！", wrong: "其實章魚真的有三顆心臟。", h: "章魚的構造很特別，為了在深海生存，牠們需要更多動力。" },
  { q: "鴕鳥會飛嗎？", a: false, correct: "沒錯，鴕鳥跑得很快但不會飛。", wrong: "鴕鳥翅膀退化了，不會飛喔。", h: "鴕鳥體型很大，翅膀是用來平衡的。" },
  { q: "長頸鹿的脖子骨頭比人類多嗎？", a: false, correct: "答對了，都是七塊頸椎。", wrong: "其實數量是一樣的喔！", h: "雖然脖子很長，但哺乳類動物的頸椎數量通常是一樣的。" },
  { q: "無尾熊是熊嗎？", a: false, correct: "沒錯，牠是有袋類動物。", wrong: "牠是有袋類，不是熊喔。", h: "無尾熊媽媽肚子上有育兒袋，跟袋鼠一樣。" }
];

// 角色3 對話相關變數
let conversationState3 = 0; // 0: idle, 1: asking, 2: correct, 3: wrong
let currentEdTechQuestion = null;
let edTechQuestionPool = [];
let feedbackText3 = "";
let trueButton, falseButton;

// 角色3 教育科技是非題庫
const edTechQuestions = [
  { q: "Is 'Apple' a fruit?", a: true, h: "Apple is a red or green fruit." },
  { q: "Is 'Dog' a cat?", a: false, h: "Dogs bark, cats meow." },
  { q: "Is 'Red' a color?", a: true, h: "Red, Blue, and Green are colors." },
  { q: "Do birds fly?", a: true, h: "Most birds use wings to fly." },
  { q: "Is 'One' number 2?", a: false, h: "One is 1, Two is 2." },
  { q: "Is ice hot?", a: false, h: "Ice is very cold." },
  { q: "Do fish swim?", a: true, h: "Fish live in water." },
  { q: "Is a banana blue?", a: false, h: "Bananas are usually yellow." },
  { q: "Is the sun hot?", a: true, h: "The sun gives us heat and light." },
  { q: "Do cows say 'Moo'?", a: true, h: "Yes, cows go Moo!" }
];

// 角色4 對話相關變數
let conversationState4 = 0; // 0: idle, 1: asking, 2: replied_normal, 3: replied_sing_intro, 4: singing_animation
let nameInput4;
let currentQuestion4 = null;
let character4Feedback = '';
let brianQuestionPool = []; // 儲存Brian當前回合的題目池

// 角色4 問題與回覆資料庫
const brianQuestions = [
  { q: "天空是藍色的嗎？", a: true, r: "答對了，天氣好的時候是藍色的。", h: "抬頭看看，天氣好的時候是什麼顏色？" },
  { q: "冰塊是熱的嗎？", a: false, r: "當然不是，冰塊是冰的。", h: "摸摸看冰塊，手會感覺怎麼樣？" },
  { q: "你想聽我唱歌嗎？", a: true, r: "那我唱歌給你聽吧!", sing: true, h: "我可是練了很久呢，給個機會吧？" },
  { q: "我是狗嗎？", a: true, r: "沒錯，但我是一隻會說話的狗。", h: "汪汪！我有四條腿和尾巴喔。" },
  { q: "魚會走路嗎？", a: false, r: "魚是在水裡游的。", h: "魚兒沒有腳，牠們用游的。" },
  { q: "貓會抓老鼠嗎？", a: true, r: "這是牠們的天性。", h: "這是貓咪的天性喔，湯姆貓與傑利鼠看過嗎？" },
  { q: "糖果是鹹的嗎？", a: false, r: "糖果通常是甜的。", h: "吃糖果的時候嘴巴甜甜的還是鹹鹹的？" },
  { q: "飛機在水裡游嗎？", a: false, r: "飛機是在天上飛的。", h: "飛機有翅膀，是在哪裡移動的呢？" },
  { q: "樹葉通常是綠色的嗎？", a: true, r: "沒錯，因為有葉綠素。", h: "植物行光合作用需要葉綠素，那是綠色的。" },
  { q: "只有鳥會飛嗎？", a: false, r: "昆蟲、蝙蝠還有飛機也會飛喔。", h: "想想看，蝴蝶、蜜蜂還有飛機呢？" }
];

// 角色5 對話相關變數
let conversationState5 = 0; // 0: IDLE, 1: WALKING_TO_PLAYER, 2: HINTING, 3: PRAISING, 4: PRAISE_DELAY, 5: WALKING_BACK
let hint5Text = '';
let hint5StartTime = 0;
const hint5Duration = 4000; // 提示顯示時間 (4秒) 


// 攻擊相關變數
let isAttacking = false;
let isSinging4 = false; // 新增：角色4是否在唱歌的狀態
let attackFrame = 0;
let singDelayStartTime = 0; // 唱歌前的延遲計時器
let singFrame4 = 0;
let singRepeatCount = 0; // 唱歌動畫重複次數計數
const attackAnimationSpeed = 6; // 數字越小越快


// 發射物陣列
let projectiles = [];
let notes = []; // 音符陣列


// 按鈕相關變數
let nextButton;
let tryAgainButton;
let hintButton; // 新增：提示按鈕
let trueButtonRef, falseButtonRef; // 用於參照按鈕


// 題庫相關變數
let currentQuestion;
let questionPool = []; // 儲存當前回合的題目池
const singRepetitions = 4; // 唱歌動畫重複次數
const questionsPerRound = 5; // 每回合出題數量

// 打字機效果狀態管理
let typewriterStates = {};

// 遊戲狀態管理
let gameState = 'start'; // 'start', 'playing'
let startButton;
let restartButton;
let instructionButton; // 遊戲說明按鈕
let closeInstructionButton; // 關閉說明按鈕
let isShowingInstructions = false; // 是否顯示說明中
let instructionScale = 0; // 說明視窗縮放比例


function preload() {
  // 預先載入圖片
  // 請確保您的資料夾結構是 sketch.js 旁邊有 1/stop/stop.png
  spriteSheet = loadImage('1/stop/stop.png');
  walkSheet = loadImage('1/walk/walk.png');
  jumpSheet = loadImage('1/jump/jump.png');
  pushSheet = loadImage('1/push/push.png');
  toolSheet = loadImage('1/tool/tool.png');
  spriteSheet2 = loadImage('2/stop/stop_2.png');
  smileSheet2 = loadImage('2/smile/smile_2.png');
  downSheet2 = loadImage('2/down/down_2.png'); // 載入角色2的倒下動畫
  spriteSheet3 = loadImage('3/stop/stop.png'); // 載入角色3的站立動畫
  singSheet4 = loadImage('4/sing/sing.png');
  walkSheet5 = loadImage('5/walk/walk.png'); // 載入角色5走路動畫
  spriteSheet5 = loadImage('5/stop/stop.png'); // 載入角色5的站立動畫
  spriteSheet4 = loadImage('4/stop/stop.png'); // 載入角色4的站立動畫
  bgImage = loadImage('map/2.png'); // 載入背景圖片
}


function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  if (gameState === 'start') {
    drawStartScreen();
  } else if (gameState === 'playing') {
    runGame();
  } else if (gameState === 'victory') {
    drawVictoryScreen();
  } else if (gameState === 'gameover') {
    drawGameOverScreen();
  }
}

function runGame() {
  // --- 鏡頭與世界設定 ---
  const worldWidth = width * 3; // 世界寬度為3倍螢幕寬
  let camX = x - width / 2; // 鏡頭跟隨角色

  // 計算各個角色在循環世界中的顯示位置 (最接近玩家的位置)
  let renderX2 = getWrappedX(x, x2, worldWidth);
  let renderX3 = getWrappedX(x, x3, worldWidth);
  let renderX4 = getWrappedX(x, x4, worldWidth);
  let renderX5 = getWrappedX(x, x5, worldWidth);

  // --- 物理與狀態更新 ---
  // 將圖片的繪製基準點設為中心
  imageMode(CENTER);

  if (isJumping) {
    // 如果在跳躍中，應用重力並更新 y 座標
    velocityY += gravity;
    y += velocityY;


    // 如果角色落回地面
    if (y >= groundY) {
      y = groundY; // 確保角色不會掉到地下
      velocityY = 0;
      isJumping = false; // 結束跳躍
    }
  }


  if (isAttacking) {
    // 如果不在跳躍但在攻擊中
    attackFrame++;
    if (attackFrame >= pushNumberOfFrames * attackAnimationSpeed) {
      // 攻擊動畫結束
      isAttacking = false;
      attackFrame = 0;
      // 產生一個發射物
      projectiles.push({
        x: x + (direction * 50), // 從角色前方產生
        y: y,
        direction: direction,
        speed: 40, // 增加發射物速度，使其飛得更遠
        frame: 0
      });
    }
  } else {
    // 如果不在攻擊中，處理移動
    if (keyIsDown(68)) { // 'D' key
      x += speed;
      direction = 1;
    }
    if (keyIsDown(65)) { // 'A' key
      x -= speed;
      direction = -1;
    }
    // 只有在不跳躍時才能上下移動
    if (!isJumping) {
      if (keyIsDown(87)) { // 'W' key
        y -= speed;
      }
      if (keyIsDown(83)) { // 'S' key
        y += speed;
      }
    }
  }

  // 移除 x 的限制，讓角色可以無限移動
  // x = constrain(x, stopAnimation[0].width / 2, width - stopAnimation[0].width / 2);
  y = constrain(y, stopAnimation[0].height / 2, height - stopAnimation[0].height / 2);

  // --- 開始繪圖 (套用鏡頭平移) ---
  push();
  translate(-camX, 0);

  // 繪製背景 (重複平鋪)
  imageMode(CORNER);
  let bgW = width;
  // 計算當前鏡頭下應該繪製哪幾張背景圖 (左、中、右)
  let startTile = floor(camX / bgW);
  for (let i = startTile - 1; i <= startTile + 1; i++) {
    image(bgImage, i * bgW, 0, bgW, height);
  }

  // 繪製天空中的鳥
  for (let bird of birds) {
    bird.update();
    bird.display();
  }

  // --- 補血道具邏輯 ---
  if (playerHealth <= 60 && frameCount % 300 === 0) { // 當血量 <= 60 時，每 5 秒產生一個
    let spawnX = x + random(-width, width); // 在玩家附近產生
    let spawnY = height / 2 + 320; // 懸浮在地面上
    healthItems.push(new HealthItem(spawnX, spawnY));
  }

  for (let i = healthItems.length - 1; i >= 0; i--) {
    let item = healthItems[i];
    item.display();
    
    // 檢查碰撞 (簡單距離判定)
    if (dist(x, y, item.x, item.y) < 60) {
      playerHealth = min(maxHealth, playerHealth + 20); // 恢復 20 點
      healthItems.splice(i, 1);
      
      // 顯示 +20 效果 (借用音符特效陣列)
      notes.push({
        x: x,
        y: y - 80,
        vx: 0,
        vy: -1.5,
        alpha: 255,
        size: 30,
        symbol: "+20",
        offset: 0,
        r: 50, g: 255, b: 50
      });

      // 加入光環特效
      halos.push(new HaloEffect(x, y));
    }
  }

  // 如果角色4在唱歌，將背景變暗 (聚光燈效果的一部分)
  if (conversationState4 === 4) {
    push();
    rectMode(CORNER);
    noStroke();
    fill(0, 150); // 半透明黑色
    rect(camX, 0, width, height); // 覆蓋整個畫面
    pop();
  }

  imageMode(CENTER); // 切換回中心模式繪製角色

  // --- 繪圖 ---


  // 繪製所有發射物
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.x += p.speed * p.direction;
    p.frame++;


    push();
    translate(p.x, p.y);
    scale(p.direction, 1);
    let frameIndex = floor(p.frame / 4) % toolNumberOfFrames;
    image(toolAnimation[frameIndex], 0, 0);
    pop();


    // 檢查發射物是否擊中角色2
    let hitThreshold = 50; // 判定擊中的距離
    if (abs(p.x - renderX2) < hitThreshold && abs(p.y - y2) < hitThreshold) {
      if (!isDown2) { // 只有在角色還沒倒下時才觸發
        isDown2 = true; // 設定角色2為被擊倒狀態
        downFrame2 = 0; // 重置倒下動畫計數器
        isSmiling2 = false; // 確保不會同時微笑
      }
      projectiles.splice(i, 1); // 移除擊中的發射物
      continue; // 繼續下一個循環，避免檢查已移除的物件
    } else if (p.x > camX + width || p.x < camX) { // 檢查是否超出鏡頭範圍
      projectiles.splice(i, 1);
    }
  }

  // 繪製並更新音符
  for (let i = notes.length - 1; i >= 0; i--) {
    let n = notes[i];
    n.x += n.vx;
    n.y += n.vy;
    n.alpha -= 2; // 淡出
    n.x += sin(frameCount * 0.1 + n.offset) * 0.5; // 左右飄動

    if (n.alpha <= 0) {
      notes.splice(i, 1);
    } else {
      push();
      fill(n.r, n.g, n.b, n.alpha); // 使用音符的顏色
      textAlign(CENTER, CENTER);
      textSize(n.size);
      text(n.symbol, n.x, n.y);
      pop();
    }
  }

  // 繪製並更新光環特效
  for (let i = halos.length - 1; i >= 0; i--) {
    let h = halos[i];
    h.update();
    h.display();
    if (h.isFinished()) {
      halos.splice(i, 1);
    }
  }

  // 根據角色1的位置決定角色2的方向
  if (x < renderX2) {
    direction2 = -1; // 角色1在左邊，角色2朝左
  } else {
    direction2 = 1; // 角色1在右邊，角色2朝右
  }


  // --- 對話狀態機 ---
  let isClose = abs(x - renderX2) < proximityThreshold && abs(y - y2) < verticalProximityThreshold;


  if (isClose && conversationState === 0) {
    // 靠近時開始對話
    if (isDown2) {
      isDown2 = false; // 如果角色2是倒下的，靠近時讓它恢復
    }
    // 開始提問
    if (questionPool.length === 0) {
      // 如果題目池為空，則重新生成
      questionPool = shuffle([...character2Questions]);
    }
    currentQuestion = questionPool.pop(); // 取出一題
    conversationState = 1;
  } else if (!isClose && conversationState !== 0) {
    // 離開時結束對話
    conversationState = 0;
    playerName = '';
    if (nameInput) {
      nameInput.remove();
      nameInput = null;
    }
    // 無論如何都移除按鈕
    removeButtons();
  }

  // --- 角色4 對話狀態機 ---
  let isClose4 = abs(x - renderX4) < proximityThreshold && abs(y - y4) < verticalProximityThreshold;

  if (isClose4 && conversationState4 === 0) {
    // 靠近時，隨機選一個問題開始對話
    if (brianQuestionPool.length === 0) {
      // 如果題目池為空，則重新生成一組隨機且不重複的題目
      // 固定 "你想聽我唱歌嗎？" 為第一題，其餘隨機
      let singQ = brianQuestions.find(q => q.sing);
      let otherQs = brianQuestions.filter(q => !q.sing);
      brianQuestionPool = [singQ, ...shuffle(otherQs)];
    }
    currentQuestion4 = brianQuestionPool.shift(); // 從題目池中取出第一道題目並移除
    conversationState4 = 1; // 進入提問狀態
    isSinging4 = false;
    singRepeatCount = 0; // 重置唱歌重複次數
  } else if (!isClose4 && conversationState4 !== 0) {
    // 離開時結束對話
    conversationState4 = 0;
    character4Feedback = '';
    currentQuestion4 = null;
    if (nameInput4) {
      nameInput4.remove();
      nameInput4 = null;
    }
    removeButtons(); // 移除所有按鈕
    singRepeatCount = 0; // 離開時重置唱歌重複次數
    brianQuestionPool = []; // 離開時清空題目池
    isSinging4 = false;
  }
  // --- 角色3 對話狀態機 ---
  let isClose3 = abs(x - renderX3) < proximityThreshold && abs(y - y3) < verticalProximityThreshold;

  if (isClose3 && conversationState3 === 0) {
    // 靠近時開始對話
    if (edTechQuestionPool.length === 0) {
      edTechQuestionPool = shuffle([...edTechQuestions]); // 複製並打亂題目
    }
    currentEdTechQuestion = edTechQuestionPool.pop(); // 取出一題
    conversationState3 = 1; // 進入問答狀態
  } else if (!isClose3 && conversationState3 !== 0) {
    // 離開時結束對話
    conversationState3 = 0;
    removeButtons(); // 移除所有按鈕
  }

  // 根據對話狀態決定是否微笑 (提問或顯示回饋時都微笑)，且角色沒有被擊倒
  if (conversationState > 0 && !isDown2) {
    isSmiling2 = true;
  } else {
    isSmiling2 = false;
  }

  // 檢查是否需要觸發角色5的稱讚
  // 當玩家答對(state 2)且角色5正在提示(state 2)時
  if ((conversationState === 2 || conversationState3 === 2 || conversationState4 === 2) && conversationState5 === 2) {
    conversationState5 = 3; // 切換到稱讚狀態
    hint5StartTime = millis(); // 重置計時器用於稱讚顯示
  }

  // 如果玩家離開對話 (不再與角色2或角色3互動)，且角色5正在提示或走過去，則讓角色5走回去
  if (conversationState === 0 && conversationState3 === 0 && conversationState4 === 0 && (conversationState5 === 1 || conversationState5 === 2)) {
    conversationState5 = 5; // 切換到走回去狀態
  }

  // 檢查是否靠近角色5以觸發打招呼
  let isClose5 = abs(x - renderX5) < proximityThreshold && abs(y - y5) < verticalProximityThreshold;
  if (isClose5 && conversationState5 === 0) {
    conversationState5 = 6; // 進入打招呼狀態
  } else if (!isClose5 && conversationState5 === 6) {
    conversationState5 = 0; // 離開後回到IDLE
  }

  // --- 角色5 提示狀態機 ---
  switch (conversationState5) {
    case 1: // WALKING_TO_PLAYER
      // 如果角色5距離太遠(因為世界循環)，將其實際座標瞬移到附近的循環位置
      if (abs(x5 - x) > worldWidth / 2) {
        x5 = renderX5;
        x5_orig = getWrappedX(x, x5_orig, worldWidth); // 原始位置也要跟著搬移
      }

      let offsetDir = 1;
      // 判斷當前互動對象 (角色2 或 角色3)
      if (conversationState === 3) { // 正在與角色2互動且答錯
        offsetDir = (x < renderX2) ? -1 : 1;
      } else if (conversationState3 === 3) { // 正在與角色3互動且答錯
        offsetDir = (x < renderX3) ? -1 : 1;
      } else if (conversationState4 === 5) { // 正在與角色4互動且答錯
        offsetDir = (x < renderX4) ? -1 : 1;
      }

      let targetX = x + (120 * offsetDir); // 根據相對位置決定站在左邊還是右邊
      let targetY = y; // 走到玩家的旁邊
      let dx = targetX - x5;
      let dy = targetY - y5;
      let dist = sqrt(dx * dx + dy * dy);
      if (dist > speed * 2) {
        x5 += (dx / dist) * speed * 2;
        y5 += (dy / dist) * speed * 2;
      } else {
        x5 = targetX;
        y5 = targetY;
        conversationState5 = 2; // 到達目的地，開始提示
      }
      break;
    case 2: // HINTING
      // 停在原地等待，直到玩家答對
      break;
    case 3: // PRAISING
      if (millis() - hint5StartTime > 2000) { // 稱讚顯示2秒
        conversationState5 = 4; // 稱讚結束，進入延遲狀態
        hint5StartTime = millis(); // 重置計時器用於延遲
      }
      break;
    case 4: // PRAISE_DELAY
      if (millis() - hint5StartTime > 200) { // 延遲0.5秒
        conversationState5 = 5; // 延遲結束，開始走回去
      }
      break;
    case 5: // WALKING_BACK
      let dx_back = x5_orig - x5;
      let dy_back = y5_orig - y5;
      let dist_back = sqrt(dx_back * dx_back + dy_back * dy_back);
      if (dist_back > speed) {
        x5 += (dx_back / dist_back) * speed;
        y5 += (dy_back / dist_back) * speed;
      } else {
        x5 = x5_orig;
        y5 = y5_orig;
        conversationState5 = 0; // 回到原位，進入IDLE狀態
      }
      break;
  }


  // 繪製新角色 (如果動畫已準備好)
  if (stopAnimation2.length > 0) {
    push();
    translate(renderX2, y2);
    scale(direction2, 1); // 根據方向翻轉角色2


    if (isDown2 && downAnimation2.length > 0) {
      // 播放一次倒下動畫 (被擊中時)
      let frameIndex = floor(downFrame2 / downAnimationSpeed2);
      if (frameIndex < downNumberOfFrames2) {
        image(downAnimation2[frameIndex], 0, 0);
        downFrame2++; // 遞增動畫計數器
      } else {
        // 動畫播放完畢，恢復站立
        isDown2 = false;
      }
    } else if (conversationState === 2 && downAnimation2.length > 0) {
      // 答對時，播放倒下動畫 (循環)
      image(downAnimation2[floor(frameCount / downAnimationSpeed2) % downNumberOfFrames2], 0, 0);
    } else if (isSmiling2) {
      // 播放微笑動畫 (提問或答錯時)
      image(smileAnimation2[floor(frameCount / smileAnimationSpeed2) % smileNumberOfFrames2], 0, 0);
    } else {
      // 播放站立動畫
      image(stopAnimation2[floor(frameCount / 8) % stopNumberOfFrames2], 0, 0);
    }


    pop();
  }


  // 如果角色2正在微笑且沒有被擊倒，則在其上方顯示對話框
  if (isSmiling2 && !isDown2 && smileAnimation2.length > 0) {
    let dialogueText = "";
    let boxWidth = 300; // 增加對話框寬度，以容納更多文字


    if (conversationState === 1) {
      dialogueText = currentQuestion.q;
      
      // 顯示 O / X 按鈕
      if (!trueButton) {
        trueButton = createButton('O');
        trueButton.attribute('translate', 'no');
        trueButton.size(40, 40);
        trueButton.style('border-radius', '50%'); // 圓形
        trueButton.style('font-size', '20px');
        trueButton.style('background-color', '#4CAF50'); // 綠色
        trueButton.style('color', 'white');
        trueButton.style('border', 'none');
        trueButton.style('cursor', 'pointer');
        trueButton.mousePressed(() => checkCharacter2Answer(true));

        falseButton = createButton('X');
        falseButton.attribute('translate', 'no');
        falseButton.size(40, 40);
        falseButton.style('border-radius', '50%');
        falseButton.style('font-size', '20px');
        falseButton.style('background-color', '#f44336'); // 紅色
        falseButton.style('color', 'white');
        falseButton.style('border', 'none');
        falseButton.style('cursor', 'pointer');
        falseButton.mousePressed(() => checkCharacter2Answer(false));
      }
    } else if (conversationState === 2) { // 答對了
      dialogueText = character2Feedback;
      // 顯示 "下一題" 按鈕
      if (!nextButton) {
        nextButton = createButton('下一題');
        nextButton.mousePressed(() => {
          conversationState = 0; // 重置對話狀態以觸發新問題
          currentQuestion = null; // 明確清除當前問題
          removeButtons();
        });
      }
    } else if (conversationState === 3) { // 答錯了
      dialogueText = character2Feedback;
      // 顯示 "再答一次" 按鈕
      if (!tryAgainButton) {
        tryAgainButton = createButton('再答一次');
        tryAgainButton.mousePressed(() => {
          conversationState = 1; // 回到提問狀態
          removeButtons();
        });
      }
      // 顯示 "提示" 按鈕 (如果角色5還沒出發)
      if (!hintButton && conversationState5 !== 1 && conversationState5 !== 2) {
        hintButton = createButton('幫幫我');
        hintButton.mousePressed(() => {
          conversationState5 = 1; // 角色5出發
          if (hintButton) {
            hintButton.remove();
            hintButton = null;
          }
        });
      }
    }

    // 1. 先計算文字與高度 (解決文字溢出與按鈕位置問題)
    const lineHeight = 20;
    // 使用完整文字來計算高度，避免打字機效果導致高度跳動
    const fullLines = wrapText(dialogueText, boxWidth - 30, 18);
    let boxHeight = max(100, fullLines.length * lineHeight + 20);

    // 應用打字機效果到對話文字 (僅用於顯示)
    let typedText = updateTypewriter('char2', dialogueText);
    const lines = wrapText(typedText, boxWidth - 30, 18);

    // 2. 計算位置
    // 取得當前微笑圖片的高度來定位對話框
    let smileImgHeight = smileAnimation2[0].height;
    let boxX = renderX2; // 對話框的X座標
    let boxY = y2 - smileImgHeight / 2 - boxHeight / 2 - 20; // 放在角色頭頂上方

    // 3. 更新按鈕位置 (顯示在對話框上方)
    let boxTopY = boxY - boxHeight / 2;
    let centerX = (renderX2 - camX);

    if (conversationState === 1 && trueButton && falseButton) {
       trueButton.position(centerX - 45, boxTopY - 50);
       falseButton.position(centerX + 5, boxTopY - 50);
    } else if (conversationState === 2 && nextButton) {
       nextButton.position(centerX - nextButton.width / 2, boxTopY - 50);
    } else if (conversationState === 3) {
       if (tryAgainButton && hintButton) {
          tryAgainButton.position(centerX - 80, boxTopY - 50);
          hintButton.position(centerX + 10, boxTopY - 50);
       } else if (tryAgainButton) {
          tryAgainButton.position(centerX - tryAgainButton.width / 2, boxTopY - 50);
       }
    }

    push();
    // 4. 繪製對話框與文字
    drawCuteDialogueBox(boxX, boxY, boxWidth, boxHeight, 'blue', x2 * y2); // 使用原始 x2 作為種子以保持穩定

    fill(0); // 黑色文字
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);

    const totalTextHeight = lines.length * lineHeight;
    let textStartY = boxY - totalTextHeight / 2 + lineHeight / 2;

    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX, textStartY + i * lineHeight);
    }
    pop();
  }

  // --- 繪製角色4 --- (動畫邏輯)
  if (stopAnimation4.length > 0) {
    push();
    translate(renderX4, y4);

    if (conversationState4 === 3) { // 準備唱歌狀態 (顯示對話框，等待延遲)
      if (millis() - singDelayStartTime >= 1000) { // 延遲1秒後開始唱歌
        conversationState4 = 4; // 切換到唱歌動畫狀態
        singFrame4 = 0; // 重置唱歌動畫幀
        singRepeatCount = 0; // 重置唱歌重複次數
      }
      // 播放站立動畫
      let frameIndex = floor(frameCount / 8) % stopNumberOfFrames4;
      // 放大角色4 (1.5倍)
      image(stopAnimation4[frameIndex], 0, 0, frameWidth4 * 1.5, frameHeight4 * 1.5);
    } else if (conversationState4 === 4 && singAnimation4.length > 0) { // 唱歌動畫狀態
      
      // 繪製聚光燈光束
      push();
      noStroke();
      // 光束 (梯形)
      fill(255, 255, 200, 60); // 淡黃色光束
      beginShape();
      vertex(-30, -600); // 光源頂部 (較窄)
      vertex(30, -600);
      vertex(120, 60); // 底部 (較寬)
      vertex(-120, 60);
      endShape(CLOSE);
      // 地面光斑 (橢圓)
      fill(255, 255, 200, 100); // 地面光斑較亮
      ellipse(0, 50, 200, 60);
      pop();

      let frameIndex = floor(singFrame4 / 8) % singNumberOfFrames4;
      image(singAnimation4[frameIndex], 0, 0, singFrameWidth4 * 1.5, singFrameHeight4 * 1.5);
      singFrame4++;

      // 產生音符特效
      if (frameCount % 10 === 0) {
        notes.push({
          x: renderX4 + random(-20, 20),
          y: y4 - 60, // 從頭頂上方出現
          vx: random(-1, 1),
          vy: random(-2, -1),
          alpha: 255,
          size: random(20, 30),
          symbol: random(['♪', '♫', '♩']),
          offset: random(100),
          r: random(100, 255), // 隨機紅色分量 (偏亮)
          g: random(100, 255), // 隨機綠色分量
          b: random(100, 255)  // 隨機藍色分量
        });
      }

      // 檢查是否完成一輪動畫
      if (singFrame4 >= singNumberOfFrames4 * 8) {
        singRepeatCount++;
        singFrame4 = 0; // 重置動畫幀，準備下一輪
        if (singRepeatCount >= singRepetitions) { // 達到重複次數
          character4Feedback = "唱完歌希望你心情有好一點!";
          conversationState4 = 2; // 唱歌結束後回到回覆狀態
          singRepeatCount = 0; // 重置重複次數
        }
      }
    } else { // 預設站立動畫 (idle, asking, replied_normal)
      let frameIndex = floor(frameCount / 8) % stopNumberOfFrames4;
      image(stopAnimation4[frameIndex], 0, 0, frameWidth4 * 1.5, frameHeight4 * 1.5);
    }
    pop();
  }

  // --- 繪製角色4的對話框 ---
  if ((conversationState4 === 1 || conversationState4 === 2 || conversationState4 === 3 || conversationState4 === 5) && currentQuestion4) {
    let dialogueText4 = "";
    const boxWidth = 300;
    const lineHeight = 22;

    if (conversationState4 === 1) { // 提問階段
      dialogueText4 = currentQuestion4.q;
      
      // 顯示 O / X 按鈕
      if (!trueButton) {
        trueButton = createButton('O');
        trueButton.attribute('translate', 'no');
        trueButton.size(40, 40);
        trueButton.style('border-radius', '50%'); // 圓形
        trueButton.style('font-size', '20px');
        trueButton.style('background-color', '#4CAF50'); // 綠色
        trueButton.style('color', 'white');
        trueButton.style('border', 'none');
        trueButton.style('cursor', 'pointer');
        trueButton.mousePressed(() => checkBrianAnswer(true));

        falseButton = createButton('X');
        falseButton.attribute('translate', 'no');
        falseButton.size(40, 40);
        falseButton.style('border-radius', '50%');
        falseButton.style('font-size', '20px');
        falseButton.style('background-color', '#f44336'); // 紅色
        falseButton.style('color', 'white');
        falseButton.style('border', 'none');
        falseButton.style('cursor', 'pointer');
        falseButton.mousePressed(() => checkBrianAnswer(false));
      }

    } else if (conversationState4 === 2) { // 回覆階段
      dialogueText4 = character4Feedback;
      // 只有在正常回覆狀態才顯示按鈕
      if (!nextButton) {
        nextButton = createButton('繼續聊天');
        nextButton.mousePressed(() => {
          conversationState4 = 0; // 重置狀態以觸發新問題
          removeButtons();
        });
      }
    } else if (conversationState4 === 3) { // 準備唱歌階段
      dialogueText4 = character4Feedback; // 顯示 "那我唱歌給你聽吧!"
    } else if (conversationState4 === 5) { // 答錯階段
      dialogueText4 = character4Feedback;
      if (!tryAgainButton) {
        tryAgainButton = createButton('再猜一次');
        tryAgainButton.mousePressed(() => {
          conversationState4 = 1; // 回到提問狀態
          removeButtons();
        });
      }
      // 顯示 "提示" 按鈕
      if (!hintButton && conversationState5 !== 1 && conversationState5 !== 2) {
        hintButton = createButton('幫幫我');
        hintButton.mousePressed(() => {
          conversationState5 = 1; // 角色5出發
          if (hintButton) {
            hintButton.remove();
            hintButton = null;
          }
        });
      }
    }

    // 應用打字機效果
    let typedText4 = updateTypewriter('char4', dialogueText4);

    // 使用完整文字計算高度，避免跳動
    const fullLines = wrapText(dialogueText4, boxWidth - 30, 18);
    const boxHeight = max(100, fullLines.length * lineHeight + 20);

    const lines = wrapText(typedText4, boxWidth - 30, 18);
    // 更新按鈕位置 (顯示在對話框上方)
    let boxCenterY = y4 - (frameHeight4 * 1.5) / 2 - boxHeight / 2 - 10;
    let boxTopY = boxCenterY - boxHeight / 2;
    let centerX = (renderX4 - camX);

    if (conversationState4 === 1 && trueButton && falseButton) {
       trueButton.position(centerX - 45, boxTopY - 50);
       falseButton.position(centerX + 5, boxTopY - 50);
    } else if (conversationState4 === 2 && nextButton) {
       nextButton.position(centerX - nextButton.width / 2, boxTopY - 50);
    } else if (conversationState4 === 5) {
       if (tryAgainButton && hintButton) {
          tryAgainButton.position(centerX - 80, boxTopY - 50);
          hintButton.position(centerX + 10, boxTopY - 50);
       } else if (tryAgainButton) {
          tryAgainButton.position(centerX - tryAgainButton.width / 2, boxTopY - 50);
       }
    }

    let boxX = renderX4;
    let boxY = y4 - (frameHeight4 * 1.5) / 2 - boxHeight / 2 - 10;
    drawCuteDialogueBox(boxX, boxY, boxWidth, boxHeight, 'green', x4 * y4); // 使用原始 x4 作為種子

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    const totalTextHeight = lines.length * lineHeight;
    let textStartY = boxY - totalTextHeight / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX, textStartY + i * lineHeight);
    }
  }

  // --- 繪製角色3的對話框 ---
  if (conversationState3 > 0) {
    let dialogueText3 = "";
    const boxWidth = 300;
    const lineHeight = 22; // 設定每行文字的高度

    if (conversationState3 === 1) { // 提問階段
      dialogueText3 = currentEdTechQuestion.q;
      
      // 顯示 O / X 按鈕
      if (!trueButton) {
        trueButton = createButton('O');
        trueButton.attribute('translate', 'no');
        trueButton.size(40, 40);
        trueButton.style('border-radius', '50%'); // 圓形
        trueButton.style('font-size', '20px');
        trueButton.style('background-color', '#4CAF50'); // 綠色
        trueButton.style('color', 'white');
        trueButton.style('border', 'none');
        trueButton.style('cursor', 'pointer');
        trueButton.mousePressed(() => checkEdTechAnswer(true));

        falseButton = createButton('X');
        falseButton.attribute('translate', 'no');
        falseButton.size(40, 40);
        falseButton.style('border-radius', '50%');
        falseButton.style('font-size', '20px');
        falseButton.style('background-color', '#f44336'); // 紅色
        falseButton.style('color', 'white');
        falseButton.style('border', 'none');
        falseButton.style('cursor', 'pointer');
        falseButton.mousePressed(() => checkEdTechAnswer(false));
      }
    } else if (conversationState3 === 2) { // 答對階段
      dialogueText3 = feedbackText3;
      
      // 顯示 "下一題" 按鈕
      if (!nextButton) {
         nextButton = createButton('下一題');
         nextButton.mousePressed(() => {
             conversationState3 = 0; // 重置狀態，觸發下一題
             removeButtons();
         });
      }
    } else if (conversationState3 === 3) { // 答錯階段
      dialogueText3 = feedbackText3;

      // 顯示 "再答一次" 按鈕
      if (!tryAgainButton) {
         tryAgainButton = createButton('再猜一次');
         tryAgainButton.mousePressed(() => {
             conversationState3 = 1; // 回到提問狀態
             removeButtons();
         });
      }
      // 顯示 "提示" 按鈕
      if (!hintButton && conversationState5 !== 1 && conversationState5 !== 2) {
        hintButton = createButton('幫幫我');
        hintButton.mousePressed(() => {
          conversationState5 = 1; // 角色5出發
          if (hintButton) {
            hintButton.remove();
            hintButton = null;
          }
        });
      }
    }

    // 應用打字機效果
    let typedText3 = updateTypewriter('char3', dialogueText3);

    // 使用完整文字計算高度，避免跳動
    const fullLines = wrapText(dialogueText3, boxWidth - 30, 18);
    const boxHeight = max(100, fullLines.length * lineHeight + 20);

    const lines = wrapText(typedText3, boxWidth - 30, 18);

    // 更新按鈕位置 (顯示在對話框上方)
    let boxCenterY = y3 - (frameHeight3 * 1.5) / 2 - boxHeight / 2 - 10;
    let boxTopY = boxCenterY - boxHeight / 2;
    let centerX = (renderX3 - camX);

    if (conversationState3 === 1 && trueButton && falseButton) {
       trueButton.position(centerX - 45, boxTopY - 50);
       falseButton.position(centerX + 5, boxTopY - 50);
    } else if (conversationState3 === 2 && nextButton) {
       nextButton.position(centerX - nextButton.width / 2, boxTopY - 50);
    } else if (conversationState3 === 3) {
       if (tryAgainButton && hintButton) {
          tryAgainButton.position(centerX - 80, boxTopY - 50);
          hintButton.position(centerX + 10, boxTopY - 50);
       } else if (tryAgainButton) {
          tryAgainButton.position(centerX - tryAgainButton.width / 2, boxTopY - 50);
       }
    }

    push();
    // 設定對話框樣式
    let boxX = renderX3;
    let boxY = y3 - (frameHeight3 * 1.5) / 2 - boxHeight / 2 - 10; // 放在角色3頭頂上方
    
    // 使用新的可愛對話框函數
    drawCuteDialogueBox(boxX, boxY, boxWidth, boxHeight, 'pink', x3 * y3); // 使用原始 x3 作為種子
    // 設定文字樣式並繪製對話內容
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    
    // 逐行繪製文字，使其在動態高度的對話框中垂直居中
    const totalTextHeight = lines.length * lineHeight;
    let textStartY = boxY - totalTextHeight / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX, textStartY + i * lineHeight);
    }
    pop();
  }

  // --- 繪製角色3 ---
  if (stopAnimation3.length > 0) {
    push();
    translate(renderX3, y3);

    // 根據角色1的位置決定角色3的方向
    let direction3 = (x < renderX3) ? -1 : 1;
    scale(direction3, 1); // 根據方向翻轉角色3

    // 播放站立動畫
    let frameIndex = floor(frameCount / 8) % stopNumberOfFrames3;
    // 放大角色3 (1.5倍)
    image(stopAnimation3[frameIndex], 0, 0, frameWidth3 * 1.5, frameHeight3 * 1.5);

    pop();
  }

  // --- 繪製角色5 ---
  if (stopAnimation5.length > 0) {
    push();
    translate(renderX5, y5); // 使用計算後的循環座標繪製
    let direction5 = 1;

    if (conversationState5 === 1) { // 走向玩家
      direction5 = (x > renderX5) ? 1 : -1;
      scale(direction5, 1);
      image(walkAnimation5[floor(frameCount / 4) % walkNumberOfFrames5], 0, 0, walkFrameWidth5 * 1.2, walkFrameHeight5 * 1.2);
    } else if ((conversationState5 >= 2 && conversationState5 <= 4) || conversationState5 === 6) { // 提示中、稱讚中、延遲中或打招呼
      direction5 = (x > renderX5) ? 1 : -1;
      scale(direction5, 1);
      image(stopAnimation5[floor(frameCount / 8) % stopNumberOfFrames5], 0, 0, frameWidth5 * 1.2, frameHeight5 * 1.2);
    } else if (conversationState5 === 5) { // 走回去
      direction5 = (x5_orig > x5) ? 1 : -1;
      scale(direction5, 1);
      image(walkAnimation5[floor(frameCount / 4) % walkNumberOfFrames5], 0, 0, walkFrameWidth5 * 1.2, walkFrameHeight5 * 1.2);
    } else { // IDLE
      scale(-1, 1); // 預設朝左
      image(stopAnimation5[floor(frameCount / 8) % stopNumberOfFrames5], 0, 0, frameWidth5 * 1.2, frameHeight5 * 1.2);
    }
    pop();
  }

  // 繪製角色5的驚嘆號或愛心
  if (conversationState5 === 1 || conversationState5 === 2) {
    drawExclamationMark(renderX5, y5 - (frameHeight5 * 1.2) / 2 - 140);
  } else if (conversationState5 === 3 || conversationState5 === 4) {
    drawHeart(renderX5, y5 - (frameHeight5 * 1.2) / 2 - 140);
  }

  // --- 繪製角色5的提示框 ---
  if ((conversationState5 >= 1 && conversationState5 <= 5) || conversationState5 === 6) { // 在走路、提示、稱讚、延遲、走回去和打招呼狀態都顯示對話框
    let dialogueText5 = "";
    if (conversationState5 === 1) {
      dialogueText5 = "我來給你提示了"; // 走路時顯示的文字
    } else if (conversationState5 === 2) {
      dialogueText5 = hint5Text; // 停止時顯示的實際提示
    } else if (conversationState5 === 3 || conversationState5 === 4) {
      dialogueText5 = "太棒了，你真聰明！"; // 稱讚的文字
    } else if (conversationState5 === 5) {
      dialogueText5 = "那我先走囉"; // 走回去時顯示的文字
    } else if (conversationState5 === 6) {
      dialogueText5 = "在你回答錯時，我會提示你!";
    }

    const boxWidth = 300;
    
    // 應用打字機效果
    let typedText5 = updateTypewriter('char5', dialogueText5);

    const lineHeight = 22;
    // 使用完整文字計算高度，避免跳動
    const fullLines = wrapText(dialogueText5, boxWidth - 30, 18);
    const boxHeight = max(100, fullLines.length * lineHeight + 20);

    const lines = wrapText(typedText5, boxWidth - 30, 18);

    // 將提示框定位在角色5的頭上
    let boxX = renderX5; // 使用計算後的循環座標
    let boxY = y5 - (frameHeight5 * 1.2) / 2 - boxHeight / 2 - 10;

    // 使用黃色主題的對話框來顯示提示
    drawCuteDialogueBox(boxX, boxY, boxWidth, boxHeight, 'yellow', x5_orig * y5_orig); // 使用原始位置做種子

    // 繪製文字
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    const totalTextHeight = lines.length * lineHeight;
    let textStartY = boxY - totalTextHeight / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX, textStartY + i * lineHeight);
    }
  }

  // 繪製角色
  push();
  translate(x, y);
  scale(direction, 1); // 根據方向翻轉圖片


  if (isJumping) {
    // 播放跳躍動畫
    let frameIndex = floor(map(velocityY, jumpStrength, -jumpStrength, 0, jumpNumberOfFrames - 1));
    frameIndex = constrain(frameIndex, 0, jumpNumberOfFrames - 1);    
    image(jumpAnimation[frameIndex], 0, 0, jumpAnimation[frameIndex].width * 0.9, jumpAnimation[frameIndex].height * 0.9);
  } else if (isAttacking) {
    // 播放攻擊動畫
    let frameIndex = floor(attackFrame / attackAnimationSpeed);
    image(pushAnimation[frameIndex], 0, 0, pushAnimation[frameIndex].width * 0.9, pushAnimation[frameIndex].height * 0.9);
  } else if (keyIsDown(68) || keyIsDown(65) || keyIsDown(87) || keyIsDown(83)) { // 'D', 'A', 'W', or 'S'
    // 播放走路動畫
    image(walkAnimation[floor(frameCount / 4) % walkNumberOfFrames], 0, 0, walkAnimation[0].width * 0.9, walkAnimation[0].height * 0.9);
  } else {
    // 播放站立動畫
    image(stopAnimation[floor(frameCount / 8) % stopNumberOfFrames], 0, 0, stopAnimation[0].width * 0.9, stopAnimation[0].height * 0.9);
  }
  pop();
  pop(); // 結束鏡頭平移

  // 低血量警告特效 (當血量低於 30% 時)
  if (playerHealth > 0 && playerHealth < maxHealth * 0.3) {
    drawLowHealthWarning();
  }

  // 繪製記分板
  drawScoreboard();

  // 繪製血量條
  drawHealthBar();

  // 繪製 WASD 按鍵提示
  drawWASDKeys();

  // 檢查勝利條件
  if (score >= targetScore) {
    gameState = 'victory';
    removeButtons(); // 移除所有對話按鈕
  }

  // 檢查失敗條件 (血量歸零)
  if (playerHealth <= 0) {
    gameState = 'gameover';
    removeButtons();
  }
}


function keyPressed() {
  if (gameState !== 'playing') return; // 遊戲未開始時不觸發

  // 只有在角色不在跳躍或攻擊時才能觸發新動作
  if (isJumping || isAttacking) return;


  if (keyCode === 32) { // Spacebar
    isJumping = true;
    velocityY = jumpStrength;
    groundY = y; // 將當前 y 設為地面
  } else if (keyCode === DOWN_ARROW) { // Down Arrow key
    isAttacking = true;
    attackFrame = 0;
  }
}

/**
 * 檢查角色3的是非題答案
 * @param {boolean} userAns 玩家選擇的答案 (true/false)
 */
function checkEdTechAnswer(userAns) {
  if (userAns === currentEdTechQuestion.a) {
    feedbackText3 = "答對了！你真聰明！";
    conversationState3 = 2; // 進入答對狀態
    score++; // 加分
  } else {
    feedbackText3 = "答錯囉... 再接再厲！";
    conversationState3 = 3; // 進入答錯狀態
    playerHealth = max(0, playerHealth - 20); // 扣血
    healthShakeTimer = 20; // 觸發抖動效果
    // 設定提示文字，但等待按鈕觸發 conversationState5 = 1
    hint5Text = currentEdTechQuestion.h || "再試試看！";
  }
  removeButtons(); // 移除 O/X 按鈕
}

/**
 * 檢查角色2的是非題答案
 * @param {boolean} userAns 玩家選擇的答案 (true/false)
 */
function checkCharacter2Answer(userAns) {
  if (userAns === currentQuestion.a) {
    character2Feedback = currentQuestion.correct;
    conversationState = 2; // 進入答對狀態
    score++; // 加分
  } else {
    character2Feedback = currentQuestion.wrong;
    conversationState = 3; // 進入答錯狀態
    playerHealth = max(0, playerHealth - 20); // 扣血
    healthShakeTimer = 20; // 觸發抖動效果
    // 設定提示文字，但等待按鈕觸發 conversationState5 = 1
    hint5Text = currentQuestion.h || "再試試看！"; // 使用專屬提示
  }
  removeButtons(); // 移除 O/X 按鈕
}

/**
 * 檢查角色4的是非題答案
 * @param {boolean} userAns 玩家選擇的答案 (true/false)
 */
function checkBrianAnswer(userAns) {
  let isCorrect = (userAns === currentQuestion4.a);
  let reply = currentQuestion4.r || "";
  
  if (currentQuestion4.sing && userAns === true) {
     character4Feedback = reply;
     singDelayStartTime = millis();
     conversationState4 = 3; // 準備唱歌
     score++; // 加分
  } else {
     if (isCorrect) {
       character4Feedback = "答對了！" + reply;
       conversationState4 = 2; // 正常回覆 (答對)
       score++; // 加分
     } else {
       character4Feedback = "答錯了。"; // 簡化回饋，提示由角色5說
       conversationState4 = 5; // 答錯狀態
       playerHealth = max(0, playerHealth - 20); // 扣血
       healthShakeTimer = 20; // 觸發抖動效果
       // 設定提示文字，但等待按鈕觸發 conversationState5 = 1
       hint5Text = currentQuestion4.h || "再試試看！";
     }
  }
  removeButtons();
}

/**
 * 將文字進行換行處理，支援強制切斷長單詞
 * @param {string} text 要處理的文字
 * @param {number} maxWidth 最大寬度
 * @param {number} size 文字大小
 * @returns {string[]} 換行後的文字陣列
 */
function wrapText(text, maxWidth, size) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  push();
  textSize(size);

  for (const word of words) {
    // 檢查單詞本身是否就超過寬度
    if (textWidth(word) > maxWidth) {
      // 強制切斷長單詞
      let tempWord = word;
      while (textWidth(tempWord) > maxWidth) {
        let i = tempWord.length;
        while (textWidth(tempWord.substring(0, i)) > maxWidth) i--;
        lines.push(tempWord.substring(0, i));
        tempWord = tempWord.substring(i);
      }
      currentLine = tempWord + ' ';
    } else if (textWidth(currentLine + word) > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine.trim() !== '') {
    lines.push(currentLine.trim());
  }

  pop();
  return lines;
}

/**
 * 繪製一個帶有裝飾的可愛對話框
 * @param {number} x 中心點X座標
 * @param {number} y 中心點Y座標
 * @param {number} w 寬度
 * @param {number} h 高度
 * @param {string} theme 主題 ('pink', 'blue', 'green', 'yellow')
 * @param {number} seed 固定的隨機種子
 */
function drawCuteDialogueBox(x, y, w, h, theme = 'pink', seed = 1) {
  let borderColor, fillColor, dotColor;

  if (theme === 'blue') {
    borderColor = color(135, 206, 250); // 淺藍 (LightSkyBlue)
    fillColor = color(224, 255, 255, 230); // 淡青色 (LightCyan)
    dotColor = color(100, 149, 237); // CornflowerBlue (較深)
  } else if (theme === 'green') {
    borderColor = color(152, 251, 152); // 淺綠 (PaleGreen)
    fillColor = color(240, 255, 240, 230); // 蜜瓜綠 (Honeydew)
    dotColor = color(60, 179, 113); // MediumSeaGreen (較深)
  } else if (theme === 'yellow') {
    borderColor = color(255, 215, 0); // 金色 (Gold)
    fillColor = color(255, 250, 205, 230); // 檸檬色 (LemonChiffon)
    dotColor = color(218, 165, 32); // GoldenRod (較深)
  } else { // 預設為粉色
    borderColor = color(255, 182, 193); // 淺粉色 (LightPink)
    fillColor = color(255, 228, 225, 230); // 粉色 (MistyRose)
    dotColor = color(219, 112, 147); // PaleVioletRed (較深)
  }

  push();
  rectMode(CENTER);
  
  // --- 繪製陰影 (增加層次感) ---
  noStroke();
  fill(0, 0, 0, 40);
  rect(x + 6, y + 6, w, h, 20);

  // --- 繪製主體 ---
  strokeWeight(4); // 邊框加粗
  stroke(borderColor);
  fill(fillColor);
  rect(x, y, w, h, 20); // 圓角加大

  // --- 繪製內層虛線 (縫線效果) ---
  noFill();
  stroke(dotColor);
  strokeWeight(2);
  drawingContext.setLineDash([8, 6]); // 設定虛線樣式 (8px實線, 6px空白)
  rect(x, y, w - 16, h - 16, 12); // 內縮的虛線框
  drawingContext.setLineDash([]); // 重置虛線

  // --- 繪製裝飾 ---
  // 在對話框周圍隨機撒上星星和圓點
  // 為了讓每次繪製的裝飾位置固定，使用x,y座標作為隨機種子
  randomSeed(seed); 
  for (let i = 0; i < 15; i++) {
    // 隨機選擇在上下邊緣還是在左右邊緣
    let px, py;
    if (random() > 0.5) { // 上下
      px = x + random(-w / 2, w / 2);
      py = y + (h / 2 + random(5, 15)) * (random() > 0.5 ? 1 : -1);
    } else { // 左右
      px = x + (w / 2 + random(5, 15)) * (random() > 0.5 ? 1 : -1);
      py = y + random(-h / 2, h / 2);
    }

    if (random() > 0.6) { // 畫星星
      fill(211, 211, 211, 200); // 銀色 (LightGray)
      let starSize = random(3, 7); // 大小兩種星星
      drawStar(px, py, starSize, starSize / 2, 5);
    } else { // 畫圓點
      fill(dotColor, 200);
      circle(px, py, random(4, 8));
    }
  }
  pop();
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function removeButtons() {
  if (nextButton) {
    nextButton.remove();
    nextButton = null;
  }
  if (tryAgainButton) {
    tryAgainButton.remove();
    tryAgainButton = null;
  }
  if (hintButton) {
    hintButton.remove();
    hintButton = null;
  }
  if (trueButton) {
    trueButton.remove();
    trueButton = null;
  }
  if (falseButton) {
    falseButton.remove();
    falseButton = null;
  }
}

function windowResized() {
  // 當視窗大小改變時，自動調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  if (gameState === 'playing') {
    let groundLevel = height / 2 + 350;
    y2 = groundLevel - 30; // 更新新角色的 y 座標
    y3 = groundLevel + 20; // 更新角色3的 y 座標
    y4 = groundLevel; // 更新角色4的 y 座標
    // 如果角色5不在移動中，才更新其原始位置
    if (conversationState5 === 0) {
      y5_orig = groundLevel;
      y5 = groundLevel; // 更新角色5的 y 座標
    }
  }
}

/**
 * 計算在循環世界中，目標物件相對於玩家最近的顯示座標
 * @param {number} playerX 玩家的 X 座標
 * @param {number} targetX 目標物件的原始 X 座標
 * @param {number} worldW 世界總寬度
 * @returns {number} 調整後的目標 X 座標
 */
function getWrappedX(playerX, targetX, worldW) {
  let dx = targetX - playerX;
  // 將距離標準化到 -worldW/2 到 worldW/2 之間
  return playerX + (dx - worldW * Math.round(dx / worldW));
}

/**
 * 更新並取得打字機效果的文字
 * @param {string} id 唯一的識別碼 (例如 'char2', 'char3')
 * @param {string} fullText 完整的文字內容
 * @param {number} speed 打字速度 (每幾幀顯示一個字，越小越快)
 * @returns {string} 當前應該顯示的文字部分
 */
function updateTypewriter(id, fullText, speed = 2) {
  if (!typewriterStates[id]) {
    typewriterStates[id] = { text: '', index: 0, lastUpdate: 0 };
  }
  let state = typewriterStates[id];
  
  // 如果文字內容改變了，重置打字機
  if (state.text !== fullText) {
    state.text = fullText;
    state.index = 0;
  }
  
  // 更新顯示字數
  if (frameCount - state.lastUpdate > speed) {
    if (state.index < fullText.length) {
      state.index++;
      state.lastUpdate = frameCount;
    }
  }
  
  return fullText.substring(0, state.index);
}

function drawStartScreen() {
  // 繪製背景
  imageMode(CORNER);
  if (bgImage) {
    image(bgImage, 0, 0, width, height);
  } else {
    background(135, 206, 235); // 天藍色背景
  }

  // 繪製半透明背板，讓文字更清晰
  push();
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 0, 150); // 半透明黑色
  rect(width / 2, height / 2, 600, 400, 20); // 繪製一個圓角矩形作為背板
  pop();

  // 計算呼吸燈效果 (透明度和大小隨時間變化)
  let breathingAlpha = map(sin(frameCount * 0.05), -1, 1, 150, 255);
  let breathingScale = map(sin(frameCount * 0.05), -1, 1, 0.98, 1.02); // 輕微縮放

  // 繪製標題
  push();
  translate(width / 2, height / 2 - 110); // 調整Y座標，使其在背板內靠上
  scale(breathingScale);
  textAlign(CENTER, CENTER);
  textFont('Courier New'); // 改成像素風格字體
  textStyle(BOLD);
  textSize(64);
  fill(255, 255, 255, breathingAlpha);
  stroke(0, 0, 0, breathingAlpha * 0.8);
  strokeWeight(5);
  text("互動冒險世界", 0, 0);
  pop();
  
  if (isShowingInstructions) {
    // 動畫插值：讓縮放比例平滑地從當前值移動到 1
    instructionScale = lerp(instructionScale, 1, 0.15);

    // --- 顯示說明視窗 ---
    push();
    translate(width / 2, height / 2); // 將原點移動到畫面中心
    scale(instructionScale); // 應用縮放動畫

    // --- 毛玻璃效果 (Backdrop Filter 模擬) ---
    if (bgImage) {
      push();
      // 1. 定義剪裁區域 (與視窗形狀相同)
      drawingContext.beginPath();
      // 使用原生 roundRect (x, y, w, h, radii)
      // 注意：座標是相對 translate 後的 (0,0) 中心點，所以左上角是 (-400, -250)
      if (drawingContext.roundRect) {
        drawingContext.roundRect(-400, -250, 800, 500, 20);
      } else {
        drawingContext.rect(-400, -250, 800, 500); // 相容性備案
      }
      drawingContext.clip();

      // 2. 應用模糊濾鏡
      drawingContext.filter = 'blur(10px)';

      // 3. 繪製背景圖 (抵銷當前的變換，使背景圖與螢幕對齊)
      scale(1 / instructionScale);
      translate(-width / 2, -height / 2);
      image(bgImage, 0, 0, width, height);
      pop();
    }

    rectMode(CENTER);
    fill(0, 0, 0, 100); // 調低透明度，讓模糊背景透出來
    stroke(255);
    strokeWeight(2);
    rect(0, 0, 800, 500, 20); // 加大視窗尺寸 (比開始畫面的 600x400 大)

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(32);
    textStyle(BOLD);
    text("遊戲說明", 0, -150); // 調整標題位置

    textSize(20);
    textLeading(35); // 行距
    text("使用 W/A/S/D 移動 | 空白鍵跳躍 | ↓ 攻擊\n\n探索世界並回答角色的問題\n答對加分，答錯會扣除 20 點血量\n\n當血量危險時，留意空投的補血包！\n目標：集滿 5 分獲勝，血量歸零失敗", 0, 0); // 調整內文位置居中
    pop();

    // 隱藏主畫面按鈕
    if (startButton) startButton.hide();
    if (instructionButton) instructionButton.hide();

    // 顯示關閉按鈕
    // 當視窗夠大時才顯示按鈕，避免視覺突兀
    if (instructionScale > 0.8) {
      if (!closeInstructionButton) {
        closeInstructionButton = createButton('關閉');
        closeInstructionButton.style('font-size', '20px');
        closeInstructionButton.style('padding', '8px 24px');
        closeInstructionButton.style('border-radius', '12px');
        closeInstructionButton.style('border', '2px solid #fff');
        closeInstructionButton.style('background-color', '#555');
        closeInstructionButton.style('color', 'white');
        closeInstructionButton.style('cursor', 'pointer');
        closeInstructionButton.mousePressed(() => {
          isShowingInstructions = false;
          closeInstructionButton.hide();
        });
      } else {
        closeInstructionButton.show();
      }
      closeInstructionButton.position(width / 2 - closeInstructionButton.width / 2, height / 2 + 180); // 調整關閉按鈕位置
    } else {
      if (closeInstructionButton) closeInstructionButton.hide();
    }

  } else {
    instructionScale = 0; // 重置動畫狀態，下次打開時才會重新彈出
    // --- 顯示主畫面按鈕 ---
    if (closeInstructionButton) closeInstructionButton.hide();
    if (startButton) startButton.show();

    // 創建 "遊戲說明" 按鈕
    if (!instructionButton) {
      instructionButton = createButton('遊戲說明');
      instructionButton.style('font-family', '"Courier New", monospace');
      instructionButton.style('font-weight', 'bold');
      instructionButton.style('font-size', '24px');
      instructionButton.style('padding', '10px 24px');
      instructionButton.style('border', '4px solid #000');
      instructionButton.style('border-radius', '0');
      instructionButton.style('background-color', '#2196F3');
      instructionButton.style('color', 'white');
      instructionButton.style('cursor', 'pointer');
      instructionButton.style('box-shadow', '6px 6px 0px #000');
      
      instructionButton.mouseOver(() => {
        instructionButton.style('background-color', '#1976D2');
        instructionButton.style('transform', 'translate(2px, 2px)');
        instructionButton.style('box-shadow', '4px 4px 0px #000');
      });
      instructionButton.mouseOut(() => {
        instructionButton.style('background-color', '#2196F3');
        instructionButton.style('transform', 'translate(0, 0)');
        instructionButton.style('box-shadow', '6px 6px 0px #000');
      });

      instructionButton.mousePressed(() => {
        isShowingInstructions = true;
      });
    } else {
      instructionButton.show();
    }
    // 定位在開始遊戲按鈕上方
    instructionButton.position(width / 2 - instructionButton.width / 2 - 50, height / 2 - 10);

    // 創建 "開始遊戲" 按鈕
    if (!startButton) {
      startButton = createButton('開始遊戲');
      startButton.style('font-family', '"Courier New", monospace');
      startButton.style('font-weight', 'bold');
      startButton.style('font-size', '24px');
      startButton.style('padding', '10px 24px');
      startButton.style('border', '4px solid #000');
      startButton.style('border-radius', '0');
      startButton.style('background-color', '#4CAF50');
      startButton.style('color', 'white');
      startButton.style('cursor', 'pointer');
      startButton.style('box-shadow', '6px 6px 0px #000');

      startButton.mouseOver(() => {
        startButton.style('background-color', '#45a049');
        startButton.style('transform', 'translate(2px, 2px)');
        startButton.style('box-shadow', '4px 4px 0px #000');
      });
      startButton.mouseOut(() => {
        startButton.style('background-color', '#4CAF50');
        startButton.style('transform', 'translate(0, 0)');
        startButton.style('box-shadow', '6px 6px 0px #000');
      });

      startButton.mousePressed(() => {
        gameState = 'playing';
        startButton.remove();
        startButton = null;
        // 清除說明相關按鈕
        if (instructionButton) {
          instructionButton.remove();
          instructionButton = null;
        }
        if (closeInstructionButton) {
          closeInstructionButton.remove();
          closeInstructionButton = null;
        }
        startGame(); // 初始化遊戲
      });
    }
    // 持續更新按鈕位置
    startButton.position(width / 2 - startButton.width / 2 - 50, height / 2 + 60);
  }
}

function startGame() {
  score = 0; // 重置分數
  visualScore = 0; // 重置顯示分數
  playerHealth = 100; // 重置血量
  fireworks = []; // 重置煙火
  confetti = []; // 重置彩帶
  healthItems = []; // 重置補血道具
  halos = []; // 重置光環特效
  // 初始化角色位置在畫面中央
  x = width / 2;
  y = height / 2 + 350; // 將角色1往下移一點
  x2 = width / 2 - 600; // 將角色2放在更左邊
  y2 = y - 30; // 角色2往下移
  x3 = width / 2 + 1900; // 將角色3往右移
  y3 = y + 20; // 角色3往下移
  x4 = width / 2 - 1200; // 將角色4往左移
  y4 = y; // 與角色1同高
  x5 = width / 2 + 660; // 將角色5的X座標設為對稱位置
  y5 = y; // 與角色1同高
  x5_orig = x5; // 儲存角色5的原始位置
  y5_orig = y5;


  // 計算單一畫格的寬度
  frameWidth = spriteSheet.width / stopNumberOfFrames;
  let frameHeight = spriteSheet.height;
  for (let i = 0; i < stopNumberOfFrames; i++) {
    let frame = spriteSheet.get(i * frameWidth, 0, frameWidth, frameHeight);
    stopAnimation.push(frame);
  }


  // 計算單一畫格的寬度並切割走路動畫
  walkFrameWidth = walkSheet.width / walkNumberOfFrames;
  let walkFrameHeight = walkSheet.height;
  for (let i = 0; i < walkNumberOfFrames; i++) {
    let frame = walkSheet.get(
      i * walkFrameWidth, 0,
      walkFrameWidth, walkFrameHeight
    );
    walkAnimation.push(frame);
  }


  // 計算單一畫格的寬度並切割跳躍動畫
  let jumpFrameWidth = jumpSheet.width / jumpNumberOfFrames;
  let jumpFrameHeight = jumpSheet.height;
  for (let i = 0; i < jumpNumberOfFrames; i++) {
    let frame = jumpSheet.get(
      i * jumpFrameWidth, 0,
      jumpFrameWidth, jumpFrameHeight
    );
    jumpAnimation.push(frame);
  }


  // 計算單一畫格的寬度並切割攻擊動畫
  let pushFrameWidth = pushSheet.width / pushNumberOfFrames;
  let pushFrameHeight = pushSheet.height;
  for (let i = 0; i < pushNumberOfFrames; i++) {
    let frame = pushSheet.get(
      i * pushFrameWidth, 0,
      pushFrameWidth, pushFrameHeight
    );
    pushAnimation.push(frame);
  }


  // 計算單一畫格的寬度並切割發射物動畫
  let toolFrameWidth = toolSheet.width / toolNumberOfFrames;
  let toolFrameHeight = toolSheet.height;
  for (let i = 0; i < toolNumberOfFrames; i++) {
    let frame = toolSheet.get(
      i * toolFrameWidth, 0, toolFrameWidth, toolFrameHeight);
    toolAnimation.push(frame);
  }


  // 計算新角色單一畫格的寬度並切割站立動畫
  let frameWidth2 = spriteSheet2.width / stopNumberOfFrames2;
  let frameHeight2 = spriteSheet2.height;
  for (let i = 0; i < stopNumberOfFrames2; i++) {
    let frame = spriteSheet2.get(i * frameWidth2, 0, frameWidth2, frameHeight2);
    stopAnimation2.push(frame);
  }


  // 計算新角色微笑動畫的畫格
  let smileFrameWidth2 = smileSheet2.width / smileNumberOfFrames2;
  let smileFrameHeight2 = smileSheet2.height;
  for (let i = 0; i < smileNumberOfFrames2; i++) {
    let frame = smileSheet2.get(i * smileFrameWidth2, 0, smileFrameWidth2, smileFrameHeight2);
    smileAnimation2.push(frame);
  }


  // 計算角色2倒下動畫的畫格
  let downFrameWidth2 = downSheet2.width / downNumberOfFrames2;
  let downFrameHeight2 = downSheet2.height;
  for (let i = 0; i < downNumberOfFrames2; i++) {
    let frame = downSheet2.get(i * downFrameWidth2, 0, downFrameWidth2, downFrameHeight2);
    downAnimation2.push(frame);
  }

  // 計算角色3單一畫格的寬度並切割站立動畫
  frameWidth3 = spriteSheet3.width / stopNumberOfFrames3;
  frameHeight3 = spriteSheet3.height;
  for (let i = 0; i < stopNumberOfFrames3; i++) {
    let frame = spriteSheet3.get(i * frameWidth3, 0, frameWidth3, frameHeight3);
    stopAnimation3.push(frame);
  }

  // 計算角色4唱歌動畫單一畫格的寬度並切割
  singFrameWidth4 = singSheet4.width / singNumberOfFrames4;
  singFrameHeight4 = singSheet4.height;
  for (let i = 0; i < singNumberOfFrames4; i++) {
    let frame = singSheet4.get(i * singFrameWidth4, 0, singFrameWidth4, singFrameHeight4);
    singAnimation4.push(frame);
  }

  // 移除舊的輸入框，避免重複
  if (nameInput) {
    nameInput.remove();
    nameInput = null;
  }

  // 計算角色4單一畫格的寬度並切割站立動畫
  frameWidth4 = spriteSheet4.width / stopNumberOfFrames4;
  frameHeight4 = spriteSheet4.height;
  for (let i = 0; i < stopNumberOfFrames4; i++) {
    let frame = spriteSheet4.get(i * frameWidth4, 0, frameWidth4, frameHeight4);
    stopAnimation4.push(frame);
  }

  // 計算角色5單一畫格的寬度並切割站立動畫
  frameWidth5 = spriteSheet5.width / stopNumberOfFrames5;
  frameHeight5 = spriteSheet5.height;
  for (let i = 0; i < stopNumberOfFrames5; i++) {
    let frame = spriteSheet5.get(i * frameWidth5, 0, frameWidth5, frameHeight5);
    stopAnimation5.push(frame);
  }

  // 計算角色5走路動畫單一畫格的寬度並切割
  walkFrameWidth5 = walkSheet5.width / walkNumberOfFrames5;
  walkFrameHeight5 = walkSheet5.height;
  for (let i = 0; i < walkNumberOfFrames5; i++) {
    let frame = walkSheet5.get(i * walkFrameWidth5, 0, walkFrameWidth5, walkFrameHeight5);
    walkAnimation5.push(frame);
  }

  // 初始化鳥群
  birds = [];
  for (let i = 0; i < 15; i++) {
    birds.push(new Bird());
  }
}

/**
 * 繪製驚嘆號圖示
 * @param {number} x X座標
 * @param {number} y Y座標
 */
function drawExclamationMark(x, y) {
  push();
  translate(x, y);
  // 浮動效果
  let bounce = sin(frameCount * 0.15) * 5;
  translate(0, bounce);
  
  // 撲通撲通跳動效果
  let beat = 1 + sin(frameCount * 0.3) * 0.2; // 讓愛心大小在 0.8 到 1.2 倍之間變化
  scale(beat);
  
  textAlign(CENTER, CENTER);
  textSize(60);
  textStyle(BOLD);
  stroke(255);
  strokeWeight(4);
  fill(255, 50, 50); // 紅色
  text("!", 0, 0);
  pop();
}

/**
 * 繪製愛心圖示
 * @param {number} x X座標
 * @param {number} y Y座標
 */
function drawHeart(x, y) {
  push();
  translate(x, y);
  // 浮動效果
  let bounce = sin(frameCount * 0.15) * 5;
  translate(0, bounce);
  
  textAlign(CENTER, CENTER);
  textSize(60);
  stroke(255);
  strokeWeight(4);
  fill(255, 50, 50); // 紅色
  text("❤", 0, 0);
  pop();
}

/**
 * 鳥類別
 */
class Bird {
  constructor() {
    this.reset();
    // 初始位置隨機分布在玩家周圍
    this.x = x + random(-width, width);
    // 給每隻鳥隨機顏色 (避免太淺看不見，限制 RGB 範圍)
    this.color = color(random(0, 150), random(0, 150), random(0, 150));
    // 滑翔狀態控制
    this.isGliding = false;
    this.timer = 0;
    this.switchTime = random(60, 120); // 初始切換時間
    this.rotation = 0; // 身體傾斜角度
  }

  reset() {
    this.y = random(50, height / 2 - 100); // 高度在天空區域
    this.size = random(0.3, 1.2); // 調整大小範圍，讓遠近更明顯
    this.speed = map(this.size, 0.3, 1.2, 2, 6); // 近的飛比較快，遠的飛比較慢 (視差效果)
    this.direction = random() > 0.5 ? 1 : -1; // 隨機方向
    this.wingSpeed = random(0.1, 0.2); // 翅膀揮動速度
  }

  update() {
    // 滑翔時速度稍微變快 (1.3倍)
    let currentSpeed = this.isGliding ? this.speed * 1.3 : this.speed;
    this.x += currentSpeed * this.direction;

    // 根據狀態調整高度：滑翔時下降，拍翅膀時上升
    if (this.isGliding) {
      this.y += 0.8; // 滑翔下降稍微快一點
      this.rotation = lerp(this.rotation, 0.1, 0.1); // 頭部微朝下 (俯衝感)
    } else {
      this.y -= 0.5;
      this.rotation = lerp(this.rotation, -0.15, 0.1); // 拍翅膀上升時頭部微朝上
    }

    // 更新滑翔/拍翅膀狀態
    this.timer++;
    if (this.timer > this.switchTime) {
      this.isGliding = !this.isGliding; // 切換狀態
      this.timer = 0;
      // 設定下一次切換時間：滑翔時間較短 (0.5-1秒)，拍翅膀時間較長 (1-2.5秒)
      this.switchTime = this.isGliding ? random(30, 60) : random(60, 150);
    }

    // 循環機制：如果鳥飛出畫面太遠（相對於玩家），則從另一側出現
    if (this.x < x - width * 1.5) {
      this.x = x + width * 1.5;
      this.y = random(50, height / 2 - 100);
    } else if (this.x > x + width * 1.5) {
      this.x = x - width * 1.5;
      this.y = random(50, height / 2 - 100);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.direction * this.size, this.size); // 根據方向和大小縮放
    rotate(this.rotation); // 應用身體傾斜
    noStroke();
    
    // 計算翅膀角度
    let wingAngle;
    if (this.isGliding) {
      wingAngle = -0.2; // 滑翔時翅膀微張固定
    } else {
      wingAngle = sin(frameCount * this.wingSpeed * 2) * 0.8; // 拍翅膀動畫幅度加大
    }

    // --- 繪製遠端的翅膀 (在身體後面) ---
    push();
    // 讓遠端翅膀稍微暗一點，增加立體感
    let c = this.color;
    fill(red(c) * 0.8, green(c) * 0.8, blue(c) * 0.8);
    translate(-5, -2);
    rotate(wingAngle * 0.7 - 0.1); // 稍微錯開角度
    beginShape();
    vertex(0, 0);
    bezierVertex(10, -10, 5, -25, -10, -20); // 翅膀形狀 (縮小)
    bezierVertex(-10, -15, -5, -5, 0, 0);
    endShape(CLOSE);
    pop();

    // --- 繪製身體 (流線型) ---
    fill(this.color);
    beginShape();
    vertex(10, 2); // 嘴巴根部
    bezierVertex(8, -5, 2, -6, -5, -5); // 頭頂到背部
    bezierVertex(-12, -4, -15, 0, -20, -2); // 背部到尾巴上緣
    vertex(-22, 2); // 尾巴尖端
    vertex(-18, 4); // 尾巴下緣
    bezierVertex(-10, 8, 0, 8, 8, 4); // 腹部
    endShape(CLOSE);

    // --- 腹部亮面 (增加立體感) ---
    fill(255, 255, 255, 40); // 半透明白色
    beginShape();
    vertex(-10, 6);
    bezierVertex(-5, 7, 0, 7, 5, 3);
    bezierVertex(0, 4, -5, 5, -10, 6);
    endShape(CLOSE);

    // --- 嘴巴 (更尖銳) ---
    fill(255, 200, 0);
    triangle(9, 0, 16, 2, 9, 4);

    // --- 眼睛 (增加神韻 + 眨眼) ---
    if (frameCount % 150 < 145) { // 大部分時間張開，偶爾眨眼
      fill(255);
      circle(6, -2, 3.5); // 眼白
      fill(0);
      circle(7, -2, 1.5); // 眼珠
    }

    // --- 繪製近端的翅膀 (在身體前面) ---
    push();
    fill(this.color); // 確保顏色正確
    translate(-5, 2);
    rotate(wingAngle);
    beginShape();
    vertex(0, 0);
    bezierVertex(12, -10, 8, -28, -8, -25); // 翅膀形狀 (縮小)
    bezierVertex(-12, -18, -6, -6, 0, 0);
    endShape(CLOSE);
    pop();

    pop();
  }
}

/**
 * 繪製記分板
 */
function drawScoreboard() {
  // 平滑插值更新顯示分數 (0.1 代表每次移動 10% 的距離，產生減速效果)
  visualScore = lerp(visualScore, score, 0.1);

  push();
  // 固定在螢幕右上角
  let boardW = 200;
  let boardH = 90; // 恢復高度
  let boardX = width - boardW - 20;
  let boardY = 20;

  // 背景
  rectMode(CORNER);
  fill(255, 255, 255, 200);
  stroke(0);
  strokeWeight(2);
  rect(boardX, boardY, boardW, boardH, 10);

  // 文字
  fill(0);
  noStroke();
  textSize(24);
  textFont('Courier New'); // 改成復古風格字體
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("得分: " + score + " / " + targetScore, boardX + 20, boardY + 30);
  
  // 進度條背景
  let barX = boardX + 20;
  let barY = boardY + 55;
  let barW = boardW - 40;
  let barH = 15;
  
  fill(220);
  rect(barX, barY, barW, barH, 10);

  // 進度條填充
  let progress = constrain(visualScore / targetScore, 0, 1);
  if (score >= targetScore) {
    fill(255, 215, 0); // 滿分時變成金色 (Gold)
  } else {
    fill(76, 175, 80); // 平常是綠色
  }
  rect(barX, barY, barW * progress, barH, 10);
  
  pop();
}

/**
 * 繪製勝利畫面
 */
function drawHealthBar() {
  push();
  // 處理抖動效果
  if (healthShakeTimer > 0) {
    // 加入衰減效果，讓震動從強變弱 (15 -> 0)，模擬物理衝擊感
    let shakeMag = map(healthShakeTimer, 0, 20, 0, 15);
    translate(random(-shakeMag, shakeMag), random(-shakeMag, shakeMag));
    healthShakeTimer--;
  }

  let barW = 300;
  let barH = 20;
  let centerX = width / 2;
  let topY = 20;

  // 背景框
  rectMode(CENTER);
  // 受傷時背景框變紅，增加視覺反饋
  if (healthShakeTimer > 0) {
    fill(255, 200, 200, 230);
    stroke(255, 50, 50);
  } else {
    fill(255, 255, 255, 200);
    stroke(0);
  }
  strokeWeight(2);
  rect(centerX, topY + 20, barW + 40, 60, 10);

  // 血量文字
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont('Courier New'); // 改成復古風格字體
  textStyle(BOLD);
  text("HP: " + playerHealth + " / " + maxHealth, centerX, topY + 10);

  // 血量條背景
  rectMode(CORNER);
  let barX = centerX - barW / 2;
  let barY = topY + 25;
  
  fill(220);
  rect(barX, barY, barW, barH, 10);

  // 血量條填充
  let hpProgress = constrain(playerHealth / maxHealth, 0, 1);
  fill(255, 50, 50); // 紅色
  rect(barX, barY, barW * hpProgress, barH, 10);

  pop();
}

function drawVictoryScreen() {
  // 繪製背景 (使用遊戲背景)
  imageMode(CORNER);
  if (bgImage) {
    image(bgImage, 0, 0, width, height);
  } else {
    background(255, 223, 186);
  }

  // 半透明遮罩
  push();
  rectMode(CORNER);
  noStroke();
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);
  pop();

  // --- 彩帶特效 ---
  if (frameCount % 5 === 0) { // 每5幀產生一個彩帶
    confetti.push(new Confetti());
  }
  for (let i = confetti.length - 1; i >= 0; i--) {
    confetti[i].update();
    confetti[i].show();
    if (confetti[i].offScreen()) {
      confetti.splice(i, 1);
    }
  }

  // --- 煙火特效 (放在遮罩上層會比較亮) ---
  if (random(1) < 0.05) { // 降低機率以維持效能，避免卡頓
    fireworks.push(new Firework());
  }
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  // 勝利文字
  push();
  translate(width / 2 + 10, height / 2 - 50);
  textAlign(CENTER, CENTER);
  
  // 文字縮放動畫
  let scaleVal = 1 + sin(frameCount * 0.1) * 0.1;
  scale(scaleVal);
  
  textSize(80);
  textStyle(BOLD);
  colorMode(HSB, 255); // 切換到 HSB 模式
  let hue = (frameCount * 5) % 255; // 隨著時間改變色相，產生彩虹閃爍效果
  fill(hue, 200, 255); // 設定高飽和度和亮度的顏色
  stroke(255);
  strokeWeight(5);
  text("恭喜獲勝！", 0, 0);
  pop();

  // 分數顯示
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  noStroke();
  text("你已經達成 " + targetScore + " 分目標！", width / 2, height / 2 + 50);

  // 重新開始按鈕
  if (!restartButton) {
    restartButton = createButton('重新開始');
    restartButton.style('font-size', '24px');
    restartButton.style('padding', '10px 24px');
    restartButton.style('border-radius', '12px');
    restartButton.style('border', '2px solid #FFD700');
    restartButton.style('background-color', '#FFD700');
    restartButton.style('color', 'black');
    restartButton.style('cursor', 'pointer');
    restartButton.style('font-weight', 'bold');

    // 滑鼠懸停效果
    restartButton.mouseOver(() => {
      restartButton.style('background-color', '#FFC107');
    });
    restartButton.mouseOut(() => {
      restartButton.style('background-color', '#FFD700');
    });

    restartButton.mousePressed(() => {
      restartButton.remove();
      restartButton = null;
      gameState = 'playing';
      startGame(); // 重置遊戲
    });
  }
  restartButton.position(width / 2 - restartButton.width / 2 - 30, height / 2 + 120);
}

/**
 * 繪製遊戲結束畫面
 */
function drawGameOverScreen() {
  // 繪製背景 (使用遊戲背景但變暗)
  imageMode(CORNER);
  if (bgImage) {
    tint(100); // 變暗
    image(bgImage, 0, 0, width, height);
    noTint();
  } else {
    background(50);
  }

  // 半透明遮罩
  push();
  rectMode(CORNER);
  noStroke();
  fill(50, 0, 0, 150); // 紅色遮罩
  rect(0, 0, width, height);
  pop();

  // 失敗文字
  push();
  translate(width / 2, height / 2 - 50);
  textAlign(CENTER, CENTER);
  
  // 文字縮放動畫 (心跳效果)
  let scaleVal = 1 + sin(frameCount * 0.1) * 0.05;
  scale(scaleVal);

  textSize(80);
  textStyle(BOLD);
  fill(255, 50, 50); // 紅色文字
  stroke(255);
  strokeWeight(5);
  text("GAME OVER", 0, 0);
  pop();

  // 重新開始按鈕
  if (!restartButton) {
    restartButton = createButton('重新挑戰');
    restartButton.style('font-size', '24px');
    restartButton.style('padding', '10px 24px');
    restartButton.style('border-radius', '12px');
    restartButton.style('border', '2px solid #f44336');
    restartButton.style('background-color', '#f44336');
    restartButton.style('color', 'white');
    restartButton.style('cursor', 'pointer');
    restartButton.style('font-weight', 'bold');

    restartButton.mouseOver(() => {
      restartButton.style('background-color', '#d32f2f');
    });
    restartButton.mouseOut(() => {
      restartButton.style('background-color', '#f44336');
    });

    restartButton.mousePressed(() => {
      restartButton.remove();
      restartButton = null;
      gameState = 'playing';
      startGame(); // 重置遊戲
    });
  }
  restartButton.position(width / 2 - restartButton.width / 2 - 30, height / 2 + 120);
}

// --- 補血道具類別 ---
class HealthItem {
  constructor(x, y) {
    this.x = x;
    this.targetY = y; // 目標高度 (地面)
    this.y = y - 600; // 從上方 600 像素處開始掉落
    this.vy = 0; // 垂直速度
    this.floatOffset = random(TWO_PI);
    this.dust = []; // 塵土粒子陣列
  }

  createDust() {
    for (let i = 0; i < 10; i++) {
      this.dust.push(new DustParticle(this.x, this.targetY));
    }
  }

  display() {
    // 掉落物理邏輯
    if (this.y < this.targetY || abs(this.vy) > 0.1) {
      this.vy += 1.5; // 重力增加，掉落變快
      this.y += this.vy;
      
      // 落地反彈
      if (this.y >= this.targetY) {
        // 如果撞擊速度夠快，產生塵土
        if (this.vy > 5) {
           this.createDust();
        }

        this.y = this.targetY;
        this.vy *= -0.3; // 反彈係數
        if (abs(this.vy) < 1) this.vy = 0; // 停止反彈
      }
    }

    // 更新並繪製塵土
    for (let i = this.dust.length - 1; i >= 0; i--) {
      this.dust[i].update();
      this.dust[i].show();
      if (this.dust[i].finished()) {
        this.dust.splice(i, 1);
      }
    }

    push();
    // 只有在停止掉落後才播放懸浮動畫
    let offsetY = (this.y >= this.targetY && abs(this.vy) < 0.1) ? sin(frameCount * 0.05 + this.floatOffset) * 5 : 0;
    translate(this.x, this.y + offsetY);
    
    // 醫藥箱外觀
    rectMode(CENTER);
    stroke(0);
    strokeWeight(2);
    fill(255);
    rect(0, 0, 40, 30, 5); // 白盒子
    
    // 紅十字
    noStroke();
    fill(255, 0, 0);
    rect(0, 0, 10, 20);
    rect(0, 0, 20, 10);
    pop();
  }
}

// --- 光環特效類別 ---
class HaloEffect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.alpha = 255;
  }

  update() {
    this.radius += 8; // 擴散速度
    this.alpha -= 8; // 淡出速度
  }

  display() {
    push();
    noFill();
    strokeWeight(5);
    stroke(50, 255, 50, this.alpha); // 亮綠色
    circle(this.x, this.y, this.radius * 2);
    
    // 內圈 (增加層次感)
    strokeWeight(3);
    stroke(150, 255, 150, this.alpha);
    circle(this.x, this.y, this.radius * 1.5);
    pop();
  }

  isFinished() {
    return this.alpha <= 0;
  }
}

// --- 塵土粒子類別 ---
class DustParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3); // 水平擴散
    this.vy = random(-1, -3); // 向上飄起
    this.alpha = 150;
    this.size = random(4, 8);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5; // 漸漸消失
    this.size *= 0.95; // 漸漸變小
  }

  show() {
    noStroke();
    fill(180, 180, 180, this.alpha); // 灰塵顏色
    circle(this.x, this.y, this.size);
  }

  finished() {
    return this.alpha < 0;
  }
}

// --- 煙火相關類別 ---

class Firework {
  constructor() {
    this.hu = random(255); // 隨機顏色 (Hue)
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
    this.type = random(['circle', 'heart', 'star']); // 隨機決定形狀
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(createVector(0, 0.2)); // 重力
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(createVector(0, 0.2));
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    if (this.type === 'heart') {
      for (let i = 0; i < 60; i++) {
        let p = new Particle(this.firework.pos.x, this.firework.pos.y, (this.hu + random(-30, 30) + 255) % 255, false);
        let a = map(i, 0, 60, 0, TWO_PI);
        let r = 0.8; // 縮放係數
        // 愛心公式
        let x = r * 16 * pow(sin(a), 3);
        let y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        p.vel = createVector(x, y);
        p.vel.mult(random(0.8, 1.5)); // 速度隨機變化
        this.particles.push(p);
      }
    } else if (this.type === 'star') {
      for (let i = 0; i < 60; i++) {
        let p = new Particle(this.firework.pos.x, this.firework.pos.y, (this.hu + random(-30, 30) + 255) % 255, false);
        // 星星形狀邏輯 (五角星)
        let points = 5; 
        let angle = TWO_PI / (points * 2);
        let segment = floor(map(i, 0, 60, 0, points * 2));
        let t = map(i % (60 / (points * 2)), 0, 60 / (points * 2), 0, 1);
        
        let a1 = segment * angle - HALF_PI;
        let a2 = (segment + 1) * angle - HALF_PI;
        
        let r1 = (segment % 2 === 0) ? 20 : 8; // 外半徑與內半徑
        let r2 = ((segment + 1) % 2 === 0) ? 20 : 8;
        
        let x1 = r1 * cos(a1);
        let y1 = r1 * sin(a1);
        let x2 = r2 * cos(a2);
        let y2 = r2 * sin(a2);
        
        let x = lerp(x1, x2, t);
        let y = lerp(y1, y2, t);
        
        p.vel = createVector(x, y);
        p.vel.mult(random(0.8, 1.5));
        this.particles.push(p);
      }
    } else {
      // 圓形 (預設)
      for (let i = 0; i < 60; i++) { 
        let p = new Particle(this.firework.pos.x, this.firework.pos.y, (this.hu + random(-30, 30) + 255) % 255, false); 
        this.particles.push(p);
      }
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}

class Particle {
  constructor(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0);
    this.history = []; // 軌跡紀錄
    if (this.firework) {
      this.vel = createVector(0, random(-18, -12)); // 發射速度更快，飛更高
    } else {
      this.vel = p5.Vector.random2D(); // 爆炸擴散
      this.vel.mult(random(2, 15)); // 調整速度範圍，配合拖尾效果
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // 紀錄軌跡
    this.history.push(createVector(this.pos.x, this.pos.y));
    if (this.history.length > 5) { // 減少拖尾長度以提升效能
      this.history.shift();
    }

    if (!this.firework) {
      this.vel.mult(0.92); // 空氣阻力 (稍微調高一點讓它飄久一點)
      this.lifespan -= 3; // 壽命遞減慢一點
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    return this.lifespan < 0;
  }

  show() {
    colorMode(HSB, 255); // 設定 HSB 範圍為 255，讓顏色更鮮豔飽和
    
    // 繪製拖尾
    strokeWeight(2);
    noFill();
    for (let i = 0; i < this.history.length - 1; i++) {
      let pos = this.history[i];
      let nextPos = this.history[i+1];
      // 拖尾漸層消失
      let alpha = this.firework ? 150 : map(i, 0, this.history.length, 0, this.lifespan);
      stroke(this.hu, 255, 255, alpha);
      line(pos.x, pos.y, nextPos.x, nextPos.y);
    }

    // 繪製粒子本體
    if (!this.firework) {
      strokeWeight(random(2, 5)); // 閃爍效果
      stroke(this.hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(6); // 發射點變大
      stroke(this.hu, 255, 255);
    }
    point(this.pos.x, this.pos.y);
    colorMode(RGB); // 切換回 RGB 模式以免影響其他繪圖
  }
}

class Confetti {
  constructor() {
    this.x = random(width);
    this.y = random(-50, -10);
    this.size = random(8, 15);
    this.color = color(random(255), random(255), random(255));
    this.speed = random(2, 5);
    this.angle = random(TWO_PI);
    this.spin = random(-0.1, 0.1);
  }

  update() {
    this.y += this.speed;
    this.x += sin(frameCount * 0.05 + this.x) * 0.5; // 左右飄動
    this.angle += this.spin;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size * 0.6); // 矩形彩帶
    pop();
  }

  offScreen() {
    return this.y > height + 20;
  }
}

/**
 * 繪製 WASD 按鍵提示
 */
function drawWASDKeys() {
  push();
  // 固定在螢幕左上角
  let baseX = 80; // S鍵的X中心
  let baseY = 80; // S鍵的Y中心
  let keySize = 40;
  let spacing = 5;
  let offset = keySize + spacing;

  textAlign(CENTER, CENTER);
  textSize(20);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);

  // W Key (S上方)
  drawKey(baseX, baseY - offset, 'W', 87);

  // A Key (S左方)
  drawKey(baseX - offset, baseY, 'A', 65);

  // S Key (中心)
  drawKey(baseX, baseY, 'S', 83);

  // D Key (S右方)
  drawKey(baseX + offset, baseY, 'D', 68);

  // Space Key (S下方)
  drawKey(baseX, baseY + offset, 'Space', 32, 130, 40);

  pop();
}

function drawKey(x, y, label, kCode, w = 40, h = 40) {
  let isPressed = keyIsDown(kCode);
  
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont('Courier New'); // 改成像素風格字體 (使用等寬字體模擬)
  textStyle(BOLD);
  strokeWeight(2);

  if (isPressed) {
    // 按下狀態：霓虹發光
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = '#00FFFF'; // 青色光暈
    
    fill(0, 255, 255); // 青色填充
    stroke(255); // 白色邊框
    rect(x, y + 2, w, h, 8); // 稍微下移模擬按壓
    
    fill(0); // 黑色文字
    textStyle(BOLD);
    noStroke();
    text(label, x, y + 2);
  } else {
    // 未按下狀態：科技感邊框
    drawingContext.shadowBlur = 0;
    
    fill(0, 0, 0, 150); // 深色半透明背景
    stroke(0, 255, 255, 150); // 青色邊框
    rect(x, y, w, h, 8);
    
    fill(0, 255, 255); // 青色文字
    noStroke();
    text(label, x, y);
  }
  pop();
}

/**
 * 繪製低血量警告特效 (畫面邊緣閃爍紅光)
 */
function drawLowHealthWarning() {
  push();
  // 呼吸燈效果，計算透明度 (0.0 ~ 0.6)
  let opacity = map(sin(frameCount * 0.15), -1, 1, 0, 0.6);
  
  let ctx = drawingContext;
  // 建立放射狀漸層，從中心向外變紅
  let gradient = ctx.createRadialGradient(
    width / 2, height / 2, height * 0.3, // 內圈半徑 (透明區域)
    width / 2, height / 2, max(width, height) * 0.8 // 外圈半徑 (紅色區域)
  );
  
  gradient.addColorStop(0, 'rgba(255, 0, 0, 0)'); // 中心透明
  gradient.addColorStop(1, `rgba(255, 0, 0, ${opacity})`); // 邊緣紅色
  
  ctx.fillStyle = gradient;
  rect(0, 0, width, height); // 覆蓋全螢幕
  pop();
}
