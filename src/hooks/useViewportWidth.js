import { useState, useEffect } from "react";

function useViewportWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const fetchWidth = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', fetchWidth);

        return () => window.removeEventListener('resize', fetchWidth);
    }, [])

    return width;
}

export default useViewportWidth;