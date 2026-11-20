# Giro de Garagem

Blog de Endrick Ferreira Pedroso e Heitor Flores Liberali. Motores, modelos e conversas de quem gosta de entender o carro por dentro.

## Configurar o Supabase

1. Crie um projeto no Supabase e abra o SQL Editor. Execute primeiro `backend/database/schema.sql` e depois `backend/database/seed.sql`. O segundo arquivo carrega 5 artigos.
2. Na opção **Connect**, copie o host, a porta e o usuário da conexão **Session pooler**. O servidor Java usa PostgreSQL por JDBC. Em `DB_PASSWORD`, use a senha do banco do projeto.
3. Na raiz do repositório, copie `.env.example` para `.env`. Preencha os quatro valores. Mantenha o prefixo `jdbc:postgresql://` e o final `/postgres?sslmode=require`. Defina sua própria senha de edição em `EDITOR_PASSWORD`. Guarde o arquivo somente na sua máquina. A tabela usa RLS e o servidor conecta com o usuário administrativo do projeto.

## Executar

Use JDK 17 ou 21, Maven 3.8+ e internet na primeira compilação. No Codespaces, abra o terminal do repositório. No Windows, estes comandos funcionam no Git Bash. As aspas simples no arquivo de exemplo preservam espaços e símbolos comuns nas senhas.

```bash
set -a
source .env
set +a
cd backend
mvn spring-boot:run
```

Abra http://localhost:8080 ou a porta 8080 na aba **Ports** do Codespaces. O Spring serve as três páginas e a API na mesma porta. Reabra o processo após mudar as variáveis. Para gerar um JAR com o site completo, execute `mvn clean package` dentro de backend e depois `java -jar target/giro-de-garagem-1.0.0.jar`, com as variáveis carregadas.

## Navegação e API

| Operação | Endereço |
| --- | --- |
| Página inicial | `/` |
| Ler um artigo | `/artigo.html?id=1` (use um ID da listagem) |
| Escrever | `/criar.html` |
| Listar, buscar e filtrar | `GET /api/publicacoes?q=texto&categoria=nome` |
| Consultar pelo ID | `GET /api/publicacoes/1` |
| Cadastrar | `POST /api/publicacoes` |

Os dois parâmetros da listagem são opcionais e podem ser combinados. A busca consulta título, conteúdo e categoria. Os resultados vêm do mais recente para o mais antigo. No POST, envie JSON com `titulo`, `categoria`, `descricao` (resumo opcional) e `conteudo`. Envie a senha no cabeçalho `X-Senha-Editor`. O formulário monta essa requisição. O servidor define a data e o ID.

Respostas principais: 200 para consulta, 201 para cadastro, 400 para dados inválidos, 403 para senha incorreta e 404 para artigo inexistente.

## Organização e entrega

- `frontend/` contém as páginas HTML, o CSS, o JavaScript e a ilustração da capa.
- `backend/` contém o projeto Maven, o código Java, a configuração e os scripts SQL.
- `.devcontainer/` configura o Codespaces. `.env.example` serve como modelo.
- Extraia o ZIP. Coloque **o conteúdo da pasta giro-de-garagem** na raiz de um repositório próprio, inclusive os arquivos com ponto no início. Entregue o endereço do repositório ao professor. Para executar, use Spring Boot ou Codespaces com suas variáveis configuradas.

A estrutura inicial do backend foi adaptada do GameBlog fornecido na atividade. A licença Apache 2.0 original acompanha o código.

## Senha Supabase
- atx7jV9PpWFGbOpw
- 
