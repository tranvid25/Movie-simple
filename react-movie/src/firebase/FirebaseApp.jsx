import { collection, getDocs, addDoc,deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FirebaseApp = () => {
  const colRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [postId,setPostId]=useState("");
  const [posts,setPosts]=useState([]);
  useEffect(() => {
    // getDocs(colRef).then((snapshot) => {
    //   let posts = [];
    //   snapshot.docs.forEach((doc) => {
    //     posts.push({
    //       id: doc.id,
    //       ...doc.data(),
    //     });
    //   });
    //   setPosts(posts)
    // });
    onSnapshot(colRef,(snapshot)=>{
      let posts=[];
      snapshot.docs.forEach((doc)=>{
        posts.push({
          id:doc.id,
          ...doc.data(),
        });
      });
      setPosts(posts);
    })
  }, []);
  const handleAddPost = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title,
      author,
      createdAt:serverTimestamp(),
    })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRemovePost=async(e)=>{
  e.preventDefault();
  const colRefDelete=doc(db,'posts',postId);
  await deleteDoc(colRefDelete);
  }
  const handleUpdatePost=async(e)=>{
    e.preventDefault();
    const colRefUpdate=doc(db,'posts',postId);
    await updateDoc(colRefUpdate,{
      title,
      author,
      createdAt:serverTimestamp(),
    })
  }
  return (
    <div className="p-10">
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your author"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 text-sm font-semibold text-white bg-blue-500 rounded-lg"
          >
            Add post
          </button>
        </form>
      </div>
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <form onSubmit={handleRemovePost}>
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your title"
            name="postId"
            onChange={(e) => setPostId(e.target.value)}
          />

          <button
            type="submit"
            className="w-full p-3 text-sm font-semibold text-white bg-blue-500 rounded-lg"
          >
            remove post
          </button>
        </form>
      </div>
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        {posts.length>0 && posts.map(item=>(<div key={item.id}>
          {item.title}-{item.author}
        </div>))}
      </div>
       <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <form onSubmit={handleUpdatePost}>
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
           <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your author"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your postId"
            name="postId"
            onChange={(e) => setPostId(e.target.value)}
          />
          

          <button
            type="submit"
            className="w-full p-3 text-sm font-semibold text-white bg-blue-500 rounded-lg"
          >
            update post
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirebaseApp;
