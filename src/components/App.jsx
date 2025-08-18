import { Landmark, Scroll } from "lucide-preact";
import { Page } from "./Page";
import { ThemeButton } from "./ThemeButton";

export function App() {
    const handleCredits = () => {
        const creditsContainer = document.querySelector('.credits-container');
        if (!creditsContainer) {
            return;
        }

        if(creditsContainer.style.display === 'block') {
            creditsContainer.style.display = 'none';
        } else {
            creditsContainer.style.display = 'block';
        }
    };

    return (
        <>
            <header>
                <h1><Landmark width={30} height={30} />The Enchiridion</h1>
                <div id="header-right-container">
                    <ThemeButton />
                    <Scroll onClick={handleCredits} />
                </div>
            </header>
            <div className="credits-container">
                <h2>By Epictetus</h2>
                <p>Written A.D. 135</p>
                <p>Translated by Elizabeth Carter</p>
            </div>
            <Page />
        </>
    );
}