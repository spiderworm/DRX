
import DECS from 'decs';
import isClass from 'is-class';
import PhysicsSystem from './physics/PhysicsSystem.js';
import PhysicalEntity from './physics/PhysicalEntity.js';
import now from '../util/now.js';

function isFunction(o) {
	return typeof o === 'function';
}

function resolveTarget(o) {
	if (isClass(o) || isFunction(o)) {
		return new o();
	}
	return o;
}

function isEntity(o) {
	return true;
}

function createGameConfig(target) {
	if (isEntity(target)) {
		const floor = new PhysicalEntity({
			physics: { static: true, position: { x: 0, y: 0, z: -2 } },
			shapes: { box: { type: 'box', size: { x: 1e3, y: 1e3, z: 1 } } },
			view: { color: 0xff0000 }
		});
		return {
			entities: [ target, floor ]
		};
	}
	return target;
}

const DRXGame = DECS.createSystemClass(
	function(target) {
		this.entities = {};
		
		this.physics = new PhysicsSystem();
		this.addSystem(this.physics);

		target = resolveTarget(target);

		var gameConfig = createGameConfig(target);

		gameConfig.entities.forEach((entity) => {
			this.addEntity(entity);
		});

		this.start();
	},
	{
		_running: false,
		tickAll: function() {
			var time = now();
			var delta = time - this._lastTime;
			this._lastTime = time;
			DECS.System.prototype.tickAll.call(this, delta);
		},	
		start: function() {
			if (!this._running) {
				this._running = true;
				this._lastTime = now();
				this._intrvl = setInterval(
					function() {
						this.tickAll();
					}.bind(this),
					20
				);
			}
		},
		stop: function() {
			if (this._running) {
				this._running = false;
				clearInterval(this._intrvl);
				delete this._intrvl;
			}
		}
	}
);

export default DRXGame;
