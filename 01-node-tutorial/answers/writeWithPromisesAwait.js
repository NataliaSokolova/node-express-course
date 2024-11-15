const { writeFile, readFile } = require("fs").promises; 


async function writer(){
  try{ 
    await writeFile('./content/temp.txt', "This is the first line.\n",'utf8');
    console.log("First line written");
    await writeFile('./content/temp.txt', "This is the second line.\n", { flag: 'a'},'utf8');
    console.log("Sec line written");
    await writeFile('./content/temp.txt', "This is the third line.\n", { flag: 'a'},'utf8');
    console.log("Third line written");

    console.log("File written successfully!");
} catch(err) {
    console.log("Error writing to file", err)
}
}



async function reader() {
  try {
    const data = await readFile("./content/temp.txt", "utf-8");
    console.log("Contents of temp.txt:\n", data);
  } catch (error) {
    console.error("Error reading from file:", error);
  }
}


// Function to call writer, then reader
async function readWrite() {
  await writer();
  await reader();
}

// Call readWrite to start the process
readWrite();