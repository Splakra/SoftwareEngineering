import './Dashboard.css';

function Dashboard(){
    const weekly = [-3,-2,-1,0,1,2,3].map(value => {
        const today = new Date();
        today.setDate(today.getDate()+value);
        return today;
    })
    const weekdays= ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const weekdaysLong= ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const months= ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const currentDate = new Date();
    return(
        <div>
            <div className="Calendar">
                <div className="Date">
                    {weekdaysLong[currentDate.getDay()] + ", " + currentDate.getDate() + ". " + months[currentDate.getMonth()]}
                </div>
                <div className="Week">
                    {
                        weekly.map(value => (
                            <div className="Weekday">
                                <div className="Days">
                                    {
                                        weekdays[value.getDay()]
                                    }
                                </div>
                                <div className="Number">
                                {value.getDate()}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
);
}

export default Dashboard;