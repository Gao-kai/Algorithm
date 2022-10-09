/*
    辛苦学习3个月
    3重保障过考试

    考试过了之后的算法题准备
    考试过了之后的JS知识准备

    1. 带权重的随机选择算法
    2. 田忌赛马背后的算法决策
*/

/**
 * 返回一个[a,b]区间的整数，返回的数值包含a和b
 * @param {Number} a 任意传入的数值a
 * @param {Number} b 任意传入的数值b
 * 注：需要统一使用Math.floor()方法向下取整
 * 注：Math.random() 得到一个[0,1)的数字
 */
function getRangeRandomNumber(a, b) {
  let min = Math.min(a, b);
  let max = Math.max(a, b);

  // 如果不包含max就是max-min即可 因为向下取整永远取不到max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* 
     1.从一个为n的数组中以相同的概率选出一个数字，每个数字的权重相同，这个很简单getRangeRandomNumber(0,n-1)
     2.但是如果数组中元素的权重不同，权重高的选中的几率大，权重低的选中的几率小

     let arr = [5,8,2,10,15];
     arr[0] = 5 代表第0个索引的权重是5，选择索引0的概率是 arr[0] / sum[arr] = 5 / 40 = 0.125
     arr[1] = 8 代表第1个索引的权重是8，选择索引1的概率是 arr[1] / sum[arr] = 8 / 40 = 0.2
     ...

     按照普通的设置，每个值的概率都是1/5 = 20%
     经过算法的设计，我们打进去一个数组之后，每次调用选择算法 选中每个数的几率就不一样了 不是相同的20%

     给定一个数组arr = [1,3,2,1] 0 1 2 3
                    [0,1,4,6,7]
                     - --- -- -
     设计一个函数，可以随机的从数组中选中并返回一个下标，选中的这个下标的概率是arr[i] / sum(arr)
    0 1/7
    1 3/7
    2 2/7
    3 1/7

    [3,4,5,8]
    0-2 区间的2个值 反射到值2索引0 上 概率就是 2 / 19
    2-6 区间的4个值 反射到值4索引1 上 概率就是 4 / 19
    6-11 区间的5个值 反射到值5索引2 上 概率就是 5 / 19
    11-19 区间的8个值 反射到值8索引3 上 概率就是 8 / 19

    就符合题意了
    罪直观的就是分线段丢石头

    [0, 2, 6, 11, 19]
*/

/**
 * @param {number[]} w
 */
var Solution = function (w) {
  // 构建数组前缀和
  this.preSum = new Array(w.length + 1);
  this.preSum[0] = 0;

  for (let i = 1; i < this.preSum.length; i++) {
    this.preSum[i] = this.preSum[i - 1] + w[i - 1];
  }
  console.log("this.preSum", this.preSum);
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  // 问题就转化为：在前缀和数组中随机选出一个值randomValue 这个值保证是小于前缀和数组最大值的

  let randomValue = getRangeRandomNumber(
    1,
    this.preSum[this.preSum.length - 1]
  );
  // let randomValue = this.preSum[randomIndex];
  console.log("randomValue", randomValue);

  // 然后求数组中大于等于randomValue的最小元素索引  就是最靠近randomValue的右边哪一个
  let i = searchIndexLeft(this.preSum, randomValue);
  console.log("i", i);

  return i - 1;
};

/* 
    新问题：如果从数组中二分查找一个数，这个数没有存在，那么求这个数应该插入的索引Index
    问题：快速从数组中寻找出来大于等于一个数的最小元素索引
        [1,2,3] 找大于等于3的最小元素索引 2
                找大于等于4的最小元素索引 -1 如果有 也应该是 3 

        直接找到了等于的，那么返回

1、返回的这个值是 nums 中大于等于 target 的最小元素索引。
2、返回的这个值是 target 应该插入在 nums 中的索引位置。找索引来了
3、返回的这个值是 nums 中小于 target 的元素个数。

*/

function searchIndexLeft(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (arr[mid] == target) {
      right = mid - 1;
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    }
  }

//   console.log("index", left);

//   if (arr[left] == target) {
//     console.log("存在这个值", left);
//   } else {
//     console.log("不存在这个值", left);
//   }

  return left;
}
/**
 * 
1、返回的这个值是 nums 中小于等于 target 的最大元素索引。
2、返回的这个值是 target 应该插入在 nums 中的索引位置 arr.length - index
3、返回的这个值是 nums 中大于 target 的元素个数。
 */
function searchIndexRight(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (arr[mid] == target) {
      left = mid + 1;
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    }
  }

  console.log("index", right);

  if (arr[right] == target) {
    console.log("存在这个值", right);
  } else {
    console.log("不存在这个值", right);
  }
}

// let test1 = [2,3,6,8,10];
// let t = 11;

// searchIndexLeft(test1,t); // 5

let s = new Solution([1]);
s.pickIndex();
// let map = {};
// for (let i = 0; i < 10000; i++) {
//   let index = s.pickIndex();
//   map[index] ? map[index]++ : (map[index] = 1);
// }
// console.log(map);

/* 0 2 4 6 8 */