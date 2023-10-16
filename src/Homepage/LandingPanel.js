import "../Homepage/scss/LandingPanel.scss";

const LandingPanel = () => {
    let subheader = "Web Developer";

    return (  
        <div id="landing-wrapper">
            <img id="landing-portrait" alt="portrait"></img>
            <h1>Roxanna Rusbarsky</h1>
            <h2>{subheader}</h2>
        </div>
    );
}
 
export default LandingPanel;
