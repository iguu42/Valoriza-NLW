import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  //receber o token
  const authToken = request.headers.authorization;


  // validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ")

  //validar se token é válido
  try {
    const { sub } = verify(token, "caa5936d8dcffbec778d2d15ecda566e") as IPayload;

    request.user_id = sub;
    return next();

  } catch (err) {
    return response.status(401).end();
  }

  //recuperar informações do usuário
}

