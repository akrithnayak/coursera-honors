/*Variable wich simulate web server response */
var data_json_text='{"events": {'+
    '"e1":{"img":"contest.jpg","name":"Reading Contest for a Laptop!", "organizer":"Central Library",'+
    '"startdate":"15/03/2020", "endingdate":"01/12/2020", "score":"3.5", "place":"Central Library", "description":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus eum vitae itaque eligendi unde sed recusandae laboriosam accusantium, enim necessitatibus ipsum voluptate quibusdam provident. Laborum quis quae ea libero sapiente veniam perspiciatis neque repellat ipsa."},'+ 
    '"e2":{"img":"reading-club.jpg","name":"Reading Club\'s 14th Meeting", "organizer":"Central Library",'+
    '"startdate":"01/03/2020", "endingdate":"01/03/2020", "score":"4.5", "place":"Central Library","description":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus eum vitae itaque eligendi unde sed recusandae laboriosam accusantium, enim necessitatibus ipsum voluptate quibusdam provident. Laborum quis quae ea libero sapiente veniam perspiciatis neque repellat ipsa."},'+ 
    '"e3":{"img":"films.jpg","name":"Cinema Day!", "organizer":"Central Library",'+
    '"startdate":"04/03/2020", "endingdate":"04/03/2020", "score":"5.0", "place":"Central Library","description":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus eum vitae itaque eligendi unde sed recusandae laboriosam accusantium, enim necessitatibus ipsum voluptate quibusdam provident. Laborum quis quae ea libero sapiente veniam perspiciatis neque repellat ipsa."}}}';

$(document).ready(function(){
    $('.nav-alert-custom')
    .mouseover(function(){
        $(this).find('span').addClass('alert-primary');
    })
    .mouseout(function(){
        $(this).find('span').removeClass('alert-primary')
    });
    //Buttons events
    var data_json = JSON.parse(data_json_text);
    var aux_global;
    //See more Function
    $('.see-button').on('click', function(){ 
        let idevent = new String($(this).attr('idb'));
        $('#see-img').attr('src', "./img/"+data_json.events[idevent].img);
        $('#see-name').val(data_json.events[idevent].name);
        $('#see-organizer').val(data_json.events[idevent].organizer);
        $('#see-start-date').val(data_json.events[idevent].startdate);
        $('#see-ending-date').val(data_json.events[idevent].endingdate);
        $('#see-score').html(data_json.events[idevent].score);
        $('#see-place').val(data_json.events[idevent].place);
        $('#see-description').val(data_json.events[idevent].description);
    });
    //Deleting Function
    $('.delete-button').on('click', function(){
        let idevent = new String($(this).attr('idb'));
        $('#delete-name').html(data_json.events[idevent].name + ' ('+ data_json.events[idevent].startdate +' - '+
        data_json.events[idevent].endingdate +')');
    });
    $('#deleting').on('click', function(){
        alert('Successful Operation.\nThe event has just been "deleted"!');
    });
    //Editing Function
    $('.edit-button').on('click', function(){ 
        let idevent = new String($(this).attr('idb'));
        aux_global = idevent;
        $('#edit-img').attr('src', "./img/"+data_json.events[idevent].img);
        $('#edit-name').val(data_json.events[idevent].name);
        $('#edit-organizer').val(data_json.events[idevent].organizer);
        $('#edit-start-date').val(data_json.events[idevent].startdate);
        $('#edit-ending-date').val(data_json.events[idevent].endingdate);
        $('#edit-score').html(data_json.events[idevent].score);
        $('#edit-place').val(data_json.events[idevent].place);
        $('#edit-description').val(data_json.events[idevent].description);
    });
    $('#make-edit').on('click', function(){
        if(confirm("Are you sure to edit this event's info?")){
            data_json.events[aux_global].name = $('#edit-name').val();
            data_json.events[aux_global].organizer = $('#edit-organizer').val();
            data_json.events[aux_global].startdate = $('#edit-start-date').val();
            data_json.events[aux_global].endingdate = $('#edit-ending-date').val();
            data_json.events[aux_global].score = $('#edit-score').html();
            data_json.events[aux_global].place = $('#edit-place').val();
            data_json.events[aux_global].description = $('#edit-description').val();
            reset_content(); //Rendering books catalog 
        }
    });
    //Support Function
    function reset_content(){
        if(aux_global.localeCompare('e1') == 0){
            $('#'+aux_global+'-name').html(//Add 'NEW' badge
                '<strong>'+data_json.events[aux_global].name+'</strong><span class="badge badge-success mx-3">NEW!</span>'
            );
            //Reseting also clone event
            $('#'+aux_global+'-cl-name').html('<strong>'+data_json.events[aux_global].name+'</strong><span class="badge badge-success mx-3">NEW!</span>');
            $('#'+aux_global+'-cl-organizer').html(data_json.events[aux_global].organizer);
            $('#'+aux_global+'-cl-startdate').html(data_json.events[aux_global].startdate);
            $('#'+aux_global+'-cl-endingdate').html(data_json.events[aux_global].endingdate);
            $('#'+aux_global+'-cl-place').html(data_json.events[aux_global].place);
            //---
        }else{
            $('#'+aux_global+'-name').html('<strong>'+data_json.events[aux_global].name+'</strong>');
        }
        $('#'+aux_global+'-organizer').html(data_json.events[aux_global].organizer);
        $('#'+aux_global+'-startdate').html(data_json.events[aux_global].startdate);
        $('#'+aux_global+'-endingdate').html(data_json.events[aux_global].endingdate);
        $('#'+aux_global+'-place').html(data_json.events[aux_global].place);
    }

});