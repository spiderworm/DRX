
import DECS from 'decs';
var THREE = require('three');

/*
var fontJS = require('json-loader!../fonts/SourceSansPro-regular.json');
var threeFont = new THREE.Font(fontJS);
*/

const MeshSystem = DECS.createSystemClass(
	function MeshSystem(game, sceneThree) {
		this.game = game;
		this.sceneThree = sceneThree;
	},
	{
		tick: function(ms) {
			this.game.eachEntity((entity, localData) => {
				this._updateEntityView(entity, localData);
				this._updateEntityShape(entity, localData);
				this._updateEntityPosition(entity, localData);
				this._updateEntityRotation(entity, localData);
			});
		},

		getEntityThree: function(entity) {
			return this.getEntitySystemComponent(entity)._three;
		},

		_updateEntityView: function(entity, localData) {
			if (entity.view) {
				if (!localData._three) {
					localData._three = new THREE.Object3D();
					localData._three.entity = entity;
					this.sceneThree.add(localData._three);
				}
			} else {
				if (localData._three) {
					this.sceneThree.remove(localData._three);
					delete localData._three;
				}
			}
		},

		_updateEntityShape: function(entity, localData) {
			if (entity.view && localData._three && entity.shapes) {
				if (!localData.shapes) {
					localData.shapes = {};
				}
				Object.keys(entity.shapes).forEach(function(id) {

					var shape = entity.shapes[id];
					var localShape = localData.shapes[id];
					if (!localShape) {
						localShape = {};
						localData.shapes[id] = localShape;
					}

					if (!localShape._three) {
						var geometry;
						var material = new THREE.MeshBasicMaterial({
							color: shape.color || shape.color === 0 ? shape.color : entity.view.color,
							wireframe: true
						});
						switch (shape.type) {
							case 'sphere':
								geometry = new THREE.SphereGeometry(
									shape.size / 2,
									15,
									15
								);
							break;
							case 'box':
								geometry = new THREE.BoxGeometry(
									shape.size.x,
									shape.size.y,
									shape.size.z
								);
							break;
							case 'text':
								geometry = new THREE.TextGeometry(
									shape.text,
									{
										font: threeFont,
										size: .2,
										height: .02
									}
								);
							break;
						}

						if (geometry) {
							localShape._three = new THREE.Mesh(geometry, material);
							localShape._three.castShadow = true;
							localShape._three.receiveShadow = true;
							localData._three.add(localShape._three);

							if (shape.position) {
								localShape._three.position.set(
									shape.position.x || 0,
									shape.position.y || 0,
									shape.position.z || 0
								);
							}
						}
					}

				});
			}
		},

		_updateEntityPosition: function(entity, localData) {
			if (entity.view && localData._three) {
				localData._three.position.set(
					entity.physics.position.x,
					entity.physics.position.y,
					entity.physics.position.z
				);
			}
		},

		_updateEntityRotation: function(entity, localData) {
			if (entity.view && localData._three) {
				localData._three.quaternion.set(
					entity.physics.rotation.x,
					entity.physics.rotation.y,
					entity.physics.rotation.z,
					entity.physics.rotation.w
				);
			}
		}
	}
);

module.exports = MeshSystem;
