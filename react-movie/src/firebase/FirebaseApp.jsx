import { collection, getDocs,addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FirebaseApp = () => {
  const colRef = collection(db, "posts");
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
  
    });
  }, []);
  const handleAddPost=(e)=>{
    e.preventDefault();
    addDoc(colRef,{
        title,
        author
    }).then(()=>{
        console.log('success');
    }).catch((error)=>{
        console.log(error);
    })
  }
  return (
    <div className="p-10">
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500" placeholder="Enter your title" name="title" onChange={(e)=>setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500" placeholder="Enter your author" name="author" onChange={(e)=>setAuthor(e.target.value)}
          />
        <button type="submit" className="w-full p-3 text-sm font-semibold text-white bg-blue-500 rounded-lg">Add post</button>
        </form>
      </div>
    </div>
  );
};

export default FirebaseApp;
