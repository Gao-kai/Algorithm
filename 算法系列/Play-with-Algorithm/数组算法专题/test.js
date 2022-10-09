/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let needsMap = {};
    let windowMap = {};
    for (let v of t) {
        needsMap[v] ? needsMap[v]++ : needsMap[v] = 1;
        windowMap[v] = 0;
    }

    let left = right = 0;
    let startIndex = 0;
    let len = Number.MAX_VALUE;

    let validCharCount = 0;
	debugger;
    while (right < s.length) {
        let c = s[right];
        right++;
        if (needsMap[c]) {
            windowMap[c]++;
            if (windowMap[c] == needsMap[c]) {
                validCharCount++;
            }
        }

        // 只有validCharCount的值等于needsMap中key的个数的时候满足条件
        while (validCharCount == Object.keys(needsMap).length) {
            if (right - left < len) {
                startIndex = left;
                len = right - left;
            }

            let r = s[left];
            left++;
            if (needsMap[r]) {
                if (windowMap[r] == needsMap[r]) {
                    validCharCount--;
                }
                 windowMap[c]--;
            }
        }
    }

    return len == Number.MAX_VALUE ? "":s.substr(startIndex,len);

};

minWindow("ADOBECODEBANC","ABC")