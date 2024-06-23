chrome.storage.sync.get('video', ({video}) => {
	chrome.storage.sync.get('speed', ({speed}) => {
    // Seleccionar el video desde los no pausados
		const videos = document.querySelectorAll('video');
		const activeVideos = [...videos].filter((elem) => !elem.paused);
    // Seleccionar el video correspondiente (control de índices negativos)
    video = parseInt(video);
		const vid = video < 0 ? activeVideos[activeVideos.length + video] : activeVideos[video];
    // Alternar la velocidad entre 1 y la velocidad seleccionada
    if (!vid){
      return;
    }
		let newSpeed = vid.playbackRate == speed ? 1 : speed;
    // Cambiar la velocidad de la publicidad y saltarla
		if (document.location.href.match("www.youtube.com")){
			function vel(vid, veloc){
					if(document.getElementsByClassName('ad-showing').length != 0){
						vid.playbackRate = 3;
						const btn = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button");
						try {
              setTimeout(() => {
                btn.click();
              }, 2000);
            } catch (e) {}
					} else {
            // Cambiar la velocidad del video real
						vid.playbackRate = veloc;
					}
				}
        // Observar cambios en el video
        var observer = new MutationObserver(function(mutations) {
          vel(vid, newSpeed);
        });
				observer.observe(vid, {attributes: true});
				vel(vid, newSpeed);
			} else {
        // Cambiar la velocidad de videos en cualquier otra página
				vid.playbackRate = newSpeed;
			}
	});
});