<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'config.php';

$app = new \Slim\App(["settings" => $config]);
$app->get('/', function (Request $request, Response $response) {

    $output = '{';

    $requestAction = $request->getQueryParams()['action'];

    if ($requestAction === 'login') {

        $output .= '"action":"login",';

        $requestUsername = $request->getQueryParams()['username'] ;
        $requestPassword = $request->getQueryParams()['password'];

        $db = connect_db();

        $dbData = $db->query( 'SELECT * FROM users');

        if ( $dbData->num_rows > 0) {
            // output data of each row
            $exists = false;

            while($row = $dbData->fetch_assoc()) {

                if ($row['username'] === $requestUsername && $row['password_hash'] === $requestPassword) {
                    $exists = true;
                    $output .= '"response":"valid",';
                    $output .= '"userinfo":{"username":"'.$row['username'].'","profile_picture":"'.$row['profile_img'].'"},';
                }
            }

            if (!$exists) {
                $output .= '"response":"invalid",';
            }
        }
    }
    if ($requestAction === 'templatePart'){
        // output html from template part
    }
    if ($requestAction === 'register'){
        // Add user info into database
    }
    if ($requestAction === 'getMap'){
        // Query database and retrieve all posts within range. output correct options for map
    }
    if ($requestAction === 'createPost') {
        // add new post with geoid to database
    }

    $output = rtrim($output, ',');
    $output .= "}";
    $response->getBody()->write($output);
    return $response;
});

$app->run();
