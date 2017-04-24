
import DECS from 'decs';
import MeshSystem from './MeshSystem.js';
var THREE = require('three');

/*
var fontJS = require('json-loader!../fonts/SourceSansPro-regular.json');
var threeFont = new THREE.Font(fontJS);
*/

const ViewSystem = DECS.createSystemClass(
	function ViewSystem(game) {
		this.sceneThree = new THREE.Scene();
		this.meshes = new MeshSystem(game, this.sceneThree);
		this.addSystem(this.meshes);
		this.cameraThree = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		this.cameraThree.up.set(0,0,1);
		this.cameraThree.position.set(5, 0, 0);
		this.cameraThree.lookAt(new THREE.Vector3(0,0,0));
	},
	{
		getThrees: function() {
			return {
				scene: this.sceneThree,
				camera: this.cameraThree
			};
		}
	}
);

module.exports = ViewSystem;
