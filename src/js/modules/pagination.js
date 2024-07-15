export const pagination = () => {
  const parent = document.querySelector('[data-filter="parent"]');
  let currentPage = 0;

  if (!parent) {
    return;
  }
  const itemsShow = Array.from(parent.querySelectorAll('[data-filter=item].show')).slice(0);

  const showPage = (itemsPerPage) => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    itemsShow.forEach((item, index) => {
      item.classList.toggle('hidden', index < startIndex || index >= endIndex);
    });
    updateActiveButtonStates();
  }

  const createPageButtons = (itemsPerPage) => {
    const totalPages = Math.ceil(itemsShow.length / itemsPerPage);
    const paginationContainer = parent.querySelector('.pagination-list');
    paginationContainer.innerHTML = '';

    if (totalPages > 1) {
      for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i + 1;
        pageButton.addEventListener('click', () => {
          currentPage = i;
          showPage(itemsPerPage);
          updateActiveButtonStates();
        });
  
        paginationContainer.appendChild(pageButton);
      }
    }
  }

  const updateActiveButtonStates = () => {
    const pageButtons = document.querySelectorAll('.pagination button');
    pageButtons.forEach((button, index) => {
      if (index === currentPage) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  const perPaginationChange = () => {
    const pagination = parent.querySelector('.pagination-per-page');
    const changeButtons = pagination.querySelectorAll('.custom-select-item');

    changeButtons.forEach(item => {
      item.addEventListener('click', function() {
        let itemsPerPage = item.innerHTML;
        createPageButtons(itemsPerPage);
        showPage(itemsPerPage);
      })
    })
  }

  const paginationFunc = () => {
    const pagination = parent.querySelector('.pagination-per-page');
    const itemsPerPage = pagination.querySelector('.custom-select-text').innerHTML;

    createPageButtons(itemsPerPage);
    showPage(itemsPerPage);
  }
  perPaginationChange();
  paginationFunc();
}

export const paginationWithSort = () => {
  const parent = document.querySelector('[data-filter="parent"]');
  const page = parent.querySelector('.pagination');
  page.setAttribute('style', 'display: none');
  const itemsShow = parent.querySelectorAll('[data-filter=item]');

  itemsShow.forEach((item) => {
    item.classList.remove('hidden');
  });
}
