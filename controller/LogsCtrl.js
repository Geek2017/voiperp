'use strict';

angular.module('fvs').controller('LogsCtrl', function ($scope) {

    $scope.data = [];

    $scope.arr = [];

    let actual = 0;

    var userComID = sessionStorage.getItem("comid");
    var role = sessionStorage.getItem("role");
    // console.log(userComID);

    var settings = {
        "url": "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/alllogs",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        var count = response.Count;

      
        // console.log(response);
        for (var i = 0; i < count; i++) {

            $scope.arr[i] = {
                comid: response.Items[i].comid.S,
                email: response.Items[i].userid.S,
                action: response.Items[i].action.S,
                datetime: response.Items[i].datetime.S,
                module: response.Items[i].module.S,
                role: response.Items[i].role.S,
            }
            $scope.data.push($scope.arr[i]);



        }

        // console.log($scope.arr);

        var filtered = $scope.arr.filter(function (comid) {
            return comid.comid == userComID;
        });

        // console.log(filtered);

        var newFiltered = filtered.map((users) => {
            var user = {
                email: users.email,
                action: users.action,
                datetime: users.datetime,
                module: users.module,
                role: users.role,
            }

            return user
        })

        // console.log(newFiltered)

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
    
                    // for (let k = 0; k < buttons.length; k++) {
                    //     let button = buttons[k];
                    //     var btn = document.createElement('input');
                    //     btn.type = button.type;
                    //     btn.value = button.value;
                    //     btn.className = button.className;
                    //     btn
                    //     if (btn.value === "Edit") {
                    //         btn.onclick = (function (entry) {
                    //             return function () {
                    //                 $scope.selectUser(entry);
                    //             }
                    //         })(entry);
                    //     } else {
                    //         btn.onclick = (function (entry) {
                    //             return function () {
                    //                 $scope.selectUser2(entry);
                    //             }
                    //         })(entry);
                    //     }
                    //     td.appendChild(btn)[i];
                    // }
    
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
    
                    // for (let k = 0; k < buttons.length; k++) {
                    //     let button = buttons[k];
                    //     var btn = document.createElement('input');
                    //     btn.type = button.type;
                    //     btn.value = button.value;
                    //     btn.className = button.className;
                    //     btn
                    //     if (btn.value === "Edit") {
                    //         btn.onclick = (function (entry) {
                    //             return function () {
                    //                 $scope.selectUser(entry);
                    //             }
                    //         })(entry);
                    //     } else {
                    //         btn.onclick = (function (entry) {
                    //             return function () {
                    //                 $scope.selectUser2(entry);
                    //             }
                    //         })(entry);
                    //     }
                    //     td.appendChild(btn)[i];
                    // }
    
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

                // for (let k = 0; k < buttons.length; k++) {
                //     let button = buttons[k];
                //     var btn = document.createElement('input');
                //     btn.type = button.type;
                //     btn.value = button.value;
                //     btn.className = button.className;
                //     btn
                //     if (btn.value === "Edit") {
                //         btn.onclick = (function (entry) {
                //             return function () {
                //                 $scope.selectUser(entry);
                //             }
                //         })(entry);
                //     } else {
                //         btn.onclick = (function (entry) {
                //             return function () {
                //                 $scope.selectUser2(entry);
                //             }
                //         })(entry);
                //     }
                //     td.appendChild(btn)[i];
                // }

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

    $.ajax(settings).fail(function (response) {
        console.log(response.responseText);
    });

});