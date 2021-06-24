import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";




interface IAuthenticateRequest {
  email: string;
  password: string;
}
class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {

    const usersRepositories = getCustomRepository(UsersRepositories);

    //verificar se email existe
    const user = await usersRepositories.findOne({
      email
    });

    if (!user) {
      throw new Error("Email/Password incorrect")
    }

    //Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    //Gerar token
    const token = sign({
      email: user.email
    }, "caa5936d8dcffbec778d2d15ecda566e", {
      subject: user.id,
      expiresIn: "1d"
    }
    );
    return token;
  }
}

export { AuthenticateUserService }