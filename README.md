# Extensión Speed

Extensión para controlar la velocidad de reproducción de un video de un sitio web. Controlado desde un pequeño popup de la extensión, o con acceso directo `Ctrl + Shift + S` (por defecto) que alterna la velocidad de reproducción entre Normal (1) y la velocidad predefinida, en el video que actualmente se encuentre en reproducción.

> [!NOTE]
> El control del rango de velocidades (entre 0 y 3, con pasos de 0.25) y del índice del video (0 o -1) se encuentra en el archivo `popup.html`.
> Se tienen funcionalidades para configurar una velocidad predeterminada, o aumentar/disminuir en un determinado factor, con los accesos directos pre-definidos en el `manifest.json` (máximo 4 por decisión de Google; los demás se deben configurar manualmente en las configuraciones de la extensión), y las funcionalidades implementadas en el `backgruond.js`.

> [!TIP]
> Para cargar la extensión en el navegador Chrome es necesario acceder al Menú > Extensiones > Gestionar Extensiones. Allí se puede habilitar el **Modo Desarrollador** para ver la opción **Cargar descomprimida**, donde se debe seleccionar la carpeta de esta extensión.