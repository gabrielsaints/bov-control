# BovControl

Olá, sou o Gabriel dos Santos Gonçalves e essa é um projeto  **de teste** do **BovControl**.

* [Teste proposto](https://github.com/bovcontrol/milk-hiring/blob/master/desafioBack.md) - Link do teste

# Como iniciar?

**Requisitos:** Docker, Node.js v8+, docker-compose, npm ou yarn

Clone o repositório e preencha as variáveis de ambiente
```sh
$ git clone https://github.com/cahtyw/bov-control.git && cd bov-control
$ cp .env.example .env && nano .env
```

Inicie a aplicação
```sh
$ docker-compose up -d
$ yarn
$ yarn start
```

Teste a aplicação
```sh
$ yarn test
```


# Tecnologias

Principais tecnologias utilizadas:

 - TypeScript
 - Node.js
 - MongoDB
 - Mongoose
 - Express.js
 - TDD (com Jest)

# Rotas

**A coleção do Postman está na pasta principal do projeto, basta importar, criar a variável `base_url` e trocar os ids para os criados.**

	GET /animals
	RETURNS
	    animals

	GET /animals/:id
	RETURNS
	    animal

	POST /animals
	BODY
	    ageInMonths: required
	    weight: required
	    name: required
	    type: required
	RETURNS
	    animal

	PUT /animals
	BODY
	    id: required
	     ageInMonths: optional
	    weight: optional
	    name: optional
	    type: optional
	RETURNS
	    animal
	    updated


## Testes

Resultados do **coverage** geral:
![a imagem mostra os testes realizados na aplicação](https://i.imgur.com/0ccDuKX.png)


**Resumo**

    ---------------------|----------|----------|----------|----------|-------------------|
    File                 |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
    ---------------------|----------|----------|----------|----------|-------------------|
    All files            |    95.19 |       70 |    96.97 |    94.83 |                   |
    src                 |      100 |      100 |      100 |      100 |                   |
      app.ts             |      100 |      100 |      100 |      100 |                   |
    src/__tests__/utils |      100 |      100 |      100 |      100 |                   |
      chance.ts          |      100 |      100 |      100 |      100 |                   |
      normalize.ts       |      100 |      100 |      100 |      100 |                   |
      request.ts         |      100 |      100 |      100 |      100 |                   |
    src/config          |      100 |      100 |      100 |      100 |                   |
      env.ts             |      100 |      100 |      100 |      100 |                   |
    src/controllers     |      100 |    86.21 |      100 |      100 |                   |
      animals.ts         |      100 |    86.21 |      100 |      100 |    99,108,117,126 |
    src/helpers         |    82.35 |    48.39 |    88.89 |    82.35 |                   |
      database.ts        |      100 |    85.71 |      100 |      100 |                40 |
      request-error.ts   |       40 |     7.14 |    66.67 |       40 |... 22,26,30,36,39 |
      validate.ts        |      100 |       80 |      100 |      100 |             17,29 |
    src/middlewares     |      100 |       50 |      100 |      100 |                   |
      error.ts           |      100 |       50 |      100 |      100 |                10 |
    src/models          |      100 |      100 |      100 |      100 |                   |
      animals.ts         |      100 |      100 |      100 |      100 |                   |
    src/routes          |      100 |      100 |      100 |      100 |                   |
      animals.ts         |      100 |      100 |      100 |      100 |                   |
    src/schemas         |      100 |      100 |      100 |      100 |                   |
      animals.ts         |      100 |      100 |      100 |      100 |                   |
    ---------------------|----------|----------|----------|----------|-------------------|
    Test Suites: 5 passed, 5 total
    Tests:       25 passed, 25 total
    Snapshots:   0 total
    Time:        1.409s


