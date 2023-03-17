import { useEffect, useState } from "react";


function useWindowDimensions() {
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    function registerResize() {
        setDimensions({width: window.innerWidth, height: window.innerHeight});
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
