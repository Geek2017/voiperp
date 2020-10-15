'use strict';

angular.module('fvs').controller('ProjectListCtrl', function ($scope) {

  var modal = document.getElementById('myModal');
  var modalView = document.getElementById('myModalView');
  var modal2 = document.getElementById('myModal2');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var accept = document.getElementById("accept");

  $("#editBtn").click(function () {
    modal.style.display = "block";
  });

  $scope.data = [];

  $scope.arr = [];

  let actual = 0;

  var userName, email, role, id;

  $scope.clickedUser = {};

  var userComID = sessionStorage.getItem("comid");
  var user = sessionStorage.getItem("user");
  var role = sessionStorage.getItem("role");
  // console.log(userComID);

  var settings = {
    "url": "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/allprojects",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    var count = response.Count;


    // console.log(response);
    for (var i = 0; i < count; i++) {

      $scope.arr[i] = {
        comid: response.Items[i].comid.S,
        name: response.Items[i].name.S,
        clientName: response.Items[i].clientName.S,
        rate: response.Items[i].rate.S,
        type: response.Items[i].type.S,
        priority: response.Items[i].priority.S,
        size: response.Items[i].size.S,
        startingDate: response.Items[i].startingDate.S,
        endingDate: response.Items[i].endingDate.S,
        task: response.Items[i].task.S,
        subtask: response.Items[i].subtask.S,
        details: response.Items[i].details.S,
        toWhom: response.Items[i].toWhom.S,
        action: ""
      }
      $scope.data.push($scope.arr[i]);



    }

    // console.log($scope.arr);

    var filtered = $scope.arr.filter(function (filter) {
      return filter.toWhom == user;
    });

    // console.log(filtered);

    var newFiltered = filtered.map((users) => {
      var user = {
        name: users.name,
        clientName: users.clientName,
        rate: users.rate,
        type: users.type,
        priority: users.priority,
        // size: users.size,
        startingDate: users.startingDate,
        endingDate: users.endingDate,
        action: users.action
      }

      return user
    })

    // console.log(newFiltered)

    if (role == 0) {
      var noOfContacts = $scope.arr.length;
      if (noOfContacts > 0) {


        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.style.width = '100%';
        table.setAttribute('border', '1');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '5');
        table.setAttribute("id", "export-button");

        // retrieve column header ('Name', 'Email', and 'Mobile')

        var col = []; // define an empty array
        for (var i = 0; i < noOfContacts; i++) {
          for (var key in $scope.arr[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }

        // CREATE TABLE HEAD .
        var tHead = document.createElement("thead");


        // CREATE ROW FOR TABLE HEAD .
        var hRow = document.createElement("tr");

        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");
          th.innerHTML = col[i];
          hRow.appendChild(th);
        }
        tHead.appendChild(hRow);
        table.appendChild(tHead);

        // CREATE TABLE BODY .
        var tBody = document.createElement("tbody");

        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < noOfContacts; i++) {

          var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .


          for (var j = 0; j < col.length; j++) {
            var td = document.createElement("td");
            td.innerHTML = $scope.arr[i][col[j]];

            bRow.appendChild(td);

          }
          tBody.appendChild(bRow)
          var entry = $scope.arr[i];
          var buttons = [{
              value: "Edit",
              type: "button",
              className: "btn btn-info mx-2"
            }, {
              value: "Delete",
              type: "button",
              className: "btn btn-danger mx-2"
            },
            {
              value: "View",
              type: "button",
              className: "btn btn-danger mx-2"
            }
          ];
          // btn.type = buttons.values(type);

          // console.log(buttons.length);

          for (let k = 0; k < buttons.length; k++) {
            let button = buttons[k];
            var btn = document.createElement('input');
            btn.type = button.type;
            btn.value = button.value;
            btn.className = button.className;
            btn
            if (btn.value === "Edit") {
              btn.onclick = (function (entry) {
                return function () {
                  $scope.selectUser(entry);
                }
              })(entry);
            } else if (btn.value === "Delete"){
              btn.onclick = (function (entry) {
                return function () {
                  $scope.selectUser2(entry);
                }
              })(entry);
            } else {
              btn.onclick = (function (entry) {
                return function () {
                  $scope.selectUser3(entry);
                }
              })(entry);
            }
            td.appendChild(btn)[i];
          }

          // var entry2 = $scope.arr[i];
          // var btn2 = document.createElement('br');
          // btn.type = "button";
          // btn.className = "btn btn-danger";
          // btn.value = "Delete";
          // btn.onclick = (function(entry2) {return function() {$scope.selectUser2(entry2);}})(entry2);
          // td.appendChild(btn2);

          // var entry3 = $scope.arr[i];
          // var btn3 = document.createElement('input');
          // btn.type = "button";
          // btn.className = "btn btn-danger";
          // btn.value = "Delete";
          // btn.onclick = (function(entry3) {return function() {$scope.selectUser2(entry3);}})(entry3);
          // td.appendChild(btn3);




        }
        table.appendChild(tBody);


        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("myContacts");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

      }
    } else if (role == 1) {
      var noOfContacts = newFiltered.length;

      if (noOfContacts > 0) {


        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.style.width = '100%';
        table.setAttribute('border', '1');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '5');
        table.setAttribute("id", "export-button");

        // retrieve column header ('Name', 'Email', and 'Mobile')

        var col = []; // define an empty array
        for (var i = 0; i < noOfContacts; i++) {
          for (var key in newFiltered[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }

        // CREATE TABLE HEAD .
        var tHead = document.createElement("thead");


        // CREATE ROW FOR TABLE HEAD .
        var hRow = document.createElement("tr");

        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");
          th.innerHTML = col[i];
          hRow.appendChild(th);
        }
        tHead.appendChild(hRow);
        table.appendChild(tHead);

        // CREATE TABLE BODY .
        var tBody = document.createElement("tbody");

        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < noOfContacts; i++) {

          var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .


          for (var j = 0; j < col.length; j++) {
            var td = document.createElement("td");
            td.innerHTML = newFiltered[i][col[j]];

            bRow.appendChild(td);

          }
          tBody.appendChild(bRow)
          var entry = newFiltered[i];
          var buttons = [{
            value: "Edit",
            type: "button",
            className: "btn btn-info mx-2"
          }, {
            value: "Delete",
            type: "button",
            className: "btn btn-danger mx-2"
          },
          {
            value: "View",
            type: "button",
            className: "btn btn-danger mx-2"
          }
        ];
        // btn.type = buttons.values(type);

        // console.log(buttons.length);

        for (let k = 0; k < buttons.length; k++) {
          let button = buttons[k];
          var btn = document.createElement('input');
          btn.type = button.type;
          btn.value = button.value;
          btn.className = button.className;
          btn
          if (btn.value === "Edit") {
            btn.onclick = (function (entry) {
              return function () {
                $scope.selectUser(entry);
              }
            })(entry);
          } else if (btn.value === "Delete"){
            btn.onclick = (function (entry) {
              return function () {
                $scope.selectUser2(entry);
              }
            })(entry);
          } else {
            btn.onclick = (function (entry) {
              return function () {
                $scope.selectUser3(entry);
              }
            })(entry);
          }
          td.appendChild(btn)[i];
        }

          // var entry2 = $scope.arr[i];
          // var btn2 = document.createElement('br');
          // btn.type = "button";
          // btn.className = "btn btn-danger";
          // btn.value = "Delete";
          // btn.onclick = (function(entry2) {return function() {$scope.selectUser2(entry2);}})(entry2);
          // td.appendChild(btn2);

          // var entry3 = $scope.arr[i];
          // var btn3 = document.createElement('input');
          // btn.type = "button";
          // btn.className = "btn btn-danger";
          // btn.value = "Delete";
          // btn.onclick = (function(entry3) {return function() {$scope.selectUser2(entry3);}})(entry3);
          // td.appendChild(btn3);




        }
        table.appendChild(tBody);


        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("myContacts");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

      }
    }

    // console.log(newFiltered);

    // var noOfContacts = newFiltered.length;

    if (noOfContacts > 0) {


      // CREATE DYNAMIC TABLE.
      var table = document.createElement("table");
      table.style.width = '100%';
      table.setAttribute('border', '1');
      table.setAttribute('cellspacing', '0');
      table.setAttribute('cellpadding', '5');
      table.setAttribute("id", "export-button");

      // retrieve column header ('Name', 'Email', and 'Mobile')

      var col = []; // define an empty array
      for (var i = 0; i < noOfContacts; i++) {
        for (var key in newFiltered[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }

      // CREATE TABLE HEAD .
      var tHead = document.createElement("thead");


      // CREATE ROW FOR TABLE HEAD .
      var hRow = document.createElement("tr");

      // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
      for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        hRow.appendChild(th);
      }
      tHead.appendChild(hRow);
      table.appendChild(tHead);

      // CREATE TABLE BODY .
      var tBody = document.createElement("tbody");

      // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
      for (var i = 0; i < noOfContacts; i++) {

        var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .


        for (var j = 0; j < col.length; j++) {
          var td = document.createElement("td");
          td.innerHTML = $scope.arr[i][col[j]];

          bRow.appendChild(td);

        }
        tBody.appendChild(bRow)
        var entry = $scope.arr[i];
        var buttons = [{
          value: "Edit",
          type: "button",
          className: "btn btn-success mx-2"
        }, {
          value: "Delete",
          type: "button",
          className: "btn btn-danger mx-2"
        },
        {
          value: "View",
          type: "button",
          className: "btn btn-info mx-2"
        }
      ];
      // btn.type = buttons.values(type);

      // console.log(buttons.length);

      for (let k = 0; k < buttons.length; k++) {
        let button = buttons[k];
        var btn = document.createElement('input');
        btn.type = button.type;
        btn.value = button.value;
        btn.className = button.className;
        btn
        if (btn.value === "Edit") {
          btn.onclick = (function (entry) {
            return function () {
              $scope.selectUser(entry);
            }
          })(entry);
        } else if (btn.value === "Delete"){
          btn.onclick = (function (entry) {
            return function () {
              $scope.selectUser2(entry);
            }
          })(entry);
        } else {
          btn.onclick = (function (entry) {
            return function () {
              $scope.selectUser3(entry);
            }
          })(entry);
        }
        td.appendChild(btn)[i];
      }

        // var entry2 = $scope.arr[i];
        // var btn2 = document.createElement('br');
        // btn.type = "button";
        // btn.className = "btn btn-danger";
        // btn.value = "Delete";
        // btn.onclick = (function(entry2) {return function() {$scope.selectUser2(entry2);}})(entry2);
        // td.appendChild(btn2);

        // var entry3 = $scope.arr[i];
        // var btn3 = document.createElement('input');
        // btn.type = "button";
        // btn.className = "btn btn-danger";
        // btn.value = "Delete";
        // btn.onclick = (function(entry3) {return function() {$scope.selectUser2(entry3);}})(entry3);
        // td.appendChild(btn3);




      }
      table.appendChild(tBody);


      // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
      var divContainer = document.getElementById("myContacts");
      divContainer.innerHTML = "";
      divContainer.appendChild(table);

    }

    // return $scope.arr;


  });

  setTimeout(() => {
    var fileupload = document.getElementById("FileUpload1");
    $('#export-button').DataTable({
      dom: 'Bfrtip',
      buttons: [
        // {
        //   text: 'Upload',
        //   className: 'btn-success float-right ',
        //   action: function (e, dt, node, config) {
        //     // alert('Button activated');
        //     // console.log("click");
        //     fileupload.click();
        //   }
        // },
        // 'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
      ]
    });
    // console.log(document.getElementById("export-button"));
    console.log('1');
  }, 3000);



  $scope.statuses = [{
      username: 'asdasdasds',
      role: 'status1'
    },
    {
      username: 'asdasdasdsad',
      role: 'status2'
    },
    {
      username: 'asdasdsadas',
      role: 'status3'
    }
  ];

  //   console.log($scope.statuses);

  $scope.selectUser = function (entry) {
    // console.log(users);
    // console.log(entry);
    // $scope.clickedUser = entry;
    $("#editProjectName").val(entry.name);
    $("#editClientName").val(entry.clientName);
    $("#editProjectRate").val(entry.rate);
    $("#editProjectType").val(entry.type);
    $("#editPriority").val(entry.priority);
    $("#editProjectSize").val(entry.size);
    $("#editStartingDate").val(entry.startingDate);
    $("#editEndingDate").val(entry.endingDate);
    $("#editTaskTitle").val(entry.task);
    $("#editSubTask").val(entry.subtask);
    $("#editDetails").val(entry.details);
    id = entry;
    modal.style.display = "block";
    // $('#myModal').modal('show');
  };

  $scope.selectUser2 = function (entry) {
    // console.log(users);
    $scope.clickedUser = entry;
    document.getElementById("deleteUser").innerText = entry.name;
    id = entry;
    modal2.style.display = "block";
  };

  $scope.selectUser3 = function (entry) {
    // console.log(users);
    // console.log(entry);
    // $scope.clickedUser = entry;
    $("#editProjectName2").val(entry.name);
    $("#editClientName2").val(entry.clientName);
    $("#editProjectRate2").val(entry.rate);
    $("#editProjectType2").val(entry.type);
    $("#editPriority2").val(entry.priority);
    $("#editProjectSize2").val(entry.size);
    $("#editStartingDate2").val(entry.startingDate);
    $("#editEndingDate2").val(entry.endingDate);
    $("#editTaskTitle2").val(entry.task);
    $("#editSubTask2").val(entry.subtask);
    $("#editDetails2").val(entry.details);
    id = entry;
    modalView.style.display = "block";
    // $('#myModal').modal('show');
  };

  $scope.updateUser = function () {
    // var ref2 = firebase.database().ref("datasets/users/" + id.$id);
    // ref2.update({
    //     username: $scope.clickedUser.username,
    //     email: $scope.clickedUser.email,
    //     // country: $scope.clickedUser.country,
    //     // gender: $scope.clickedUser.gender,
    //     role: $scope.clickedUser.role
    // })
    // console.log($("#editName").val());
    // console.log($("#editPass").val());
    // console.log($("#editRole").val());

    var myData = JSON.stringify({
      // "domain": "www.done.com"
      "name": $("#editProjectName").val(),
      "comid": id.comid,
      "clientName": $("#editClientName").val(),
      "rate": $("#editProjectRate").val(),
      "type": $("#editProjectType").val(),
      "priority": $("#editPriority").val(),
      "size": $("#editProjectSize").val(),
      "startingDate": $("#editStartingDate").val(),
      "endingDate": $("#editEndingDate").val(),
      "task": $("#editTaskTitle").val(),
      "subtask": $("#editSubTask").val(),
      "details": $("#editDetails").val(),
      "toWhom": id.toWhom
      // "password": Base64.encode(pwd.value),
      // "role": "ordinary"
    });

    // console.log(myData);

    $.ajax({
      type: "POST",
      dataType: "json",
      // url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/adcounts/{domain}",
      url: " https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/projects/{name}",
      data: myData,
      headers: {
        "Content-Type": "application/json"
      },
      success: function (data) {
        console.log(data);
        window.location.hash = "#/";
        window.location.hash = "#/projects";
        // console.log(window.location.hash);

      },
      error: function (error) {
        // console.log(error);
      }
    });


    modal.style.display = "none";

  };

  $scope.deleteUser = function () {
    // console.log(entry)
    // var ref = firebase.database().ref("datasets/users/" + id.$id);
    // ref.remove();
    // modal2.style.display = "none";
    // console.log(id.username);


    var settings = {
      "url": "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/projects/" + id.name,
      "method": "DELETE",
      "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
      window.location.hash = "#/";
      window.location.hash = "#/projects";
      modal2.style.display = "none";
    });
  };

  $scope.close = function () {
    modal.style.display = "none";
  };

  $scope.close2 = function () {
    modal2.style.display = "none";
  };
  $scope.close3 = function () {
    modalView.style.display = "none";
  };

});