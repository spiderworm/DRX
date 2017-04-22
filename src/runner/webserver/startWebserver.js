
import Webserver from './Webserver.js';

export default function startWebserver() {

	const p = new Promise((accept, reject) => {

		const w = new Webserver();

		setTimeout(accept, 1000);

	});

	return p;

}
