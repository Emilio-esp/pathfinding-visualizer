import React, {useEffect, useState} from 'react';
import { connect} from 'react-redux'
import store from "../store";

import { generateGrid, setNode } from "../actions";
import Node from './Node'
import '../styles/grid.css'

const Grid = (props) => {

    useEffect(() => {
        console.log("create grid");
        
       props.generateGrid()
       console.log(store.getState());
       
    }, []);

    const [mousePress, setMousePress] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isTarget, setIsTarget] = useState(false);

    const handleOnMouseDown = (row, col, nodeRef) => {
        if (!props.algorithmIsRunning) {
            
            setMousePress(true)
            let currentNode = props.grid[row][col];
    
            if (currentNode.isStart) {
                setIsStart(true)
            } else if (currentNode.isTarget){
                setIsTarget(true)
            }else{
                currentNode.isWall = !currentNode.isWall;
                props.grid[row][col] = currentNode;
                nodeRef.current.classList.toggle('wall')
            }
        }

    }
    const handleOnMouseEnter = (row, col, nodeRef) => {
        if (!mousePress) {
            return
        }

        let currentNode = props.grid[row][col];

        if (isStart) {
            currentNode.isStart = true;
            currentNode.distance = 0;
            props.grid[row][col] = currentNode;
            nodeRef.current.classList.add('start')
            
        } else if (isTarget){
            currentNode.isTarget = true;
            props.grid[row][col] = currentNode;
            nodeRef.current.classList.add('target')

        } else if (mousePress && !currentNode.isStart && !currentNode.isTarget){
            nodeRef.current.classList.toggle('wall')
            nodeRef.current.classList.remove('visited')
            nodeRef.current.classList.remove('path')
            let isWall = props.grid[row][col].isWall
            props.grid[row][col].isWall = !isWall;
        }


    }

    const handleOnMouseLeave = (row, col, nodeRef) => {
        let currentNode = props.grid[row][col];
        if (isStart) {
            currentNode.isStart = false;
            currentNode.distance = Infinity;
            props.grid[row][col] = currentNode;
            nodeRef.current.classList.remove('start')

        } else if (isTarget) {
            currentNode.isTarget = false;
            props.grid[row][col] = currentNode;
            nodeRef.current.classList.remove('target')
        }

    }

    const handleOnMouseUp = (row,col, nodeRef) => {
        let currentNode = props.grid[row][col];
        if (isStart) {
            currentNode.isWall = false;
            props.grid[row][col] = currentNode;
            props.setNode("SET_START_NODE", props.grid[row][col])
            nodeRef.current.classList.add('start')
        }else if(isTarget){
            currentNode.isWall = false;
            props.grid[row][col] = currentNode;
            props.setNode("SET_TARGET_NODE", props.grid[row][col])
            nodeRef.current.classList.add('target')
        }
        setMousePress(false)
        setIsStart(false)
        setIsTarget(false)
        
        generateGridWithWalls(props.grid)

    }
    

    const generateGridWithWalls = (grid) => {
        let gridUpdate = grid.slice(0)
        props.generateGrid(gridUpdate)
    }

    const createGrid = grid => {
        return grid.map((row,index)=>{
            return <div key={index} className="row" ref={props.forwardRef}>
                {
                    row.map(node=>{
                        return (
                            <Node 
                                key={`${node.col}-${node.row}` }
                                {...node} 
                                handleOnMouseDown = {handleOnMouseDown}
                                handleOnMouseEnter = {handleOnMouseEnter}
                                handleOnMouseUp = {handleOnMouseUp}
                                handleOnMouseLeave = {handleOnMouseLeave}
                            />
                        )
                    })
                }
            </div>
        })
    }

    return (
        <div className="container-grid">
            {createGrid(props.grid)}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        grid: state.grid,
        algorithmIsRunning: state.algorithmIsRunning
    }
}

export default connect(mapStateToProps, { generateGrid, setNode},null,{forwardRef:true})(Grid);
