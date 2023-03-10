import classes from "./Screen.module.scss";

interface Props {
    currentValueBefore: string,
    currentValuesAfter: string,
    currentOperation: string,
    result: number | null;
    isEqualSet: boolean;
}

function Screen({ currentValueBefore, currentValuesAfter, currentOperation, result, isEqualSet}: Props) {


    return (
        <div className={classes.screen__container}
             // data-theme={idTheme === 2 ? "light" : idTheme === 3 ? "purpleDark" : "grayishBlue"}
            // style={idTheme === 2 ? {background: "hsl(0, 0%, 93%)"} :
            //     idTheme === 3 ? {background: "hsl(268, 71%, 12%)"} :
            //         {background: "hsl(224, 36%, 15%)"}}
        >
            <p
                // data-theme={idTheme === 2 ? "light" : idTheme === 3 ? "purpleDark" : "grayishBlue"}
                // style={idTheme === 2 ? {color: "hsl(60, 10%, 19%)"} :
                // idTheme === 3 ? {color: "hsl(52, 100%, 62%)"} :
                //     {color: "white"}}
            >
                {isEqualSet ? "" :
                    currentValueBefore === "" ? result : currentValueBefore} {isEqualSet ? "" : currentOperation === "" ? "" :
                currentOperation === "add" ? "+" :
                    currentOperation === "minus" ? "-" :
                        currentOperation === "multiply" ? "*" :
                            currentOperation === "divide" ? "/" : ""} {isEqualSet ? "" : currentValuesAfter}
            </p>

            <p
                // data-theme={idTheme === 2 ? "light" : idTheme === 3 ? "purpleDark" : "grayishBlue"}
                // style={idTheme === 2 ? {color: "hsl(60, 10%, 19%)"} :
                // idTheme === 3 ? {color: "hsl(52, 100%, 62%)"} :
                //     {color: "white"}}
            >
                {result === null ?
                    (currentValueBefore.length === 0 && currentOperation === "") ? 0
                        : ((currentOperation === "add") || (currentOperation === "minus") || currentOperation === "multiply" || currentOperation === "divide")
                            ? currentValuesAfter : currentValueBefore
                    : result}
            </p>
        </div>
    )
}

export default Screen;