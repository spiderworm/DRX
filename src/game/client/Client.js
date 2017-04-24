
import DECS from 'decs';
import ViewSystem from './view/ViewSystem.js';
import RenderSystem from './view/RenderSystem.js';

const Client = DECS.createSystemClass(
	function(game) {
		this.entities = game.entities;
		this.view = new ViewSystem(game);
		this.addSystem(this.view);
		this.renderer = new RenderSystem(this.view);
		this.addSystem(this.renderer);
		const tick = () => { this.tickAll(); requestAnimationFrame(tick); };
		tick();
	},
	{
		tick: function() {
		}
	}
);

export default Client;
