import {useState, useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Main from "./Main";
import Locations from './Locations';
import Players from './Players';
import Awards from './Awards';

type NavMode = "top" | "fixed" | "fixed-visible";

const navModeClasses: Record<NavMode, string> = {
    top: "bg-transparent text-cream-50",
    fixed: "-translate-y-full bg-cream-50/95 text-charcoal-900 shadow-md backdrop-blur-sm",
    "fixed-visible": "translate-y-0 bg-cream-50/95 text-charcoal-900 shadow-md backdrop-blur-sm",
};

const navLinkClass = "px-3 py-2 font-sans text-xs font-bold uppercase tracking-widest hover:text-gold-500";

export default function App() {

    const [state, setState] = useState<{ navMode: NavMode, previousTop: number }>(
        {navMode: "top", previousTop: 0}
    )
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', scrollingNavBar);
        return () => window.removeEventListener('scroll', scrollingNavBar);
    })

    function scrollingNavBar() {
        const currentTop = window.scrollY;
        if (currentTop === 0) {
            // at the top
            setState({navMode: "top", previousTop: currentTop});
        } else if (currentTop < state.previousTop) {
            //if scrolling up...
            if (currentTop > 0 && state.navMode !== "top") {
                // make the navbar visible to the user near the top
                setState({navMode: "fixed-visible", previousTop: currentTop});
            } else {
                // otherwise you are at the top and remove the classes during scrolling
                setState({navMode: "top", previousTop: currentTop});
            }
        } else if (currentTop > state.previousTop) {
            //if scrolling down... pull the navbar down with you.
            setState({navMode: "fixed", previousTop: currentTop});
        }
    }

    return (
        <div>
            <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navModeClasses[state.navMode]}`}>
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <Link to="/" className="font-serif text-xl font-bold" onClick={() => setMobileOpen(false)}>
                        The Burritt Cup
                    </Link>
                    <button
                        type="button"
                        className="sm:hidden"
                        aria-label="Toggle navigation"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth={2} className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                    <div className="hidden sm:flex sm:items-center">
                        <Link className={navLinkClass} to="/">Home</Link>
                        <Link className={navLinkClass} to="/locations">Locations</Link>
                        <Link className={navLinkClass} to="/players">Players</Link>
                        <Link className={navLinkClass} to="/awards">Awards</Link>
                    </div>
                </div>
                {mobileOpen &&
                    <div className="flex flex-col bg-cream-50/95 px-6 pb-4 text-charcoal-900 sm:hidden">
                        <Link className={navLinkClass} to="/" onClick={() => setMobileOpen(false)}>Home</Link>
                        <Link className={navLinkClass} to="/locations"
                              onClick={() => setMobileOpen(false)}>Locations</Link>
                        <Link className={navLinkClass} to="/players"
                              onClick={() => setMobileOpen(false)}>Players</Link>
                        <Link className={navLinkClass} to="/awards"
                              onClick={() => setMobileOpen(false)}>Awards</Link>
                    </div>
                }
            </nav>
            <header className="burritt-cup-logo h-[420px] border-b-4 border-gold-500 bg-cover bg-center md:h-[500px]"/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/locations" element={<Locations/>}/>
                <Route path="/players" element={<Players/>}/>
                <Route path="/awards" element={<Awards/>}/>
            </Routes>
            <hr className="mx-auto max-w-5xl border-gold-300"/>
            <footer className="py-12">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6">
                    <a
                        href="https://twitter.com/TheBurrittCup"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-fairway-900 text-cream-50 hover:bg-gold-500"
                        aria-label="The Burritt Cup on Twitter"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path
                                d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
                        </svg>
                    </a>
                    <p className="font-sans text-sm text-sage-500">Copyright &copy; The Burritt
                        Cup {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
}
