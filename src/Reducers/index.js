import { combineReducers } from "redux";
import {
    createGridReducer, 
    setStartNode,
    setTargerNode,
    stateWall } from "./GridReducer";

import { algorithmIsRunning } from './AlgoritmReducer'

export default combineReducers({
    grid: createGridReducer,
    startNode:setStartNode,
    targetNode:setTargerNode,
    stateWall,
    algorithmIsRunning
})