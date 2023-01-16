var selectedRow = null

function onFormSubmit() {
        if(validate()) {
            var formData = readFormData();
            if(selectedRow == null) 
                insertNewRecord(formData);
            
            else
                updateRecord(formData);

            resetForm();
    }  
}

function readFormData() {
    var formData = {};
    formData["stuName"] = document.getElementById("stuName").value;
    formData["stuID"] = document.getElementById("stuID").value;
    formData["stuGrade"] = document.getElementById("stuGrade").value;
    return formData;
}
function insertNewRecord(data) {
    var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.stuName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.stuID;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.stuGrade;
    cell4 = newRow.insertCell(3)
    cell4.innerHTML = `<a onClick ="onEdit(this)">Edit</a>  <a onClick="onDelete(this)">Delete</a>`;

}

function resetForm() {
    document.getElementById("stuName").value = "";
    document.getElementById("stuID").value = "";
    document.getElementById("stuGrade").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("stuName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("stuID").value = selectedRow.cells[1].innerHTML;
    document.getElementById("stuGrade").value = selectedRow.cells[2].innerHTML;

}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.stuName;
    selectedRow.cells[1].innerHTML = formData.stuID;
    selectedRow.cells[2].innerHTML = formData.stuGrade;

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById("studentList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("stuName").value == "") {
        isValid = false;
        document.getElementById("stuNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("stuNameValidationError").classList.contains("hide"))
            document.getElementById("stuNameValidationError").classList.add("hide");
    }
    return isValid;
}


function tableSearch(){
    let input, filter, table, tr, allTDs, i, txtValue;

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("studentList");
    tr = table.getElementsByTagName("tr");

    for(let i = 0; i < tr.length; i++){
        allTDs = tr[i].getElementsByTagName("td");
        for (index = 0; index < allTDs.length; index++) {
                txtValue = allTDs[index].textContent || allTDs[index].innerText;
                if(txtValue.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                    break;
                }
                else {
                    tr[i].style.display = "none";
                }
    
            }
        }
}
