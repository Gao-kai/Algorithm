/* 
二分搜索基础版本
从一个数组中找一个数，找到返回索引，找不到就返回-1 
1. 二分搜索的前提是排序数组，最好是非递减数组
2. 注意求mid值的时候超出了边界，采用了一个更加稳妥的计算方法

let nums = [2,3,5,9,15,20];
let target = 5;
*/
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }

  return -1;
}

/* 
二分搜索：如果数组中有多个值为target，求最左侧的索引
关于找最左侧边界值的查询，有一些知识点:
1. 等while循环结束
不管是否查询到最终的值，此时left的值是一定比right大1的，也就是满足left = right+1

如果找到了，那么left就是数组中最左侧元素的索引
如果没找到，此时分为三种情况：
1. 如果target比数组中最小的值都要小，那么此时left一定是0，right是-1
2. 如果target比数组中最大的值都要大，那么此时left一定是数组长度arr.length，right就是arr.length-1
3. 如果target的值在数组最小和最大的范围中

都满足以下规律：
1. 这个最终的left就是假设要把target插入到数组中应该插入的索引
2. 当前数组中值比target小的元素个数总共有left个，left这个时候就是个数
3.待定
*/
function binarySearchLeftBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  console.log(left, right);
  return nums[left] === target ? left : -1;
}

let nums = [2, 3, 5, 5, 9, 15, 20];
let target = 7;
// binarySearchLeftBound(nums, target);

/* 
二分搜索：如果数组中有多个值为target，求最右侧值的索引
基本和上面一致：

不管是否查询到最终的值，此时left的值是一定比right大1的，也就是满足left = right+1
如果找到了，那么right就是数组中最右侧元素的索引

如果没找到，此时分为三种情况：
1. 如果target比数组中最小的值都要小，那么此时left一定是0，right是-1
2. 如果target比数组中最大的值都要大，那么此时left一定是数组长度arr.length，right就是arr.length-1
3. 如果target的值在数组最小和最大的范围中

都满足以下规律：
1. 这个最终的left就是假设要把target插入到数组中应该插入的索引
2. 当前数组中值比target小的元素个数总共有left个，left这个时候就是个数
3. 待定
*/

function binarySearchRightBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  console.log(left, right);

  return nums[right] === target ? right : -1;
}

// binarySearchRightBound(nums, target);

/* 
二分搜索解决实际问题，并不会直接让你从排序数组中找值这么简单，而是将二分搜索隐藏起来
必须真正的理解了二分搜索的本质才可以将框架与代码关联起来：

寻找左侧边界：
随着数组元素索引i的增大，其对应的nums[i]的值呈非递减状态

二分搜索问题的泛化：
1. 从题目中抽象出来一个自变量x
2. 一个关于x的函数f(x)
3. 一个目标值target

同时满足以下条件：
1. 随着x的增大这个f(x)的值单调递增或者递减
2. 题目是让我们计算当f(x) = target的时候，对应的x是多少

套入求排序数组nums中target的索引x
1. 确定变量x
什么是变得，一般是我们求的这个索引x，很明显数组的索引是从0开始递增变化的，但是数组nums是不变量

2. 确定fx
fx其实就是nums[x],符合当索引x增大的时候，nums[x]的值单调递增

3. 求的是当f(x) = target的时候x的值
这不就是求当nums[x] = target的时候，x的索引值吗

如果有一个算法的问题可以抽象成为这个：那么就可以对其使用二分搜索法
下面是经过f(x)抽象之后的查找左侧边界
*/
function f(nums, x) {
  return nums[x];
}

function binarySearchLeftBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (f(nums, mid) >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  console.log(left, right);
  return f(nums, left) === target ? left : -1;
}

/* 
爱吃香蕉的柯柯

珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。
警卫已经离开了，将在 h 小时后回来。
珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。
每个小时，她将会选择一堆香蕉，从中吃掉 k 根。
如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  
珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。

let piles = [5,7,12,6,3,2];
h = 8;
n就是数组的长度，代表香蕉有多少堆
i就是数组的索引，代表第i堆香蕉有多少根

吃香蕉的速度k,每小时可以吃多少根香蕉

规则：
假设k大于等于当前堆的香蕉总数，会全部吃完然后休息
如果小于，那么吃不完，等到下一个小时再吃

求在h小时吃完所有香蕉的最小速度

思路：
x:吃香蕉的速度x
f(x)：当速度为x的时候，总计需要花费多少小时可以吃完,x越快吃完的时间就越小，是单调递减的形式
target：h小时

问题转化为：当f(x) = h的时候，求此时的x幅度
最关键的问题是：写出这个f(x)的方程
*/
let piles = [3, 6, 7, 11];
let hours = 8;
function getHourBySpeed(x, piles) {
  let speed = x;
  let hours = 0;
  for (let v of piles) {
    hours += Math.ceil(v / speed);
  }
  console.log("hours", hours);
  return hours;
}

var minEatingSpeed = function (piles, h) {
  // 最小1小时也要吃一根吧
  let left = 1;
  // 最大一小时吃完最大的那一堆 也就是保证每一堆一次给你吃完
  let right = Math.max.apply(null, piles);
  // 在1-max这个区间中查询 当需要h小时的时候 对应的speed是多少

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let hour = getHourBySpeed(mid, piles);

    if (hour == h) {
      // 求得是最小速度 所以可能有多个满足条件的值 等于求二分搜索最左侧边界的索引
      right = mid - 1;
    } else if (hour > h) {
      // 吃的太慢 速度要加大 问题来了怎么让取速度的范围加大 以后速度边界从mid+1 - right
      left = mid + 1;
    } else if (hour < h) {
      // 题目最小需要8小时 中间值为6小时 吃的太快了 需要放慢 以后速度边界从0 - mid-1 去获取
      right = mid - 1;
    }
  }

  return left;
};

// console.log(minEatingSpeed([30,11,23,4,20], 5));

/* 
思考一个问题

如果x和f(x)的值是单调递增的
比如随着索引x的增大nums[x]的值也逐渐增大，这种情况下：
left和right控制的是索引的范围，二分搜索的本质就是不断缩小查询的范围
这种情况求符合f(x) = target的最左侧边界的那个x
当nums[x]>target的时候，说明我中间值都比你大，我下次取值应该从小的范围取，也就是right=mid-1
反之从大的范围取，left=mid+1

而如果x和f(x)的值是单调递减的
比如随着吃香蕉速度x的加快，吃完所有香蕉的时间f(x)肯定是减少的
left和right控制的是吃香蕉的速度，最小为1最大为数组最大值
这种情况求当f(x) = h的时候，满足条件的x中最小的那个

当f(x) > h的时候，说明我中间值都比你大，也就是花费的时间要比你的多，因为时间f(x)和速度x是反比的
所以要减小时间就要增大速度，下次取速度应该从大的范围取left = mid +1来取

也就是当f(x)>target的时候，我们应该根据实际情况来分析此时到底应该是增大x的范围还是缩小x的范围
单调递增，自然应该缩小x的范围，因为我中间的x都比你大，我再增大后面所有f(x)都比你大
单调递减，自然应该扩大x的范围，因为我中间的x都比你大，我再减小最终f(x)的值更加大了
*/

/* 
还有一个就是根据吃的速度x计算吃完固定的香蕉的所需要的时间h
 hours += Math.ceil(piles[i] / k);

*/

/* 
1011. 在 D 天内送达包裹的能力

weights = [1,2,3,4,5,6,7,8,9,10] 包裹存放数组，索引代表第几堆，索引对应的值代表每一堆的重量
days = 5 要求运送完的天数

运送规则：
1. 按照weights的顺序依次装载，相同索引可以拼车，不能跨索引进行拼车
2. 每次状态的重量必须小于船的最大承重x
假如装了第一堆还差2，下一堆是3.那么就不装了哪怕没装满 不能将第二堆装剩下1留着

求满足days天送完所有货物所需要的船的最小运载，
为什么不来最大的？因为最小的最经济实惠

1. x就是船的运载能力，取值范围是
left:货物中最大的那个值，因为你派来的船最小也能拉一堆货物走，必须保证一趟最少拉一堆货物
right:货物中所有堆的和，很简单，就是一趟来全部打包带走

2. f(x) getDaysByX(weight,x)
当运力为x的时候，计算运送完所有货物花费的天数

3. 当f(x) = days的时候，求这个x

在计算规则一定的情况下，确定的x输入一定有确定的输出days
但关键是不一定输入x=2的时候days=5
有可能x=345的时候 days都是5 求的就是这多个满足条件的x中的最小值2

*/

// weights = [1,2,3,4,5,6,7] ship = 7
function getDaysByShip(weights, x) {
  let days = 0;

  // 这一步才是算法的核心和难点，计算x和f(x)的关系
  for (let i = 0; i < weights.length; ) {
    // 必须每次刷新固定值
    let cap = x;
    while (i < weights.length) {
      // 当前这堆货物船装不下
      if (cap < weights[i]) {
        break;
      } else {
        // 如果装的下 刷新每次装完之后还剩余的容量 用来对比下一次是否可以装得下
        cap -= weights[i];
        i++;
      }
    }
    days++;
  }
  return days;
}


/* 
792. 匹配子序列的单词数
*/
var numMatchingSubseq = function (s, words) {
  // 将原字符串s中每一个字符-和索引数组进行映射，形成一个字典
  let charToIndexListMap = {}; // key是每一个word中的字符，value是该字符出现的索引组成的数组
  for (let i = 0; i < s.length; i++) {
    let char = s.charAt(i);
    if (!Array.isArray(charToIndexListMap[char])) {
      charToIndexListMap[char] = [];
    }
    charToIndexListMap[char].push(i);
  }
  console.log("charToIndexListMap", charToIndexListMap);

  let res = [];
  for (let word of words) {
    // 取出数组中的每一个单词进行校验
    let matchRes = isMatchingSubseq(word, charToIndexListMap);
    if (matchRes) {
      res.push(word);
    }
  }

  return res.length;
};

/* 字符串word是否为原字符串s的子序列 */
function isMatchingSubseq(word, charToIndexListMap) {
  // j指针是指向原字符串s的
  let j = 0;

  // i指针是指向要校验的字符串word的
  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    // 查找当前这个char字符在原字符串的字符-索引数组中是否存在 如果字典中查不到说明人家原字符串压根没有你这样的字符 无论如何匹配不到 返回false
    if (charToIndexListMap[char] == undefined) return false;

    // 如果char存在于字典中 二分查找其存在于字典的索引数组中的位置
    let indexList = charToIndexListMap[char];

    // 如果返回结果为-1 说明当前要查找的索引j已经超出了indexList的最大值 查询过界了 比如j指针已经到7了 你要在索引[4,5,6]数组中查
    let searchRes = searchLeftBound(indexList, j);
    if (searchRes == -1) return false;

    // 如果不返回-1 说明要么刚好当前遍历的char的索引就在索引列表中 就算找不到 还可以找下一个大于当前char的最小元素索引
    j = indexList[searchRes]  + 1;
  }

  return true;
}

/* 查询左侧边界的二分搜索法 */
function searchLeftBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (left == nums.length) return -1;
  return left;
}

let s = "abcde", words = ["a","bb","acd","ace"];
console.log(numMatchingSubseq(s,words));



