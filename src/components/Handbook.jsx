import { useState } from "preact/hooks";
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
        const text = document.querySelector('.page-content').innerText ?? enchiridionStorage.get(page);
        navigator.clipboard.writeText(text).then(() => {
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
                <div className="page-content">
                    {enchiridionStorage.get(page).split("\n\n").map((para, idx) => (
                        <p key={idx}>
                            {para.split("\n").map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    ))}
                </div>
                <button className="copy-button" onClick={handleCopy}><ClipboardCopy /></button>
            </div>
            <div className="pagination-container">
                {page > 1 && (
                    <button className="page-button" onClick={() => handleSetPage(parseInt(page) - 1)}><ArrowLeft /></button>
                )}
                
                {visiblePages.map((p) => (
                    <button key={p} onClick={() => handleSetPage(p)} className={`page-button ${parseInt(p) === parseInt(page) ? "active" : ""}`}>
                        {p}
                    </button>
                ))}

                {page < totalPages && (
                    <button className="page-button" onClick={() => handleSetPage(parseInt(page) + 1)}><ArrowRight /></button>
                )}
            </div>
        </>
    );
}