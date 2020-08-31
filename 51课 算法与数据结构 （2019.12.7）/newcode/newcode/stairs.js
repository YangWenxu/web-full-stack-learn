function stairs(n) {
    if(n === 0) {
        return 1;
    } else if (n < 0) {
        return 0
    }
    else {
        return stairs(n-1) + stairs(n-2)
    }
}
console.log(stairs(10))