/* 
76. 最小覆盖子串
给你一个字符串 s 、一个字符串 t 。
返回 s 中涵盖 t 所有字符的最小子串。
如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。

1. 只要s的某个子串包含了t的所有字符就可以，不一定顺序和t的相同
比如s="abcde" t = "ecd" 那么最小子串"cde"

比如s="abcabca" t="aa" 那么最小子串"abca" 包含了aa
核心是覆盖
那么就应该统计两个map
第一个map是我们期待窗口中应该出现的每一个字符及其个数
第二个map是当前真正的的窗口中的字符及其个数

还得要一个变量来记录 是否可以缩小窗口 也就是是否可以进入缩小窗口的循环
s = "ADOBECODEBANC", t = "ABC"
needMap = {
    A:1
    B:2
    C:1
}

windowMap = {
    A:1
    B:3
    C:2
}

*/
var minWindow = function (s, t) {
  let needMap = {};
  let windowMap = {};
  for (let char of t) {
    needMap[char] ? needMap[char]++ : (needMap[char] = 1);
    windowMap[char] = 0;
  }

  let left = 0;
  let right = 0;

  //   确定当前是否满足缩小窗口
  let count = 0;
  //  通过起点和长度就可以确定一个子串
  let minLen = Number.MAX_SAFE_INTEGER;
  let start = 0;

  while (right < s.length) {
    let c = s[right];
    right++;

    // 进入的元素是我需要的我才处理
    if (needMap[c] !== undefined) {
      windowMap[c]++;
      if (windowMap[c] === needMap[c]) {
        count++;
      }
    }

    while (count === Object.keys(needMap).length) {
      // 进入到这里说明已经找到答案 但可能不是最优秀的答案
      // 所以需要每次都更新下答案 因为每循环一次都在缩小一位
      if (right - left < minLen) {
        // 首次进入肯定是成立的
        start = left;
        minLen = right - left;
      }

      let d = s[left];
      left++;
      // 移除的元素是我需要的我才处理
      if (needMap[d] !== undefined) {
        windowMap[d]--;
        // 窗口中的d可以有很多个 但是不能比我需要的最小值还小
        if (windowMap[d] < needMap[d]) {
          // 不能再缩小了
          count--;
        }
      }
    }
  }

  //   循环结束 返回结果
  return minLen === Number.MAX_SAFE_INTEGER?"": s.substr(start, minLen);
};
console.log(minWindow("ADOBECODEBANC","ABC"));

/* 
567.字符串的排列

给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列
如果是，返回 true ；否则，返回 false 。
换句话说，s1 的排列之一是 s2 的 子串 。

s1 = "ab" s2 = "eidbaooo"

一个字符串的排列是多个的，比如abc的排列有：
abc acb bca bac cba cab

要想让abc的排列之一是s2的子串，假设s2的子串为x，那么满足条件为：
1. abc每个字符的个数一定严格匹配x中对应字符的个数 比如x=abced对的，但是abed是错的
2. 包含关系 s2的子串长度可以超出s1的子串长度

我窗口中的字符一定包含了s1的所有字符，并且数量也是相等的
不仅要包含，而且子串里面s1排列是连在一起的
当窗口中字符的个数恰好等于s1的时候 就ok了 也就说明这个窗口符合条件
时候的字符个数是固定的
*/

var checkInclusion = function (s1, s2) {
    let needMap = {};
    let windowMap = {};
    for (let char of s1) {
        needMap[char] ? needMap[char]++ : (needMap[char] = 1);
        windowMap[char] = 0;
    }

    let left = 0;
    let right = 0;

    let validCount = 0;

    while (right < s2.length) {
        let c = s2[right];
        right++;

        // 进入的元素是我需要的我才处理
        if (needMap[c] !== undefined) {
            windowMap[c]++;
            // 这里必须得用等于 为了防止多个c进来之后 改变valid的值
            if (windowMap[c] === needMap[c]) {
                validCount++;
            }
        }

        while ((right - left) >= s1.length) {
            if(validCount == Object.keys(needMap).length){
                return true;
            }

            let d = s2[left];
            left++;
            // 移除的元素是我需要的我才处理
            if (needMap[d] !== undefined) {
                windowMap[d]--;
                // 窗口中的d可以有很多个 但是不能比我需要的最小值还小
                if (windowMap[d] < needMap[d]) {
                    // 不能再缩小了
                    validCount--;
                }
                // windowMap[d]--;
            }
        }
    }

    return false;
};
let res = checkInclusion(
    "trinitrophenylmethylnitramine",
    "dinitrophenylhydrazinetrinitrophenylmethylnitramine"
);
console.log(res);

/* 
3.寻找字符串中所有字母异位词
一个字符串的异位词，就是字符串的排列，之前说过了
只不过需要找到所有的
然后依次将它们的起始索引取出来放到一个数组中去
*/

/* 
4. 无重复字符的最长子串
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
s = "bacabcbb" res=3 abc
r = 4
l = 2

窗口增大 如果增大的过程中map中某个key的值大于1了 就更新结果
然后缩小窗口
 子串代表连续序列
 包含代表不连续的序列也可以
 {
    a:2,
    b:0,
    c:1,
 }

 核心就是什么时候开始缩小窗口？
 答案就是发现当前新加入的窗口字符的个数已经大于1了
 此时就从窗口中找到那个重复的字符 然后给他移除掉
*/
var lengthOfLongestSubstring = function(s) {
    let windowMap = {};
    for(let v of s){
        windowMap[v]=0;
    }
    let left = 0;
    let right = 0;

    let maxLen = Number.MIN_VALUE;

    while(right<s.length){
        let c = s[right];
        right++;

        if(windowMap[c] !== undefined){
            windowMap[c]++;
        }

        while(windowMap[c]>1){
            // 需要移除当前窗口中的另外一个c字符才可以
            let d = s[left];
            left++;
            if(windowMap[d]!== undefined){
                windowMap[d]--;
            }
        }

        // 这里更新结果 最小也得是个0
        maxLen = Math.max(right-left,maxLen);
    }

    return maxLen;

};

lengthOfLongestSubstring("abcabcbb")
