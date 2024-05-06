const fs = require("fs");
const path = require("path");

// Ruta a la carpeta "prompts"
const promptsFolder = path.join(__dirname, "prompts");

// Leer archivos de la carpeta "prompts"
fs.readdir(promptsFolder, (err, files) => {
  if (err) {
    console.error("Error al leer la carpeta de prompts:", err);
    return;
  }

  // Leer cada archivo .txt y agregar su contenido al arreglo "customCommands"
  const customCommands = [];
  files.forEach((file) => {
    if (file.endsWith(".txt")) {
      const filePath = path.join(promptsFolder, file);
      const contenido = fs.readFileSync(filePath, "utf-8");
      const objeto = JSON.parse(contenido);
      customCommands.push(objeto);
    }
  });

  // Actualizar el archivo .continuerc.json con los nuevos customCommands
  const configFile = path.join(__dirname, ".continuerc.json");
  const configuracionActual = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  configuracionActual.customCommands = customCommands;
  fs.writeFileSync(configFile, JSON.stringify(configuracionActual, null, 2));
});
