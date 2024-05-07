const express = require('express');
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());

app.use(cors());

// Enable CORS for all routes

app.use(errorHandler);

const userRoute = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');
app.use('/items' , itemRoute);
app.use('/user', userRoute);


app.get('/', (req, res,next) => {
    try {
        res.json({ data: 'hi' });
  
   let result = null
      // If the data is not found, throw a custom error
      if (!result) {
        throw new Error(404, 'Data not found');
      }
  
      // Send the response with the data
      res.json({ data: result });
  
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
  
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});



module.exports = app;
//module.exports = swaggerUi.setup(swaggerJsdoc, options);