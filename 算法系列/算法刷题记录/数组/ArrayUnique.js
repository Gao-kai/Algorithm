let arr = [0, 1, 2, 2];

/**
 * 方法一：
 * ES6 API Set高效去重
 */
let uniqueArr = [...new Set(arr)];
// console.log(uniqueArr);

/**
 * 方法二：
 * 对象天然的相同属性去重特性
 * 将数组值变为对象属性，最后读取对象的values集合
 * 不要读取对象的keys集合 因为对象的key会自动将数字转化为字符串
 */
let obj = {};
for (let v of arr) {
  if (obj[v] === undefined) {
    obj[v] = v;
  }
}
// console.log(Object.values(obj));

/**
 * 方法三：
 * 遍历数组去重法
 * 一前一后对比数组的每一项
 * 只要前一项和自己相等 就把自己从数组中移除了
 * 注意数组塌陷
 * 这其实是性能很差的方案 因为数组每次从中间移除就要后面所有都向前进1位
 */
function unique(arr) {
  let res = arr.sort((a, b) => a - b);
  for (let i = 0; i < res.length; i++) {
    if (res[i] === res[i + 1]) {
      res.splice(i, 1);
      i--;
    }
  }
  return res;
}
// console.log(unique(arr));

/**
 * 方法四：
 * 数组前后双指针去重法
 * 前后指针指的值相等，只让fast前进去探路
 * 前后指针指的值不相等，先将slow指针+1，然后将fast的值赋值给slow，最后然fast++
 * 最后从0截取到数组的slow+1处 不会删除数组元素 是一种原地去重的好方案
 */
function double(arr) {
  let res = arr.sort((a, b) => a - b);

  let slow = 0;
  let fast = 0;

  while (fast < res.length) {
    if (res[fast] !== res[slow]) {
      slow++;
      res[slow] = res[fast];
      fast++;
    } else {
      fast++;
    }
  }

  return res.slice(0, slow + 1);
}

// console.log(double(arr));

/* 
316.去重重复字母

1.基于对象去重
2.去重之后的字符串字典序最小
3.不能打乱其他字符的相对位置（判断s是t的子序列也有顺序不能变的要求）
s = "bcabc" 去重结果可以是:bca cab cba 但是字典序最小的一定是首字母的ASCII码最小的那个 a-z 97-122 A-Z 65-90
*/
var removeDuplicateLetters = function (s) {
  // 由于s中可能出现多个相同字符，这里首先记录每一个字符的出现次数
  let charCountMap = {};
  for (let char of s) {
    charCountMap[char] ? charCountMap[char]++ : (charCountMap[char] = 1);
  }

  // 使用栈来记录一个字符的遍历顺序
  let stack = [];
  // 使用另外一个对象来记录某个字符是否已经存在于栈中
  let charInStackMap = {};

  /* 
      遍历字符串s
      1.首先将遍历到的字符从charCountMap中找到 将其次数-1
      2.如果这个字符已经存在于栈中 那么直接进入下一次循环
      3.如果这个字符不存在于栈中 需要将这个字符加入栈中，但是加入栈中有几个要求：
      + 栈顶保存的一定是字典序最大的那个字符，然后栈底保存的一定是字典序最小的那个字符
        比如[a,b,c]栈顶是c栈底是a 这样最后从栈中依次弹出元素的时候顺序就是cba 然后逆转字符串就好了
        那我们如何保证加入到栈顶的一定是最大的字典序呢？
        就要先获取到栈顶值的字典序，和当前遍历到的这个字符对比，如果符合条件才加入
        否则将当前栈顶元素弹出，进入下一次循环再次拿出栈顶元素比较直到符合条件
        如果当前栈中所有元素都比当前这个字符小，那就将栈清空，把字符压入栈中即可

      + 在循环比较从栈顶弹出元素，还需要解决一个问题，那就是假设字符串s中只有一个c，你把c弹出了，导致答案出错
        比如s=acba，按照上面的做法最终得到的结果是ab，因为b小于c所以把c弹出去
        但是期望的答案是acb，所以我们之前设置的charCountMap就起作用了
        每个字符只要遍历到 就从charCountMap将其个数-1
        如果遍历之后在判断是否入栈的时候其个数为0了 说明这是这个s字符串中该字符的最后一个了，必须入栈
        否则才进行上叙述的入栈判断
        s = "bcabc"

        bc
    */

  let len = s.length;
  for (let i = 0; i < len; i++) {
    let currChar = s[i];
    charCountMap[currChar]--;

    if (charInStackMap[currChar]) {
      continue;
    } else {
      while (stack.length > 0 && currChar < stack[stack.length - 1]) {
        // 取出栈顶元素
        let topChar = stack[stack.length - 1];
        if (charCountMap[topChar] > 0) {
          stack.pop();
          charInStackMap[topChar] = false;
        }else{
          break;
        }
      }
      stack.push(currChar);
      charInStackMap[currChar] = true;
    }
  }
};

removeDuplicateLetters("cbacdcbc");
