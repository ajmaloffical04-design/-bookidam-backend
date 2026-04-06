const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize PostgreSQL database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Supabase
});
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        console.log('Connected to the Supabase PostgreSQL database.');
        // Define schemas
        client.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                type VARCHAR(100) NOT NULL,
                date VARCHAR(100) NOT NULL,
                location VARCHAR(255) NOT NULL,
                description TEXT,
                image_url TEXT,
                single_day_price INTEGER DEFAULT 0
            );
        `);

        // Migration: ensure single_day_price exists
        client.query(`
            ALTER TABLE events ADD COLUMN IF NOT EXISTS single_day_price INTEGER DEFAULT 0;
        `);

        client.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                client_name VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL,
                event_type VARCHAR(100) NOT NULL,
                event_name VARCHAR(255),
                event_date VARCHAR(100) NOT NULL,
                preferred_time VARCHAR(100),
                preferred_location VARCHAR(255) NOT NULL,
                budget VARCHAR(100) NOT NULL,
                description TEXT,
                image_url TEXT,
                status VARCHAR(50) DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `, (err) => {
            release(); // Release client back to the pool
        });
    }
});

// Import routes
// Import routes and pass the pool
const eventRoutes = require('./routes/events')(pool);
const bookingRoutes = require('./routes/bookings')(pool);
const paymentRoutes = require('./routes/payments')(pool);

// Use routes
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send('BOOKIDAM API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
