# Leilão Onine de carteira de dívidas

Este projeto utiliza Next.js para desenvolvimento web, Material-UI como biblioteca de componentes. Abaixo estão as instruções para configurar e rodar o projeto.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- Node.js (versão 14.x ou superior)
- npm ou yarn

## Primeiros Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/ailsonazevedo/auction-front.git
   cd auction-front
   ```

2. **Instale as dependências**:

   ```bash
   # para yarn
   yarn install

   # para npm
   npm i
   ```

### Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias. Exemplo:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://127.0.0.1:8000
```

3. **Scripts**:

   #### Desenvolvimento:

    - Iniciar o servidor de desenvolvimento do Next.js:

      <pre><code>yarn dev</code></pre>
      <pre><code>npm run dev</code></pre>

   #### Build:

    - Para fazer o build da aplicação web:

      <pre><code>yarn build</code></pre>
      <pre><code>npm run build</code></pre>

   #### Iniciar Build:

   ```bash
   # Para rodar o build da aplicação web
   yarn start
   npm run start
   ```


#### Configurar Prettier no VSCode:

1. Instale a extensão Prettier - Code formatter no [`VSCode`](...).
2. Adicione a seguinte configuração no arquivo settings.json do VSCode:

```json
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
```

#### Configurar Prettier no WebStorm:

1. Instale a extensão Prettier no [`WebStorm`](...) na aba de plugins.
2. Vá em File > Settings > Languages & Frameworks > JavaScript > Prettier e marque a opção "Automatic Prettier Configuration" e "Run on save".

## Estrutura do Projeto

A estrutura básica do projeto:

```bash
root
├── .husky
├── public
├── src
│   ├── @types
│   ├── app
│   ├── components
│   │   ├── @shared
│   │   ├── auth
│   │   ├── auction
│   │   ├── profile
│   │   ├── Layouts
│   ├── hooks
│   └──...
├── __mocks__
├── .eslint.json
├── .prettierrc
├── .husky
├── package.json
└── ...
```

Made with :heart: by <a href="https://github.com/ailsonazevedo" target="_blank">Ailson Azevedo</a>
