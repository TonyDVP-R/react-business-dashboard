import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const toggleSearch = () => setIsOpen(prev => !prev);
    const openSearch = () => setIsOpen(true);
    const closeSearch = () => {
        setIsOpen(false);
        setQuery('');
    };

    // Keyboard Shortcut Handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleSearch();
            }
            if (e.key === 'Escape' && isOpen) {
                closeSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <SearchContext.Provider value={{ isOpen, query, setQuery, openSearch, closeSearch }}>
            {children}
        </SearchContext.Provider>
    );
};
