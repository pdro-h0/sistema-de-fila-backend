<p align="center">
Este projeto foi feito no desafio do Racoelho. <br/>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Express
- Nodejs
- Typescript
- Prisma
- PostgreSQL 
- Zod
- Jest
- Nodemailer
- Swagger

## 💻 Projeto

Neste projeto eu realizei o backend de uma aplicação que organiza clientes em filas de atendimento, gerencia múltiplas filas, prioriza atendimentos, envia notificações e fornece consulta dos clientes.

---

## 🤔 Instruções

### Variáveis de Ambiente:

Para rodar o backend, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

- `PORT=` (por padrão esta na 3333)
- `DATABASE_URL="postgresql://[POSTGRESQL_USERNAME]:[POSTGRESQL_PASSWORD]@localhost:5433/[POSTGRESQL_DATABASE]?schema=public"`

E para rodar os testes, você vai precisar adicionar a seguinte variávei de ambiente no seu .env.test

- `DATABASE_URL="postgresql://[POSTGRESQL_USERNAME]:[POSTGRESQL_PASSWORD]@localhost:5433/[POSTGRESQL_DATABASE]?schema=tests"`

### Primeiros passos:

Primeiramente baixe o arquivo backend no [GitHub](https://github.com/pdro-h0/sistema-de-fila-backend), no seu terminal, execute o seguinte comando na raiz da pasta criada:

`npm install`

E então rode o comando do [docker-compose](https://docs.docker.com/compose/):

`docker-compose up -d`
ou
`docker compose up -d`

Em seguida, rode:
`npx prisma generate`
e
`npx prisma db push`

Por fim:

`npm run dev`

---

### Requisitos funcionais

- Registrar cliente em uma fila (com prioridade)
- Consultar a posição na fila
- Cancelar a inscrição
- Chamar o próximo cliente
- Visualizar métricas e listar todos os clientes por categoria

---

### Regras de negócio

- Fila por categoria (ex: Consulta, Exame)
- Clientes com prioridade alta são chamados primeiro
- Histórico de atendimento salvo

---

Feito com ♥ by Pedro Henrique