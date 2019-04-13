const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const SequelStore = require('sequelStore');
const passport = require('./passport');
const app = express()
const port = 3001;
// Route requires
const user = require('./routes/user')

// //instead of this get and api we can connect our MySQL database instead
// app.get('/api/poses', (req,res) => {
//     const poses = [
//         {id: 1, name: 'warrior'},
//         {id: 2, name: 'ninja'},
//         {id: 3, name: 'plank'}
//     ];
//     res.json(poses);
// });

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new SequelStore ({ SequelStore: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)

app.listen(port, () => console.log(`Server started on port ${port}`));