## Objectif
Adapter le projet pour qu’il puisse être publié sur GitHub Pages.

## Point important
GitHub Pages héberge seulement des fichiers statiques. Donc les fonctions serveur, SSR, API routes, chatbot backend ou logique côté serveur ne fonctionneront pas dessus. Le site devra être transformé en version statique/SPÁ si tu veux absolument GitHub Pages.

## Plan
1. Vérifier la configuration actuelle du projet pour voir comment il est buildé.
2. Ajouter une configuration de build statique compatible GitHub Pages.
3. Gérer les routes côté navigateur pour éviter les erreurs 404 sur GitHub Pages.
4. Ajouter ou ajuster la config de déploiement GitHub Pages, par exemple via GitHub Actions.
5. Te donner les étapes exactes pour pousser le code sur GitHub puis activer Pages.

## Résultat attendu
Tu pourras publier le site sur une URL du type :

```text
https://ton-nom.github.io/nom-du-repo/
```

## Limite à accepter
Si ton site utilise des fonctionnalités backend, elles devront soit être désactivées sur GitHub Pages, soit rester hébergées ailleurs.