import { useState, useRef } from "preact/hooks";
import { ClipboardCopy, ArrowLeft, ArrowRight } from "lucide-preact";

export function Handbook({enchiridionStorage, storage}) {
    const STORAGE_KEY = 'enchiridion-pagination';

    const [page, setPage] = useState(storage.get(STORAGE_KEY) ?? 1);
    const totalPages = enchiridionStorage.keys().length;

    const handleSetPage = (page) => {
        if(page >= 1 && page <= totalPages) {
            storage.set(STORAGE_KEY, page);
            setPage(page);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(enchiridionStorage.get(page)).then(() => {
            alert("Copied!");
        });
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, page - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const visiblePages = getPageNumbers();

    return (
        <>
            <div className="page-container">
                <p>{enchiridionStorage.get(page)}</p>
                <button onClick={handleCopy}><ClipboardCopy /></button>
            </div>
            <div>
                {page > 1 && (
                    <button onClick={() => handleSetPage(parseInt(page) - 1)}><ArrowLeft /></button>
                )}
                
                {visiblePages.map((p) => (
                    <button key={p} onClick={() => handleSetPage(p)} className={`page-button ${p === page ? "active-page-button" : ""}`}>
                        {p}
                    </button>
                ))}

                {page < totalPages && (
                    <button onClick={() => handleSetPage(parseInt(page) + 1)}><ArrowRight /></button>
                )}
            </div>
        </>
    );
}