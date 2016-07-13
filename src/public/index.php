<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'config.php';

$app = new \Slim\App(["settings" => $config]);
$app->get('/', function (Request $request, Response $response) {
    $db = connect_db();
    $result = $db->query( 'SELECT id FROM users' );
    $response->getBody()->write("Hello");
    return $response;
});

$app->run();
