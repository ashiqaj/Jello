export function createWelcomeEmailTemplate(name, url) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Jello</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      
      <div style="background: linear-gradient(135deg, #ff5a5f 0%, #ff8a80 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">Welcome to Jello!</h1>
      </div>

      <div style="padding: 40px 35px;">
        <p style="font-size: 18px; color: #333333; margin-bottom: 20px;">
          <strong>Hello ${name},</strong>
        </p>
        
        <p style="font-size: 16px; color: #555555; line-height: 1.6; margin-bottom: 25px;">
          We're thrilled to have you join the party! Jello is the best place to connect with your friends and family in real-time. Let's get things moving.
        </p>

        <div style="background-color: #fff0f1; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #ff5a5f;">
          <p style="font-size: 16px; margin: 0 0 15px 0; color: #cc4b4f;"><strong>Get started in a few bounces:</strong></p>
          <ul style="padding-left: 20px; margin: 0; color: #555555; font-size: 15px;">
            <li style="margin-bottom: 10px;">Set up your funky profile picture</li>
            <li style="margin-bottom: 10px;">Find and add your contacts</li>
            <li style="margin-bottom: 0;">Send your first "Hello!"</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <a href="${url}" style="background: linear-gradient(to right, #ff5a5f, #ff8a80); color: white; text-decoration: none; padding: 14px 35px; border-radius: 50px; font-size: 16px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(255, 90, 95, 0.2);">
            Hop into Jello
          </a>
        </div>

        <p style="font-size: 14px; color: #888888; line-height: 1.5; margin-bottom: 5px;">
          If you have any questions, just reply to this email. We are always here to help.
        </p>
        
        <p style="font-size: 14px; color: #333333; font-weight: bold; margin-top: 20px;">
          Happy Chatting,<br>
          The Jello Team
        </p>
      </div>

      <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
        <p style="font-size: 12px; color: #999999; margin: 0;">
          © 2025 Jello App. All rights reserved.
        </p>
      </div>

    </div>
  </body>
  </html>
  `;
}