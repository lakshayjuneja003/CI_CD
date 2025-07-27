import express from "express";
import { client } from "@repo/db/client";
const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from HTTP Server!");
}); 
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Username and password are required");
        }
        const existingUser = await client.user.findFirst({
             where: { email }
        });

        if (existingUser) {
            return res.status(409).send("User already exists");
        }
        const newUser = await client.user.create({
            data: {
                email,
                password,
            },
        });
        if (!newUser) {
            return res.status(500).send("Failed to create user");
        }
        res.status(201).send(`User ${newUser.email} signed up successfully`);
    } catch (error) {
        console.log("Error in /signup route:", error);
        res.status(500).send("Internal Server Error");
    }
  res.send("Hello from HTTP Server!");
});

app.listen(PORT, () => {
  console.log(`HTTP Server is running on port ${PORT}`);
});