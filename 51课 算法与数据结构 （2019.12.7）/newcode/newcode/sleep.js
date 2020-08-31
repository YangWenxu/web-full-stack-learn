const list = [11,4,3,6,1,9,7,2,0]
const newList = []
list.forEach(item => {
    setTimeout(function () {
        newList.push(item)
        if(newList.length===list.length){
            console.log(newList)
        }
	}, item * 100)
})

