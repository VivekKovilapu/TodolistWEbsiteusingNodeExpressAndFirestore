const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

const app = express();
const port = 3000;

const firebaseConfig = {
    apiKey: "AIzaSyByp_t59ftHTPIaaxEBh7r2Dvi5VgFmfVA",
    authDomain: "vivek-bro.firebaseapp.com",
    projectId: "vivek-bro",
    storageBucket: "vivek-bro.appspot.com",
    messagingSenderId: "911147219585",
    appId: "1:911147219585:web:99cf01d8e2816c0308ab80",
    measurementId: "G-T261HH8FCZ"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.redirect('/dashboard'); // Redirect to dashboard on successful login
        })
        .catch((error) => {
            res.status(400).send(`Login Error: ${error.message}`);
        });
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.send('User signed up successfully');
        })
        .catch((error) => {
            res.status(400).send(`Signup Error: ${error.message}`);
        });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
