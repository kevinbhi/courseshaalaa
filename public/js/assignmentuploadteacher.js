(function($){
    function bindEventsforUpdate(update_Id,assignment){
        console.log("enterd")
        jQuery(`#${update_Id}`).on('click',function(){
            debugger;
            document.getElementById('assignment_name').value = assignment.assignment_name;
            document.getElementById('assignmentdescription').value = assignment.assignmentdescription;
            document.getElementById('startdate').value = assignment.startdate;
            document.getElementById('enddate').value = assignment.enddate;
            document.getElementById('coursename').value = assignment.coursename;
            document.getElementById('sequencenumber').value = assignment.sequencenumber;
        })
    };

    function bindEventsforDelete(deleteId,coursename){

        jQuery(`#${deleteId}`).on('click',function(event){
            event.preventDefault();
            console.log(deleteId);
            console.log(coursename);
            document.getElementById('assignments').innerHTML = "";
            console.log(document.getElementById('assignments'))
            var requestConfig = {
                method: 'POST',
                url: '/mainpage/deleteassignment',
                contentType: 'application/json',
                data: JSON.stringify({"deleteId": deleteId, "coursename":coursename})
            };

            jQuery.ajax(requestConfig).then(function(responseMessage){
                // console.log(responseMessage);
                var coursename = document.getElementById('coursename').value;
                var requestConfig = {
                    method: 'GET',
                    url: '/mainpage/uploadedassignments/'+ coursename,
                    contentType: 'application/json',
                };
                jQuery.ajax(requestConfig).then(function (responseMessage){
                    // responseMessage = JSON.parse(responseMessage)
                    debugger;
                    console.log(document.getElementById('assignments'));
                    
                    for(let assignment of responseMessage[0].assignments){
                        var assignmentsblock = jQuery('#assignments')
                        debugger;
        
                        assignmentsblock.append(
                            jQuery('<div>').attr('class','row bg-light').append(
                                jQuery('<span>').attr('style',"display:flex;").append(
                                    `<div class='col-6 d-flex'>
                                    <div class = "fw-bold">Assignment ${assignment.sequencenumber} </div>
                                    <div class = "fw-bold ps-5 fw-light">${assignment.assignment_name} </div>
                                    </div>
                                    <div class='col-6 d-flex d-flex justify-content-end'>
                                    <div class="p-2"><button class="btn btn-primary  d-flex justify-content-end" id="del_${assignment.sequencenumber}"> Delete </button></div>
                                    <div class="p-2"><button class="btn btn-danger  d-flex justify-content-end" id="up_${assignment.sequencenumber}"> Update </button></div>
                                    </div>`
                                )
                            )    
                        )
                        debugger
                        bindEventsforDelete(`del_${assignment.sequencenumber}`,coursename)
                        bindEventsforUpdate(`up_${assignment.sequencenumber}`,assignment)
                    }
                });
            });
        })
    };

    jQuery(document).ready(function(){
        var form = jQuery('#assignment');

        var coursename = document.getElementById('coursename').value;
        
        var requestConfig = {
            method: 'GET',
            url: '/mainpage/uploadedassignments/'+ coursename,
            contentType: 'application/json',
        };

        jQuery.ajax(requestConfig).then(function (responseMessage){
            // responseMessage = JSON.parse(responseMessage)
            console.log(responseMessage)
            for(let assignment of responseMessage[0].assignments){
                var assignmentsblock = jQuery('#assignments')
                debugger;

                assignmentsblock.append(
                    jQuery('<div>').attr('class','row bg-light').append(
                        jQuery('<span>').attr('style',"display:flex;").append(
                            `<div class='col-6 d-flex'>
                            <div class = "fw-bold">Assignment ${assignment.sequencenumber} </div>
                            <div class = "fw-bold ps-5 fw-light">${assignment.assignment_name} </div>
                            </div>
                            <div class='col-6 d-flex d-flex justify-content-end'>
                            <div class="p-2"><button class="btn btn-primary  d-flex justify-content-end" id="del_${assignment.sequencenumber}"> Delete </button></div>
                            <div class="p-2"><button class="btn btn-danger  d-flex justify-content-end" id="up_${assignment.sequencenumber}"> Update </button></div>
                            </div>`
                        )
                    )    
                )
                bindEventsforDelete(`del_${assignment.sequencenumber}`,coursename)
                bindEventsforUpdate(`up_${assignment.sequencenumber}`,assignment)
            }
        });

        jQuery('#updatefinal').on('click', function(event){
            event.preventDefault();

            assignment = {}

            assignment.assignment_name = document.getElementById('assignment_name').value;
            assignment.assignmentdescription = document.getElementById('assignmentdescription').value;
            assignment.startdate = document.getElementById('startdate').value;
            assignment.enddate = document.getElementById('enddate').value;
            assignment.coursename = document.getElementById('coursename').value;
            assignment.sequencenumber = document.getElementById('sequencenumber').value;

            debugger;

            var requestConfig = {
                method: 'POST',
                url: '/mainpage/updateassignment',
                contentType: 'application/json',
                data: JSON.stringify(assignment)
            };

            jQuery.ajax(requestConfig).then(function(responseMessage){
                // console.log(responseMessage)
                // if(responseMessage.status){
                    var coursename = document.getElementById('coursename').value;
                    document.getElementById('assignments').innerHTML = "";
                    
                    var requestConfig = {
                        method: 'GET',
                        url: '/mainpage/uploadedassignments/'+ coursename,
                        contentType: 'application/json',
                    };
                    
                    jQuery.ajax(requestConfig).then(function (responseMessage){
                        // responseMessage = JSON.parse(responseMessage)
                        console.log(responseMessage)
                        for(let assignment of responseMessage[0].assignments){
                            var assignmentsblock = jQuery('#assignments')
                            debugger;
            
                            assignmentsblock.append(
                                jQuery('<div>').attr('class','row bg-light').append(
                                    jQuery('<span>').attr('style',"display:flex;").append(
                                        `<div class='col-6 d-flex'>
                                        <div class = "fw-bold">Assignment ${assignment.sequencenumber} </div>
                                        <div class = "fw-bold ps-5 fw-light">${assignment.assignment_name} </div>
                                        </div>
                                        <div class='col-6 d-flex d-flex justify-content-end'>
                                        <div class="p-2"><button class="btn btn-primary  d-flex justify-content-end" id="del_${assignment.sequencenumber}"> Delete </button></div>
                                        <div class="p-2"><button class="btn btn-danger  d-flex justify-content-end" id="up_${assignment.sequencenumber}"> Update </button></div>
                                        </div>`
                                    )
                                )    
                            )
                            bindEventsforDelete(`del_${assignment.sequencenumber}`,coursename)
                            bindEventsforUpdate(`up_${assignment.sequencenumber}`,assignment)
                        }
                    });
                // }
            });

        })

        jQuery('#create').on('click', function(event){
            event.preventDefault();
            debugger;

            assignment = {}
            assignment.assignment_name = document.getElementById('assignment_name').value;
            assignment.assignmentdescription = document.getElementById('assignmentdescription').value;
            assignment.startdate = document.getElementById('startdate').value;
            assignment.enddate = document.getElementById('enddate').value;
            assignment.coursename = document.getElementById('coursename').value;
            console.log(assignment.assignment_name)

            var requestConfig = {
                method: 'POST',
                url: '/mainpage/addassignment',
                contentType: 'application/json',
                data: JSON.stringify(assignment)
            };


            jQuery.ajax(requestConfig).then(function (responseMessage){
                console.log(responseMessage);
                // responseMessage = JSON.parse(responseMessage)
                assignment = responseMessage.assignment;
                var assignmentsblock = jQuery('#assignments')
                debugger;

                assignmentsblock.append(
                    jQuery('<div>').attr('class','row bg-light').append(
                        jQuery('<span>').attr('style',"display:flex;").append(
                            `<div class='col-6 d-flex'>
                            <div class = "fw-bold">Assignment ${assignment.sequencenumber} </div>
                            <div class = "fw-bold ps-5 fw-light">${assignment.assignment_name} </div>
                            </div>
                            <div class='col-6 d-flex d-flex justify-content-end'>
                            <div class="p-2"><button class="btn btn-primary  d-flex justify-content-end" id="del_${assignment.sequencenumber}"> Delete </button></div>
                            <div class="p-2"><button class="btn btn-danger  d-flex justify-content-end" id="up_${assignment.sequencenumber}"> Update </button></div>
                            </div>`
                        )
                    )    
                )

                bindEventsforDelete(`del_${assignment.sequencenumber}`,coursename)
                bindEventsforUpdate(`up_${assignment.sequencenumber}`,assignment)
                //}
            });
        });
    });
})(jQuery);