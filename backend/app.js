const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

const {db} = require('./firebase.js')

// Home Route
app.get('/', (req, res) => {
    console.log(req.data)
  res.send('Hello, World!');
});


app.get('/api/chefs', async (req, res) => {
    try {
      const chefsRef = db.collection('chefs');
      const snapshot = await chefsRef.get();
  
      const chefs = [];
      snapshot.forEach(doc => {
        chefs.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(chefs);
    } catch (error) {
      console.error('Error getting chefs:', error);
      res.status(500).json({ error: 'Failed to fetch chefs' });
    }
  });
  
  app.post('/api/chefs/:email/recipes', async (req, res) => {
    try {
      const chefEmail = req.params.email;
      const recipeData = req.body;
  
      if (!recipeData.name || !recipeData.ingredients) {
        return res.status(400).json({ error: 'Missing title or ingredients' });
      }
  
      const recipeRef = db
        .collection('chefs')
        .doc(chefEmail)
        .collection('recipes')
        .doc(); // auto-generate ID
  
      await recipeRef.set(recipeData);
  
      res.status(201).json({ message: 'Recipe added successfully', id: recipeRef.id });
    } catch (error) {
      console.error('Error adding recipe:', error);
      res.status(500).json({ error: 'Failed to add recipe' });
    }
  });
  


// GET endpoint
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Hamza' },
    { id: 2, name: 'Ali' }
  ]);
});

// POST endpoint
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created', user: newUser });
});

// PUT endpoint
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  res.json({ message: `User ${userId} updated`, data: updatedData });
});

// DELETE endpoint
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ${userId} deleted` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// table chefs
// id name image description twitter 
// 1  hamza link desc         link
// 2


const chefs = {
    1: {
        name: 'Hamza',
        image: 'link',
        description: 'desc',
        twitter: 'link'
    },

    2: {

    }, 
    
}