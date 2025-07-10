import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

const Firebase_Auth = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Đăng ký
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

      // Cập nhật displayName
      await updateProfile(auth.currentUser, { displayName: "Tran Vi" });

      // Thêm vào Firestore
      const newUser = userCredential.user;
      const userRef = collection(db, "users");
      await addDoc(userRef, {
        uid: newUser.uid,
        email: newUser.email,
        displayName: "Tran Vi",
        createdAt: new Date(),
      });

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Đăng ký thất bại:", error.message);
      alert("Đăng ký thất bại: " + error.message);
    }
  };

  // Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      // Không cần setUser vì đã có onAuthStateChanged
    } catch (error) {
      console.error("Đăng nhập thất bại:", error.message);
      alert("Đăng nhập thất bại: " + error.message);
    }
  };

  // Đăng xuất
  const handleSignout = () => {
    signOut(auth);
  };

  return (
    <>
      {/* Form Đăng ký */}
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
      </div>

      {/* Form Đăng nhập */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mt-10">
        <h2 className="mb-4 text-lg font-bold text-center">Đăng nhập tài khoản</h2>
        <form onSubmit={handleLogin}>
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
            className="w-full p-3 text-white bg-green-500 rounded"
          >
            Login
          </button>
        </form>
      </div>

      {/* Thông tin user & nút Sign Out */}
      {user && (
        <div className="w-full max-w-[500px] mx-auto mt-5 bg-gray-100 rounded p-4 text-center shadow">
          <p className="mb-2 font-medium">
            👤 {user.displayName || user.email}
          </p>
          <button
            className="px-5 py-2 text-white bg-red-500 rounded"
            onClick={handleSignout}
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default Firebase_Auth;
