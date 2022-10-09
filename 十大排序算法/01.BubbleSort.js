/**
 * 冒泡排序
 *
 * 1.外层for循环在冒泡排序中循环或者说扫描数组的次数是固定的
 * 比如一个6个值的数组必须就是要扫描5遍才可以确定最终的结果
 * 因为每一遍外层的循环扫描都只能确定一个当前剩余数组中的最大值。外层扫描的次数固定是arr.length-1
 *
 * 2.而每一次扫描需要进行多少次相邻元素的对比，这个次数不是固定的。
 * 因为每一轮外层扫描结束之后，下一轮需要扫描的元素就会-1，那么自然就会少一次相邻元素的对比。
 * 内层对比的次数和外层扫描到第几轮(i)有关，规律是arr.length-1-i次比较。
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    console.log("第" + (i + 1) + "轮扫描开始");

    let isSorted = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // 如果一次都沒有发生交换 说明已经是排序好的；如果发生交换，那么isSorted的值就是fasle，代表还未排序结束
        isSorted = false;
      }
    }

    if (isSorted) {
      console.log("第" + (i + 1) + "轮扫描结束,检测到当前数组已排序");
      break;
    }

    console.log("第" + (i + 1) + "轮扫描结束,当前数组排序结果为" + arr);
  }
  return arr;
}

/* 优化版本 记录最后一次交换的位置 */
function bubbleSort1(arr) {
  // 循环的轮数
  let times = arr.length - 1;
  for (let i = 0; i < times; i++) {
    console.log("第" + (i + 1) + "轮扫描开始");

    // 从sortedIndex之后的所有元素都是排好序的
    let sortedIndex = 1;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // 每一次交换都更新最后一次交换的位置 sortedIndex
        sortedIndex = j + 1;
      }
    }

    times = sortedIndex;

    console.log("第" + (i + 1) + "轮扫描结束,当前数组排序结果为" + arr);
  }
  return arr;
}

console.log(bubbleSort(testCase));