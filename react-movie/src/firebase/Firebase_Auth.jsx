import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

const Firebase_Auth = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Lắng nghe trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean-up khi component unmount
  }, [auth]);

  const handleSignout = () => {
    signOut(auth);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Vui lòng nhập email và password");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Cập nhật tên hiển thị người dùng
      await updateProfile(auth.currentUser, { displayName: "Tran Vi" });
      const newUser =userCredential.user;
      const userRef = collection(db, "users");
      await addDoc(userRef, {
        uid: newUser.uid,
        email: newUser.email,
        displayName: newUser.displayName || "Tran Vi",
        createdAt: new Date(),
      });
      // Không cần setUser ở đây, vì onAuthStateChanged sẽ tự cập nhật
    } catch (error) {
      console.error("Đăng ký thất bại:", error.message);
      alert("Đăng ký thất bại: " + error.message);
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
      <h2 className="mb-4 text-lg font-bold text-center">Đăng ký tài khoản</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="w-full p-3 mb-4 border rounded"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 mb-4 border rounded"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded"
        >
          Register
        </button>
      </form>

      {user && (
        <div className="flex items-center mt-5 gap-x-5">
          <span className="font-medium">
            👤 {user.displayName || user.email}
          </span>
          <button
            className="p-3 text-white bg-red-500 rounded"
            onClick={handleSignout}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Firebase_Auth;
