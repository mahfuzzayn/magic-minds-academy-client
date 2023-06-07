import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title ? title + " - " : ""}Magic Minds Academy`;
    }, []);
};

export default useTitle;
