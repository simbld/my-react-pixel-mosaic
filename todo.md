> # CONTEXT

### Étape 1 : Créer un Contexte

`créer un nouveau contexte en utilisant React.createContext()`

#### // ThemeContext.js

```bash

import React from 'react';

const ThemeContext = React.createContext();

export default ThemeContext;
```

### Étape 2 : Fournir un Contexte

`Utiliser le composant Provider du contexte créé pour envelopper votre arborescence de composants dans le composant de niveau supérieur de votre application (souvent App.js). Vous pouvez passer à ce Provider une valeur qui sera accessible à tous les composants enfants qui consomment ce contexte.`

#### // App.js

```bash

import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/*Le reste de votre application*/}
    </ThemeContext.Provider>
  );
}

export default App;
```

### Étape 3 : Consommer un Contexte

`Enfin, utilisez le Hook useContext dans n'importe quel composant enfant pour accéder à la valeur du contexte. Cela vous permet d'accéder aux données d'état global et de les modifier si nécessaire, sans avoir à passer les props manuellement à travers chaque niveau de composants.`

#### // SomeChildComponent.js

```bash

import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

function SomeChildComponent() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Le thème actuel est {theme}.</p>
      <button onClick={() => setTheme("dark")}>Changer le thème</button>
    </div>
  );
}

export default SomeChildComponent;

```

> # Gestion des Uploads d'Images

`Pour s'assurer que votre application gère bien les uploads d'images de toutes tailles sans erreur, vous pouvez :`

### 1. Valider le type et la taille de l'image

`Avant le téléchargement, vérifiez que le fichier est bien une image et qu'il ne dépasse pas une certaine taille.`

### 2. Redimensionner l'image côté client

`Utilisez un canvas HTML, comme expliqué précédemment, pour redimensionner l'image à une taille gérable avant l'envoi au serveur ou l'affichage dans l'interface utilisateur.`

### 3. Gestion d'erreurs

`Assurez-vous que votre code gère correctement les erreurs qui peuvent survenir pendant le processus d'upload, comme des problèmes de réseau ou des erreurs serveur.`

> # État Global vs Local

### Informations de l'utilisateur

`après l'authentification, stocker les informations de l'utilisateur telles que le nom, l'email, et les rôles pour y accéder facilement à travers l'application.
Notifications : gérer l'affichage de messages ou notifications globales.`

### Cache de données

`stocker des données récupérées depuis un serveur pour éviter de multiples requêtes pour les mêmes informations.`

`Contexte React et Redux sont deux solutions pour gérer l'état global :`

### Contexte React

`Permet de passer des données à travers l'arborescence des composants sans avoir à passer manuellement les props à chaque niveau. Utile pour des états globaux plus simples ou des applications de taille moyenne.`

### Redux moderne avec Redux Toolkit

`Une bibliothèque de gestion d'état prédictible pour applications JavaScript. Redux maintient l'état de l'application dans un seul objet global. Il est bien adapté pour gérer des états globaux complexes et des interactions d'état entre de nombreux composants, avec des outils pour gérer les actions de manière prédictible.`
