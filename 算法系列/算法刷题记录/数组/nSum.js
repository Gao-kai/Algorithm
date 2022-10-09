/* 两数之和 数组模拟优先级队列思路 */
var twoSum = function (nums, target) {
  let numpriorityQuene = [];
  for (let i = 0; i < nums.length; i++) {
    let item = {
      value: nums[i],
      index: i,
    };
    numpriorityQuene.push(item);
  }
  console.log(numpriorityQuene);
  numpriorityQuene.sort((a, b) => a.value - b.value);

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let leftItem = numpriorityQuene[left];
    let rightItem = numpriorityQuene[right];
    let sum = leftItem.value + rightItem.value;

    if (sum == target) {
      return [leftItem.index, rightItem.index];
    } else if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    }
  }

  return [];
};

/* 两数之和 非排序数组 target - curr = diff套路 */
let nums = [3, 2, 4],
  target = 6;
// console.log(twoSum(nums,target));

var twoSum1 = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    let diff = target - curr;
    if (map.has(diff)) {
      return [map.get(diff), i];
    } else {
      map.set(curr, i);
    }
  }
};
// console.log(twoSum1(nums,target)

/* 
    三数之和
    target - 固定的一个数 = diff
    求数组剩余的元素中数组之和为diff的两个元素索引

    1. 题目要求可以返回值 那么就代表可以排序 
    2. 返回的结果要去重
    3. 三数之和 = 当前项curr + 除当前项之外的所有数组中找和为target-curr的元素对
    4. 最关键的第一步：必须要在当前项的curr之后的所有剩余元素中查找，这样子避免查出来的结果还包含自己
    5. 最关键的第二步：nums数组中当前项和下一项的currNum相同，此时要跳过，因为一样的值返回的结果一定是相同的
*/

var ThreeSum = function (nums, target, start) {
  let res = [];
  nums = nums.sort((a, b) => a - b);
  for (let i = start; i < nums.length; i++) {
    const currNum = nums[i];
    let diff = target - currNum;
    //  最关键的第一步：接下来的任务就是从数组nums中i + 1开始找到所有和为twoSum的元素对
    let twoSumList = TwoSum(nums, diff, i + 1);

    // 将数组返回的结果进行解构并赋值
    for (let twoSum of twoSumList) {
      res.push([currNum, ...twoSum]);
    }

    // 如果下一个元素的值和curr一样 就没必要重复计算了 因为结果肯定一样
    while (i < nums.length - 1 && currNum == nums[i + 1]) {
      // 这里和两数之和的地方不一样 这里for循环无论如何保底有1次i++,所以这里的i++必须得满足当前项==下一项
      // 并且i应该小于nums.length-1，这是因为如果小于length，后面nums[i+1]取值可能超出边界
      i++;
    }
  }
  return res;
};
ThreeSum([-2, -2, -1, 0, 1, 2, 2, 3, 4], 5, 0);

// 求从nums数组的start位置开始和为target的两个元素组成的数组
function TwoSum(nums, target, start) {
  let res = [];
  nums = nums.sort((a, b) => a - b);
  let left = start;
  let right = nums.length - 1;
  while (left < right) {
    let leftValue = nums[left];
    let rightValue = nums[right];
    let sum = leftValue + rightValue;
    if (sum == target) {
      // 出现结果 加入数组
      res.push([leftValue, rightValue]);
      // 原本这里应该将left++和right--同时进行，因为要找下一组
      // 但是这样有可能下一组的left和right和现在一样 达不到去重的效果 比如[1,1,3,3] target = 4
      // 所以开启一个while循环 left不断前进 遇到值和当前一样的继续跳过 right同理 直到不符合条件为止
      while (left < right && leftValue == nums[left]) {
        // 这里必须这样写 保证第一次循环可以进来 也就是left至少+1 否则无限循环
        left++;
      }
      while (left < right && rightValue == nums[right]) {
        right--;
      }
    } else if (sum < target) {
      while (left < right && leftValue == nums[left]) {
        // 这里必须这样写 保证第一次循环可以进来 也就是left至少+1 否则无限循环
        left++;
      }
    } else if (sum > target) {
      while (left < right && rightValue == nums[right]) {
        // 这里必须这样写 保证第一次循环可以进来 也就是left至少+1 否则无限循环
        right--;
      }
    }
  }
  return res;
}

/* 
四数之和target
思路同上
顺便想下5数之和？N数之和？
*/
var FourSum = function (nums, target, start) {
  let res = [];
  nums = nums.sort((a, b) => a - b);
  for (let i = start; i < nums.length; i++) {
    const currNum = nums[i];
    let diff = target - currNum;

    // 在当前数组中求nums[i]以后的所有元素中满足三数之和为diff的元素列表
    let threeSumList = ThreeSum(nums, diff, i + 1);

    // 遍历threeSumList数组并加入结果数组中
    for (const threeSum of threeSumList) {
      res.push([currNum, ...threeSum]);
    }

    // 当前项的值和下一项相同 将下一项直接跳过
    while (i < nums.length - 1 && currNum === nums[i + 1]) {
      i++;
    }
  }
  console.log(res);
  return res;
};

FourSum([-2, -2, -1, 0, 1, 2, 2, 3, 4], 5, 0);

/**
 * 基于力扣两数之和、三数之和、四数之和推导出来的N数之和
 * 从nums数组的start位置(默认为0)开始查找N数之和为target的元素组合，并以数组返回
 * 注意：返回的结果组合不能重复，比如[1,1,2]和[2,1,1]视为同一个答案
 * @param {*} nums
 * @param {*} target
 * @param {*} start
 * @param {*} N
 */
function Nsum(nums, target, start = 0, N) {
  let res = [];
//   这一步很关键对于方法的兼容性来说 如果求N数之和时，N比数组中元素个数还多 那就不可能成立 返回空数组
  if(N<2 || nums.length < N){
    return res;
  }

  nums = nums.sort((a, b) => a - b);
  if (N == 2) {
    let left = start;
    let right = nums.length - 1;
    while (left < right) {
      let leftValue = nums[left];
      let rightValue = nums[right];
      let sum = leftValue + rightValue;
      if (sum == target) {
        // 出现结果 加入数组
        res.push([leftValue, rightValue]);
        // 原本这里应该将left++和right--同时进行，因为要找下一组
        // 但是这样有可能下一组的left和right和现在一样 达不到去重的效果 比如[1,1,3,3] target = 4
        // 所以开启一个while循环 left不断前进 遇到值和当前一样的继续跳过 right同理 直到不符合条件为止
        while (left < right && leftValue == nums[left]) {
          // 这里必须这样写 保证第一次循环可以进来 也就是left至少+1 否则无限循环
          left++;
        }
        while (left < right && rightValue == nums[right]) {
          right--;
        }
      } else if (sum < target) {
        while (left < right && leftValue == nums[left]) {
          // 这里必须这样写 保证第一次循环可以进来 也就是left至少+1 否则无限循环
          left++;
        }
      } else if (sum > target) {
        while (left < right && rightValue == nums[right]) {
          // 这里必须这样写 保证第一次循环可以进来 也就是left至少+1 否则无限循环
          right--;
        }
      }
    }
  }else{
    // 递归求解
    for (let i = start; i < nums.length; i++) {
        const currNum = nums[i];
        let diff = target - currNum;
        let resSumList = Nsum(nums,diff,i+1,N-1)
        for(let sumList of resSumList){
            res.push([currNum,...sumList]);
        }
        while(i<nums.length-1 && currNum === nums[i+1]){
            i++;
        }
    }
  }
  return res;
}

console.log(Nsum([-2, -2, -1, 0, 1, 2, 2, 3, 4],7,0,2));
console.log(Nsum([-2, -2, -1, 0, 1, 2, 2, 3, 4],7,0,3));
console.log(Nsum([-2, -2, -1, 0, 1, 2, 2, 3, 4],7,0,4));
console.log(Nsum([-2, -2, -1, 0, 1, 2, 2, 3, 4],7,0,5));