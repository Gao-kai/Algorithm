/**
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @param {number} total 总共生成的随机数个数
 * @return {Array} randomNums 随机数数组
 */
function getRandomNum(min=1, max=100, total = 5) {
  let randomNums = [];
  for (var i = 0; i < total; i++) {
    let value = Math.floor(Math.random() * (max - min +1)) + min;
    randomNums.push(value);
  }
  return randomNums;
}

let testCase = getRandomNum();
console.log('testCase',testCase);


