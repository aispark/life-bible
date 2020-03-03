// const krv = [
//   "창(1:1) 태초에 하나님이 천지를 창조하시니라",
//   "창(1:2) 땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 신은 수면에 운행하시니라",
//   "창(1:3) 하나님이 가라사대 빛이 있으라 하시매 빛이 있었고",
//   "창(1:4) 그 빛이 하나님의 보시기에 좋았더라 하나님이 빛과 어두움을 나누사",
//   "창(1:5) 빛을 낮이라 칭하시고 어두움을 밤이라 칭하시니라 저녁이 되며 아침이 되니 이는 첫째 날이니라",
//   "창(1:6) 하나님이 가라사대 물 가운데 궁창이 있어 물과 물로 나뉘게 하리라 하시고",
//   "창(2:1) 그 빛이 하나님의 보시기에 좋았더라 하나님이 빛과 어두움을 나누사",
//   "창(2:2) 빛을 낮이라 칭하시고 어두움을 밤이라 칭하시니라 저녁이 되며 아침이 되니 이는 첫째 날이니라",
//   "창(2:3) 하나님이 가라사대 물 가운데 궁창이 있어 물과 물로 나뉘게 하리라 하시고",
//   "창(3:1) 그 빛이 하나님의 보시기에 좋았더라 하나님이 빛과 어두움을 나누사",
//   "창(3:2) 빛을 낮이라 칭하시고 어두움을 밤이라 칭하시니라 저녁이 되며 아침이 되니 이는 첫째 날이니라",
//   "창(3:3) 하나님이 가라사대 물 가운데 궁창이 있어 물과 물로 나뉘게 하리라 하시고",
//   "출(1:2) 르우벤과 시므온과 레위와 유다와",
//   "출(1:3) 잇사갈과 스불론과 베냐민과",
//   "출(1:4) 단과 납달리와 갓과 아셀이요",
//   "출(1:5) 이미 애굽에 있는 요셉까지 야곱의 혈속이 모두 칠십 인이었더라",
//   "출(2:1) 잇사갈과 스불론과 베냐민과",
//   "출(2:2) 단과 납달리와 갓과 아셀이요",
//   "출(2:3) 이미 애굽에 있는 요셉까지 야곱의 혈속이 모두 칠십 인이었더라",
//   "레(1:1) 여호와께서 회막에서 모세를 부르시고 그에게 일러 가라사대",
//   "레(1:2) 이스라엘 자손에게 고하여 이르라 너희 중에 누구든지 여호와께 예물을 드리려거든 생축 중에서 소나 양으로 예물을 드릴지니라",
//   "레(1:3) 그 예물이 소의 번제이면 흠 없는 수컷으로 회막문에서 여호와 앞에 열납하시도록 드릴지니라",
//   "레(2:1) 그가 번제물의 머리에 안수할지니 그리하면 열납되어 그를 위하여 속죄가 될 것이라",
//   "레(2:2) 그는 여호와 앞에서 그 수송아지를 잡을 것이요 아론의 자손 제사장들은 그 피를 가져다가 회막문 앞 단 사면에 뿌릴 것이며",
//   "레(2:3) 그는 또 그 번제 희생의 가죽을 벗기고 각을 뜰 것이요"
// ];
const krv = require("./krv.js");

// const result = krv.reduce((preItem, item, index) => {
//   const category = item.substring(0, item.indexOf("(")).trim();
//   const chapter = item
//     .substring(item.indexOf("("), item.indexOf(")") + 1)
//     .trim();

//   if (preItem.length !== 0) {
//     if (preItem[preItem.length - 1]["category"] !== category) {
//       preItem[preItem.length - 1]["endIndex"] = index - 1;
//       preItem.push({ category: category, startIndex: index });
//     }
//   } else {
//     preItem.push({ category: "창", startIndex: 0 });
//   }

//   return preItem;
// }, []);

const result2 = krv.reduce((preItem, item, index) => {
  const category = item.substring(0, item.indexOf("(")).trim();
  const chapter = item
    .substring(item.indexOf("(") + 1, item.indexOf(":"))
    .trim();

  // if (preItem.length !== 0) {
  //메인카테고리가 같은 경우
  if (preItem.hasOwnProperty(category)) {
    let paragraph = preItem[category];

    if (paragraph.length == chapter)
      paragraph[paragraph.length - 1]["end"] = index;
    else paragraph.push({ start: index });

    // console.log(
    //   "paragraph chapter",
    //   paragraph[paragraph.length - 2]["chapter"]
    // );

    //메인카테고리 다른 경우
  } else {
    preItem[category] = [{ start: index }];
  }

  return preItem;
}, {});

result2["시"].forEach(item => console.log(item, ","));
// console.log(result2[0]["창"]);
// console.log(result2[0]["창"]);
// console.log(result2[0]["창"][0].end);
