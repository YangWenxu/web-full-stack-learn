
class Stack {
    constructor() {
        this.items = []
    }

    push(item) {
        this.items.push(item)
    }

    pop() {
        return this.items.pop()
    }

    size() {
        return this.items.length
    }

    clear() {
        this.items = []
    }
}

function isBalance(symbol) {
    const stack = new Stack()
    const left = '{('
    const right = '})'
    let popValue
    let tag = true
  
    const match = function(popValue, current) {
      if (left.indexOf(popValue) !== right.indexOf(current)) {
        tag = false
      }
    }
  
    for (let i = 0; i < symbol.length; i++) {
      if (left.includes(symbol[i])) {
        stack.push(symbol[i])
      } else if (right.includes(symbol[i])) {
        popValue = stack.pop()
        match(popValue, symbol[i])
      }
    }
    return tag
  }
  console.log(isBalance('{{(({}))}}'))
  console.log(isBalance('{{(({})}}'))