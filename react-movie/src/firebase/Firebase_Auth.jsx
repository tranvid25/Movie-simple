import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
const Firebase_Auth = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser]=useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("vui lòng nhập email và password");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if(userCredential) setUser(user);
      console.log(userCredential.user);
      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.error("Đăng ký thất bại:", error.message);
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
          className="w-full p-3 text-white bg-red-500 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Firebase_Auth;
