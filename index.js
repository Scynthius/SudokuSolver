var express = require('express'), 
app = express(), 
handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname));
app.get('/', function(req,res){
      res.render('index');
});

app.listen(process.env.PORT || app.get('port'), 
	() => console.log("Server is running on port", app.get('port'), "..."));
