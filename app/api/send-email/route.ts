import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
    process.env.RESEND_FROM_EMAIL || 'Bricklixbot Lead <onboarding@resend.dev>';
const TO_EMAIL = process.env.RESEND_TO_EMAIL || 'delivered@resend.dev';

export async function POST(request: Request) {
    try {
        const { name, email, phone, purpose } = await request.json();

        if (!name || !email || !phone || !purpose) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Email service not configured. Please try again later.' },
                { status: 500 }
            );
        }

        // Construct the email body
        const emailBody = `
            A new lead has been captured by Bricklixbot:

            - Name: ${name}
            - Email: ${email}
            - Phone: ${phone}
            - Purpose: ${purpose}
        `;

        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [TO_EMAIL],
            subject: `New Sales Inquiry from: ${name}`,
            text: emailBody,
            html: `
                <p>A new lead has been captured by Bricklixbot:</p>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Purpose:</strong> ${purpose}</li>
                </ul>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('API Handler Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}