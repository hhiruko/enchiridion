import { Landmark, Scroll} from "lucide-preact";
import { ThemeButton } from "./ThemeButton";
import { Handbook } from "./Handbook";
import { Storage } from "../models/Storage";
import enchiridion from "../json/enchiridion.json";
import { useEffect, useState } from "preact/hooks";

export function App() {
    const storage = Storage;
    const CREDITS_KEY = 'enchiridion-show-credits';
    const [showCredits, setShowCredits] = useState(JSON.parse(storage.get(CREDITS_KEY)) ?? true);

    const saveShowCredits = (status) => {
        setShowCredits(status);
        storage.set(CREDITS_KEY, status);
    };

    useEffect(() => {
        const creditsContainer = document.querySelector('.credits-container');

        if (!creditsContainer) {
            return;
        }

        if(showCredits) {
            creditsContainer.style.display = 'block';
        } else {
            creditsContainer.style.display = 'none';
        }
    }, [showCredits]);

    return (
        <>
            <header>
                <h1><Landmark width={30} height={30} />The Enchiridion</h1>
                <div id="header-right-container">
                    <ThemeButton />
                    <Scroll onClick={() => {saveShowCredits(!showCredits)}} />
                </div>
            </header>
            
            <div className="credits-container">
                <h2>By Epictetus</h2>
                <p>Written A.D. 135</p>
                <p>Translated by Elizabeth Carter</p>
            </div>

            <Handbook enchiridion={enchiridion} storage={storage} />
        </>
    );
}