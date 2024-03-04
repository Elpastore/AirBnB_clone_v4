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
