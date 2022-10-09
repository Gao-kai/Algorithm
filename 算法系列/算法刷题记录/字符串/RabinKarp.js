/**
 * @param {string} s
 * @return {string[]}
 */
 var findRepeatedDnaSequences = function (s) {
    let DNACharToNum = [];
    let numToChar = {};
    // 分别将四个字母映射到十进制的1、2、3、4
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        switch (char) {
            case "A":
                DNACharToNum[i] = 1;
                numToChar[1] = "A";
                break;
            case "C":
                DNACharToNum[i] = 2;
                numToChar[2] = "C";
                break;
            case "G":
                DNACharToNum[i] = 3;
                numToChar[3] = "G";
                break;
            case "T":
                DNACharToNum[i] = 4;
                numToChar[4] = "T";
                break;
        }
    }

    let left = 0;
    let right = 0;
    let windowHash = 0; // 记录当前窗口中数值hash
    let subStrMap = {};
    let L = 10; // 长度为10
    let R = 10; // 进制为10进制

    let result = new Set();
    while (right < DNACharToNum.length) {
        // 将要加入窗口hash的数值
        let appendVal = DNACharToNum[right];

        // 等于将一个数字添加到原有数字的最低位 12345 => 123456 = 12345 * 10 + 6
        windowHash = windowHash * R + appendVal;
        right++;

        if (right - left == L) {
            if (subStrMap[windowHash]) {
                result.add(windowHash.toString());
            } else {
                subStrMap[windowHash] = true;
            }

            // 将要移除出窗口hash的数值
            let removeVal = DNACharToNum[left];
            // 等同于将一个十位数的最高位移除 1234567890 => 234567890 = 1234567890 - 1 * 10^9
            windowHash = windowHash - removeVal * Math.pow(R, L - 1);
            left++;
        }
    }

    let res = [];
    for(let nums of result){
        let temp = '';
        for(let num of nums){
            temp += numToChar[num];
        }
        res.push(temp);
    }
  
    return res;

};