/* import { genSalt, hash, compare } from "bcryptjs"; 

const SALT_RANDOMS = 8; //=> Quanto mais auto o número da const mais díficil da senha foi decoberta, porém mais pesado fica para o arquivo

//Criptografar a senha
const hashPassword = async(password: string) => {
    const saltGenerated = await genSalt(SALT_RANDOMS)
    /*const hashPass*//*return await hash(password, saltGenerated); //HASH vai devolver carcteres aleatorios a aplicação 
/*
    
};

//Verificação se a senha está correta
const verifyPassword = async (password: string, hashPassword: string) => {
    return await compare(password, hashPassword) //Se retorna true = as senhas são validas, caso retorne falso a senha deu errodo
    
}; 

export const PassowordCrypto = {
    hashPassword, 
    verifyPassword,
};

/*

1. Instalar o BCRYPTJS => npm install bcryptjs;

2. Instalar pacote de typagens do BCRYPTJS => npm install @types/bcryptjs(no arquivo package.json não pode ficar como um dependencia)

3. Criar servidor para a biblioteca

4. Criar um arquivo "PassowordCrypto.ts"

5. No arquivo criar duas const(verifyPassword e hashPassword);

6. - verifyPassword => Vai verificar se a senha está correta;
- hashPassword => criptografa a senha

7. Importar o arquivo "PassowordCrypto", para o index.js do projeto (export * from './PassowordCrypto';)

8. Na funcão de CRIAR usuario dar o seguinte comando:

const hashedPassword = await PassowordCrypto.hashedPassword(usuario.senha);

OU

const usuario.senha = hashedPassword

9. No local de controle de senha colocar a verificação de senha dar o seguinte comando para verificação:

const PassowordMatch = await PassowordCrypto.verifyPassword(senha, result.senha)
if (PassowordMatch) continuar a aplicação

Link do vídeo: https://www.youtube.com/watch?v=rTGgrRqfjN4&t=666s

*/