chrome.storage.sync.get('video', ({video}) => {
	chrome.storage.sync.get('speed', ({speed}) => {
    // Seleccionar el video desde los no pausados
		const videos = document.querySelectorAll('video');
		const activeVideos = [...videos].filter((elem) => !elem.paused);
    // Seleccionar el video correspondiente (control de índices negativos)
    video = parseInt(video);
    const vid = activeVideos.at(video);
    if (!vid){
      return;
    }
    // Alternar la velocidad entre 1 y la velocidad seleccionada
		let newSpeed = vid.playbackRate == speed ? 1 : speed;
    // Cambiar la velocidad de la publicidad
		if (document.location.href.match("www.youtube.com")){
      function sleepFor(sleepDuration) {
        return new Promise(resolve => setTimeout(resolve, sleepDuration));
      }
			async function vel(vid, veloc){
        if(document.querySelectorAll('.ad-showing video').length != 0) {
          vid.playbackRate = 5;
          const btn = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button");
          try {
            let i = 0;
            while (i < 50) { // Máximo 50 iteraciones
              await sleepFor(500);
              if ((vid.duration - vid.currentTime) <= 5){ // El anuncio está por terminar o es corto
                break;
              } else if(!btn?.style?.display) { // Es skipeable
                vid.playbackRate = 3;
                btn?.focus();
                break;
              } else if (vid.paused){ // El anuncio fue pausado
                break;
              }
              i++;	
            }
            return true;
          } catch (e) {
            vid.playbackRate = 10;
          }
        } else {
          // Cambiar la velocidad del video real
          vid.playbackRate = veloc;
          return true;
        }
      }
      // Observar cambios en el video, controlando el espaciamiento entre ellos
      let ended = true;
      var observer = new MutationObserver(async function(mutations) {
        if (ended) {
          ended = await vel(vid, newSpeed); // Nuevas mutaciones serán omitidas si no se ha terminado de ejecutar la función
        }
      });
      observer.observe(vid, {attributes: true});
      vel(vid, newSpeed);
    } else {
      // Cambiar la velocidad de videos en cualquier otra página
      vid.playbackRate = newSpeed;
    }
	});
});