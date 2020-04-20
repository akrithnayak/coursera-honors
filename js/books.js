/*Variable wich simulate web server response */
var data_json_text='{"books": {'+
    '"b1":{"img":"phpbook.jpg","title":"PHP for Absolute Beginners", "author":"Jason Lengstorf",'+
    '"edition":"1st", "editorial":"Apress", "year":"2009", "isbn":"1430224738", "copies":"6",'+
    '"keywords":["web", "programming", "php"], "score":3.5},'+
    '"b2":{"img":"physicsbook.jpg","title":"Principles of Physics", "author":"Resnick, Halliday and Jearl Walker",'+
    '"edition":"9th", "editorial":"Wiley", "year":"2004", "isbn":"ES8-0-470-56158-4", "copies":"6",'+
    '"keywords":["science", "physics", "principles"], "score":4.5},'+
    '"b3":{"img":"lordoftheringsbook.jpg","title":"Lord of the Rings", "author":"J.R.R. Tolkien",'+
    '"edition":"One-volume edition", "editorial":"Houghton Mifflin", "year":"2004", "isbn":"0-618-64561-6", "copies":"13",'+
    '"keywords":["fantasy", "epic", "aventure", "bestseller"], "score":5}'+
    '}}';

    var reservation_control_json = {"reservations": []};
    var aux_global;

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
    var avoid_show_modal = false;
    //See more Function
    $('.see-button').on('click', function(){ 
        let aux='<span class="badge badge-pill badge-success mr-3 ">';
        let idbook = new String($(this).attr('idb'));
        aux_global = idbook;
        $('#see-img').attr('src', "./img/"+data_json.books[idbook].img);
        $('#see-title').val(data_json.books[idbook].title);
        $('#see-author').val(data_json.books[idbook].author);
        $('#see-editorial').val(data_json.books[idbook].editorial);
        $('#see-edition').val(data_json.books[idbook].edition);
        $('#see-year').val(data_json.books[idbook].year);
        $('#see-copies').val(data_json.books[idbook].copies);
        $('#see-isbn').val(data_json.books[idbook].isbn);
        for(i=0; i<data_json.books[idbook].keywords.length; i++){
            aux += data_json.books[idbook].keywords[i].toUpperCase() +'</span><span class="badge badge-pill badge-success mx-3">';
        } aux += '</span>';
        $('#see-keywords').html(aux);
        $('#see-score').html(data_json.books[idbook].score);
        $('#reserve-tile').html(data_json.books[idbook].title + ' ('+data_json.books[idbook].edition+')');
    });
    //Reservating Function
    $('#make-reservation').on('click', function(){
        alert("Successful Operation.\nA copy has just been reservated!");
        reservation_control_json.reservations.push(aux_global);
        refresh_reservation_buttons();
    });
    $('.reserve-button').on('click', function(){
        let idbook = new String($(this).attr('idb')), exist=-1;
        aux_global = idbook;
        //Checking existence at reservation_control_json
        for(i=0; i< reservation_control_json.reservations.length; i++){
            exist = (idbook.localeCompare(reservation_control_json.reservations[i])); 
            if (exist == 0) break;
        }
        //Results
        if(exist == 0){//Undo Reservation
            if(confirm("Are you sure to undo your reservation?")){
                reservation_control_json.reservations.pop(idbook);
                //This produces newly added classes to be actived and open #reserve-modal modal
                $(".reserve-button").filter("[idb='"+idbook+"']")
                    .addClass('btn-primary ')
                    .removeClass('btn-secondary')
                    .attr('data-toggle','modal')
                    .attr('data-target','#reserve-modal')
                    .html('<span class="fas fa-book-open"></span> RESERVE COPY');
                //avoid_show_modal = true; //Avoiding the above
            }
        }else{//Do Reservation
           $('#reserve-tile').html(data_json.books[idbook].title + ' ('+data_json.books[idbook].edition+')'); 
        }
    });
    /*$('#reserve-modal').on('show.bs.modal', function(e){
        if(avoid_show_modal){
            console.log('Debo cerrarme!');
            $('#cancel-reservation').click();
            avoid_show_modal = false;
        } 
    });*/

    //Deleting Function
    $('.delete-button').on('click', function(){
        let idbook = new String($(this).attr('idb'));
        $('#delete-title').html(data_json.books[idbook].title + ' ('+data_json.books[idbook].edition+')');
    });
    $('#deleting').on('click', function(){
        alert('Successful Operation.\nThe book has just been "delete"!');
    });
    //Editing Function
    $('.edit-button').on('click', function(){ 
        let aux='<span class="badge badge-pill badge-success mr-3 ">';
        let idbook = new String($(this).attr('idb'));
        aux_global = idbook;
        $('#edit-img').attr('src', "./img/"+data_json.books[idbook].img);
        $('#edit-title').val(data_json.books[idbook].title);
        $('#edit-author').val(data_json.books[idbook].author);
        $('#edit-editorial').val(data_json.books[idbook].editorial);
        $('#edit-edition').val(data_json.books[idbook].edition);
        $('#edit-year').val(data_json.books[idbook].year);
        $('#edit-copies').val(data_json.books[idbook].copies);
        $('#edit-isbn').val(data_json.books[idbook].isbn);
        for(i=0; i<data_json.books[idbook].keywords.length; i++){
            aux += data_json.books[idbook].keywords[i].toUpperCase() +'</span><span class="badge badge-pill badge-success mx-3">';
        } aux += '</span>';
        $('#edit-keywords').html(aux);
        $('#edit-score').html(data_json.books[idbook].score);
    });
    $('#make-edit').on('click', function(){
        if(confirm("Are you sure to edit this book's info?")){
            data_json.books[aux_global].title = $('#edit-title').val();
            data_json.books[aux_global].author = $('#edit-author').val();
            data_json.books[aux_global].editorial = $('#edit-editorial').val();
            data_json.books[aux_global].edition = $('#edit-edition').val();
            data_json.books[aux_global].year = $('#edit-year').val();
            data_json.books[aux_global].copies = $('#edit-copies').val();
            data_json.books[aux_global].isbn = $('#edit-isbn').val();
            reset_content(); //Rendering books catalog 
        }
    });
    //Support Function
    function refresh_reservation_buttons(){
        let item;
        item = reservation_control_json.reservations[reservation_control_json.reservations.length-1];

        $(".reserve-button").filter("[idb='"+item+"']")
        .removeClass('btn-primary ')
        .addClass('btn-secondary')
        .attr('data-toggle','')
        .attr('data-target','')
        .html('<span class="fas fa-undo"></span> UNDO RESERVATION');
    }
    function reset_content(){
        if(aux_global.localeCompare('b1') == 0){//Add 'NEW' badge
            $('#'+aux_global+'-title').html(
                '<strong>'+data_json.books[aux_global].title+'</strong><span class="badge badge-success mx-3">NEW!</span>'
            );
        }else{
            $('#'+aux_global+'-title').html('<strong>'+data_json.books[aux_global].title+'</strong>');
        }
        $('#'+aux_global+'-author').html(data_json.books[aux_global].author);
        $('#'+aux_global+'-edition').html(data_json.books[aux_global].edition);
        $('#'+aux_global+'-copies').html(data_json.books[aux_global].copies);
    }

});