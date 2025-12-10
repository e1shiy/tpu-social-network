import type {Location} from "react-router-dom";

function isCorrectLocation(pathname: string, location: Location): boolean {
    return pathname === location.pathname
}

export default isCorrectLocation;