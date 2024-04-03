# MarocExplore API

Bienvenue dans l'API MarocExplore, qui fournit des fonctionnalités pour explorer des itinéraires de voyage et des destinations au Maroc.

## Fonctionnalités

- **Gestion des itinéraires** : Créez, modifiez, recherchez et filtrez des itinéraires de voyage.
- **Gestion des destinations** : Ajoutez, modifiez et supprimez des destinations associées à chaque itinéraire.
- **Liste à visualiser** : Permettez aux utilisateurs d'ajouter des itinéraires à leur liste à visualiser et de les afficher ultérieurement.
- **Authentification** : Protégez les fonctionnalités sensibles avec l'authentification basée sur les tokens JWT.

## Comment utiliser

1. **Installation** : Clonez ce dépôt sur votre machine locale.

2. **Configuration de l'environnement** : Copiez le fichier `.env.example` et renommez-le en `.env`. Configurez les variables d'environnement telles que la connexion à la base de données et la clé JWT.

3. **Installation des dépendances** : Exécutez `composer install` pour installer les dépendances PHP et `npm install` pour installer les dépendances JavaScript.

4. **Migration de la base de données** : Exécutez `php artisan migrate` pour migrer les tables de la base de données.

5. **Génération de la clé JWT** : Exécutez `php artisan jwt:secret` pour générer la clé secrète JWT.

6. **Démarrage du serveur** : Exécutez `php artisan serve` pour démarrer le serveur de développement.

7. **Documentation** : Consultez la documentation de l'API dans le fichier `MarocExploreApi.postman_collection.json` pour obtenir des instructions détaillées sur l'utilisation des endpoints.

## Contributions

Les contributions sont les bienvenues ! Si vous avez des suggestions d'amélioration ou des fonctionnalités que vous souhaitez ajouter, veuillez ouvrir une nouvelle issue ou créer une pull request.

## Auteurs

- [Douae Sebti](https://github.com/Douaesb)

