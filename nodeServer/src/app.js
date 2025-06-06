const express = require('express');
const cors = require('cors');
const locationsRouter = require('./routes/locations');

const app = express();
let PORT = 3001;
if (process.env.PORT) {
    PORT = parseInt(process.env.PORT, 10);    
}else if (process.argv[2]) {
   PORT = parseInt(process.argv[2], 10);
}
console.log(`Configured port ${PORT}...`);

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

app.use(express.json());
app.use('/api/locations', locationsRouter);

app.get('/', (req, res) => {
    res.send('Express server running with CORS enabled for same domain.');
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
