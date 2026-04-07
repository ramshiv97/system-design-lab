const axios = require("axios");

async function createUser() {
  const response = await axios.post("http://localhost:3000/users", {
    name: "AgentUser",
    email: "agent@test.com"
  });

  console.log(response.data);
}

createUser();