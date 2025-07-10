import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FirebaseApp = () => {
  const colRef = collection(db, "posts");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [postId, setPostId] = useState("");
  const [posts, setPosts] = useState([]);

  // Lấy dữ liệu real-time
  useEffect(() => {
    const q = query(colRef,orderBy("author"), limit(1)); // Bạn có thể thay limit nếu cần
    const unsub = onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
    return () => unsub();
  }, []);

  const resetFields = () => {
    setTitle("");
    setAuthor("");
    setPostId("");
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!title || !author) return alert("Vui lòng nhập đầy đủ title và author");

    try {
      await addDoc(colRef, {
        title,
        author,
        createdAt: serverTimestamp(),
      });
      resetFields();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleRemovePost = async (e) => {
    e.preventDefault();
    if (!postId) return alert("Vui lòng nhập postId để xóa");

    try {
      const colRefDelete = doc(db, "posts", postId);
      await deleteDoc(colRefDelete);
      resetFields();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!postId || !title || !author)
      return alert("Vui lòng nhập đầy đủ thông tin để cập nhật");

    try {
      const colRefUpdate = doc(db, "posts", postId);
      await updateDoc(colRefUpdate, {
        title,
        author,
        createdAt: serverTimestamp(),
      });
      resetFields();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="p-10 space-y-10">
      {/* Add Post */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <h2 className="mb-3 text-lg font-bold">Add Post</h2>
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            className="w-full p-3 mb-4 border rounded"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-4 border rounded"
            placeholder="Enter your author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit" className="w-full p-3 text-white bg-blue-500 rounded">
            Add post
          </button>
        </form>
      </div>

      {/* Remove Post */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <h2 className="mb-3 text-lg font-bold">Remove Post</h2>
        <form onSubmit={handleRemovePost}>
          <input
            type="text"
            className="w-full p-3 mb-4 border rounded"
            placeholder="Enter postId to delete"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          <button type="submit" className="w-full p-3 text-white bg-red-500 rounded">
            Remove post
          </button>
        </form>
      </div>

      {/* Update Post */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <h2 className="mb-3 text-lg font-bold">Update Post</h2>
        <form onSubmit={handleUpdatePost}>
          <input
            type="text"
            className="w-full p-3 mb-4 border rounded"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-4 border rounded"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-4 border rounded"
            placeholder="Enter postId to update"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          <button type="submit" className="w-full p-3 text-white bg-yellow-500 rounded">
            Update post
          </button>
        </form>
      </div>

      {/* List Post */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <h2 className="mb-3 text-lg font-bold">Posts</h2>
        {posts.length > 0 ? (
          posts.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between pb-2 mb-3 border-b"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">Author: {item.author}</p>
                <p className="text-xs text-gray-400">ID: {item.id}</p>
              </div>
              <button
                onClick={() => setPostId(item.id)}
                className="px-2 py-1 text-sm bg-gray-200 rounded"
              >
                Select
              </button>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default FirebaseApp;
