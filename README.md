# CMS Frontend

![GitHub](https://img.shields.io/github/license/devMatheusOliv/Content-Management-System)
![GitHub last commit](https://img.shields.io/github/last-commit/devMatheusOliv/Content-Management-System)

Um sistema de gerenciamento de conteúdo (CMS) moderno construído com React, TypeScript e Material UI.

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=CMS+Frontend+Screenshot" alt="CMS Frontend Screenshot" width="800">
</p>

## 🚀 Funcionalidades

- 🔐 Autenticação de usuários (login/registro)
- 📝 Criação, edição e exclusão de conteúdo
- 🏷️ Gerenciamento de categorias
- 🔍 Pesquisa e filtragem de conteúdo
- 📊 Dashboard com estatísticas
- 🎨 Interface moderna e responsiva

## 🛠️ Tecnologias Utilizadas

- React 18
- TypeScript
- Material UI 5
- React Router 6
- Axios para requisições HTTP
- Context API para gerenciamento de estado

## 📁 Estrutura do Projeto

```
src/
  ├── components/       # Componentes reutilizáveis
  │   ├── auth/         # Componentes de autenticação
  │   ├── content/      # Componentes relacionados a conteúdo
  │   └── layout/       # Componentes de layout (Header, Sidebar, etc.)
  ├── context/          # Contextos React (AuthContext, etc.)
  ├── pages/            # Páginas da aplicação
  ├── services/         # Serviços (API, etc.)
  ├── types/            # Definições de tipos TypeScript
  └── utils/            # Funções utilitárias
```

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/devMatheusOliv/Content-Management-System.git
cd Content-Management-System
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 📖 Uso

### Autenticação

- Acesse a página de login em `/login`
- Para criar uma nova conta, acesse `/register`

### Dashboard

Após o login, você será redirecionado para o dashboard, onde poderá ver estatísticas e informações resumidas.

### Gerenciamento de Conteúdo

- Lista de conteúdos: `/contents`
- Criar novo conteúdo: `/contents/new`
- Editar conteúdo: `/contents/edit/:id`

## ⚙️ Configuração da API

Por padrão, a aplicação está configurada para usar uma API simulada. Para conectar a uma API real, edite o arquivo `src/services/api.ts` e atualize a URL base:

```typescript
const api = axios.create({
  baseURL: "https://sua-api-real.com",
  timeout: 10000,
});
```

## 🏗️ Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `build/`.

## 🗺️ Roadmap

- [ ] Implementação de testes automatizados
- [ ] Suporte para múltiplos idiomas
- [ ] Modo escuro/claro
- [ ] Editor de conteúdo WYSIWYG avançado
- [ ] Integração com serviços de armazenamento de mídia

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Faça commit das suas alterações (`git commit -m 'Add some amazing feature'`)
4. Faça push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

Para mais detalhes, consulte o arquivo [CONTRIBUTING.md](CONTRIBUTING.md).

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Matheus Oliveira - matheus.luiz0524@gmail.com

Link do Projeto: [https://github.com/devMatheusOliv/Content-Management-System](https://github.com/devMatheusOliv/Content-Management-System)
