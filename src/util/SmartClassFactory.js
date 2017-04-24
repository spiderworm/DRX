
import objectHero from 'object-hero';

function extractClassPiecesFromArguments(args) {
	var pieces = {
		Constructor: function(props) {
			if (props) {
				objectHero.assignDeep(this, [props]);
			}
		},
		name: 'SmartClass',
		props: {}
	};

	Array.prototype.forEach.call(args, function(arg) {
		if (typeof arg === 'string') {
			pieces.name = arg;
		} else if (typeof arg === 'function') {
			pieces.Constructor = arg;
		} else if (typeof arg === 'object') {
			pieces.props = arg;
		}
	});

	pieces.props = objectHero.clone(pieces.props);

	return pieces;
}

function SmartClass(BaseObject, Constructor, props) {
	const SmartClass = function() {
		var obj = new BaseObject();
		objectHero.assignDeep(obj, [props]);
		obj.constructor = Constructor;
		Constructor.apply(obj, arguments);
		return obj;
	};

	SmartClass.createClass = new SmartClassFactory(SmartClass);

	return SmartClass;
}

export default function SmartClassFactory(BaseObject) {

	BaseObject = BaseObject || Object;

	return function() {
		const pieces = extractClassPiecesFromArguments(arguments);
		return new SmartClass(BaseObject, pieces.Constructor, pieces.props);
	};
};


