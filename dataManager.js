const fs = require("fs");
const path = require("path");

function createData(totalRows){
    const dir = path.join(__dirname,"Data_For_Btree_Project");
    const dataDir = path.join(dir,"data");
    createDirectory(dir);
    createDirectory(dataDir);
    
    let extentNumber = 1, pageNumber = 1;
    for (let i = 1; i <= parseInt(totalRows); i++) {
        const extentPath = path.join(dataDir,"extent_"+extentNumber);
        const pagePath = path.join(extentPath,"page_"+pageNumber);
        createDirectory(extentPath);
        createFile(pagePath);

        // RollNum = i;
        // Name = getRandomWord();
        // UserName = getRandomWord();
        // Password = getRandomWord();
        let row = "grycngicrwni gcwnic "+i+"\n";
        // if (canThePageAccomodateARow(pagePath, row.toString().length)===true) {
           canThePageAccomodateARow(pagePath);
           writeTheRowInTheFile(pagePath, row);
        // } else {
            // i--;
            pageNumber++;
            if (pageNumber == 9) {
                extentNumber++;
                pageNumber = 1;
                // dp.updateStatus((i * 100) / numRows);     //-----------------
            }
        // }
    }
    let metadataFilePath = path.join(dataDir,"metadata");
    createFile(metadataFilePath);
    let metadata = totalRows;
    writeTheRowInTheFile(metadataFilePath, metadata);
}

const createDirectory = (directoryName)=>{
    if (!fs.existsSync(directoryName)){
        fs.mkdirSync(directoryName)
        // ,(err)=>{
            // if(err)console.log(err);
        // });
    }
}

const createFile = (fileName)=>{
    fs.createWriteStream(fileName);
}

const writeTheRowInTheFile = (fileName,fileRowContent)=>{
    fs.appendFileSync(fileName, fileRowContent)
        // ,(err)=>{
        // if(err)console.log(err);
    // });
}

const canThePageAccomodateARow = (fileName)=>{
    let stats = fs.statSync(fileName)
    let fileSizeInBytes = stats["size"];
    console.log(fileSizeInBytes);
    // if(parseInt(fileSizeInBytes) < 8 * 10)return true;
    // else return false;
}

const getRandomWord=()=>{

}

export {createData};