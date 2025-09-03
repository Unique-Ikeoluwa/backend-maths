const fs = require("fs")

fs.writeFile("students.txt" , "Obi Nanbam\nJoshua Promise\nBarnabas Peter\nPero Chinemerem\nSamuel Unique", (e, d) => {
    if(e) {
        console.log("error:", e)
        return
    }
    console.log("Students names added successfully")
})

fs.appendFile("students.txt" , "\nAdegbite Ikeoluwa\nOyineze Stella", (e, d) => {
    if(e) {
        console.log("error:", e)
        return
    }
    console.log("New names added successfully")
})

fs.readFile("./students.txt" , "utf-8", (e, d) => {
    if(e) {
        console.log("error:", e)
        return
    }
    console.log(d)
})

fs.rename("students.txt" , "web2.txt", (e, d) => {
    if(e) {
        console.log("error:", e)
        return
    }
    console.log("The file is renamed successfully")
})

fs.copyFile("web2.txt" , "web2-advance.txt", (e, d) => {
    if(e) {
        console.log("error:", e)
        return
    }
    console.log("File successfully copied")
})

fs.unlink("classB.txt", (e, d) => {
    if(e) {
        console.log("Error: no such file")
        return
    }
    console.log("File deleted successfully")
})

fs.mkdir("backup", (e, d) => {
    if(e) {
        console.log("error:", e)
        return
    }
    console.log("Folder created successfully")
})

fs.rename("web2.txt", "backup/web2.txt", (e, d) => {
    if(e) {
        console.log("error:", e)
        return
    }
    console.log("File moved successfully")
})

let users = []; 

if (!fs.existsSync("users.json")) {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf-8");
  console.log("users.json created with empty array!");
}

function getUsers() {
  const data = fs.readFileSync("users.json", "utf-8");
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf-8");
}

function addUser(id, name, email) {
  const users = getUsers();

  if (users.find(u => u.id === id)) {
    console.log("User with this ID already exists!");
    return;
  }

  users.push({ id, name, email });
  saveUsers(users);

  console.log("User added successfully!");
}

function updateUserEmail(id, newEmail) {
  const users = getUsers();
  const user = users.find(u => u.id === id);

  if (!user) {
    console.log("User not found!");
    return;
  }

  user.email = newEmail;
  saveUsers(users);

  console.log("User email updated successfully!");
}

function deleteUser(id) {
  let users = getUsers();
  const initialLength = users.length;

  users = users.filter(u => u.id !== id);

  if (users.length === initialLength) {
    console.log("User not found!");
    return;
  }

  saveUsers(users);
  console.log("User deleted successfully!");
}

function readAllUsers() {
  const users = getUsers();
  console.log("All Users:");
  console.log(users);
}

addUser(1, "Obi Nanbam", "obi@gmail.com")
updateUserEmail(1, "nanbam@gmail.com")
deleteUser(1)
readAllUsers()

// const folderPath = "./backup"

function logChange(eventType, filename) {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] File "${filename}" was ${eventType}`);
}

// fs.watch(folderPath, (eventType, filename) => {
//   if (filename) {
//     if (eventType === "rename") {
//       const filePath = path.join(folderPath, filename);
//       if (fs.existsSync(filePath)) {
//         logChange("added", filename);
//       } else {
//         logChange("deleted", filename);
//       }
//     } else if (eventType === "change") {
//       logChange("modified", filename);
//     }
//   }
// });
// console.log(`Watching for changes in folder: ${folderPath}`);

fs.watch("./backup", (eventType, filename) => {
  if (filename) {
    if (eventType === "rename") {
      const filePath = path.join("./backup", filename);
      if (fs.existsSync(filePath)) {
        logChange("added", filename);
      } else {
        logChange("deleted", filename);
      }
    } else if (eventType === "change") {
      logChange("modified", filename);
    }
  }
});
console.log("Watching for changes in folder: './backup'");
