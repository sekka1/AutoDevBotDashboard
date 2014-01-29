<?php

// variables to be modified

$to = "your@email.com";                     // email to which messages from contact form will be delivered
$subject = "Message from contact form";     // email subject

// form variables

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // if you are going to add or remove some fields, just add them or remove them from definitions below
    $name = check_input($_POST['name']);
    $email = check_input($_POST['email']);
    $message = check_input($_POST['message']);
    $human = check_input($_POST['human']);

    // simple spam prevention - human field must be empty (it's hidden for users) - but robots will fill this field
    if (empty($human)) {
        $headers = "From: " . $to . "\r\n";
        $headers .= "Reply-To: ". $email . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        $body = "<html><body>";
        $body .= "<h1>" . $subject . "</h1>";
        $body .= "<p><strong>Name: </strong>" . $name . "</p>";
        $body .= "<p><strong>E-mail: </strong>" . $email . "</p>";
        $body .= "<p>" . strip_tags($message) . "</p>";
        $body .= "</body></html>";

        // if you are going to add or remove some field, just add them or remove them from condition below
        if (!empty($to) && !empty($subject) && !empty($name) && !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($message)) {
            mail($to, $subject, $body, $headers);
            echo("success");
        }
    } else {
        echo("success");
    }
}

function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    $data = strip_tags($data);
    return $data;
}

?>
