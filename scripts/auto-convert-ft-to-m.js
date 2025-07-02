
Hooks.on("ready", () => {
  const unit = canvas.scene.grid.units?.toLowerCase();
  if (!unit?.includes("m")) return;

  Hooks.on("preCreateMeasuredTemplate", (template) => {
    const dist = template.distance;
    if (dist > 1 && dist <= 150) {
      const converted = Math.round(dist * 0.3048 * 10) / 10;
      console.log(`Conversion finale : ${dist} ft → ${converted} m`);
      template.updateSource({ distance: converted });
    }
  });
});
