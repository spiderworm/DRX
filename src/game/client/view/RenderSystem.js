
import DECS from 'decs';
var THREE = require('three');

var DomNodes = require('./DomNodes.js');

const RenderSystem = DECS.createSystemClass(
	function RenderSystem(view) {
		this.nodes = new DomNodes();
		this.view = view;

		this.threeRenderer = new THREE.WebGLRenderer({
			canvas: this.nodes.canvas,
			antialias: true
		});
		this.threeRenderer.setClearColor(0x000000, 1);
		this.threeRenderer.shadowMap.enabled = true;
		this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
	},

	{
		tick: function(ms) {
			this.render();	
		},

		render: function() {
			this.threeRenderer.clear();
			this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
			var threes = this.view.getThrees();
			threes.camera.aspect = window.innerWidth / window.innerHeight;
			threes.camera.updateProjectionMatrix();
			this.threeRenderer.render(threes.scene, threes.camera);
		}

	}
);

module.exports = RenderSystem;
