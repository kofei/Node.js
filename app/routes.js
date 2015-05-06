var Todo = require('./model/todo');

module.exports === function(app) {

	// api ==============================
	// get all todos=====================
	app.get('/api/todos', function(req, res) {
		// Use mongoose to get all todos in the database
		Todo.find(function(err, todos) {
			if(err)
				res.send(err)
			res.json(todos);
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
		// get and check if that is more than 10 records.
		Todo.find (function (err, results) {
			if (err) 
				res.send (err);
			//var obj = JSON.parse(results);
			console.log(results.length);
			if (results.length > 10) {
				console.log(results);
				var jsonResult = {
					status: "FAIL",
					msg:"No more 10 Todos!"
				};
				res.json (jsonResult);
			}
		});
		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);
			// get and return all the todos after create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function (err, todo) {
			if (err)
				res.send(err);
			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application===========================
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
