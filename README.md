# Prática de CI/CD, Inventário de Dependências e SBOM

## 1. Objetivo

Construir um pipeline de Integração Contínua (CI) utilizando GitHub Actions para executar testes automatizados, auditar dependências, gerar um inventário de componentes de software (SBOM) e disponibilizar esse inventário como artefato.

## 2. Tecnologias utilizadas

- **Node.js 24:** ambiente de execução da aplicação.
- **npm 11.12.1:** gerenciamento de dependências e execução de scripts.
- **Git:** controle de versão.
- **GitHub:** hospedagem do código-fonte.
- **GitHub Actions:** automação do pipeline.
- **CycloneDX:** formato utilizado para representar o SBOM.
- **Day.js 1.11.23:** biblioteca utilizada para formatar a data e a hora.

## 3. Estrutura do projeto

```text
ci-cd/
├── .github/
│   └── workflows/
│       └── ci.yml
├── test/
│   └── projeto.test.js
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
├── sbom.json
└── README.md
```

## 4. Etapas do pipeline

O workflow é acionado quando há um envio de alterações para a branch `main` ou um pull request direcionado a ela.

1. **Checkout:** obtém o código-fonte do repositório.
2. **Configuração do Node.js:** prepara o ambiente de execução.
3. **Instalação das dependências:** executa `npm ci`, utilizando o arquivo `package-lock.json`.
4. **Testes automatizados:** executa `npm test` para verificar o comportamento da aplicação.
5. **Auditoria de dependências:** executa `npm audit --audit-level=high` para verificar vulnerabilidades conhecidas de severidade alta ou crítica.
6. **Geração do SBOM:** utiliza `@cyclonedx/cyclonedx-npm` para produzir o arquivo `sbom.json`.
7. **Publicação do artefato:** disponibiliza o SBOM para download na execução do GitHub Actions.

## 5. Inventário de dependências

A dependência direta utilizada na aplicação é:

| Componente | Versão | Finalidade |
|---|---|---|
| dayjs | 1.11.23 | Formatação de data e hora |

O arquivo `package-lock.json` registra a árvore de dependências e as versões resolvidas pelo npm.

O SBOM também registra metadados do componente, licença declarada, referências externas e hash do pacote quando essas informações estão disponíveis.

## 6. SBOM

O arquivo `sbom.json` foi gerado no formato **CycloneDX 1.6**.

Ele identifica a aplicação `ci-cd@1.0.0` e registra a dependência `dayjs@1.11.23`, incluindo a relação entre a aplicação e o componente.

O SBOM permite consultar os componentes identificados e auxilia na investigação de possíveis vulnerabilidades. Entretanto, sua geração, isoladamente, não comprova a ausência de falhas de segurança.

## 7. Testes automatizados

Foi criado um teste utilizando o test runner nativo do Node.js.

O teste verifica:
- O nome retornado pela aplicação.
- O status da verificação.
- O formato da data e hora retornadas.

**Resultado observado localmente:** 1 teste aprovado e 0 falhas.

## 8. Auditoria de segurança

Foi executado o comando:

```bash
npm audit
```

**Resultado observado:** `found 0 vulnerabilities`.

Isso significa que o npm não identificou vulnerabilidades conhecidas aplicáveis às dependências analisadas naquele momento. O resultado não garante que o software esteja livre de todas as vulnerabilidades.

O pipeline também executa `npm audit --audit-level=high`, que define alta severidade como limite para falha da etapa.

## 9. Resultados da prática

Durante a prática, foi possível:

- Criar e versionar uma aplicação simples.
- Implementar um teste automatizado.
- Publicar o código no GitHub.
- Configurar um pipeline de CI com GitHub Actions.
- Automatizar a auditoria de dependências.
- Gerar um SBOM CycloneDX.
- Publicar o SBOM como artefato para download.

## 10. Evidências

Para comprovar a execução, podem ser anexadas capturas de tela de:

1. Execução local de `npm test`.
2. Arquivo `sbom.json`.
3. Workflow concluído com sucesso na aba Actions.
4. Etapa de auditoria de dependências.
5. Artefato `sbom-cyclonedx` disponível para download.

## 11. Limitações e melhorias futuras

Esta prática utiliza uma aplicação pequena e demonstra um pipeline inicial de CI. O fluxo ainda pode ser ampliado com testes adicionais, análise de código, verificação de licenças, políticas de segurança, publicação controlada de releases e geração de SBOM associado a cada versão distribuída.
