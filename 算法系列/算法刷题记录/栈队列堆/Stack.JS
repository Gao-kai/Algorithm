let nums = [2, 1, 2, 4, 3];
res = [0, 0, 0, 0, 0];
stack = [2];

// 暴力解法
function nextGreaterElement1(nums) {
  for (let i = 0; i < nums.length; i++) {
    let currValue = nums[i];
    for (let j = i + 1; j <= nums.length; j++) {
      if (nums[j] > currValue) {
        nums[i] = nums[j];
        break;
      }
      nums[i] = -1;
    }
  }
  return nums;
}
// console.log(nextGreaterElement1(nums));

/* 
单调栈模板
1. 求下一个更大的元素
那么其实问题的本质就是求当前遍历项之后，剩余数组中比自己大的值，只要找到就停止。
如果这个最大的值比当前项大，那么就在当前索引位置赋值;
如果这个最大的值比当前项小或者相等，那么就赋值为-1

问题来了，除了暴力双层for循环挨个线性去查找对比，有其他更加遍历的方法找出当前项之后比自己大的元素值吗？
答案是反向遍历 + 单调栈。栈顶如果保存元素，那么保存的一定是剩余元素中比当前元素大一点的元素。

之前你是从第0个开始找之后比自己大的，现在我从最后一个开始找比自己大的，结果并不影响。
最后一个肯定找不到比自己大的，所以返回-1，并且将最后一个的值放到栈顶。
倒数第二个只需要判断当前栈顶的这个值是否比自己大？
    如果比自己大，那么这个栈顶的值就是自己要找的当前项之后比自己大的值；
    如果比自己小，那么需要将栈中一个个的弹出，知道遇到比自己大的才停止；
到赋值的环节，很简单。如果栈中有值，那么栈顶的值就是自己要赋的值；栈中没有值代表没有值比自己还大，返回-1.

最后将当前项放入栈中。

时间复杂度是O（N）
*/
function nextGreaterElement3(nums) {
  let result = [];
  let stack = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    // 获取当前遍历的值
    let curr = nums[i];

    // 如果栈不为空并且栈顶元素比当前值大 需要依次弹出比当前值小的元素
    while (stack.length > 0 && curr <= stack[stack.length - 1]) {
      stack.pop();
    }

    // 给result对应索引i的位置赋值
    result[i] = stack.length == 0 ? -1 : stack[stack.length - 1];

    // 将当前遍历的值压入栈中 也就是每一个值无论如果都会被压入栈中 但是什么时候从栈中弹出是有学问的
    stack.push(curr);
  }

  return result;
}
// console.log(nextGreaterElement3([2, 1, 2, 4, 3]));

let temperatures = [89, 62, 70, 58, 47, 47, 46, 76, 100, 70];
var dailyTemperatures = function (temperatures) {
  let res = [];
  let stack = [];

  for (let i = temperatures.length - 1; i >= 0; i--) {
    let currTemp = temperatures[i];
    // 这里取栈顶元素的值 需要先取出索引 然后再取值
    while (
      stack.length > 0 &&
      currTemp >= temperatures[stack[stack.length - 1]]
    ) {
      stack.pop();
    }

    if (stack.length == 0) {
      res[i] = 0;
    } else {
      // 赋值的是更大元素的索引和当前元素的索引之差 也就是间距
      res[i] = stack[stack.length - 1] - i;
    }

    // 压入栈顶的是下一个更大元素的索引 其实是一样的
    stack.push(i);
  }

  return res;
};
console.log(dailyTemperatures(temperatures));
