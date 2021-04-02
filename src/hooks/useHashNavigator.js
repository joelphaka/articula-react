import {useLocation} from "react-router-dom";

export default function useHashNavigator() {
    const location = useLocation();

    return (elementId) => {
        elementId = (elementId ? `${elementId}` : '').trimLeft('#');

        if (!!location.hash && location.hash === `#${elementId}`) {
            const commentsElement = document.getElementById(elementId);
            commentsElement && commentsElement.scrollIntoView({behavior: "smooth"});
        }
    }
}