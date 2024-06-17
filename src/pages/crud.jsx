import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
// import './Crud.css';

function Crud() {
    const [box, setBox] = useState([]);
    const [ism, setIsm] = useState('');
    const [yosh, setYosh] = useState('');
    const [img, setImg] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState('Malumot kiriting');
    const [show, setShow] = useState(true);

    let malumotlar = collection(db, "crud");
    useEffect(() => {
        onSnapshot(
            malumotlar, (snapshot) => {
                let mallumot = [];
                snapshot.docs.forEach((doc) => {
                    mallumot.push({ ...doc.data(), id: doc.id });
                })
                setBox(mallumot);
            }
        )
    }, []);

    const malumotJonatish = collection(db, 'crud');

    const jonatish = async (e) => {
        if (ism === "" || yosh === "" || img === "") {
            return setError("Toldiring");
        }else{
            e.preventDefault();
            await addDoc(malumotJonatish, {
                id: uuidv4(),
                ism: ism,
                yosh: yosh,
                img: img,
            });
            setIsm("");
            setYosh("");
            setImg("");
        }
        
        const fireBaseMallolish = await getDocs(collection(db, "crud"));
        const malOlishFc = fireBaseMallolish.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
        setBox(malOlishFc);
    };

    const ochirish = async (id) => {
        const docRef = doc(db, 'crud', id);
        await deleteDoc(docRef);
        const fireBaseMallolish = await getDocs(collection(db, "crud"));
        const malOlishFc = fireBaseMallolish.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
        setBox(malOlishFc);
        console.log(id);
        window.location.reload();
    };

    const handleEdit = (id, ism, yosh, img) => {
        setIsm(ism);
        setYosh(yosh);
        setImg(img);
        setId(id);
        setShow(false);
    };

    const handleUpdate = async () => {
        const updateData = doc(db, 'crud', id);
        await updateDoc(updateData, { ism, yosh, img });
        window.location.reload();
    };

    return (
        <div className="container">
            <div className="input">
                <h1>{error}</h1>
                <label>
                    <span>Ism</span>
                    <input value={ism} onChange={(e) => setIsm(e.target.value)} type="text" />
                </label>
                <label>
                    <span>Yosh</span>
                    <input value={yosh} onChange={(e) => setYosh(e.target.value)} type="text" />
                </label>
                <label>
                    <span>Rasm URL</span>
                    <input value={img} onChange={(e) => setImg(e.target.value)} type="text" />
                </label>
                {show ? <button onClick={jonatish}>Jonatish</button> : <button onClick={handleUpdate}>Update</button>}
            </div>
            <div className="bigBox">
                {box.map((mall) => (
                    <div className="box" key={mall.id}>
                        <img src={mall.img} alt="" />
                        <h2>Ismi: {mall.ism}</h2>
                        <h3>Yoshi: {mall.yosh}</h3>
                        <button onClick={() => ochirish(mall.id)}>O'chirish</button>
                        <button onClick={() => handleEdit(mall.id, mall.ism, mall.yosh, mall.img)}>O'zgartirish</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Crud;
