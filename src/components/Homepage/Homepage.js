import logo from "../../logo.svg";
import "./Homepage.css";
import { useEffect, useState, useRef } from "react";
import { Router } from "react-router";

const colors = [
    "#282c34",
    "#F82c34",
    "#28fc34",
    "#a8ec34",
    "#2e2cf4",
    "#000080",
    "#FF00FF",
    "#800080",
    "#CD5C5C",
];
const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};
const changeColor = (e, setColor, color) => {
    let newColor = randomColor();
    while (newColor === color) {
        newColor = randomColor();
    }
    // if(e == null) {
    //   setColor(randomColor());
    //   return;
    // }
    e.preventDefault();
    if (e.key === " ") setColor(randomColor());
};

const Homepage = () => {
    const [color, setColor] = useState("#282c34");
    const counter = useRef(0);
    // useEffect(() => {
    //   setTimeout(() => {changeColor(null, setColor)}, 2000)
    // }, [color])
    return (
        <div>
            <div
                onKeyDown={(event) => {
                    changeColor(event, setColor);
                }}
                tabIndex={0}
                className="App-header"
                style={{ backgroundColor: color }}
            >
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>{counter.current++}</p>
                    {/* <input onKeyDown={event => {
          console.log(event.key);
        }}></input> */}
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
            <div className="loader"></div>
        </div>
    );
};

export default Homepage;
