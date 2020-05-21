import React from 'react';


function BottomButtons({handlePlayBtnClick, clearGrid, generateRandom, changeColor}){
    return (
        <div className="bottom-buttons">
            <button className="btn-large orange darken-3 white-text" id="clear" onClick={handlePlayBtnClick}>
                <i className="material-icons">play_arrow</i>
            </button>
            <button className="btn-large orange darken-3 white-text" id="clear" onClick={clearGrid}>
                <i className="material-icons">clear</i>
            </button>
            <button className="btn-large orange darken-3 white-text" id="clear" onClick={generateRandom}>
                <i className="material-icons">create</i>
            </button>
            <button className="btn-large orange darken-3 white-text" id="clear" onClick={changeColor}>
                <i className="material-icons">color_lens</i>
            </button>
        </div>
    )
}

export default BottomButtons;