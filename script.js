document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const playPauseButton = document.getElementById('playPauseButton');

    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    playPauseButton.textContent = 'Pausar Música ⏸️';
                })
                .catch(error => {
                    console.error("Error al intentar reproducir el audio:", error);
                    // Potentially show an error message to the user
                    playPauseButton.textContent = 'Error al reproducir';
                });
        } else {
            audio.pause();
            playPauseButton.textContent = 'Continuar Música ▶️';
        }
    });

    // Optional: Reset button text if music finishes (if not looping, though it is)
    audio.addEventListener('ended', () => {
        if (audio.loop) { // if it's looping, it might not fire 'ended' in the same way or keep playing
             playPauseButton.textContent = 'Pausar Música ⏸️'; // ensure it shows pause if looping
        } else {
             playPauseButton.textContent = 'Reproducir de Nuevo ▶️';
        }
    });

    // Set volume to be less intrusive if desired, e.g. 50%
    // audio.volume = 0.5;
});

