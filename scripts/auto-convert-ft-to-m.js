// Conversion dès la création ET pendant la prévisualisation (via patch fromItem)
Hooks.once("ready", () => {
  const unit = canvas.scene.grid.units?.toLowerCase();
  if (!unit?.includes("m")) return;

  // Patch de fromItem pour agir avant même l'affichage du gabarit
  if (game.dnd5e?.canvas?.AbilityTemplate) {
    const originalFromItem = game.dnd5e.canvas.AbilityTemplate.fromItem;

    game.dnd5e.canvas.AbilityTemplate.fromItem = function (item, options = {}) {
      const template = originalFromItem.call(this, item, options);
      const dist = template?.distance;
      if (dist > 1 && dist <= 150) {
        const converted = Math.round(dist * 0.3048 * 10) / 10;
        template.distance = converted;
        console.log(`Conversion anticipée : ${dist} ft → ${converted} m`);
      }
      return template;
    };
  }

  // Conversion à la création finale
  Hooks.on("preCreateMeasuredTemplate", (template) => {
    const dist = template.distance;
    if (dist > 1 && dist <= 150) {
      const converted = Math.round(dist * 0.3048 * 10) / 10;
      console.log(`Conversion finale : ${dist} ft → ${converted} m`);
      template.updateSource({ distance: converted });
    }
  });
});
