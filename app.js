
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOPRjW61a5RGE_rA3QcNXVRvoXf7DtQjU",
  authDomain: "firstclass-f5f3b.firebaseapp.com",
  databaseURL: "https://firstclass-f5f3b-default-rtdb.firebaseio.com",
  projectId: "firstclass-f5f3b",
  storageBucket: "firstclass-f5f3b.appspot.com",
  messagingSenderId: "903290975532",
  appId: "1:903290975532:web:9d00efe9b558485a016889",
  measurementId: "G-PNSENVSE3P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("btn").addEventListener("click", async () => {
  const input = document.getElementById("inp").value.trim();

  if (input) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: input
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Document successfully added!");

      // Create a new list item with edit and delete buttons
      const listItem = document.createElement("li");
      listItem.textContent = `Name: ${input} `;
      listItem.setAttribute("data-id", docRef.id);

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editItem(listItem));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteItem(listItem));

      listItem.appendChild(editBtn);
      listItem.appendChild(deleteBtn);

      document.getElementById("list").appendChild(listItem);

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding document. Please try again.");
    }
  } else {
    console.log("Input is empty");
    alert("Please enter a name.");
  }
});

async function deleteItem(listItem) {
  const docId = listItem.getAttribute("data-id");

  if (docId) {
    try {
      await deleteDoc(doc(db, "users", docId));
      console.log("Document successfully deleted!");
      alert("Document successfully deleted!");

      // Remove the list item from the DOM
      listItem.remove();
    } catch (e) {
      console.error("Error deleting document: ", e);
      alert("Error deleting document. Please try again.");
    }
  } else {
    alert("No document to delete.");
  }
}

async function editItem(listItem) {
  const docId = listItem.getAttribute("data-id");
  const input = prompt("Enter new name:", listItem.firstChild.textContent.trim().replace("Name: ", ""));

  if (docId && input) {
    try {
      const docRef = doc(db, "users", docId);
      await updateDoc(docRef, { name: input });
      console.log("Document successfully updated!");
      alert("Document successfully updated!");

      // Update the list item text with the new input value
      listItem.firstChild.textContent = `Name: ${input} `;
    } catch (e) {
      console.error("Error updating document: ", e);
      alert("Error updating document. Please try again.");
    }
  } else {
    if (!input) {
      alert("Please enter a new name.");
    } else {
      alert("No document to edit.");
    }
  }
}

