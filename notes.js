const chalk = require("chalk");
const fs = require("fs");


const checkDupliNote = (notes, title) => notes.find( note => note.title === title);

const addNotes = (title, body) => {
    // TODO: add notes functionality:
    // loadingNotes:
    const notes = loadNotes();
    const dupliNote = checkDupliNote(notes, title);
    if(!dupliNote){
        newNote = {
            title: title,
            body: body
        };
        notes.push(newNote);
    }else{
        console.log(chalk.bgRedBright("Title already exists!!!"))
    }
    saveNotes(notes);  
};

const removeNotes = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter( note => note.title !== title);
    if(newNotes.length < notes.length){
        console.log(chalk.green.inverse("Note removed!!"));
        saveNotes(newNotes);
    }else{
        console.log(chalk.red.inverse("No note found!!"));
    }
};

const saveNotes = (note) => {
    const jsonData = JSON.stringify(note);
    fs.writeFileSync("notes.json", jsonData);
};

const loadNotes = () => {
    // TODO: load notes functionality:
    // only implementing this means we have the notes.json file
    // what if we don't hence we use try n catch so that we cover if the files doesn't exist!! 
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []; 
        
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(`${chalk.magenta("Your notes here:")}`);
    notes.forEach(note => {
       console.log(`${chalk.bold.green(note.title)}`); 
    });
}

const readNotes = title => {
    const notes = loadNotes();
    const note = checkDupliNote(notes, title);
    // a better way to do it is doing if(note) as undefined means it has no checkDupliNotes 
    // i.e no note of that title hence note means it has something
    if (note) {
        console.log(note.title);
        console.log(note.body);
    }else{
        console.log(chalk.red("Note doesn't exist :("));
    }
} 

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
};
