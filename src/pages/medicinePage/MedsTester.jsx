import MedicinePage from './MedicinePage';

function MedsTester() {
    const meds = [
        {
            name: "Ibuprofen",
            medicineType: "Pillen",
            storage: 10,
            storageThreshold: 5,
            expiration: new Date().setDate(new Date().getDate() + 100)
        },
        {
            name: "Augentropfen12345",
            medicineType: "Tropfen",
            storage: 300,
            storageThreshold: 20,
            expiration: new Date().setDate(new Date().getDate() + 30)
        },
        {
            name: "Hustensaft",
            medicineType: "ml",
            storage: 20,
            storageThreshold: 100,
            expiration: new Date().setDate(new Date().getDate() + 100)
        },
        {
            name: "Nasenspray",
            medicineType: "ml",
            storage: 15,
            storageThreshold: 5,
            expiration: new Date().setDate(new Date().getDate() - 20)
        },
        {
            name: "EyeyeyWersolldenndiesenNamenlesenkönnen",
            medicineType: "ml",
            storage: 15,
            storageThreshold: 5,
            expiration: new Date().setDate(new Date().getDate() - 20)
        }

    ]
    return (
        <div className="App">
            {MedicinePage(meds)}
        </div>
    );
}

export default MedsTester;
