export function setMessageList(data) {
    return {
        type: 'INIT_MESSAGE_LIST',
        data
    }
}

export function updateMessageList(data) {
    return {
        type: 'UPDATE_MESSAGE_LIST',
        data
    }
}