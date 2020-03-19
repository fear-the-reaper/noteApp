const yargs = require("yargs");
const notes = require("./notes.js");
// okay so remember process.argv literall passes the cmd input/command into a string
// yargs is basically the better cooler younger baby brother where it parses the string
//  and gives us additional features!.....take a look

// customizing the yargs version:
// TO UPDATE THE version AND CONFIGUIRING SHIT you must do it before typing another commnand!!!!
yargs.version("1.0.1");

// Adding notes command
yargs.command({
    command: "add",
    describe: "Add a note",
    // for making options for the commands:
    // gives the handler an auto param called argv which is an obj
    // where the opt is a property of it!!
    builder: {
        // option ==> is an obj!
        title: {
            describe: "Title of note",
            // requiring to type the opt:
            demandOption: true,
            // to tell whihc data type it takes!
            type: "string"
        },
        body: {
            describe: "Body of note",
            demandOption: true,
            type: "string"
        }
    },
    handler: argv => {
            notes.addNotes(argv.title, argv.body)
    }
});

// Adding remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "title of removing note",
            demandOption: true,
            type: "string"
        }
    },
    handler: argv => {
        notes.removeNotes(argv.title);
    }
});

// Challenge:
yargs.command({
    command: "list",
    describe: "Listing all the notes user has",
    handler: () => {
        notes.listNotes();
    }
});

yargs.command({
    command: "read",
    describe: "Reading the notes",
    builder: {
        title: {
            describe: "title of the note to read :/",
            demandOption: true,
            type: "string"
        }
    },
    handler: argv => {
        notes.readNotes(argv.title);
    }
});


// console.log(process.argv);
// AFTER CONFIGURING IT DO THIS!!! WHY CUZ IT ACTUALLY MAKES ALL THESE SETTING
// console.log(yargs.argv);
// BETTER WAY TO DO THIS IS BY:
yargs.parse();
