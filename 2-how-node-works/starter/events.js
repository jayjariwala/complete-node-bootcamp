const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
})

myEmitter.on('newSale', () => {
  console.log('Customer name: Jonas')
})

myEmitter.on('newSale', stock => {
  console.log(`There are not ${stock} items left in stock`);
})

myEmitter.emit('newSale', 9);
