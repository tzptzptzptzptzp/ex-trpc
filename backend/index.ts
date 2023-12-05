import express from "express";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { TodoList } from "./db/TodoList";

const app = express();

const PORT = 2222;

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
