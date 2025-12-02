import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            firstName,
            lastName,
            email,
            contactNumber,
            message,
            company,
            budget,
            platform,
            uptime,
            launchDate,
            techStack,
            role,
            duration,
            inquiryType
        } = body;

        // Validate required fields
        if (!firstName || !lastName || !email) {
            return NextResponse.json(
                { message: 'First name, last name, and email are required.' },
                { status: 400 }
            );
        }

        // Build the email content based on inquiry type
        const inquiryOptions: Record<string, string> = {
            contactSales: 'Contact Sales',
            takeService: 'Get Service',
            workOnProject: 'New Project',
            workWithTeam: 'Staff Augmentation',
            outsourceProject: 'Outsource'
        };

        const inquiryLabel = inquiryOptions[inquiryType] || 'General Inquiry';

        // Build HTML email content
        let htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #dc2626; margin-top: 0;">New Inquiry: ${inquiryLabel}</h2>
                    
                    <h3 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">Contact Information</h3>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    ${contactNumber ? `<p><strong>Contact Number:</strong> ${contactNumber}</p>` : ''}
                    
                    <h3 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 20px;">Inquiry Details</h3>
                    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                    ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
                    ${platform ? `<p><strong>Platform Type:</strong> ${platform}</p>` : ''}
                    ${uptime ? `<p><strong>Uptime Requirement:</strong> ${uptime}</p>` : ''}
                    ${launchDate ? `<p><strong>Launch Date:</strong> ${launchDate}</p>` : ''}
                    ${techStack ? `<p><strong>Tech Stack:</strong> ${techStack}</p>` : ''}
                    ${role ? `<p><strong>Required Role:</strong> ${role}</p>` : ''}
                    ${duration ? `<p><strong>Duration:</strong> ${duration} months</p>` : ''}
                    
                    ${message ? `
                        <h3 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 20px;">Message</h3>
                        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
                    ` : ''}
                </div>
            </div>
        `;

        // Build plain text version
        let textContent = `
New Inquiry: ${inquiryLabel}

Contact Information:
Name: ${firstName} ${lastName}
Email: ${email}
${contactNumber ? `Contact Number: ${contactNumber}` : ''}

Inquiry Details:
${company ? `Company: ${company}` : ''}
${budget ? `Budget Range: ${budget}` : ''}
${platform ? `Platform Type: ${platform}` : ''}
${uptime ? `Uptime Requirement: ${uptime}` : ''}
${launchDate ? `Launch Date: ${launchDate}` : ''}
${techStack ? `Tech Stack: ${techStack}` : ''}
${role ? `Required Role: ${role}` : ''}
${duration ? `Duration: ${duration} months` : ''}

${message ? `Message:\n${message}` : ''}
        `.trim();

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.RESEND_TO_EMAIL || 'delivered@resend.dev',
            replyTo: email,
            subject: `New Inquiry: ${inquiryLabel} - ${firstName} ${lastName}`,
            html: htmlContent,
            text: textContent,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { message: 'Failed to send email. Please try again later.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Inquiry sent successfully!', id: data?.id },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { message: 'An error occurred while processing your request.' },
            { status: 500 }
        );
    }
}

