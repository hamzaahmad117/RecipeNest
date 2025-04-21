const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// Middleware to parse JSON

app.use(express.json());
app.use(cors())

const {db} = require('./firebase.js')
const admin = require('firebase-admin');

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
  
  // app.post('/api/chefs/:email/recipes', async (req, res) => {
  //   try {
  //     const chefEmail = req.params.email;
  //     const recipeData = req.body;
  
  //     if (!recipeData.name || !recipeData.ingredients) {
  //       return res.status(400).json({ error: 'Missing title or ingredients' });
  //     }
  
  //     const recipeRef = db
  //       .collection('chefs')
  //       .doc(chefEmail)
  //       .collection('recipes')
  //       .doc(); // auto-generate ID
  
  //     await recipeRef.set(recipeData);
  
  //     res.status(201).json({ message: 'Recipe added successfully', id: recipeRef.id });
  //   } catch (error) {
  //     console.error('Error adding recipe:', error);
  //     res.status(500).json({ error: 'Failed to add recipe' });
  //   }
  // });
  
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const docRef = db.collection('chefs').doc(email);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
  
      const chef = doc.data();
  
      if (chef.password !== password) {
        return res.status(401).json({ success: false, message: 'Incorrect password' });
      }
  
      res.status(200).json({ success: true, message: 'Login successful', chef });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
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

// app.post('/api/chefs/:email/recipes', async (req, res) => {
//   try {
//     const chefEmail = req.params.email;
//     const recipeData = req.body;

//     if (!recipeData.name) {
//       return res.status(400).json({ error: 'Missing name or ingredients' });
//     }

//     const recipeRef = db
//       .collection('chefs')
//       .doc(chefEmail)
//       .collection('recipes')
//       .doc(); // auto-generate ID

//     await recipeRef.set(recipeData);

//     res.status(201).json({ message: 'Recipe added successfully', id: recipeRef.id });
//   } catch (error) {
//     console.error('Error adding recipe:', error);
//     res.status(500).json({ error: 'Failed to add recipe' });
//   }
// });

app.get('/api/chefs/:email/recipes', async (req, res) => {
  const { email } = req.params;
  console.log(email);

  try {
    const chefDoc = await db.collection('chefs').doc(email).get();

    if (!chefDoc.exists) {
      return res.status(404).json({ error: 'Chef not found' });
    }

    const chefData = chefDoc.data();
    const recipeRefs = chefData.recipeRefs || [];

    const recipePromises = recipeRefs.map(refId =>
      db.collection('recipes').doc(refId).get()
    );

    const recipeDocs = await Promise.all(recipePromises);

    const recipes = recipeDocs
      .filter(doc => doc.exists)
      .map(doc => ({ id: doc.id, ...doc.data() }));

    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});


app.post('/api/chefs/:email/recipes', async (req, res) => {
  try {
    const chefEmail = req.params.email;
    const recipeData = req.body;

    // 1. Add recipe to central 'recipes' collection
    if (!recipeData.name) {
      return res.status(400).json({ error: 'Missing name or ingredients' });
    }
    const recipeRef = await db.collection('recipes').add({
      ...recipeData,
      chefEmail
    });

    // 2. Add reference to chef doc
    const chefRef = db.collection('chefs').doc(chefEmail);
    await chefRef.update({
      recipeRefs: admin.firestore.FieldValue.arrayUnion(recipeRef.id)
    });

    res.status(201).json({ message: 'Recipe added and linked to chef', id: recipeRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add recipe' });
  }
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