const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

dotenv.config();

app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB Connection
const connectToDataBase = async () => {
  await mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      console.log("Connected to DB!"),
      app.listen(8080, () => console.log("Server running!"))
    );
};

connectToDataBase();

app.use(cors());

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
    minlength: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("taskSchema", taskSchema);

//Routes
//GET Method
app.get("/list", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch {
    res.redirect("/");
  }
});

//POST Method
app.post("/", async (req, res) => {
  console.log(req.body);

  const todoTask = new Task(req.body);

  try {
    await todoTask.save();
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
});

//DELETE Method
app.delete(`/list/:id`, async (req, res) => {
  const id = req.params.id;
  try {
    await Task.findByIdAndRemove(id);
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
});
