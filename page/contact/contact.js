const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const greResponse = grecaptcha.getResponse();
    if (!greResponse) {
        document.getElementById('recaptcha').style.border='1px solid red';
    } else {
        sendMsgData(greResponse);
    }
});
function sendMsgData(greResponse) {
    const xhr = new XMLHttpRequest();
    xhr.onload = _ => {
        document.getElementById('formContainer').style.display = 'none';
        if(xhr.status % 200 < 2) {
            if (xhr.responseText === 'success') {
                document.getElementById('serverResponseOk').style.display = 'block';
            } else {
                document.getElementById('serverResponseFailed').style.display = 'block';
            }
        } else {
            document.getElementById('serverResponseFailed').style.display = 'block';
        }
    }
    const data = {
        greResponse: greResponse,
        name: document.getElementById('yName').value,
        mail: document.getElementById('yMail').value,
        msg: document.getElementById('yMsg').value,
    }
    xhr.open('POST', 'store_msg.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`data=${JSON.stringify(data)}`);
}