const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function agent(prompt) {

  if (prompt.includes("create user")) {

    const nameMatch = prompt.match(/name\s+([a-zA-Z\s]+)/);
    const emailMatch = prompt.match(/email\s+([\w@.]+)/);

    const name = nameMatch ? nameMatch[1].trim() : "DefaultName";
    const email = emailMatch ? emailMatch[1] : "default@test.com";

    const response = await axios.post("http://localhost:3000/users", {
      name,
      email
    });

    console.log("User created:", response.data);

  } 
  else if (prompt.includes("get users")) {

    const response = await axios.get("http://localhost:3000/users");
    console.log("Users:", response.data);

  } 
  else if (prompt.includes("get user")) {

    const idMatch = prompt.match(/id\s+(\d+)/);
    const id = idMatch ? idMatch[1] : 1;

    const response = await axios.get(`http://localhost:3000/users/${id}`);
    console.log("User:", response.data);

  } 
  else {

    console.log("Agent did not understand");

  }
}

function ask() {
  rl.question("Enter command: ", async (input) => {
    await agent(input);
    ask();
  });
}

ask();