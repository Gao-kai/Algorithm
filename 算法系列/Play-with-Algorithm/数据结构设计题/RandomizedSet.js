/* 
随机读取元素
设计一个数据结构类，此数据结构插入、删除以及访问随机元素的时间复杂度都是O(1)

结合哈希表和数组，使得数组的删除操作时间复杂度也变成 O(1)

数组访问元素本来就是O1的复杂度？访问随机元素就生成随机索引然后进行访问即可
数组删除元素什么时候是O1复杂度？答案是元素在数组尾部的时候，如果在中间我们就需要将中间的元素和末尾元素进行交换，然后删除尾部元素
数组插入元素也是一样，从尾部插入的时候事件复杂度是O1
*/
// class RandomizedSet {
//     constructor(){
//         this.nums = [];
//         this.valueToIndex = {};
//     }

//     // 如果value不存在集合中，插入并返回true；如果已经存在直接返回false
//     insert(value){
//         // 已经存在直接返回false 0其实是存在的 但是会判断为不存在 要让其判断为存在
//         if(this.valueToIndex[value]){
//             return false;
//         }

//         // 如果没有存在 先记录当前插入进来的value对应在数组中的索引 永远是最后一位 因为从末尾插入
//         this.valueToIndex[value] = String(this.nums.length);
//         this.nums.push(value);
//         return true;
//     }

//     // 如果value不存在集合中，直接返回false；如果已经存在将其移除并返回true
//     remove(value){
//         if(!this.valueToIndex[value]){
//             return false;
//         }

//         // 获取要被移除的元素索引 [1,2,5,4,2]   3 - 2 5:2
//         let index = this.valueToIndex[value];
//         // 获取末尾元素索引
//         let last = this.nums.length -1;

//         // 改变末尾元素交换后的索引为index
//         this.valueToIndex[String(this.nums[last])] = index;

//         // 和末尾元素进行交换
//         let temp = this.nums[index];
//         this.nums[index] = this.nums[last];
//         this.nums[last] = temp;

//         // 交换完成从数组中pop 完成remove
//         this.nums.pop();

//         // 从valueToIndex中将value对应的索引移除
//         delete this.valueToIndex[value];

//         return true;
//     }

//     // 从集合中等概率的返回一个元素
//     getRandom(){
//         // 在nums索引区间0 - length-1随机抽取一个索引
//         let randomIndex1 = Math.floor(Math.random() * (max - min + 1));

//         return this.nums[randomIndex1];
//     }
// }

// let r = new RandomizedSet();
// r.insert(1);
// r.insert(2);
// r.insert(1);
// r.remove(1);
// console.log(r.nums,r.valueToIndex);


// let N = 6;
// let blackList = [1,3]
// // {1:4,0:3}
// function Solution(N,blackList){
//     let arr = new Array(N);
//     for (let i = 0; i < N; i++) {
//         arr[i] = i;
//     }
//     console.log(arr);


//     // 将blackList元素依次和数组末尾的元素交换，交换完成就将其从数组中移除，是为了O1复杂度把黑名单中元素从arr中移除出去
//     let mapping = {};
//     for(let b of blackList){
//         mapping[b] = true;
//     }

//     let last = N - 1;

//     /* 
//         mapping中存放的key都是黑名单数字，value就是黑名单数字假设移动为末尾之后的数组索引
//         这样一旦我们找到一个随机数，这个随机数的范围是0 - arr.length - blackList.length [0,3)
//         把黑名单的数字都移动到了sz - N这个区间内 左闭右开
//         把0 - sz中的黑名单数字映射到了正常数字
//     */
//     for(let b of blackList){
//         if(b >= arr.length - blackList.length){
//             continue;
//         }

//         while(mapping[last]){
//             last--;
//         }
//         mapping[b] = last;
//         last--;
//     }
// }

// function pick(){
//     // 白名单元素元素索引范围
//     let size = this.arr.length - this.blackList.length;

//     let randomIndex = Math.floor(Math.random() * (size));

//     if(mapping[randomIndex]){
//         return mapping[randomIndex];
//     }
//     return index;
// }


// console.log(Solution(N,blackList));

let N1 = 5; // [0,1,2,3,4]
let blackList1 = [1,2,3];
function random(N,blackList){
    this.whiteSize = N - blackList.length;
    this.map  = new Map();
    this.set = new Set();

    for(let b of blackList){
        this.set.add(b);
    }

    let i =  this.whiteSize; // 2
    
    for(let b of blackList){
        // 如果i大于黑名单中的元素
        if(b < i){
            // 那么继续判断这个i是不是也存在黑名单当中，如果存在不能添加到map中
            while(this.set.has(i)){
                i++;
            }
            this.map.set(b,i++);
        }
    }
}
random(N1,blackList1);