
import DECS from 'decs';
import CANNON from 'cannon';
import getShape from '../shapes/getShape.js';

const Physics = DECS.createSystemClass(
	function PhysicsSystem() {
		var world = new CANNON.World();

		world.gravity.set(0, 0, -9.8);

		world.defaultMaterial = new CANNON.Material("defaultMaterial");
		world.defaultContactMaterial = new CANNON.ContactMaterial(
			world.defaultMaterial,
			world.defaultMaterial,
			{
				friction: 0.4,
				restitution: 0.3,
				contactEquationStiffness: 1e8,
				contactEquationRelaxation: 3,
				frictionEquationStiffness: 1e8,
				frictionEquationRegularizationTime: 3,
			}
		);

		this._cannon = world;
	},

	{
		tick: function(ms) {
			this.eachEntity((entity, localEntity) => {
				this._updateEntityPhysics(entity, localEntity);
				this._syncCannonWithEntity(entity, localEntity);
			});
			this._cannon.step(1/60, ms/1000, 30);
			this.eachEntity((entity, localEntity) => {
				this._syncEntityWithCannon(entity, localEntity);
			});
		},

		_updateEntityPhysics: function(entity, localEntity) {
			if (entity.physics) {
				if (!localEntity._cannon) {

					var material = this._cannon.defaultContactMaterial;
					if (
						(entity.physics.friction || entity.physics.friction === 0) &&
						entity.physics.friction !== this._cannon.defaultContactMaterial.friction
					) {
						material = new CANNON.Material("entityMaterial");

						var contactMaterial = new CANNON.ContactMaterial(
							material, this._cannon.defaultContactMaterial,
							{
								friction: entity.physics.friction
							}
						);
						this._cannon.addContactMaterial(contactMaterial);
					}

					var type = entity.physics.static === true ? CANNON.Body.STATIC : CANNON.Body.DYNAMIC;
					var mass = entity.physics.mass || 1;
					if (type === CANNON.Body.STATIC) {
						mass = 0;
					}
					localEntity._cannon = new CANNON.Body({
						mass: mass,
						type: type,
						material: material
					});
					localEntity._cannon.position.set(
						entity.physics.position.x,
						entity.physics.position.y,
						entity.physics.position.z
					);

					this._cannon.addBody(localEntity._cannon);
					this._updateEntityShape(entity, localEntity);
				}
			} else {
				if (localEntity._cannon) {
					this._cannon.removeBody(localEntity._cannon);
					delete localEntity._cannon;
				}
			}
		},

		_updateEntityShape: function(entity, localEntity) {
			if (entity.physics && localEntity._cannon && entity.shapes) {

				if (!localEntity.shapes) {
					localEntity.shapes = {};
				}

				Object.keys(entity.shapes).forEach(function(id) {
					var shape = getShape(entity.shapes[id]);

					var localShape = localEntity.shapes[id];
					if (!localShape) {
						localShape = {};
						localEntity.shapes[id] = localShape;
					}

					if (!localShape._cannon) {
						var cannonShape;

						switch (shape.type) {
							case 'sphere':
								cannonShape = new CANNON.Sphere(shape.size / 2);
							break;
							case 'box':
								cannonShape = new CANNON.Box(
									new CANNON.Vec3(
										shape.size.x / 2,
										shape.size.y / 2,
										shape.size.z / 2
									)
								);
							break;
						}

						if (cannonShape) {
							localShape._cannon = cannonShape;
							localEntity._cannon.addShape(
								cannonShape,
								new CANNON.Vec3(
									shape.position.x,
									shape.position.y,
									shape.position.z
								)
							);
						}

					}

				});

			}
		},

		_syncCannonWithEntity: function(entity, localEntity) {
			if (entity.physics && localEntity._cannon) {
				localEntity._cannon.position.set(
					entity.physics.position.x,
					entity.physics.position.y,
					entity.physics.position.z
				);
				localEntity._cannon.velocity.set(
					entity.physics.velocity.x,
					entity.physics.velocity.y,
					entity.physics.velocity.z
				);
				localEntity._cannon.quaternion.set(
					entity.physics.rotation.x,
					entity.physics.rotation.y,
					entity.physics.rotation.z,
					entity.physics.rotation.w
				);
				localEntity._cannon.angularVelocity.set(
					entity.physics.angularVelocity.x,
					entity.physics.angularVelocity.y,
					entity.physics.angularVelocity.z
				);
			}
		},

		_syncEntityWithCannon: function(entity, localEntity) {
			if (entity.physics && localEntity._cannon) {
				entity.physics.position = {
					x: localEntity._cannon.position.x,
					y: localEntity._cannon.position.y,
					z: localEntity._cannon.position.z
				};
				entity.physics.velocity = {
					x: localEntity._cannon.velocity.x,
					y: localEntity._cannon.velocity.y,
					z: localEntity._cannon.velocity.z
				};
				entity.physics.rotation = {
					w: localEntity._cannon.quaternion.w,
					x: localEntity._cannon.quaternion.x,
					y: localEntity._cannon.quaternion.y,
					z: localEntity._cannon.quaternion.z
				};
				entity.physics.angularVelocity = {
					x: localEntity._cannon.angularVelocity.x,
					y: localEntity._cannon.angularVelocity.y,
					z: localEntity._cannon.angularVelocity.z
				};
			}
		}

	}
);

export default Physics;
