import express, { response } from "express";

//@types/express para importa os tipos da biblioteca express
const app = express();
/**
 * GET    => Buscar um dado
 * POST   => Inserir/criar um dado
 * PUT    => Alterar um dado
 * DELETE => Remover um dado
 * PATCH  => Alterar um dado específico
 * */

app.get("/test", (request, response) => {
  //Request => O que está entrando
  // Resposne => o que esta saindo
  return response.send("Olá NLW");
});

app.post("/test-post", (request, response) => {
  return response.send("Olá NLW post");
});

//http://localhost:3030
app.listen(3000, () => console.log("Server is running."));