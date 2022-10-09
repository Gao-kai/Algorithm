/* 
s = "the sky is blue"
"blue is sky the"

先把s中每一个单词都反转了：s = "eht yks si eulb"
去除多余的空格
将s整个反转 s = "blue is sky the"
需要原地反转
1. 遍历s字符串 假设s字符串是有前导空格 尾部空格和单词间的多个空格 比如s = "  the sky   is blue  "
2. 当i从0开始依次取值 当值为空格的时候 就i++ 遇到第一个字符 代表前导0消灭完了
3. 后续遍历到就将字符依次进行相加 局部let x = ""+the = "the" 放入栈中[t,h,e] 从栈中依次取出 eht
4. 遇到下一个空格 依次取出之后清空栈
5. 但是尾部的空格如何去除呢 当i遍历到length时 就ok了
*/



var reverseWords = function (s) {
  // 去重复的空格
  let str = removeSpace3(s);

  // 对字符串进行反转
  let strCharList = str.split("");
  let left = 0;
  let right = strCharList.length - 1;
  swap(left, right, strCharList);

  // 然后对每一个单词进行反转
  let start = 0;
  for (let i = 0; i <= strCharList.length; i++) {
    let char = strCharList[i];

    if (char === " " || i == strCharList.length) {
      swap(start, i - 1, strCharList);
      start = i + 1;
    }
  }
  console.log(strCharList.join(""));
  return strCharList.join("");
};


function swap(left, right, arr) {
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}

function removeSpace3(s) {
  // 由于js字符串的不可变性 必须这里要转化为数组才可以对指定索引位置的元素进行赋值
  let charList = s.split("");
  // slow指针指的是去了空格之后构造
  let slow = 0;
  // fast指针就是每次都要前进一位的指针
  for (let fast = 0; fast < charList.length; fast++) {
    // 核心思路：遇到空格直接跳过，这可以保证前导和尾随的空格完美去除
    if (charList[fast] !== " ") {
      /*
                如果slow == 0,代表slow没动过，那么当前的fast指针指向的是第一个单词的第一个字符
                    原地去重：此时需要开另外一个while循环去将这个单词每一个fast指针对应的单词赋值到slow上
                    只要slow发生赋值 就需要将slow指针前进一位
                如果slow != 0,代表slow已经动过，那么当前的fast指针指向的不是第一个单词，此时就需要在处理这个单词之前给前面补一个空格
            */
      if (slow !== 0) {
        charList[slow] = " ";
        slow++;
      }

      //   这里是局部的遍历单词的条件
      while (fast < charList.length && charList[fast] !== " ") {
        charList[slow] = charList[fast];
        slow++;
        fast++;
      }
    }
  }

  //将数组中有效位置切割之后转化为字符串
  return charList.slice(0,slow).join("");
}

reverseWords("  the sky   is blue  ");