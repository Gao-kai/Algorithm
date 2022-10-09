let m = [
  [3, 0, 1, 4],
  [5, 6, 3, 2],
  [1, 2, 0, 1],
  [4, 1, 0, 1],
];
/* 知道[r1,c1]坐标和[r2,c2]坐标 求这个子矩阵的元素之和 */
let [row1, col1] = [1, 1];
let [row2, col2] = [3, 3];

/* 暴力双循环求和 */
function NumMatrixSum(row1, col1, row2, col2) {
  // 行数就是二维数组的长度
  let rowLen = m.length;
  let sum = 0;

  // 遍历的行数是row1 - row2
  for (let i = row1; i < row2 + 1; i++) {
    // 列数就是每一行的长度
    let colLen = m[i].length;

    // 遍历的列数是col1 - col2
    for (let j = col1; j < col2 + 1; j++) {
      sum += m[i][j];
    }
  }
  console.log(sum);
}
NumMatrixSum(1, 1, 3, 3);

/* 
二维数组的前缀和数组
*/

function NumMatrix(matrix) {
  let m = matrix.length;
  if (m > 0) {
    let n = matrix[0].length;
    // 构建前缀和数组
    let preSumMatrix = new Array(m + 1)
      .fill(0)
      .map(() => new Array(n + 1).fill(0));


    // preSumMatrix[i][j]指的就是原二维数组中matrix[0,0]坐标点到matrix[i-1,j-1]坐标点组成的矩阵内所有元素之和
    // 由于preSumMatrix二维矩阵的第一列和第一行都是0 只是占位的
    // 所以构建preSumMatrix是从i=1，j=1开始，对呀的就是matrix[0,0]到matrix[i-1,j-1]的和
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        preSumMatrix[i][j] =
          preSumMatrix[i - 1][j] +
          preSumMatrix[i][j - 1] -
          preSumMatrix[i - 1][j - 1] +
          matrix[i - 1][j - 1];
      }
    }
    console.log("preSumMatrix", preSumMatrix);
    return preSumMatrix;
  }

  // let preSumMatrix = new Array(matrix.length+1);// [0,0,0,0]
  // for (let i = 0; i < preSumMatrix.length; i++) {
  //     preSumMatrix[i] = new Array(matrix.length+1);
  //     preSumMatrix[i][0] = 0;
  // }
  // preSumMatrix[0] = new Array(matrix.length+1).fill(0);
}

// [
//     [
//         [
//             [3,0,1,4,2],
//             [5,6,3,2,1],
//             [1,2,0,1,5],
//             [4,1,0,1,7],
//             [1,0,3,0,5]
//         ]
//     ]
// ]

// [
//     [
//         [
//             [-4,-5]
//         ]
//     ]
// ]

let x = [[-4, -5]];
NumMatrix(x);
function sumRange(r1, c1, r2, c2) {
  let preSumMatrix = NumMatrix(m);
  return (
    preSumMatrix[(r2 + 1, c2 + 1)] -
    preSumMatrix[(r1, c2 + 1)] -
    preSumMatrix[(r2 + 1, c2)] +
    preSumMatrix[(r1 + 1, c1 + 1)]
  );
}
