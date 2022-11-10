#!/usr/bin/node
/* changes on each input checkbox tag */
$(document).ready(
    function () {
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
    }
)
