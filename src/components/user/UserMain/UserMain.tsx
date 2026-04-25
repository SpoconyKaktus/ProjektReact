import { useEffect, useState } from "react"
import { CarType } from "../../Main/CarType"
import { data } from "react-router-dom"

export const UserMain = () => {
    const [list, setList] = useState<CarType[]>([])
    const getData = async() => {
        const result = await fetch("http://localhost:3000/cars")
        const data = await result.json()
        if (!data) return
        setList(data)
    }
    useEffect(() => {
        getData()
    }, [])
    const [imie, setImie] = useState("")
    const [email, setEmail] = useState("")
    const [czasWypozyczenia, setCzasWypozyczenia] = useState("")
    const date = new Date().toDateString()

    const rentCar = async(id: number) => {
        const car = list.find(item => item.id === id)
        if (!car) return
        car.data_wypozyczenia = new Date().toISOString().substring(0, 10)
        const returnDate = new Date(car.data_wypozyczenia)
        returnDate.setDate(returnDate.getDate() + parseInt(czasWypozyczenia))
        car.data_zwrotu = returnDate.toISOString().substring(0, 10)
        car.wynajmujacy = { imie: imie, email: email }
        await fetch(`http://localhost:3000/cars/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        })
        getData()
    }
    const returnCar = async(id: number) => {
        const car = list.find(item => item.id === id)
        if (!car) return
        car.data_wypozyczenia = ""
        car.data_zwrotu = ""
        car.wynajmujacy = undefined
        await fetch(`http://localhost:3000/cars/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        })
        getData()
    }     
    return (
        <>
        <h1>User Main</h1>
        <div className="form">
            <h2>Podaj dane</h2>
            <label htmlFor="imie">Imię:</label>
            <input type="text" id="imie" value={imie} onChange={(e) => setImie(e.target.value)} />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="czasWypozyczenia">Czas wypożyczenia (dni):</label>
            <input type="number" id="czasWypozyczenia" value={czasWypozyczenia} onChange={(e) => setCzasWypozyczenia(e.target.value)} />
        </div>
        <main>
        
        <div><h2>Wybierz auto:</h2>
        <ul>
            {list.map((item, index) => 
                <li key={index} style={{color: !item.data_zwrotu? "white": (new Date(item.data_zwrotu) > new Date(date)) ? "white" : "red"}} className={(!item.data_wypozyczenia)? undefined : "niedost"}>
                    Marka: {item.marka} <br /> Model: {item.model} <br /> Rocznik: {item.rocznik} <br /> Cena: {item.cena} 
                    <button onClick={() => rentCar(item.id)} disabled={!!item.data_wypozyczenia}>Wypożycz</button>
                    {(imie === item.wynajmujacy?.imie && email === item.wynajmujacy?.email) && <button onClick={()=>returnCar(item.id)}> Zakończ wynajem</button>}
                </li>
                )}
        </ul>
        </div>
        </main>
        </>
    )
}