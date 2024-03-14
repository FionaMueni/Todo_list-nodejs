const Todo = require("./../models/Todo.model");

class TodoController{
    constructor(){}

    async addTodo(req, res){
        try{

       
        //   console.log (req.body.todo) 

        const newTodo= await new Todo({todo: req.body.todo, image: `http://localhost:8000/${req.file.path}`})
        newTodo.save()

        res.status(201).json({message: "Todo created successfully", data: newTodo})


        }catch(error){
            console.log(error);
        }

      
    }
    async getAll (req, res){
        try{
            const allTodos = await Todo.find({})
            res.status(200).json({message: "Here are all your tasks", data: allTodos})

        }catch(error){
            console.log(error);
        }
    }
    async deleteTodo(req,res){
        try{
        // (req.params.id)
       const deleteTodo = await Todo.findByIdAndDelete(req.params.id)

       if (!deleteTodo){
        res.status(404).json("Todo not found")
       }


       res.status(204).json({message:"Delete done"})


        }catch(error){console.log(error);}
    }

    async updateTodo (req, res) {
        try{
            const {id} = req.params
            const {newName} = req.body
            
           const updateTodo =  await Todo.findById(id)

           if (!updateTodo) {
            res.status(404).json({message: "Todo not found"})
           }

           updateTodo.todo =newName;
           updateTodo.save()

           res.status(200).json({
            message: "Updated Todo successfully",
            todo:updateTodo
           })
            // const {name, email, tags, amount, image, imageURL} = req.body
    
        } catch (error) {
            console.log(error);
        }
    
    };
    async getByID (req, res){
        try{
            const {id} = req.params
            const findTodo = await Todo.findById(id)
            if (!findTodo) {
                res.status(404).json({message: "Todo not found"})
               }
               res.status(200).json(findTodo)
        } catch (error) {
            console.log(error)
        }
    }
    
};


module.exports = new TodoController();


