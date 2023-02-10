import classes from './Header.module.scss';
import React, {useState} from "react";

interface Theme {
    id: number;
    status: boolean;
}

type Props = {
    onReceiveThemeId: (id: number) => void;
}

function Header({onReceiveThemeId}: Props) {
    const [counter, setCounter] = useState<number>(2);
    const [themeSlider, setThemeSlider] = useState<Theme[]>(
        [
            {id: 1, status: true},
            {id: 2, status: false},
            {id: 3, status: false}
        ]
    )

    const changeThemeHandler = () => {

        const changeState = themeSlider.map((item: Theme) => item.id === counter ? {...item, status: true} : {
            ...item,
            status: false
        })

        if (counter === 3) {
            setCounter(1);
        } else {
            setCounter((prevState) => {
                return prevState + 1;
            })
        }

        setThemeSlider(changeState);
        const findId = changeState.find(item => item.status)

        onReceiveThemeId(findId!.id)

    }

    return (
        <header className={classes.header__container}
                style={themeSlider[1].status ? {color: "hsl(60, 10%, 19%)"}
                    : themeSlider[2].status ? {color: "hsl(52, 100%, 62%)"}
                        : {color: "hsl(0, 0%, 100%)"}}>
            <h2>calc</h2>
            <div className={classes.theme__slider}>
                <h3>theme</h3>
                <div className={classes.slider_container} onClick={changeThemeHandler}
                     style={themeSlider[1].status ? {background: "hsl(0, 5%, 81%)"}
                         : themeSlider[2].status ? {background: "hsl(268, 71%, 12%)"}
                             : {background: "hsl(223, 31%, 20%)"}}>
                    <div className={`${classes.slider} ${
                        themeSlider[1].status ? classes.slider__move2 : themeSlider[2].status ? classes.slider__move3 : classes.slider
                    }`}
                         style={themeSlider[1].status ? {background: "hsl(25, 98%, 40%)"}
                             : themeSlider[2].status ? {background: "hsl(176, 100%, 44%)"}
                                 : {background: "hsl(6, 63%, 50%)"}}/>
                </div>
            </div>
        </header>
    )
}

export default Header;