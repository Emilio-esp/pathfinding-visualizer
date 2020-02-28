import store from '../store';

const START_NODE_COL = 8,
    START_NODE_ROW = 8,
    TARGET_NODE_COL = 50,
    TARGET_NODE_ROW = 8;

const generateGrid = (grid = []) => {
    
    if ( !grid.length ) {
        // console.log(grid);
        let cantRows = 16,
        cantColumns = 54;
        
        for (let i = 0; i < cantRows; i++) {
            let rows = [];
            
            for (let j = 0; j < cantColumns; j++) {
                rows.push(createNodeProps(i, j))
            }
            grid.push(rows)
        }
    }
    
    return {
        type: "CREATE_GRID",
        payload: grid
    }
}

const createNodeProps = (row, col) => {
    let isStart = col === START_NODE_COL && row === START_NODE_ROW;
    let isTarget = col === TARGET_NODE_COL && row === TARGET_NODE_ROW;
    let node =  {
        col,
        row,
        isStart,
        isTarget,
        distance: isStart ? 0 : Infinity,
        isVisited: false,
        isWall: false,
        previusNode: null,
        g:0,
        h:0
    }

    if (isStart) {
        store.dispatch(setNode("SET_START_NODE", node))
    }else if (isTarget) {
        store.dispatch(setNode("SET_TARGET_NODE", node))
    }

    return node

}

const setNode  = (type, payload)=>{
    return {
        type,
        payload
    }
}

const setWall = (type, payload) => {
    return{
        type,
        payload
    }
}

const setStateOfAlgorithm = (state) => {
    return {
        type: "SET_STATE_ALGORITHM",
        payload: state
    }
}


export {
    generateGrid,
    setWall,
    setNode,
    setStateOfAlgorithm
}