<p align="center">

![using-react-redux-connect-with-typescript-tn2](https://github.com/simbld/my-react-pixel-mosaic/assets/102648783/39814e7e-e6c7-4547-bf93-4e0456a43834)

</p>
<br>
Logique du Convertisseur de pixel
---------------------------------------------

1. Parcours des Pixels de l'Image
L'image est parcourue pixel par pixel, de gauche à droite et de haut en bas. Chaque pixel est analysé pour déterminer sa couleur.

2. Conversion en Nuance de Gris
Cela est réalisé par l'opération (r + g + b) / 3
chaque pixel est représenté par une valeur de luminosité

3. Sélection du Caractère ASCII
La chaîne density est une suite de caractères ASCII ordonnés du plus sombre au plus clair (Ñ@#W$9876543210?!abc;:+=-,._ )

Pour déterminer quel caractère utiliser, nous appliquons une fonction map qui convertit la valeur de luminosité (allant de 0 à 255) en un indice correspondant dans la chaîne density.

4. En répétant ce processus pour chaque pixel de l'image et en plaçant les caractères ASCII correspondants dans un format qui respecte les dimensions de l'image originale, nous créons une représentation de l'image en art ASCII.

5. Créer plusieurs filtres qui possèdent chacun leur bouton et qui donne un aspect entièrement différent de la même image en changeant la logique de conversion.
<p align="center">
<img width="137" height="137" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" /> <img width="137" height="137" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg" />
</p>

