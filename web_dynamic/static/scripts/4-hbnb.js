$(function (){
    const amenities = {};
      $(".amenities .popover input").change( function () {
        if ($(this).is(':checked')) {
          ameneties[$(this.attr('data-name'))] = $(this.attr('data_id'));
        } else {
          delete ameneties[$(this).attr("data-name")];
        }
        $(".amenities h4").text(Object.keys(amenities).sort().join(", "));
      });
});
$(document).ready(function () {
  $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (data) {
          if (data.status === 'OK') {
              $('#api_status').addClass('available');
          } else {
              $('#api_status').removeClass('available');
          }
      }
  });
});

$(function () {
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
      success: function (data) {
        for (const content of data) {
          const article = [
              '<article>',
              '<div class="title_box">',
              `<h2>${content.name}</h2>`,
              `<div class="price_by_night">$${content.price_by_night}</div>`,
              '</div>',
              '<div class="information">',
              `<div class="max_guest">${content.max_guest} Guest(s)</div>`,
              `<div class="number_rooms">${content.number_rooms} Bedroom(s)</div>`,
              `<div class="number_bathrooms">${content.number_bathrooms} Bathroom(s)</div>`,
              '</div>',
              '<div class="description">',
              `${content.description}`,
              '</div>',
              '</article>'
            ];
            $('SECTION.places').append(article.join(''));
        }
      },
      error: function (error) {
          console.error('Error loading places:', error);
      }
  });
});

$(document).ready(function () {
  $('button').click(function () {
    const checkedAmenity = [];
    $(".amenities input[type='checkbox']").each(function () {
      if ($(this).is(':checked')) {
        checkedAmenity.push($(this).attr('data-id'))
      }
    });
  });

  function createPlaceArticle(place) {
      return `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>
      `;
    }

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ ameneties: checkedAmenity }),
    success: function (data) {
      $('SECTION.places').empty();
      for (const content in data) {
        const article = createPlaceArticle(data[content])
        $('SECTION.places').append(article)
      }
    },
    error: function () {
      console.error('Failed to fetch places.');
    }
  })
});
