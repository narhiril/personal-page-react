import "./Navbar.scss";
import ThemeOption from "../Shared/ThemeOption";
import * as themeScripts from "../Scripts/themes.js";
import { useState } from 'react';

const Navbar = () => {
    const themes = [
        {name: 'Light Theme', value: 'light'},
        {name: 'Dark Theme', value: 'dark'},
        {name: 'Deep Blue Theme', value: 'deepblue'},
        {name: 'Redshift Theme', value: 'redshift'}
    ];

    const [current, setCurrent] = useState("Select Theme");

    function updateThemeMenuText() {
        const pref = themeScripts.getPreferredTheme();
        for (const item of themes) {
            if (item['value'] === pref) {
                setCurrent(item['name']);
                return;
            }
        }
        setCurrent("Select Theme");
    }

    return ( 
        <div className="navbar navbar-expand-md container-fluid">
            <div id="theme-menu" className="dropdown-center btn-group">
            <button className="btn btn-info theme-label" type="button">{current}</button>
            <button className="btn btn-info dropdown-toggle dropdown-toggle-split" 
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu" onClick={() => updateThemeMenuText()}>
                {
                    themes.map((theme, index) => 
                        <ThemeOption key={index} id={index} name={theme.name} value={theme.value}/>
                    )
                }
            </ul>
            </div>
        </div>
    );
}

export default Navbar;
