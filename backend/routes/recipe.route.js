// backend/routes/recipes.js

import express from 'express';
import { db } from '../config/firebase.js'; // assuming db is firestore instance

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('recipes').get();
    const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Failed to fetch recipes", error });
  }
});

export default router;
