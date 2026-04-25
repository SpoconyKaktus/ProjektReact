export type CarType = {
    id: number,
    marka: string,
    model: string,
    rocznik: number,
    cena: number,
    data_wypozyczenia?: string,
    data_zwrotu?: string,
    wynajmujacy?: { imie: string, email: string}
}