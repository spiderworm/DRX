
import { PhysicalEntity } from '../../';

const CubeEntity = PhysicalEntity.createClass({
	shapes: {
		box: {
			type: 'box',
			size: {
				x: 1,
				y: 1,
				z: 1,
			}
		}
	},
	view: {
		color: 0xffff00
	}
});

export default CubeEntity;
