"use strict";

const questions = [
  { text: "在一個新群體中，你通常會……", dimension: "EI", answers: [{ text: "主動找人交談，從互動中投入狀態", value: "E" }, { text: "先觀察環境，熟悉後才慢慢參與", value: "I" }] },
  { text: "經過忙碌的一週，你較想怎樣恢復精神？", dimension: "EI", answers: [{ text: "約朋友見面，一起進行活動", value: "E" }, { text: "留一段私人時間，安靜做喜歡的事", value: "I" }] },
  { text: "討論一個想法時，你較習慣……", dimension: "EI", answers: [{ text: "邊說邊整理思路", value: "E" }, { text: "想清楚後才表達", value: "I" }] },
  { text: "在聚會中，你較常出現哪種情況？", dimension: "EI", answers: [{ text: "認識不少新朋友，談話範圍廣", value: "E" }, { text: "集中與幾個熟悉的人深入交談", value: "I" }] },

  { text: "學習新事物時，哪種方式對你較有效？", dimension: "SN", answers: [{ text: "先看具體例子，再掌握方法", value: "S" }, { text: "先理解整體概念，再探索可能性", value: "N" }] },
  { text: "閱讀故事時，你較容易留意……", dimension: "SN", answers: [{ text: "事件細節和實際發生的事情", value: "S" }, { text: "象徵意義和故事背後的想法", value: "N" }] },
  { text: "計劃一個專案時，你通常先考慮……", dimension: "SN", answers: [{ text: "現有資源和可行步驟", value: "S" }, { text: "長遠方向和創新做法", value: "N" }] },
  { text: "別人向你說明事情時，你較喜歡……", dimension: "SN", answers: [{ text: "內容明確、具體，而且有實例", value: "S" }, { text: "抓住重點，讓你自行聯想和延伸", value: "N" }] },

  { text: "朋友遇到難題時，你的第一反應通常是……", dimension: "TF", answers: [{ text: "分析原因，協助找出解決方法", value: "T" }, { text: "了解感受，先給予支持和安慰", value: "F" }] },
  { text: "作出重要決定時，你較重視……", dimension: "TF", answers: [{ text: "原則一致和客觀理據", value: "T" }, { text: "相關人士的需要和感受", value: "F" }] },
  { text: "團隊意見不一時，你較傾向……", dimension: "TF", answers: [{ text: "直接比較各方案的利弊", value: "T" }, { text: "先維持關係，再尋找大家接受的方案", value: "F" }] },
  { text: "收到意見時，哪一種較能說服你？", dimension: "TF", answers: [{ text: "論證清楚，有數據或事實支持", value: "T" }, { text: "出發點真誠，並顧及實際感受", value: "F" }] },

  { text: "面對一個月後的旅程，你通常會……", dimension: "JP", answers: [{ text: "提早安排交通、行程和所需物品", value: "J" }, { text: "保留彈性，到時按情況決定", value: "P" }] },
  { text: "處理工作或功課時，你較常……", dimension: "JP", answers: [{ text: "按計劃逐項完成，做完才放心", value: "J" }, { text: "視乎當刻狀態，在不同項目之間切換", value: "P" }] },
  { text: "突然出現空閒時間時，你較喜歡……", dimension: "JP", answers: [{ text: "安排一件早已想做的事", value: "J" }, { text: "即時看看有甚麼有趣選擇", value: "P" }] },
  { text: "當原定計劃臨時改變，你通常會……", dimension: "JP", answers: [{ text: "希望盡快定下新的安排", value: "J" }, { text: "順應變化，邊走邊調整", value: "P" }] }
];

const personalityProfiles = {
  ISTJ: ["穩健執行者", "重視責任、秩序和可靠性，擅長按清晰步驟把事情妥善完成。"],
  ISFJ: ["細心守護者", "溫和而實際，善於留意他人需要，並以耐心行動提供支持。"],
  INFJ: ["理想引導者", "重視意義與價值，善於理解人心，常以長遠眼光推動改變。"],
  INTJ: ["策略規劃者", "獨立而有遠見，喜歡分析複雜問題，並設計有效的長期方案。"],
  ISTP: ["靈活實踐者", "冷靜、好奇而務實，擅長觀察運作方式和即場解決問題。"],
  ISFP: ["溫柔探索者", "重視真誠與自由，對身邊細節敏銳，並以行動表達關懷。"],
  INFP: ["真誠夢想家", "富有想像力和同理心，重視內在價值，願意為理想持續努力。"],
  INTP: ["邏輯探索者", "喜歡追問原理、分析概念，享受自由思考和發現新的解釋。"],
  ESTP: ["行動挑戰者", "精力充沛、反應敏捷，喜歡直接投入情境並把握眼前機會。"],
  ESFP: ["熱情體驗者", "開朗而親切，享受與人分享當下，也善於為環境帶來活力。"],
  ENFP: ["創意啟發者", "熱情、好奇而富想像力，善於看見可能性並鼓舞身邊的人。"],
  ENTP: ["機智發明家", "喜歡挑戰既有想法，擅長連結不同概念和探索創新方法。"],
  ESTJ: ["果斷組織者", "講求效率和清晰規則，善於整合資源並帶領團隊達成目標。"],
  ESFJ: ["友善協調者", "重視合作與歸屬感，樂於照顧他人並營造和諧的氣氛。"],
  ENFJ: ["熱誠凝聚者", "善於理解和鼓勵他人，重視共同成長，能把人連結起來。"],
  ENTJ: ["遠見領航者", "目標清晰、決策果斷，擅長建立策略並推動團隊向前。"]
};

const dimensionLabels = { E: "外向", I: "內向", S: "實感", N: "直覺", T: "思考", F: "情感", J: "判斷", P: "感知" };
const screens = { start: document.querySelector("#start-screen"), quiz: document.querySelector("#quiz-screen"), result: document.querySelector("#result-screen") };
const questionText = document.querySelector("#question-text");
const questionCounter = document.querySelector("#question-counter");
const answerList = document.querySelector("#answer-list");
const progressBar = document.querySelector("#progress-bar");
const progressTrack = document.querySelector(".progress-track");
const backButton = document.querySelector("#back-button");

let currentQuestion = 0;
let responses = [];

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => { element.hidden = key !== name; });
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
  questionText.textContent = question.text;
  questionCounter.textContent = `${currentQuestion + 1} / ${questions.length}`;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", String(currentQuestion + 1));
  backButton.disabled = currentQuestion === 0;
  answerList.replaceChildren();

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.innerHTML = `<span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span>${answer.text}</span>`;
    button.addEventListener("click", () => chooseAnswer(answer.value));
    answerList.append(button);
  });
  questionText.focus({ preventScroll: true });
}

function chooseAnswer(value) {
  responses[currentQuestion] = value;
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

function calculateType() {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  responses.forEach((value) => { scores[value] += 1; });
  return [scores.E >= scores.I ? "E" : "I", scores.S >= scores.N ? "S" : "N", scores.T >= scores.F ? "T" : "F", scores.J >= scores.P ? "J" : "P"].join("");
}

function showResult() {
  const type = calculateType();
  const [name, description] = personalityProfiles[type];
  document.querySelector("#result-type").textContent = type;
  document.querySelector("#result-name").textContent = name;
  document.querySelector("#result-description").textContent = description;
  const dimensionResults = document.querySelector("#dimension-results");
  dimensionResults.replaceChildren(...type.split("").map((letter) => {
    const item = document.createElement("div");
    item.className = "dimension-chip";
    item.innerHTML = `<strong>${letter}</strong><span>${dimensionLabels[letter]}</span>`;
    return item;
  }));
  showScreen("result");
}

document.querySelector("#start-button").addEventListener("click", startQuiz);
document.querySelector("#restart-button").addEventListener("click", startQuiz);
document.querySelector("#home-button").addEventListener("click", () => showScreen("start"));
backButton.addEventListener("click", goBack);
