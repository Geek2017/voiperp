'use strict';

angular.module('fvs').controller('NewCallsCtrl', function ($scope) {

    var count = 0;

    $("#call").click(function() {
      $.ajax({
        url: "make_call.php",
        method: "POST",
        data: {
            number: "+639565776616",
            // loader: loader,
            // folder_name: folder_name,
            // action: action,
            // copy: "copy"
        },
        success: function(data) {
          console.log(data);
          console.log("Calling");

        }
    });
  });

$(".digit").on('click', function() {
  var num = ($(this).clone().children().remove().end().text());
  if (count < 11) {
    $("#output").append('<span>' + num.trim() + '</span>');

    count++
  }
});

$('.fa-long-arrow-left').on('click', function() {
  $('#output span:last-child').remove();
  count--;
});

});