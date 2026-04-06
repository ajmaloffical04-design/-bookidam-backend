import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
    const formattedRows = rows.map((r: any) => ({
      id: r.id,
      clientName: r.client_name,
      phone: r.phone,
      email: r.email,
      eventType: r.event_type,
      eventName: r.event_name,
      eventDate: r.event_date,
      preferredTime: r.preferred_time,
      preferredLocation: r.preferred_location,
      budget: r.budget,
      description: r.description,
      imageUrl: r.image_url,
      status: r.status,
      createdAt: r.created_at
    }));

    return NextResponse.json({
      message: "success",
      data: formattedRows
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const { 
      clientName, phone, email, eventType, eventName, eventDate, 
      preferredTime, preferredLocation, budget, description, imageUrl 
    } = await req.json();

    const bookingResult = await pool.query(
      `INSERT INTO bookings (client_name, phone, email, event_type, event_name, event_date, preferred_time, preferred_location, budget, description, image_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [clientName, phone, email, eventType, eventName, eventDate, preferredTime, preferredLocation, budget, description, imageUrl || ""]
    );
    const bookingId = bookingResult.rows[0].id;

    // Automatically create a public Event so it shows up on the homepage Trending section
    const title = eventName || `${eventType} by ${clientName}`;
    await pool.query(
      `INSERT INTO events (title, type, date, location, description, image_url) VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, eventType, eventDate, preferredLocation, description, imageUrl || ""]
    ).catch(errEvent => {
      console.error("Failed to auto-create event for booking", errEvent);
    });

    return NextResponse.json({
      message: "success",
      data: { id: bookingId, status: 'Pending' }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
