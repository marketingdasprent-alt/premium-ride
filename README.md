# Premium Ride

Novo site baseado no Web Blueprint 2.0.0, sem alterações ao blueprint original ou ao site anterior.

Idioma: pt-PT. Identidade: carvão, dourado e marfim. Componentes reutilizados: Container, Section, Button e Input; cascade CSS, reset e TypeScript strict preservados.

## Desenvolvimento

`npm install` e `npm run dev`. Validação: `npm run check`.

## Conteúdo e limitações

O telefone +351 910 131 072, localização Lisboa e logótipo provêm do projeto Premium-ride existente. Não são apresentados preços, modelos de frota confirmados, avaliações ou números inventados.

O formulário apenas prepara um texto no navegador para copiar e confirmar por telefone. Não transmite dados, não confirma reservas e não exige pagamento. Não inclui analítica, cookies opcionais ou integrações externas. O texto de privacidade descreve apenas esse funcionamento; uma política comercial completa deve ser validada pela empresa antes de utilização pública.

Fotografia ilustrativa: https://unsplash.com/s/photos/luxury-chauffeur — asset https://images.unsplash.com/photo-1764089859662-7b4773dff85b. Não representa a frota real. Logótipo fornecido no projeto anterior.

## Publicação

O adaptador em scripts/package-worker.mjs mantém o frontend React/Vite do Blueprint e gera um Worker ESM para Sites. O plugin Sites copia os metadados da hospedagem; os ficheiros estáticos ficam em dist/client.
