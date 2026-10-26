# Tasks Platform API

Une API REST de gestion de tâches construite avec Node.js, Express et PostgreSQL. Le projet utilise Docker Compose pour lancer l’API et la base de données, et GitHub Actions pour automatiser les tests, le lint, le scan de sécurité et la publication de l’image Docker.

## Technologies

- Node.js et Express
- PostgreSQL
- Docker et Docker Compose
- Jest et Supertest
- ESLint
- GitHub Actions et Trivy

## Prérequis

- Node.js et npm
- Docker Desktop démarré
- Git

## Installation

Clone le dépôt et place-toi dans son dossier :

```bash
git clone https://github.com/fitchir/tasks-platform.git
cd tasks-platform
```

Crée le fichier local `.env` à partir du modèle :

```bash
cp .env.example .env
```

Les valeurs de `.env.example` sont destinées au développement local. Modifie-les si nécessaire. Ne partage pas et ne pousse pas le fichier `.env`.

## Démarrer l’application avec Docker Compose

Construis l’image et démarre l’API avec PostgreSQL :

```bash
docker compose up -d --build
```

Vérifie que les services sont démarrés et en bonne santé :

```bash
docker compose ps
```

L’API est accessible sur `http://localhost:3100`. PostgreSQL est exposé localement sur le port `15433`.

Pour consulter les journaux :

```bash
docker compose logs -f api
docker compose logs -f db
```

Pour arrêter les services :

```bash
docker compose down
```

## API

### Vérifier l’état de l’API et de la base

```http
GET /health
```

Exemple :

```bash
curl http://localhost:3100/health
```

Réponse attendue :

```json
{
  "status": "ok",
  "database": "connected"
}
```

### Lister les tâches

```http
GET /tasks
```

```bash
curl http://localhost:3100/tasks
```

### Créer une tâche

```http
POST /tasks
Content-Type: application/json
```

Le champ `title` est obligatoire. Exemple :

```bash
curl -X POST http://localhost:3100/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Read the documentation"}'
```

La tâche créée est enregistrée dans PostgreSQL.

## Tests et qualité du code

Pour installer les dépendances sur ta machine :

```bash
npm ci
```

Lancer le lint :

```bash
npm run lint
```

Lancer les tests :

```bash
npm test
```

Les tests nécessitent une base PostgreSQL accessible avec les paramètres définis dans `.env`.

## Intégration et livraison continues

À chaque push sur `master` et à chaque pull request vers `master`, GitHub Actions :

1. installe les dépendances ;
2. vérifie le code avec ESLint ;
3. exécute les tests avec PostgreSQL ;
4. construit l’image Docker ;
5. analyse l’image avec Trivy.

Après un push sur `master`, l’image est également publiée sur GitHub Container Registry (GHCR), avec un tag basé sur le commit.

## Structure du projet

```text
.
├── .github/workflows/ci.yml
├── src/
│   ├── app.js
│   ├── db.js
│   └── server.js
├── tests/
├── .env.example
├── docker-compose.yml
├── Dockerfile
└── package.json
```