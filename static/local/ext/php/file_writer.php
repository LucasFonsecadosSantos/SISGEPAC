<?php

if (function_exists('get_magic_quotes_gpc') && get_magic_quotes_gpc()) {

    function strip_slashes($input) {

        return (!is_array($input)) ? stripslashes($input) : array_map('strip_slashes', $input);
        
    }

    $_GET       = strip_slashes($_GET);
    $_POST      = strip_slashes($_POST);
    $_COOKIE    = strip_slashes($_COOKIE);
    $_REQUEST   = strip_slashes($_REQUEST);

}

function customError($errno, $errstr) {

    echo "<b>Error:</b> [$errno] $errstr<br>";
    echo "Ending Script";
    die("Ending Script");

}

set_error_handler("customError");

$myData     = $_GET["data"];
$file       = $_GET["file"];
$fileHandle = fopen($file, "w");

fwrite($fileHandle, $myData);

fclose($fileHandle);

?>