import React, {useEffect, useState} from 'react';
import "./assets/style.scss";
import Header from "./components/Header";
import Screen from "./components/Screen";
import Keypad from "./components/Keypad";

interface Digit {
    id: number;
    keyValue: number;
    row: number;
}

interface Operation {
    id: number;
    keyValue: string;
    type: string;
    row: number;
}

export interface KeyPad {
    digits?: Digit[];
    operations?: Operation[];
}

const keyPads: KeyPad[] = [
    {
        digits: [
            {id: 1, keyValue: 7, row: 1},
            {id: 2, keyValue: 8, row: 1},
            {id: 3, keyValue: 9, row: 1},
            {id: 4, keyValue: 4, row: 2},
            {id: 5, keyValue: 5, row: 2},
            {id: 6, keyValue: 6, row: 2},
            {id: 7, keyValue: 1, row: 3},
            {id: 8, keyValue: 2, row: 3},
            {id: 9, keyValue: 3, row: 3},
            {id: 10, keyValue: 0, row: 4}
        ]
    },
    {
        operations: [
            {id: 11, keyValue: ".", type: "point", row: 4},
            {id: 12, keyValue: "/", type: "divide", row: 4},
            {id: 13, keyValue: "del", type: "back", row: 1},
            {id: 14, keyValue: "+", type: "add", row: 2},
            {id: 15, keyValue: "-", type: "minus", row: 3},
            {id: 16, keyValue: "x", type: "multiply", row: 4},
            {id: 17, keyValue: "reset", type: "clear", row: 5},
            {id: 18, keyValue: "=", type: "equal", row: 5}
        ]
    }

]

function App() {

    const [id, setId] = useState<number>(1)


    const [currentValuesBefore, setCurrentValuesBefore] = useState<string>("")
    const [currentValueAfter, setCurrentValuesAfter] = useState<string>("")
    const [currentOperation, setCurrentOperation] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);


    const themeId = (id: number) => {
        setId(id);
    }

    const receiveCurrentValue = (currVal: string) => {

        if (currentOperation !== "") setCurrentValuesAfter(prevState => prevState + currVal);

        else setCurrentValuesBefore(prevState => prevState + currVal);


    }

    const receiveOperationMark = (operation: string) => {
        setCurrentOperation(operation);


        if (operation === "clear") {
            setResult(null);
            setCurrentOperation("");
            setCurrentValuesBefore("");
            setCurrentValuesAfter("");
        }

        if (operation === "minus" && currentValuesBefore.length === 0) {
            setCurrentValuesBefore(prevState => prevState + "-");
            setCurrentOperation("");
        }


    }

    const receiveIsEqualSet = () => {

        if (currentOperation === "add") {
            setResult(+currentValuesBefore + +currentValueAfter)
        } else if (currentOperation === "minus") {
            setResult(+currentValuesBefore - +currentValueAfter);
        } else if (currentOperation === "multiply") {
            setResult(+currentValuesBefore * +currentValueAfter);
        } else if (currentOperation === "divide") {
            setResult(+currentValuesBefore / +currentValueAfter);
        }

    }

    const receiveDelMark = () => {
        if (currentValuesBefore.length !== 0 && currentValueAfter.length === 0) {
            setCurrentValuesBefore(prevState => prevState.slice(0, -1))
        } else if (currentValueAfter.length !== 0 && currentValuesBefore.length !== 0) {
            setCurrentValuesAfter(prevState => prevState.slice(0, -1))
        } else if (currentValueAfter.length === 0 && currentValuesBefore.length === 0) {
            setCurrentOperation("");
            setResult(null);
        }
    }

    const receivePointMark = () => {
        if (currentValuesBefore.length !== 0 && currentValueAfter.length === 0 && !currentValuesBefore.includes(".")) {
            setCurrentValuesBefore(prevState => prevState + ".")
        } else if (currentValueAfter.length !== 0 && currentValuesBefore.length !== 0 && !currentValueAfter.includes(".")) {
            setCurrentValuesAfter(prevState => prevState + ".")
        }
    }

    useEffect(() => {
        if (id === 2) {
            document.body.style.background = "hsl(0, 0%, 90%)";
        } else if (id === 3) {
            document.body.style.background = "hsl(268, 75%, 9%)";
        } else document.body.style.background = "hsl(222, 26%, 31%)";
    }, [id])

    return (
        <div className="container">
            <Header onReceiveThemeId={themeId}/>
            <Screen idTheme={id} currentValueBefore={currentValuesBefore} currentOperation={currentOperation}
                    currentValuesAfter={currentValueAfter} result={result}/>
            <Keypad idTheme={id} keyPad={keyPads} currentVal={receiveCurrentValue}
                    onSendOperation={receiveOperationMark} onSendIsEqual={receiveIsEqualSet}
                    onSendDelMark={receiveDelMark} onSendPointMark={receivePointMark}/>
        </div>
    );
}

export default App;
