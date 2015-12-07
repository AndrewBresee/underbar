

(function() {
  'use strict';

  window._ = {};


  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.

  _.identity = function(val) { 
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */



  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var final = (array.length)
    if (n === undefined) {
      //if n is undefined, it will return the last element (array length -1)
      return array[final -1]
    } else if (n<final){

      //this will start the slice at the end (final) and go back n spaces. It will then slice to the end (final)
      return array.slice(final-n, final)
    } else {
      return array; 
    }
  };


  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = function(collection, iterator) {
    //(object.constructor) is used to determine if is an object or an array
     if (collection.constructor === Object){
      for (var key in collection){
        iterator(collection[key], key, collection);
      };
    } else if (collection.constructor === Array){
      for(var i = 0; i<collection.length; i++){
        iterator(collection[i], i, collection); 
      }
    } else {

      //if the  collection is neither an array nor an object, the funciton returns an error
      alert("Wrong input!")
    }
   
  };



  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    //here, result starts off at -1. If it is not changed, the target item is not there, then the function returns -1
    //indicating that the targer is not in the array



//iterator should take three arguments. Item = collection[key], index = key. How can this work without the array being passed in?
//In _.each, the third argument "collection" is an optional argument. 
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };



  // Return all elements of an array that pass a truth test.

  //Will have to use _.each funciton. Can use _.indexOf as a template
  _.filter = function(collection, test) {
    var newCollection = [];

    //calls the each funciton and tests if the item (collection[key]) passes. If it does, it pushes the passed item into the new array. 
    _.each(collection, function(item,index){
      if(test(item) === true){
        newCollection.push(item)
      }
    });
    return newCollection; 
  };


  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it


    //this returns the array that is made in the filter function. 
    //The predicate here is the opposite of the normal predicate. 
    //This will return an array of the values that failed the predicate. 
     return _.filter(collection,function(x,y){
      return (!test(x))
    })
  };


  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArray = [];


    //This builds a new array. If the value is not present in the new array
    //it pushes the value into the new array. If the value IS present in the 
    //array, it does not push the value
    for(var i = 0; i<array.length; i++){
      if ( _.indexOf(newArray, array[i]) === -1){
        newArray.push(array[i])
      }
    }
    return newArray; 
  };



  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArr = [];
    _.each(collection,function(item,index){
      newArr.push(iterator(item))
    })
    return newArr;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */



  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.

    //This returns an array of just values, specified by the argument "key". 
    //If the user wanted to have an array of just ages, they would pass in 
    //the argument "age" for key. This would take an array of objects, and 
    //return just an array with the value of each objects age key
    return _.map(collection, function(item){
      return item[key];
    });
  };



  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.


//if no start value is passsed in, the start value becomes the first item in the array
//using the _.each function allows the iterator to be applied to every element. 
//The iterator acts on both the current variable (start value) and the current item (value) being examined. 
  _.reduce = function(collection, iterator, accumulator){
    var current = accumulator; 
    _.each(collection, function(item, index){
      if(current === undefined){
        current = collection[0]
      } else {
        current = iterator(current, item);
      }
    })
    return current; 

  };


//SECTION II 


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!


    // In this case, the accumulator stars off as "false" and only becomes true if the value appears.
    //When "true" does appear, current becomes "true" and remains true
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };



  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    //If any item does not pass the truth test, then "current" becomes false, and does not change back to true
    //false is then passed through the function

    return _.reduce(collection, function(total, item){
       if(iterator === undefined){
        //**Not totally confident on why it needs to return the item**
        return item;
      } else if (!iterator(item)){
        return false; 
      }
      return total; 
    }, true) 
              };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {

    // TIP: There's a very clever way to re-use every() here.

    //if the iterator does not exist...
    if(iterator === undefined){
      iterator = function(item){
        return item
      }
    }

    return (!_.every(collection, function(item){
      return (!iterator(item))
    }))
  }

    //Below is my method of completing some, without reusing every. 
    //Did this first to work out thought process. 
    /* 
    if(iterator === undefined){
      iterator = function(i){
        return i
        }
      }

      return _.reduce(collection, function(total, item){
        if (iterator(item)){
          return true; 
        }
        return total; 
    }, false)
    */



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla



//Clearly going to need to use the arguments object, as the number of arguments passed to _.extend could be infinite.
//Each argument is an object with varrying number of keys. There must be a loop that goes over the arguments, then
//a for in loop to go through each object 

  _.extend = function(obj) {

    for(var i =0; i<arguments.length; i++){
      for(var key in arguments[i]){
        obj[key] = arguments[i][key]
      }
    }
    return obj       
  };



  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  //Below, just like _.extend. But it checks if the key already exists. If it does exist, it does not overwite it.
  _.defaults = function(obj) {
    for(var i =0; i<arguments.length; i++){
      for(var key in arguments[i]){
        if(obj[key] === undefined){
          obj[key] = arguments[i][key]
        }
      }
    }
    return obj  
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */



  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;


    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };



  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  //Create a store of different arguments and results. If the argument is not present, add it to the store. 
  //If it is present, return the results
  //Need to be able to see if values exist in an object. What is something like indexOf for objects? 
  _.memoize = function(func) {

    var store ={}; 
    var seenArguments = []

    //Creates an array of arguments. If the argument is already there, show the calculated result
    //if the argument is not there, push the argument into the array, calculate the result
    //and store the result into store. 

      return function(){
        for(var i=0; i<arguments.length;i++){
            if(seenArguments.indexOf(arguments[i]) === -1){
              seenArguments.push(arguments[i]); 
              store[arguments] = func.apply(this, arguments);
            } else {
              return store[arguments]
            }
          return store[arguments]
        }
        

    }

  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms


  _.delay = function(func, wait) {

    var myParameters = [arguments[2], arguments[3]]

    if(arguments.length > 2){
      setInterval(func.apply(null, myParameters), wait)
    } else {
      setInterval(func, wait)
    }

  }


/*
    var timeKeeper = 0;
    for(var i=0; i<(wait*125390);i++){
      timeKeeper+=1
    }
    return func(arguments[2],arguments[3])
    */


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

//Use math.random to randomize a number 0 or 1
//the length of the array as the number of loops
//If the number is 1, push the number adding to the back
//If the number is 0, unshift, adding to the front. 


  _.shuffle = function(array) {
    var newArray = [];
    for(var i =0; i<array.length;i++){
      var randomNum = (Math.floor(Math.random()*2))
      if(randomNum === 1){
        newArray.push(array[i])
      } else {
        newArray.unshift(array[i])
      }
    }
    return newArray;

  };















  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
