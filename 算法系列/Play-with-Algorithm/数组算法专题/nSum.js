/**
 * @param {number[]} nums
 * @return {number[][]}
 * 1. 遍历数组
 * 2.找arr[i]对应的另外两个元素xy，就等于从除了arr[i]的数组中找两数之和为target - arr[i]的元素，就将三数之和的问题转化成了两数之和的问题 
 * 3.怎么保证不重复 那就是先排序 排序之后对相同的元素直接跳过 这里要用到双指针的技巧
 * 4.和两数之和的区别在于前者要求返回的是数组索引，这时候不能排序，排序会打乱原数组中元素的位置
 */
function threeSum(nums){

	// 升序排序 [-4,-1,-1,0,1,2]
	nums = nums.sort((a, b) => a - b);

	// 遍历数组
	let res = [];
	
	for (let i = 0; i < nums.length; i++) {
		let curr = nums[i];
		let other = 0 - curr;
		let twoSumRes = twoSum(nums, i + 1, other);
		// console.log('curr-twoSumRes',curr,twoSumRes)

		// 写入结果
		if (twoSumRes.length) {
			for (let v of twoSumRes) {
				res.push([curr, ...v])
			}
		}

		// 相同的元素就不要重复求剩余的两数之和了
		while (nums[i] === nums[i + 1] && i < nums.length - 1) {
			i++;
		}
	}

	return res;

};


/**
 * 两数之和-排序数组版(双指针)
 * @param {*} arr 数组arr是假设排序好的数组
 * @param {*} start 起始查找索引
 * @param {*} target 两数的目标之和
 * 返回的是值，不是索引
 * [0,0,2,2,2,5,5] t = 5
 */
function twoSum(arr, start, target) {

	let left = start;
	let right = arr.length - 1;
	let res = [];

	while (left < right) {
		let leftValue = arr[left];
		let rightValue = arr[right];
		let sum = leftValue + rightValue;
		if (sum == target) {
			res.push([leftValue, rightValue]);
			//   这可不是优化点 而是为了避免最终push到res数组中的结果是重复的比如：[[0,5],[0,5]]这种情况
			while (left < right && arr[left] == leftValue) {
				left++;
			}
			while (left < right && arr[right] == rightValue) {

				right--;
			}
		} else if (sum > target) {
			// 优化点如：[1,1,2,2,2,5,5] t = 5 sum=6比5大 按照二分搜索原理应该将right--，可是right--之后下一次取到的还是5 等于做重复判断
			while (left < right && arr[right] == rightValue) {
				right--;
			}
		} else if (sum < target) {
			// 优化点同上
			while (left < right && arr[left] == leftValue) {
				left++;
			}
		}
	}

	return res;
}


console.log(threeSum([0,1,1]));
