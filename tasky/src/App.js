import Task from "./components/Task";
import AddTaskForm from './components/Form';
import "./App.css";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Grid from '@mui/material/Grid';

function App() {

    const [taskState, setTaskState] = useState({
        tasks: [
            {id: 1, title: "Dishes", description: "Empty dishwasher", deadline: "Today", done: false, priority: "Low"},
            {id: 2, title: "Laundry", description: "Fold clothes and put away", deadline: "Tomorrow", done: false, priority: "Medium"},
            {id: 3, title: "Tidy up", deadline: "Today", done: false, priority: "High"},
            {id: 4, title: "Dry up", description: "Dry clothes and put away", deadline: "Today", done: false, priority: "High"},
            {id: 5, title: "Clean up", description: "Clean clothes and put away", deadline: "Today", done: false, priority: "Low"}
        ]
    });

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        priority: "",
        deadline: ""
    });

    const doneHandler = (taskIndex) => {
        const tasks = [...taskState.tasks];
        tasks[taskIndex].done = !tasks[taskIndex].done;
        setTaskState({tasks});
        //console.log(`${taskIndex} ${tasks[taskIndex].done}`);
    }

    const deleteHandler = (taskIndex) => {
        const tasks = [...taskState.tasks];
        tasks.splice(taskIndex, 1);
        setTaskState({tasks});
    }

    const formChangeHandler = (event) => {
        let form = {...formState};
        //event.target  ->  <input type="text" name="title" required>
        switch (event.target.name) {
            case "title":
                form.title = event.target.value;
                break;
            case "description":
                form.description = event.target.value;
                break;
            case "priority":
                form.priority = event.target.value;
                break;
            case "deadline":
                form.deadline = event.target.value;
                break;
            default:
                form = formState;
        }
        setFormState(form);
        console.log(formState);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const tasks = [...taskState.tasks];
        const form = {...formState};

        form.id = uuidv4();

        tasks.push(form);
        setTaskState({tasks});
    }

    return (

        <div className="container">
            {/* App Header */}
            <Container component="main">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{
                        backgroundColor: 'gray',
                        textAlign: 'center',
                        color: 'white',
                        padding: '20px',
                        margin: '20px 0 40px 0',
                        borderRadius: '4px'
                    }}
                >
                    Tasky
                </Typography>
            </Container>
            {/* End App Header */}
            {/* Task Card Grid */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-top" justifyContent="center">
                    {taskState.tasks.map((task, index) => (
                        <Task
                            title={task.title}
                            description={task.description}
                            deadline={task.deadline}
                            priority={task.priority}
                            done={task.done}
                            key={task.id}
                            markDone={() => doneHandler(index)}
                            deleteTask={() => deleteHandler(index)}
                        />
                    ))}
                </Grid>
            </Container>
            {/* End Task Card Grid */}
            {/* Footer - Add Task Form */}
            <Container
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    my: 6,
                    py: 6,
                }}
            >
                <Grid container justifyContent="center">
                    <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
                </Grid>
            </Container>
            {/* End Footer */}
        </div>
        /*
            <div className="container">
                <h1>Tasky</h1>
                <Task title={taskState.tasks[0].title} deadline={taskState.tasks[0].deadline}
                      description={taskState.tasks[0].description}/>
                <Task title={taskState.tasks[1].title} deadline={taskState.tasks[1].deadline}
                      description={taskState.tasks[1].description}/>
                <Task title={taskState.tasks[2].title} deadline={taskState.tasks[2].deadline}
                      description={taskState.tasks[2].description}/>
            </div>
        */
        /*
           <div className="container">
               <h1>Tasky</h1>
               <Task title="Dishes" deadline="Today" description="Empty dishwasher"/>
               <Task title="Laundry" deadline="Tomorrow" description="Fold laundry and put away"/>
               <Task title="Tidy" deadline="Today" description=""/>
           </div>
        */

    );
}

export default App;
