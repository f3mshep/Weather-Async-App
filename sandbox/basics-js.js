console.log('Starting app');

setTimeout(()=>{
  console.log('Inside of the callback')
}, 2000);

setTimeout(()=>{
  console.log("I am the first callback")
},0)

console.log('Finishing up');