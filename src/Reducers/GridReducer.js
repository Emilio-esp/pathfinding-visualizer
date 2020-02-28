const createGridReducer = (grid = [], action) => {
    if (action.type === "CREATE_GRID") {
        return action.payload
    }

    return grid;
}

const setStartNode = (node = [], action) => {
    if (action.type === "SET_START_NODE") {
        return action.payload
    }
    return node;
}

const setTargerNode = (node = [], action) => {
   
    if(action.type === "SET_TARGET_NODE") {
        return action.payload
    }
    return node;
}

const stateWall = (stateWall= false, action) => {
    if (action.type === "SET_WALL") {
        return action.payload
    }else if (action.type === "UNSET_WALL") {
        return action.payload
    }

    return stateWall
}

export{
    createGridReducer,
    setStartNode,
    setTargerNode,
    stateWall
}