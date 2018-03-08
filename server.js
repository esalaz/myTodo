// require express and other modules
// to use express we must call require('express')
// to sumplity this we just put that in a variable
// then we create a new variable and call it app and 
// assign it to express(),


var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */



app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});






////////////////////////////////////////////////////////

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
  res.json({data: todos})
});

//////////////////////////////////////////////////////

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  
  let newTodo = req.body;

  // set sequential id (last id in `todos` array + 1)
  if (todos.length > 0) {
    newTodo._id = todos[todos.length - 1]._id + 1;
  } else {
    newTodo._id = 1;
  }

  // add newTodo to `todos` array
  todos.push(newTodo);

  // send newTodo as JSON response
  res.json(newTodo);

});

/////////////////////////////////////////////////////

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  let todoId = parseInt(req.params.id);


  let foundTodo = todos.filter(function (todo) {
    return todo._id == todoId;
  })[0];
});

//////////////////////////////////////////////////////

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  // get todo id from url params (`req.params`)
  let todoId = parseInt(req.params.id);

  // find todo to update by its id
  let todoToUpdate = todos.filter(function (todo) {
    return todo._id === todoId;
  })[0];

  // update the todo's task
  todoToUpdate.task = req.body.task;

  // update the todo's description
  todoToUpdate.description = req.body.description;

  res.json(todoToUpdate);

});

//////////////////////////////////////////////////////

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
  // get todo id from url params (`req.params`)
  let todoId = parseInt(req.params.id);

  // find todo to delete by its id
  let todoToDelete = todos.filter(function (todo) {
    return todo._id === todoId;
  })[0];

  // remove todo from `todos` array
  todos.splice(todos.indexOf(todoToDelete), 1);

  // send back deleted todo
  res.json(todoToDelete);
  
});

////////////////////////////////////////////////////////
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});