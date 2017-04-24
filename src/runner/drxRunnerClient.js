
import Client from '../game/client/Client.js';
import Game from '../game/DRxGame.js'
import target from 'TARGET_PATH';

class DRXRunnerClient {
	constructor() {
		window.game = new Game(target);
		window.client = new Client(window.game);
	}
}

const runnerClient = new DRXRunnerClient();

export default runnerClient;
