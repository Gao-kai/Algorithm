let testCase = "  hello  world ";
/* 
    1. js API方法
*/
function removeSpace1(s) {
  // 1.先将字符串两端的一个到多个空格去除
  s = s.trim();

  // 2. 再将字符串的中间单词间的一到多个空格去除 用到split方法可以传入正则表达式的特点 简单易用
  let arr = s.split(/\s+/);

  // 3. 将数组再转化为字符串返回 每个单词中间用空格隔开
  return arr.join(" ");
}
console.log(removeSpace1(testCase));

/* 
    2.队列 + 遍历法
*/
function removeSpace2(s) {
  let quene = [];
  for (let i = 0; i < s.length; i++) {
    /* 
            如果当前遍历到的字符是空格，那么只有两种情况：
            1.这个空格是前导或者尾随的
            2.这个空格是两个单词中间的

            如果下一个遍历到的字符还是空格，那么当前这个字符是无用的 将不处理直接跳过
            如果下一个遍历到的字符不是空格，那么当前这个字符会被放到队列中
                好处是保证了两个单词之前如果有多个空格连接还会保留一个，比如："abc   edf" => "abc edf"
                缺点是如果有多个前导空格和尾随空格，那么也会保留一个,比如："  abc def" => " abc def "
        */
    if (s.charAt(i) === " " && s.charAt(i) === s.charAt(i + 1)) {
      continue;
    } else {
      quene.push(s.charAt(i));
    }
  }

  // 如果前导空格保留一个
  if (quene[0] === " " && quene.length > 0) {
    quene = quene.slice(1);
  }

  // 如果尾随空格保留一个
  if (quene[quene.length - 1] === " " && quene.length > 0) {
    quene = quene.slice(0, quene.length - 1);
  }

  return quene.join("");
}
console.log(removeSpace2(testCase));

/* 
    3.前后指针法 原地进行去空格
    思路和数组arr中将值为target的元素进行原地去重，并返回去重后的数组
    注意：去重后的数组只需要截取到某一位验证通过即可 比如[1,2,2,3,2,5] => [1,3,5,...] 只取前三个校验 后面的没关系
*/
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

console.log(removeSpace3(testCase));

