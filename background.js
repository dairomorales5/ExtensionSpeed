// Iniciar la extensión
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({speed: '1'});
    chrome.storage.sync.set({video: '0'});
});

// Función para disparar la ejecución de la extensión
function speed() {
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
        default:
            console.log(`Command ${command} not found`);
    }
});