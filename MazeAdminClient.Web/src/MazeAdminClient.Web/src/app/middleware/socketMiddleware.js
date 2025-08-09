import { addPlayer, removePlayer, socketConnected, socketDisconnected, gameSetup, updatePlayerPosition, gameFinished, gameRegistered, updateAllPlayersPositions, shootLazer, removeLazer } from '../actions/mazeAdminClient.actions';

const socketMiddleware = (() => {
  let socket = null;
  const onOpen = (ws, store, token) => evt => {
    store.dispatch(socketConnected());
  };
  const onClose = (ws, store) => evt => {
    store.dispatch(socketDisconnected());
  };
  const onMessage = (ws, store) => evt => {
    const msg = JSON.parse(evt.data);
    switch (msg.Action) {
      case 'ClientRegistered':
        store.dispatch(gameRegistered(msg.ClientId, msg.GameId));
        break;
      case 'AddPlayer':
        store.dispatch(addPlayer(msg.ClientId, msg.Username));
        break;
      case 'RemovePlayer':
        store.dispatch(removePlayer(msg.ClientId));
        break;
      case 'GameSetup':
        store.dispatch(gameSetup(msg.ImageBase64, msg.ImageWidth, msg.ImageHeight, msg.StartPositionX, msg.StartPositionY, msg.RobotSize));
        break;
      case 'UpdatePlayer':
        store.dispatch(updatePlayerPosition(msg.ClientId, msg.PX, msg.PY));
        break;
      case 'GameFinished':
        store.dispatch(gameFinished(msg.Players));
        break;
      case 'MoveAllPlayers':
        store.dispatch(updateAllPlayersPositions(msg.Players));
        break;
      case 'ShootLazer': {
        store.dispatch(shootLazer(msg.ClientId, msg.PositionX, msg.PositionY, msg.SizeX, msg.SizeY));
        setTimeout(() => {
          store.dispatch(removeLazer(msg.ClientId));
        }, 1000);
      }
        break;
      default:
        console.log(`Received unknown message type: ${msg.type}`);
        break;
    }
  };
  return store => next => action => {
    switch (action.type) {
      case 'CONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket('wss://mazeserverwebapp-apd7asc7aqcdasbv.norwayeast-01.azurewebsites.net/api/Maze/MazePlayer?username=admin&clientId=345gte&gameId=' + action.gameId + '&isAdmin=true&mode=' + action.mode + '&notifyPlayer=' + action.notifyPlayer);
        console.log(action);
        // socket = new WebSocket('ws://localhost:50990/api/Maze/MazePlayer?username=admin&clientId=345gte&gameId=' + action.gameId + '&isAdmin=true&mode=' + action.mode + '&notifyPlayer=' + action.notifyPlayer);

        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(socket, store);
        socket.onopen = onOpen(socket, store, action.token);
        break;
      case 'DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case 'NEW-GAME':
        socket.send(JSON.stringify({ Action: 'NewGame', GameId: action.gameId, ClientId: action.clientId, Level: action.level }));
        return next(action);
      case 'RESET-SERVER':
        socket.send(JSON.stringify({ Action: 'ResetServer' }));
        break;
      case 'KICK-PLAYER':
        socket.send(JSON.stringify({ Action: 'KickPlayer', ClientId: action.playerId, GameId: action.gameId }));
        break;
      case 'SET-HANDICAP':
        socket.send(JSON.stringify({ Action: 'SetHandicap', ClientId: action.playerId, GameId: action.gameId, Seconds: action.seconds }));
        break;
      case 'RESET-PLAYER':
        socket.send(JSON.stringify({ Action: 'ResetPlayer', ClientId: action.playerId, GameId: action.gameId }));
        break;
      case 'FORCE-STOP-LEVEL':
        socket.send(JSON.stringify({ Action: 'ForceStopLevel', GameId: action.gameId }));
        break;
      // This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
    return null;
  };
})();
export default socketMiddleware;
