import {createData,searchData,searchedData,createIndex} from "./dataManager.js";
const fs = require("fs");
const path = require("path");

let totalRows = document.getElementById("total-rows");
const createDataBtn = document.getElementById("create-data");
const searchDataBtn = document.getElementById("search-data");
createDataBtn.addEventListener("click",async function(){
    await createData(totalRows.value);
})

searchDataBtn.addEventListener("click",async function(){
    await searchData("a","3","llgihdhrlnqep");
    console.log(searchedData);
})