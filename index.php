<?php
use Siler\Http\Response;
use Siler\Route;
use Siler\Twig;


require 'vendor/autoload.php';

Twig\init(getcwd().'/templates');


Route\get('/', function (){
    header('Location: index.php/dash');
    exit();
});

Route\get('/index.php', function (){
    header('Location: index.php/dash');
    exit();
});

Route\get('/index.php/dash', function (){
    Response\html(Twig\render('dash.html'));
});

Route\get('/index.php/doku', function (){
    Response\html(Twig\render('doku.html'));
});
