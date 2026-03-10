const express = require('express');

module.exports = (pool) => {
    const router = express.Router();

    // Get all events
    router.get('/', async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT * FROM events ORDER BY id DESC");
            // Map image_url back to frontend expectation
            const formattedRows = rows.map(r => ({
                id: r.id,
                title: r.title,
                type: r.type,
                date: r.date,
                location: r.location,
                description: r.description,
                imageUrl: r.image_url
            }));
            
            res.json({
                message: "success",
                data: formattedRows
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Create a new event
    router.post('/', async (req, res) => {
        const { title, type, date, location, description, imageUrl } = req.body;
        
        try {
            const result = await pool.query(
                `INSERT INTO events (title, type, date, location, description, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                [title, type, date, location, description, imageUrl || ""]
            );
            
            res.json({
                message: "success",
                data: { id: result.rows[0].id, title, type, date, location, description, imageUrl }
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
