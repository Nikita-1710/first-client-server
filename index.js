import express from 'express';

const app = express();
app.use(express.json());
const PORT = 5001;

// this is a temporary data store
const STUDENTS = [
    {
        "id": 1,
        "name": "Sahil",
        "city": "Nagpur"
    },
    {
        "id": 2,
        "name": "Akash",
        "city": "Amravati"
    }
];

// API for read students
app.get("/students", (req, res) => {
    res.json({
        success: true,
        data: STUDENTS,
        message: "Students fetched successfully"
    });
});

// API for create students
app.post("/students", (req, res) => {
    // const name = req.body.name
    // const city = req.body.city
    // const id = req.body.id
    const { name, city, id } = req.body

    // validation for existing id
    for (const student of STUDENTS) {
        if (id == student.id) {
            return res.json({
                success: false,
                message: "ID already exists."
            })
        }
    }

    // validation for required fields
    if (!name) {
        return res.json({
            success: false,
            message: "Name is required"
        })
    }
    if (!city) {
        return res.json({
            success: false,
            message: "City is required"
        })
    }
    if (!id) {
        return res.json({
            success: false,
            message: "ID is required"
        })
    }

    const studentObj = {
        // "id" : id,
        // "name" : name,
        // "city" : city
        id,
        name,
        city
    }

    STUDENTS.push(studentObj)

    res.json({
        success: true,
        data: studentObj,
        message: "Students created successfully"
    });
})

// API for delete students giving id
app.delete("/students/:id", (req, res) => {

    // const studentIndex = STUDENTS.findIndex((student) => student.id === id)

    const { id } = req.params

    let studentIndex = -1

    STUDENTS.forEach((stud, i) => {
        if (stud.id == id) {
            studentIndex = i;
        }
    })

    if (studentIndex == -1) {
        return res.json({
            success: false,
            message: `Student with id: ${id} does not exist`
        })
    }
    else {
        STUDENTS.splice(studentIndex, 1)
        return res.json({
            success: true,
            message: `Student with id: ${id} deleted successfully`
        })
    }
})

// API for update students c7omponent
app.put("/students/:id", (req, res) => {
    const { id } = req.params
    const { name, city } = req.body

    // validation for required fields
    if (!name) {
        return res.json({
            success: false,
            message: "Name is required"
        })
    }
    if (!city) {
        return res.json({
            success: false,
            message: "City is required"
        })
    }

    let studentIndex = -1

    STUDENTS.forEach((stud, i) => {
        if (stud.id == id) {
            studentIndex = i;
        }
    })

    if (studentIndex == -1) {
        return res.json({
            success: false,
            message: `Student with id: ${id} does not exists`
        })
    }
    
    STUDENTS[studentIndex] = {
        id: parseInt(id),
        name: name,
        city: city
    }

    res.json({
        success: true,
        data: STUDENTS[studentIndex],
        message: `Student with id: ${id} updated successfully`,
    })
})

// API for update students specific element
app.patch("/students/city/:id", (req, res) => {
    const { id } = req.params;
    const { city } = req.body;

    if (!city) {
        return res.json({
            success: false,
            message: "City is required"
        });
    }

    let studentIndex = -1;

    STUDENTS.forEach((stud, i) => {
        if (stud.id == id) {
            studentIndex = i;
        }
    });

    if (studentIndex === -1) {
        return res.json({
            success: false,
            message: `Student with id: ${id} does not exist`
        });
    }

    const existingStudent = STUDENTS[studentIndex];

    const updatedStudent = {
        ...existingStudent,
        city
    };

    STUDENTS[studentIndex] = updatedStudent;

    res.json({
        success: true,
        data: updatedStudent,
        message: `Student with id: ${id} updated successfully`
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});