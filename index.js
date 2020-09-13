import {createData} from "./dataManager.js";

let totalRows = document.getElementById("total-rows");
const createDataBtn = document.getElementById("create-data");

createDataBtn.addEventListener("click",()=>{
    createData(totalRows.value);
    // haha(path.join(__dirname,"dataManager.js"));
})
// function haha(filepathshaha){
//     // const rp = path.relative(__dirname,filepathshaha);
//     // console.log(__dirname);
//     // console.log(filepathshaha);
//     // console.log(rp);
//     let stats = fs.statSync(filepathshaha);
//     let fileSizeInBytes = stats.size;

//     // let fileSizeInBytes = await filesize({locale:"fileName"});
//     // const {size: fileSizeInBytes} = await fs.statSync(fileName);
//     console.log(fileSizeInBytes);
//     fs.appendFileSync(filepathshaha, "bgvulvbeqi u  rheu huirhurc   huhc h uhc  uohnfhbohre")
//     // stats = fs.statSync(filepathshaha);
//     // fileSizeInBytes = stats.size;
//     console.log(fileSizeInBytes);
// }