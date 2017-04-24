
import Entity from '../Entity.js';
import PhysicalComponent from './PhysicalComponent.js';
import objectHero from 'object-hero';

const PhysicalEntity = Entity.createClass(
	function(overrides) {
		objectHero.assignDeep(this, [overrides]);
	},
	{
		physics: new PhysicalComponent()
	}
);

export default PhysicalEntity;
