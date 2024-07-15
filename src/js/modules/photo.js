export function photo() {
  const photos = document.querySelectorAll('.photo');

  photos.forEach((item) => {
    let items = item.querySelectorAll('.photo-item');
    let photoPagination = item.querySelector('.photo-pagination');
    items[0].classList.add('active');
    let link = item.querySelector('.catalog-item-link');

    if (window.innerWidth > 1199) {
      for (let i = 0; i < items.length; i++) {
        let bullet = document.createElement('span');
        bullet.classList.add('photo-indicator');
        if (link) {
          let href = link.getAttribute('href');
          bullet.innerHTML = `<a class="photo-link" href=${href}></a>`
        }
        photoPagination.appendChild(bullet);
      }
  
      let indicators = photoPagination.querySelectorAll('.photo-indicator');
  
      indicators[0].classList.add('active');

      for (let i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener('mouseover', function() {
          for (let j = 0; j < indicators.length; j++) {
            indicators[j].classList.remove('active');
            items[j].classList.remove('active');
          }
  
          indicators[i].classList.add('active');
          items[i].classList.add('active');
        });
      }
      item.addEventListener('mouseleave', function() {
        for (let i = 0; i < indicators.length; i++) {
          indicators[i].classList.remove('active');
          items[i].classList.remove('active');
        }
        items[0].classList.add('active');
        indicators[0].classList.add('active');
      })
  
      if (items.length == 1) {
        photoPagination.classList.add('visually-hidden');
      }
    }

    if (window.innerWidth < 1200) {
      let link = item.querySelector('.catalog-item-link');
      if (link) {
        let href = link.getAttribute('href')
        for (let i = 0; i < items.length; i++) {
          let bullet = document.createElement('a');
          bullet.setAttribute('href', href);
          items[i].appendChild(bullet);
        }
      }
    }
  })
}
