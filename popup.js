// Escuchar los cambios para ejecutar la extensión
function escribir(valor) {
  document.getElementById('num').innerText = valor;
}
const velocidad = document.querySelector("#velocidad");
velocidad.addEventListener('change', event => {
	let dataRange = event.target.value;
  let video = document.querySelector("#video").value;
	chrome.storage.sync.set({speed: dataRange});
  chrome.storage.sync.set({video: video});
	setSpeed();
  escribir(dataRange);
});

// Ejecución del script de la extensión
function setSpeed() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            tabs.forEach(function (tab) {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    files: ['speed.js']
                });
            });
        });
}

// Almacenar la información en el almacenamiento local
chrome.storage.sync.get('video', ({video}) => {
    chrome.storage.sync.get('speed', ({speed}) => {
        document.querySelector("#velocidad").value = speed;
        document.querySelector("#video").value = video;
        escribir(speed);
    });
});