export function cart() {
  const catalogItem = document.querySelectorAll('[data-cart="product"]');

  function toNum(str) {
    const num = Number(str.replace(/ /g, ""));
    return num;
  }

  function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(num);
    return format;
  }

  
  const cartButton = document.querySelector('.header-icon-link');
  const cartNum = document.querySelector(".header-cart-number");
  

  class Product {
    href;
    imageSrc;
    name;
    price;
    priceDiscount;
    size;
    article;
    num;
    maxNumber;
    amount;
    
    constructor(card) {
      this.href = document.location.href;
      this.imageSrc = card.querySelector('[data-cart="image"]').getAttribute('src');
      this.name = card.querySelector('[data-cart="header"]').innerText;
      this.price = card.querySelector('[data-cart="price"]').innerText;
      this.size = card.querySelector('[data-cart="size"]').innerText;
      this.article = card.querySelector('[data-cart="article"]').innerText;
      this.maxNumber = card.querySelector('[data-cart="max-number"]').innerText;
      this.amount = 1;
    }

    addItem() {
      this.num += 1;
    }

    getNum() {
      return this.num;
    }

    getId() {
      return this.id;
    }
  }

  class Cart {
    products;
  
    constructor() {
      this.products = [];
    }
    get count() {
      return this.products.length;
    }
    addProduct(product) {
      this.products.push(product);
    }
    removeProduct(index) {
      this.products.splice(index, 1);
      cartNum.textContent = this.products.length;
    }
    getProducts() {
      return this.products;
    }
    get cost() {
      const prices = this.products.map((product) => {
        return toNum(product.price);
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
    get costDiscount() {
      const prices = this.products.map((product) => {
        return toNum(product.priceDiscount);
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
    get discount() {
      return this.costDiscount - this.cost;
    }
  }

  if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
  }

  const myCart = new Cart();

  const savedCart = JSON.parse(localStorage.getItem("cart"));
  myCart.products = savedCart.products;
  cartNum.textContent = myCart.count;

  for (let i = 0; i < catalogItem.length; i++) {
    const cardAdd = catalogItem[i].querySelector('[data-cart="add-button"]');
    let isProduct = false;

    myCart.products = cardAdd.addEventListener("click", () => {
      const productItem = new Product(catalogItem[i]);
      const savedCart = JSON.parse(localStorage.getItem("cart"));

      for (let i = 0; i < savedCart.products.length; i++) {
        if (savedCart.products[i].article == productItem.article) {
          isProduct = true;
          break;
        }
      }

      if (!isProduct) {
        myCart.products = savedCart.products;      
        myCart.addProduct(productItem);
        localStorage.setItem("cart", JSON.stringify(myCart));
        cartNum.textContent = myCart.count;
        drawCart();
      }
    })
  }

  cartButton.addEventListener('click', function() {
    if (myCart.count == 0) {
      submitError();
    } else {
      submitSuccess();
    }
  })

  /*document.addEventListener('click', function(e) {
    if (!e.target.closest('[data-open-modal]')) {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      myCart.products = savedCart.products;
    }
  })*/

  function submitError() {
    cartForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const items = document.querySelector('.cart-item');
      if (items) {
        items.remove();
      }
      const productList = document.querySelector(".cart-list");
      const productItem = document.createElement("li");
      productItem.classList.add("cart-item");
      productItem.innerHTML = 'В корзине ничего нет.' + ' ' + 'Добавьте товары в корзину';
      productList.append(productItem);

      document.addEventListener('click', function(e) {
        if (!e.target.closest('[data-open-modal]')) {
          const savedCart = JSON.parse(localStorage.getItem("cart"));
          myCart.products = savedCart.products;
        }
      })
    })
  }

  function submitSuccess() {
    cartForm.addEventListener('submit', function() {
      if (myCart.count > 0) {
        window.location.replace("thanks");
        localStorage.removeItem("cart");
        drawCart();
      }
    })
  }

  function removeItem(cart) {
    const deleteButtons = cart.querySelectorAll('.cart-item-delete-button');

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', function() {
        myCart.removeProduct(i);
        localStorage.setItem("cart", JSON.stringify(myCart));
        drawCart();
      })
    }
  }

  function changeNumber(cart) {
    const itemNumber = cart.querySelectorAll('.cart-list');

    for (let i = 0; i < itemNumber.length; i++) {
      let numLess = itemNumber[i].querySelector('.cart-button-number-less');
      let numMore = itemNumber[i].querySelector('.cart-button-number-more');
      let numTag = itemNumber[i].querySelector('.cart-number');
      let maxNum = itemNumber[i].querySelector('.cart-max-number').innerHTML;

      numLess.addEventListener('click', function() {
        if (toNum(numTag.innerHTML) > 1) {
          myCart.products[i].amount -= 1;
          localStorage.setItem("cart", JSON.stringify(myCart));
          drawCart();
        }
      })

      numMore.addEventListener('click', function() {
        if (toNum(numTag.innerHTML) < maxNum) {
          myCart.products[i].amount += 1;
          localStorage.setItem("cart", JSON.stringify(myCart));
          drawCart();
        }
      })
    }
  }

  function popupContainerFill(cart) {
    if (!cart) {
      return;
    }
    const productList = cart.querySelector(".cart-lists");
    const productPrice = cart.querySelector(".cart-all");
    const cartForm = cart.querySelector(".cart-form");
    const cartInfo = cartForm.querySelector(".cart-form-item-info input");
    const noProductsMessage = cart.querySelector('.cart-no-items');
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;

    cartInfo.value = '';

    if (myCart.count == 0) {
      const productItem = document.createElement("div");
      productItem.classList.add("cart-list-no");
      productList.innerHTML = '';
      productPrice.innerHTML = '';
      productList.append(productItem);
      cartForm.setAttribute('style', 'display: none');
      noProductsMessage.removeAttribute('style');
    } else {
      noProductsMessage.setAttribute('style', 'display: none');
      productList.innerHTML = '';
      productPrice.innerHTML = '';
      let price = 0;
  
      const productsHTML = myCart.products.map((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("cart-list");
        let sum = toNum(product.price) * product.amount;
        productItem.innerHTML = `<div class="cart-table-part cart-table-part-image">
          <div class="cart-image">
            <img src="${product.imageSrc}" width="130" height="130" alt="${product.name}">
          </div>
        </div>
        <div class="cart-table-part cart-table-part-names">
          <p class="cart-table-item-name">Наименование</p>
          <p class="cart-table-item-text">${product.name}</p>
        </div>
        <div class="cart-table-part cart-table-part-article">
          <p class="cart-table-item-name">Артикул</p>
          <p class="cart-table-item-text">${product.article}</p>
        </div>
        <div class="cart-table-part cart-table-part-size">
          <p class="cart-table-item-name">Размер</p>
          <p class="cart-table-item-text">${product.size}</p>
        </div>
        <div class="cart-table-part cart-table-part-price">
          <p class="cart-table-item-name">Цена</p>
          <p class="cart-table-item-text">${toCurrency(toNum(product.price))}</p>
        </div>
        <div class="cart-table-part cart-table-part-number">
          <div class="cart-buttons-number">
            <button class="cart-button-number cart-button-number-less">
              <svg width="14" height="7">
                <use xlink:href="img/sprite.svg#icon-arrow"></use>
              </svg>
            </button>
            <p class="cart-number">${product.amount}</p>
            <button class="cart-button-number cart-button-number-more">
              <svg width="14" height="7">
                <use xlink:href="img/sprite.svg#icon-arrow"></use>
              </svg>
            </button>
            <p class="cart-max-number visually-hidden">${product.maxNumber}</p>
          </div>
        </div>
        <div class="cart-table-part cart-table-part-sum">
          <p class="cart-table-item-name">Сумма</p>
          <p class="cart-table-item-text">${toCurrency(sum)}</p>
        </div>
        <div class="cart-table-part cart-table-part-remove">
          <button class="cart-item-delete-button">
            ✖
          </button>
        </div>`;

        cartInfo.value += `${product.name} (Артикул ${product.article}, размер ${product.size}, цена ${product.price}, Количество ${product.amount}) \r\n`;
        productList.append(productItem);
        price += sum;
      });
      cartForm.removeAttribute('style');

      productPrice.innerHTML = `Общая сумма: <span class="cart-total">${toCurrency(price)}</span>`;
      cartInfo.value += `Общая сумма: ${toCurrency(price)}`;
      console.log(cartInfo.value);
    }
  }

  const drawCart = function() {
    const cart = document.querySelectorAll('.cart');

    for (let i = 0; i < cart.length; i++) {
      popupContainerFill(cart[i]);
      removeItem(cart[i]);
      changeNumber(cart[i]);
    }
  }

  drawCart();
}
