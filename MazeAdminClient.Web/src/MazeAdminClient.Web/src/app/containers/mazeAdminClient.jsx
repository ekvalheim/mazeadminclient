import React from 'react';
import { connect } from 'react-redux';
import { connectSocket, newGame, resetServer, kickPlayer, setHandicap, resetPlayer, forceStopLevel, nextLevel, previousLevel, setAdminMode, setPlayMode, setNotifyPlayer } from '../actions/mazeAdminClient.actions';
import Robot0 from '../images/Robot0.svg';
import Robot1 from '../images/Robot1.svg';
import Robot2 from '../images/Robot2.svg';
import Robot3 from '../images/Robot3.svg';
import Robot4 from '../images/Robot4.svg';
import Robot5 from '../images/Robot5.svg';
import Robot6 from '../images/Robot6.svg';
import Robot7 from '../images/Robot7.svg';
import Robot8 from '../images/Robot8.svg';
import GoodJob from '../images/good.png';

class MazeAdminClient extends React.Component {

  // Handler to update handicap input for a specific player
  handleHandicapChange(clientId, value) {
    const { gameId, setHandicapClicked } = this.props;
    setHandicapClicked(clientId, gameId, value);
  };

  componentDidMount() {
    if (this.props.location.query.isAdmin == 'true') {
      this.props.setAdminModeReceived();
    }
    if (this.props.location.query.mode == 'play') {
      this.props.setPlayModeReceived('Play');
    }
    if (this.props.location.query.notifyPlayer == 'true') {
      this.props.setNotifyPlayerReceived();
    }
    this.props.connectAdmin();
  }
  render() {
    const {
      isLoading,
      connectAdmin,
      players,
      lazers,
      resetServerClicked,
      newGameClicked,
      online,
      gameMazeImage,
      canvasHeight,
      canvasWidth,
      kickPlayerClicked,
      resetPlayerClicked,
      forceStopLevelClicked,
      nextLevelClicked,
      previousLevelClicked,
      gameId,
      isRunning,
      gameStarted,
      playersRank,
      gameLevel,
      clientId,
      adminMode,
    } = this.props;
    let onlineStatus = online ? <div>online</div> : <div>offline</div>;
    const colors = ['#44B3C2', '#F1A94E', '#E45641', '#5D4C46', '#7B8D8E', '#F2EDD8', '#6F3662', '#99ffcc', '#9F6164'];
    var robotImages = [Robot0, Robot1, Robot2, Robot3, Robot4, Robot5, Robot6, Robot7, Robot8];
    return (
      <div>
        <header className={online ? "online" : "offline"}>
          <div className="center">Game Id: {gameId} - Level: {gameLevel}</div>
          {players.map((player, index) =>
            <div key={player.clientId} className="player" style={{ backgroundColor: colors[player.playerIndex] }}>
              <div className="left">{player.username}</div>
              {adminMode && (
                <div className="right">
                  <input
                    className='handicapInput'
                    type="text"
                    onBlur={(e) => this.handleHandicapChange(player.clientId, e.target.value)}
                  />
                  <span title="Return to start" className="playerAdmin" onClick={() => resetPlayerClicked(player.clientId, gameId)}>&#8617;</span>
                  <span title="Kick player" className="playerAdmin" onClick={() => kickPlayerClicked(player.clientId, gameId)}>&#10006;</span>
                </div>
              )}
            </div>
          )}
          <br />
        </header>
        <div className="center">
          <button className="btn" disabled={gameStarted && isRunning} onClick={() => newGameClicked(gameId, clientId, gameLevel)}>Start</button>
          <button className="btn" disabled={gameStarted && isRunning} onClick={() => previousLevelClicked(gameId)}>&laquo; Previous level</button>
          <button className="btn" disabled={gameStarted && isRunning} onClick={() => nextLevelClicked(gameId)}>Next level &raquo;</button>
          <button hidden={adminMode ? 'hidden' : 'hidden'} className="btn" onClick={resetServerClicked}>Reset server</button>
          <button hidden={adminMode ? '' : 'hidden'} disabled={!(isRunning && gameStarted)} className="btn" onClick={() => forceStopLevelClicked(gameId)}>Force stop level</button>
        </div>
        <div className="highScoreList" style={{ visibility: !isRunning && adminMode ? 'visible' : 'hidden' }}>
          <ul>
            {playersRank.map((player, index) =>
              <li><div className="highScorename">{player.username}</div><div className="rightHighScore">{player.points} poeng</div></li>
            )}
          </ul>
        </div>
        <div style={{ visibility: !isRunning && !adminMode ? 'visible' : 'hidden' }}>
          <img className="goodJob" src={GoodJob}></img>
        </div>
        <br />
        <div className="imageContainer" style={{ visibility: (isRunning && gameStarted) ? 'visible' : 'hidden' }}>
          <img className="mazeImage" src={`data:image/bmp;base64,${gameMazeImage}`}></img>
          {players.map((player, index) => {
            if (player.playerStatus != 2) {
              //return <div key={player.clientId} className="robot" style={{width: player.width, height: player.height, top: player.top, left: player.left, backgroundColor: colors[index]}} ></div>
              return <img className="robot" key={player.clientId} src={robotImages[player.playerIndex]} style={{ width: player.width, height: player.height, top: player.top, left: player.left }} />
            }
          }
          )}
          {lazers.map((lazer) => {
            return <div className="lazer" key={lazer.clientId} style={{ width: lazer.width, height: lazer.height, top: lazer.top, left: lazer.left }} />
          }
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.mazeAdminClient.isLoading,
  players: state.mazeAdminClient.players,
  online: state.mazeAdminClient.online,
  gameMazeImage: state.mazeAdminClient.gameMazeImage,
  canvasHeight: state.mazeAdminClient.gameMazeImageHeight,
  canvasWidth: state.mazeAdminClient.gameMazeImageWidth,
  gameId: state.mazeAdminClient.gameId,
  isRunning: state.mazeAdminClient.isRunning,
  gameStarted: state.mazeAdminClient.gameStarted,
  playersRank: state.mazeAdminClient.playersRank,
  gameLevel: state.mazeAdminClient.gameLevel,
  clientId: state.mazeAdminClient.clientId,
  adminMode: state.mazeAdminClient.adminMode,
  lazers: state.mazeAdminClient.lazers,
});

const mapDispatchToProps = (dispatch) => ({
  connectAdmin: () => dispatch(connectSocket()),
  resetServerClicked: () => dispatch(resetServer()),
  newGameClicked: (gameId, clientId, level) => dispatch(newGame(gameId, clientId, level)),
  kickPlayerClicked: (playerId, gameId) => dispatch(kickPlayer(playerId, gameId)),
  resetPlayerClicked: (playerId, gameId) => dispatch(resetPlayer(playerId, gameId)),
  setHandicapClicked: (clientId, gameId, handicap) => dispatch(setHandicap(clientId, gameId, handicap)),
  forceStopLevelClicked: (gameId) => dispatch(forceStopLevel(gameId)),
  nextLevelClicked: (gameId) => dispatch(nextLevel(gameId)),
  previousLevelClicked: (gameId) => dispatch(previousLevel(gameId)),
  setAdminModeReceived: () => dispatch(setAdminMode()),
  setPlayModeReceived: (mode) => dispatch(setPlayMode(mode)),
  setNotifyPlayerReceived: () => dispatch(setNotifyPlayer()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MazeAdminClient);

MazeAdminClient.propTypes = {
  isLoading: React.PropTypes.bool,
  players: React.PropTypes.array,
  playersRank: React.PropTypes.array,
  lazers: React.PropTypes.array,
  connectAdmin: React.PropTypes.func,
  resetServerClicked: React.PropTypes.func,
  newGameClicked: React.PropTypes.func,
  forceStopLevelClicked: React.PropTypes.func,
  nextLevelClicked: React.PropTypes.func,
  previousLevelClicked: React.PropTypes.func,
  online: React.PropTypes.bool,
  gameMazeImage: React.PropTypes.string,
  canvasHeight: React.PropTypes.number,
  canvasWidth: React.PropTypes.number,
  kickPlayerClicked: React.PropTypes.func,
  resetPlayerClicked: React.PropTypes.func,
  setHandicapClicked: React.PropTypes.func,
  gameId: React.PropTypes.string,
  isRunning: React.PropTypes.bool,
  gameStarted: React.PropTypes.bool,
  gameLevel: React.PropTypes.number,
  clientId: React.PropTypes.string,
  setAdminModeReceived: React.PropTypes.func,
  setPlayModeReceived: React.PropTypes.func,
  setNotifyPlayerReceived: React.PropTypes.func,
  adminMode: React.PropTypes.bool,
};
