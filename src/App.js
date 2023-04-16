import { useEffect, useState } from 'react';
import { Tr } from './components/Tr';
import './App.css';
import './css/null.css';

function App() {
    const [tasks, setTasks] = useState('');
    const [trActive, setTrActive] = useState(null);
    const [tdActive, setTdActive] = useState(null);
    const [active, setActive] = useState('');

    const time = [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '00:00',
    ];

    useEffect(() => {
        const m = 24;
        const arr = new Array(m);
        for (var i = 0; i < m; i++) {
            arr[i] = ['', '', '', '', '', '', ''];
        }
        setTasks(arr);
    }, []);
    return (
        <div className="calendar">
            <div className="calendar__head">
                <h1 className="calendar__title">Interview Calendar</h1>
                {trActive !== null && tdActive !== null && (
                    <button
                        className="calendar__head-btn"
                        onClick={() => {
                            const value = prompt(
                                'Введите ваше событие:',
                                active
                            );
                            if (value !== null) {
                                tasks[trActive][tdActive] = value;
                                setActive(value);
                            }
                        }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.1683 8.35559H17.8633V9.90528H10.1683V17.6715H8.61859V9.90528H0.941406V8.35559H8.61859V0.571533H10.1683V8.35559Z"
                                fill="#333333"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div className="calendar__date">
                <div className="calendar__block">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    <span>S</span>
                </div>
                <div className="calendar__days">
                    <span>25</span>
                    <span>26</span>
                    <span>27</span>
                    <span>28</span>
                    <span className="active">29</span>
                    <span>30</span>
                    <span>31</span>
                </div>
                <div className="calendar__flex">
                    <button className="calendar__prev"></button>
                    <span className="calendar__month-year">March 2019</span>
                    <button className="calendar__next"></button>
                </div>
            </div>
            <div className="calendar__tasks">
                <div className="calendar__time">
                    {time.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
                <table className="calendar__table">
                    <tbody>
                        {tasks &&
                            tasks.map((item, index) => (
                                <Tr
                                    key={index}
                                    item={item}
                                    trIndex={index}
                                    setTrActive={setTrActive}
                                    setTdActive={setTdActive}
                                    trActive={trActive}
                                    tdActive={tdActive}
                                    setActive={setActive}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="calendar__footer">
                <span>Today</span>
                {active && (
                    <button
                        onClick={() => {
                            tasks[trActive][tdActive] = '';
                            setTrActive(null);
                            setTdActive(null);
                            setActive('');
                        }}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
