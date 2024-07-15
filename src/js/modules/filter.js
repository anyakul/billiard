import * as pagination from './pagination.js';

export const filter = () => {
  const parent = document.querySelector('[data-filter="parent"]');

  if (!parent) {
    return;
  }

  const filterButtons = parent.querySelectorAll('[data-filter="button"]');
  const items = Array.from(parent.querySelectorAll('[data-filter=item]'));
  const openButton = parent.querySelector('.catalog-filter-button-tablet');

  if (openButton) {
    openButton.addEventListener('click', function() {
      parent.classList.toggle('is-active');
    })
  }

  items.forEach(item => {
    item.classList.add('show');
  })

  const filter = (item, isItemFiltered) => {
    if (isItemFiltered) {
      item.classList.add('anime');
      item.classList.remove('show');
      setTimeout(function() {
        item.setAttribute('style', 'display: none');
      }, 500);
    } else {
      item.classList.remove('hide');
      item.classList.remove('anime');
      item.classList.add('show');
      item.removeAttribute('style');
    }
  }

  const filterCategory = (button) => {
    let isItemFiltered;
    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('is-active');
    }
    const currentCategory = button.dataset.category;

    items.forEach((item) => {
      const isShowAll = currentCategory.toLowerCase() === 'all';
      if (isShowAll) {
        isItemFiltered = false;
        filter(item, isItemFiltered);
      } else {
        isItemFiltered = !item.classList.contains(currentCategory);
        filter(item, isItemFiltered)
      }
    })
  }

  const filterPrice = (minPrice, maxPrice) => {
    items.forEach((item) => {
      let itemPrice = item.querySelector('.catalog-item-new-price');
      let itemValue = Number(itemPrice.querySelector('span').innerHTML.replaceAll(' ', ''));
      const isItemFiltered = itemValue < minPrice || itemValue > maxPrice;
      filter(item, isItemFiltered);
    })
  }

  const sort = (mode, type) => {
    let arr = [];
    let itemValue;
    for (let i = 0; i < items.length; i++) {
      if (type == 'popular') {
        itemValue = Number(items[i].querySelector('.catalog-item-popular').innerHTML);
      } else if (type == 'price') {
        let itemPrice = items[i].querySelector('.catalog-item-new-price');
        itemValue = Number(itemPrice.querySelector('span').innerHTML.replaceAll(' ', ''));
      }
      arr.push(itemValue);
    }
    let set = new Set(arr);
    const setNew = Array.from(set);
    const setCopy = setNew.map((element) => element);

    for (let j = setCopy.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (mode == 'more') {
          if (setCopy[i] > setCopy[i + 1]) {
            let temp = setCopy[i];
            setCopy[i] = setCopy[i + 1];
            setCopy[i + 1] = temp;
          }
        }
        else if (mode == 'less') {
          if (setCopy[i] < setCopy[i + 1]) {
            let temp = setCopy[i];
            setCopy[i] = setCopy[i + 1];
            setCopy[i + 1] = temp;
          }
        }
      }
    }
    for (let i = 0; i < items.length; i++) {
      if (type == 'popular') {
        itemValue = Number(items[i].querySelector('.catalog-item-popular').innerHTML);
        const ind = setCopy.indexOf(itemValue);
        items[i].setAttribute('style', 'order: ' + ind);
        items[i].setAttribute('data-order', ind);
      } else if (type == 'price') {
        let itemPrice = items[i].querySelector('.catalog-item-new-price');
        itemValue = Number(itemPrice.querySelector('span').innerHTML.replaceAll(' ', ''));
        const ind = setCopy.indexOf(itemValue);
        items[i].setAttribute('style', 'order: ' + ind);
        items[i].setAttribute('data-order', ind);
      }
    }
  }

  const sortFunc = () => {
    const sortPopularButton = parent.querySelector('[data-sort="popular"]');
    const sortPriceLessButtons = parent.querySelector('[data-sort="price-less"]');
    const sortPriceMoreButtons = parent.querySelector('[data-sort="price-more"]');

    if (sortPopularButton) {
      sortPopularButton.addEventListener('click', () => {
        sort('less', 'popular');
        pagination.paginationWithSort();
      })
    }

    if (sortPriceLessButtons) {
      sortPriceLessButtons.addEventListener('click', () => {
        sort('less', 'price');
        pagination.paginationWithSort();
      })
    }

    if (sortPriceMoreButtons) {
      sortPriceMoreButtons.addEventListener('click', () => {
        sort('more', 'price');
        pagination.paginationWithSort();
      })
    }
  }

  const filterPriceFunc = () => {
    const price = parent.querySelector('.price');
  
    if (!price) {
      return;
    }
  
    window.onload = function () {
      slideOne();
      slideTwo();
    };
  
    let sliderOne = price.querySelector("#price-min");
    let sliderTwo = price.querySelector("#price-max");
    let displayValOne = price.querySelector(".price-min");
    let displayValTwo = price.querySelector(".price-max");
    let minGap = 100;
    let sliderMinValue = price.querySelector("#price-min").min;
    let sliderMaxValue = price.querySelector("#price-max").max;
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
    sliderTwo.value = parseInt(sliderOne.value) + minGap;

    function slideOne() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
      }
      displayValOne.textContent = sliderOne.value;
    }
    function slideTwo() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
      }
      displayValTwo.textContent = sliderTwo.value;
    }

    sliderOne.addEventListener('input', slideOne);
    sliderTwo.addEventListener('input', slideTwo);
    sliderOne.value = sliderMinValue;
    sliderTwo.value = sliderMaxValue;
    displayValOne.textContent = sliderOne.value;
    displayValTwo.textContent = sliderTwo.value;

    price.addEventListener('submit', function(e) {
      e.preventDefault();
      filterPrice(sliderOne.value, sliderTwo.value);
      pagination.pagination();
    });
  }

  const filterFunc = () => {
    filterButtons.forEach((button) => {
      if (button.hasAttribute('data-category')) {
        button.addEventListener('click', () => {
          filterCategory(button);
          button.classList.add('is-active');
          filterPriceFunc();
          pagination.pagination();
        })
      }
    })
  }

  filterFunc();
  filterPriceFunc();
  sortFunc();
}
