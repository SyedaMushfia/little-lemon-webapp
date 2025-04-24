import { useState, useEffect, useRef } from "react";

function useVisibility() {
    const [isVisible, setIsVisible] = useState(false);

    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting)
            })
        })

        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [targetRef])

    return [isVisible, targetRef];
}

export default useVisibility;