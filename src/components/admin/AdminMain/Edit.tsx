import { useEffect, useState } from "react"
import { Link, redirect, useParams } from "react-router-dom"
import { CarType } from "../../Main/CarType"
export const Edit = () => {
    const {id} = useParams<{id : string}>()
    const [data, setData] = useState<CarType | null>(null)

    const [marka, setMarka] = useState("")
    const [model, setModel] = useState("")
    const [rocznik, setRocznik] = useState("0")
    const [cena, setCena] = useState("0")
    const getIdElement = async() => {
        const result = await fetch(`http://localhost:3000/cars/${id}`)
        const data = await result.json()
        setMarka(data?.marka || "")
        setModel(data?.model || "")
        setRocznik(data?.rocznik.toString() || "0")
        setCena(data?.cena.toString() || "0")
        setData(data)
    }
    useEffect(() => {
        getIdElement()
    }, [])
    const editCar = async() => {
        const newCar = {
            marka: marka,
            model: model,
            rocznik: parseInt(rocznik),
            cena: parseFloat(cena),
            dostepnosc: true
        }
        const result = await fetch(`http://localhost:3000/cars/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCar)
        })
        const data = await result.json()
        // if (!data) return
        setData(data)
    }
    return (
        <>
            <div className="form">
            <h1>Edytowanie Auta</h1>
            <label htmlFor="marka">Marka:</label>
            <input type="text" id="marka" value={marka} onChange={(e) => setMarka(e.target.value)} />
            <label htmlFor="model">Model:</label>
            <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
            <label htmlFor="rocznik">Rocznik:</label>
            <input type="number" id="rocznik" value={rocznik} onChange={(e) => setRocznik(e.target.value)} />
            <label htmlFor="cena">Cena:</label>
            <input type="number" id="cena" value={cena} onChange={(e) => setCena(e.target.value)} />
            <button onClick={editCar}>Zapisz</button>
            <Link to="/"><button>Wyjdź</button></Link>
            </div>
        </>
    )
}