# To-Do List

A To-Do List using CSS, Javascript, Node.js, Express, EJS and connected locally to a MongoDB server using Mongoose.

Allows you to add and delete tasks and create your own custom to-do list.

<img width="1410" alt="Screenshot 2023-06-26 at 12 34 57 AM" src="https://github.com/Sakshi-196/To-Do-List/assets/117597225/d23c808c-8ebe-49ec-b17e-4dce4bc7378b">

### Create your own custom list

```
  GET /${title}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Title of your own custom List |


## Run Locally

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
  npm i express body-parser ejs mongoose lodash
```

Start the server

```bash
  node app.js
```

