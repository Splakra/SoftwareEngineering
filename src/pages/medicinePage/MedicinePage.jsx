import MedicineItem from '../../components/MedicineItem/MedicineItem';
import './MedicinePage.css';

function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

export default function MedicinePage({meds}) {
    const shelves = chunkArray(meds, 2);

    return (
        <div className="medicine-page">
            <h2 className="medicine-page__title">
                Medikamenten-Schrank
            </h2>
            <div className="medicine-page__content">
                {shelves.map((shelf, index) => (
                    <div className="medicine-shelf" key={index}>
                        <div className="medicine-shelf__items">
                            {shelf.map(medicine => (
                                <MedicineItem
                                    key={medicine.name}
                                    {...medicine}
                                />
                            ))}
                        </div>
                        <div className="medicine-shelf__board"/>
                    </div>
                ))}
            </div>
        </div>
    );
}