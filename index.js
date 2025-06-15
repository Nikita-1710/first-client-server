import express from 'express';
import cors from 'cors'
import { getHealth, getStudents, postStudents, deleteStudentsById, putStudentsById, patchStudentsCityById, getStudentsSearch, getStudentsById  } from './controllers/student.js';

const app = express();

app.use(cors())
app.use(express.json());

const PORT = 5001;

app.get("/health", getHealth)   // Health API
app.get("/students", getStudents);  // API for read students
app.post("/students", postStudents) // API for create students
app.delete("/students/:id", deleteStudentsById) // API for delete students giving ID
app.get("/students/:id", getStudentsById)   // API for get student details by ID
app.put("/students/:id", putStudentsById)   // API for update students component
app.patch("/students/city/:id", patchStudentsCityById)  // API for update students specific element
app.get("/students/search", getStudentsSearch)  // Query and Header parameter

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});