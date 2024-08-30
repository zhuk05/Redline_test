import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import '../../css/SearchPage.css'

const SearchPage = ({user}) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [cache, setCache] = useState({});
    const [savedAddresses, setSavedAddresses] = useState([]);


    const debouncedSearch = useCallback(
        debounce(async (text) => {
            if (cache[text]) {
                setSearchResults(cache[text]);
                return;
            }
            const API_KEY = '96f5e3158146d40e83c69ed11f8313f472df6e50';
            const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token ' + API_KEY
                },
                data: JSON.stringify({query: text})
            };
            try {
                const response = await axios(url, options);
                setSearchResults(response.data.suggestions);
                setCache(prev => ({...prev, [text]: response.data.suggestions}));
            } catch (error) {
                console.error('Error:', error);
            }
        }, 300),
        [cache]
    );

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        debouncedSearch(e.target.value);
    };
    const saveAddress = async (address) => {
        if (savedAddresses.length >= 10) {
            alert('Вы можете сохранить не более 10-ти адресов.');
            return;
        }
        try {
            const response = await axios.post('/api/save-address', {address, user});
            setSavedAddresses([...savedAddresses, response.data]);
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };
    useEffect(() => {
        const fetchSavedAddresses = async () => {
            try {
                const response = await axios.get(`/api/saved-addresses`);
                setSavedAddresses(response.data);
            } catch (error) {
                console.error('Error fetching saved addresses:', error);
            }
        };
        fetchSavedAddresses();
    }, [user]);
    return (
        <div className="main_container">
            <div className="part search_wrapper">
                <input type="text" value={searchText} onChange={handleInputChange} placeholder="Поиск адресса"/>
                <ul className="lists">
                    {searchResults.map((result, index) => (
                    <li className='search_list'
                        key={index}>
                        {result.value}
                        <span>
                            <button className="save_btn"
                                    onClick={() => saveAddress(result.value)}>Сохранить</button>
                        </span>
                    </li>
                ))}
                </ul>
            </div>
            <div className="part save_wrapper">
                <h2>Сохранённые адреса</h2>
                <ol className="lists">
                    {savedAddresses.map((address, index) => (
                        <li key={index}>{address.address}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default SearchPage;
