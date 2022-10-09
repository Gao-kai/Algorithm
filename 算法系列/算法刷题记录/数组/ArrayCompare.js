/* 
田忌赛马
优势洗牌

给定两个大小相等的数组 nums1 和 nums2，nums1 相对于 nums 的优势可以用满足 nums1[i] > nums2[i] 的索引 i 的数目来描述。
返回 nums1 的任意排列，使其相对于 nums2 的优势最大化。

输入：nums1 = [2,7,11,15], nums2 = [1,10,4,11]
输出：[2,11,7,15]
*/

/* 
思路：
nums1先排序，排序之后左侧一定最小值，右侧一定最大值
nums2不排序，一排序就打乱位置了
这里的题目要求是我知道你num2的排兵布阵的前提下，我针对性的跳转我nums1的顺序来达到最大优势

+ 如何保证最大优势？
每次拿出nums1中最大的值x也就是最右边的值，去和num2中最大的那个值y进行比较
    如果x>y，那么nums1数组中这个x的索引就应该调整为和nums2中y的索引一样，我比你最大的都大，其他的来了也不怕
    反之，那么nums1数字直接取最小的去摆烂，我最大的都比不过你最大的，说不一定你第二大的也比我大，索性我排一个最小的值去兑子

+ 如果找到nums2数组中的最大值
    并且找到过一次之后之后下一次就不该被再找到了 要不然永远是一个值被找出来
    不能移除数组中的元素 否则会打乱顺序 
     
    替换？
    建立value和index的索引map?

+ 如何找到nums1数组中的最大值和最小值
    使用左右双指针，
    取最大值用right然后--
    取最小值用left然后++
    取过的值不会重复去取
*/

/* 
学到的技巧：取一个数组中的最值然后保证不移除该元素的情况下下一次不会再取到？
1. 排序数组比如nums1
可以使用左右双指针，取到最大值right--，取到最小值left++

2. 非排序数组比如nums2
先建立一个队列
然后将nums2中每一个元素的index和value当做对象的属性，依次放入队列中[{value:100,index:5}]
然后对这个队列进行排序 让值最大的跑到数组尾部 也可以是头部 看你方便
取最大值就从数组尾部弹出
去最小值就从数组头部弹出
*/

var advantageCount = function (nums1, nums2) {

    // 建立nums2中值和索引的映射 用于基于最大值查询原数组中的索引
    let valueToIndexArr = [];
    for (let i = 0; i < nums2.length; i++) {
        // 解决重复的nums2元素在生成map时覆盖的问题
        let item = {
            index:i,
            value:nums2[i]
        };

        valueToIndexArr.push(item);
    }
    // 对valueToIndexArr排序 保证nums2中值最大的排序在最右边的时候不覆盖
    valueToIndexArr.sort((a,b)=>a.value - b.value);

    // 对数组排序
    nums1 = nums1.sort((a, b) => a - b);

    // 遍历nums1有序数组
    let left = 0;
    let right = nums1.length-1;

    let res = new Array(nums1.length);
    while(left <= right){
        let nums2MaxItem = valueToIndexArr.pop();

        // 找到当前最大值的索引和值
        let maxValue = nums2MaxItem.value;
        let maxIndex = nums2MaxItem.index;

        if(nums1[right] > maxValue){
            // 覆盖
            res[maxIndex] = nums1[right];
            right--;
        }else{
            // 摆烂
            res[maxIndex] = nums1[left];
            left++;
        }
    }

    return res;

};
let nums1 = [2,0,4,1,2];
let nums2 = [1,3,0,0,2];
advantageCount(nums1,nums2);