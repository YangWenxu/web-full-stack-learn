function binarySearch(arr, target) {
    var low = 0,
        high = arr.length - 1,
        mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (target === arr[mid]) {
            return `找到了${target},在第${mid + 1}个`
        }
        if (target > arr[mid]) {
            low = mid + 1;
        } else if (target < arr[mid]) {
            high = mid - 1;
        }
    }
    return -1
}

function binarySearch1(arr,target,low = 0,high = arr.length - 1) {
    const n = Math.floor((low+high) /2);
    const cur = arr[n];
    if(cur === target) {
        return `找到了${target},在第${n+1}个`;
    } else if(cur > target) {
        return binarySearch1(arr,target,low, n-1);
    } else if (cur < target) {
        return binarySearch1(arr,target,n+1,high);
    }
    return -1;
}

console.log(binarySearch([1,2,3,4,5,7,9,11,14,16,17,22,33,55,65],4))
console.log(binarySearch1([1,2,3,4,5,7,9,11,14,16,17,22,33,55,65],4))