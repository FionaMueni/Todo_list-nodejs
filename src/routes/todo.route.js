const TodoController = require("./../controllers/todo.controller")
const router = require("express").Router();

router.post("/", TodoController.addTodo);
router.get("/", TodoController.getAll);
router.get("/:id", TodoController.getByID);
router.delete("/:id", TodoController.deleteTodo);
router.put("/:id", TodoController.updateTodo);
router.patch("/:id", TodoController.updateTodo);
module.exports = router;