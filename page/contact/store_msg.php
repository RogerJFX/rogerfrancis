<?
include 'secret.php';

$dataString = $_POST['data'];
$data = json_decode($dataString);

$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$data->greResponse}");
$captcha_success = json_decode($verify);

if ($captcha_success->success) {
    $fp = fopen('data/msg_' . $data->mail . '_' . time() . '.txt', 'w');
    fwrite($fp, date('d.m.Y H:i:s') . "\n");
    fwrite($fp, $data->name . "\n");
    fwrite($fp, $data->mail . "\n");
    fwrite($fp, $data->msg . "\n");
    fclose($fp);
    echo ('success');
} else {
    echo ('fail');
}
?>