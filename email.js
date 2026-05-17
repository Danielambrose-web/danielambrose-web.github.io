 function sendEmail (){
    let params={
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    }

    emailjs.send("service_4jm1p6r","template_c08474w",params).then(function (res){
        alert("Your message was sent successfully! I will get back to you as soon as possible.");
    }).catch(function (err){
        alert("There was an error sending your message. Please try again later.");
    });
 }