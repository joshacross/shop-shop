export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the db 'shop-shop' with the version of 1
    const request = window.indexedDB.open('shop-shop', 1);

    // create variables to hold reference to the db, transaction (tx), and obj store
    let db, tx, store;

    // if version has changed or first use, run method & create 3 obj stores
    request.onupgradeneeded = function(e) {
      const db = request.result;

      // create obj store for each type of data and set 'primary'
      db.createObjectStore('products', { keyPath: '_id'});
      db.createObjectStore('categories', { keyPath: '_id'});
      db.createObjectStore('cart', { keyPath: '_id'});
    };

    // handle any err with connect
    request.onerror = function(e) {
      console.log('There was an error');
    };

  });
}