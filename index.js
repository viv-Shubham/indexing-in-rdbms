import {createData,searchData,searchedData} from "./dataManager.js";
const fs = require("fs");
const path = require("path");

let totalRows = document.getElementById("total-rows");
const createDataBtn = document.getElementById("create-data");
const searchDataBtn = document.getElementById("search-data");
createDataBtn.addEventListener("click",()=>{
    createData(totalRows.value);
})

searchDataBtn.addEventListener("click",async function(){
    await searchData("a","3","shubham");
    console.log(searchedData);
})