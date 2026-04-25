import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CarType } from "../../Main/CarType"
export const AdminInUseList = () => {
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
    const date = new Date().toDateString()
    return (
        <>
            <h1>Lista Wypożyczonych Aut</h1>
            <ul>
                {list.map((item, index) => (!!item.data_wypozyczenia)?
                <li key={index} style={{color: !item.data_zwrotu? "white": (new Date(item.data_zwrotu) > new Date(date)) ? "white" : "red"}}>
                    Marka: {item.marka} <br /> Model: {item.model} <br /> Rocznik: {item.rocznik} <br /> Cena: {item.cena} <br />Wynajęty od {item.data_wypozyczenia} do {item.data_zwrotu} <br /> wynajmujacy: {item.wynajmujacy ? item.wynajmujacy.imie + " (" + item.wynajmujacy.email + ")" : "Brak"}
                </li>: null)}
            </ul>
            
        </>
    )
}