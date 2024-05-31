// Iniciar la extensión
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({speed: '1'});
    chrome.storage.sync.set({video: '0'});
});

// Función para disparar la ejecución de la extensión
function speed(spd) {
  if (spd) {
      if (/^[+-]/.test(spd)) { // Detectar si se pasa un número con signo a la función
          chrome.storage.sync.get('speed', function (data) {
              spd = parseFloat(data.speed) + parseFloat(spd);
              spd = spd.toFixed(1);
              chrome.storage.sync.set({speed: spd});
          });
      } else {
        chrome.storage.sync.set({speed: spd});
      }
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      tabs.forEach(function (tab) {
          chrome.scripting.executeScript({
              target: {tabId: tab.id},
              files: ['speed.js']
          });
      });
  });
}

// Escuchar los comandos
chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'restart-speed':
            speed();
            break;
        case "half-speed":
            speed('0.5');
            break;
        case "max-speed":
            speed('3');
            break;
        case "reduce-speed":
            speed('-0.5');
            break;
        case "increase-speed":
            speed('+0.5');
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});