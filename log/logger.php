<?php

$dataString = $_POST['data'];
$data = json_decode($dataString);

$ip = $_SERVER['REMOTE_ADDR'];
$line = date('H:i:s') . "\t" . $ip . "\t" . $data->path . "\t" . $data->ua;

$fp = fopen(getcwd() . '/logs/' . date('Y-m-d') . '.log', 'a');
fwrite($fp, $line . "\n");
fclose($fp);
?>