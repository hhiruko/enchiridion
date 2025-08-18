import { useEffect } from "preact/hooks";
import { Landmark, Scroll } from "lucide-preact";
import { Page } from "./Page";
import { ThemeButton } from "./ThemeButton";
import { CollectionStorage } from "../models/CollectionStorage";
import { Enchiridion } from "../models/Enchiridion";

export function App() {
    const enchiridionStorage = new CollectionStorage('enchiridion');

    useEffect(() => {
        async function loadData() {
            if (enchiridionStorage.keys().length === 0) {
                const data = await Enchiridion.load("enchiridion.json");
                Object.entries(data).forEach(([k,v]) => {
                    enchiridionStorage.set(k, v);
                })
            }
        }
        loadData();
    }, []);

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