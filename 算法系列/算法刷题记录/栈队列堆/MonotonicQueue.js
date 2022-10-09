/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 */

class MaxQuene {
    constructor(){
        this.quene = [];
    }

    add(newValue){
        while(this.quene.length && newValue > this.quene[this.quene.length -1]){
            this.quene.pop();
        }
        this.quene.push(newValue);
    }

    remove(value){
        // if(value === this.quene[0]){
            
        // }
        this.quene.shift();
        
    }

    getMax(){
        return this.quene[0];
    }
}


var maxSlidingWindow = function (nums, k) {
  let res = [];
  let window = new MaxQuene();

  for (let i = 0; i < nums.length; i++) {
    // 先填充k-1个元素 比如k是3 我一开始只填充2个
    if (i < k - 1) {
        window.add(nums[i]);
    }else{
        // 移入新的元素
        window.add(nums[i]);

        // 求最大值并加入结果数组
        res.push(window.getMax());

        // 将最后一个数从窗口前端移除
        window.remove(nums[i-k+1]);
    }
  }

  console.log(res);

  return res;
};

maxSlidingWindow([7,5,6,4,6,0],3);


var maxSlidingWindow1 = function (nums, k) {
    if (k == 0) return [];
    let res = [];
    let left = 0;
    let right = k - 1;
    let len = nums.length;
    while (right < len) {
        // Number.MIN_VALUE 属性表示在 JavaScript 中所能表示的最小的正值。
        let max = Number.MIN_SAFE_INTEGER;
        for (let i = left; i <= right; i++) {
            if (nums[i] > max) {
                max = nums[i];
            }
        }
        res.push(max);
        left++;
        right++;
    }
    return res;
};
maxSlidingWindow1([1,-1],1);