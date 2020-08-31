class Node{
    constructor(element){
        this.element = element
        this.next = null
    }
}

class LinkedList{
    constructor(){
        this.head = null
        this.current
        this.length = 0
    }

        append(element){
            const node = new Node(element)
            if (this.head === null) {       // 插入第一个链表
              this.head = node
            } else {
              this.current = this.head
              while (this.current.next) {     // 找到最后一个节点
                this.current = this.current.next
              }
              this.current.next = node
            }
            this.length++
    }
        // 移除指定位置元素
        removeAt(position) {
            if (position > -1 && position < this.length) {
              let previous
              let index = 0
              if (position === 0) {         // 如果是第一个链表的话, 特殊对待
                this.head = this.head.next
              } else {
                this.current = this.head
                while (index < position) {  // 循环找到当前要删除元素的位置
                  previous = this.current
                  this.current = this.current.next
                  index++
                }
                previous.next = this.current.next
              }
              this.length--
            }
          }
            // 在指定位置加入元素
    insert (position, element) {
        const node = new Node(element)
        let index = 0
        let current, previous
        if (position > -1 && position < this.length + 1) {
          if (position === 0) { // 在链表最前插入元素
            current = this.head
            this.head = node
            this.head.next = current
          } else {
            current = this.head
            while (index < position) { // 同 removeAt 逻辑, 找到目标位置
              previous = current
              current = current.next
              index++
            }
            previous.next = node       // 在目标位置插入相应元素
            node.next = current
          }
          this.length++
        }
      }
    

    // 链表中是否含有某个元素, 如果有的话返回相应位置, 无的话返回 -1
    indexOf(element) {
        let index = 0
        this.current = this.head
        while (index < this.length) {
          if (this.current.element === element) {
            return index
          }
          this.current = this.current.next
          index++
        }
        return -1
      }
    
      // 移除某元素
      remove(element) {
        const position = this.indexOf(element)
        this.removeAt(position)
      }
    
      // 获取大小
      size () {
        return this.length
      }
    
      // 获取最开头的链表
      getHead () {
        return this.head
      }
    
      // 是否为空
      isEmpty () {
        return this.length === 0
      }
    
      // 打印链表元素
      log () {
        this.current = this.head
        let str = this.current.element
        while (this.current.next) {
          this.current = this.current.next
          str = str + ' ' + this.current.element
        }
        console.log(str)
        return str
      }
}
  
  // 测试用例
  var linkedList = new LinkedList()
  linkedList.append(5)
  linkedList.append(10)
  linkedList.append(15)
  linkedList.append(20)
  linkedList.log()         // '5 10 15 20'
  linkedList.removeAt(1)
  linkedList.log()         // '5 15 20'
  linkedList.insert(1, 10)
  linkedList.log()
 