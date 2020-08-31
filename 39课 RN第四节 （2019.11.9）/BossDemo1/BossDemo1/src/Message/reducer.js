const initalState = {
    page: 1,
    list: []
}

export default function messageList(state=initalState, action) {

    switch(action.type) {
        case 'INIT_MESSAGE_LIST': {
            const result = {...state, ...action.data};
            return result;
        }
        case 'UPDATE_MESSAGE_LIST': {
            const result = {...state, ...action.data};
            return result;
        }
        default: 
            return state;
    }

}