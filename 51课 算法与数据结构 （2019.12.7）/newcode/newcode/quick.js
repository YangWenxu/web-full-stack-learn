function quickSort(arr) {
    if(arr.length <= 1) {
        return arr;  //递归出口
    }
    var left = [],
        right = [],
        current = arr.splice(0,1); //注意splice后，数组长度少了一个
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < current) {
            left.push(arr[i])  //放在左边
        } else {
            right.push(arr[i]) //放在右边
        }
    }
    return quickSort(left).concat(current,quickSort(right)); //递归
}
console.log(quickSort([11,4,3,6,1,9,7,2,0]))

// 原地版
function quickSort1(arr, low = 0, high = arr.length - 1) {
    if(low >= high) return
    let left = low
    let right = high
    let temp = arr[left]
    while(left < right) {
        if(left < right && temp <= arr[right]) {
            right --
        }
        arr[left] = arr[right]
        if(left < right && temp >= arr[left]) {
            left ++
        }
        arr[right] = arr[left]
    }
    arr[left] = temp
    quickSort1(arr, low, left - 1)
    quickSort1(arr, left + 1, high)
    return arr
}
console.log(quickSort1([11,4,3,6,1,9,7,2,0]))
