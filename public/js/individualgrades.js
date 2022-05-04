(function($){

    
    
    jQuery(document).ready(function() {
        jQuery('#example').DataTable();

        jQuery('.buttonclick').on('click',function(){
            let id = this.id;
            let studentusername = id.split("_");
            studentusername = studentusername[1];
            let grade = document.getElementById('grade_'+studentusername).value;
            let assignment_id = document.getElementById('ass_'+studentusername).value;
            let data = {}
            data.studentusername = studentusername;
            data.grade = grade;
            data.assignment_id = assignment_id;
            var requestConfig = {
                method: 'POST',
                url: '/grades/updategrades',
                contentType: 'application/json',
                data: JSON.stringify(data)
            };

            jQuery.ajax(requestConfig).then(function(responseMessage){

            })

            console.log(id);
            debugger;
        })


        // var requestConfig = {
        //     method: 'GET',
        //     url: '/grades/getassignments',
        //     contentType: 'application/json'
        // };

        // jQuery.ajax(requestConfig).then(function(responseMessage){

        // })
    });

})(jQuery);