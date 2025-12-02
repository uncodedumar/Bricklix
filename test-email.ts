import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'birclix@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('Email sent successfully!', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();