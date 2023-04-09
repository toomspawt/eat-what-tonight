let s = """"

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
 var appendCharacters = function(s, t) {
    let current = 0;
    for (let i = 0; i<t.length; i++) {
        let found = false;
        for (let j = current; j<s.length; j++) 
            if (t[i] == s[j]) {
                found = true;
                current++;
                break;
            }
        if (!found) return t.length - current; 
    }
    return 0;
};

