export function video() {
  const videoContainer = document.querySelectorAll('[data-video="block"]');
  const videoWrapper = document.querySelectorAll('[data-video="button"]');
  const video = document.querySelectorAll('[data-video="video"]');

  for (let i = 0; i < videoContainer.length; i++) {
    if (video) {
      videoContainer[i].classList.remove('is-nojs');
      videoWrapper[i].addEventListener('click', () => {
        if (video[i].paused) {
          video[i].play();
          videoContainer[i].classList.add('is-play');
        } else {
          video[i].pause();
          videoContainer[i].classList.remove('is-play');
          video[i].load();
        }
      });
    }
  }
}
