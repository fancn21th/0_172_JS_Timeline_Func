function debounce(func, interval) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;

    var later = function () {
      func.apply(context, args);
    };

    // 首先取消上一次没有进行完的操作
    clearTimeout(timeout);
    // 继续延长执行时间
    timeout = setTimeout(later, interval || 200);
  };
}

function throttle(func, interval) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = false;
    };
    if (!timeout) {
      func.apply(context, args);
      timeout = true;
      setTimeout(later, interval || 200);
    }
  };
}

export { debounce, throttle };
