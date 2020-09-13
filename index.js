import {createData} from "./dataManager.js";

let totalRows = document.getElementById("total-rows");
const createDataBtn = document.getElementById("create-data");

createDataBtn.addEventListener("click",()=>{
    createData(totalRows.value);
})
