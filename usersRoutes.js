const express = require('express');
const router = express.Router();

const users = [];

router.post('/users', (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const existing = users.find(u => u.email === email);

    if (existing) {
    return res.status(400).json({ error: "Email already exists" });
    }

  const user = {
    id: users.length + 1,
    name,
    email,
    createdAt: new Date()
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

router.get('/users/email/:emailid', (req, res) => {

    const emailid = req.params.emailid;
    //validate email ID
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailid)) {
      return res.status(400).json({ error: "Invalid email id" });
    }//email ID not present
    const user = users.find(u => u.email === emailid);
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
    const email = req.body.email;
    //check for existing email ID
    const existing = users.find(u => u.email === email);

    if (existing) {
    return res.status(400).json({ error: "Email already exists" });
    }


  user.name = name;

  res.json(user);
});

module.exports = router;