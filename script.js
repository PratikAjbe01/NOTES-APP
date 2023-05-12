const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');

let delarray=[];
showNotes();
// local storage vs session storage
// JSON: JavaScript Object Notation

function addNotes(){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }

    if(addText.value == ''){
        alert('Add your note');
        return;
    }
    
    const noteObj = {
        title: addTitle.value,
        text: addText.value,
    }
    addTitle.value = '';
    addText.value = '';
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function showNotes(){
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for(let i=0; i<notes.length; i++){
        notesHTML += `<div class="note">
        <div class="bottom"><button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
        <button class="archiveNote" id=${i} onclick="archiveNotes(${i})">Archive</button></div>
                   <div class="top"> <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</span><br>
                   <div class="text"><p>${notes[i].text}</p></div></div>
                   
                </div>
        `
    }
    notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    const delObj={
        title:notes[ind].title,
        text:notes[ind].text,
    }
    delarray.push(delObj);
    localStorage.setItem('delnotes', JSON.stringify(delarray));
    
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}
addNoteButton.addEventListener('click', addNotes);
function showDeleteNote(){
    let delHTML = '';
    let delarray = localStorage.getItem('delnotes');
    if(delarray === null){
        return;
    }else{
        delarray = JSON.parse(delarray);
    }
    for(let i=0; i<delarray.length; i++){
        delHTML += `<div class="note">
        <div class="bottom"><button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
        <button class="archiveNote" id=${i} onclick="archiveNotes(${i})">Archive</button></div>
                   <div class="top"> <span class="title">${delarray[i].title === "" ? 'Note' : delarray[i].title}</span><br>
                   <div class="text"><p>${delarray[i].text}</p></div></div>
                   
                </div>
        `
    }
    document.getElementById('delDiv').innerHTML = delHTML;
}

deltePage.addEventListener('click',showDeleteNote);
let deltePage=document.getElementById('History');
deltePage.addEventListener('click',showDeleteNote);
// assignment

/*
1. delete notes: implementation delete array
2. Archieve Notes: implementation archieve array
3. sorting filter, iterate through all the notes, and check 
4. reminder
5. edit note
*/