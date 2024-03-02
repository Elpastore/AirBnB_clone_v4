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
