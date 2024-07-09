const express = require('express');
const session = require("express-session");
const passport = require('passport');
require('./auth');


function taLogado(req, res, next) {
     req.user ? next() : res.sendStatus(401);
}
const app = express();
app.use(session({ secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
     res.send('<a href="/auth/google">Continuar com Google</a>')
});


app.get('/auth/google',
     passport.authenticate('google', { scope: ['email', 'profile']})
);

app.get('/google/callback', 
     passport.authenticate('google', {
          successRedirect: '/protected',
          failureRedirect: '/authfailure',
     })
);

app.get('/auth/failure', (req, res) => {
     res.send('deu merda mano ...');
});

app.get('/protected', taLogado, (req, res) => {
     res.send(`Eae meu chapa ${req.user.displayName}`);
})

app.get('/logout', (res, req) => {
     req.logout();
     res.send('Falou meu amigo');
})

app.listen(5000, () => console.log('Abrindo na 5000'));