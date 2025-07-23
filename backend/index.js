const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsed = createTodo.safeParse(createPayload);
  if (!parsed.success) {
    res.status(422).json({
      Message: "Todo must contain title, description",
      Error: parsed.error,
    });
    return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.status(201).json({
    msg: "Todo created successfully",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find();
  res.status(200).json({
    todos,
  });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsed = updateTodo.safeParse(updatePayload);
  if (!parsed.success) {
    res.status(422).json({
      Message: "Update Payload must contain id of the todo",
      Error: parsed.error,
    });
    return;
  }
  await todo.updateOne(
    {
      _id: updatePayload.id,
    },
    {
      completed: true,
    }
  );
  res.status(200).json({Message: "Todo Updated Successfully"});
});

app.listen(3000);
