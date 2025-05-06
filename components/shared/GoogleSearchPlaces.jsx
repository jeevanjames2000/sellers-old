import React, { useState, useEffect } from 'react';

const GoogleSearchPlaces = ({ apiKey, placeholder, onPlaceSelect, location }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSuggestions = async (query) => {
        if (!query || query === location) {
            setSuggestions([]);
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                    query
                )}&key=${apiKey}&types=geocode`
            );
            const data = await response.json();
            console.log('googledata', data)
            if (data.predictions) {
                setSuggestions(data.predictions);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (place) => {
        setInput(place.description);
        setSuggestions([]);
        onPlaceSelect && onPlaceSelect(place);
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => fetchSuggestions(input), 300);
        return () => clearTimeout(debounceTimer);
    }, [input]);

    useEffect(() => {
        setInput(location);
    }, [location]);

    console.log('suggestions', suggestions)
    return (
        <div className="relative w-full">
            <input
                className="w-full h-12 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={input}
                placeholder={placeholder || 'Search for a place'}
                onChange={(e) => {
                    const text = e.target.value;
                    // if (!text) {
                    //     setSuggestions([]);
                    //     onPlaceSelect('');
                    // }
                    setInput(text);
                }}
            />
            {loading && <div className="absolute right-4 top-3 spinner-border animate-spin w-6 h-6 border-2 rounded-full border-blue-400"></div>}
            {suggestions.length > 0 && (
                <div className="absolute top-14 left-0 w-full bg-white shadow-lg z-50 rounded-md max-h-48 overflow-auto">
                    {suggestions.map((item) => (
                        <div
                            key={item.place_id}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(item)}
                        >
                            <p className="text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GoogleSearchPlaces;
