function myRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
  });
}

function myAny(promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const total = promises.length;

    promises.forEach(p => {
      Promise.resolve(p)
        .then(resolve)
        .catch(() => {
          rejectedCount++;
          if (rejectedCount === total) {
            reject("all promises rejected");
          }
        });
    });
  });
}

function myAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // reject immediately on first failure
    });
  });
}

function myAllSettled(promises) {
  return new Promise(resolve => {
    const results = [];
    let completed = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          results[index] = { status: "fulfilled", value };
        })
        .catch(error => {
          results[index] = { status: "rejected", error };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

module.exports = {
  myRace,
  myAny,
  myAll,
  myAllSettled
};
