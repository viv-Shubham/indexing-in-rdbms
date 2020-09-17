const fs = require("fs");
const path = require("path");
const lineReader = require('line-reader');
let Promise = require("bluebird");

let searchedData = ["NOTFOUND"];

async function createData(totalRows){
    const dir = path.join(__dirname,"Data_For_Btree_Project");
    const dataDir = path.join(dir,"data");
    createDirectory(dir);
    createDirectory(dataDir);
    
    let metadataFilePath = path.join(dataDir,"metadata");
    let metadata = totalRows;
    await writeTheRowInTheFile(metadataFilePath, metadata);
    
    let extentNumber = 1, pageNumber = 1;
    let pageSize=0;
    for (let i = 1; i <= parseInt(totalRows); i++) {
        const extentPath = path.join(dataDir,"extent_"+extentNumber);
        const pagePath = path.join(extentPath,"page_"+pageNumber+".txt");
        createDirectory(extentPath);

        const initFileContent = "";
        await writeTheRowInTheFile(pagePath, initFileContent);
        let row = "";
        const rowRollNum = i;
        const rowName = getRandomWord();
        const rowUserName = getRandomWord();
        const rowPassword = getRandomWord();
        row = rowRollNum.toString() + "|" + rowName +"|"+ rowUserName +"|"+ rowPassword;
        let rowLength = row.toString().length;
        if (pageSize+rowLength < 8*1024) {
            pageSize = pageSize + rowLength;
           await writeTheRowInTheFile(pagePath, row+"\n");
        } else {
            i--;
            pageNumber++;
            pageSize=0;
            if (pageNumber == 9) {
                extentNumber++;
                pageNumber = 1;
                // dp.updateStatus((i * 100) / numRows);     //-----------------
            }
        }
    }
    console.log("Data generated successfully!");
}

async function createIndex(columnName , columnNumber){
    const dir = path.join(__dirname,"Data_For_Btree_Project");
    const dataDir = path.join(dir,"data");
    const indicesDir = path.join(dir,"indices");
    const specificIndexDirPath = path.join(indicesDir,columnName);
    createDirectory(indicesDir);
    createDirectory(specificIndexDirPath);
    
    let metadataFilePath = path.join(dataDir,"metadata");
    let curLine = "";
    let totalRows = 0;
    var eachLine = Promise.promisify(lineReader.eachLine);
    await eachLine(metadataFilePath, function(line) {
        curLine = line.toString();
    }).then(async function() {
        totalRows = parseInt(curLine);
        let i=1;
        while (i <= parseInt(totalRows)) {
            let extentPath = path.join(dataDir,"extent_"+extentNumber);
            let pagePath = path.join(extentPath,"page_"+pageNumber+".txt");

            let pathsearch = pagePath;
            pathsearch = pathsearch.split("\\").join("/");
            console.log(pathsearch);
            let offset = 0;
            await eachLine(pathsearch,function(line){
                curLine = line.toString();
                let value = curLine.split("|")[columnNumber];
				let address = extentNumber + "|" + pageNumber + "|" + offset;
                offset++;
                i++;
				addLineToIndex(value, address, specificIndexDirPath);
            }).then(()=>{
                pageNumber++;
                if (pageNumber == 9) {
                    extentNumber++;
                    pageNumber = 1;
                }
            })
        }
    }).catch(function(err) {
        console.error(err);
    });
    console.log("Indices generated successfully!");
}

function createDirectory(directoryName){
    if (!fs.existsSync(directoryName)){
        fs.mkdirSync(directoryName);
    }
}

function writeTheRowInTheFile(fileName,fileRowContent){

    return new Promise((resolve, reject) => {
        fs.appendFile(fileName, fileRowContent, (err) => {
            if(err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve();
        })
    });
}

function getRandomWord(){
    let length = parseInt((Math.random() * 10) + 5);
    let word = "";
    for (let i = 0; i < length; i++) {
        let ch = String.fromCharCode(97 +(Math.random() * 25));
        word = word + ch.toString();
    }

    return word.toString();
}

async function searchData(dataToBeDisplayed,searchDataInColumn,dataToBeSearched){
    
    const dir = path.join(__dirname,"Data_For_Btree_Project");
    const dataDir = path.join(dir,"data");
    let extentNumber=1,pageNumber=1;
    let totalRows=0;
    let metadataFilePath = path.join(dataDir,"metadata");
    let curLine = "";
    let resultAfterSearch;

    var eachLine = Promise.promisify(lineReader.eachLine);
    await eachLine(metadataFilePath, function(line) {
        curLine = line.toString();
    }).then(async function() {
        totalRows = parseInt(curLine);
        // console.log(totalRows);
        let i=1;
        let flag = false;
        while (i <= parseInt(totalRows)) {
            if(flag)break;
            let extentPath = path.join(dataDir,"extent_"+extentNumber);
            let pagePath = path.join(extentPath,"page_"+pageNumber+".txt");
            // let pathsearch = path.relative(__filename,pagePath);

            let pathsearch = pagePath;
            pathsearch = pathsearch.split("\\").join("/");
            console.log(pathsearch);
            await eachLine(pathsearch,function(line){
                if(flag == false){
                    // console.log(line);
                curLine = line.toString();
                let result = curLine.split("|");
                i++;
                if(dataToBeSearched==result[parseInt(searchDataInColumn)]){
                    resultAfterSearch = result;
                    flag = true;
                } else return;
            }
            }).then(()=>{
                pageNumber++;
                if (pageNumber == 9) {
                    extentNumber++;
                    pageNumber = 1;
                }
            })
        }
    }).catch(function(err) {
        console.error(err);
    });
    if(resultAfterSearch)searchedData = resultAfterSearch;
    else searchedData = ["NOTFOUND"];
    
}
async function addLineToIndex(value, address, specificIndexDirPath){

}
export {createData,searchData,searchedData,createIndex};