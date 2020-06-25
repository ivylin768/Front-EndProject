# Front-EndProject

## ChatBot
Developed while self-learning HTML, CSS and JavaScript

## Game2048 
Developed for getting familiar with HTML, CSS and JavaScript

## E-Commerce Website
Developed while taking CUHK course *Network and Web Programming*
### [V1](https://ivylin768.github.io/Front-EndProject/E-Commerce%20Website/V1/home.html)
- Using **HTML, CSS, and Bootstrap CSS framework** to produce two different views/pages
- Layout the content accordingly for wide screen and narrow screen views
    - Definition:
      1. Wide screen view: screen width is 768 pixels or more (corresponds to col-md-* in Bootstrap)
      1. Narrow screen view: screen width is less than 768 pixels

  1. Navigation bar will collapse in narrow screen view
  2. In *home.html*
      - Banner will be hidden in narrow screen view
      - Content areas have equal width in wide screen view
  3. In *listing.html*
      - Each item has the following properties:
          - Title: String (max 128 bytes)
          - Description: String (max 2048 bytes)
          - Price : Number
          - Image URL:  String (Could be a full URL or a relative path)
          - Creation Date: Date and Time
      - Show the image and the properties of each item in the layouts differently in wide screen and narrow screen views

### [V2](https://ivylin768.github.io/Front-EndProject/E-Commerce%20Website/V2/static/home.html)
- Build a website (using **Node.js**) to serve the files created in *V1*.
    - **After running *node index.js* command in terminal ...**
      - All files must be served from a Node.js server via the URL http://localhost:8080/...
      - In particular,
          1. Both http://localhost:8080/ and http://localhost:8080/home will retrieve the home page.
          2. http://localhost:8080/listing will retrieve the product listing page.
- Modify the product listing page (listing.html) to allow user to filter the items in the listing dynamically.
    - Each item add one property: **ID: A positive integer**

    - Introduce a "Filter" to listing.html (from *V1*) to allow a user to specify the following values:
        1. Minimum price – An input field with type=number
        2. Search key – An input field with type=text
    - Whenever an "input" event happened on the input fields *a&b*, the list will be re-rendered so that only items satisfying the following criteria are displayed.
        - item.price >= minimum price AND search key is a substring in item.title
    - The matching of substring is case insensitive.
        - e.g.,	Search keys "in" or "IN" are considered a substring in the title "WiNe"

- Handle mouse click event on a listed item.
    - When a displayed item is being clicked, show the "id" of the item in a dialog box 

### V3
- Note:
    - Server A refers to the server running as "node serverA.js". Its hostname is "localhost:8080".
    - Server B refers to the server running as "node serverB.js". Its hostname is "localhost:8081".
- Send asynchronous HTTP request from a browser to a web server
    - Retrieving data from server A(same origin) via **Ajax**
       - In static/js/asgn3.js, implement retrieveItem(app). 
       - app is a Vue instance passed via parameter to retrieveItem().
       - retrieveItem()is called whenever "Retrieve Items" button is clicked.
- Store/load data to/from window.localStorage
    - In static/js/asgn3.js, implement saveSelection(app) and restoreSelection(app) to save/restore the value of app.selected to/from window.localStorage.
    - User can select/unselect an item by clicking on the item. A selected item is highlighted with a red outline.
    - saveSelection() is called whenever the "Save Selection" button is clicked.
    - restoreSelection() is called once when /index.html is first loaded.
- Set/Get data in HTTP request/response
    - In static/js/asgn3.js, implement submitSelection(app) to send the value of app.selected via Ajax to server B. Upon receiving the response from the server, use console.log() to output the "array of integers" embedded in the response.
    - Server B is of different origin, so need to enable **CORS** support at server B.
    - In addition, configure the CORS support at server B so that only script originated from server A can send request to server B.
    
### V4
- **MySQL** (or MariaDB) Database Settings
    - Need to have a MySQL DBMS running on the local machine.
        - Using XAMPP is preferred(as it is easier to install and it comes with phpMyAdmin – a Web interface to interact with MySQL DBMS)
        - The DBMS should be listening to the default port 3306.
        - The password for the "root" user is assumed to be an empty string(i.e.,the default setting in XAMPP).
        - The database name is "eclt5830"
    - Run "*node init*" in folder "init", then DBMS setting is as expected
- Task 1: Retrieving items from the Database
    - When receives a GET request for */getItems?minprice=P*, the server(running on port 8080) will return an array of items priced greater than or equal to P in JSON format in the response. (e.g. http://localhost:8080/getItems?minprice=40)
    - Each item includes the following properties: item_id, title, price
- Task 2: Adding an item to the Database (Process URL-encoded data in HTTP request)
    - When the server receives a POST request for /addItem with the following body content:
        - title=T&price=P&description=D&img_url=URL (where T, P, D, and URL are the item's title, price, description, and image URL respectively)
    - the server should perform the following tasks:
        1. If there is already an item in the database with the same title, return a response with status code 500 and body content "Duplicate"
        2. Otherwise,add the item to the database and return a response with status code 201 and body content "Success".
- Task 3: Validating Data
    - Repeat Task 2 but validate the item's price before performing the database operation. 
    - Task 3 is different from task 2 in the following manners:
        1. The end point is changed from /addItem to /task3
        2. If item's price does not correctly represent a non-negative number with at most two decimal places, do not add the item to the database. And the server-side script will return a response with status code 500 and body content "Invalid price".
        3. The server-side script should properly handle all possible values of price it might(or might not) receive.
