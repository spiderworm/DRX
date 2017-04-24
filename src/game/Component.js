
import objectHero from 'object-hero';
import SmartClassFactory from '../util/SmartClassFactory.js';

function Component(vals) {
	if (vals) {
		objectHero.assignDeep(this, [vals]);
	}
}

Component.createClass = new SmartClassFactory(Component);

export default Component;
