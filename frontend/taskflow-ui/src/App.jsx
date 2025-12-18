import React, { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  deleteAll,
  deleteTask,
  updateTask,
} from "./services/taskService";

// MUI Components
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Switch,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add task
  const handleAdd = async () => {
    if (!title.trim()) return alert("Title is required");

    await addTask({ title, description });
    setTitle("");
    setDescription("");
    loadTasks();
  };

  // Delete all tasks
  const handleDeleteAll = async () => {
    await deleteAll();
    loadTasks();
  };

  // Delete single task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  // Toggle task status
  const handleToggleStatus = async (task) => {
    const updatedTask = {
      ...task,
      status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
    };

    await updateTask(task.id, updatedTask);
    loadTasks();
  };

  return (
    <>
      {/* Top Bar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TaskFlow — Smart Task Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        {/* Add Task */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            mb: 5,
            borderRadius: 3,
            background: "linear-gradient(to right, #4facfe, #00f2fe)",
            color: "white",
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Add New Task
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Task Title"
              variant="filled"
              fullWidth
              value={title}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              rows={3}
              value={description}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              variant="contained"
              startIcon={<AddTaskIcon />}
              sx={{
                backgroundColor: "#004aad",
                "&:hover": { backgroundColor: "#00327a" },
                height: 45,
              }}
              onClick={handleAdd}
            >
              Add Task
            </Button>
          </Stack>
        </Paper>

        {/* Task List */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 3,
              borderLeft: "5px solid #1976d2",
              pl: 2,
            }}
          >
            All Tasks
          </Typography>

          <Stack spacing={3}>
            {tasks.length === 0 && (
              <Typography color="text.secondary" align="center">
                No tasks available. Add some!
              </Typography>
            )}

            {tasks.map((task) => (
              <Card
                key={task.id}
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {task.title}
                  </Typography>

                  <Typography color="text.secondary" mb={1}>
                    {task.description}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontSize={12} color="GrayText">
                      Created: {task.createdAt}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* Status */}
                      <Chip
                        label={task.status}
                        size="small"
                        color={
                          task.status === "COMPLETED"
                            ? "success"
                            : "error"
                        }
                      />

                      {/* Toggle */}
                      <Switch
                        checked={task.status === "COMPLETED"}
                        onChange={() => handleToggleStatus(task)}
                        color="success"
                      />

                      {/* Delete */}
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            fullWidth
            sx={{ height: 45 }}
            onClick={handleDeleteAll}
          >
            Delete All Tasks
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default App;
