import { User } from "../../entities/User";
import { IEmailProvider } from "../../providers/IEmailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository, private mailProvider: IEmailProvider) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = new User(data);
        await this.userRepository.save(user);

        await this.mailProvider.sendEmail({
            to: {name: data.name, email: data.email},
            from: {name: 'Equipe do meu App', email: 'equipe@meuapp.com'},
            subject: 'Seja Bem vindo(a) a Plataforma',
            message: 'Você já pode fazer login em nossa plataforma' 
        })
    }
}
