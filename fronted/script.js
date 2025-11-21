
const API_URL = "http://localhost:5000/students";

// ---------------- Fetch Students ----------------
async function fetchStudents() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    data.forEach(student => {
        tableBody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.age}</td>
                <td>${student.city}</td>
                <td>
                    <button class="action-btn" onclick="deleteStudent('${student._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

fetchStudents();

// ---------------- Add Student ----------------
async function addStudent() {
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;
    const age = document.getElementById("age").value;
    const city = document.getElementById("city").value;

    const student = { name, course, age, city };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    if (res.ok) {
        alert("Student Added!");
        fetchStudents();
    }
}

// ---------------- Delete Student ----------------
async function deleteStudent(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        alert("Student Deleted!");
        fetchStudents();
    }
}
