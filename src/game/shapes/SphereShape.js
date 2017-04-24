
import Shape from './Shape.js';

const TYPE = 'sphere';

const SphereShape = Shape.createClass({
	type: TYPE,
	size: 1
});

SphereShape.type = TYPE;

export default SphereShape;
