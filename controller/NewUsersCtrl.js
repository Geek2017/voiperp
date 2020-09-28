'use strict';

angular.module('fvs').controller('NewUsersCtrl', function ($scope) {

    var Base64 = {


        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


        encode: function (pwd) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            pwd = Base64._utf8_encode(pwd);

            while (i < pwd.length) {

                chr1 = pwd.charCodeAt(i++);
                chr2 = pwd.charCodeAt(i++);
                chr3 = pwd.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr
                    .charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },


        decode: function (pwd) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            pwd = pwd.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < pwd.length) {

                enc1 = this._keyStr.indexOf(pwd.charAt(i++));
                enc2 = this._keyStr.indexOf(pwd.charAt(i++));
                enc3 = this._keyStr.indexOf(pwd.charAt(i++));
                enc4 = this._keyStr.indexOf(pwd.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },

        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    }

    addNew.onclick = function () {
        addNewUser();
    }

    function addNewUser() {

        var newUserEmail = $('#newUserEmail').val(),
            newUserContact = $('#newUserContact').val(),
            newUserDesignation = $('#newUserDesignation').val(),
            newUserFullname = $('#newUserFullname').val(),
            newUserPassword = $('#newUserPassword').val();



        var encode = document.getElementById('encode'),
            decode = document.getElementById('decode'),
            save = document.getElementById('save'),
            signIn = document.getElementById('signIn'),
            output = document.getElementById('output'),
            pwd = document.getElementById('newUserPassword');

        if (newUserEmail && newUserContact && newUserDesignation && newUserFullname && newUserPassword) {

            fileSelect = document.getElementById("newUserPicture").files;
            if (fileSelect.length > 0) {
                var fileSelect = fileSelect[0];
                var fileReader = new FileReader();

                fileReader.onload = function (FileLoadEvent) {
                    var data = FileLoadEvent.target.result;
                    // logo = data;
                    // console.log(data);
                    localStorage.setItem("newUserphoto", data);
                    // sessionStorage.setItem("comPhoto", data);

                }
                fileReader.readAsDataURL(fileSelect);
            }

            var userComID = sessionStorage.getItem("comid");
            var url = "http://52.87.240.93/zumecall/verification.html#";

            var myData2 = JSON.stringify({

                //     // "count": "13",
                //     // "domain": "www.done.com"
                "email": $('#newUserEmail').val(),
                "comid": userComID,
                // "comid": $('#email').val(),
                "contact": $('#newUserContact').val(),
                "designation": $('#newUserDesignation').val(),
                "fullname": $('#newUserFullname').val(),
                "image": localStorage.getItem("newUserphoto"),
                "password": Base64.encode(pwd.value),
                "role": "ordinary",
                "verification": "not verify"

                // "password": Base64.encode(pwd.value),
                // "role": ""

            });

            console.log(myData2);

            $.ajax({
                type: "POST",
                dataType: "json",
                // url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/adcounts/{domain}",
                url: "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/users/{email}",
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
                    var template_params = {
                        "to_email": $('#newUserEmail').val(),
                        // "bcc": email,
                        // "reply_to": email,
                        "from_name": "FVS Team",
                        "to_name": "",
                        "message_html": url + userComID + "#" + $('#newUserEmail').val()
                    }


                    var service_id = "fvs2";
                    var template_id = "template_3hi63vh";
                    emailjs.send(service_id, template_id, template_params);

                    console.log("Sent");
                    document.getElementById("newUserEmail").value = "";
                    document.getElementById("newUserContact").value = "";
                    document.getElementById("newUserDesignation").value = "";
                    document.getElementById("newUserFullname").value = "";
                    document.getElementById("newUserPassword").value = "";

                    document.getElementById("messages").innerHTML =
                        "A verification email has been sent to the user! He/She needs to verify the email before logging in.";


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