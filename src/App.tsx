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

    const [theme, setTheme] = useState<string>("grayishBlue")


    const [currentValuesBefore, setCurrentValuesBefore] = useState<string>("")
    const [currentValueAfter, setCurrentValuesAfter] = useState<string>("")
    const [currentOperation, setCurrentOperation] = useState<string>("");
    const [operations, setOperations] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);
    const [isEqualSet, setIsEqualSet] = useState<boolean>(false);


    const themeId = (theme: string) => {
        setTheme(theme);
    }

    const receiveOperations = (operation: string): void => {

        if (operations.length === 0) {
            if (currentOperation === "add" && currentValuesBefore.length !== 0) {
                setResult(+currentValuesBefore + +currentValueAfter)
                setCurrentValuesAfter("")
                setCurrentValuesBefore("")
                setOperations(operation)
            } else if (currentOperation === "minus" && currentValuesBefore.length !== 0) {
                setResult(+currentValuesBefore - +currentValueAfter)
                setCurrentValuesAfter("")
                setCurrentValuesBefore("")
                setOperations(operation)
            } else if (currentOperation === "multiply" && currentValuesBefore.length !== 0) {
                setResult(+currentValuesBefore * +currentValueAfter)
                setCurrentValuesAfter("")
                setCurrentValuesBefore("")
                setOperations(operation)
            } else if (currentOperation === "divide" && currentValuesBefore.length !== 0) {
                setResult(+currentValuesBefore - +currentValueAfter)
                setCurrentValuesAfter("")
                setCurrentValuesBefore("")
                setOperations(operation)

            }
        } else {

            if (operations === "add" && result !== null) {
                setResult(prevState => prevState! + +currentValueAfter)
                setCurrentValuesAfter("")
                setOperations(operation)

            } else if (operations === "minus" && result !== null) {
                setResult(prevState => prevState! - +currentValueAfter)
                setCurrentValuesAfter("")
                setOperations(operation)

            } else if (operations === "multiply" && result !== null) {
                setResult(prevState => prevState! * +currentValueAfter)
                setCurrentValuesAfter("")
                setOperations(operation)

            } else if (operations === "divide" && result !== null) {
                setResult(prevState => prevState! / +currentValueAfter)
                setCurrentValuesAfter("")
                setOperations(operation)
            }

        }
    }

    const receiveCurrentValue = (currVal: string) => {

        if (currentOperation.length !== 0) setCurrentValuesAfter(prevState => prevState + currVal);
        else setCurrentValuesBefore(prevState => prevState + currVal);

    }

    const receiveOperationMark = (operation: string) => {
        setCurrentOperation(operation);


        if (operation === "clear") {
            setResult(null);
            setCurrentOperation("");
            setCurrentValuesBefore("");
            setCurrentValuesAfter("");
            setOperations("");
            setIsEqualSet(false);
        }

        if (operation === "minus" && currentValuesBefore.length === 0 && currentValueAfter.length === 0) {
            setCurrentValuesBefore(prevState => prevState + "-");
            setCurrentOperation("");
        }


    }

    const receiveIsEqualSet = () => {

        if (operations.length === 0) {
            if (currentOperation === "add") {
                setIsEqualSet(true);
                setResult(+currentValuesBefore + +currentValueAfter)
            } else if (currentOperation === "minus") {
                setIsEqualSet(true);
                setResult(+currentValuesBefore - +currentValueAfter);
            } else if (currentOperation === "multiply") {
                setIsEqualSet(true);
                setResult(+currentValuesBefore * +currentValueAfter);
            } else if (currentOperation === "divide") {
                setIsEqualSet(true);
                setResult(+currentValuesBefore / +currentValueAfter);
            }
        } else {
            if (operations === "add" && result !== null) {
                setIsEqualSet(true);
                setResult(prevState => prevState! + +currentValueAfter)
                setCurrentValuesAfter("")

            } else if (operations === "minus" && result !== null) {
                setIsEqualSet(true);
                setResult(prevState => prevState! - +currentValueAfter)
                setCurrentValuesAfter("")

            } else if (operations === "multiply" && result !== null) {
                setIsEqualSet(true);
                setResult(prevState => prevState! * +currentValueAfter)
                setCurrentValuesAfter("")

            } else if (operations === "divide" && result !== null) {
                setIsEqualSet(true);
                setResult(prevState => prevState! / +currentValueAfter)
                setCurrentValuesAfter("")
            }

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
            setOperations("")
            setIsEqualSet(false);
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
        if (theme === "light") {
            document.body.style.background = "hsl(0, 0%, 90%)";
        } else if (theme === "purpleDark") {
            document.body.style.background = "hsl(268, 75%, 9%)";
        } else document.body.style.background = "hsl(222, 26%, 31%)";
    }, [theme])

    return (
        <div className="container" data-theme={theme}>
            <Header onReceiveThemeId={themeId}/>
            <Screen currentValueBefore={currentValuesBefore} currentOperation={currentOperation}
                    currentValuesAfter={currentValueAfter} result={result} isEqualSet={isEqualSet}/>
            <Keypad keyPad={keyPads} currentVal={receiveCurrentValue}
                    onSendOperation={receiveOperationMark} onSendIsEqual={receiveIsEqualSet}
                    onSendDelMark={receiveDelMark} onSendPointMark={receivePointMark}
                    onSendOperations={receiveOperations}/>
        </div>
    );
}

export default App;
