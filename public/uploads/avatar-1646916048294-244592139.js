// Bai 3
setInterval(() => {
  // console.log(new Date());
}, 1000);

// Bai 5
let promise1 = new Promise((res) => {
  setTimeout(() => {
    res("Success 1");
  }, 3000);
});

let promise2 = new Promise((res) => {
  setTimeout(() => {
    res("Success 2");
  }, 2000);
});

let promise3 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("Error");
  }, 2000);
});

Promise.all([promise1, promise2, promise3])
  .then((data) => {
    for (let i in data) {
      console.log(data[i]);
    }
  })
  .catch((error) => {
    console.log(error);
  });

// Bai 6
let pro1 = new Promise((res) => {
  setTimeout(() => {
    res(2);
  }, 3000);
});

let pro2 = pro1
  .then((data) => {
    return new Promise((res) => {
      let result = data * 3;
      setTimeout(() => {
        res(result);
      }, 3000);
    });
  })
  .then((data2) => {
    if (data2 > 10) {
      console.log(true);
    } else {
      console.log(false);
    }
  })
  .catch((error) => {
    console.log(error);
  });

// Bai 7
let promise4 = new Promise((res) => {
  setTimeout(() => {
    res(3);
  }, 2000);
});

let promise5 = new Promise((res) => {
  setTimeout(() => {
    res(7);
  }, 5000);
});

Promise.all([promise4, promise5])
  .then((data) => {
    let total = 0;
    for (let i in data) {
      total += data[i];
    }
    console.log(total);
  })
  .catch((err) => {
    console.log(err);
  });
