/* Global Variable Declaration Here*/

var fName, lName, address, city, state, zip, phone, email;
var flag = 0;
var f_name = false, l_name = false, addr = false, ct = false, st = false, zp = false, phn = false, eml = false;

/* All Input Fields Validation Done Here */

function validateFirstName() {
    fName = document.getElementById('fname').value;
    let pattern = RegExp("[A-Z][a-z]{2,}");
    if (pattern.test(fName)) {
        f_name = true;
        flag = flag + 1;
    } else {
        f_name = false
        flag = flag - 1;
        d3.select("#fNameError").text("Invalid First Name!!!");
    }
}
function validateLastName() {
    lName = document.getElementById('lname').value;
    let pattern = RegExp("[A-Z][a-z]{2,}");
    if (pattern.test(lName)) {
        l_name = true;
        flag = flag + 1;
    } else {
        l_name = false;
        flag = flag - 1;
        d3.select("#lNameError").text("Invalid Last Name!!!");
    }
}
function validateAddress() {
    address = document.getElementById('address').value;
    let pattern = RegExp("^[A-Za-z]{4,}");
    if (pattern.test(address)) {
        addr = true;
        flag = flag + 1;
    } else {
        addr = false;
        flag = flag - 1;
        d3.select("#addressError").text("Invalid Address!!!");
    }
}
function validateCity() {
    city = document.getElementById('city').value;
    let pattern = RegExp("^[A-Za-z]{4,}");
    if (pattern.test(city)) {
        ct = true;
        flag = flag + 1;
    } else {
        ct = false;
        flag = flag - 1;
        d3.select("#cityError").text("Invalid City Name!!!");
    }
}
function validateState() {
    state = document.getElementById('state').value;
    let pattern = RegExp("^[A-Za-z]{4,}");
    if (pattern.test(state)) {
        st = true;
        flag = flag + 1;
    } else {
        st = false;
        flag = flag - 1;
        d3.select("#stateError").text("Invalid State Name!!!");
    }
}
function validateZip() {
    zip = document.getElementById('zip').value;
    let pattern = RegExp("^[1-9]{1}[0-9]{2}[0-9]{3}$");
    if (pattern.test(zip)) {
        zp = true;
        flag = flag + 1;
    } else {
        zp = false;
        flag = flag - 1;
        d3.select("#zipError").text("Invalid Zip Code!!!");
    }
}
function validatePhone() {
    phone = document.getElementById('phone').value;
    let pattern = RegExp("(0/91)?[7-9][0-9]{9}");
    if (pattern.test(phone)) {
        phn = true;
        flag = flag + 1;
    } else {
        phn = false;
        flag = flag - 1;
        d3.select("#phoneError").text("Invalid Phone Number!!!");
    }
}
function validateEmail() {
    email = document.getElementById('email').value;
    let pattern = RegExp("^[a-zA-Z]{4,}[a-zA-Z0-9\.\!\_]*\@[a-z]*\.(co|in|com)$");
    if (pattern.test(email)) {
        eml = true;
        flag = flag + 1;
    } else {
        eml = false;
        flag = flag - 1;
        d3.select("#emailError").text("Invalid Email Address!!!");
    }
}

/* CRUD Operations Starts From Here */

/* POST Data to Server */

function checkData() {
    if (f_name === false) { d3.select("#fNameError").text("required...").style("color", "red"); }
    if (l_name === false) { d3.select("#lNameError").text("required...").style("color", "red"); }
    if (addr === false) { d3.select("#addressError").text("required...").style("color", "red"); }
    if (ct === false) { d3.select("#cityError").text("required...").style("color", "red"); }
    if (st === false) { d3.select("#stateError").text("required...").style("color", "red"); }
    if (zp === false) { d3.select("#zipError").text("required...").style("color", "red"); }
    if (phn === false) { d3.select("#phoneError").text("required...").style("color", "red"); }
    if (eml === false) { d3.select("#emailError").text("required...").style("color", "red"); }
    if (flag === 8) {
        postData();
    } else {

    }
}
function postData() {
    let empData = {
        firstName: fName,
        lastName: lName,
        address: address,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        email: email
    }
    console.log(empData);
    $.ajax({
        url: 'http://localhost:3000/EmployeeData/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data: JSON.stringify(empData),
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/* GET Data From Server */

$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:3000/EmployeeData/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            employeeData = data;
            printTableData(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
});

var employeeData;
function printTableData(employeeData) {
    var tableData = document.getElementById('dataTable');
    for (let i = 0; i < employeeData.length; i++) {
        var row = `<tr id="tr"> 
        <td>${employeeData[i].firstName}</td>
        <td>${employeeData[i].lastName}</td>
        <td>${employeeData[i].address}</td>
        <td>${employeeData[i].city}</td>
        <td>${employeeData[i].state}</td>
        <td>${employeeData[i].zip}</td>
        <td>${employeeData[i].phone}</td>
        <td>${employeeData[i].email}</td>` +
            "<td><i class=\"fas fa-user-edit\"></i></td>" +
            "<td><i class=\"fas fa-user-minus\"></i></td>" +
            "</tr>";

        tableData.innerHTML += row;
    }
}