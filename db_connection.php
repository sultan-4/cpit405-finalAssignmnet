<?php
require_once("vendor/autoload.php");

$Dotenv=\Dotenv\Dotenv::createImmutable(paths:__DIR__)->load();



$dsn = sprintf("pgsql:host=%s;port=%d;dbname=%s",
                $_ENV['host'],
                $_ENV['port'],
                $_ENV['database'],
                );

try{
    $conn = new PDO($dsn, $_ENV["username"], $_ENV["password"], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    // throw exception upon errors
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo('good');
}
catch (PDOException $e) {
	die('Could not connect: ' . $e->getMessage());
}
