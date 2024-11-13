const { writeFile, readFile } = require("fs").promises; 




writeFile("./content/temp.txt", "First line\n", {flag: "w"})
.then(()=>{
   console.log("First line written.");
   return writeFile("./content/temp.txt", "Second line\n", {flag: "a"})
})
.then(()=>{
    console.log("Sec line written.");
    return writeFile("./content/temp.txt", "Third line\n", {flag: "a"});
})
.then(()=>{
    console.log("Third line written.");
    return readFile("./content/temp.txt", "utf-8")
})
.then((data) =>{
    console.log("Contents of temp.txt:\n", data); 
})
.catch((error) =>{
    console.error("An error occurred:", error); 
})