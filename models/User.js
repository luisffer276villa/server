// src/server/models/User.js
class User {
  constructor(id, username, password) {
      this.id = id;
      this.username = username;
      this.password = password;
  }
}

// Array para simular una base de datos
const users = [];

module.exports = { User, users };
