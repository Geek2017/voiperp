'use strict';

angular.module('fvs').controller('ListComCtrl', function ($scope) {

    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var accept = document.getElementById("accept");

    $("#editBtn").click(function() {
        modal.style.display = "block";
    });

    $scope.data = [];

    $scope.arr = [];

    var userName, email, role, id;

    $scope.clickedUser = {};

    var userComID = sessionStorage.getItem("comid");
    var role = sessionStorage.getItem("role")

    var settings = {
        "url": "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/allcompanies",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        var count = response.Count;
        // console.log(response);
        for (var i = 0; i < count; i++) {

            $scope.arr[i] = {
                comid: response.Items[i].id.S,
                name: response.Items[i].name.S,
                address: response.Items[i].address.S,
                contact: response.Items[i].contact.S,
                logo: response.Items[i].logo.S,
                subscription: response.Items[i].subscription.S,
                action: ""
            }
            // console.log(response.Items[i])
            $scope.data.push($scope.arr[i]);

        }

        var filtered = $scope.arr.filter(function (comid) {
            return comid.comid == userComID;
        });

        var newFiltered = filtered.map((users) => {
            var user = {
                name: users.name,
                address: users.address,
                contact: users.contact,
                subscription: users.subscription,
                action: users.action
            }

            return user
        })

        if(role == 0){
            var noOfContacts = $scope.arr.length;
            if (noOfContacts > 0) {


                // CREATE DYNAMIC TABLE.
                var table = document.createElement("table");
                table.style.width = '100%';
                table.setAttribute('border', '1');
                table.setAttribute('cellspacing', '0');
                table.setAttribute('cellpadding', '5');
    
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
                    }];
                    // btn.type = buttons.values(type);
    
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
                        } else {
                            btn.onclick = (function (entry) {
                                return function () {
                                    $scope.selectUser2(entry);
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
        else if (role == 1) {
            var noOfContacts = newFiltered.length;

            if (noOfContacts > 0) {


                // CREATE DYNAMIC TABLE.
                var table = document.createElement("table");
                table.style.width = '100%';
                table.setAttribute('border', '1');
                table.setAttribute('cellspacing', '0');
                table.setAttribute('cellpadding', '5');
    
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
                    }];
                    // btn.type = buttons.values(type);
    
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
                        } else {
                            btn.onclick = (function (entry) {
                                return function () {
                                    $scope.selectUser2(entry);
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
                    className: "btn btn-info mx-2"
                }, {
                    value: "Delete",
                    type: "button",
                    className: "btn btn-danger mx-2"
                }];
                // btn.type = buttons.values(type);

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
                    } else {
                        btn.onclick = (function (entry) {
                            return function () {
                                $scope.selectUser2(entry);
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


    $scope.statuses = [
        {username: 'asdasdasds', role: 'status1'},
        {username: 'asdasdasdsad', role: 'status2'},
        {username: 'asdasdsadas', role: 'status3'}
      ];

    //   console.log($scope.statuses);

    $scope.selectUser = function(entry) {
        // console.log(users);
        console.log(entry);
        // $scope.clickedUser = entry;
        $("#editName").val(entry.name);
        $("#editAddress").val(entry.address);
        $("#editContact").val(entry.contact);
        $("#editSubscription").val(entry.subscription);
        // $("#editRole").val(entry.role);
        id = entry;
        modal.style.display = "block";  
        // $('#myModal').modal('show');
    };

    $scope.selectUser2 = function(entry) {
        // console.log(users);
        $scope.clickedUser = entry;
        document.getElementById("deleteUser").innerText =  entry.fullname;
        id = entry;
        modal2.style.display = "block";
    };

    $scope.updateUser = function() {
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
            "id": id.comid,
            "name": $("#editName").val(),
            "address": $("#editAddress").val(),
            "contact": $("#editContact").val(),
            "logo": id.logo,
            "subscription": $("#editSubscription").val(),
            // "password": Base64.encode(pwd.value),
            // "role": "ordinary"
        });

        console.log(myData);
    
        $.ajax({
            type: "PUT",
            dataType: "json",
            // url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/adcounts/{domain}",
            url: "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/companies/{id}",
            data: myData,
            headers: {
                "Content-Type": "application/json"
            },
            success: function(data) {
                console.log(data);
                window.location.hash = "#/";
                window.location.hash = "#/listCompanies";
                // console.log(window.location.hash);
    
            },
            error: function(error) {
                console.log(error);
            }
        });
        

        modal.style.display = "none";

    };

    $scope.deleteUser = function() {
        // console.log(entry)
        // var ref = firebase.database().ref("datasets/users/" + id.$id);
        // ref.remove();
        // modal2.style.display = "none";
        // console.log(id.username);


        var settings = {
            "url": "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/companies/" + id.comid,
            "method": "DELETE",
            "timeout": 0,
        };
        $.ajax(settings).done(function(response) {
            console.log(response);
            modal2.style.display = "none";
        });
    };

    $scope.close = function() {
        modal.style.display = "none";
    };

    $scope.close2 = function() {
        modal2.style.display = "none";
    };


});