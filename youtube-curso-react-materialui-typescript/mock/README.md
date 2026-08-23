# Mock API (json-server)

Esta pasta contém o banco de dados fake usado pelo [json-server](https://github.com/typicode/json-server) para simular uma API REST durante o desenvolvimento.

## Arquivos

- `database.json`: arquivo com os dados. Cada chave do JSON vira um recurso (endpoint) da API. Atualmente:

```json
{
    "pessoas": []
}
```

## Como rodar

Existe um script configurado no `package.json` da raiz do projeto:

```
yarn server
```

ou

```
npm run server
```

Isso executa:

```
json-server mock/database.json --port 3333
```

A API fica disponível em `http://localhost:3333`, em uma porta diferente da aplicação React (`http://localhost:3000`), para que os dois possam rodar ao mesmo tempo.

## Endpoints disponíveis

- `GET http://localhost:3333/pessoas` — lista todas as pessoas
- `GET http://localhost:3333/pessoas/:id` — busca uma pessoa pelo id
- `POST http://localhost:3333/pessoas` — cria uma nova pessoa
- `PUT http://localhost:3333/pessoas/:id` — atualiza uma pessoa (substitui o recurso inteiro)
- `PATCH http://localhost:3333/pessoas/:id` — atualiza parcialmente uma pessoa
- `DELETE http://localhost:3333/pessoas/:id` — remove uma pessoa

O json-server observa o arquivo `database.json` e recarrega automaticamente quando ele é alterado (manualmente ou pelas próprias requisições feitas à API).

## Observações

- Como estamos usando `json-server` na versão 1.x (beta), a sintaxe de CLI e alguns comportamentos diferem da versão 0.x usada em tutoriais mais antigos (por exemplo, não é mais necessário o flag `--watch`).
- Novos recursos podem ser adicionados apenas incluindo uma nova chave no `database.json` (ex.: `"produtos": []`), sem necessidade de configuração adicional.
