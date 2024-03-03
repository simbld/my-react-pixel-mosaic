function generateStipplingEffect(imageData) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  // Assurez-vous que la taille du canvas correspond à celle de l'image
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  
  // Convertir imageData en niveaux de gris et placer des points basés sur la luminosité
  for (let y = 0; y < imageData.height; y += 10) { // Le pas de 10 contrôle la densité des points
    for (let x = 0; x < imageData.width; x += 10) {
      const index = (x + y * imageData.width) * 4;
      const r = imageData.data[index];
      const g = imageData.data[index + 1];
      const b = imageData.data[index + 2];
      const brightness = 0.3 * r + 0.59 * g + 0.11 * b; // Calcul simplifié de la luminosité
          
      if (brightness < 128) { // Seuil de luminosité pour décider de placer un point
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2); // Taille des points
        ctx.fill();
      }
    }
  }
  
  return canvas.toDataURL(); // Renvoie une représentation sous forme de data URL du canvas
}

export default generateStipplingEffect;