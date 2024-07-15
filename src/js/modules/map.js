export function map() {
  const map = document.querySelector('#map');
  const mapBlack = document.querySelector('#map-black');
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

  if (mapBlack != null) {
    const tabs = mapBlack.querySelectorAll('.delivery-tabs-button');
    let zoom;
    let center;
    if (window.innerWidth > 1199) {
      zoom = 3,
      center = [65.25, 108.15]
    }
    if (window.innerWidth > 767 && window.innerWidth < 1200) {
      zoom = 2.5,
      center = [65.25, 108.15]
    }
    if (window.innerWidth < 768) {
      zoom = 3,
      center = [54.989347, 73.368221]
    }
    if (window.innerWidth < 600) {
      zoom = 3,
      center = [56.838011, 60.597474]
    }
    if (window.innerWidth < 460) {
      zoom = 3,
      center = [55.796127, 49.106414]
    }
    ymaps.ready(function () {
      let myMap = new ymaps.Map('map-black', {
        center: center,
        zoom: zoom,
        controls: []
      }, {
          suppressMapOpenBlock: true,
          minZoom: zoom,
          maxZoom: zoom
      })

      for (let i = 0; i < tabs.length; i++) {
        let obj = tabs[i].dataset.coord;
        obj = JSON.parse(obj);
        let marker = new ymaps.Placemark(obj, {
          id: i,
          hintContent: tabs[i].title,
          iconCaption: 'test',
          clickable: true,
        }, {
          iconLayout: 'default#image',
          iconImageHref: './../img/icon-map.svg',
        });
        if (marker.properties.get('id') == 0) {
          marker.options.set('iconImageHref', './../img/icon-map.svg');
        }
        marker.events.add("click", function (e) {
          let id = marker.properties.get('id');
          for (let j = 0; j < items.length; j++) {
            items[j].classList.remove('is-active');
            marker.options.set('iconImageHref', './../img/icon-map.svg');
          }
          myMap.geoObjects.each(function (geoObject) {
            geoObject.options.set('iconImageHref', './../img/icon-map.svg');
          });
          items[id].classList.add('is-active');
          marker.options.set('iconImageHref', './../img/icon-map.svg');
        });
        myMap.geoObjects.add(marker);
      }
      myMap.behaviors.disable('drag');
      ymaps.regions.load('RU', {
        lang: 'ru',
        quality: 1
      }).then(function (result) {
          let regions = result.geoObjects;
          myMap.geoObjects.add(regions);
          regions.options.set('fillColor', '#000000');
          regions.options.set('strokeColor', '#ffffff');
      })
    });
  }
}
