export const loadingFinished = () => ({
  type: 'LoadingFinished',
});

export const addPlayer = (clientId, username) => ({
  type: 'ADD-PLAYER',
  clientId,
  username,
});

export const gameRegistered = (clientId, gameId) => ({
  type: 'GAME-REGISTERED',
  clientId,
  gameId,
});

export const removePlayer = (clientId) => ({
  type: 'REMOVE-PLAYER',
  clientId,
});

export const connect = (gameId, mode, notifyPlayer) => ({
  type: 'CONNECT',
  gameId,
  mode,
  notifyPlayer,
});

export const setAdminMode = () => ({
  type: 'SET-ADMIN-MODE',
});

export const setPlayMode = (mode) => ({
  type: 'SET-PLAY-MODE',
  mode,
});

export const setNotifyPlayer = () => ({
  type: 'SET-NOTIFY-PLAYER',
});

export function connectSocket() {
  return function (dispatch, getState) {
    dispatch(connect(getState().mazeAdminClient.gameId, getState().mazeAdminClient.playMode, getState().mazeAdminClient.notifyPlayer));
  }
}

export const newGame = (gameId, clientId, level) => ({
  type: 'NEW-GAME',
  gameId,
  clientId,
  level,
});

export const resetServer = () => ({
  type: 'RESET-SERVER',
});

export const socketConnected = () => ({
  type: 'CONNECTED',
});

export const socketDisconnected = () => ({
  type: 'DISCONNECTED',
});

export const kickPlayer = (playerId, gameId) => ({
  type: 'KICK-PLAYER',
  playerId,
  gameId,
});

export const resetPlayer = (playerId, gameId) => ({
  type: 'RESET-PLAYER',
  playerId,
  gameId,
});

export const forceStopLevel = (gameId) => ({
  type: 'FORCE-STOP-LEVEL',
  gameId,
});

export const nextLevel = (gameId) => ({
  type: 'NEXT-LEVEL',
  gameId,
});

export const previousLevel = (gameId) => ({
  type: 'PREVIOUS-LEVEL',
  gameId,
});


export const gameSetup = (gameMazeImage, gameMazeImageWidth, gameMazeImageHeight, startPositionX, startPositionY, robotSize) => ({
  type: 'GAME-SETUP',
  gameMazeImage,
  gameMazeImageWidth,
  gameMazeImageHeight,
  startPositionX,
  startPositionY,
  robotSize,
});

export const updatePlayerPosition = (clientId, PX, PY ) => ({
  type: 'UPDATE-PLAYER-POSITION',
  clientId,
  PX,
  PY,
});

export const gameFinished = (players) => ({
  type: 'GAME-FINISHED',
  players,
});

export const updateAllPlayersPositions = (players) => ({
  type: 'UPDATE-ALL-PLAYERS-POSITION',
  players,
});

export const shootLazer = (clientId, positionX, positionY, sizeX, sizeY) => ({
  type: 'ADD-LAZER',
  clientId,
  positionX,
  positionY,
  sizeX,
  sizeY,
});

export const removeLazer = (clientId) => ({
  type: 'REMOVE-LAZER',
  clientId,
});
