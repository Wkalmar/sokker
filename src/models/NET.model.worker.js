module.exports = function worker (self) {
	const brain = require('brainjs');
	const NET = new brain.NeuralNetwork();

	self.addEventListener('message', (event)=> {
		const result = NET.train(event.data);
		self.postMessage({
			NET: NET.toJSON(),
			error: result.error
		});
	});
};