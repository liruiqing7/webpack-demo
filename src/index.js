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
import './index.scss'

var root = document.getElementById('root');
root.innerHTML ='<div class="iconfont icon-bianji3">test</div>';

console.log('执行')