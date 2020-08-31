// 找零

class Change{
    constructor(changeType){
        this.changeType = changeType
        this.cache = {}
    }
    makeChange (amount) {
        let min = []
        if (!amount) {
          return []
        }
        if (this.cache[amount]) {   // 读缓存
          return this.cache[amount]
        }
      
        for (let i = 0; i < this.changeType.length; i++) {
          const leftAmount = amount - this.changeType[i]
          let newMin
          if (leftAmount >= 0) {
            newMin = this.makeChange(leftAmount) // 这一句是动态规划的提现
          }
          if (leftAmount >= 0
            && (newMin.length < min.length - 1 || !min.length)) { // 如果存在更小的找零硬币数, 则执行后面语句
            min = [this.changeType[i]].concat(newMin)
          }
        }
        return this.cache[amount] = min
      }
}


const change = new Change([1, 5, 10, 20,50,100])

console.log(change.makeChange(2))  
console.log(change.makeChange(5))  
console.log(change.makeChange(13))  
console.log(change.makeChange(35))  
console.log(change.makeChange(135))  
console.log('-'.repeat(100))
const change1 = new Change([1, 3, 4])

console.log(change1.makeChange(6)) // 其实33最好