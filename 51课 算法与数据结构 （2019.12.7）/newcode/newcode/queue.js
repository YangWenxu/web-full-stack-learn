
class Queue {
    constructor() {
        this.items = []

    }

    push(item) {
        this.items.push(item)
    }

    shift() {
        return this.items.shift()
    }

    size() {
        return this.items.length
    }

    clear() {
        this.items = []
    }
}
