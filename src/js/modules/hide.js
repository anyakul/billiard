export function hide() {
  let items = document.querySelectorAll('[data-hide="item"]');

  for (let i = 0; i < items.length; i++) {
    let btn = items[i].querySelector('[data-hide="button"]');
    let items1 = items[i].querySelectorAll('[data-hide="item-1"]');

    btn.addEventListener('click', function() {

      if (!items[i].classList.contains('is-active')) {
        items[i].classList.add('is-active');
      } else {
        items[i].classList.remove('is-active');
      }
    })

    for (let j = 0; j < items1.length; j++) {
      let btn1 = items1[j].querySelector('[data-hide="button-1"]');
  
      btn1.addEventListener('click', function() {
        if (!items1[j].classList.contains('is-active')) {
          items1[j].classList.add('is-active');
        } else {
          items1[j].classList.remove('is-active');
        }
      })
    }
  }
}
