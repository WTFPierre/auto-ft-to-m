console.log(">>> auto-convert-ft-to-m.js CHARGÉ");

Hooks.once("ready", () => {
  console.log("HOOK EARLY + FINALE LOADED");

  const unit = canvas.scene.grid.units?.toLowerCase();
  if (!unit?.includes("m")) return;

  // Patch prévisualisation
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

  // Patch final à la pose
  Hooks.on("preCreateMeasuredTemplate", (template) => {
    const dist = template.distance;
    if (dist > 1 && dist <= 150) {
      const converted = Math.round(dist * 0.3048 * 10) / 10;
      console.log(`Conversion finale : ${dist} ft → ${converted} m`);
      template.updateSource({ distance: converted });
    }
  });
});
