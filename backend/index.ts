import dns from "dns";
// Force Google DNS servers before any connection attempt
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv";
dotenv.config();
import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("FreshBites API is running!");
});

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fresh-bites";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const foodsCollection = client.db("fresh-bites").collection("foods");
    const usersCollection = client.db("fresh-bites").collection("users");

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");

    const count = await foodsCollection.countDocuments();
    if (count === 0) {
      console.log("Seeding initial food data...");
      await foodsCollection.insertMany([
        { title: "Classic Burger", price: 8.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop", description: "Juicy beef patty with lettuce, tomato, and cheese." },
        { title: "Margherita Pizza", price: 12.99, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop", description: "Fresh mozzarella, tomato sauce, and basil." },
        { title: "Caesar Salad", price: 7.99, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop", description: "Crisp romaine, parmesan, croutons, and Caesar dressing." },
        { title: "Spaghetti Bolognese", price: 14.99, image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=600&auto=format&fit=crop", description: "Classic Italian pasta with rich meat sauce." }
      ]);
      console.log("Seeding complete.");
    }

    app.post("/register", async (req: Request, res: Response): Promise<any> => {
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({ name, email, password: hashedPassword });
        
        res.status(201).json({ message: "User registered successfully", data: result });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.post("/login", async (req: Request, res: Response): Promise<any> => {
      try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Missing fields" });

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "7d" });
        
        res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // inserting foods data
    app.post("/foods", async (req: Request, res: Response) => {
      const food = req.body;
      const result = await foodsCollection.insertMany(food);
      res.status(201).json({
        message: "Food added successfully",
        data: result,
      });
    });

    app.post("/food", async (req: Request, res: Response) => {
      const food = req.body;
      const result = await foodsCollection.insertOne(food);
      res.status(201).json({
        message: "Food added successfully",
        data: result,
      });
    });

    app.get("/foods", async (req: Request, res: Response) => {
      const result = await foodsCollection.find().toArray();
      res.status(200).json({
        message: "Foods fetched successfully",
        data: result,
      });
    });

    app.get("/foods/:id", async (req: Request, res: Response) => {
      const id = req.params.id;
      const result = await foodsCollection.findOne({
        _id: new ObjectId(id as string),
      });
      res.status(200).json({
        message: "Foods fetched successfully",
        data: result,
      });
    });

    const ordersCollection = client.db("fresh-bites").collection("orders");

    app.post("/orders", async (req: Request, res: Response) => {
      try {
        const orderData = req.body;
        const result = await ordersCollection.insertOne({
          ...orderData,
          createdAt: new Date(),
          status: "Paid & Confirmed",
        });
        res.status(201).json({
          message: "Order placed and payment processed successfully",
          orderId: result.insertedId,
          data: result,
        });
      } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: "Failed to process order and payment" });
      }
    });

    app.get("/orders", async (req: Request, res: Response) => {
      try {
        const result = await ordersCollection.find().sort({ createdAt: -1 }).toArray();
        res.status(200).json({
          message: "Orders retrieved successfully",
          data: result,
        });
      } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders" });
      }
    });

    // Connect the client to the server	(optional starting in v4.7)
    // Send a ping to confirm a successful connection
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
