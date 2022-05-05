(function($){

    jQuery(document).ready(function() {

        var requestConfig = {
            method: 'GET',
            url: '/mainpage/gettagsfordropdown',
            contentType: 'application/json'
        };

        jQuery.ajax(requestConfig).then(function(responseMessage){
            console.log(responseMessage.tags);
            for (x of responseMessage.tags){
                let dropdown = jQuery('#coursetag');
                dropdown.append(jQuery('<option>').attr("value",x).html(x))
            }
        })
    });

})(jQuery);