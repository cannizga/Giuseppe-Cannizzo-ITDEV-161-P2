import express from 'express';
import connectDatabase from './Config/db';

//Initialize express application
const app = express();

// Connect Database
connectDatabase();

//Configure Middleware
connectDatabase();

// API Endpoints
/**
 *  @route GET /
 *  @desc Test Endpoint
 */

// API endpoints
app.get('/', (req, res) => 
    res.send("http get request sent to root api endpoint")
    );

/**
 *  @route POST api/users
 *  @desc Register user
 */
app.post('/api/users', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Connection listener
app.listen(3000, () => console.log(`Express server running on port 3000`));