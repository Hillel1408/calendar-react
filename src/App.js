import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Td } from './components/Td';
import './App.css';
import './css/null.css';

function App() {
    const [tasks, setTasks] = useState('');
    const [trActive, setTrActive] = useState(null);
    const [tdActive, setTdActive] = useState(null);
    const [active, setActive] = useState('');
    const [count, setCount] = useState(0);
    const [days, setDays] = useState('');
    const [amount, setAmount] = useState('');
    const [today, setToday] = useState('');
    const [currentTr, setCurrentTr] = useState('');
    const [currentTd, setCurrentTd] = useState('');

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

    const block = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const func2 = (arr2) => {
        const m = 24;
        const arr = new Array(m);
        for (var i = 0; i < m; i++) {
            arr[i] = ['', '', '', '', '', '', ''];
        }
        const storageItem = localStorage.getItem('items');
        if (storageItem) {
            const storage = JSON.parse(storageItem);
            storage.forEach((element) => {
                const index = arr2.findIndex((item) => item[0] == element.date);
                arr[element.time][index] = element.value;
            });
        }
        setTasks(arr);
    };

    useEffect(() => {
        const date = new Date();
        const arr = getWeek(...func(date));
        setDays(arr);
        func2(arr);
        setToday(date);
        const closeEsc = (e) => {
            if (e.keyCode === 27) {
                reset();
            }
        };
        window.addEventListener('keydown', closeEsc);
        return () => window.removeEventListener('keydown', closeEsc);
    }, []);

    const setValue = (value) => {
        tasks[trActive][tdActive] = value;
        const storageItem = localStorage.getItem('items');
        const item = {
            date: days[tdActive][0].toString(),
            time: trActive,
            value: value,
        };
        if (storageItem) {
            const storage = JSON.parse(storageItem);
            const index = storage.findIndex(
                (item) =>
                    item.date === days[tdActive][0] && item.time === trActive
            );
            if (index === -1) {
                localStorage.setItem(
                    'items',
                    JSON.stringify([...storage, item])
                );
            } else {
                storage.splice(index, 1);
                localStorage.setItem(
                    'items',
                    JSON.stringify(value ? [...storage, item] : [...storage])
                );
            }
        } else localStorage.setItem('items', JSON.stringify([item]));
        reset();
    };

    const getWeek = (weekDay, monthDay, month, year) => {
        const countDayOnMonth = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        const result = [];
        let countMonthDay;

        if (weekDay > 1) {
            countMonthDay = monthDay - (weekDay - 1);
        } else if (weekDay === 0) {
            countMonthDay = monthDay - 6;
        } else {
            countMonthDay = monthDay;
        }
        for (let i = 0; i < 7; i++) {
            if (countMonthDay + i > countDayOnMonth[month]) {
                const count = 7 - i;
                for (let j = 1; j <= count; j++)
                    result.push([new Date(year, month, j), j]);
                break;
            } else {
                result.push([
                    new Date(year, month, countMonthDay + i),
                    countMonthDay + i,
                ]);
            }
        }
        return result;
    };

    const reset = () => {
        setTrActive(null);
        setTdActive(null);
        setActive('');
    };

    const func = (date) => {
        setAmount(`${month[date.getMonth()]}` + ` ${date.getFullYear()}`);
        reset();
        return [
            date.getDay(),
            date.getDate(),
            date.getMonth(),
            date.getFullYear(),
        ];
    };

    const prevClickHandler = () => {
        const date = new Date();
        date.setDate(date.getDate() + count - 7);
        const arr = getWeek(...func(date));
        setDays(arr);
        func2(arr);
        setCount(count - 7);
    };
    const nextClickHandler = () => {
        const date = new Date();
        date.setDate(date.getDate() + count + 7);
        const arr = getWeek(...func(date));
        setDays(arr);
        func2(arr);
        setCount(count + 7);
    };

    const dragOverHandler = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('grey');
    };

    const dragLeaveHandler = (e) => {
        e.currentTarget.classList.remove('grey');
    };

    const dragStartHandler = (e, trIndex, tdIndex) => {
        setCurrentTr(trIndex);
        setCurrentTd(tdIndex);
    };

    const dragEndHandler = (e) => {
        e.currentTarget.classList.remove('grey');
    };

    const dropHandler = (e, trIndex, tdIndex) => {
        e.preventDefault();
        const clone = structuredClone(tasks);
        const a = clone[trIndex][tdIndex];
        clone[trIndex][tdIndex] = clone[currentTr][currentTd];
        clone[currentTr][currentTd] = a;
        setTasks(clone);
        e.currentTarget.classList.remove('grey');
    };

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
                                setValue(value);
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
                    {block.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
                <div className="calendar__days">
                    {days &&
                        today &&
                        days.map((item, index) => (
                            <span
                                key={index}
                                className={classNames(
                                    item[0].toDateString() ===
                                        today.toDateString() && 'active'
                                )}
                            >
                                {item[1]}
                            </span>
                        ))}
                </div>
                <div className="calendar__flex">
                    <button
                        className="calendar__prev"
                        onClick={() => prevClickHandler()}
                    ></button>
                    <span className="calendar__month-year">{amount}</span>
                    <button
                        className="calendar__next"
                        onClick={() => nextClickHandler()}
                    ></button>
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
                            tasks.map((item, trIndex) => (
                                <tr key={trIndex}>
                                    {item.map((td, tdIndex) => (
                                        <Td
                                            key={tdIndex}
                                            td={td}
                                            trIndex={trIndex}
                                            tdIndex={tdIndex}
                                            setTrActive={setTrActive}
                                            setTdActive={setTdActive}
                                            trActive={trActive}
                                            tdActive={tdActive}
                                            setActive={setActive}
                                            dragEndHandler={dragEndHandler}
                                            draggable={true}
                                            dragOverHandler={dragOverHandler}
                                            dragLeaveHandler={dragLeaveHandler}
                                            dragStartHandler={dragStartHandler}
                                            dropHandler={dropHandler}
                                            reset={reset}
                                        />
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="calendar__footer">
                <span>Today</span>
                {active && (
                    <button
                        onClick={() => {
                            setValue('');
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
