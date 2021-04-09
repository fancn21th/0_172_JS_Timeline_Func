// import { debounce, throttle } from "./timeline";
const _ = require("lodash");

const createTimeSpan = (parent, count) => {
  const arr = Array.from(Array(count).keys());
  arr.forEach((idx) => {
    const textNode = document.createTextNode(idx + 1);
    const liNode = document.createElement("li");
    liNode.id = `timespan${idx + 1}`;
    liNode.appendChild(textNode);
    parent.appendChild(liNode);
  });
};

const highlightTimeSpanByIdx = (idx) => {
  const timespanNode = document.getElementById(`timespan${idx}`);
  timespanNode.classList.add("active");
};

window.onload = function () {
  const timeline = document.getElementById("timeline");
  const timeline_length = 20;

  // 创建 timeline
  createTimeSpan(timeline, timeline_length);

  const start = Date.now();
  let funcCount = 1;
  let intervalCount = 1;

  const counting = () => {
    console.log("方法被调用", funcCount++);
    const elapsed = Math.round((Date.now() - start) / 1000);
    const index = elapsed + 1;
    // console.log("elapsed", elapsed, "seconds");
    console.log("方法被调用在第", index, "秒");
    highlightTimeSpanByIdx(index);
    if (index === timeline_length) {
      console.log("counting done");
      clearInterval(interval);
    }
  };

  // const deb = debounce(counting, 1000);
  const deb = _.debounce(counting, 1000, { leading: true, trailing: true });

  // deb();
  // deb();
  // deb();
  // deb();

  // const thro = throttle(counting, 2000);

  let interval = setInterval(() => {
    console.log("interval被调用", intervalCount++, "次");
    deb();
  }, 2000);
};
