import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM events ORDER BY id DESC");
    const formattedRows = rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      type: r.type,
      date: r.date,
      location: r.location,
      description: r.description,
      imageUrl: r.image_url,
      singleDayPrice: r.single_day_price || 0
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
    const { title, type, date, location, description, imageUrl, singleDayPrice } = await req.json();
    
    const result = await pool.query(
      `INSERT INTO events (title, type, date, location, description, image_url, single_day_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [title, type, date, location, description, imageUrl || "", singleDayPrice || 0]
    );

    return NextResponse.json({
      message: "success",
      data: { id: result.rows[0].id, title, type, date, location, description, imageUrl, singleDayPrice }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
