import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chefRoutes from './routes/chef.route.js'
import recipeRoutes from './routes/recipe.route.js';


dotenv.config();

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());


app.use(cors())



app.use("/api/chefs", chefRoutes)
app.use("/api/recipes", recipeRoutes)


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
