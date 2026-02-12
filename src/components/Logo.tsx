import LogoIcon from "../assets/images/logo/logo-dark_ru.svg?react"
import {Link} from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "../constants/routes.ts";

function Logo() {
    return (
        <Link to={MAIN_PAGE_ROUTE} target={"_blank"}>
            <LogoIcon className="h-[2.1875rem] sm:h-[2.35rem] md:h-[2.5rem] lg:h-[2.7rem] xl:h-[2.85rem] 2xl:h-[3.125rem]" />
        </Link>
    )
}

export default Logo