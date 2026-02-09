export function map() {
  const map = document.querySelector('#map');
  const tab = document.querySelector('.contacts-tab');

  if (map != null) {
    ymaps.ready(function () {
      let myMap = new ymaps.Map('map', {
        center: [55.734030, 37.663530],
        zoom: 14,
        controls: ['zoomControl']
      }, {
          suppressMapOpenBlock: true,
      });
      let obj = tab.dataset.coord;
      obj = JSON.parse(obj);
      let marker = new ymaps.Placemark(obj, {
        id: 0,
        hintContent: tab.title,
        iconCaption: 'test',
        clickable: true
      }, {
        iconLayout: 'default#image',
      });
      myMap.geoObjects.add(marker);
    });
  }
}
