import * as React from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from "@mui/material/Box";
import alert from "./alert";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};
const addBtnStyle = {
  position: "fixed",
  bottom: 16,
  right: "calc(50% - 28px)",
};
const priorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];
export default function CreateTodo({fetchTodos}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleInputDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleInputPriority = (e, value) => {
    setPriority(value.value);
  };
  const handleInputDueDate = (value) => {
    setDueDate(value.format('YYYY-MM-DD'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !priority || !dueDate) {
      alert("Please fill all required fields", "error");
      return;
    }

    if (title.length < 3) {
      alert("Title must be at least 3 characters long", "error");
      return;
    }
    // API Call
    fetch(
      "https://todo-f1518-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json",
      {
        method: "POST",
        body: JSON.stringify(
          {
            title: title,
            description: description,
            priority: priority,
            dueDate: dueDate,
            isCompleted: false,
          }
        ),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then (() => {
      alert("Todo created successfully", "success");
      fetchTodos();
      handleClose();
    }).catch(() => {
      alert("Something went wrong", "error");
    });
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
  };
  return (
    <div>
      <Fab
        onClick={handleOpen}
        size="medium"
        color="primary"
        aria-label="add"
        sx={addBtnStyle}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            label="Title"
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            onChange={handleInputTitle}
          />
          <TextField
            label="Description"
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            onChange={handleInputDescription}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={priorityOptions}
            sx={{ mb: 2 }}
            fullWidth
            onChange={handleInputPriority}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Priority"
                variant="standard"
                required
              />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Basic date picker" sx={{ mb: 2, width: '100%' }} onChange={handleInputDueDate} />
          </LocalizationProvider>  
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}