import fscreen from './fscreen.js';

// fscreen.fullscreenElement 返回当前正以全屏显示的元素

// 进入全屏
// 还可以这样实现全屏：fscreen.requestFullscreenFunction(document.documentElement).call(document.documentElement)
document.getElementById('btn-enterFullScreen').onclick = () => fscreen.requestFullscreen(document.documentElement);

// 退出全屏
document.getElementById('btn-exitFullScreen').onclick = () => fscreen.exitFullscreen();

// 当屏幕状态改变时（正常 <--> 全屏）
fscreen.onfullscreenchange = (event) => {

    console.log(event);

    // document.fullscreen也可以判断，返回true/false 但是这个api已废弃
    console.log(null != document.fullscreenElement ? '全屏显示哒~': '正常显示哒~');
};

// 当屏幕状态改变过程中发生异常时
fscreen.onfullscreenerror = () => {

  console.log('改变屏幕状态发生错误啦~');
};