import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from './firebase-config';

const FirebaseApp = () => {
    const colRef=collection(db,"posts");
    useEffect(()=>{
    getDocs(colRef).then((snapshot)=>{
      let posts=[];
      snapshot.docs.forEach((doc)=>{
        posts.push({
            id:doc.id,
            ...doc.data(),
        })
      })
      console.log(posts);
    });
    },[]);
    return (
        <div>
            
        </div>
    );
};

export default FirebaseApp;