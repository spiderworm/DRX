
import Shape from './Shape.js';

const TYPE = 'box';

const BoxShape = Shape.createClass({
	type: TYPE,
	size: {
		x: 1,
		y: 1,
		z: 1
	}
});

BoxShape.type = TYPE;

export default BoxShape;