var doctors;
doctors = [
    {
        id: 1,
        imie: 'Andrzej',
        nazwisko: "Kowalski"
    },
    {
        id: 2,
        imie: 'Roman',
        nazwisko: "Kowalski"
    },
    {
        id: 3,
        imie: 'Michał',
        nazwisko: "Kowalski"
    },
    {
        id: 4,
        imie: 'Marek',
        nazwisko: "Kowalski"
    },
    {
        id: 5,
        imie: 'Włodzimierz',
        nazwisko: "Kowalski"
    },
    {
        id: 6,
        imie: 'Ignacy',
        nazwisko: "Kowalski"
    }
]


class Doctors extends React.Component{
    render() {
        return (
            doctors.map(doctor => <p key={doctor.id} className = "doctor">{doctor.imie}</p>)
            
        );
    }
}