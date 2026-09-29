# CI/CD com Cypress e GitHub Actions

### DIO - Desafio de Projeto

Projeto desenvolvido como parte do desafio **CI/CD com Cypress e GitHub Actions** da trilha de Cypress da DIO.

O objetivo é aplicar na prática conceitos de automação de testes de API, integração contínua, GitHub Actions e Cypress Cloud.

## Projeto

Este repositório foi criado a partir de um **fork do projeto disponibilizado pela DIO**, utilizando como referência a branch `part2`.

Os testes utilizam a API pública **Restful Booker** e estão organizados em:

```text
cypress/e2e/APITests
```

O projeto também está integrado ao **Cypress Cloud**, utilizando o `projectId`:

```text
4qaf56
```

configurado em:

```text
cypress.config.js
```

## Tecnologias utilizadas

- Cypress
- JavaScript
- Node.js
- Git
- GitHub
- GitHub Actions
- Cypress Cloud
- Restful Booker API

## Executar localmente

Instale as dependências:

```bash
npm install
```

Execute os testes de API:

```bash
npm run run-api-tests
```

Para executar todos os specs:

```bash
npm run run-other-tests
```

## Cypress Cloud

As execuções podem ser registradas no Cypress Cloud.

O `projectId` pode permanecer no arquivo `cypress.config.js`, porém o `CYPRESS_RECORD_KEY` é tratado como informação secreta e não deve ser versionado no repositório.

No GitHub, a chave foi configurada em:

```text
Settings
→ Secrets and variables
→ Actions
→ CYPRESS_RECORD_KEY
```

O workflow utiliza o secret através de:

```yaml
${{ secrets.CYPRESS_RECORD_KEY }}
```

## GitHub Actions

O workflow está localizado em:

```text
.github/workflows/cypress.yml
```

A pipeline executa os testes automaticamente nos eventos de `push` e `pull_request` direcionados à branch `part2`.

O fluxo da automação é:

```text
Push / Pull Request
        ↓
GitHub Actions
        ↓
Instalação das dependências
        ↓
Execução dos testes Cypress
        ↓
Cypress Cloud
        ↓
Resultado da execução
```

O `GITHUB_TOKEN` utilizado pelo workflow é disponibilizado automaticamente pelo GitHub Actions.

Como customização adicional, o workflow também:

- cancela execuções anteriores da mesma branch quando uma nova execução é iniciada;
- define limite de tempo para evitar jobs presos por longos períodos;
- registra as execuções no Cypress Cloud.

## Resultado

A pipeline foi executada com sucesso através do GitHub Actions, com os testes Cypress integrados ao Cypress Cloud.

Durante a implementação também foi necessário revisar um cenário que utilizava um ID fixo da API Restful Booker. O teste foi ajustado para utilizar dados válidos da API, tornando a automação mais resiliente.

## Conhecimentos aplicados

Durante o desafio foram praticados conceitos de:

- automação de testes de API
- Cypress
- execução de testes em modo headless
- CI/CD
- criação de pipelines
- GitHub Actions
- Secrets
- Cypress Cloud
- análise de falhas em pipeline
- manutenção de testes automatizados
- Git e GitHub

## Autora

**Camila Souza Nascimento**

Projeto desenvolvido durante a formação de **Automação de Testes com Cypress - DIO**.