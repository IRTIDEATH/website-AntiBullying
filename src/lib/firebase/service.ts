import { collection, getDoc, doc, getDocs, getFirestore, query, where, addDoc, setDoc, } from 'firebase/firestore'
import app from './init';
import bcrypt from 'bcrypt';
import { useSession } from 'next-auth/react';

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signUp(userData: {
    email: string,
    fullname: string,
    nisn: number,
    password: string,
    role?: string,
}, callback: Function) {
    // query untuk mengecek apakah tabel users ada atau tidak
    const q = query(
        collection(firestore, 'users'),
        where('email', '==', userData.email),
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (data.length > 0) {
        callback(false)
    } else {
        if (!userData.role) {
            userData.role = 'member'
        }
        userData.password = await bcrypt.hash(userData.password, 10)
        await addDoc(collection(firestore, 'users'), userData)
            .then((res) => {
                callback(true, res);
            })
            .catch((error) => {
                callback(false)
                console.log(error);
            })
    }
}

export async function signIn(email: string) {
    const q = query(
        collection(firestore, 'users'),
        where('email', '==', email),
    );

    // dapetin si q nya
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (data) {
        return data[0];
    } else {
        return null
    }
}

export async function userAddInput(userDatas: {
    nisn: number,
    nama: string,
    kasus: string,
}, callback: Function) {        
    
    const q = query(
        collection(firestore, 'datauser'),
        where('nisn', '==', userDatas.nisn)
        // ini harus di tambahkan ya wir yang where where
    );

    const snapshot = await getDocs(q);
    const datas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if(datas.length > 0) {
        callback(false)
    } else {
        await addDoc(collection(firestore, 'datauser'), userDatas)
            .then(() => {
                callback(true)
            })
            .catch((error) => {
                callback(false)
                console.log(error)
            })
    }
}