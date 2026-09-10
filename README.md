# 🖥️ GestãoPro — Frontend

Interface web do GestãoPro, desenvolvida com Angular e integrada à API REST do Management System.

O projeto permite visualizar e gerenciar as principais funcionalidades do sistema, como produtos, clientes, vendas e estoque.

---

## ✨ Funcionalidades

- Gerenciamento de produtos
- Gerenciamento de clientes
- Registro e acompanhamento de vendas
- Controle de estoque
- Dashboard para monitoramento de vendas e estoque
- Login de usuários

---

## 🛠️ Tecnologias utilizadas

- Angular 19
- TypeScript 5.7
- HTML
- SCSS
- Bootstrap 5
- RxJS
- Angular Router
- Angular HttpClient
- Chart.js
- Docker
- Docker Compose
- Nginx

---

## 🐳 Como executar

### Pré-requisitos

* Docker
* Docker Compose

### Execução

Para executar a aplicação:

```bash
docker compose up --build
```

> Use `--build` na primeira execução e sempre que alterar o código-fonte ou o `Dockerfile`. Nas demais, utilize:

```bash
docker compose up
```

A aplicação estará disponível em:

```text
http://localhost
```

> No ambiente de produção, o Nginx é responsável por servir a aplicação Angular e encaminhar as requisições para a API.

### Ambiente de desenvolvimento

Para executar o ambiente de desenvolvimento:

```bash
docker compose -f compose-dev.yaml up --build
```

> Use `--build` na primeira execução ou ao alterar o `Dockerfile-dev`. Nas demais, utilize:

```bash
docker compose -f compose-dev.yaml up
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

---

## 🔗 Backend

O frontend utiliza a API REST desenvolvida com Java e Spring Boot.

Repositório do backend:

[Management System — Backend](https://github.com/anatroiano/management-system-api)

---

## 👩‍💻 Autora

Ana Carolina Troiano
