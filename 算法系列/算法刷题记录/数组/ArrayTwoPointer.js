/* 
1. 数组已经按照非递减顺序排序 说明数组left位置必然最小 right位置必然最大
2. 下标从1开始，说明我们按照常规求的数组必须索引最后+1
3. 左右指针法
4. 只对应唯一的答案 说明肯定找得到 给的用例肯定找的到
*/

/* 
升序排列
 原地 删除重复出现的元素
使每个元素 只出现一次 去重
返回删除后数组的新长度。返回值
元素的 相对顺序 应该保持 一致 。
使用 O(1) 额外空间

1. 原地去重 一定用快慢指针
2. 原地去重一般要么交换，要么就是直接res[slow] = res[fast]这种赋值
3. 返回值是去重之后数组的新长度，不能用新数组空间，那么一定是截取数组开头的一部分，就是right-left
4. 元素相对顺序保持一致就意味着去重之后的数组依然顺序一致
5. 随着去重数组N的增大，使用的额外变量不变
*/
[0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// s = 0,f = 0;
// 两个指针的值相等，fast前进，slow等着你找到不相等的来覆盖我
// 两个指针的值不等，说明fast找到新的值了
// 先将slow指针前进一步，因为第一个元素无论如何是去重的
// 然后nums[slow] = nums[fast]
// 我没有改变数组 只是借用了一下值
// 结束条件 fast走完了 没地方走了

// 判断条件：fast < nums.length

/* 
1.一个数组 nums 和一个值 val
原地 移除所有数值等于 val 的元素
并返回移除后数组的新长度

slow和fast都是0
如果两个的值不等于val 那就并排走
如果遇到val slow等到 fast去前面探索 
如果fast找到新的值 就取到这个新的值 然后给slow覆盖上

*/

var removeElement = function (nums, val) {
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[fast] == val) {
      fast++;
    } else {
      nums[slow] = nums[fast];
      slow++;
      fast++;
    }
  }
};
removeElement([0, 1, 0, 3, 12], 0);

/* 
    原地移除数组中值为target的元素 [1,2,5,2,1] v = 1
    无论如何每次fast指针都必须向前走一位
    当fast的值等于target的时候，就略过；不等于的时候，说明这个值才是需要的，就将这个值读取下赋值给slow 并让slow前进一步

    原地移除排序数组中重复的元素 [0,0,1,1,2] 
    无论如何每次fast指针都必须向前走一位
    当fast的值等于slow值的时候，直接向前走
    不等于的时候，说明这个值和slow当前的值不一样，取值然后直接赋值

    fast在前面探测，slow在原地等，只有符合某个条件之后才前进
*/

/* 
    前后指针的while条件就是right<length
    左右指针的while条件就是left<right
*/

// nums = [0,1,0,3,12] 不能交换 交换顺序变
// 前后指针
// [1,1,0,3,12]
// [1,3,12,3,12]

function deleteDuplicates(head) {
  let slow = head;
  let fast = head;

  while (fast != null) {
    if (fast.val == slow.val) {
      fast = fast.next;
    } else {
      slow.next = fast;
      fast = fast.next;
      slow = slow.next;
    }
  }
  console.log(slow);

  slow.next = null;

  return head;
}

/**
 * 如何判断一个字符串是回文串
 * 使用数组左右指针
 * 只要当left和right指针的值不相等的时候 就说明不是一个回文串;left>=right的时候退出循环
 * 奇数字母回文串：abcba
 * 偶数字母回文串：abccba
 */
function checkPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
checkPalindrome("abccba");
checkPalindrome("abcba");

/* 
    现在求一个字符串s中最长的回文子串
    1. 要找出最长的，那么必须把所有满足条件的回文子串都找出来，然后取值最长的那个答案
    2. 回文子串，子串的意思就是要连续的
    3. 要分析回文子串为奇数和偶数的两种情况
*/
var longestPalindrome = function (s) {
  let maxStr = "";
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      let res = getPalindrome(s, i, j);
      maxStr = res.length > maxStr.length ? res : maxStr;
    }
  }
  return maxStr;
};

/* 
    如果这个是一个回文串，就返回这个回文串本身
*/
function getPalindrome(s, i, j) {
    let left = i;
    let right = j;
  while (left < right) {
    if (s[left] !== s[right]) {
      return "";
    }
    left++;
    right--;
  }
  return s.slice(i, j + 1);
}

longestPalindrome("babad");

/* 
    将问题转化为从中心到两端的双指针
    如果回文串的长度为奇数，那么left和right指针开始的索引一样，然后依次向两边散开，直到不相等就退出
    如果回文串的长度为偶数，那么left和right指针就是一前一后，依次向两边散开，直到不等或者遇到边界就退出
    abcbae 0 1 2 3 4 5
    遍历abcba字符串，要找到每一种可能
    先假设为奇数：当l=r=0 1 2 3 4 5的时候，找回文串，一轮遍历下来找到的就是当l=r = 2的时候abcba
    再假设为偶数：当l=0 r=1 一直到l=4 r=5的时候，找回文串，一轮遍历下来没有找到符合条件的回文串

    将结果依次比较大小长度 然后返回最大值


*/