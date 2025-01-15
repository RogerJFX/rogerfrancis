const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const greResponse = grecaptcha.getResponse();
    if (!greResponse) {
        alert('Please complete the reCAPTCHA challenge to submit the form.');
    } else {
        sendMsgData(greResponse);
    }
});
function sendMsgData(greResponse) {
    const xhr = new XMLHttpRequest();
    xhr.onload = _ => {
        if(xhr.status % 200 < 2) {
            if (xhr.responseText === 'success') {
                document.getElementById('formContainer').innerHTML = 'Thank you.'
            } else {
                alert('failed');
            }
        } else {
            alert('failed');
        }
    }
    const data = {
        greResponse: greResponse,
        name: document.getElementById('yName').value,
        mail: document.getElementById('yMail').value,
        msg: document.getElementById('yMsg').value,
    }
    console.log(JSON.stringify(data));
    xhr.open('POST', 'store_msg.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(`data=${JSON.stringify(data)}`);
}