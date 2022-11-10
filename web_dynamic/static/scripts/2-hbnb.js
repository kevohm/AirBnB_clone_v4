#!/usr/bin/node
/* changes on each input checkbox tag */
$(document).ready(function () {
        list_keys = {}
        $("input[type='checkbox']").on('change', function () {
            if ($(this).is(':checked')) {
                list_keys[$(this).attr("data-id")] = $(this).attr("data-name");
            } else {
                delete list_keys[$(this).attr("data-id")];
            }
            if (list_keys != {}) {
                $(".amenities h4").text(Object.values(list_keys));
            }
        })
    $.ajax({
      url: "http://127.0.0.1:5001/api/v1/status",
        success: function (data) {
            if (data.status === 'OK') {
            
                $("div#api_status").addClass("available");
            } else {
                
                $("div#api_status").removeClass("available");
            }
        }
    });
});