const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.argv[2] ? parseInt(process.argv[2], 10) : 3000;

// Enable CORS for any protocol on localhost or 127.0.0.1
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests from localhost or 127.0.0.1 with any protocol and port
        const allowed = [
            /^https?:\/\/localhost(:\d+)?$/,
            /^https?:\/\/127\.0\.0\.1(:\d+)?$/
        ];
        if (!origin || allowed.some(re => re.test(origin))) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/', (req, res) => {
    res.send('Express server running with CORS enabled for same domain.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
