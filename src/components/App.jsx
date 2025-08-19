import { useEffect, useState } from "preact/hooks";
import { Landmark, Scroll, Loader } from "lucide-preact";
import { ThemeButton } from "./ThemeButton";
import { CollectionStorage } from "../models/CollectionStorage";
import { Enchiridion } from "../models/Enchiridion";
import { Handbook } from "./Handbook";
import { Storage } from "../models/Storage";

export function App() {
    const storage = Storage;
    const enchiridionStorage = new CollectionStorage('enchiridion');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const filename = "enchiridion.json";

        async function loadData(filename) {
            const fileModified = await Enchiridion.lastModified(filename);
            const modified = storage.get(Enchiridion.MODIFIED_KEY);

            if (!modified || fileModified !== modified || enchiridionStorage.keys().length === 0) {
                const data = await Enchiridion.load(filename);
                Object.entries(data).forEach(([k,v]) => {
                    enchiridionStorage.set(k, v);
                })
            }
            storage.set(Enchiridion.MODIFIED_KEY, fileModified);

            setLoaded(true);
        }

        loadData(filename);
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

    useEffect(() => {
        const creditsContainer = document.querySelector('.credits-container');

        if (!creditsContainer) {
            return;
        }

        if(loaded){
            creditsContainer.style.display = 'none';
        } else {
            creditsContainer.style.display = 'block';
        }
    }, [loaded]);

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

            { loaded ? (
                <Handbook enchiridionStorage={enchiridionStorage} storage={storage} />
            ) : (
                <div className="loading-container">
                    <Loader className="loader-icon" />
                </div>
            )}
        </>
    );
}