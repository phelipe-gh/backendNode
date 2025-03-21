export default class UserService {
    public cadastrar(userAdd:any) {
        if(userAdd.age < 18){
            throw new Error("Não é permitido cadastrar usuários menores de idade.");
        }
        return {
            message: "Usuário cadastrado com sucesso",
            user: userAdd 
        };
    }
}