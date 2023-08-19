let yaMap;

const init = () => {
  yaMap = new ymaps.Map("yamap", {
    center: [44.980863, 38.998502],
    zoom: 12.4,
    controls: [
      'typeSelector',
      'routeButtonControl',
      'zoomControl'
    ]
  });
  
  const coords = [
    [45.045244, 38.945869],
    [44.918974, 39.038255],
    [45.018974, 39.038255],
    [44.961002, 38.954667],
    [45.020410, 39.116077]
  ];
  
  const myCollection = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    draggable: false,
    iconImageHref: './img/icons/marker.svg',
    iconImageSize: [58, 73],
    iconImageOffset: [-55, -70]
  });
  
  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  yaMap.geoObjects.add(myCollection);

  yaMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);


// // При клике на карту все метки будут удалены.
// myCollection.getMap().events.add('click', function() {
//   myCollection.removeAll();
// });