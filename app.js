"use strict";

const responseScale = [
  { text: "非常符合", weight: 2 },
  { text: "大致符合", weight: 1 },
  { text: "不太符合", weight: -1 },
  { text: "完全不符合", weight: -2 }
];

const questions = [
  { text: "身處陌生群體時，我通常會主動認識新朋友。", dimension: "EI", pole: "E" },
  { text: "經過忙碌的一天，獨處最能讓我恢復精神。", dimension: "EI", pole: "I" },
  { text: "我經常在說話的過程中逐漸理清自己的想法。", dimension: "EI", pole: "E" },
  { text: "比起熱鬧聚會，我更享受與一兩位朋友深入交談。", dimension: "EI", pole: "I" },
  { text: "參與團體活動通常會令我感到更有活力。", dimension: "EI", pole: "E" },
  { text: "社交活動過多時，我需要一段安靜時間重新調整。", dimension: "EI", pole: "I" },
  { text: "在課堂或會議中，我願意即時提出尚未成熟的看法。", dimension: "EI", pole: "E" },
  { text: "我傾向先觀察環境，熟悉情況後才投入其中。", dimension: "EI", pole: "I" },
  { text: "有值得分享的消息時，我會很快告訴身邊的人。", dimension: "EI", pole: "E" },
  { text: "長時間獨自專注工作，對我來說並不困難。", dimension: "EI", pole: "I" },

  { text: "學習新事物時，具體例子比抽象理論更能幫助我。", dimension: "SN", pole: "S" },
  { text: "我常會想像一件事情未來可能發展成甚麼模樣。", dimension: "SN", pole: "N" },
  { text: "我容易注意到環境中微小但實際的變化。", dimension: "SN", pole: "S" },
  { text: "我喜歡探討概念之間隱藏的關係和意義。", dimension: "SN", pole: "N" },
  { text: "收到清晰、逐步的指示會令我更安心。", dimension: "SN", pole: "S" },
  { text: "面對問題時，我經常想到別人尚未提出的可能性。", dimension: "SN", pole: "N" },
  { text: "我較信任經過實踐證明有效的方法。", dimension: "SN", pole: "S" },
  { text: "零散資料出現時，我會自然地尋找背後的整體模式。", dimension: "SN", pole: "N" },
  { text: "描述一段經歷時，我通常能記得不少具體細節。", dimension: "SN", pole: "S" },
  { text: "我享受跳出現有框架，構思與眾不同的做法。", dimension: "SN", pole: "N" },

  { text: "作出重要決定時，我首先比較各個選項的利弊。", dimension: "TF", pole: "T" },
  { text: "即使某方案最有效率，我仍會考慮它對他人感受的影響。", dimension: "TF", pole: "F" },
  { text: "指出問題時，我認為清楚直接比委婉更重要。", dimension: "TF", pole: "T" },
  { text: "團隊出現分歧時，我會先設法維持彼此的關係。", dimension: "TF", pole: "F" },
  { text: "討論爭議時，客觀證據最能改變我的看法。", dimension: "TF", pole: "T" },
  { text: "朋友遇到困難時，我通常先理解和回應他的感受。", dimension: "TF", pole: "F" },
  { text: "我認為公平意味着對所有人採用一致的原則。", dimension: "TF", pole: "T" },
  { text: "我的個人價值觀會明顯影響我作出的選擇。", dimension: "TF", pole: "F" },
  { text: "即使真相令人不舒服，我仍傾向坦率說明事實。", dimension: "TF", pole: "T" },
  { text: "看到別人情緒低落時，我很容易受到感染。", dimension: "TF", pole: "F" },

  { text: "開始一項工作前，我喜歡先列出計劃和完成時間。", dimension: "JP", pole: "J" },
  { text: "突然出現的新選擇，往往令我比原定計劃更感興趣。", dimension: "JP", pole: "P" },
  { text: "我通常會在限期前預留充足時間完成工作。", dimension: "JP", pole: "J" },
  { text: "保留彈性、按情況調整，比預先決定一切更適合我。", dimension: "JP", pole: "P" },
  { text: "有清晰的日程和整齊的工作環境會令我更專注。", dimension: "JP", pole: "J" },
  { text: "只要仍有時間，我喜歡保持多個選項開放。", dimension: "JP", pole: "P" },
  { text: "一件事情懸而未決時，我會希望盡快作出決定。", dimension: "JP", pole: "J" },
  { text: "原定安排臨時改變時，我通常能輕鬆順應。", dimension: "JP", pole: "P" },
  { text: "逐項完成待辦清單會帶給我很大的滿足感。", dimension: "JP", pole: "J" },
  { text: "沒有預先安排的空閒時間，常會帶給我驚喜。", dimension: "JP", pole: "P" }
];

const personalityProfiles = {
  ISTJ: ["穩健執行者", "你重視責任、秩序和可靠性，擅長把複雜任務拆成清晰步驟，並耐心地完成承諾。"],
  ISFJ: ["細心守護者", "你溫和而實際，善於留意他人需要，並以穩定、體貼的行動為身邊的人提供支持。"],
  INFJ: ["理想引導者", "你重視意義與價值，對人的想法十分敏銳，常以長遠眼光推動有深度的改變。"],
  INTJ: ["策略規劃者", "你獨立而有遠見，喜歡分析複雜系統，並為重要目標設計周密而有效的長期方案。"],
  ISTP: ["靈活實踐者", "你冷靜、好奇而務實，擅長理解事物如何運作，並在變化中迅速找出可行方法。"],
  ISFP: ["溫柔探索者", "你重視真誠、自由和個人感受，對身邊細節敏銳，習慣以實際行動表達關懷。"],
  INFP: ["真誠夢想家", "你富有想像力和同理心，重視內在價值，願意透過創意和堅持讓理想逐步成真。"],
  INTP: ["邏輯探索者", "你喜歡追問原理和分析概念，享受自由思考，並不斷尋找更準確、更完整的解釋。"],
  ESTP: ["行動挑戰者", "你精力充沛、反應敏捷，能敏銳掌握眼前機會，並在實際行動中解決問題。"],
  ESFP: ["熱情體驗者", "你開朗而親切，享受與人分享當下，善於回應周遭需要並為環境帶來活力。"],
  ENFP: ["創意啟發者", "你熱情、好奇而富想像力，擅長看見人和事情的可能性，並以真誠感染身邊的人。"],
  ENTP: ["機智發明家", "你喜歡挑戰既有想法，擅長連結不同概念，在辯證和探索中發現創新的方法。"],
  ESTJ: ["果斷組織者", "你講求效率、責任和清晰標準，善於整合資源，帶領團隊有系統地達成目標。"],
  ESFJ: ["友善協調者", "你重視合作與歸屬感，樂於照顧他人，並以細心和可靠的方式建立和諧關係。"],
  ENFJ: ["熱誠凝聚者", "你善於理解和鼓勵他人，重視共同成長，能以清晰願景把不同的人連結起來。"],
  ENTJ: ["遠見領航者", "你目標清晰、決策果斷，擅長建立策略、推動進度，並鼓勵團隊突破限制。"]
};

const dimensions = {
  EI: { first: "E", firstLabel: "外向", second: "I", secondLabel: "內向", section: "能量取向" },
  SN: { first: "S", firstLabel: "實感", second: "N", secondLabel: "直覺", section: "資訊認知" },
  TF: { first: "T", firstLabel: "思考", second: "F", secondLabel: "情感", section: "決策方式" },
  JP: { first: "J", firstLabel: "判斷", second: "P", secondLabel: "感知", section: "生活方式" }
};

const screens = {
  start: document.querySelector("#start-screen"),
  quiz: document.querySelector("#quiz-screen"),
  result: document.querySelector("#result-screen")
};
const questionText = document.querySelector("#question-text");
const questionCounter = document.querySelector("#question-counter");
const sectionLabel = document.querySelector("#section-label");
const largeQuestionNumber = document.querySelector("#large-question-number");
const answerList = document.querySelector("#answer-list");
const progressBar = document.querySelector("#progress-bar");
const progressTrack = document.querySelector(".progress-track");
const backButton = document.querySelector("#back-button");

let currentQuestion = 0;
let responses = [];

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => {
    element.hidden = key !== name;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  currentQuestion = 0;
  responses = [];
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const dimension = dimensions[question.dimension];
  questionText.textContent = question.text;
  questionCounter.textContent = `${currentQuestion + 1} / ${questions.length}`;
  largeQuestionNumber.textContent = String(currentQuestion + 1).padStart(2, "0");
  sectionLabel.textContent = dimension.section;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", String(currentQuestion + 1));
  backButton.disabled = currentQuestion === 0;
  answerList.replaceChildren();

  responseScale.forEach((response, index) => {
    const button = document.createElement("button");
    const letter = document.createElement("span");
    const label = document.createElement("span");
    button.type = "button";
    button.className = "answer-button";
    letter.className = "answer-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);
    label.textContent = response.text;
    button.append(letter, label);
    button.addEventListener("click", () => chooseAnswer(response.weight));
    answerList.append(button);
  });

  questionText.focus({ preventScroll: true });
}

function chooseAnswer(weight) {
  responses[currentQuestion] = weight;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (currentQuestion === 0) return;
  currentQuestion -= 1;
  responses.length = currentQuestion;
  renderQuestion();
}

function calculateScores() {
  const scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
  responses.forEach((weight, index) => {
    const question = questions[index];
    const dimension = dimensions[question.dimension];
    const direction = question.pole === dimension.first ? 1 : -1;
    scores[question.dimension] += weight * direction;
  });
  return scores;
}

function calculateType(scores) {
  return Object.keys(dimensions).map((key) => {
    const dimension = dimensions[key];
    return scores[key] >= 0 ? dimension.first : dimension.second;
  }).join("");
}

function createDimensionRow(key, score) {
  const dimension = dimensions[key];
  const firstPercent = Math.round(((score + 20) / 40) * 100);
  const secondPercent = 100 - firstPercent;
  const chosenFirst = score >= 0;

  const row = document.createElement("div");
  row.className = "dimension-row";

  const copy = document.createElement("div");
  copy.className = "dimension-copy";

  const firstSide = document.createElement("div");
  firstSide.className = `dimension-side${chosenFirst ? " active" : ""}`;
  const firstLetter = document.createElement("strong");
  const firstText = document.createElement("span");
  firstLetter.textContent = `${dimension.first} ${firstPercent}%`;
  firstText.textContent = dimension.firstLabel;
  firstSide.append(firstLetter, firstText);

  const secondSide = document.createElement("div");
  secondSide.className = `dimension-side${chosenFirst ? "" : " active"}`;
  const secondLetter = document.createElement("strong");
  const secondText = document.createElement("span");
  secondLetter.textContent = `${dimension.second} ${secondPercent}%`;
  secondText.textContent = dimension.secondLabel;
  secondSide.append(secondLetter, secondText);
  copy.append(firstSide, secondSide);

  const bar = document.createElement("div");
  bar.className = "dimension-bar";
  bar.setAttribute("aria-label", `${dimension.firstLabel} ${firstPercent}%，${dimension.secondLabel} ${secondPercent}%`);
  const fill = document.createElement("div");
  fill.className = "dimension-fill";
  fill.style.width = `${firstPercent}%`;
  const marker = document.createElement("span");
  marker.className = "dimension-marker";
  marker.style.left = `${firstPercent}%`;
  bar.append(fill, marker);

  row.append(copy, bar);
  return row;
}

function showResult() {
  const scores = calculateScores();
  const type = calculateType(scores);
  const [name, description] = personalityProfiles[type];
  document.querySelector("#result-type").textContent = type;
  document.querySelector("#result-name").textContent = name;
  document.querySelector("#result-description").textContent = description;

  const dimensionResults = document.querySelector("#dimension-results");
  const rows = Object.keys(dimensions).map((key) => createDimensionRow(key, scores[key]));
  dimensionResults.replaceChildren(...rows);
  showScreen("result");
}

document.querySelector("#start-button").addEventListener("click", startQuiz);
document.querySelector("#restart-button").addEventListener("click", startQuiz);
document.querySelector("#home-button").addEventListener("click", () => showScreen("start"));
backButton.addEventListener("click", goBack);
