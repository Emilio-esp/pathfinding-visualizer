import store from "../store";
import { setStateOfAlgorithm } from '../actions'

function dijkstra(grid, start, end) {
    store.dispatch(setStateOfAlgorithm(true))
    // console.log(store.getState().algorithmIsRunning);
    let toDispatch = dijkstraHelper(grid, start, end);
    let path = getPath(grid, start, end);
    
    handleToDispatch(toDispatch, path)
    
    return toDispatch
}

function getPath(grid, start, end) {
    let path = [];

    if (end.distance === Infinity) {
        return path
    }

    while (!end.isStart) {
        let currentNode = end;

        path.unshift(currentNode);

        end = grid[currentNode.previusNode[0]][currentNode.previusNode[1]]
    }

    path.unshift(start)

    return path
}

function getNeighbors(grid, node) {
    let nodeAdjacency = [];
    
    let listNodes = {
        next: [node.row, node.col + 1],
        down: [node.row + 1, node.col],
        previus: [node.row, node.col - 1],
        up: [node.row - 1, node.col ]
    };
    
    
    for (const key in listNodes) {
        let row = listNodes[key][0],
            col = listNodes[key][1];

        if (row < 16 && col < 54 && row >= 0 && col >= 0) {
            let n = grid[row][col]
            if (!n.isVisited && !n.isWall) {
                nodeAdjacency.push(n);
            }
        }
    }
    return nodeAdjacency
}

function dijkstraHelper(grid, start, end){
    let visited = [],
        smallest = start,
        listWillVisit = [];
        visited.push(smallest)
    
    while (true) {
        let listNeighbors = getNeighbors(grid,smallest);
        // console.log(listNeighbors);
        
        //update Wheights for loop

        for (let i = 0; i < listNeighbors.length; i++) {
            let currentNode = listNeighbors[i]
            

            if (!currentNode.isVisited) {
                let wheight = smallest.distance + 1;

                if (wheight < currentNode.distance) {
                    listWillVisit.push(currentNode);
                    visited.push(currentNode)
                    currentNode.distance = wheight;
                    currentNode.previusNode = [smallest.row, smallest.col];
                    grid[currentNode.row][currentNode.col] = currentNode
                }
            }
        }
        

        grid[smallest.row][smallest.col].isVisited = true;
        

        if (!listWillVisit.length) return visited

        smallest = listWillVisit.shift();

        if (grid[smallest.row][smallest.col].isTarget === grid[end.row][end.col].isTarget) {
            let targetIdx = visited.indexOf(smallest);
            visited = visited.slice(0,targetIdx)
            visited.push(end)
            return visited;
             
        }
        

        
    }
}

function handleToDispatch(toDispatch, path) {

    for (let i = 0; i < toDispatch.length; i++) {
       setTimeout(() => {
           let node = toDispatch[i]

           let row = node.row,
               col = node.col;
           let nodeEl = document.getElementById(`${row}-${col}`);
           nodeEl.classList.add('visited');

           if (i=== toDispatch.length-1) {
               handlePath(path)
               return
           }
           
       }, 20*i);
        
    }
}


function handlePath(path) {
    if (!path.length) {
        store.dispatch(setStateOfAlgorithm(false))
        // console.log(store.getState().algorithmIsRunning);
        return
    }
    let node = path.shift()

    let row = node.row,
        col = node.col;
    let nodeEl = document.getElementById(`${row}-${col}`);
    nodeEl.classList.remove('visited');
    document.getElementById(`${row}-${col}`).classList.add('path');
    
    setTimeout(() => {
        handlePath( path)
    }, 15);
}

export default dijkstra
