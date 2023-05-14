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
    notesHTML += `<div class="note" >
        <div class="bottom"><i class="deleteNote fa-solid fa-trash" id=${i} onclick="deleteNote(${i})"></i>
        <i class="archiveNote fa-solid fa-bookmark" id=${i} onclick="archiveNote(${i})"></i>
        </div>
        <div class="top">
          <textarea class="title" type="text" id="input-title-${i}" oninput="updateNoteText(${i})">${notes[i].title === "" ? 'Note' : notes[i].title}</textarea><br>
          <div class="text"><textarea id="input-text-${i}" oninput="updateNoteText(${i})">${notes[i].text}</textarea></div>
        </div>
      </div>`;
  }
  
  notesDiv.innerHTML = notesHTML;
  
  // Change background color of notes
  const notesElements = document.querySelectorAll('.note');
  for (let i = 0; i < notesElements.length; i++) {
    if (i % 2 === 0) {
      notesElements[i].style.backgroundColor = "#f4d799";
    } else {
      notesElements[i].style.backgroundColor = "#8cd4cb";
    }
  }
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
    <div class="bottom">
      <i class="clearNote fa-solid fa-trash" id=${i} onclick="clearNote(${i})"></i>
    </div>
    <div class="top">
      <span class="title">${delarray[i].title === "" ? 'Note' : delarray[i].title}</span><br>
      <div class="text">
        <textarea readonly>${delarray[i].text}</textarea>
      </div>
    </div>
  </div>`;
  
  }
  document.getElementById('delDiv').innerHTML = delHTML;
  document.getElementById('input-box').style.display="none";
  
  
}
function clearNote(ind){
  let delarray=localStorage.getItem('delnotes');
  if(delarray===null){
    return; 
  }
  else{
    delarray=JSON.parse(delarray);
  }

  delarray.splice(ind, 1);
  localStorage.setItem('delnotes', JSON.stringify(delarray));

  showDeleteNote();
}
 


let deletePage = document.getElementById('History');
deletePage.addEventListener('click', showDeleteNote);
deletePage.addEventListener("click", function() {
    archiveDiv.style.display = "none";
    delDiv.style.display = "flex";
    notesDiv.style.display = "none";
  });

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
        <div class="bottom"><i class="deleteNote fa-solid fa-trash" id=${i} onclick="deleteArchive(${i})"></i>
        <i class="unarchiveNote fa-solid fa-plus" id=${i} onclick="unarchiveNotes(${i})"></i></div>
                   <div class="top"> <span class="title">${archivearray[i].title === "" ? 'Note' : archivearray[i].title}</span><br>
                   <div class="text"><textarea readonly>${archivearray[i].text}</textarea></div></div>
                   
                </div>
        `
    }
    document.getElementById('archiveDiv').innerHTML = archiveHTML;
    document.getElementById('input-box').style.display="none";

}

let archivebtn=document.getElementById('archive');
archivebtn.addEventListener('click',showArchiveNote);
archivebtn.addEventListener("click", function() {
    delDiv.style.display = "none";
    archiveDiv.style.display = "flex";
    notesDiv.style.display = "none";

  });
function unarchiveNotes(ind) {
  let archivearray = localStorage.getItem("archive");
  if (archivearray === null) {
    return;
  } else {
    archivearray = JSON.parse(archivearray);
  }
  const unarchObj = {
    title: archivearray[ind].title,
    text: archivearray[ind].text,
  };
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  notes.push(unarchObj);
  archivearray.splice(ind, 1);
  localStorage.setItem("archive", JSON.stringify(archivearray));
  localStorage.setItem("notes", JSON.stringify(notes)); // add this line to update the notes data in local storage
  showNotes(); // change this line to call the showNotes() function to update the notes display
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

function updateNoteText(ind) {

  let notes = localStorage.getItem("notes");
  
  if (notes === null) {
  
  return;
  
  } else {
  
  notes = JSON.parse(notes);
  
  }
  const updatedText = document.getElementById(`input-text-${ind}`).value;
  const updatedTitle = document.getElementById(`input-title-${ind}`).value;
  
  notes[ind].text = updatedText;
  notes[ind].title=updatedTitle;
  
  
  
  localStorage.setItem("notes", JSON.stringify(notes));
  
  }
