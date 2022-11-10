#!/usr/bin/node
/* changes on each input checkbox tag */
main_url = "http://127.0.0.1:5001/api/v1/"
$(document).ready(function () {
  list_keys = {};
  $("input[type='checkbox']").on("change", function () {
    if ($(this).is(":checked")) {
      list_keys[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete list_keys[$(this).attr("data-id")];
    }
    if (list_keys != {}) {
      $(".amenities h4").text(Object.values(list_keys));
    }
  });
  $.ajax({
    url: main_url + "status",
    success: function (data) {
      if (data.status === "OK") {
        $("div#api_status").addClass("available");
      } else {
        $("div#api_status").removeClass("available");
      }
    },
  });
  $(".filters button").on('click', function(){
    $.ajax({
      type: "POST",
      url: main_url + "places_search",
      headers:{'Content-Type':'application/json'},
      data: JSON.stringify({ "states": [], "cities": [], "amenities": [] }),
      success: function (data) {
        $(data).each(function (i) {
          let place = data[i]
          $.ajax({
            url: main_url + "users/" + place.user_id,
          }).done(function (data) {
            place['user'] = data;
            html = `
          <article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${
              place.max_guest != 1 ? "s" : ""
            }</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${
              place.number_rooms != 1 ? "s" : ""
            }</div>
                    <div class="number_bathrooms">${
                      place.number_bathrooms
                    } Bathroom${place.number_bathrooms != 1 ? "s" : ""}</div>
                </div>
                <div class="user">
                    <b>Owner:</b> ${place.user.first_name} ${
              place.user.last_name
            }
                </div>
                <div class="description">
                    ${place.description}
                </div>
            </article>
          `;
            $(".places").append(html);
          });
          
        })
      },
    });
});

});
