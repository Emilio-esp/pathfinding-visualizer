import React, { useState } from 'react';
import {connect} from 'react-redux'

import '../styles/tolbar.css';
import { generateGrid } from "../actions";
import dijkstra from '../Algorithms/dijkstra';
import aSearch from '../Algorithms/aSearch';

const Toolbar = (props) => {
    let { grid, startNode, targetNode, algorithmIsRunning} = props
    const [algoDispath, setAlgoDispath] = useState([]);

    const handleRunAlgorithm  = () => {
        if (!algorithmIsRunning) {
            handleCleanPath()
            let temp = dijkstra(grid, startNode, targetNode)
            // let temp = aSearch(grid, startNode, targetNode)
            setAlgoDispath(temp);
        }
    }
    const handleCleanBoard  = () => { 
        if (!algorithmIsRunning) {
            cleanNodesclass()
            props.generateGrid()
        }
    }

    const handleClearWalls  = () => {
        if (!algorithmIsRunning) {
            let grid = props.grid.slice(0);
    
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    let currentNode = grid[i][j];
                    if (currentNode.isWall) {
                        grid[i][j].isWall = false
                    }
                    if (!currentNode.isStart) {
                        grid[i][j].isVisited = false
                        grid[i][j].distance = Infinity
                        grid[i][j].previusNode = null
                    }
                    
                }
            }
    
            props.generateGrid(grid)
            cleanNodesclass()
        }
    }

    const handleCleanPath = () => {
        if (!algorithmIsRunning) {
            cleanNodesclass()
    
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    let currentNode = grid[i][j];
    
                    if (!currentNode.isStart) {
                        grid[i][j].isVisited = false
                        grid[i][j].distance = Infinity
                        grid[i][j].previusNode = null
                    }
    
                }
            }
    
            props.generateGrid(props.grid.slice(0))
        }
    }

    const cleanNodesclass = () => {
        if (!algorithmIsRunning) {
            for (let i = 0; i < algoDispath.length; i++) {
                let node = algoDispath[i];
                let row = node.row,
                    col = node.col;
                let nodeEl = document.getElementById(`${row}-${col}`);
                nodeEl.classList.remove('visited');
                nodeEl.classList.remove('path');
    
            }
        }
    }

    return (
        <header>
            <div style={{flex:1,display:'flex',  alignItems:'center', justifyContent:"center"}}>

                <button
                    className={algorithmIsRunning? "is-running-btn":""}
                    onClick={handleRunAlgorithm}
                >
                    Visualizar Algoritmo
                </button>

                <button
                    className={algorithmIsRunning? "is-running":""}
                    onClick={handleClearWalls}
                >
                    Limpiar Muros
                </button>

                <button
                    className={algorithmIsRunning? "is-running":""}
                    onClick={handleCleanBoard}
                >
                    Limpiar Tablero
                </button>
                <button
                    className={algorithmIsRunning? "is-running":""}
                    onClick={handleCleanPath}
                >
                    Limpiar Ruta
                </button>
            </div>
            <div className="icons-container">
                <div className="start" style={{ height: "1.5em", width: "1.5em"}}></div> Nodo Inicio
                <div className="target" style={{ height: "1.5em", width: "1.5em"}}></div>Nodo Final
                <div className="node" style={{ height: "1.5em", width: "1.5em"}}></div> Nodo
                <div className="wall" style={{ height: "1.5em", width: "1.5em"}}></div> Muro
                <div className="visited" style={{ height: "1.5em", width: "1.5em"}}></div> Nodo Visitado
            </div>
        </header>
    );
}
const stateMapToProps = state =>{
    return{
        startNode: state.startNode,
        targetNode: state.targetNode,
        grid: state.grid,
        algorithmIsRunning: state.algorithmIsRunning
    }
}
export default connect(stateMapToProps, { generateGrid})(Toolbar);
