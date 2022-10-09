/* 
1. 字符串的字典序意思就是英文单词在字典中的先后顺序
在计算机领域，两个英文单词的字典序大小取决于从左到右第一个不同字符的ASCII值的大小
比如：abc的字典序是小于abd的
     c100的字典序是小于z200的
     比较的从左到右的第一个不同字符的ASCII值的大小
      小写字母a-z的ASCII值范围是[97,122]
      大写字母A-Z的ASCII值范围是[65,90]

      
2. 要求给你一个全小写字符串，首先去重，然后保证返回的字符串在s中出现的顺序一致，还有保证返回结果的字典序太小
    'bcabc' 去重结果2个;'bca'或者'abc'  保证字典序最小 那就是abc
*/
let str1 = 'bcabc'; 
// [b,c,a]
function removeDuplicateLetters(str){
    let hashMap = {};
    for(let char of str){
        hashMap[char]? hashMap[char]++:hashMap[char]=1;
    }
    console.log('hashMap',hashMap)

    let inStack = {};
    let stack = [];

    for(let s of str){
        hashMap[s]--;

        if(inStack[s]){
            continue;
        };


       while(stack.length > 0 && stack[stack.length-1] > s ){
        // 如果这个栈顶元素后面还会出现 就可以pop 否则不可以pop
            if(hashMap[stack[stack.length-1]]==0){
                // 后面不会再有栈顶元素了 不能pop
                break;
            }
            inStack[stack[stack.length-1]] = false;
            stack.pop();
            
       }

        stack.push(s);
        inStack[s] = true;
    }

    console.log(stack);


    return stack.join("");
}
removeDuplicateLetters('cbacdcbc');