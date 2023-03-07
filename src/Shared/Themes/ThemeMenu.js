import ThemeOption from "./ThemeOption";
import * as themeScript from "./ThemeScript.js";
import { useState } from 'react';

const ThemeMenu = () => {
    const themes = [
        {name: 'Light Theme', value: 'light'},
        {name: 'Dark Theme', value: 'dark'},
        {name: 'Deep Blue Theme', value: 'deepblue'},
        {name: 'Redshift Theme', value: 'redshift'}
    ];

    const [current, setCurrent] = useState("Select Theme");

    function updateThemeMenuText() {
        const pref = themeScript.getPreferredTheme();
        for (const item of themes) {
            if (item['value'] === pref) {
                setCurrent(item['name']);
                return;
            }
        }
        setCurrent("Select Theme");
    }
    return (  
        <div id="theme-menu" className="dropup dropup-center btn-group">
            <button className="btn btn-navbar theme-label" 
                    type="button" 
                    title="Select a theme using the dropdown">
                    {current}
            </button>
            <button className="btn btn-navbar dropdown-toggle dropdown-toggle-split" 
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu" onClick={() => updateThemeMenuText()}>
                {
                    themes.map((theme, index) => 
                        <ThemeOption key={index} id={index} name={theme.name} value={theme.value} />
                    )
                }
            </ul>
        </div>

    );
}
 
export default ThemeMenu;
