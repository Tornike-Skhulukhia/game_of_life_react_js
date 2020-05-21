import React from 'react';

function TopButtons({movesNum, movesPerSecond, handleSpeedBtnClick, screenModeNumber, handleSCreenModeBtnClick, changeTheme}){
      return(
        <div className="top-buttons orange darken-3 white">
            <div id="screen-size" className="white-text">
              <i className="material-icons" onClick={handleSCreenModeBtnClick}>fullscreen</i>: <span>{screenModeNumber}</span>
            </div>
            <div id="moves-counter" className="white-text">
              <i className="material-icons">equalizer</i>: <span>{movesNum}</span>
            </div>

            <div className="white-text" id="top-last-right">
              <div>
                <i id="timer" className="material-icons" onClick={handleSpeedBtnClick}>timer</i>: <span>{movesPerSecond}</span>
              </div>
              <div className="page-theme">
                <i id="light" className="material-icons" onClick={() => {changeTheme('light')}}>wb_sunny</i>
                <i id="dark" className="material-icons" onClick={() => {changeTheme('dark')}}>wb_cloudy</i>
              </div>
            </div>
        </div>
      )
}

export default TopButtons;