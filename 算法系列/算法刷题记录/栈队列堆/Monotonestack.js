let nums = [2, 1, 2, 2, 4, 3];

function nextGreaterElement(nums) {
  let nextGreaterEls = [];
  let len = nums.length;
  let stack = [];

  for (let i = len - 1; i >= 0; i--) {
    // 如果是求下一个更大的值 就只需要大于；如果是下一个更大的值的索引的话，就需要写上=
    if (stack.length > 0 && nums[i] > stack[stack.length - 1]) {
      stack.pop();
    }

    if (stack.length == 0) {
      nextGreaterEls[i] = -1;
    } else {
      nextGreaterEls[i] = stack[stack.length - 1];
    }

    stack.push(nums[i]);
  }
}
nextGreaterElement(nums);

/* 
 在循环数组中找下一个更大的值
 1. 循环数组和正常数组唯一的区别就在于下面这种情况：
 let arr = [2,4,3]
 正常的的最后一个元素3的下一个更大的值就是-1
 但是循环数组可以反复查，第二圈过来之后找到的元素4便是符合条件的更大的值

 也就是说：无论什么数，最多循环两边都可以找到，要是还找不到，那这个数就是数组中最大的数

 2. 如何循环获取数组中元素的值？
 用取模运算 用数组中元素的索引不停的去对数组长度取模，并且i++，就会一直取模
 无论i加到多少 最后的取模运算的结果的范围都是[0,arr.length-1]
 let i = 0;
 while(true){
    console.log(arr[i % arr.length-1]);
    i++;
 }
*/
var nextGreaterElements = function (nums) {
  let nextGreaterEls = [];
  let stack = [];
  let len = nums.length;

  // 构造一个原数组2倍长的数组 开始遍历 保证没有漏网之鱼
  for (let i = 2 * len - 1; i >= 0; i--) {
    // 最巧妙的地方在于通过取模保证了循环取值
    // [2,4,3] = > [2,4,3,2,4,3]
    while (stack.length > 0 && nums[i % len] >= stack[stack.length - 1]) {
      stack.pop();
    }

    if (stack.length == 0) {
      nextGreaterEls[i % len] = -1;
    } else {
      nextGreaterEls[i % len] = stack[stack.length - 1];
    }

    stack.push(nums[i % len]);
  }

  return nextGreaterEls;
};

nextGreaterElements([2, 4, 3]);

/* 
    上一个更大元素
    从前向后遍历 当前值比栈顶大 就弹出
    比栈顶小就跳过 直接去栈顶的赋值
*/
function prevGreaterEls(nums) {
  let res = [];
  let stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > stack[stack.length - 1]) {
      stack.pop();
    }

    if (stack.length == 0) {
      res[i] = -1;
    } else {
      res[i] = stack[stack.length - 1];
    }

    stack.push(nums[i]);
  }

  console.log(res);
}
prevGreaterEls([5, 7, 4, 3, 2]);


