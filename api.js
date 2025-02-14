import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
console.log("API_KEY from .env:", process.env.API_KEY);

let posts = [
  {
    id: 1,
    title: "England’s Largest Bird Sanctuary Grows by 30%!",
    content:
      "The British equivalent of the Audubon Society has just announced that what was already England’s largest bird reserve will be increased by 33% after a recent land purchase. Described as a place that “swarms” with life, the Geltsdale Reserve in the North Pennines range of Cumbria, northern England, will now cover 13,590 acres of moorland, meadows, blanket bog, and woodland.",
    author: "Andy Corbley",
    source: "https://www.goodnewsnetwork.org/englands-largest-bird-sanctuary-grows-by-30-its-incredible-the-place-just-swarms-with-birdlife/",
    date: "2025-02-06T10:00:00Z",
  },
  {
    id: 2,
    title: "Scientists solve the mystery of sea turtles 'lost years'",
    content:
      "Using satellite trackers, scientists have discovered the whereabouts of young sea turtles during a key part of their lives. For decades, scientists have wondered about what happens during the so-called lost years between when tiny hatchlings leave the beach and when they return to coastlines nearly grown -- a span of about one to 10 years. New research begins to fill in that gap.",
    author: "Christina Larson, The Associated Press",
    source: "https://apnews.com/article/sea-turtles-lost-years-mystery-solved-f92a0c5447cd710f189e6789bab6c78d",
    date: "2025-02-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Study finds India doubled its tiger population in a decade and credits conservation efforts",
    content:
      "India doubled its tiger population in a little over a decade by protecting the big cats from poaching and habitat loss, ensuring they have enough prey, reducing human-wildlife conflict, and increasing communities' living standards near tiger areas.",
    author: "Sibi Arasu, The Associated Press",
    source: "https://apnews.com/article/tigers-india-population-figures-study-7c09fec9b973c91dd659cd14d9858f13",
    date: "2025-01-23T09:15:00Z",
  },
];

let lastId = 3;

router.use(express.json());

router.get("/posts", (req, res) => {
  res.json(posts);
});

// Get specific post
router.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  if (!foundPost) return res.status(404).json({ message: "Post not found" });
  res.json(foundPost);
});

// New post
router.post("/posts", (req, res) => {
  const newId = ++lastId;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    source: req.body.source,
    date: new Date(),
  };
  posts.push(post);
  res.status(201).json(post);
});


rputer.patch("/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;
  if (req.body.source) post.source = req.body.source;

  res.json(post);
});

router.delete("/posts/:id", (req, res) => {
  // to delete an object one needs the position=index
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

export default router;
