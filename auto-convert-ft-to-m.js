
// Conversion automatique des distances en pieds vers mètres (1 ft = 0.3 m environ)
Hooks.on("preCreateMeasuredTemplate", (template) => {
  const original = template.distance;
  const unit = canvas.scene.grid.units;

  // Si la scène utilise des mètres et que la distance semble être en pieds (valeur typique D&D5)
  if (unit.toLowerCase().includes("m") && original > 1 && original <= 150) {
    const converted = Math.round((original * 0.3048) * 10) / 10; // arrondi à 0.1 m
    console.log(`Conversion automatique : ${original} ft → ${converted} m`);
    template.updateSource({ distance: converted });
  }
});
