
let students = JSON.parse(localStorage.getItem("studentRecords")) || [];

let studentForm = document.getElementById("studentForm");
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let course = document.getElementById("course");
let studentTable = document.getElementById("studentTable");
let message = document.getElementById("message");
let emptyMessage = document.getElementById("emptyMessage");
let editIndex = document.getElementById("editIndex");
let saveButton = document.getElementById("saveButton");
let cancelButton = document.getElementById("cancelButton");
let formTitle = document.getElementById("formTitle");

function saveToStorage() {
    localStorage.setItem("studentRecords", JSON.stringify(students));
}

function showMessage(text) {
    message.textContent = text;
}

function displayStudents() {
    studentTable.innerHTML = "";

    emptyMessage.hidden = students.length !== 0;

    students.forEach(function(student, index) {
        let row = document.createElement("tr");

        let numberCell = document.createElement("td");
        numberCell.textContent = index + 1;

        let nameCell = document.createElement("td");
        nameCell.textContent = student.fullName;

        let emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        let courseCell = document.createElement("td");
        courseCell.textContent = student.course;

        let actionsCell = document.createElement("td");

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "btn-edit";
        editButton.type = "button";
        editButton.addEventListener("click", function() {
            editStudent(index);
        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn-delete";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", function() {
            deleteStudent(index);
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(courseCell);
        row.appendChild(actionsCell);

        studentTable.appendChild(row);
    });
}

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let student = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        course: course.value
    };

    if (!student.fullName || !student.email || !student.course) {
        showMessage("Please complete all fields.");
        return;
    }

    if (Number(editIndex.value) === -1) {
        students.push(student);
        showMessage("Student Saved Successfully!");
    } else {
        students[Number(editIndex.value)] = student;
        showMessage("Student Updated Successfully!");
    }

    saveToStorage();
    displayStudents();
    resetForm();
});

function editStudent(index) {
    let student = students[index];

    fullName.value = student.fullName;
    email.value = student.email;
    course.value = student.course;

    editIndex.value = index;
    formTitle.textContent = "Edit Student";
    saveButton.textContent = "Update Student";
    cancelButton.hidden = false;

    showMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteStudent(index) {
    let confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
        students.splice(index, 1);

        saveToStorage();
        displayStudents();
        resetForm();

        showMessage("Student Deleted Successfully!");
    }
}

function resetForm() {
    studentForm.reset();
    editIndex.value = -1;
    formTitle.textContent = "Add New Student";
    saveButton.textContent = "Add Student";
    cancelButton.hidden = true;
}

cancelButton.addEventListener("click", function() {
    resetForm();
    showMessage("");
});

displayStudents();
