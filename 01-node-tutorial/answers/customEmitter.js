const EventEmitter = require('events');  
const emitter = new EventEmitter();     


emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});
emitter.emit('greet', 'Natalia');  

emitter.on('order', (item, quantity) => {
  console.log(`Order received: ${quantity} x ${item}`);
});
emitter.emit('order', 'Pizza', 2);  

emitter.on('start', () => {
  console.log('Start event occurred.');
  emitter.emit('process', 'Processing data...');
});

emitter.on('process', (message) => {
  console.log(message);
});

emitter.emit('start');
