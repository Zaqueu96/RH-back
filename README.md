# RH  - Back-end
Projeto de gerenciamento de RH para o front (https://github.com/Zaqueu96/RH-Front-App).

1. Bodyparser
2. Authentication JWT
3. CORS
4. Lucid ORM
5. Migrations and seeds


## Configurar
 É necessário configurar as variaveis de ambiente com base no .env.example
```bash
adonis migration:run
```
## Instalar Dependencias
```bash
npm install 
``` 
or manually clone the repo and then run ``.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```


### Criar Usuários Administrativos( email:maria@mail.com, senha:maria@123 | email:joao@mail.com, senha:joao@123)

É necessário rodar o comando abaixo para criação dos usuário administrativos.
```js
adonis seed
```
