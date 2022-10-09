## 两数之和

先看题目要求你返回的是什么？

1. 返回数组 nums 中是否存在和为 target 的两个数？
   这是要求你返回布尔值，可以通过以下两种方法实现：

- num 和出现次数 count 建立映射，根据 diff 和 num 是否相等以及次数来判断
- 先计算出 nums 中所有数两两相加出现和的情况，放在一个数组中，去这个数组中查询 target

2. 返回数组 nums 中和为 target 的两个数的值
   这里仅仅要求返回值，那么就可以直接先排序，然后通过数组双指针来进行求值，很简单的思路

3. 返回数组 nums 中和为 target 的两个数的元素索引
   这是最难的一种，因为不能排序打乱了原数组中元素的索引
   所以这里需要建立 num 和 index 的 map，然后判断 diff 是否存在于数组中，如果存在怕和当前遍历的 num 重复还需要判断

4. 返回数组 nums 中所有和为 target 的两个数，并且结果不能重复，比如[1,3]和[3,1]是同一组结果，是重复的
   这种在原来求两个数的基础上多了两个要求：

- 之前是遇到一组符合条件的就直接结束遍历返回结果了，这里是需要多对
- 在求出的结果的基础上还不能重复

思路： 1.必须得排序 2.排好序就可以使用左右双指针 3.移动 left 或者 right 指针的时候如果下一个元素的值和当前相等，那么就跳过，如果连续多个元素的值相等呢？就要用 while 循环

```js
function uniqueTwoSum(nums, target) {
  let result = [];
  // 排序
  nums = nums.sort((a, b) => a - b);
  // 左右双指针
  let left = 0;
  let right = nums.length - 1;

  //   遍历
  while (left < right) {
    let sum = nums[left] + nums[right];
    // 记录left和right最初的值 方便后面对比
    let leftValue =  nums[left];
    let rightValue =  nums[right];

    if(sum == target){
        // 当前这一对符合条件 加入结果数组中
        result.push([nums[left],nums[right]]);
        // 原本这里应该将left++和right--同时进行，因为要找下一组
        // 但是这样有可能下一组的left和right和现在一样 达不到去重的效果 比如[1,1,3,3] target = 4
        // 所以开启一个while循环 left不断前进 遇到值和当前一样的继续跳过 right同理 直到不符合条件为止
        while(left < right && nums[left] === leftValue){
            left++;
        }

        while(left < right && nums[right] === rightValue){
            right--;
        }
    }else if(sum > target){
        while(left < right && nums[right] === rightValue){
            right--;
        }
    }else if(sum < target){
        while(left < right && nums[left] === leftValue){
            left++;
        }
    }
  }

  return result;
}
```

综上所述，这里有 4 种求解的方法

一般情况下出现的两数之和一般有两种题型：

### 排序数组求两数之和

1. 给你一个已经排序好的非递减数组，让你在数组中找出两数之和为 target 的元素索引
   因为是已经排好序的，所以只需要使用左右双指针去获取和，然后根据和的大小来移动 left 或者 right 指针即可，这个非常简单，就是数组双指针的基本用法之一。

### 非排序数组求两数之和

但是如果给我们的是一个乱序并且值会重复的数组，此时就不能再使用左右双指针了。
你可能会说，我先对数组进行排序不就好了，但问题是你排序之后原来数组中元素的索引也发生了变化，所以我们要想其他办法，想一个把数组元素和索引关联起来的办法，那么这里就可以考虑用哈希表，或者说对象计数器的思路。

1. 方法一、暴力双循环 时间复杂度 O(N^2) 空间复杂度 O(1)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
  return [];
};
```

2. 方法二、通过一个哈希表来减少时间复杂度为 O(N) 空间复杂度 O(N)来存储哈希表
   这个方法我觉得也是两数之和的核心，就要要让你学会使用哈希表去处理问题，因为哈希表的查询速度是 O(1)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 解法二：建立v-index的map对象 然后进行判断
 */
var twoSum = function (nums, target) {
  let numsMap = {};
  for (let i = 0; i < nums.length; i++) {
    let v = nums[i];
    numsMap[v] = i;
  }
  console.log("numsMap", numsMap);

  for (let i = 0; i < nums.length; i++) {
    let other = target - nums[i];
    // 从数组中找是否存在other并且这个other值所在的索引index不等于当前i
    if (nums.includes(other) && numsMap[other] !== i) {
      return [i, numsMap[other]];
    }
  }

  return [];
};
```

### 两数之和问题的其他变种

现在给你一个类，要求你设计两个 API：

1. add(num)：向你设计的数据结构中添加一个数字元素 num
2. find(target)：在你设计的数据结构中查询是否有两个元素之和为 target

比起先添加到数组中最后搞哈希表来对应，不如在一开始的时候就将添加的元素和添加进来的个数进行一一映射：
遍历 map 中的每一个 key 也就是每一个加入进去的 num，并求出和为 target 时的另外一个值 diff

1. 如果 diff 和 key 相等，为了避免两次取到一个值，还需要判断 diff 在 map 中是否至少出现 2 次[5,5,62,3] 5 和 5
2. 如果 diff 和 key 不相等，那么就需要校验 diff 在 map 是是否至少出现一次[1,2,8,3] 2 和 8

这是依据 diff 和 num 出现的个数解决问题的思路，上面的是通过 diff 和 num 的索引建立映射解决问题的思路。
但是这里需要说明一个前提，如果要求两数之和为 target 的两个数的索引，那么此时不能用排序，只能用 diff + 哈希表的思路去求解
而且不能用计数的方式，计数的方式只能用于判断是否存在，返回的是布尔值
只能用 num 和索引映射的方法去求解。

```js
class TwoSum {
  constructor() {
    this.numToCountMap = new Map();
  }

  add(num) {
    if (this.numToCountMap.has(num)) {
      let count = this.numToCountMap.get(num);
      this.numToCountMap.set(num, count++);
    } else {
      this.numToCountMap.set(num, 1);
    }
  }

  find(target) {
    for (let key of this.numToCountMap.keys()) {
      let diff = key - target;
      if (diff == key && this.numToCountMap.get("diff") > 1) {
        return true;
      }
      if (diff !== key && this.numToCount.has("diff")) {
        return true;
      }
    }
    return false;
  }
}
```

上面这两个 API 设计是完成了，但是有一个问题：如果频繁的调用 find 方法，那么每次的时间复杂度都将会是 O(N),我们能不能优化一下让这个算法的复杂度减少一点？
答案是可以的，在每一个 num 加入到 map 中进来的时候，就统计和 map 中其他元素的之和，最后 find 的时候只需要去查找已经放好的和即可

```js
class TwoSum {
  constructor() {
    this.twoSumMap = {};
    this.nums = [];
  }

  add(newValue) {
    // 取出每一个已经存在于nums中的值，和newValue进行相加 计算两数之和 如果结果已经存在就跳过 不存在就存入
    for (let num of this.nums) {
      let sum = num + newValue;
      this.twoSumMap[sum] = sum;
    }
    // 将元素真正添加进数组
    this.nums.push(newValue);
  }

  find(target) {
    return this.twoSumMap[target] !== undefinde;
  }
}
```

### 其他思路：模拟优先级队列

使用田忌赛马哪里的那个方式进行数组排序
k-v 是对象，然后对其进行排序
然后用队列依次取出最大的
双指针

```js
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

let nums = [3, 2, 4],
  target = 6;
console.log(twoSum(nums, target));
```

## 三数之和

## 四数之和

## N 数之和
