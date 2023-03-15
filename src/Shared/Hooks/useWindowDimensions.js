import { useEffect, useState } from "react";


function useWindowDimensions() {
    const [dimensions, setDimensions] = useState([0, 0]);

    function registerResize() {
        setDimensions([window.innerWidth, window.innerHeight]);
    }

    useEffect(() => {
        window.addEventListener('resize', registerResize);
        //catch the initial window size
        registerResize();
        return () => {
            window.removeEventListener('resize', registerResize);
        }
    }, []);
    return dimensions;
}

export default useWindowDimensions;
