#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.magentaBright("\n\t WELCOME TO STUDENT MANAGEMENT SYSTEM"));
const students = [];
async function addStudent() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: '\n Enter student name:',
        },
        {
            type: 'input',
            name: 'rollNumber',
            message: 'Enter student roll number:',
        },
        {
            type: 'input',
            name: 'grade',
            message: 'Enter student grade:',
        },
    ]);
    const student = {
        name: answers.name,
        rollNumber: parseInt(answers.rollNumber),
        grade: answers.grade,
    };
    students.push(student);
    console.log(chalk.green("\nStudent added successfully!"));
}
async function viewStudents() {
    console.log('\nStudents:');
    students.forEach((student, index) => {
        console.log(chalk.yellow(`${index + 1}. ${student.name} (${student.rollNumber}) - ${student.grade}`));
    });
}
async function deleteStudent() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'rollNumber',
            message: '\nEnter the roll number of the student to delete:',
        },
    ]);
    const rollNumber = parseInt(answers.rollNumber);
    const index = students.findIndex((student) => student.rollNumber === rollNumber);
    if (index !== -1) {
        students.splice(index, 1);
        console.log(chalk.green("\nStudent deleted successfully!"));
    }
    else {
        console.log(chalk.red("Student not found!"));
    }
}
async function main() {
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: '\nSelect an option:',
                choices: [
                    'Add Student',
                    'View Students',
                    'Delete Student',
                    'Exit',
                ],
            },
        ]);
        switch (answers.option) {
            case 'Add Student':
                await addStudent();
                break;
            case 'View Students':
                await viewStudents();
                break;
            case 'Delete Student':
                await deleteStudent();
                break;
            case 'Exit':
                return;
        }
    }
}
main();
