<?php
// Database connection
$host = 'localhost';
$db   = 'your_database_name';
$user = 'your_username';
$pass = 'your_password';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize and fetch POST data
$firstName = htmlspecialchars(trim($_POST['firstName']));
$lastName = htmlspecialchars(trim($_POST['lastName']));
$email = htmlspecialchars(trim($_POST['email']));
$phone = htmlspecialchars(trim($_POST['phone']));
$interest = htmlspecialchars(trim($_POST['service']));
$message = htmlspecialchars(trim($_POST['message']));

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($interest) || empty($message)) {
    die("Please fill in all required fields.");
}

// Save to database
$stmt = $conn->prepare("INSERT INTO contact_messages (first_name, last_name, email, phone, interest, message) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $firstName, $lastName, $email, $phone, $interest, $message);
$stmt->execute();
$stmt->close();

// ------------------------------
// Email to site visitor
// ------------------------------
$visitorSubject = "Thank you for contacting us!";
$visitorHeaders = "From: your_email@yourdomain.com\r\n";
$visitorHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";

$visitorMessage = "
<html>
<body>
  <h2 style='color:#00B0E6;'>Hi $firstName,</h2>
  <p>Thanks for reaching out regarding <strong>$interest</strong>.</p>
  <p>We’ll get back to you soon!</p>
  <hr>
  <p><strong>Your message:</strong></p>
  <p>$message</p>
</body>
</html>
";

mail($email, $visitorSubject, $visitorMessage, $visitorHeaders);

// ------------------------------
// Email to YOU (admin/owner)
// ------------------------------
$adminEmail = "shrikaanthshyam@gmail.com"; // 👉 Replace with your email
$adminSubject = "New Contact Form Submission";

$adminHeaders = "From: $email\r\n";
$adminHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";

$adminMessage = "
<html>
<body>
  <h3>New Contact Form Submission</h3>
  <p><strong>Name:</strong> $firstName $lastName</p>
  <p><strong>Email:</strong> $email</p>
  <p><strong>Phone:</strong> $phone</p>
  <p><strong>Interest:</strong> $interest</p>
  <p><strong>Message:</strong><br>$message</p>
</body>
</html>
";

mail($adminEmail, $adminSubject, $adminMessage, $adminHeaders);

// Redirect to thank you page
header("Location: thankyou.php");
exit;
?>
