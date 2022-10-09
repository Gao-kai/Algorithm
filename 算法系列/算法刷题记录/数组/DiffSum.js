/* 
前缀和数组的适用场景：
1. 原始数组不会被修改的情况下
2. 频繁查询某个区间的累加和

差分数组的适用场景：
1. 频繁的对原数组的不同区间进行频繁的加减运算（减法可以理解为+负数）
当然可以采用for循环的方式实现，但是问题在于这样子的时间复杂度是O(N)
并且需要多次调用for循环去实现
而采用差分数组可以将这类操作的时间复杂度降到1
*/
//   [5,7,15] n个数字有n-1个差 最前面假设减去的是虚拟的0
//   [5,2,8]

class DiffSum {
  constructor(nums) {
    this.nums = nums;
  }

  // 根据原始数组 => 构建差分数组
  createDiffSum() {
    this.diffSum = new Array(nums.length);
    this.diffSum[0] = this.nums[0];
    for (let i = 1; i < this.diffSum.length; i++) {
      this.diffSum[i] = this.nums[i] - this.nums[i - 1];
    }
    console.log("this.diffSum", this.diffSum);
  }

  // 对原数组的[left,right]区间进行加减value运算
  increment(left, right, value) {
    // 给[left - this.diffSum.length-1]区间的每一个值都+value
    this.diffSum[left] += value;
    if (right + 1 < this.diffSum.length) {
      // 给[right+1 - this.diffSum.length-1]区间的每一个值都-value
      this.diffSum[right + 1] -= value;
    }
  }

  // 根据差分数组 => 还原原始数组
  createOriginSum() {
    this.nums = new Array(this.diffSum.length);
    this.nums[0] = this.diffSum[0];
    for (let i = 1; i < this.nums.length; i++) {
      this.nums[i] = this.diffSum[i] + this.nums[i - 1];
    }
  }
}

/* 
航班总共有n个.[]长度为n，从索引1开始编号
bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5

bookings.length = 5 [,,,,,]
bookings[i]中的值代表了对数组区间的操作

返回answer，里面的元素是每个航班预定的座位数字
*/
var corpFlightBookings = function (bookings, n) {
    // 初始化航班原始数组 长度为n 一开始每个航班的预定人数都为0
    let answer = new Array(n).fill(0);

    // 为了方便频繁对航班区间增减 构建差分数组
    let diffSum = new Array(n).fill(0);

    // 遍历航班预定表 开始依次为不同的航班执行预定
    for (let booking of bookings) {
        let [left, right, value] = booking;
        // 操作差分数组
        diffSum[left-1] += value;
        if (right + 1 < n) {
            diffSum[right] -= value;
        }
    }

    // 全部操作完成之后根据差分数组构建原数组
    answer[0] = diffSum[0];
    for (let i = 1; i < diffSum.length; i++) {
        answer[i] = diffSum[i] + answer[i-1];
    }

    return answer;
};
console.log(corpFlightBookings([[1,2,10],[2,3,20],[2,5,25]],5));

