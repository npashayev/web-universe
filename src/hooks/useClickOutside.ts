import React, { useEffect } from "react";

interface Element {
    contentRef: React.RefObject<HTMLElement | null>;
    toggleRef?: React.RefObject<HTMLElement | null>;
    onClickOutside: () => void;
}


const useClickOutside = (elements: Element[]) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            elements.forEach(({ contentRef, toggleRef, onClickOutside }) => {
                if (
                    contentRef.current &&
                    !contentRef.current.contains(e.target as Node) &&
                    (!toggleRef || !toggleRef.current?.contains(e.target as Node))
                ) {
                    onClickOutside();
                }
            });
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [elements]);
};

export default useClickOutside;