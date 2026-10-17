# Pet Manager - Sistema de Gerenciamento de Pets e Tutores

## 📋 Dados de Inscrição

- **Nome do Candidato:** João Angello Rodrigues de Oliveira
- **Vaga Pretendida:** Desenvolvedor Front End

---

## 🚀 Sobre o Projeto

Este projeto é uma **SPA (Single Page Application)** desenvolvida em **React** com **Next.js 16** para gerenciamento de Pets e seus Tutores. A aplicação consome a API pública do Estado de Mato Grosso para registro de Pets, permitindo operações de CRUD completas.

**Acesse a aplicação disponivel online:** https://pet-manager-joaoangello.vercel.app/

### 🔗 API

- **Swagger:** https://pet-manager-api.geia.vip/q/swagger-ui/
- **Base URL:** https://pet-manager-api.geia.vip

### 🔐 Credenciais de Acesso

- **Usuário:** admin
- **Senha:** admin

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura em camadas, separando responsabilidades de forma clara:

```
src/
├── app/                    # Páginas da aplicação (App Router do Next.js)
│   ├── api/               # API Routes (health check)
│   ├── login/             # Página de autenticação
│   ├── pets/              # Módulo de Pets
│   │   ├── [id]/          # Detalhes e edição de Pet
│   │   └── novo/          # Cadastro de novo Pet
│   └── tutores/           # Módulo de Tutores
│       ├── [id]/          # Detalhes, edição e vinculação de Pet
│       └── novo/          # Cadastro de novo Tutor
├── components/            # Componentes reutilizáveis
│   ├── common/            # Componentes genéricos (Button, Input, Card, etc.)
│   ├── pets/              # Componentes específicos de Pets
│   └── tutores/           # Componentes específicos de Tutores
├── contexts/              # Contextos React (AuthContext)
├── hooks/                 # Custom Hooks (usePets, useTutores, usePagination)
├── services/              # Camada de serviços (comunicação com API)
├── types/                 # Definições de tipos TypeScript
└── utils/                 # Utilitários (máscaras, validadores, formatadores)
```

### 📐 Padrões Utilizados

- **Componentes Funcionais:** Utilizando React Hooks
- **Context API:** Para gerenciamento de estado de autenticação
- **Custom Hooks:** Para lógica reutilizável (paginação, busca, CRUD)
- **Service Layer:** Camada de abstração para comunicação com API
- **Type-Safe:** TypeScript em toda a aplicação
- **Componentização:** Componentes pequenos e reutilizáveis

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia      | Versão  | Descrição                      |
| --------------- | ------- | ------------------------------ |
| Next.js         | 16.1.6  | Framework React com App Router |
| React           | 19.2.3  | Biblioteca de UI               |
| TypeScript      | 5.x     | Tipagem estática               |
| Tailwind CSS    | 4.x     | Framework CSS utility-first    |
| Axios           | 1.13.4  | Cliente HTTP                   |
| React Hook Form | 7.71.1  | Gerenciamento de formulários   |
| Zod             | 4.3.6   | Validação de schemas           |
| Lucide React    | 0.563.0 | Biblioteca de ícones           |
| Jest            | 29.x    | Framework de testes            |
| Testing Library | 16.x    | Testes de componentes          |

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20.x ou superior
- npm 10.x ou superior
- Docker e Docker Compose (opcional)

### Instalação Local

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório do projeto
cd pet-manager

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build de Produção

```bash
# Gerar build de produção
npm run build

# Executar em modo produção
npm start
```

---

## 🐳 Execução com Docker

### Usando Docker Compose (Recomendado)

```bash
# Construir e executar
docker-compose up --build

# Ou em background
docker-compose up -d --build

# Parar o container
docker-compose down
```

### Usando Docker diretamente

```bash
# Construir a imagem
docker build -t pet-manager .

# Executar o container
docker run -p 3000:3000 pet-manager
```

Após executar, acesse [http://localhost:3000](http://localhost:3000).

### Health Check

O endpoint de health check está disponível em: `GET /api/health`

```bash
curl http://localhost:3000/api/health
```

Resposta esperada:

```json
{
  "status": "healthy",
  "timestamp": "2025-07-22T00:00:00.000Z"
}
```

---

## 🧪 Testes

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar com coverage
npm test -- --coverage

# Executar em modo watch
npm test -- --watch
```

### Cobertura de Testes

Os testes unitários cobrem:

- **Máscaras (masks.ts):** Formatação de telefone e CPF
- **Formatadores (formatters.ts):** Formatação de exibição de dados

---

## ✅ Requisitos Implementados

### Requisitos Gerais

- [x] Requisitar dados em tempo real (axios)
- [x] Layout responsivo
- [x] Tailwind CSS como framework CSS
- [x] Lazy Loading Routes (Next.js App Router com dynamic imports)
- [x] Paginação (10 itens por página)
- [x] TypeScript
- [x] Boas práticas de organização e componentização
- [x] Testes unitários básicos

### Requisitos Específicos

#### 1. Tela Inicial - Listagem de Pets

- [x] GET /v1/pets
- [x] Exibição em cards (foto, nome, espécie, idade)
- [x] Paginação (10 por página)
- [x] Busca por nome para filtrar

#### 2. Tela de Detalhamento do Pet

- [x] Navegação ao clicar no card
- [x] GET /v1/pets/{id}
- [x] Exibição de dados do tutor vinculado
- [x] Destaque ao nome do pet

#### 3. Tela de Cadastro/Edição de Pet

- [x] Formulário novo pet (POST /v1/pets)
- [x] Edição (PUT /v1/pets/{id})
- [x] Campos: nome, espécie, idade, raça
- [x] Upload de foto (POST /v1/pets/{id}/fotos)
- [x] Validação com Zod

#### 4. Tela de Cadastro/Edição de Tutor

- [x] Cadastro de tutores (POST /v1/tutores)
- [x] Atualização (PUT /v1/tutores/{id})
- [x] Campos: nome completo, telefone, endereço
- [x] Upload de foto (POST /v1/tutores/{id}/fotos)
- [x] Máscaras de entrada (telefone, CPF)

#### 5. Vinculação Pet-Tutor

- [x] Listagem de pets vinculados na tela do tutor
- [x] Vincular novo pet (POST /v1/tutores/{id}/pets/{petId})
- [x] Remover vínculo (DELETE /v1/tutores/{id}/pets/{petId})

#### 6. Autenticação

- [x] Autenticação via POST /autenticacao/login
- [x] Gerenciamento de expiração do token via PUT /autenticacao/refresh
- [x] Interceptor Axios para refresh automático

### Requisitos Sênior

- [x] Health Check (GET /api/health)
- [x] Testes unitários
- [x] Arquitetura em camadas (services, hooks, components)

---

## 📁 Estrutura de Commits

O projeto foi desenvolvido com commits pequenos e descritivos:

1. `chore: inicializa projeto Next.js com TypeScript e Tailwind CSS`
2. `chore: adiciona dependências do projeto`
3. `feat: adiciona tipos TypeScript baseados na OpenAPI`
4. `feat: implementa camada de serviços para comunicação com API`
5. `feat: implementa contexto de autenticação`
6. `feat: adiciona utilitários de máscaras, validadores e formatadores`
7. `feat: implementa componentes comuns reutilizáveis`
8. `feat: implementa hooks customizados`
9. `feat: implementa componentes de Pets e Tutores`
10. `feat: implementa páginas da aplicação`
11. `test: adiciona testes unitários para utilitários`
12. `chore: configura Docker e documenta projeto`
13. `fix: resolve conflito de exportação circular em tipos`

---

## 🔧 Configurações Adicionais

### ESLint

O projeto utiliza ESLint com a configuração padrão do Next.js para manter a qualidade do código.

### TypeScript

Configuração estrita do TypeScript para garantir type-safety em toda a aplicação.

### Tailwind CSS

Utiliza Tailwind CSS 4 com configuração padrão do Next.js.

---

## 📝 Observações

- A aplicação está totalmente funcional e pronta para produção.
- O Docker está configurado com multi-stage build para otimização da imagem.
- O health check permite monitoramento da aplicação em ambientes containerizados.
- A autenticação inclui refresh automático do token antes da expiração.

---

## 📄 Licença

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Front End.
