import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";
const apiKeyENV = process.env.API_KEY;
console.log("API-KEY:", apiKeyENV);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const verifyApiKey = (req, res, next) => {
  const enteredApiKey = req.headers["x-api-key"];
  if (!enteredApiKey || enteredApiKey !== apiKeyENV) {
    return res.status(403).json({ message: "Forbidden: Invalid API key" });
  }
  next();
};

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

// Get to edit page
app.get("/edit/:id", verifyApiKey, async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// To update post
app.post("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.delete("/api/posts/delete/:id", async (req, res) => {
  const enteredUserApiKey = req.headers["x-api-key"];
  if (!enteredUserApiKey || enteredUserApiKey !== apiKeyENV) {
    return res.status(403).json({ message: "Forbidden: Invalid API key" });
  }
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`, {
      headers: { "x-api-key": apiKeyENV }
    });
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
