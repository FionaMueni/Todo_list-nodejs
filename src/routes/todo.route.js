const TodoController = require("./../controllers/todo.controller")
const router = require("express").Router();
const authenticateRequest = require("./../middlewares/authenticateRequest")

const multer = require("multer");

const formatName = (name) => {
    console.log(name);
    return name.trim().split(" ").join("-");

  };

const storage = multer.diskStorage({
    destination: function(request, file, callback){
        callback(null, "./images")
    },

    filename: function(request, file, callback){
        callback(null, formatName(file.originalname))
    }
});

const upload = multer({ storage: storage });
router.post("/",authenticateRequest(),upload.single("image"), TodoController.addTodo);
router.get("/", authenticateRequest(), TodoController.getAll);
router.get("/:id", TodoController.getByID);
router.delete("/:id", TodoController.deleteTodo);
router.put("/:id", TodoController.updateTodo);
router.patch("/:id", TodoController.updateTodo);
module.exports = router;