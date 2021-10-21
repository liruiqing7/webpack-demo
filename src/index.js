// ----------------如何打包css文件------------------
// import avatar from './avatar.jpg';
// import style from  './index.scss';
// import creatAvatar from './creatAvatar'

// creatAvatar();

// var img = new Image();
// img.src = avatar;
// img.classList.add(style.avatar);

// var root = document.getElementById('root');
// root.append(img);

// ----------------如何打包字体------------------
// import "./index.scss";

// var root = document.getElementById("root");
// root.innerHTML = '<div class="iconfont icon-bianji3">test</div>';

// console.log("执行");

// ---------------- 热更新 ------------------
// import style from "./index.scss";
// import { number, counter } from "./counter";

// counter();
// number();

// if (module.hot) {
//   module.hot.accept("./counter", () => {
//     document.body.removeChild(document.getElementById("number"));
//     number();
//   });
// }

// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);

// btn.onclick = function () {
//   var div = document.createElement("div");
//   div.innerHTML = "item";
//   div.className = "item_style";
//   document.body.appendChild(div);
// };

// ---------------- Babel 处理 ES6 ------------------
const arr = [new Promise(() => {}), new Promise(() => {})];

arr.map((item) => {
  console.log(item);
});
