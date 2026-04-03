const express = require('express');
const router = express.Router();

const users = [];

router.post('/users', (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  

  const user = {
    id: users.length + 1,
    name
  };

  users.push(user);

  res.json(user);
});

router.get('/users', (req, res) => {
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || users.length;

const start = (page - 1) * limit;
const end = start + limit;

res.json({
  total: users.length,
  page,
  limit,
  data: users.slice(start, end)
});

});

router.get('/users/:id', (req, res) => {

    const id = parseInt(req.params.id);

if (isNaN(id)) {
  return res.status(400).json({ error: "Invalid user id" });
}
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deleted = users.splice(index, 1);

  res.json(deleted[0]);
});

router.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }

  user.name = name;

  res.json(user);
});

module.exports = router;