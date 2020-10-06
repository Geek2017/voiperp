var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;

            const username = $('#loginEmail').val();

            // console.log(username);

            var settings = {
                "url": "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/users/" + username,
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(settings).done(function (response) {
                var user = response.email;
                // console.log(response);
                // console.log(response.email);
                if (response.email && response.password && response.verification == "verified") {

                    var picture = response.image;

                    var settings = {
                        "url": "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/companies/" +
                            response.comid,
                        "method": "GET",
                        "timeout": 0,
                    };
                    $.ajax(settings).done(function (response2) {
                        sessionStorage.setItem("comPhoto", response2.logo);
                        sessionStorage.setItem("comid", response.comid);
                        var lsrole = 0;
                        var decodedPwd = Base64.decode(response.password);
                        // var role = response.role;
                        var signInPwd = $('#loginPassword').val();
                        // console.log(role);
                        if (response.role == "super") {
                            lsrole = 0;
                            // console.log("0");
                        } else if (response.role == "admin") {
                            lsrole = 1;
                            // console.log("1");
                        } else if (response.role == "ordinary") {
                            lsrole = 2;
                            // console.log("2");
                        }
                        if (signInPwd == decodedPwd) {
                            document.getElementById("success").innerHTML = "Success! Redirecting . .";
                            document.getElementById("messages").innerHTML =
                                "";
                            sessionStorage.setItem("state", 1);
                            sessionStorage.setItem("user", user);
                            sessionStorage.setItem("role", lsrole);
                            localStorage.setItem("fullname", response.fullname);
                            sessionStorage.setItem("picture", picture);
                            console.log("You're in!");

                            var myData = JSON.stringify({

                                //     // "count": "13",
                                //     // "domain": "www.done.com"
                                "action": "Login",
                                "comid": response.comid,
                                "datetime": dateTime,
                                "module": "Auth",
                                "role": response.role,
                                "userid": response.email

                                // "password": Base64.encode(pwd.value),
                                // "role": ""

                            });

                            // console.log(myData2);

                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                // url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/adcounts/{domain}",
                                url: "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/t-logs/{id}",
                                data: myData,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                success: function (data) {
                                    console.log("T-Log");
                                    
                                    // window.location.href = './index.html';
                                },
                                error: function (response) {
                                    console.log(response);
                                    console.log("Error");

                                }
                            });
                            // sessionStorage.setItem("state", 1);
                            // sessionStorage.setItem("user", user);
                            // sessionStorage.setItem("role", lsrole);
                            // localStorage.setItem("fullname", response.fullname);
                            // sessionStorage.setItem("picture", picture);
                            // console.log("You're in!");
                            // window.location.href = './index.html';

                        } else {
                            document.getElementById("messages").innerHTML =
                                "Your password is incorrect!";
                            setTimeout(function () {
                                document.getElementById("messages").innerHTML =
                                    "Your password is incorrect!";
                            }, 3000);
                            // console.log("Your password is incorrect!");
                        }
                    });
                    // $.ajax(settings).done(function (error2) {
                    //     console.log(error2);
                    //     // sessionStorage.setItem("comPhoto", response2.logo);
                    // });

                    // console.log(Base64.decode(response.password));
                } else if (response.email && response.password && response.verification == "not verify") {
                    document.getElementById("messages").innerHTML =
                        "Kindly verify your email";
                    setTimeout(function () {
                        document.getElementById("messages").innerHTML =
                            "Kindly verify your email";
                    }, 3000);
                } else if (!response.email && !response.password) {
                    document.getElementById("messages").innerHTML = "Your account is not registered";
                    // console.log("Your account is not registered");
                    setTimeout(function () {
                        document.getElementById("messages").innerHTML =
                            "Your account is not registered";
                    }, 5000);
                    // console.lo
                }



            });