import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { TodoList } from "./db/TodoList";
import { TodoType } from "./db/TodoList/type";

const app = express();

const PORT = 2222;

app.use(cors());

app.get("/", (req, res) => res.send("Hello World"));

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  test: publicProcedure.query(() => {
    return "TEST tRPC";
  }),
  getTodos: publicProcedure.query(() => {
    return TodoList;
  }),
  addTodo: publicProcedure.input(z.string()).mutation((req) => {
    const id = uuidv4();
    const todo: TodoType = {
      id,
      content: req.input,
    };
    TodoList.push(todo);
    return TodoList;
  }),
  deleteTodo: publicProcedure.input(z.string()).mutation((req) => {
    const idTodoDelete = req.input;
    const indexToDelete = TodoList.findIndex(
      (todo) => todo.id === idTodoDelete
    );
    TodoList.splice(indexToDelete, 1);
    return TodoList;
  }),
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => {
  console.log(`Server Running http://localhost:${PORT}`);
});

export type AppRouter = typeof appRouter;
