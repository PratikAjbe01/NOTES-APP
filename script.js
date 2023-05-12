const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
let archivearray = [];
let delarray = [];
showNotes();

function addNotes() {
  let notes = localStorage.getItem('notes');
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  if (addText.value == '') {
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

function showNotes() {
  let notesHTML = '';
  let notes = localStorage.getItem('notes');
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  for (let i = 0; i < notes.length; i++) {
    notesHTML += `<div class="note">
        <div class="bottom"><button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
        <button class="archiveNote" id=${i} onclick="archiveNote(${i})">Archive</button></div>
                   <div class="top"> <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</span><br>
                   <div class="text"><p>${notes[i].text}</p></div></div>
                   
                </div>
        `;
  }
  notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind) {
  let notes = localStorage.getItem('notes');
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  const delObj = {
    title: notes[ind].title,
    text: notes[ind].text,
  }
  delarray.push(delObj);
  localStorage.setItem('delnotes', JSON.stringify(delarray));

  notes.splice(ind, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  showNotes();
}

addNoteButton.addEventListener('click', addNotes);

function showDeleteNote() {
  let delHTML = '';
  let delarray = localStorage.getItem('delnotes');
  if (delarray === null) {
    return;
  } else {
    delarray = JSON.parse(delarray);
  }
  for (let i = 0; i < delarray.length; i++) {
    delHTML += `<div class="note">
        <div class="bottom"><button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
        <button class="archiveNote" id=${i} onclick="archiveNote(${i})">Archive</button></div>
                   <div class="top"> <span class="title">${delarray[i].title === "" ? 'Note' : delarray[i].title}</span><br>
                   <div class="text"><p>${delarray[i].text}</p></div></div>
                   
                </div>
        `;
  }
  document.getElementById('delDiv').innerHTML = delHTML;
  document.getElementById('archiveDiv').style.display = 'none';
  document.getElementById('notes').style.display = 'none';
  
}

let deletePage = document.getElementById('History');
deletePage.addEventListener('click', showDeleteNote);

function archiveNote(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    const archiveObj = {
        title: notes[ind].title,
        text: notes[ind].text,
    }
    archivearray.push(archiveObj);
    localStorage.setItem('archive', JSON.stringify(archivearray));
    
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function showArchiveNote(){
    let archiveHTML = '';
    let archivearray = localStorage.getItem('archive');
    if(archivearray === null){
        return;
    }else{
        archivearray= JSON.parse(archivearray);
    }
    for(let i=0; i<archivearray.length; i++){
        archiveHTML += `<div class="note">
        <div class="bottom"><button class="deleteNote" id=${i} onclick="deleteArchive(${i})">Delete</button>
        <button class="unarchiveNote" id=${i} onclick="unarchiveNotes(${i})">Unarchive</button></div>
                   <div class="top"> <span class="title">${archivearray[i].title === "" ? 'Note' : archivearray[i].title}</span><br>
                   <div class="text"><p>${archivearray[i].text}</p></div></div>
                   
                </div>
        `
    }
    document.getElementById('archiveDiv').innerHTML = archiveHTML;
    document.getElementById("notes").style.display = "none";
    document.getElementById("delDiv").style.display = "none";
}
let archivebtn=document.getElementById('archive');
archivebtn.addEventListener('click',showArchiveNote);
function unarchiveNotes(ind){
    let archivearray = localStorage.getItem('archive');
    if(archivearray === null){
        return;
    }else{
        archivearray= JSON.parse(archivearray);
    }
    const noteObj = {
        title: archivearray[ind].title,
        text: archivearray[ind].text,
    }
    archivearray.splice(ind, 1);
    localStorage.setItem('archive', JSON.stringify(archivearray));
    addNotes();
    showArchiveNote();
}

function deleteArchive(ind){
    let archivearray = localStorage.getItem('archive');
    if(archivearray === null){
        return;
    }else{
        archivearray= JSON.parse(archivearray);
    }
    archivearray.splice(ind, 1);
    localStorage.setItem('archive', JSON.stringify(archivearray));
    showArchiveNote();
}
