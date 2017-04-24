
import Shape from './Shape.js';
import SphereShape from './SphereShape.js';
import BoxShape from './BoxShape.js';

export default function getShape(vals) {
	switch (vals.type) {
		case SphereShape.type:
			return new SphereShape(vals);
		break;
		case BoxShape.type:
			return new BoxShape(vals);
		break;
		default:
			return new Shape(vals);
		break;
	}
}
