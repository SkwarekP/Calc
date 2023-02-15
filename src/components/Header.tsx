import classes from './Header.module.scss';
import React, {useState} from "react";

interface Theme {
    id: number;
    theme: string;
    status: boolean;
}

type Props = {
    onReceiveThemeId: (id: string) => void;
}

function Header({onReceiveThemeId}: Props) {
    const [counter, setCounter] = useState<number>(2);
    const [themeSlider, setThemeSlider] = useState<Theme[]>(
        [
            {id: 1, theme: "grayishBlue", status: true},
            {id: 2, theme: "light", status: false},
            {id: 3, theme: "purpleDark", status: false}
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

        onReceiveThemeId(findId!.theme)

    }

    return (
        <header className={classes.header__container}>
            <h2>calc</h2>
            <div className={classes.theme__slider}>
                <h3>theme</h3>
                <div className={classes.slider_container} onClick={changeThemeHandler}>
                    <div
                        className={`${classes.slider} ${
                            themeSlider[1].status ? classes.slider__move2 : themeSlider[2].status ? classes.slider__move3 : classes.slider
                        }`}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header;