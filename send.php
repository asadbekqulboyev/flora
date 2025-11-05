<?php
require 'assets/PHPMailer/PHPMailer.php';
require 'assets/PHPMailer/SMTP.php';

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

    if (!empty($_POST['phone'])) {
        
        $phone = htmlspecialchars($_POST['phone']);

        $mail->isHTML(true);
        $mail->Subject = 'Заявка с телефона';
        $mail->Body    = "<b>Телефон:</b> $phone";

    } elseif (!empty($_POST['answer1'])) {
        $questionsHTML = '';

        foreach ($_POST as $key => $value) {
            if (preg_match('/^question(\d+)$/', $key, $match)) {
                $num = $match[1];
                $question = htmlspecialchars($value);
                $answerKey = 'answer' . $num;
                $answer = isset($_POST[$answerKey]) ? htmlspecialchars($_POST[$answerKey]) : '—';
                $questionsHTML .= "
                    <tr>
                        <td style='padding:8px 12px;border:1px solid #ddd;'>$question</td>
                        <td style='padding:8px 12px;border:1px solid #ddd;'>$answer</td>
                    </tr>
                ";
            }
        }

        $mail->isHTML(true);
        $mail->Subject = 'Новая анкета с квиза';
        $mail->Body = "
            <h2>Новая анкета с сайта</h2>
            <table style='border-collapse:collapse;width:100%;border:1px solid #ccc;'>
                <thead>
                    <tr style='background:#f5f5f5;'>
                        <th style='padding:8px;border:1px solid #ccc;'>Вопрос</th>
                        <th style='padding:8px;border:1px solid #ccc;'>Ответ</th>
                    </tr>
                </thead>
                <tbody>
                    $questionsHTML
                </tbody>
            </table>
        ";
    } else {
        exit('Неверные данные формы.');
    }

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