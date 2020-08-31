function insertSort(arr) {
    for(let outer = 1; outer < arr.length; outer++) {  //外循环从1开始，默认arr[0]是有序段
        for(let inner = outer; inner > 0; inner--) {  //j = i,将arr[j]依次插入有序段中
            if(arr[inner] < arr[inner-1]) {
                [arr[inner],arr[inner-1]] = [arr[inner-1],arr[inner]];
            } else {
                break;
            }
        }
    }
    return arr;
}


console.log(insertSort([11,4,3,6,1,9,7,2,0]))
