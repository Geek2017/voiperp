(function (a) {
    a.fn.smartWizard = function (m) {
        var c = a.extend({}, a.fn.smartWizard.defaults, m),
            x = arguments;
        return this.each(function () {
            function C() {
                var e = b.children("div");
                b.children("ul").addClass("anchor");
                e.addClass("content");
                n = a("<div>Loading</div>").addClass("loader");
                k = a("<div></div>").addClass("action-bar");
                p = a("<div></div>").addClass("step-container");
                q = a("<a>" + c.labelNext + "</a>").attr("href", "#").addClass("btn btn-primary");
                r = a("<a>" + c.labelPrevious + "</a>").attr("href", "#").addClass("btn btn-primary");
                s = a("<a>" + c.labelFinish + "</a>").attr("href", "#").addClass("btn btn-primary");
                c.errorSteps && 0 < c.errorSteps.length && a.each(c.errorSteps, function (a, b) {
                    y(b, !0)
                });
                p.append(e);
                k.append(n);
                b.append(p);
                b.append(k);
                c.includeFinishButton && k.append(s);
                k.append(q).append(r);
                z = p.width();
                a(q).click(function () {
                    if (a(this).hasClass("buttonDisabled")) return !1;
                    A();
                    return !1
                });
                a(r).click(function () {
                    if (a(this).hasClass("buttonDisabled")) return !1;
                    B();
                    return !1
                });
                a(s).click(function () {
                    if (!a(this).hasClass("buttonDisabled"))
                        if (a.isFunction(c.onFinish)) c.onFinish.call(this,
                            a(f));
                        else {
                            var d = b.parents("form");
                            d && d.length && d.submit()
                        }
                    return !1
                });
                a(f).bind("click", function (a) {
                    if (f.index(this) == h) return !1;
                    a = f.index(this);
                    1 == f.eq(a).attr("isDone") - 0 && t(a);
                    return !1
                });
                c.keyNavigation && a(document).keyup(function (a) {
                    39 == a.which ? A() : 37 == a.which && B()
                });
                D();
                t(h)
            }

            function D() {
                c.enableAllSteps ? (a(f, b).removeClass("selected").removeClass("disabled").addClass("done"), a(f, b).attr("isDone", 1)) : (a(f, b).removeClass("selected").removeClass("done").addClass("disabled"), a(f, b).attr("isDone",
                    0));
                a(f, b).each(function (e) {
                    a(a(this).attr("href"), b).hide();
                    a(this).attr("rel", e + 1)
                })
            }

            function t(e) {
                var d = f.eq(e),
                    g = c.contentURL,
                    h = d.data("hasContent");
                stepNum = e + 1;
                g && 0 < g.length ? c.contentCache && h ? w(e) : a.ajax({
                    url: g,
                    type: "POST",
                    data: {
                        step_number: stepNum
                    },
                    dataType: "text",
                    beforeSend: function () {
                        n.show()
                    },
                    error: function () {
                        n.hide()
                    },
                    success: function (c) {
                        n.hide();
                        c && 0 < c.length && (d.data("hasContent", !0), a(a(d, b).attr("href"), b).html(c), w(e))
                    }
                }) : w(e)
            }

            function w(e) {
                var d = f.eq(e),
                    g = f.eq(h);
                if (e != h && a.isFunction(c.onLeaveStep) &&
                    !c.onLeaveStep.call(this, a(g))) return !1;
                c.updateHeight && p.height(a(a(d, b).attr("href"), b).outerHeight());
                if ("slide" == c.transitionEffect) a(a(g, b).attr("href"), b).slideUp("fast", function (c) {
                    a(a(d, b).attr("href"), b).slideDown("fast");
                    h = e;
                    u(g, d)
                });
                else if ("fade" == c.transitionEffect) a(a(g, b).attr("href"), b).fadeOut("fast", function (c) {
                    a(a(d, b).attr("href"), b).fadeIn("fast");
                    h = e;
                    u(g, d)
                });
                else if ("slideleft" == c.transitionEffect) {
                    var k = 0;
                    e > h ? (nextElmLeft1 = z + 10, nextElmLeft2 = 0, k = 0 - a(a(g, b).attr("href"), b).outerWidth()) :
                        (nextElmLeft1 = 0 - a(a(d, b).attr("href"), b).outerWidth() + 20, nextElmLeft2 = 0, k = 10 + a(a(g, b).attr("href"), b).outerWidth());
                    e == h ? (nextElmLeft1 = a(a(d, b).attr("href"), b).outerWidth() + 20, nextElmLeft2 = 0, k = 0 - a(a(g, b).attr("href"), b).outerWidth()) : a(a(g, b).attr("href"), b).animate({
                        left: k
                    }, "fast", function (e) {
                        a(a(g, b).attr("href"), b).hide()
                    });
                    a(a(d, b).attr("href"), b).css("left", nextElmLeft1);
                    a(a(d, b).attr("href"), b).show();
                    a(a(d, b).attr("href"), b).animate({
                        left: nextElmLeft2
                    }, "fast", function (a) {
                        h = e;
                        u(g, d)
                    })
                } else a(a(g,
                    b).attr("href"), b).hide(), a(a(d, b).attr("href"), b).show(), h = e, u(g, d);
                return !0
            }

            function u(e, d) {
                a(e, b).removeClass("selected");
                a(e, b).addClass("done");
                a(d, b).removeClass("disabled");
                a(d, b).removeClass("done");
                a(d, b).addClass("selected");
                a(d, b).attr("isDone", 1);
                c.cycleSteps || (0 >= h ? a(r).addClass("buttonDisabled") : a(r).removeClass("buttonDisabled"), f.length - 1 <= h ? a(q).addClass("buttonDisabled") : a(q).removeClass("buttonDisabled"));
                !f.hasClass("disabled") || c.enableFinishButton ? a(s).removeClass("buttonDisabled") :
                    a(s).addClass("buttonDisabled");
                if (a.isFunction(c.onShowStep) && !c.onShowStep.call(this, a(d))) return !1
            }

            function A() {
                var a = h + 1;
                if (f.length <= a) {
                    if (!c.cycleSteps) return !1;
                    a = 0
                }
                t(a)
            }

            function B() {
                var a = h - 1;
                if (0 > a) {
                    if (!c.cycleSteps) return !1;
                    a = f.length - 1
                }
                t(a)
            }

            function E(b) {
                a(".content", l).html(b);
                l.show()
            }

            function y(c, d) {
                d ? a(f.eq(c - 1), b).addClass("error") : a(f.eq(c - 1), b).removeClass("error")
            }
            var b = a(this),
                h = c.selected,
                f = a("ul > li > a[href^='#step-']", b),
                z = 0,
                n, l, k, p, q, r, s;
            k = a(".action-bar", b);
            0 == k.length && (k =
                a("<div></div>").addClass("action-bar"));
            l = a(".msg-box", b);
            0 == l.length && (l = a('<div class="msg-box"><div class="content"></div><a href="#" class="close"><i class="icofont icofont-close-line-circled"></i></a></div>'), k.append(l));
            a(".close", l).click(function () {
                l.fadeOut("normal");
                return !1
            });
            if (m && "init" !== m && "object" !== typeof m) {
                if ("showMessage" === m) {
                    var v = Array.prototype.slice.call(x, 1);
                    E(v[0]);
                    return !0
                }
                if ("setError" === m) return v = Array.prototype.slice.call(x, 1), y(v[0].stepnum, v[0].iserror), !0;
                a.error("Method " + m + " does not exist")
            } else C()
        })
    };
    a.fn.smartWizard.defaults = {
        selected: 0,
        keyNavigation: !0,
        enableAllSteps: !1,
        updateHeight: !0,
        transitionEffect: "fade",
        contentURL: null,
        contentCache: !0,
        cycleSteps: !1,
        includeFinishButton: !0,
        enableFinishButton: !1,
        errorSteps: [],
        labelNext: "Next",
        labelPrevious: "Previous",
        labelFinish: "Finish",
        onLeaveStep: null,
        onShowStep: null,
        onFinish: null
    }
})(jQuery);



$('#wizard').smartWizard({
    transitionEffect: 'slideleft',
    onFinish: onFinishCallback
});

var images1 = "";
var images2 = "";

async function resizeImage(dataUrl, targetFileSizeKb, maxDeviation = 1) {
    let originalFile = await urltoFile(dataUrl, "test.png", "image/png");
    if (originalFile.size / 1000 < targetFileSizeKb) return dataUrl; // File is already smaller

    let low = 0.0;
    let middle = 0.5;
    let high = 1.0;

    let result = dataUrl;

    let file = originalFile;

    while (Math.abs(file.size / 1000 - targetFileSizeKb) > maxDeviation) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = document.createElement("img");

        const promise = new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
        });

        img.src = dataUrl;

        await promise;

        canvas.width = Math.round(img.width * middle);
        canvas.height = Math.round(img.height * middle);
        context.scale(canvas.width / img.width, canvas.height / img.height);
        context.drawImage(img, 0, 0);
        file = await urltoFile(canvas.toDataURL(), "test.png", "image/png");

        if (file.size / 1000 < targetFileSizeKb - maxDeviation) {
            low = middle;
        } else if (file.size / 1000 > targetFileSizeKb) {
            high = middle;
        }

        middle = (low + high) / 2;
        result = canvas.toDataURL();
    }

    return result;
}

function urltoFile(url, filename, mimeType) {
    return fetch(url)
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new File([buf], filename, {
                type: mimeType
            });
        });
}

document.getElementById("comLogo").addEventListener("change", function () {
    if (window.File && window.FileList && window.FileReader) {
        var files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            var picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
                var picFile = event.target;
                var image = picFile.result;
                resizeImage(image, 10, 1).then((res) => {
                    images1 = res;
                });
            });

            picReader.readAsDataURL(file);
        }
    }
}, false)

document.getElementById("picture").addEventListener("change", function () {
    if (window.File && window.FileList && window.FileReader) {
        var files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            var picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
                var picFile = event.target;
                var image = picFile.result;
                resizeImage(image, 10, 1).then((res) => {
                    images2 = res;
                });
            });

            picReader.readAsDataURL(file);
        }
    }
}, false)


function onFinishCallback() {

    // console.log("asdsad");

    var comName = $('#comName').val(),
        comAdd = $('#comAdd').val(),
        comNum = $('#comNum').val(),
        comLogo = localStorage.getItem("logo"),
        email = $('#email').val(),
        contact = $('#contact').val(),
        designation = $('#designation').val(),
        fullname = $('#fullname').val(),
        image = localStorage.getItem("picture"),
        password = $('#password').val();

    // fileSelect = document.getElementById("comLogo").files;
    // fileSelect2 = document.getElementById("picture").files;
    // var logo, picture;
    // if (fileSelect.length > 0) {
    //     var file = fileSelect[0];
    //     var fileReader = new FileReader();

    //     fileReader.onload = function (event) {
    //         var data = event.target.result;
    //         logo = data;
    //         resizeImage(logo, 10, 1).then((res) => {
    //             images1 = `${res}`;
    //         });
    //         localStorage.setItem("logo", data);
    //         sessionStorage.setItem("comPhoto", data);
    //         sessionStorage.setItem("images1", images1);

    //     }
    //     fileReader.readAsDataURL(file);
    // }

    // if (fileSelect2.length > 0) {
    //     var fileSelect2 = fileSelect2[0];
    //     var fileReader2 = new FileReader();

    //     fileReader2.onload = function (FileLoadEvent) {
    //         var data2 = FileLoadEvent.target.result;
    //         picture = data2;
    //         resizeImage(picture, 10, 1).then((res) => {
    //             images2 = `${res}`;
    //         });
    //         // console.log(data2);
    //         localStorage.setItem("picture", data2);
    //         sessionStorage.setItem("picture", data2);
    //         sessionStorage.setItem("images2", images2);

    //     }
    //     fileReader2.readAsDataURL(fileSelect2);
    // }

    // console.log(images1);
    // console.log(images2);

    if (comName && comAdd && comNum && email && contact && designation && fullname && password) {

        var logo, picture;


        // var logo = document.getElementById("comLogo");
        // logo.addEventListener("change", function () {
        //     encodeImageFileURL();
        // })



        var myData = JSON.stringify({

            //     // "count": "13",
            //     // "domain": "www.done.com"
            "name": $('#comName').val(),
            "address": $('#comAdd').val(),
            "contact": $('#comNum').val(),
            "logo": images1,
            "subscription": "0",
            // "password": Base64.encode(pwd.value),
            // "role": ""

        });

        // console.log(myData)

        $.ajax({
            type: "POST",
            dataType: "json",
            // url: "https://pq38i6wtd4.execute-api.ap-southeast-1.amazonaws.com/verkoapi/adcounts/{domain}",
            url: "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/companies/{id}",
            data: myData,
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                console.log(response);
                console.log("Success");
                // sessionStorage.setItem("state", 1);
                // document.getElementById("success2").innerHTML = "Success, Redirecting to login. . .";
                // setTimeout(function(){ 
                // $('#registerStyle').hide();
                // $('#forgotStyle').hide();
                // $('#loginStyle').show();
                // },3000);

                // window.location.href = './index.html';
            },
            error: function (response) {
                console.log(response.responseText);

                var id = response.responseText;
                // localStorage.setItem("comid", id);

                var str = id;
                var res = str.split("\r\n", 1);

                sessionStorage.setItem("comid", res[0]);

                console.log(res[0]);

                var myData2 = JSON.stringify({

                    //     // "count": "13",
                    //     // "domain": "www.done.com"
                    "email": $('#email').val(),
                    "comid": res[0],
                    // "comid": $('#email').val(),
                    "contact": $('#contact').val(),
                    "designation": $('#designation').val(),
                    "fullname": $('#fullname').val(),
                    "image": images2,
                    "password": Base64.encode(pwd.value),
                    "role": "admin",
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
                        localStorage.setItem("fullname", $('#fullname').val());
                        sessionStorage.setItem("state", 1);
                        sessionStorage.setItem("role", 1);
                        // document.getElementById("success2").innerHTML = "Success, Redirecting to login. . .";
                        // setTimeout(function(){ 
                        // $('#registerStyle').hide();
                        // $('#forgotStyle').hide();
                        // $('#loginStyle').show();
                        // },3000);
                        // $('#wizard').smartWizard('showMessage', 'Done. Redirecting. . .');
                        var template_params = {
                            "to_email": $('#email').val(),
                            // "bcc": email,
                            // "reply_to": email,
                            "from_name": "FVS Team",
                            "to_name": "",
                            "message_html": "http://zumecall.com/verification.html#" + res[0] + "#" + $('#email').val()
                            // "message_html": "http://mitsi.digital/zumecall/zumecall/verification.html#" + res[0] + "#" + $('#email').val()
                        }


                        var service_id = "service_fvs";
                        var template_id = "template_4cj69ab";
                        emailjs.send(service_id, template_id, template_params);

                        console.log("Sent");
                        document.getElementById("comName").value = "";
                        document.getElementById("comAdd").value = "";
                        document.getElementById("comNum").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("contact").value = "";
                        document.getElementById("designation").value = "";
                        document.getElementById("fullname").value = "";
                        document.getElementById("password").value = "";

                        document.getElementById("messages2").innerHTML =
                            "A verification email has been sent! You need to verify your email before logging in.";


                        // window.location.href = './index.html';
                    },
                    error: function (response) {
                        console.log(response);
                        console.log("Error");

                    }
                });
            }
        });
    } else {
        document.getElementById("messages2").innerHTML = "You need to fill up everything, check the fields again.";
        setTimeout(function () {
            document.getElementById("messages2").innerHTML = " ";
        }, 3000);
        // console.log("You need to fill up everything, check the feilds again.");
    }
}