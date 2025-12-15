import MedicineItem from '../../components/MedicineItem/MedicineItem';
import './MedicinePage.css';

export default function MedicinePage(...[meds]) {

    return (
        <div className={"medicine-page__backdrop"}>
            {meds.map(medicine => <MedicineItem {...medicine} />)}
        </div>
    )
}