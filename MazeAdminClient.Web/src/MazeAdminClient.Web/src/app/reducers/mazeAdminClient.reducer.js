const player = (state = {
  username: '',
  clientId: '',
  points: 0,
  playerIndex: 0,
}, action, index) => {
  switch (action.type) {
    case 'ADD-PLAYER':
      return {
        username: action.username,
        clientId: action.clientId,
        top: '0',
        left: '0',
        width: '8px',
        height: '8px',
        playerStatus: 0,
        playerIndex: index,
      };
    case 'UPDATE-PLAYER-POSITION':
      if (state.clientId === action.clientId) {

        return {
          ...state,
          top: action.PY,
          left: action.PX,
        };
      }
      return state;
    case 'GAME-FINISHED':
      return {
        ...state,
        playerStatus: action.players.find((x) => x.PlayerId === state.clientId).PlayerStatus
      };
    case 'GAME-SETUP':
      return {
        ...state,
        width: action.robotSize,
        height: action.robotSize,
        top: action.startPositionY,
        left: action.startPositionX,
      };
    default:
      return state;
  }
};

const lazer = (state = {
  username: '',
  clientId: '',
  lazerIndex: 0,
}, action) => {
  switch (action.type) {
    case 'ADD-LAZER':
      return {
        clientId: action.clientId,
        top: action.positionY,
        left: action.positionX,
        width: action.sizeX,
        height: action.sizeY,
      };
    default:
      return state;
  }
};

const mazeAdminClient = (state = {
  isLoading: true,
  adminMode: false,
  playMode: 'Practice',
  notifyPlayer: false,
  gameId: '___',
  clientId: '',
  online: false,
  gameLevel: 1,
  isRunning: true,
  gameStarted: false,
  gameMazeImage: '',
  gameMazeImageHeight: 100,
  gameMazeImageWidth: 100,
  playersRank: [],
  players: [],
  lazers: [],
  playerRobotIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8],
}, action) => {
  switch (action.type) {
    case 'GAME-REGISTERED':
      return {
        ...state,
        clientId: action.clientId,
        gameId: action.gameId,
      };
    case 'CONNECTED':
      return {
        ...state,
        online: true,
      };
    case 'SET-ADMIN-MODE':
      return {
        ...state,
        adminMode: true,
      };
    case 'SET-PLAY-MODE':
      return {
        ...state,
        playMode: action.mode,
      };
    case 'SET-NOTIFY-PLAYER':
      return {
        ...state,
        notifyPlayer: true,
      };
    case 'DISCONNECTED':
      return {
        ...state,
        online: false,
      };
    case 'ADD-PLAYER':
      return {
        ...state,
        players: [...state.players, player(undefined, action, state.playerRobotIndex[state.playerRobotIndex.length - 1])],
        playerRobotIndex: state.playerRobotIndex.slice(0, state.playerRobotIndex.length - 1),
      };
    case 'REMOVE-PLAYER':
      return {
        ...state,
        players: state.players.filter(player => player.clientId !== action.clientId),
        playerRobotIndex: [...state.playerRobotIndex, state.players.filter(t => t.clientId === action.clientId)[0].playerIndex],
      };
    case 'ADD-LAZER':
      return {
        ...state,
        lazers: [...state.lazers, lazer(undefined, action)],
      };
    case 'REMOVE-LAZER':
      return {
        ...state,
        lazers: state.lazers.filter(lazer => lazer.clientId !== action.clientId),
      };
    case 'GAME-SETUP':
      return {
        ...state,
        gameMazeImage: action.gameMazeImage,
        gameMazeImageWidth: action.gameMazeImageWidth,
        gameMazeImageHeight: action.gameMazeImageHeight,
        players: state.players.map(t => player(t, action, 0)),
      };
    case 'UPDATE-PLAYER-POSITION':
      return {
        ...state,
        players: state.players.map(t => t.clientId === action.clientId ? player(t, action, 0) : t)
        // players: state.players.map(t => player(t, action, 0))  //todo .. mulig å bare oppdatere den som blir sendt her?
      };
    case 'UPDATE-ALL-PLAYERS-POSITION': {
      const updatedPlayersMap = new Map(action.players.map(t => [t.ClientId, t]));

      return {
        ...state,
        players: state.players.map(p => {
          const updatedPlayer = updatedPlayersMap.get(p.clientId);
          if (!updatedPlayer || (p.PX === updatedPlayer.PX && p.PY === updatedPlayer.PY)) {
            return p; // No changes, return original reference
          }
          return player(p, {
            type: 'UPDATE-PLAYER-POSITION',
            PX: updatedPlayer.PX,
            PY: updatedPlayer.PY,
            clientId: p.clientId
          });
        })
      };
    }
    case 'NEW-GAME':
      return {
        ...state,
        gameStarted: true,
        isRunning: true,
      };
    case 'NEXT-LEVEL':
      return {
        ...state,
        gameLevel: state.gameLevel + 1,
      };
    case 'PREVIOUS-LEVEL':
      return {
        ...state,
        gameLevel: state.gameLevel == 1 ? state.gameLevel : state.gameLevel - 1,
      };
    case 'GAME-FINISHED':
      return {
        ...state,
        isRunning: false,
        playersRank: action.players.map((p) => player({ username: p.Name, points: p.Points }, 'undefined', 0)),
        players: state.players.map(t => player(t, action, 0)),
      };
    default:
      return state;
  }
};

export default mazeAdminClient;
