const fs = require("fs");
const path = require("path");
let randomWords = require('random-words');

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
        const rowName = randomWords();
        const rowUserName = randomWords();
        const rowPassword = randomWords();
        row = rowRollNum.toString() + "|" + rowName +"|"+ rowUserName +"|"+ rowPassword;
        let rowLength = row.toString().length;
        if (pageSize+rowLength < 7*1024) {
            pageSize = pageSize + rowLength;
           await writeTheRowInTheFile(pagePath, row+"\n");
        } else {
            i--;
            pageNumber++;
            pageSize=0;
            if (pageNumber == 5) {
                extentNumber++;
                pageNumber = 1;
                // dp.updateStatus((i * 100) / numRows);     //-----------------
            }
        }
    }
}

function createDirectory(directoryName){
    if (!fs.existsSync(directoryName)){
        fs.mkdirSync(directoryName);
    }
}

async function writeTheRowInTheFile(fileName,fileRowContent){
    await fs.appendFile(fileName, fileRowContent,(error)=>{
        if(error)console.log(error);
    });
}

export {createData};