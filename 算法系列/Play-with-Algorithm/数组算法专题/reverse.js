/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function (s) {
    s1 = removeSpace(s);
    console.log('s-1',s1,s1.length);

     
    let temp = s1.split("");
     let l = 0;
    let r = s1.length - 1;
    swap(temp, l, r);


    function swap(arr, start, end) {
        while (start < end) {
            let temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    let start = 0;
    let end = -1;
   
    for (let i = 0; i <= temp.length; i++) {
        console.log('temp',temp)
        if (temp[i] == " " || i == temp.length) {
            swap(temp,start,i-1);
            start = i + 1;
        }
    }

    return temp.join("");
};

// eg:"  abc  cba de  "
// "a" s = 1 i = 3 "ab" s = 2 i = 4 "abc" s = 3 i = 5
// "abc cba de" s = 4
function removeSpace(str) {
    let res = "";
    let slow = 0;
    for (i = 0; i < str.length; i++) {
        // 删除所有空格
        if (str[i] !== " ") {
            if (slow != 0) {
                res += " ";
                slow++;
            }
            while (i < str.length && str[i] !== " ") {
                res += str[i];
                slow++;
                i++;
            }
        }
    }
    return res;
}

reverseWords("  hello world  ")