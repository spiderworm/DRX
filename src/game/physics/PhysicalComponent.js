
function PhysicalComponent() {
	return {
		mass: 1,
		static: false,
		position: { x: 0, y: 0, z: 0},
		rotation: { w: 1, x: 0, y: 0, z: 0 },
		velocity: { x: 0, y: 0, z: 0 },
		angularVelocity: { x: 0, y: 0, z: 0 }
	};
}

export default PhysicalComponent;
