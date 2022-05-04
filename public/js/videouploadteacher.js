// const { json } = require("express/lib/response");

(function($){

    function bindEvents(deleteId,coursename,path){
        jQuery(`#${deleteId}`).on('click',function(event){
            event.preventDefault();
            console.log(deleteId);
            console.log(coursename);
            var requestConfig = {
                method: 'POST',
                url: '/mainpage/deletevideo',
                contentType: 'application/json',
                data: JSON.stringify({"deleteId": deleteId, "coursename":coursename, "path":path})
            };

            jQuery.ajax(requestConfig).then(function(responseMessage){
                // console.log(responseMessage);
                // var coursename = document.getElementById('coursename').value;
                var requestConfig = {
                    method: 'GET',
                    url: '/mainpage/uploadedvideos/'+ coursename,
                    contentType: 'application/json',
                };
                jQuery.ajax(requestConfig).then(function (responseMessage){
                    responseMessage = JSON.parse(responseMessage)
                    var videosblock = jQuery('#videos')
                    debugger;
                    document.getElementById('videos').innerHTML = "";
                    console.log(responseMessage)
                    for(let x of responseMessage[0].videos){
                        console.log(x);
                        var videosblock = jQuery('#videos')
                        console.log(x.videotitle)
                        videosblock.append(jQuery('<div>').attr("class","container p-2")
                        .append((jQuery('<div>')).attr("class","row")
                        .append(jQuery('<div>').attr("class","col-6")
                        .append(jQuery('<div>').attr('class',"container p-2")
                        .append(jQuery('<video controls>').attr("style","height: -moz-available; width: -moz-available;")
                        .append(jQuery('<source>').attr("src",x.path).attr("type","video/mp4")))))
                        .append(jQuery('<div>').attr("class","col-6")
                        .append(jQuery('<div>').attr("class","container p-2")
                        .append(jQuery('<div>').attr('class',"row p-2").append('<h3>').html(x.videotitle))
                        .append(jQuery('<div>').attr('class',"row p-2").html(x.videodescription))
                        .append(jQuery('<div>').attr('class','row p-2').html(x.sequencenumber))
                        .append(jQuery('<div>').attr('class',"row p-2").append(jQuery('<button>').attr('class','btn btn-danger w-25').attr('id',x.sequencenumber).html("Delete")))
                        ))))
                    
                        console.log(document.getElementById(x.sequencenumber))
                        bindEvents(x.sequencenumber,coursename,x.path);
                    }
                });
            });
        })
    };

    jQuery(document).ready(function(){
        var form = jQuery('#videoinput');

        var coursename = document.getElementById('coursename').value;
        var videosblock = jQuery('#videos');
        var requestConfig = {
            method: 'GET',
            url: '/mainpage/uploadedvideos/'+ coursename,
            contentType: 'application/json',
        };
        jQuery.ajax(requestConfig).then(function (responseMessage){
            responseMessage = JSON.parse(responseMessage)
            console.log(responseMessage)
            for(let x of responseMessage[0].videos){
                var videosblock = jQuery('#videos')
                console.log(x.videotitle)
                videosblock.append(jQuery('<div>').attr("class","container p-2")
                .append((jQuery('<div>')).attr("class","row")
                .append(jQuery('<div>').attr("class","col-6")
                .append(jQuery('<div>').attr('class',"container p-2")
                .append(jQuery('<video controls>').attr("style","height: -moz-available; width: -moz-available;")
                .append(jQuery('<source>').attr("src",x.path).attr("type","video/mp4")))))
                .append(jQuery('<div>').attr("class","col-6")
                .append(jQuery('<div>').attr("class","container p-2")
                .append(jQuery('<div>').attr('class',"row p-2").append('<h3>').html(x.videotitle))
                .append(jQuery('<div>').attr('class',"row p-2").html(x.videodescription))
                .append(jQuery('<div>').attr('class','row p-2').html(x.sequencenumber))
                .append(jQuery('<div>').attr('class',"row p-2").append(jQuery('<button>').attr('class','btn btn-danger w-25').attr('id',x.sequencenumber).html("Delete")))
                ))))

                console.log(document.getElementById(x.sequencenumber))
                bindEvents(x.sequencenumber,coursename,x.path);
            }
        });

        form.submit(function(event){
            event.preventDefault();
            debugger;
            
            var files = document.getElementById('video').files[0];
            var coursename = document.getElementById('coursename').value;
            var videotitle = document.getElementById('videotitle').value;
            var sequencenumber = document.getElementById('sequencenumber').value;
            var description = document.getElementById('videodescription').value;
            formData = new FormData();

            formData.append('video',files);
            formData.append('coursename',coursename);
            formData.append('videotitle',videotitle);
            formData.append('sequencenumber',sequencenumber);
            formData.append('description',description);

            var requestConfig = {
                method: 'POST',
                url: '/mainpage/uploadvideo',
                contentType: 'multipart/form-data',
                data: formData,
                processData: false,
                contentType: false
            };


            jQuery.ajax(requestConfig).then(function (responseMessage){
                // console.log(responseMessage);
                // responseMessage = JSON.parse(responseMessage)
                videoinfo = responseMessage.data
                console.log(videoinfo.videotitle)
                var videosblock = jQuery('#videos')
            
                videosblock.append(jQuery('<div>').attr("class","container p-2")
                .append((jQuery('<div>')).attr("class","row")
                .append(jQuery('<div>').attr("class","col-6")
                .append(jQuery('<div>').attr('class',"container p-2")
                .append(jQuery('<video controls>').attr("style","height: -moz-available; width: -moz-available;")
                .append(jQuery('<source>').attr("src",videoinfo.path).attr("type","video/mp4")))))
                .append(jQuery('<div>').attr("class","col-6")
                .append(jQuery('<div>').attr("class","container p-2")
                .append(jQuery('<div>').attr('class',"row p-2").append('<h3>').html(videoinfo.videotitle))
                .append(jQuery('<div>').attr('class',"row p-2").html(videoinfo.videodescription))
                .append(jQuery('<div>').attr('class','row p-2').html(videoinfo.sequencenumber))
                .append(jQuery('<div>').attr('class',"row p-2").append(jQuery('<button>').attr('class','btn btn-danger w-25').attr('id',videoinfo.sequencenumber).html("Delete")))
                ))))

                bindEvents(videoinfo.sequencenumber,coursename,videoinfo.path);
                //}
            });
        });
    });
})(jQuery);