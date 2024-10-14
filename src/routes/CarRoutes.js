// routes/cartRoutes.js
import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, productName, image, quantity, price } = req.body;
    const newCartItem = new Cart({
      userId,
      productId,
      productName,
      image,
      quantity,
      price,
    });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update item quantity
router.put("/update/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedCartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    res.status(200).json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete("/remove/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cart items for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
