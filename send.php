<?php
require 'assets/PHPMailer/PHPMailer.php';
require 'assets/PHPMailer/SMTP.php';
$phone = $_POST['phone'];
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;                      
    $mail->isSMTP();                                          
    $mail->Host       = 'smtp.yandex.ru';                    
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'otpravitelpisem2021@yandex.ru';                  
    $mail->Password   = 'poyiekzchaulqohz';                               
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            
    $mail->Port       = 465;                                    
    $mail->CharSet = "UTF-8";

    //Recipients
    $mail->setFrom('otpravitelpisem2021@yandex.ru', 'PTS');
    $mail->addAddress('asadbekqulboyev1207@gmail.com', 'Asadbek');     

    //Content
    $mail->isHTML(true);                                   
    $mail->Subject = 'Phone';
    $mail->Body    = "Phone: $phone ";

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0;URL=index.html" />   
    <title>Document</title>
</head>
<body>
    
</body>
</html>