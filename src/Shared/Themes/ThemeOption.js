import * as themeScript from "./ThemeScript.js";

const ThemeOption = (props) => {
    return (  
        <li key={props.id}>
            <button className="dropdown-item theme-option" 
                    type="button" 
                    onClick={() => themeScript.setTheme(props.value)}
                    value={props.value}>{props.name}</button>
        </li>
    );
}

export default ThemeOption;
