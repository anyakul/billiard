import Swiper, { Navigation, Pagination, Autoplay, EffectFade, Thumbs } from 'swiper';

export function slider() {
  Swiper.use([Navigation, Pagination, Autoplay, EffectFade, Thumbs]);
  let introSwiper = new Swiper('.intro', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    initialSlide: 0,
    init: false,
    navigation: {
      prevEl: '.intro-prev',
      nextEl: '.intro-next',
    },
    pagination: {
      el: '.intro-pagination',
      clickable: true,
    }
  })
  let categoriesSwiper = new Swiper('.categories-swiper', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    init: false,
    navigation: {
      prevEl: '.categories-prev',
      nextEl: '.categories-next',
    },
  })
  let controlSwiper = new Swiper('.control', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    navigation: {
      prevEl: '.categories-prev',
      nextEl: '.categories-next',
    },
  })
  let portfolioSwiper = new Swiper('.portfolio-element', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    navigation: {
      prevEl: '.portfolio-prev',
      nextEl: '.portfolio-next',
    },
    breakpoints: {
      0: {
        spaceBetween: 15
      },
      768: {
        spaceBetween: 30,
      },
      1200: {
        spaceBetween: 45,
      }
    },
  })
  let catalogSliderSwiper = new Swiper('.catalog-slider-element', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    navigation: {
      prevEl: '.catalog-slider-prev',
      nextEl: '.catalog-slider-next',
    },
    breakpoints: {
      0: {
        spaceBetween: 15
      },
      768: {
        spaceBetween: 30,
      },
      1200: {
        spaceBetween: 45,
      }
    },
  })
  let clientsSwiper = new Swiper('.clients-container', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    breakpoints: {
      0: {
        spaceBetween: 15
      },
      768: {
        spaceBetween: 30,
      },
      1200: {
        spaceBetween: 80,
      }
    },
  })
  let partnersSwiper = new Swiper('.partners-container', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    breakpoints: {
      0: {
        spaceBetween: 0
      },
      768: {
        spaceBetween: 30,
      },
      1200: {
        spaceBetween: 80,
      }
    },
    navigation: {
      prevEl: '.partners-prev',
      nextEl: '.partners-next',
    },
  })
  let chooseSwiper = new Swiper('.choose-container', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    spaceBetween: 0,
    init: false,
    pagination: {
      el: '.choose-pagination',
      clickable: true,
    }
  })
  let photoSwiper = new Swiper('.photo-slider', {
    slidesPerView: "auto",
    slidesPerGroup: 1,
    effect: "fade",
    spaceBetween: 20,
    init: false,
    fadeEffect: {
      crossFade: true
    },
    initialSlide: 0,
    loop: false,
    navigation: {
      nextEl: '.photo-next',
      prevEl: '.photo-prev',
    },
    pagination: {
      el: '.photo-pagination',
      clickable: true,
    },
  })
  let productSmallSwiper = new Swiper('.product-small-images-swiper', {
    direction: 'vertical',
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    loop: false,
    spaceBetween: 10,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.product-next',
      prevEl: '.product-prev',
    },
  })
  let productSwiper = new Swiper('.product-images', {
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    initialSlide: 0,
    loop: false,
    navigation: {
      nextEl: '.product-next',
      prevEl: '.product-prev',
    },
    thumbs: {
      swiper: productSmallSwiper,
    },
    breakpoints: {
      0: {
        direction: 'horizontal',
        spaceBetween: 5,
        centeredSlides: true,
        centeredSlidesBounds: true,
      },
      768: {
        direction: 'vertical',
        spaceBetween: 15,
      },
    },
    pagination: {
      el: '.product-pagination',
      clickable: true,
    },
  })
  let infoSwiper = new Swiper('.info-controls-swiper', {
    slidesPerView: "auto",
    slidesPerGroup: 1,
    initialSlide: 0,
    loop: false,
    breakpoints: {
      0: {
        spaceBetween: 15
      },
      768: {
        spaceBetween: 20,
      },
      1200: {
        spaceBetween: 30,
      }
    },
  })
  if (window.innerWidth < 768) {
    chooseSwiper.init();
    controlSwiper.init();
  }
  if (window.innerWidth < 1200) {
    for (let i = 0; i < photoSwiper.length; i++) {
      photoSwiper[i].init();
    }
  }
  
  introSwiper.on("slideChange afterInit init", function () {
    let number = document.querySelector('.intro-number');

    if (number) {
      let currentSlide = this.activeIndex + 1;
      number.innerHTML = `
      <span class="intro-number-current">
      ${currentSlide < 10 ? '0' + currentSlide : currentSlide}
      </span>
      <span class="intro-number-slash">
      /
      </span>
      <span class="intro-number-total">
        ${this.slides.length < 10 ? '0' + this.slides.length : this.slides.length}
      </span>`;
    }
  });
  const categories = document.querySelector('.categories');

  if (categories) {
    const categoriesItems = categories.querySelectorAll('.categories-item');

    if (window.innerWidth > 1199) {
      for (let i = 0; i < categoriesItems.length; i++) {
        if (i % 2 == 0) {
          categoriesItems[i].classList.remove('swiper-slide');
          categoriesItems[i].classList.add('non-swiper-slide');
        }
      }
    }

    if (window.innerWidth <= 1199) {
      let j = 0;
      for (let i = 0; i < categoriesItems.length; i++) {
        if (i == j + 1) {
          categoriesItems[i].classList.remove('swiper-slide');
          categoriesItems[i].classList.add('non-swiper-slide');
        }
        if (i == j + 2) {
          categoriesItems[i].classList.remove('swiper-slide');
          categoriesItems[i].classList.add('non-swiper-slide');
          j = i + 1;
        }
      }
    }
    categoriesSwiper.init();
  }
  const sliderFilter = function(parent, filterButtons, currentButton) {
    let filterItems = parent.querySelectorAll('[data-filter="item"]');
    let filter = currentButton.getAttribute('data-category');
    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('control-button-active');
    }
    currentButton.classList.add('control-button-active');
    if (filter == 'all') {
      for (let i = 0; i < filterItems.length; i++) {
        filterItems[i].classList.add('swiper-slide');
        filterItems[i].classList.remove('non-swiper-slide');
      }
    } else {
      for (let i = 0; i < filterItems.length; i++) {
        if (!filterItems[i].classList.contains(filter)) {
          filterItems[i].classList.add('non-swiper-slide');
          filterItems[i].classList.remove('swiper-slide');
        } else {
          filterItems[i].classList.add('swiper-slide');
          filterItems[i].classList.remove('non-swiper-slide');
        }
      }
    }
  }

  const filterParent = document.querySelectorAll(' [data-filter="slider-filter"]');

  filterParent.forEach((parent) => {
    let filterButtons = parent.querySelectorAll('[data-filter="button"]');

    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', function() {
        if (parent.classList.contains('portfolio')) {
          portfolioSwiper.destroy();
          sliderFilter(parent, filterButtons, filterButtons[i]);
          portfolioSwiper = new Swiper('.portfolio-element', {
            direction: 'horizontal',
            slidesPerGroup: 1,
            slidesPerView: 'auto',
            navigation: {
              prevEl: '.portfolio-prev',
              nextEl: '.portfolio-next',
            },
            breakpoints: {
              0: {
                spaceBetween: 15
              },
              768: {
                spaceBetween: 30,
              },
              1200: {
                spaceBetween: 45,
              }
            },
          })
        }
      })
    }
  })
  introSwiper.init();
}
