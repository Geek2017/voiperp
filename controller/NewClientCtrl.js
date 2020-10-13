'use strict';

angular.module('fvs').controller('NewClientCtrl', function ($scope) {

  addNewClient.onclick = function () {
    // console.log("Submit")
    addNew();
  }

  function addNew() {

    var user = sessionStorage.getItem("user");

    var companyName = $('#clientComName').val(),
      mailingAdd = $('#clientMailingAdd').val(),
      phoneNo = $('#clientPhoneNo').val(),
      firstname = $('#clientFirstName').val(),
      lastname = $('#clientLastName').val(),
      title = $('#clientTitle').val(),
      email = $('#clientEmailAdd').val();



    var encode = document.getElementById('encode'),
      decode = document.getElementById('decode'),
      save = document.getElementById('save'),
      signIn = document.getElementById('signIn'),
      output = document.getElementById('output'),
      pwd = document.getElementById('newUserPassword');

    if (companyName && firstname && lastname && email) {

      // fileSelect = document.getElementById("newUserPicture").files;
      // if (fileSelect.length > 0) {
      //     var fileSelect = fileSelect[0];
      //     var fileReader = new FileReader();

      //     fileReader.onload = function (FileLoadEvent) {
      //         var data = FileLoadEvent.target.result;
      //         // logo = data;
      //         // console.log(data);
      //         localStorage.setItem("newUserphoto", data);
      //         // sessionStorage.setItem("comPhoto", data);

      //     }
      //     fileReader.readAsDataURL(fileSelect);
      // }

      var userComID = sessionStorage.getItem("comid");
      var url = "http://52.87.240.93/zumecall/verification.html#";

      var myData2 = JSON.stringify({

        //     // "count": "13",
        //     // "domain": "www.done.com"
        "email": email,
        "comid": userComID,
        // "comid": $('#email').val(),
        "companyName": companyName,
        "firstname": firstname,
        "lastname": lastname,
        "mailingAdd": mailingAdd,
        "phoneNo": phoneNo,
        "title": title,
        "toWhom": user

        // "password": Base64.encode(pwd.value),
        // "role": ""

      });

      // console.log(myData2);

      $.ajax({
        type: "POST",
        dataType: "json",
        // url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/adcounts/{domain}",
        url: "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/clients/{email}",
        data: myData2,
        headers: {
          "Content-Type": "application/json"
        },
        success: function (data) {
          console.log(data);
          // console.log("Success");
          // localStorage.setItem("fullname", $('#fullname').val());
          // sessionStorage.setItem("state", 1);
          // sessionStorage.setItem("role", 1);
          // document.getElementById("success2").innerHTML = "Success, Redirecting to login. . .";
          // setTimeout(function(){ 
          // $('#registerStyle').hide();
          // $('#forgotStyle').hide();
          // $('#loginStyle').show();
          // },3000);
          // $('#wizard').smartWizard('showMessage', 'Done. Redirecting. . .');

          console.log("Sent");
          document.getElementById("clientComName").value = "";
          document.getElementById("clientMailingAdd").value = "";
          document.getElementById("clientPhoneNo").value = "";
          document.getElementById("clientFirstName").value = "";
          document.getElementById("clientLastName").value = "";
          document.getElementById("clientTitle").value = "";
          document.getElementById("clientEmailAdd").value = "";

          document.getElementById("success").innerHTML =
            "Client Added!";

          setTimeout(() => {
            document.getElementById("success").innerHTML =
              "";
          }, 3000);


          // window.location.href = './index.html';
        },
        error: function (response) {
          console.log(response);
          console.log("Error");

        }
      });
    } else {
      document.getElementById("messages").innerHTML = "You need to fill up everything, check the fields again.";
      // setTimeout(function () {
      //     document.getElementById("messages").innerHTML = "";
      // }, 3000);
    }

  }

});