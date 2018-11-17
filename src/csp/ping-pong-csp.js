import { put, take, channel ,close } from './csp-new';

async function player(name, game) {
  while (true) {
    const { opponentsMove, gameShouldEnd } = await select({
      opponentsMove: game.turns,
      gameShouldEnd: game.end
    });

    if (opponentsMove) {
      console.log(opponentsMove);
    }

    if (gameShouldEnd) {
      console.log('Game Over');
      return gameShouldEnd;
    }

    await sleep(2000);
    await put(game.turns, name);
  }
}

async function timedGame(ms) {
  const _game = { turns: channel(), end: channel() };
  const ping = player('ping', _game);
  const pong = player('pong', _game);

  await put(_game.turns, 'ping');
  await sleep(ms);
  await put(_game.end, true);
}

const ch = channel();
async function playerX(name) {
    while(true) {
        const message = await take(ch);
        console.log(message);
        await put(ch, name);
    }
}
