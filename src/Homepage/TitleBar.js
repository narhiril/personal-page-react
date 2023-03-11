import "./scss/TitleBar.scss";
import placeholder from "../Assets/pfp.jpg";

const TitleBar = ({render}) => {
    if (render) return (
        <div className='title-bar'>
          <div id="nameplate">
            <img id="profile-img" src={placeholder} alt="Profile picture"></img>
            <h1>Roxanna Rusbarsky</h1>
            <h2 className="text-sm">Full Stack Web Developer</h2>
          </div>
        </div>
    );
}

export default TitleBar;
