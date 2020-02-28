import React from 'react';
import '../styles/node.css';
import { connect } from 'react-redux'
import { generateGrid, setWall } from "../actions";

const Node = (props) => {
    const nodeRef = React.createRef();

    let widthNode = (Math.floor(document.body.offsetWidth / 54))

    let extrClass = props.isStart ? "start" 
                    : props.isTarget? "target"
                    : props.isWall ? "wall"
                    : 'node';

    let {col, row} = props;

    return (
        <div
            ref = {nodeRef}
            style={{width: `${widthNode}px`}}
            className={`${extrClass}`}
            id={`${props.row}-${props.col}`}
            onMouseDown={() => props.handleOnMouseDown(row, col, nodeRef)} 
            onMouseEnter={() => props.handleOnMouseEnter(row, col, nodeRef)}
            onMouseUp={() => props.handleOnMouseUp(row, col, nodeRef)}  
            onMouseLeave={() => { props.handleOnMouseLeave(row, col, nodeRef)}}
        >
        </div>
    );
}
const mapStateToProps = state => {
    return {
        grid: state.grid,
        stateWall: state.stateWall
    }
}

export default connect(mapStateToProps, { generateGrid, setWall })(Node);
