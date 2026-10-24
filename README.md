# Tasks Platform

Petite API Express utilisée comme fil rouge pour apprendre Docker et la CI/CD.

## Prérequis

- Node.js 20 ou plus récent
- npm

## Lancer l'API

```bash
npm install
npm start
```

Puis ouvrir http://localhost:3000/health. La réponse attendue est :

```json
{"status":"ok"}
```

## Lancer les tests

```bash
npm test
```
