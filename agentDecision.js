const axios = require("axios");

async function agent(prompt) {

  if (prompt.includes("create user")) {

    const name = "AgentUser2";
    const email = "agent2@test.com";

    const response = await axios.post("http://localhost:3000/users", {
      name,
      email
    });

    console.log("User created:", response.data);

  } else if (prompt.includes("get users")) {

    const response = await axios.get("http://localhost:3000/users");

    console.log("Users:", response.data);

  } else {

    console.log("Agent did not understand the request");

  }
}

agent("create user");