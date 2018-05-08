
const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a + b);
      }
      else{
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(3, '7').then((res)=>{
  console.log('Results: ', res);
  return asyncAdd(res, 30)
})
.then((res)=>{
  console.log('Should be 45', res)
})
.catch((errorMessage)=>{
  console.log(errorMessage)
})

let somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hey, it worked!");
    reject("I am an oathbreaker, I could not fufill my promise");
  }, 2500);
});

somePromise.then((message) => {
  console.log('Success: ', message)
}, (errorMessage) => {
  console.log("Error: ", errorMessage)
});