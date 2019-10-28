var uid = "";
var userRef = "";
var userPostRef = "";
var lg = false;
var uname;
var mainData = {};
var postsRef = firebase.database().ref('/posts/');
//
var canvas = document.getElementById("item_img_hidden");
var ctx = canvas.getContext("2d");
var imgdata;
// https://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3
$(function() {
    $(document).on('change', ':file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
    $(document).ready(function() {
        $(':file').on('fileselect', function(event, numFiles, label) {
            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;
            if (input.length) {
                input.val(log);
            } else {
                if (log) {
                    alert(log);
                }
            }
        });
    });
});
//
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            //$('#item_img_preview').attr('src', e.target.result);
            var imgts = new Image();
            imgts.src = window.URL.createObjectURL(input.files[0]);
            //
            imgts.onload = function() {
                //$('#preview').append(img);
                // alert("Size:  KB\nWidth: " + imgts.width + "\nHeight: " + imgts.height);
                $("#item_img_preview").attr("src", imgts.src);
                $("#prev_picture").attr("src", imgts.src);
                canvas.width = imgts.width;
                canvas.height = imgts.height;
                ctx.drawImage(imgts, 0, 0);
                imgdata = canvas.toDataURL("image/png");
                //console.log(imgdata);
            };
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$("#item_img_input").change(function() {
    readURL(this);
});
//
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.email.includes("cps.edu")) {
            uid = user.uid;
            uname = user.displayName;
            lg = true;
            $("#accNavItem").html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + user.displayName + ' <span class="caret"></span> </a> <ul class="dropdown-menu">  <li> <a href="#" id="logout">Logout</a> </li> </ul>');
            $("#accNavItem").addClass('dropdown');
            userRef = firebase.database().ref('/users/' + uid + "/");
            userPostRef = firebase.database().ref('/userposts/' + uid + "/");
            //
            userPostRef.on("child_added", function(data) {
                console.log("---ADDED---");
                console.log(data.key);
                console.log(data.val());
                console.log("------");
                firebase.database().ref('/users/' + data.val().item_author).once('value').then(function(snapshot) {
                    //
                    var friendly_time;
                    var date_full;
                    var item_date = new Date(data.val().item_timestamp);
                    var current_date = new Date();
                    var elapsedTime = Math.round((current_date.getTime() - item_date.getTime()) / 1000); // MILL -> SEC
                    var itemDateString = item_date.toDateString().split(" ");
                    var itemTimeFriendly;
                    if (item_date.getHours() >= 13) {
                        itemTimeFriendly = item_date.getHours() - 12;
                    } else {
                        itemTimeFriendly = item_date.getHours();
                    }
                    if (itemTimeFriendly === 0) {
                        itemTimeFriendly = 12;
                    }
                    if (item_date.getHours() >= 12) {
                        itemTimeFriendly += ":" + item_date.getMinutes() + "pm";
                    } else {
                        itemTimeFriendly += ":" + item_date.getMinutes() + "am";
                    }
                    date_full = itemDateString[1] + " " + itemDateString[2] + ", " + itemDateString[3] + " at " + itemTimeFriendly;
                    var formatTime;
                    if (elapsedTime < 60) {
                        friendly_time = "a few seconds ago";
                    } else if (elapsedTime > 60 && elapsedTime < 3600) {
                        formatTime = Math.round(elapsedTime / 60);
                        if (formatTime == 1) {
                            friendly_time = formatTime + " minute ago";
                        } else {
                            friendly_time = formatTime + " minutes ago";
                        }
                    } else if (elapsedTime >= 3600 && elapsedTime < 86400) {
                        formatTime = Math.round(elapsedTime / 3600);
                        if (formatTime == 1) {
                            friendly_time = formatTime + " hour ago";
                        } else {
                            friendly_time = formatTime + " hours ago";
                        }
                    } else if (elapsedTime >= 86400 && elapsedTime < 864000) {
                        formatTime = Math.round(elapsedTime / 86400);
                        if (formatTime == 1) {
                            friendly_time = formatTime + " day ago";
                        } else {
                            friendly_time = formatTime + " days ago";
                        }
                    } else if (elapsedTime > 864000) {
                        friendly_time = date_full;
                    }
                    //
                    var item_data = {
                        "uid": data.key,
                        "title": data.val().item_title,
                        "desc": data.val().item_desc,
                        "loc": data.val().item_loc,
                        "picture": data.val().item_picture,
                        "timestamp": data.val().item_timestamp,
                        "friendly_time": friendly_time,
                        "date_full": date_full,
                        "tags": data.val().item_tags,
                        "status": data.val().item_status,
                        "author_name": snapshot.val().name,
                        "author_email": snapshot.val().email,
                        "author_picture": snapshot.val().profile_picture
                    };
                    mainData[data.key] = item_data;
                    //
                    var desc = item_data.desc;
                    if (item_data.desc.length > 210) {
                        desc = item_data.desc.substring(0, 210);
                        desc += "... Expand Card to see More";
                    }
                    var itemCard = $("#templateCard").clone();
                    itemCard.attr("id", item_data.uid);
                    itemCard.find(".item_author_picture").attr("src", item_data.author_picture);
                    itemCard.find(".item_author_name").text(item_data.author_name);
                    itemCard.find(".item_friendly_time").text(item_data.friendly_time);
                    //console.log(item_data.tags[0]);
                    if (item_data.tags) {
                        itemCard.find(".item_tags0").text(item_data.tags[0]);
                    } else {
                        itemCard.find(".item_tags0").remove();
                    }
                    //
                    //console.log("ADDED STATUS " + item_data.status.toLowerCase());
                    if (item_data.status.toLowerCase() == "claimed") {
                        itemCard.find(".css_status").text("Claimed");
                    } else {
                        itemCard.find(".css_status").text("Unclaimed");
                    }
                    //
                    if (item_data.status.toLowerCase() == "claimed") {
                        itemCard.find(".css_status").attr("class", "item_tag claimed css_status");
                    } else {
                        itemCard.find(".css_status").attr("class", "item_tag unclaimed css_status");
                    }
                    //
                    itemCard.find(".lead").text(item_data.title);
                    itemCard.find(".infoBtn").data("itemid", item_data.uid);
                    itemCard.find(".item_desc").text(desc);
                    if (data.val().item_picture) {
                        itemCard.find(".item_picture").css('background-image', 'url(' + data.val().item_picture + ')');
                    } else {
                        itemCard.find(".item_picture").css('background-image', 'url(assets/media/item_thumb_default.png)');
                    }
                    $("#main").append(itemCard);
                });

                $(".loader_wrapper").hide();

            });
            //
            userPostRef.on("child_changed", function(data) {
                console.log("---CHANGED---");
                console.log(data.key);
                console.log(data.val());
                console.log("------");
                firebase.database().ref('/users/' + data.val().item_author).once('value').then(function(snapshot) {
                    //
                    var friendly_time;
                    var date_full;
                    var item_date = new Date(data.val().item_timestamp);
                    var current_date = new Date();
                    var elapsedTime = Math.round((current_date.getTime() - item_date.getTime()) / 1000); // MILL -> SEC
                    var itemDateString = item_date.toDateString().split(" ");
                    var itemTimeFriendly;
                    if (item_date.getHours() >= 13) {
                        itemTimeFriendly = item_date.getHours() - 12;
                    } else {
                        itemTimeFriendly = item_date.getHours();
                    }
                    if (itemTimeFriendly === 0) {
                        itemTimeFriendly = 12;
                    }
                    if (item_date.getHours() >= 12) {
                        itemTimeFriendly += ":" + item_date.getMinutes() + "pm";
                    } else {
                        itemTimeFriendly += ":" + item_date.getMinutes() + "am";
                    }
                    date_full = itemDateString[1] + " " + itemDateString[2] + ", " + itemDateString[3] + " at " + itemTimeFriendly;
                    var formatTime;
                    if (elapsedTime < 60) {
                        friendly_time = "a few seconds ago";
                    } else if (elapsedTime > 60 && elapsedTime < 3600) {
                        formatTime = Math.round(elapsedTime / 60);
                        if (formatTime == 1) {
                            friendly_time = formatTime + " minute ago";
                        } else {
                            friendly_time = formatTime + " minutes ago";
                        }
                    } else if (elapsedTime >= 3600 && elapsedTime < 86400) {
                        formatTime = Math.round(elapsedTime / 3600);
                        if (formatTime == 1) {
                            friendly_time = formatTime + " hour ago";
                        } else {
                            friendly_time = formatTime + " hours ago";
                        }
                    } else if (elapsedTime >= 86400 && elapsedTime < 864000) {
                        formatTime = Math.round(elapsedTime / 86400);
                        if (formatTime == 1) {
                            friendly_time = formatTime + " day ago";
                        } else {
                            friendly_time = formatTime + " days ago";
                        }
                    } else if (elapsedTime > 864000) {
                        friendly_time = date_full;
                    }
                    //
                    var item_data = {
                        "uid": data.key,
                        "title": data.val().item_title,
                        "desc": data.val().item_desc,
                        "loc": data.val().item_loc,
                        "picture": data.val().item_picture,
                        "timestamp": data.val().item_timestamp,
                        "friendly_time": friendly_time,
                        "date_full": date_full,
                        "tags": data.val().item_tags,
                        "status": data.val().item_status,
                        "author_name": snapshot.val().name,
                        "author_email": snapshot.val().email,
                        "author_picture": snapshot.val().profile_picture
                    };
                    mainData[data.key] = item_data;
                    //
                    var desc = item_data.desc;
                    if (item_data.desc.length > 210) {
                        desc = item_data.desc.substring(0, 210);
                        desc += "... Expand Card to see More";
                    }
                    //
                    var itemCard = $('#' + item_data.uid + '');
                    itemCard.find(".item_author_picture").attr("src", item_data.author_picture);
                    itemCard.find(".item_author_name").text(item_data.author_name);
                    itemCard.find(".item_friendly_time").text(item_data.friendly_time);
                    //console.log(item_data.tags[0]);
                    if (item_data.tags) {
                        itemCard.find(".item_tags0").text(item_data.tags[0]);
                    } else {
                        itemCard.find(".item_tags0").remove();
                    }
                    //
                    //console.log("CHANGED STATUS " + item_data.status.toLowerCase());
                    //
                    if (item_data.status.toLowerCase() === "claimed") {
                        //  console.log("CHANGE STATUS TEXT TRUE");
                        itemCard.find(".css_status").text("Claimed");
                    } else {
                        //  console.log("CHANGE STATUS TEXT FALSE");
                        itemCard.find(".css_status").text("Unclaimed");
                    }
                    //
                    if (item_data.status.toLowerCase() === "claimed") {
                        //  console.log("CHANGE STATUS CSS TRUE");
                        itemCard.find(".css_status").attr("class", "item_tag claimed css_status");
                    } else {
                        //console.log("CHANGE STATUS CSS FALSE");
                        itemCard.find(".css_status").attr("class", "item_tag unclaimed css_status");
                    }
                    //
                    itemCard.find(".lead").text(item_data.title);
                    itemCard.find(".infoBtn").data("itemid", item_data.uid);
                    itemCard.find(".item_desc").text(desc);
                    if (data.val().item_picture) {
                        itemCard.find(".item_picture").css('background-image', 'url(' + data.val().item_picture + ')');
                    } else {
                        itemCard.find(".item_picture").css('background-image', 'url(assets/media/item_thumb_default.png)');
                    }
                });
            });
            userPostRef.on("child_removed", function(data) {
                $("#" + data.key).fadeOut("500", function() {
                    $(this).remove();
                });
            });
            //
            userRef.update({
                "name": user.displayName,
                "email": user.email,
                "profile_picture": user.photoURL
            });
        } else {
            window.location.replace("/lost-and-found/#error-org");
        }
    } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }
});
//
$("nav").on("click", "a#logout", function() {
    if (lg) {
        firebase.auth().signOut().then(function() {
            window.location.replace("/lost-and-found");
            lg = false;
        }, function(error) {
            console.log("um ", error);
        });
    }
});
//
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
//
$("#item_title").on('keydown', function(e) {
    var key = e.which;
    var cCount;
    if (key == 8) {
        cCount = $(this).val().length - 1;
        if (cCount > 30) {
            $("#group_title").addClass("has-error");
        } else {
            $("#group_title").removeClass("has-error");
        }
        if (cCount == -1) {
            $("#charCount_title").text("0");
            return;
        }
        $("#charCount_title").text(cCount);
        return;
    }
    cCount = $(this).val().length + 1;
    if (cCount > 30) {
        $("#group_title").addClass("has-error");
    } else {
        $("#group_title").removeClass("has-error");
    }
    $("#charCount_title").text(cCount);
});
//
$("#item_desc").on('keydown', function(e) {
    var key = e.which;
    var cCount;
    if (key == 8) {
        cCount = $(this).val().length - 1;
        if (cCount > 420) {
            $("#group_desc").addClass("has-error");
        } else {
            $("#group_desc").removeClass("has-error");
        }
        if (cCount == -1) {
            $("#charCount_desc").text("0");
            return;
        }
        $("#charCount_desc").text(cCount);
        return;
    }
    cCount = $(this).val().length + 1;
    if (cCount > 420) {
        $("#group_desc").addClass("has-error");
    } else {
        $("#group_desc").removeClass("has-error");
    }
    $("#charCount_desc").text(cCount);
});
//
$("#item_tags_input").on('keydown', function(e) {
    var key = e.which;
    var cCount;
    if (key == 8) {
        cCount = $(this).val().length - 1;
        if (cCount > 10) {
            $("#group_tags").addClass("has-error");
        } else {
            $("#group_tags").removeClass("has-error");
        }
        if (cCount == -1) {
            return;
        }
        return;
    }
    cCount = $(this).val().length + 1;
    if (cCount > 10) {
        $("#group_tags").addClass("has-error");
    } else {
        $("#group_tags").removeClass("has-error");
    }
});
//
var tagsList = {};
$('#item_tags_input').keypress(function(e) {
    var key = e.which;
    if (key == 32) {
        return false;
    } else if (key == 13) {
        var ti = 0;
        $.each(tagsList, function() {
            ti++;
        });
        if (ti > 4) {
            $("#group_tags").addClass("has-error");
            return;
        } else {
            $("#group_tags").removeClass("has-error");
            if ($(this).val().length > 10) {
                return;
            } else {
                //
                var tags = $(this).val();
                if (tags === "") {
                    return;
                }
                //
                var tagID = "";
                var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                for (var i = 0; i < 5; i++) {
                    tagID += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                tagsList[tagID] = tags;
                //
                $("#tagsList").append('<span class="item_tag_edit">' + tags + ' <button type="button" class="close tagClose" aria-hidden="true" data-tagid="' + tagID + '">&times;</button> </span>');
                $(this).val("");
                //
            }
        }
    }
});
//
var item_loc_val = "room";
$('input:radio[name="item_loc"]').change(function() {
    item_loc_val = $(this).val();
    if (item_loc_val == "has") {
        $("#item_loc").fadeOut();
    } else {
        $("#item_loc").fadeIn();
    }
});
//
$("#tagsList").on("click", "button.tagClose", function() {
    var tagid = $(this).data("tagid");
    delete tagsList[tagid];
    $(this).parent().remove();
    console.log(tagsList);
});
//
$("#main").on("click", "span.infoBtn", function() {
    $("#info_picture").attr("src", "assets/media/item_full_1080p.png");
    $("#info_tags").empty();
    var itemid = $(this).data("itemid");
    $(".editBtn").data("itemid", itemid);
    $("#info_title").text(mainData[itemid].title);
    $("#info_desc").text(mainData[itemid].desc);
    $("#info_author").text(mainData[itemid].author_name);
    $("#info_email").text(mainData[itemid].author_email);
    $("#info_email").attr("href", "mailto:" + mainData[itemid].author_email);
    $("#info_timestamp").text(mainData[itemid].date_full);
    $("#info_tags").append('<span class="item_tag ' + mainData[itemid].status.toLowerCase() + '">' + mainData[itemid].status + '</span> ');





    if (mainData[itemid].tags) {
        for (var i = 0; i < mainData[itemid].tags.length; i++) {
            $("#info_tags").append('<span class="item_tag">' + mainData[itemid].tags[i] + '</span> ');
        }
    }


    $("#info_loc").text(mainData[itemid].loc);
    if (!mainData[itemid].picture || mainData[itemid].picture == false) {
        $("#info_picture").hide();
        $("#info_picture").attr("src", "assets/media/item_thumb_default.png)");
    } else {
        $("#info_picture").attr("src", mainData[itemid].picture);
        $("#info_picture").show();
    }
    $('#infoModal').modal('show');
});
$("#infoModal").on("click", ".editBtn", function() {
    var itemid = $(this).data("itemid");
    $("#deleteWarning").data("itemid", itemid);
    //
    $("#tagsList").empty();
    tagsList = {};
    //
    $("#item_title_editing").text(mainData[itemid].title);
    $("#item_title").val(mainData[itemid].title);
    $("#item_desc").val(mainData[itemid].desc);
    $("#item_author").val(mainData[itemid].author_name);
    $("#item_email").val(mainData[itemid].author_email);
    $("#item_timestamp").val(mainData[itemid].date_full);
    //
    if (mainData[itemid].status.toLowerCase() == "claimed") {
        $("#item_status").prop('checked', true);
    } else {
        $("#item_status").prop('checked', false);
    }
    //
    imgdata = mainData[itemid].picture;
    if (!imgdata || imgdata == false) {
        $("#item_img_preview").attr("src", "assets/media/item_thumb_default.png)");
    } else {
        $("#item_img_preview").attr("src", mainData[itemid].picture);
    }
    //

    if (mainData[itemid].tags) {
        for (var j = 0; j < mainData[itemid].tags.length; j++) {
            var tagID = "";
            var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (var i = 0; i < 5; i++) {
                tagID += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            tagsList[tagID] = mainData[itemid].tags[j];
            //
            $("#tagsList").append('<span class="item_tag_edit">' + mainData[itemid].tags[j] + ' <button type="button" class="close tagClose" aria-hidden="true" data-tagid="' + tagID + '">&times;</button> </span>');
        }
    }


    //
    console.log(mainData[itemid].loc);
    if (mainData[itemid].loc == (uname + " has it")) {
        $("#item_loc").val("");
        $("input:radio[value=has]").prop('checked', true);
        $("#item_loc").fadeOut();
    } else {
        $("#item_loc").val(mainData[itemid].loc);
        $("input:radio[value=room]").prop('checked', true);
        $("#item_loc").fadeIn();
    }
    //
    $('#infoModal').modal('toggle');
    setTimeout(function() {
        $('#editModal').modal('toggle');
    }, 500);
});
$("#editSubmit").click(function() {
    $("#emptyWarning").text("");
    var itemid = $(".editBtn").data("itemid");
    //
    var item_title = $("#item_title").val();
    if (item_title.length > 30) {
        item_title = item_title.substring(0, 30);
    }
    var item_desc = $("#item_desc").val();
    if (item_desc.length > 420) {
        item_desc = item_desc.substring(0, 420);
    }
    var item_tags = [];
    $.each(tagsList, function(key, value) {
        var tagval = value;
        if (tagval.length > 10) {
            tagval = tagval.substring(0, 10);
        }
        item_tags.push(tagval);
    });
    var item_loc = "";
    if ($('#item_loc_room').is(':checked')) {
        item_loc = $("#item_loc").val();
        if (item_loc.length > 20) {
            item_loc = item_loc.substring(0, 20);
        }
    } else {
        item_loc = uname + " has it";
    }
    var item_timestamp = new Date().getTime();
    var item_author = uid;
    //
    var item_status = "Unclaimed";
    if ($("#item_status").is(':checked')) {
        item_status = "Claimed";
    } else {
        item_status = "Unclaimed";
    }
    //
    var invalid = false;
    if (item_title === "") {
        console.log("TITLE FALSE");
        invalid = true;
    }
    if (item_desc === "") {
        console.log("DESC FALSE");
        invalid = true;
    }
    if (item_loc === "") {
        console.log("LOC FALSE");
        invalid = true;
    }
    console.log("LOC " + item_loc);
    //
    if (invalid) {
        $("#emptyWarning").text("Some of your fields are empty!");
        $("#editModal").animate({
            scrollTop: 0
        }, 300);
    } else {
        var postUploadData = {};
        postUploadData["userposts/" + uid + "/" + itemid] = {
            "item_title": item_title,
            "item_desc": item_desc,
            "item_tags": item_tags,
            "item_author": item_author,
            "item_timestamp": item_timestamp,
            "item_status": item_status,
            "item_loc": item_loc,
            "item_picture": imgdata
        };
        postUploadData["posts/" + itemid] = {
            "item_title": item_title,
            "item_desc": item_desc,
            "item_tags": item_tags,
            "item_author": item_author,
            "item_timestamp": item_timestamp,
            "item_status": item_status,
            "item_loc": item_loc,
            "item_picture": imgdata
        };
        // Do a deep-path update
        firebase.database().ref("/").update(postUploadData, function(error) {
            if (error) {
                console.log("Error uploading data:", error);
            }
        });
        $('#editModal').modal('hide');
    }
});
//
$("#deleteWarning").click(function() {
    var itemid = $(this).data("itemid");
    $("#delete_title").text(mainData[itemid].title);
    $("#deleteSubmit").data("itemid", itemid);
    $('#editModal').modal('toggle');
    setTimeout(function() {
        $('#deleteModal').modal('toggle');
    }, 500);
});
//
$("#deleteSubmit").click(function() {
    var itemid = $(this).data("itemid");
    var postUploadData = {};
    postUploadData["userposts/" + uid + "/" + itemid] = null;
    postUploadData["posts/" + itemid] = null;
    // Do a deep-path update
    firebase.database().ref("/").update(postUploadData, function(error) {
        if (error) {
            console.log("Error deleting data:", error);
        }
    });
    $('#deleteModal').modal('hide');
});
