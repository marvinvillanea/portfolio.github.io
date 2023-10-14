/* 
 * Developer: Marvin Villanea
 * All Rigth Reserved 2023 
 */

var main = {
    alertMessage: function (icon, title, text ) {
        swal({
            title: title,
            text: text,
            icon: icon,
        });
    },
    sendEmail: function(data) {
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            beforeSend: function() {
                $('#send-msg').html(`<div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`);
            }
            }).done(function() {
                $('#send-msg').html('Send Message<i class="bi bi-send"></i>');
                main.alertMessage('success','Message has been sent successfully.', 'Thank you for your support.');
                $('.form-control').val('');
            }).fail(function(error) {
                $('#send-msg').html('Send Message<i class="bi bi-send"></i>');
                main.alertMessage('warning', 'Email Not Send', 'Please Check it again Thank you!');
            });
    }
};


$(document).on('click','#send-msg',function(event){
  event.preventDefault();
    var bol = false;
    $(".requireinput").each(function() {
        var value = $(this).val().trim();
        if(value === '') {
            bol = true;
        }
    });
    if(bol) {
        main.alertMessage('warning', 'Missing Input', 'Please Check it again Thank you!');
    } else {
        var data = {
            service_id: 'service_95bwfac',
            template_id: 'template_x0zqeql',
            user_id: '8Ttz01S1ADJOJscX1',
            template_params: {
                to_name: 'marvinvillanea1@gmail.com', // Replace with the recipient's email address
                from_name: $('input[name="email"]').val(),
                message: $('textarea[name="message"]').val()
            }
        };
        main.sendEmail(data);
    }
      
});