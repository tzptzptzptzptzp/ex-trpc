import express from "express";
import { initTRPC } from "@trpc/server";

const app = express();

const PORT = 2222;

app.get("/", (req, res) => res.send("Hello World"));

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

app.listen(PORT, () => {
  console.log(`Server Running http://localhost:${PORT}`);
});
