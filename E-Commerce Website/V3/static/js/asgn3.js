window.addEventListener('load', function() {
/*
  You should only need to deal with these two properties of "app":
  app.selected:
    - An array of integers
    - Store the ID of the selected Items
    - To clear selection, assign an empty array to this property.
  app.setItems(items):
    - Use this methods to set the items in the list.
*/

// TODO: Complete the implementation of these four functions.
let asgn3 = {
  retrieveItems: function(app) {
    let itemsArray=[];
    console.log('asgn3.js Retrieving Items...'); //show in browser console
    // Task 1
    // TODO:
    //   Send an Ajax GET request to /getItems to retrieve items from the,
    //   server, and call app.setItems to set the list items.

    //// -------- method 1 -------
    // let xhr = new XMLHttpRequest();
    // console.log('HttpRequest');
    // let method = 'GET', url = '/getItems';
    // console.log('method,url');
    // xhr.open(method,url);

    // xhr.onreadystatechange = function(){
    //   if (xhr.readyState == 4) {
    //     if (xhr.status == 200) {
    //       console.log(xhr.response);
    //       let items = JSON.parse(xhr.response); //decode JSON encoded data
    //       app.setItems(items);//call app.setItems to set the list items
    //     }
    //   }
    // }

    // xhr.send();

    //// -------- method 2 -------
    $.ajax({
      url: '/getItems',
      type: 'GET',
      async: true,
      success: function(result) {
        console.log('result');
        console.log(result); // result is the decoded data
        itemsArray = result; //JS array
        app.setItems(itemsArray);//call app.setItems to set the list items
      },
      //////below part can omit 
      error: function(result) {
        console.error('asgn3.retrieveItems failed')
      },
      complete: function () {
        console.log('retrieveItems finished')
      }
      //////above part can omit
    });

    return itemsArray; //can omit
  },

  saveSelection: function(app) {
    // Task 2
    // TODO: Save app.selected (an array of integers) to localStorage
    console.log('asgn3.js Saving Selection...');
    let idSelect = app.selected;
    console.log(idSelect);
    localStorage.setItem('selected', JSON.stringify(idSelect));
    console.log('saveSelection finished');
  },

  restoreSelection: function(app) {
    // Task 2
    // TODO: Restore the array of integers from localStorage and
    //   assign the array to app.selected
    // [!!!!] Your code should consider the case that "window.localStorage" is empty
    //        initially.
    console.log('asgn3.js Restoring Selection...');
    let value = localStorage.getItem('selected');
    console.log('items in localStorage');
    console.log(value); //will be "null" if the "window.localStorage" is empty initially
    if (value) //not "null" [!!!!] 
      app.selected = JSON.parse(value);
    // else: no change app.selected
  },

  submitSelection: function(app) {
    // Task 3
    // TODO: Send app.selected via Ajax to "server B" and
    //   output the array in the response to the JS console.
    // (See Task 3's requirements for more info)

    // You need to implement the server-side script accordingly.
    let mydata = app.selected;
    $.ajax({
      contentType: 'application/json',
      // encode data
      dataType: 'JSON',
      data: JSON.stringify(mydata),
      url: 'http://localhost:8081/a3',
      type: 'POST',
      success: function(result) {
        console.log(result);
        console.log('submitSelection finished')
      },
      error: function (result) {
        console.error('asgn3.submitSelection failed')
      },
      complete: function () {
      }
    });

  }
}

window.app.setAsgn3(asgn3); // Don't change this statement

});
