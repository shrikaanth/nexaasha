<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thank You</title>
  <style>
    :root {
      --electric-cyan: #00D9FF;
      --aqua-blue: #00B0E6;
      --sky-blue: #5BDFFF;
      --dark-indigo: #0A0F2C;
      --deep-blue: #132345;
      --glass-bg: rgba(255, 255, 255, 0.8);
      --glass-border: rgba(0, 217, 255, 0.2);
      --gradient-primary: linear-gradient(45deg, var(--electric-cyan), var(--aqua-blue));
      --gradient-secondary: linear-gradient(45deg, var(--aqua-blue), var(--sky-blue));
      --gradient-accent: linear-gradient(135deg, var(--electric-cyan), var(--sky-blue));
      --shadow-light: rgba(0, 0, 0, 0.1);
      --shadow-medium: rgba(0, 0, 0, 0.15);
      --shadow-heavy: rgba(0, 0, 0, 0.25);
    }

    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: var(--deep-blue);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .thankyou-card {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      padding: 40px;
      max-width: 500px;
      box-shadow: 0 10px 30px var(--shadow-heavy);
      text-align: center;
    }

    .thankyou-card h1 {
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 32px;
      margin-bottom: 20px;
    }

    .thankyou-card p {
      font-size: 16px;
      margin-bottom: 30px;
      color: var(--dark-indigo);
    }

    .thankyou-card a {
      display: inline-block;
      padding: 12px 24px;
      background: var(--gradient-accent);
      color: white;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      box-shadow: 0 4px 15px var(--shadow-medium);
      transition: transform 0.2s ease-in-out;
    }

    .thankyou-card a:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="thankyou-card">
    <h1>Thank You!</h1>
    <p>Your message has been received. We’ll be in touch shortly.</p>
    <a href="index.html">← Back to Home</a>
  </div>
</body>
</html>
