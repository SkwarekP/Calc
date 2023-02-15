import classes from "./Keypad.module.scss";
import {KeyPad} from "../App";
import React from "react";


interface Props {
    keyPad: KeyPad[];
    currentVal: (currVal: string) => void;
    onSendOperation: (currOperation: string) => void;
    onSendIsEqual: () => void;
    onSendDelMark: () => void;
    onSendPointMark: () => void;
    onSendOperations: (operation: string) => void;
}

function Keypad({
                    keyPad,
                    currentVal,
                    onSendOperation,
                    onSendIsEqual,
                    onSendDelMark,
                    onSendPointMark,
                    onSendOperations
                }: Props) {


    const digitsR1 = keyPad.filter(item => item.digits)
        .map(item => item.digits)[0]!
        .map(item => item).filter(item => item.row === 1);

    const operationsR1 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 1);

    const digitsR2 = keyPad.filter(item => item.digits)
        .map(item => item.digits)[0]!
        .map(item => item).filter(item => item.row === 2);

    const operationsR2 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 2);

    const digitsR3 = keyPad.filter(item => item.digits)
        .map(item => item.digits)[0]!
        .map(item => item).filter(item => item.row === 3);

    const operationsR3 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 3);

    const digitsR4 = keyPad.filter(item => item.digits)
        .map(item => item.digits)[0]!
        .map(item => item).filter(item => item.row === 4);

    const operationsR4 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 4);

    const operationsR5 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 5);

    const sendDigit = (e: React.MouseEvent<HTMLButtonElement>) => {
        currentVal(e.currentTarget.value)

    }

    const sendOperation = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === "point") {
            onSendPointMark();
        } else onSendOperation(e.currentTarget.value);

    }

    const sendOperations = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === "point") onSendPointMark();
        else {
            onSendOperations(e.currentTarget.value);
            onSendOperation(e.currentTarget.value)
        }
    }


    const sendEqual = (): void => {
        onSendIsEqual();
    }

    const sendDelMark = (): void => {
        onSendDelMark();
    }


    return (
        <div className={classes.keypad__container}>
            <div className={classes.row__flex}>
                {digitsR1.map(item => (
                    <button key={item.id}
                            value={item.keyValue}
                            className={classes.keypad__digit__op_arytmetic}
                            onClick={sendDigit}>{item.keyValue}</button>
                ))}
                {operationsR1.map(item => (
                    <button key={item.id}
                            value={item.type}
                            onClick={sendDelMark}
                            className={` ${classes.keypad__digit__op_arytmetic}  ${classes.keypad__del}`}
                    >{item.keyValue}
                    </button>
                ))}
            </div>
            <div className={classes.row__flex}>
                {digitsR2.map(item => (
                    <button key={item.id}
                            value={item.keyValue}
                            className={classes.keypad__digit__op_arytmetic}
                            onClick={sendDigit}>{item.keyValue}</button>
                ))}
                {operationsR2.map(item => (
                    <button
                        key={item.id}
                        value={item.type}
                        onClick={sendOperations}
                        className={classes.keypad__digit__op_arytmetic}>{item.keyValue}
                    </button>
                ))}
            </div>
            <div className={classes.row__flex}>
                {digitsR3.map(item => (
                    <button key={item.id}
                            value={item.keyValue}
                            className={classes.keypad__digit__op_arytmetic}
                            onClick={sendDigit}>{item.keyValue}</button>
                ))}
                {operationsR3.map(item => (
                    <button
                        value={item.type}
                        onClick={sendOperations}
                        key={item.id}
                        className={classes.keypad__digit__op_arytmetic}>{item.keyValue}
                    </button>
                ))}
            </div>
            <div className={classes.row__flex}>
                {digitsR4.map(item => (
                    <button key={item.id}
                            value={item.keyValue}
                            className={classes.keypad__digit__op_arytmetic}
                            onClick={sendDigit}>{item.keyValue}</button>
                ))}
                {operationsR4.map(item => (
                    <button
                        value={item.type}
                        onClick={sendOperations}
                        key={item.id}
                        className={classes.keypad__digit__op_arytmetic}>{item.keyValue}
                    </button>
                ))}
            </div>
            <div className={classes.row__flex}>
                {operationsR5.map(item => {
                        if (item.type === "clear") {
                            return <button
                                value={item.type}
                                onClick={sendOperation}
                                key={item.id} className={`${classes.keypad__reset} ${classes.keypad__del}`}
                            >{item.keyValue}</button>
                        } else return <button
                            value={item.type}
                            onClick={sendEqual}
                            key={item.id} className={classes.keypad__equal}>
                            {item.keyValue} </button>

                    }
                )}
            </div>
        </div>
    )
}

export default Keypad;