const express = require('express');
const app = express();
app.use(express.json());

const users = [];
app.get('/ping', (req, res) => {
    res.send('server running');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/hello', (req, res) => {
    const name = req.query.name || 'Guest';
    res.send(`Hello ${name}`);
}); 

app.get('/goodbye', (req, res) => {
    res.send('Goodbye, World!');
}); 

app.post('/greet', (req, res) => {
  const name = req.body.name || 'Guest';
  res.send(`Hello ${name}`);
});


app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(user);

  res.json(user);
});

app.get('/users', (req, res) => {
  res.json(users);
});