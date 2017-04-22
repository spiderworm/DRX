
import startWebserver from './webserver/startWebserver.js';

export default class DRXRunner {
	constructor(file) {
		console.info('D R X !', file);

		startWebserver().then(() => {

		});
	}
}
