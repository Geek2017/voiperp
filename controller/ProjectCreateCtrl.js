'use strict';

angular.module('fvs').controller('ProjectCreateCtrl', function ($scope) {

  addNewProject.onclick = function () {
    addProject();
  }

  function addProject() {

    var user = sessionStorage.getItem("user");

    var projectName = $('#projectName').val(),
    clientName = $('#clientName').val(),
    projectRate = $('#projectRate').val(),
    projectType = $('#projectType').val(),
    priority = $('#priority').val(),
    projectSize = $('#projectSize').val(),
    startingDate = $('#startingDate').val(),
    endingDate = $('#endingDate').val(),
    taskTitle = $('#taskTitle').val(),
    subTask = $('#subTask').val(),
    details = $('#details').val();



    var encode = document.getElementById('encode'),
      decode = document.getElementById('decode'),
      save = document.getElementById('save'),
      signIn = document.getElementById('signIn'),
      output = document.getElementById('output'),
      pwd = document.getElementById('newUserPassword');

    if (projectName && clientName) {

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
        "name": projectName,
        "comid": userComID,
        "clientName": clientName,
        "rate": projectRate,
        "type": projectType,
        "priority": priority,
        "size": projectSize,
        "startingDate": startingDate,
        "endingDate": endingDate,
        "task": taskTitle,
        "subtask": subTask,
        "details": details,
        "toWhom": user

        // "password": Base64.encode(pwd.value),
        // "role": ""

      });

      // console.log(myData2);

      $.ajax({
        type: "POST",
        dataType: "json",
        // url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/adcounts/{domain}",
        url: "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/projects/{name}",
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
          document.getElementById("projectName").value = "";
          document.getElementById("clientName").value = "";
          document.getElementById("projectRate").value = "";
          document.getElementById("projectType").value = "";
          document.getElementById("priority").value = "";
          document.getElementById("projectSize").value = "";
          document.getElementById("startingDate").value = "";
          document.getElementById("endingDate").value = "";
          document.getElementById("taskTitle").value = "";
          document.getElementById("subTask").value = "";
          document.getElementById("details").value = "";

          document.getElementById("success").innerHTML =
            "Project Added!";

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