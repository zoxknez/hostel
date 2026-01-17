import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendBookingConfirmationEmail(booking: any) {
  if (!resend) {
    console.log('Skipping booking confirmation email: RESEND_API_KEY is not configured.');
    console.log('Booking details (Simulation):', booking.bookingNumber, booking.guestEmail);
    return;
  }

  const isStaff = booking.isStaffNotification;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Downtown Inn <bookings@hosteldowntowninn.com>', // Replace with verified domain
      to: [booking.guestEmail],
      subject: isStaff
        ? `NEW BOOKING RECEIVED: ${booking.bookingNumber}`
        : `Booking Confirmed: ${booking.bookingNumber}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h1 style="color: #00f5ff; background: #050816; padding: 20px; text-align: center; border-radius: 10px;">Downtown Inn</h1>
          <p>Hi ${isStaff ? 'Admin' : booking.guestName},</p>
          <p>${isStaff ? 'A new booking has been received.' : 'Thank you for choosing Downtown Inn! Your booking has been successfully received.'}</p>
          
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Reference: ${booking.bookingNumber}</h3>
            <p><strong>Room:</strong> ${booking.room ? (typeof booking.room === 'string' ? booking.room : booking.room.name) : 'Accommodation'}</p>
            <p><strong>Check-In:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><strong>Check-Out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
            <p><strong>Total Price:</strong> €${booking.totalPrice.toFixed(2)}</p>
          </div>
          
          <p>We look forward to seeing you soon!</p>
          <p>Best regards,<br/>The Downtown Inn Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
    }
  } catch (err) {
    console.error('Email failed:', err);
  }
}
