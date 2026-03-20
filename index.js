const express = require('express');
const app = express();


app.get('/ping', (req, res) => {
    res.send('server running');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
}); 

app.get('/goodbye', (req, res) => {
    res.send('Goodbye, World!');
}); 