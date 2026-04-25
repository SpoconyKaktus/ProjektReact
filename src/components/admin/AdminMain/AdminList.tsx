
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AdminInUseList } from "./AdminInUseList"
import { CarType } from "../../Main/CarType"

export const AdminList = () => {
    const [list, setList] = useState<CarType[]>([])
    const [marka, setMarka] = useState("")
    const [model, setModel] = useState("")
    const [rocznik, setRocznik] = useState("0")
    const [cena, setCena] = useState("0")
    
    const getData = async() => {
        const result = await fetch("http://localhost:3000/cars")
        const data = await result.json()
        if (!data) return
        setList(data)
    }
    useEffect(() => {
        getData()
    }, [])
    const addCar = async() => {
        const newCar = {
            id: list.length + 1,
            marka: marka,
            model: model,
            rocznik: parseInt(rocznik),
            cena: parseFloat(cena),
            data_wypozyczenia: "",
            data_zwrotu: "",
        }
        const result = await fetch("http://localhost:3000/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCar)
        })
        const data = await result.json()
        if (!data) return
        setList([...list, data])
        getData()
    }
    const deleteCar = async(id: number) => {
        await fetch(`http://localhost:3000/cars/${id}`, {
            method: "DELETE"
        })
        getData()
    }
    const date = new Date().toDateString()
    return (
        <>
            
            <div className="form">
                <h2>Nowy samochód</h2>
            <label htmlFor="marka">Marka:</label>
            <input type="text" id="marka" value={marka} onChange={(e) => setMarka(e.target.value)} />
            <label htmlFor="model">Model:</label>
            <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
            <label htmlFor="rocznik">Rocznik:</label>
            <input type="number" id="rocznik" value={rocznik} onChange={(e) => setRocznik(e.target.value)} />
            <label htmlFor="cena">Cena:</label>
            <input type="number" id="cena" value={cena} onChange={(e) => setCena(e.target.value)} />
            <button onClick={addCar}>Dodaj samochód</button>
            </div>
            <main>
                <div>
            <h1>Lista Aut</h1>
            <ul>
                {list.map((item, index) => 
                <li key={index} style={{color: !item.data_zwrotu? "white": (new Date(item.data_zwrotu) > new Date(date)) ? "white" : "red"}}>
                    Marka: {item.marka} <br /> Model: {item.model} <br /> Rocznik: {item.rocznik} <br /> Cena: {item.cena} <br /> Dostępny: {!item.data_wypozyczenia ? "Tak" : "Nie"}
                    {(!item.data_wypozyczenia ? <><Link to={`/${item.id}`} className="link">Edytuj</Link><button onClick={() => deleteCar(item.id)}>Usuń</button></> : null)}
                     
                </li>
                )}
            </ul>
            </div>
            <div>
            <AdminInUseList />
            </div>
            </main>
        </>
    )
}