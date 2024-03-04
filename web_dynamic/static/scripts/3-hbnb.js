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
