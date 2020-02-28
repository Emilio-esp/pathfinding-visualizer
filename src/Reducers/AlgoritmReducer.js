const algorithmIsRunning = (isRunning = false , action )=>{
    if (action.type === 'SET_STATE_ALGORITHM') {
        return action.payload
    }

    return isRunning
}

export {
    algorithmIsRunning
}