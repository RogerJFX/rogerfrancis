<?php

$dataString = $_POST['data'];
$data = json_decode($dataString);

$ip = $_SERVER['REMOTE_ADDR'];
$line = date('H:i:s') . "\t" . $ip . "\t" . $data->action . "\t" . $data->path . "\t" . $data->ua;

$fileName = getcwd() . '/logs/' . date('Y-m-d') . '.log';
$fileSize = filesize($fileName);

// Satisfied or hacking issue...
if($fileSize && $fileSize > 10000000) {
    exit(0);
}

$fp = fopen($fileName, 'a');
fwrite($fp, $line . "\n");
fclose($fp);

?>