document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.'); // For debugging
    const audio = document.getElementById('bgMusic');
    const playPauseButton = document.getElementById('playPauseButton');

    if (!audio) {
        console.error('Audio element with ID "bgMusic" not found.');
        if(playPauseButton) playPauseButton.textContent = 'Error: Audio no encontrado';
        return;
    }
    if (!playPauseButton) {
        console.error('Button with ID "playPauseButton" not found.');
        return;
    }
    
    console.log('Audio element and button found. Audio src:', audio.src); // For debugging

    // Listen for errors on the audio element itself
    audio.addEventListener('error', (e) => {
        console.error("Audio element error event fired.");
        playPauseButton.textContent = 'Error al cargar audio';
        let errorMsg = "Unknown audio error.";
        if (audio.error) {
            console.error("Audio error code:", audio.error.code);
            switch (audio.error.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    errorMsg = "La reproducción de audio fue abortada.";
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    errorMsg = "Un error de red impidió la descarga del audio.";
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    errorMsg = "La reproducción de audio fue abortada debido a un problema de decodificación.";
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorMsg = "El archivo de audio no se pudo encontrar o el formato no es compatible. Verifica que el archivo 'Jessi Uribe - Gracias Madre  l Video Oficial.mp3' está en la misma carpeta que index.html.";
                    break;
                default:
                    errorMsg = "Ocurrió un error desconocido con el elemento de audio.";
            }
        }
        console.error("Detailed audio error: " + errorMsg);
        // alert("Error con el audio: " + errorMsg); // Optional: show alert to user
    });

    audio.addEventListener('canplaythrough', () => {
        console.log("Audio can play through. Ready to play.");
    });
    
    playPauseButton.addEventListener('click', () => {
        console.log('Play/pause button clicked. Audio currently paused:', audio.paused); // For debugging
        if (audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
            console.error("Audio source not found. Cannot play.");
            playPauseButton.textContent = 'Error: Archivo no hallado';
            // Potentially trigger the error event listener's logic or display a message
            // This might be redundant if the 'error' event also fires for this.
            return;
        }

        if (audio.paused) {
            audio.play()
                .then(() => {
                    playPauseButton.textContent = 'Pausar Música ⏸️';
                    console.log('Audio playback started.'); // For debugging
                })
                .catch(error => {
                    console.error("Error al intentar reproducir el audio:", error);
                    playPauseButton.textContent = 'Error al reproducir';
                });
        } else {
            audio.pause();
            playPauseButton.textContent = 'Continuar Música ▶️';
            console.log('Audio playback paused.'); // For debugging
        }
    });

    audio.addEventListener('ended', () => {
        console.log('Audio ended. Looping:', audio.loop); // For debugging
        if (audio.loop) { 
             playPauseButton.textContent = 'Pausar Música ⏸️'; 
        } else {
             playPauseButton.textContent = 'Reproducir de Nuevo ▶️';
        }
    });

    // Set volume to be less intrusive if desired, e.g. 50%
    // audio.volume = 0.5;
});