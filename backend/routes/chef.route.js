import express from 'express';
import {admin, db} from '../config/firebase.js'


const router = express.Router();


router.get('/', async (req, res) => {
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


// POST endpoint to create a new chef
router.post('/', async (req, res) => {
  const { email, avatar, firstName, lastName, description, password, twitter } = req.body;

  try {
    const chefRef = db.collection('chefs').doc(email);
    const chefDoc = await chefRef.get();

    if (chefDoc.exists) {
      return res.status(400).json({ error: 'Chef already exists' });
    }

    await chefRef.set({
      email,
      firstName,
      lastName,
      avatar: avatar || '',
      description: description || '',
      password, // Should hash in production
      twitter: twitter || ''
    });

    // Return basic data (avoid sending back password)
    res.status(201).json({
      message: 'Chef created successfully',
      chef: {
        email,
        firstName,
        lastName,
      }
    });
  } catch (error) {
    console.error('Error creating chef:', error);
    res.status(500).json({ error: 'Failed to create chef' });
  }
});

// POST endpoint for login
router.post('/login', async (req, res) => {
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



// Get recipes for a specific chef
router.get('/:email/recipes', async (req, res) => {
  const { email } = req.params;
  // console.log(email);

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

    // console.log('Fetched recipes:', recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});


// Editing a chef's profile
router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;

  //console.log(updateData);

  try {
    const chefRef = db.collection('chefs').doc(email);
    const chefDoc = await chefRef.get();

    if (!chefDoc.exists) {
      return res.status(404).json({ error: 'Chef not found' });
    }

    await chefRef.update(updateData);

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});



// Adding a recipe for a chef
router.post('/:email/recipes', async (req, res) => {
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


// router.put('/:email/recipes', async (req, res) => {
//   const { email } = req.params;
//   const updatedRecipe = req.body;

//   if (!updatedRecipe || !updatedRecipe.name) {
//     return res.status(400).json({ error: 'Recipe name and content are required.' });
//   }

//   try {
//     const userRef = db.collection('chefs').doc(email);
//     const doc = await userRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: 'Chef not found.' });
//     }

//     const chefData = doc.data();
//     const recipes = chefData.recipes || [];

//     const recipeIndex = recipes.findIndex(r => r.id === updatedRecipe.id);

//     if (recipeIndex === -1) {
//       return res.status(404).json({ error: 'Recipe not found.' });
//     }

//     recipes[recipeIndex] = updatedRecipe;

//     await userRef.update({ recipes });

//     res.json({ message: 'Recipe updated successfully.', recipes });
//   } catch (err) {
//     console.error('Error updating recipe:', err);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

router.put('/:email/recipes/:recipeId', async (req, res) => {
  const { email, recipeId } = req.params;
  const updatedRecipe = req.body;

  if (!updatedRecipe || !updatedRecipe.name) {
    return res.status(400).json({ error: 'Recipe data is incomplete.' });
  }

  console.log(email)
  try {
    const chefRef = db.collection('chefs').doc(email);
    const chefDoc = await chefRef.get();

    if (!chefDoc.exists) {
      return res.status(404).json({ error: 'Chef not found.' });
    }

    const chefData = chefDoc.data();
    const recipeIds = chefData.recipeRefs || [];
    // console.log(recipeIds);
    // console.log(recipeId);

    if (!recipeIds.includes(recipeId)) {
      return res.status(404).json({ error: 'Recipe not associated with this chef.' });
    }

    const recipeRef = db.collection('recipes').doc(recipeId);
    const recipeDoc = await recipeRef.get();

    if (!recipeDoc.exists) {
      return res.status(404).json({ error: 'Recipe not found in recipes collection.' });
    }

    await recipeRef.update(updatedRecipe);

    res.json({ message: 'Recipe updated successfully.', updatedRecipe });
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



export default router;