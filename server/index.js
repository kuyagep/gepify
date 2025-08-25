import express from "express"; // Import the Express module
import cors from "cors";
import dotenv from "dotenv";
import { customAlphabet } from "nanoid";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();              // Create an Express application instance
const PORT = process.env.PORT;                // Define the port for the server to listen on
const corsOptions = {
    origin:["http://localhost:5173"],
}
// Connect to DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Allowed characters: 0-9 + a-z + A-Z
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 6);

// Define a route for GET requests to the root URL ('/')
app.get('/', (req, res) => {
    res.send('Link Shortener!');
});

// Health-check
app.get("/health", (req, res) => {
    res.json({
        status: "ok!",
        uptime: process.uptime()
    });
});


// Shorten URL
app.post("/shorten", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });

    try {
        const shortId = nanoid();
        await pool.query(
            "INSERT INTO links (id, url) VALUES ($1, $2)",
            [shortId, url]
        );
        res.json({ shortUrl: `http://localhost:${PORT}/${shortId}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});


// Redirect to original URL
app.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT url FROM links WHERE id=$1", [id]);
        if (result.rows.length > 0) {
            res.redirect(result.rows[0].url);
        } else {
            res.status(404).send("Not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});