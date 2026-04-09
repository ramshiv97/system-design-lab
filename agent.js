const axios = require("axios");

async function createUser(name, email) {
  const response = await axios.post("http://localhost:3000/users", {
    name,
    email
  });

  console.log(response.data);
}

createUser("ShivramAgent", "shivramagent@test.com");