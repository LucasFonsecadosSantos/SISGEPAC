<?php
    
    header('Content-Type: application/json; charset=utf-8');
    
    $response = array();
    
    try {
    
        // Undefined | Multiple Files | $_FILES Corruption Attack
        // If this request falls under any of them, treat it invalid.
        if (!isset($_FILES['upavatar']['error']) || is_array($_FILES['upavatar']['error'])) {

            throw new RuntimeException('Invalid parameters.');

        }

        // Check $_FILES['upavatar']['error'] value.
        switch ($_FILES['upavatar']['error']) {

            case UPLOAD_ERR_OK:
                break;

            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('No file sent.');

            case UPLOAD_ERR_INI_SIZE:
            
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('Exceeded filesize limit.');
            
            default:
                throw new RuntimeException('Unknown errors.');

        }

        // You should also check filesize here. 
        if ($_FILES['upavatar']['size'] > 1000000) {

            throw new RuntimeException('Exceeded filesize limit.');

        }

        // DO NOT TRUST $_FILES['upavatar']['mime'] VALUE !!
        // Check MIME Type by yourself.
        $finfo = new finfo(FILEINFO_MIME_TYPE);

        if (false === $ext = array_search(
        
                $finfo->file($_FILES['upavatar']['tmp_name']),
                array(
                'jpg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',

            ),true)) {

                throw new RuntimeException('Invalid file format.');

        }

        // You should name it uniquely.
        // DO NOT USE $_FILES['upavatar']['name'] WITHOUT ANY VALIDATION !!
        // On this example, obtain safe unique name from its binary data.

        $fileName = sha1_file($_FILES['upavatar']['tmp_name']);

        if (!move_uploaded_file(
            
                $_FILES['upavatar']['tmp_name'],
                sprintf('./../../../remote/data/uploads/%s.%s', $fileName, $ext)
                
            )

        ) {
            
            throw new RuntimeException('Failed to move uploaded file.');
        
        }

        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "File uploaded successfully",
            "data_name" => $fileName . '.' . $ext
        );

        echo json_encode($response);

    } catch (RuntimeException $e) {
    
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => $e->getMessage()
        );
    
        echo json_encode($response);
    
    }