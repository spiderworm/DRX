
import DECS from 'decs';

const CubeEntity = DECS.Entity.createClass({
	shapes: {
		box: {
			type: 'box',
			size: {
				x: 1,
				y: 1,
				z: 1,
			}
		}
	}
});

console.info('test 2', new CubeEntity());

export default CubeEntity;
