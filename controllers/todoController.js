const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const urlencodeParser = bodyParser.json({ useUnifiedTopology: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://app-user:N9gwc7b9DiXkjSR@ilia-cluster0-rdyya.mongodb.net/todo?retryWrites=true&w=majority", function (err) {
    if (err) return console.log(err);
});

module.exports = function (app) {
    app.get("/api/todo", async function (req, res) {
        let result = await getTaskList()
        console.log(`got tasks`);
        console.log(result)

        res.render('todo', { project: result })
        return res.status(201).json({ project: project });
    });

    app.post("/todo", urlencodeParser, async function (req, res) {
        if (!req.body) return res.sendStatus(400);

        const mongoose_id = mongoose.Types.ObjectId();
        const newProject = new Projects({ name: 'New project', _id: mongoose_id });
        await newProject.save(function (err, proj) {
            if (err) return console.error(err);
            // console.log(`added proj`);
            // console.log(proj)
            res.render('project', { project: proj })
        });
    });

    app.put("/todo", urlencodeParser, async function (req, res) {

    });

    app.delete("/todo:id", async function (req, res) {
        const id = req.params.id;
        console.log("app.delete: " + id);
        await Projects.findByIdAndDelete({ _id: id }, function (err, proj) {
            if (err) return console.log(err);
        });
        await Tasks.find({ project_id: id }, async function (err, task) {
            if (task) {
                await Tasks.deleteMany({ project_id: id }, function (err, task) {
                    console.log("app.delete.task: " + task.n);
                });
            }
            res.send({ _id: id });
        });
    });



    app.post("/todo/task", urlencodeParser, async function (req, res) {
        if (!req.body) return res.sendStatus(400);
        // console.log(req.body)
        const mongoose_id = mongoose.Types.ObjectId();
        const newTask = new Tasks({ name: req.body.name, _id: mongoose_id, project_id: req.body.project_id, status: false });
        await newTask.save(function (err, task) {
            if (err) return console.error(err);
            console.log(`added task: `+task._id);
            res.render('task', { task: task })
        });
    });

    app.delete("/todo/task:id", async function (req, res) {
        const id = req.params.id;
        await Tasks.findByIdAndDelete({ _id: id }, function (err, task) {
            if (err) return console.log(err);
            console.log("app.delete.task: "+ task._id);
            res.send(task);
        });
    });


};

const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


const taskScheme = new mongoose.Schema({
    name: String,
    status: Boolean,
    project_id: ObjectId
})

const projectScheme = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    // user_id: ObjectId
})

const userScheme = new mongoose.Schema({
    name: String,
    email: String
})

const Tasks = mongoose.model('Tasks', taskScheme);
const Projects = mongoose.model('Projects', projectScheme);
const Users = mongoose.model('Users', userScheme);

function getTaskList() {
    return Projects.aggregate([{
        $lookup:
        {
            from: 'tasks',
            localField: '_id',
            foreignField: 'project_id',
            as: 'task'
        }
    },
    ])
}
