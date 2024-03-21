const quick = (num) => {
    if (num.length < 2) {
        return num
    }
    else {
        var left = [];
        var right = [];
        var value = Math.floor(num.length / 2)
        var base = num.splice(value, 1)[0]
        // console.log(base);
        // console.log(num);
        for (let i = 0; i < num.length; i++) {
            if (num[i] < base) {
                left.push(num[i])
            }
            else right.push(num[i])
        }
        // console.log(left);
        // console.log(right);


    }
    console.log(base);
    return quick(left).concat([base], quick(right))

}
console.log(quick([1, 34, 5, 76, 8, 6, 9, 7, 6, 3]));