import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

// 投稿処理
app.post("/post", (req, res) => {
  const content = req.body.content;
  if (content) {
    posts.push(content);
  }
  res.redirect("/");
});

// 編集画面を表示
app.get("/edit", (req, res) => {
  const index = req.query.index; // URLのindexを取得
  res.render("edit", { post: posts[index], index });
});

// 更新処理
app.post("/edit", (req, res) => {
  const index = req.body.index; // 今編集しているもののindexを取得
  const content = req.body.content;
  if (posts[index] !== undefined && content) {
    posts[index] = content;
  }
  res.redirect("/");
});

// 削除処理
app.get("/delete", (req, res) => {
  const index = req.query.index;
  if (posts[index] != undefined) {
    posts.splice(index, 1); // indexのindex番目から1件削除する
  }
  res.redirect("/");
});

// 接続確認
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
