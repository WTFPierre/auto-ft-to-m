// Conversion à la volée pendant la création ET la prévisualisation
Hooks.once("ready", () => {
  const unit = canvas.scene.grid.units?.toLowerCase();
  if (!unit?.includes("m")) return;

  // Monkey patch : modifie drawPreview de AbilityTemplate
  if (game.dnd5e?.canvas?.AbilityTemplate) {
    const originalDrawPreview = game.dnd5e.canvas.AbilityTemplate.prototype.drawPreview;

    game.dnd5e.canvas.AbilityTemplate.prototype.drawPreview = function () {
      const distance = this.template?.distance;
      if (distance > 1 && distance <= 150) {
        const converted = Math.round(distance * 0.3048 * 10) / 10;
        this.template.distance = converted;
        console.log(`Prévisualisation convertie : ${distance} ft → ${converted} m`);
      }
      return originalDrawPreview.call(this);
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
