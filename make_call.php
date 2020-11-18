<?php
require __DIR__ . '/vendor/autoload.php';
use Twilio\Rest\Client;

// Your Account SID and Auth Token from twilio.com/console
$account_sid = 'ACcb0133519d15922f5ef8d0ade75c2d2c';
$auth_token = '7986269aa07623a6a17bd9a1fd2c00bb';
// In production, these should be environment variables. E.g.:
// $auth_token = $_ENV["TWILIO_ACCOUNT_SID"]

// A Twilio number you own with Voice capabilities
$twilio_number = "+18134919939";

// Where to make a voice call (your cell phone?)
$to_number = "+639565776616";

    $client = new Client($account_sid, $auth_token);
    $client->account->calls->create(  
    $to_number,
    $twilio_number,
    array(
        "url" => "http://demo.twilio.com/docs/voice.xml"
    )
);
