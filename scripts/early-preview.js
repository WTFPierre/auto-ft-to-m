Hooks.once("ready", () => {
  console.log("HOOK EARLY LOADED"); // ← vérifie qu'il s'exécute

  const unit = canvas.scene.grid.units?.toLowerCase();
  if (!unit?.includes("m")) return;

  // Patch AbilityTemplate.fromItem pour modifier la distance avant la preview
  if (game.dnd5e?.canvas?.AbilityTemplate) {
    const originalFromItem = game.dnd5e.canvas.AbilityTemplate.fromItem;

    game.dnd5e.canvas.AbilityTemplate.fromItem = function (item, options = {}) {
      const template = originalFromItem.call(this, item, options);
      const dist = template?.distance;

      if (dist > 1 && dist <= 150) {
        const converted = Math.round(dist * 0.3048 * 10) / 10;
        template.distance = converted;
        console.log(`Conversion pré-visualisation : ${dist} ft → ${converted} m`);
      }

      return template;
    };
  }
});
