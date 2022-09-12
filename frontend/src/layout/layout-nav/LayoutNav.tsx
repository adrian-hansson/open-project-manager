import { Link, Location, useLocation } from "react-router-dom";

function LayoutNav() {

    const location: Location = useLocation();
    const links: Map<string, string> = new Map<string, string>([
        ["/board", "Board"],
        ["/roadmap", "Roadmap"],
        ["/storymap", "Story Map"],
        ["/issues", "Issues"],
    ]);

    return (
        <nav className="layout-nav">
            <ul>
                <li>
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
                </li>
                {Array
                    .from(links.entries())
                    .map(([link, text]) => {
                        return <li><Link to={link} key={link} className={location.pathname.includes(link) ? "active" : ""}>{text}</Link></li>;
                    })}
            </ul>
        </nav>
    )
}

export default LayoutNav;
