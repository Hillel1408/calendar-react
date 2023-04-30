import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Td } from './components/Td';
import styled from 'styled-components';
import './css/null.css';

const Calendar = styled.div`
    max-width: 640px;
    margin: 0 auto;
    padding-top: 20px;
    border: 2px solid #ebebeb;
    border-radius: 5px;
`;

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 48px 46px 48px;
    align-items: center;
`;

const HeadBtn = styled.button`
    background-color: transparent;
    & svg {
        width: 28px;
        height: 28px;
        & path {
            fill: red;
        }
    }
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 300;
    word-spacing: 5px;
    @media (max-width: 480px) {
        font-size: 26px;
    }
`;

const Date = styled.div`
    padding: 17px 10px 10px 80px;
    background-color: #f6f6f6;
    border-top: 2px solid #ebebeb;
    border-bottom: 2px solid #ebebeb;
    @media (max-width: 480px) {
        padding: 17px 10px 10px 60px;
    }
`;

const CalendarBlock = styled.div`
    display: flex;
    justify-content: space-around;
    font-weight: 600;
`;

const Days = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    font-size: 28px;
    & span {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
            background-color: red;
            border-radius: 50%;
            color: white;
        }
        @media (max-width: 480px) {
            width: 40px;
            height: 40px;
        }
    }
    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const Next = styled.button`
    background-color: transparent;
    &:before {
        content: '';
        display: block;
        width: 14px;
        height: 14px;
        border-top: 3px solid red;
        border-right: 3px solid red;
        transform: rotate(-135deg);
    }
`;

const Prev = styled.button`
    background-color: transparent;
    &:before {
        content: '';
        display: block;
        width: 14px;
        height: 14px;
        border-top: 3px solid red;
        border-right: 3px solid red;
        transform: rotate(45deg);
    }
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 32px;
`;

const MonthYear = styled.span`
    font-size: 24px;
    @media (max-width: 480px) {
        font-size: 18px;
    }
`;

const Table = styled.table`
    margin-top: -2px;
    margin-left: 80px;
    border-collapse: collapse;
    & tr td {
        border: 2px solid #ebebeb;
        width: 80px;
        height: 63px;
        &:first-child {
            border-left: none;
        }
        &:last-child {
            border-right: none;
        }
        & span {
            display: block;
            border: 2px solid white;
            width: 100%;
            height: 100%;
            &.grey {
                background-color: grey;
            }
        }
        &.active span {
            background-color: #ebecfe;
            cursor: grab;
        }
        &.selected span {
            background-color: #b3b7fd;
        }
    }
    @media (max-width: 480px) {
        margin-left: 60px;
    }
`;

const Tasks = styled.div`
    max-height: 775px;
    overflow-y: auto;
    position: relative;
`;

const Time = styled.div`
    padding-left: 16px;
    position: absolute;
    height: 1534px;
    transform: translateY(-12px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & span {
        color: #c0c0c0;
        font-size: 20px;
        font-weight: 600;
        &:first-child {
            transform: translateY(10px);
        }
        &:last-child {
            transform: translateY(-10px);
        }
        @media (max-width: 480px) {
            font-size: 14px;
        }
    }
`;

const Footer = styled.div`
    background-color: #f6f6f6;
    border-top: 2px solid #ebebeb;
    padding: 30px 45px;
    margin-top: -13px;
    z-index: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    & span,
    & button {
        color: red;
        font-size: 28px;
    }
`;

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

    const daysWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

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
        getTasks(arr);
        setCount(count - 7);
    };
    const nextClickHandler = () => {
        const date = new Date();
        date.setDate(date.getDate() + count + 7);
        const arr = getWeek(...func(date));
        setDays(arr);
        getTasks(arr);
        setCount(count + 7);
    };

    const rewriteStorage = (tdIndex, trIndex, clone) => {
        const storageItem = localStorage.getItem('items');
        if (storageItem) {
            const storage = JSON.parse(storageItem);
            const index = storage.findIndex(
                (item) =>
                    item.date === days[currentTd][0].toString() &&
                    item.time === currentTr
            );
            storage[index] = {
                date: days[tdIndex][0].toString(),
                time: trIndex,
                value: clone[trIndex][tdIndex],
            };
            if (clone[currentTr][currentTd]) {
                const index = storage.findIndex(
                    (item) =>
                        item.date === days[tdIndex][0].toString() &&
                        item.time === trIndex
                );
                storage[index] = {
                    date: days[currentTd][0].toString(),
                    time: currentTr,
                    value: clone[currentTr][currentTd],
                };
            }
            localStorage.setItem('items', JSON.stringify([...storage]));
        }
    };

    const dragOverHandler = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('grey');
    };

    const dragLeaveHandler = (e) => {
        e.currentTarget.classList.remove('grey');
    };

    const dragStartHandler = (e, trIndex, tdIndex) => {
        reset();
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
        rewriteStorage(tdIndex, trIndex, clone);
    };

    const getTasks = (arr2) => {
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

    const getWeek = (weekDay, monthDay, month, year) => {
        const countDayOnMonth = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        const result = [];
        let a = monthDay;
        if (weekDay === 0) weekDay = 7;
        for (let i = weekDay; i <= 7; i++) {
            if (a > countDayOnMonth[month]) {
                const count = 7 - i;
                for (let j = 0; j <= count; j++) {
                    result[i - 1] = [new Date(year, month + 1, j + 1), j + 1];
                    i = i + 1;
                }
                break;
            }
            result[i - 1] = [new Date(year, month, a), a];
            a = a + 1;
        }
        for (let i = weekDay - 1; i >= 1; i--) {
            monthDay = monthDay - 1;
            if (monthDay < 1) {
                const count = i;
                let a = countDayOnMonth[month - 1];
                for (let j = 1; j <= count; j++) {
                    result[i - 1] = [new Date(year, month - 1, a), a];
                    a = a - 1;
                    i = i - 1;
                }
                break;
            }
            result[i - 1] = [new Date(year, month, monthDay), monthDay];
        }
        return result;
    };

    useEffect(() => {
        const date = new Date();
        const arr = getWeek(...func(date));
        setDays(arr);
        getTasks(arr);
        setToday(date);
        const closeEsc = (e) => {
            if (e.keyCode === 27) {
                reset();
            }
        };
        window.addEventListener('keydown', closeEsc);
        return () => window.removeEventListener('keydown', closeEsc);
    }, []);

    return (
        <Calendar>
            <Head>
                <Title>Interview Calendar</Title>
                {trActive !== null && tdActive !== null && (
                    <HeadBtn
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
                    </HeadBtn>
                )}
            </Head>
            <Date>
                <CalendarBlock>
                    {daysWeek.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </CalendarBlock>
                <Days>
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
                </Days>
                <Flex>
                    <Next onClick={() => prevClickHandler()}></Next>
                    <MonthYear>{amount}</MonthYear>
                    <Prev onClick={() => nextClickHandler()}></Prev>
                </Flex>
            </Date>
            <Tasks>
                <Time>
                    {time.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </Time>
                <Table>
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
                </Table>
            </Tasks>
            <Footer>
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
            </Footer>
        </Calendar>
    );
}

export default App;
