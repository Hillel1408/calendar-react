import './App.css';
import './css/null.css';

function App() {
    return (
        <div className="calendar">
            <div className="calendar__head">
                <h1 className="calendar__title">Interview Calendar</h1>
                <button className="calendar__head-btn">
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
            </div>
        </div>
    );
}

export default App;
