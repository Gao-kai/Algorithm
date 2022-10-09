/**
 * 插入排序
 * 1. 假设第一个元素是排好的，也就是必须得有一张起始的牌
 * 2. 后面每次只抓一张新的牌，然后和前面已经排好的元素倒序依次进行对比
 * 3. 如果当前牌比某个元素大，则代表是不用排了，就好比前面你抓了789，当前来了一张10，那么直接break即可
 * 4. 如果比某个元素小，那么就要找到合适的插入的位置position，然后将牌插入进去
 *    比如抓了369，当前来了8，那么需要插入到索引为2的地方，也就是原来索引为2的9需要向后挪一个位置即可
 * 5. 插入排序的核心就是每次抓一张牌，然后倒序和前面已经排好序的每一个牌进行对比，找到自己合适的插入位置p，然后插入即可。
 */
function insertSort(array) {
  if (array.length < 2 || !Array.isArray(array)) {
    return array;
  }

  // 从i=1开始遍历，就是默认了i=0的是起始牌
  for (let i = 1; i < array.length; i++) {
    // 抓新牌
    let temp = array[i];
    // 记录新牌的待插入位置
    let position = i;

    for (let j = i; j > 0; j--) {
      // arr[j-1]就是距离新牌最近的那张牌 arr[j]就是新牌
      if (array[j - 1] > temp) {
        // 既然最近的这张牌比新牌大 说明新牌小 那么需要插入到当前这张牌的位置 更新插入位置 并且当前这张牌挪到新牌的位置
        array[j] = array[j - 1];
        position--;
      }else{
        // 如果最近的这张牌比新牌小 那么前面所有排好序的都肯定比新牌小 没有必要再排序了 插入到当前抓牌的位置即可
        break;
      }
    }
    // 执行最终的插入
    array[position] = temp;
  }

  return array;
}


console.log('insertSort',insertSort(testCase));
