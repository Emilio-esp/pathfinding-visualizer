function aSearch(grid, start, target) {
    let newGrid = grid.slice(0)
    let toDispatch = ASearchHelper(newGrid, start, target);
    console.log(toDispatch);
    
    handleToDispatch(toDispatch);
}


function getNeighbors(grid, node) {
    let nodeAdjacency = [];

    let listNodes = {
        next: [node.row, node.col + 1],
        down: [node.row + 1, node.col],
        previus: [node.row, node.col - 1],
        up: [node.row - 1, node.col]
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

function addListOpen(arr) {
    let nodes = {};

    for (let i = 0; i < arr.length; i++) {
        nodes[String(arr[i].row).concat(arr[i].col)] = arr[i];    
    }

    return nodes
}

function ASearchHelper(grid, start, target) {
    let listOpen = {},
    visited = [],
    listClosed = {},
    smallest,
    evaluateArr = [];
    let condition;
    let smallValue = start;
    let otro=0;

    while (true) {
        smallest = smallValue;        

        let neighborsNodes = getNeighbors(grid, smallest);

        while (neighborsNodes.length === 0) {
            let newObj = Object.keys(listOpen)[0];
            smallest = listOpen[newObj]; 
            listClosed[newObj] = smallest
            delete listOpen[newObj];
            neighborsNodes = getNeighbors(grid, smallest);
        }
        console.log(neighborsNodes);

        condition = true;
        evaluateArr = [];
        for (let i = 0; i < neighborsNodes.length; i++) {

            if (listOpen[(String(neighborsNodes[i].row).concat(neighborsNodes[i].col))]) {
                let currentNode = grid[neighborsNodes[i].row][neighborsNodes[i].col];
                // console.log(currentNode);

                let currentG = currentNode.g + smallest.g;
                
                if (currentG < currentNode.g) {
                    console.log(String(smallValue.row).concat(smallValue.col) + " : " + String(neighborsNodes[i].row).concat(neighborsNodes[i].col));

                    neighborsNodes[i].g = currentG;
                    neighborsNodes[i].distance = neighborsNodes[i].g + neighborsNodes[i].h;
                    neighborsNodes[i].previusNode = [smallest.row, smallest.col]
                    grid[neighborsNodes[i].row][neighborsNodes[i].col] = neighborsNodes[i];
                    smallValue = neighborsNodes[i]
                    console.log("break");
                    visited.push(neighborsNodes[i])
                    condition = false;
                    break
                }


            }else if (!listOpen[(String(neighborsNodes[i].row).concat(neighborsNodes[i].col))]) {
                
                neighborsNodes[i].g = smallest.g + 10;
                neighborsNodes[i].h = Math.abs(target.row - neighborsNodes[i].row) + Math.abs(target.col - neighborsNodes[i].col)
                neighborsNodes[i].distance = neighborsNodes[i].g + neighborsNodes[i].h;
                neighborsNodes[i].previusNode = [smallest.row, smallest.col]
                grid[neighborsNodes[i].row][neighborsNodes[i].col] = neighborsNodes[i];
                listOpen = Object.assign( listOpen, addListOpen([neighborsNodes[i]]));

                if (grid[neighborsNodes[i].row][neighborsNodes[i].col].isTarget === grid[target.row][target.col].isTarget) {
                    console.log(listClosed);
                    listClosed = Object.assign(listClosed, addListOpen([neighborsNodes[i]]))
                    return visited;

                }
                visited.push(neighborsNodes[i])
                evaluateArr.push(neighborsNodes[i])
            }
        }

        if (condition) {
            console.log(evaluateArr);
            
            smallValue = evaluateArr[0]
            for (let i = 0; i < evaluateArr.length; i++) {
                if (evaluateArr[i].distance < smallValue.distance) {
                    smallValue = evaluateArr[i]
                }
            }
        }

        console.log(smallValue);

        if (!smallValue) {
            let newObj = Object.keys(listOpen)[0];
            smallValue = listOpen[newObj];
            listClosed[newObj] = smallValue
            delete listOpen[newObj];
        }
        // if (grid[smallest.row][smallest.col].isTarget === grid[target.row][target.col].isTarget) {
        //     console.log(listClosed);
        //     return ;

        // }
        listClosed = Object.assign(listClosed, addListOpen([smallValue]))
        grid[smallest.row][smallest.col].isVisited = true;

        delete listOpen[String(smallValue.row).concat(smallValue.col)]
        // console.log(listOpen);
        // console.log(listClosed);
        // return
        otro++
    }   


}


function handleToDispatch(toDispatch) {
    for (let i = 0; i < toDispatch.length; i++) {
        setTimeout(() => {
            let node = toDispatch[i]

            let row = node.row,
                col = node.col;
            let nodeEl = document.getElementById(`${row}-${col}`);
            nodeEl.classList.add('visited');
        }, 20 * i);

    }
}

export default  aSearch;