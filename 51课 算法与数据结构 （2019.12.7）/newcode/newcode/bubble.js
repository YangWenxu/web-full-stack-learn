function bubleSort(arr) {
    var len = arr.length-1
    for (let outer = 0 ;  outer<= len; outer++) {
        for(let inner = 0; inner <=outer; inner++) {
            if(arr[inner] > arr[inner + 1]) {
                [arr[inner],arr[inner+1]] = [arr[inner+1],arr[inner]]
            }
        }
    }
    return arr
}

console.log(bubleSort([11,4,3,6,1,9,7,2,0]))
