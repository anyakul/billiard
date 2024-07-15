export function header() {
  const header = document.querySelector('.header');
  const menuButton = header.querySelector('.header-menu-button');

  if (menuButton) {
    menuButton.addEventListener('click', function (e) {
      if (header.classList.contains("header-active")) {
        header.classList.remove("header-active");
        if (window.innerWidth > 767) {
          deleteEvents();
        }
        document.body.classList.remove('scroll-lock');
      } else {
        header.classList.add("header-active");
        if (window.innerWidth > 767) {
          addEvents();
        }
        document.body.classList.add('scroll-lock');
      }
    })

    const addEvents = function () {
      window.addEventListener("click", closeOverlay);
      window.addEventListener("keydown", closeByEsc);
      setTimeout(deleteEvents, 1);
    }

    const deleteEvents = function () {
      window.removeEventListener("click", closeOverlay);
      window.removeEventListener("keydown", closeByEsc);
      setTimeout(addEvents, 1);
    }

    const closeByEsc = function (e) {
      if (e.keyCode == 27) {
        if (header.classList.contains("header-active")) {
          header.classList.remove("header-active");
          document.body.classList.remove('scroll-lock');
        }
      }
    }

    const closeOverlay = function (e) {
      if (!e.target.closest(".header-active")) {
        if (header.classList.contains("header-active")) {
          header.classList.remove("header-active");
          document.body.classList.remove('scroll-lock');
        }
      }
    }
  }
}
