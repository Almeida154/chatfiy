<br>

<h1 align="center">
  <img alt="Chatify logo" title="Move.it" src=".github/brand.png" width="280px" />
</h1>

<br>

<p align="center">
  <a href="#-About">About</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Technologies">Technologies</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Features">Features</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-How-to-use">How to use</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=000000&labelColor=1A1A1A">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Almeida154/move.it?color=000000&labelColor=1A1A1A">
</p>

<p align="center">
  <img alt="Mockup" src=".github/home.png" width="37.5%">
  <img alt="Mockup" src=".github/home-active-button.png" width="37.5%">
</p>

<p align="center">
  <img alt="Mockup" src=".github/starting-chat.png" width="75%">
</p>

<p align="center">
  <img alt="Mockup" src=".github/chat.png" width="75%">
</p>

<br>

### 🤳 About

Chatify is your ultimate chat application. With its intuitive interface and robust features, Chatify enables seamless, real-time interactions, making it easier than ever for businesses to address customer inquiries and concerns promptly.

<br>

### 🚀 Technologies

#### Web

- [Vite](https://vitejs.dev/)
- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/installation.html)
- [Plugin Vue JSX](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)
- [Socket.io (Client API)](https://socket.io/docs/v4/client-api/)
- [Moment](https://momentjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

#### Server

- [Node](https://nodejs.org/en)
- [TSX](https://www.npmjs.com/package/tsx)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Express](https://expressjs.com/pt-br/)
- [Socket.io (Server API)](https://socket.io/docs/v4/server-api/)
- [TypeScript](https://www.typescriptlang.org/)

<br>

### 🪄 Features

#### User

- Start a chat
- Send message for admin
- Receive message

#### Admin

- Send message for multiple users
- Receive message

<br>

### 🧑‍💻 How to use

**First things first:** [NodeJS](https://nodejs.org/en/download) must be installed.

```bash
# Clone this repo

$ git clone https://github.com/Almeida154/chatfiy.git
```

```bash
# Install web dependencies and start it

$ cd web
$ yarn install
$ yarn dev
```

```bash
# Now the server turn

$ cd ..
$ cd server
$ yarn install
```

```bash
# Run migrations and start it

$ yarn migrations:run
$ yarn dev
```
