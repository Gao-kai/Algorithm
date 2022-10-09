/* 
    二分搜索法在查找左右边界的时候，其最终返回的left和right的规律
    进而得出满足条件的元素个数


    一个有趣的规律是：
    如果我们采用双闭区间写法
    那么while循环的终止条件必然是left<=right 也就是left == right +1的时候 终止循环
    所以在退出循环之后left总是比right大1

    找到一个值，那么左侧编辑返回值left = 5 right = 4 ，右侧编辑返回值left = 6 right = 5 
    找到两个值  left = 5 right = 4 右侧编辑  left = 8 right = 7  [5,6,7]  
    没有找到值  left = 5 right = 4  右侧left = 5 right = 4  4 - 5 + 1 = 0
    [1,2,2,5,5] 找10  

    题目要找边界，那我就返回边界索引
    题目要找个数，那我就返回最终边界索引区间
*/

/*
1. 确定x，fx和target是什么 x是数组索引，fx是数组索引对应的值，递增的，target是目标值
2. 写出fx方程
3. 确定x的取值范围 也就是查找空间
4. 确定是左侧边界查找还是右侧边界查找
5. 返回答案

piles = [6,15,5,10] x = 5
h = 6/5 = 1+1=2

piles是工厂里面有存放香蕉的仓库，每个仓库编号就是piles数组的索引，
没有仓库的值就是piles数组索引对应的值，表示这个仓库放了多少个香蕉

柯柯每小时可以吃K根香蕉
当k>仓库中香蕉个数的时候，会全部吃掉
当k<的时候 会得到下个小时再吃

x是小时数,f(x)就是每个小时柯柯将要吃掉的香蕉个数，target就是吃完所有香蕉时的x

[3,5,6,8] 每小时吃5个香蕉
从第一堆开始吃
如果可以吃完，那么h+1就好了
如果吃不完，那么需要 num / h  比如16/ 5 = 3.1 9/5 = 1.8
前者需要4小时 因为最后第4个小时吃只能吃那一堆剩下的一个 同一个小时不能跨堆吃
后者需要2小时 还是一样的道理

x是速度 一小时可以吃多少根
f是随着x递增而递减的总计吃完的时间，吃的速度快吃完的总时间就变小了
target就是吃完的时间不能超过的H，H是题目给的
*/

// function f(piles, x) {
//   let h = 0;
//   for (let i = 0; i < piles.length; i++) {
//     // h += Math.ceil(piles[i] / x);
//     h += Math.floor(piles[i] / x);
//     if (piles[i] % x > 0) {
//         h++;
//     }
//   }
//   console.log(h);
// }

// f([3, 5, 6, 8], 5);
// f([5, 10, 15, 20], 5);

// 合并算法的if-else分支

/**
 * 1. 每个小时吃香蕉的速度是k根/小时
 * 2. getHourBySpeed的作用是当速度为k的时候，多少个小时可以按照顺序吃完piles存放的所有香蕉
 * 3. 每一个小时只能吃同一堆香蕉
 *  如果一小时吃不完那么下一个小时接着吃这一堆
 *  如果一小时可以吃完那么吃完后就休息
 */
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // 设置吃香蕉速度的变化区间，只有速度是变量，最小一小时吃1个，最大一小时吃最大的一堆
  let left = 1;
  let right = Math.max.apply(null, piles);

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    // 当速度为mid的时候，吃完香蕉所需要的时间hours
    let hours = getHourBySpeed(piles, mid);
    if (hours == h) {
      right = mid - 1;
    } else if (hours > h) {
      // 说明吃的速度有点慢需要加快 那么取值范围应该从mid+1到right区间
      left = mid + 1;
    } else if (hours < h) {
      // 说明吃的速度有点快需要减缓 那么取值范围应该从left到mid-1
      right = mid - 1;
    }
  }

  return getHourBySpeed(piles, left) === h ? left : -1;
};

/**
 * 1. 每个小时吃香蕉的速度是k根/小时
 * 2. getHourBySpeed的作用是当速度为k的时候，多少个小时可以按照顺序吃完piles存放的所有香蕉
 * 3. 每一个小时只能吃同一堆香蕉
 *  如果一小时吃不完那么下一个小时接着吃这一堆
 *  如果一小时可以吃完那么吃完后就休息
 */
function getHourBySpeed(piles, k) {
  let hours = 0;
  for (let i = 0; i < piles.length; i++) {
    // piles[i]是每一堆香蕉的个数，k是每小时吃的个数
    // 举例:当piles[i] = 6，k=5，那么最少需要2小时吃完；
    //      当piles[i] = 3，k=5，那么需要1小时吃完；
    hours += Math.ceil(piles[i] / k);
  }
  return hours;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8));

/*
    D天内送完
    第i个包裹的重量是weight[i]
    每一天，都会按照给出重量的顺序装包裹送出去
    每次装的重量不超过船的最大重量

    求D天内将包裹送完需要的船的最小运载能力，多了就浪费了
    求h小时内将香蕉吃完所需要的最小速度，多了就吃撑了

    1. x是什么？
    x是吃香蕉的速度
    x是船的运载能力也就是船的容量

    2. fx是什么 getByRL(){}
    fx是基于吃香蕉的速度求出吃完香蕉所花费的时间hour
    fx是基于船的运载能力求出运完货物所需要的天数day

    3. fx - x的方程怎么写
    4. x的取值范围是多少：最小也是1，最大就设置为货物中的数组之和，一次全部给你装走
    5. 等于将问题转化为在数组[1,...,max]的范围中找出getDayByShip(ship)的值为D的那个ship，如果存在符合条件的多个ship
    那么需要找到最小的那个ship 也就是最小运力的轮船

*/
function getDayByShip(weights, ship) {
  let days = 0;
  for (let i = 0; i < weights.length; ) {
    let cap = ship;
    while (i < weights.length) {
      if (cap < weights[i]) {
        // 代表一趟拉不完 说明船的容量不行 直接g了
        break;
      } else {
        // 至少可以拉的下
        cap = cap - weights[i]; // 计算下一轮还可以装多少
        i++;
      }
    }
    days++;
  }
}

getDayByShip([1, 2, 3, 4, 5, 6, 7, 8], 9);
