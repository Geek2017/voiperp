'use strict';

angular.module('fvs').controller('ListComCtrl', function($scope) {

    $scope.data = [];

    $scope.arr = [];

    var settings = {
        "url": "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/allcompanies",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        var count = response.Count;
        // console.log(response);
        for (var i = 0; i < count; i++){

            $scope.arr[i] = {name: response.Items[i].name.S, address: response.Items[i].address.S, contact: response.Items[i].contact.S, subscription: response.Items[i].subscription.S, action: "" }
            // console.log(response.Items[i])
            $scope.data.push($scope.arr[i]);
            
        }

        // console.log($scope.arr);

        var noOfContacts = $scope.arr.length;
		
		if(noOfContacts>0){
			
 
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
                        },{
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
                            if(btn.value === "Edit") {
                                btn.onclick = (function(entry) {return function() {$scope.selectUser(entry);}})(entry);
                            } else {
                                btn.onclick = (function(entry) {return function() {$scope.selectUser2(entry);}})(entry);
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

});