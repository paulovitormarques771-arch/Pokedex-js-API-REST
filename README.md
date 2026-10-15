# Pokédex de Kanto — Desafio DIO

Pokédex desenvolvida para o desafio de projeto da Digital Innovation One, baseada nos arquivos do projeto [js-developer-pokedex](https://github.com/digitalinnovationone/js-developer-pokedex).

## Funcionalidades
- Catálogo dos 151 Pokémon da primeira geração.
- Consumo da API REST pública [PokéAPI](https://pokeapi.co/) com `fetch`, requisições assíncronas e `Promise.all`.
- Busca por nome ou número, filtros por qualquer tipo e ordenação.
- Paginação incremental e detalhes com altura, peso, habilidades e estatísticas.
- Layout adaptável a telas pequenas e grandes, navegação por teclado e tratamento de falhas da API.
- Uma cópia pública dos dados permite explorar a coleção enquanto a API atualiza ou está indisponível.

## Tecnologias
HTML semântico, CSS, JavaScript/TypeScript, React, TanStack Start, TanStack Query e Tailwind CSS. O original em JavaScript foi adaptado ao ambiente do Lovable; este repositório não é uma implementação exclusivamente em JavaScript puro.

## Executar localmente
Com Node.js e Bun instalados:
```sh
bun install
bun run dev
```
Para os testes:
```sh
bun run test
```

## Conceitos praticados
Consumo de API REST, objetos e arrays, `map`, `filter`, ordenação, funções assíncronas, estados da interface, CSS Grid, acessibilidade e versionamento no Git/GitHub.

## Entregar na DIO
1. No Lovable, abra **Configurações do projeto → Git → GitHub** e conecte sua conta para criar seu próprio repositório.
2. Confirme que o código e este README aparecem no seu repositório.
3. Envie o endereço desse repositório na entrega do desafio da DIO. Se desejar, acrescente o link da versão publicada.

## Créditos
Projeto-base e desafio: [Digital Innovation One](https://github.com/digitalinnovationone/js-developer-pokedex). Dados: [PokéAPI](https://pokeapi.co/). Ilustrações oficiais provenientes do repositório de sprites da PokéAPI. Pokémon e os personagens pertencem à Nintendo, Game Freak e The Pokémon Company. Projeto educacional sem vínculo com essas empresas.
