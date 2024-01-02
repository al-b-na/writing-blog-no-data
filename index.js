import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use (express.static("public"));

// posts array
let posts = [];

// post constructor
function Post (title, content) {
    this.title = title.slice(0, 50);
    this.content = content;
    this.cardContent = content.slice(0, 200);
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

// add post
function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

// delete post
function deletePost(index) {
    posts.splice(index, 1);
}
// edit post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

// home page 
app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
  });

app.get ("/index", (req,res) => {
    res.render("index.ejs", {posts: posts});
  }); 

// writing page
app.get("/write", (req, res) => {
    res.render("write.ejs");
  });

// about page
app.get("/about",(req,res) => {
    res.render("about.ejs");
});

// upload post
app.post("/submit", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    

    addPost(title, content);
    res.redirect("/");
});

// view post page
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

// edit post page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("edit.ejs", {postId: index, title: post.title, content: post.content});
});

// update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

// delete post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });



