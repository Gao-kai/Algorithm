/* 
    将二维数组顺时针旋转90度
    思路：
    1. 先从左上到右下对角线进行镜像对称
    2. 再将每一行进行反转

    算法的关键点：
    1. 遍历每一列的时候j==i
    保证了每一轮循环的遍历顺序从原来的：
    i = 0的时候，j=012: [0,0] [0,1] [0,2]
    i = 1的时候，j=012: [1,0] [1,1] [1,2]
    i = 2的时候，j=012: [2,0] [2,1] [2,2]

    变成了：
    i = 0的时候，j=012: [0,0] [0,1] [0,2]
    i = 1的时候，j=12:  [1,1] [1,2]
    i = 2的时候，j=2:   [2,2]

    这是二维数组使用的一个很常见的遍历方法。为什么这样写呢？
    原因是第i=0行的元素按照镜像对称的原因会和第j=0列的元素全部对换元素值
    如果j不随着i的递增而递增，当下一轮循环i=1来的时候，j还是从0开始，那么之前换过来的[0,1]又会被换回去，所以这里要这样写
*/
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
function rotate1(matrix) {
  // 由于是二维矩阵 求一个行的长度，每一行对应列的长度是相等的
  let len = matrix.length;

  for (let i = 0; i < len; i++) {
    // 最关键的在j的初始值是i,保证了第i行整行的元素和第i列元素交换之后，这些元素不会再被处理又还回去
    for (let j = i; j < len; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // 将每一行的数组元素进行翻转
  for (let i = 0; i < len; i++) {
    let rowList = matrix[i];
    let left = 0;
    let right = rowList.length - 1;
    while (left < right) {
      let temp = rowList[left];
      rowList[left] = rowList[right];
      rowList[right] = temp;
      left++;
      right--;
    }
  }
}
// rotate1(matrix);

/* 
    将二维数组逆时针旋转90度
    思路同顺时针但是是从左下到右上进行镜像对称
    所以第1行的元素都要映射到最后一列去
*/
function rotate2(matrix) {
  let len = matrix.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[len - 1 - j][len - 1 - i];
      matrix[len - 1 - j][len - 1 - i] = temp;
    }
  }

  // 将每一行的数组元素进行翻转
  for (let i = 0; i < len; i++) {
    let rowList = matrix[i];
    let left = 0;
    let right = rowList.length - 1;
    while (left < right) {
      let temp = rowList[left];
      rowList[left] = rowList[right];
      rowList[right] = temp;
      left++;
      right--;
    }
  }

  return matrix;
}
console.log(rotate2(matrix));

/* 
 顺时针输出螺旋矩阵到一个一维数组中
*/
var spiralOrder = function (matrix) {
  let m = matrix.length;
  let n = matrix[0].length;

  let top = 0;
  let low = m - 1;
  let left = 0;
  let right = n - 1;

  let res = [];
  // 核心条件：只有当结果数组中的元素大于m*n的时候才退出循环
  while (res.length < m * n) {
    // 首先从左到右遍历顶部这一行的元素 遍历完成之后将上边界下移 注意其实取得是第一行每一列的元素
    if (top <= low) {
      for (let j = left; j <= right; j++) {
        res.push(matrix[top][j]);
      }
      top++;
    }

    // 其次从上到下遍历右边这一列的元素 遍历完成之后将有边界左移 注意行遍历用i
    if (left <= right) {
      for (let i = top; i <= low; i++) {
        res.push(matrix[i][right]);
      }
      right--;
    }

    // 然后从右到左遍历底部这一行的元素 遍历完成之后将下边界上移
    if (top <= low) {
      for (let j = right; j >= left; j--) {
        res.push(matrix[low][j]);
      }
      low--;
    }

    // 最后从下到上遍历左边这一列的元素 遍历完成之后将左边界右移
    if (left <= right) {
      for (let i = low; i >= top; i--) {
        res.push(matrix[i][left]);
      }
      left++;
    }
  }

  console.log(res);
};
/* spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]); */

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let top = 0;
  let low = n - 1;
  let left = 0;
  let right = n - 1;
  // 先构造出来一个全是0的二维矩阵
  let metrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let number = 1;
  // 如果number小于n*n说明还没有生成完  需要继续输出
  while (number <= n * n) {
    // 上
    if (top <= low) {
      for (let j = left; j <= right; j++) {
        metrix[top][j] = number;
        number++;
      }
      top++;
    }

    // 右
    if (left <= right) {
      for (let i = top; i <= low; i++) {
        metrix[i][right] = number;
        number++;
      }
      right--;
    }

    // 下
    if (top <= low) {
      for (let j = right; j >= left; j--) {
        metrix[low][j] = number;
        number++;
      }
      low--;
    }

    // 左
    if (left <= right) {
      for (let i = low; i >= top; i--) {
        metrix[i][left] = number;
        number++;
      }
      left++;
    }
  }
  return metrix;
};

generateMatrix(3);

/* 
304.二维区域和检索 - 矩阵不可变
*/
var NumMatrix = function (matrix) {
  // 构建出来一个前缀和组成的二维矩阵数组
  let len = matrix.length;

  let preSumMatrix = new Array(len + 1)
    .fill(0)
    .map(() => new Array(len + 1).fill(0));
  // 给preSumMatrix填充元素 规定preSumMatrix[i][j]就是原二维矩阵中从原点(0,0)开始到(i-1,j-1)两点间组成矩形的所有元素之和
  for (let i = 1; i <= preSumMatrix.length; i++) {
    for (let j = 1; j <= preSumMatrix.length; j++) {
      preSumMatrix[i][j] =
        preSumMatrix[i - 1][j] +
        preSumMatrix[i][j - 1] +
        matrix[i - 1][j - 1] -
        preSumMatrix[i - 1][j - 1];
    }
  }
};

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return (
    this.preSumMatrix[row2 + 1][col2 + 1] -
    this.preSumMatrix[row1][col2 + 1] -
    this.preSumMatrix[row2 + 1][col1] +
    this.preSumMatrix[row1][col1]
  );
};
