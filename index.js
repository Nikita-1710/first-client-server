import express from 'express';
import { getHealth, getStudents, postStudents, deleteStudentsById, putStudentsById, patchStudentsCityById, getStudentsSearch,  } from './controllers/student.js';

const app = express();
app.use(express.json());

const PORT = 5001;

app.get("/health", getHealth)   // Health API
app.get("/students", getStudents);  // API for read students
app.post("/students", postStudents) // API for create students
app.delete("/students/:id", deleteStudentsById) // API for delete students giving id
app.put("/students/:id", putStudentsById)   // API for update students component
app.patch("/students/city/:id", patchStudentsCityById)  // API for update students specific element
app.get("/students/search", getStudentsSearch)  // Query and Header parameter

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});