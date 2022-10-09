/**
 * 选择排序
 * 原理：每一轮外层循环都需要找到当前剩余数组中的最小值，并排在最左边；
 * 随着外层循环i的增大，前面的元素都是排好的，只需要找后面没有排好的元素中的最小值然后
 * @param {*} array
 */
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    // 假设每一轮的起始第一个值为最小值，记录其索引
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      // 在剩余的所有数组中找看是否有比minIndex位置的值更小的值，如果有更新索引
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    // 然后将这一轮找到的minIndex位置的值和arr[i]的值进行交换即可
    if(minIndex !== i){
        swap(array,i,minIndex);
    }
  }

  return array;
}

/**
 * 基于ES6的解构赋值快速的交换数组中i和j位置的值
 */
function swap(array,i,j){
    [array[j],array[i]] = [array[i],array[j]];
}

console.log('selectionSort',selectionSort(testCase));
