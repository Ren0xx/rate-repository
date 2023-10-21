import { SetStateAction, useState } from "react";
import { Searchbar } from "react-native-paper";

type SearchBarProps = {
    searchInput: string;
    handleSearchInputChange: (query: string) => void;
};
const SearchBar = ({
    searchInput,
    handleSearchInputChange,
}: SearchBarProps) => {
    const onChangeSearch = (query: string) => {
        handleSearchInputChange(query);
    };
    return (
        <Searchbar
            placeholder='Search'
            onChangeText={onChangeSearch}
            value={searchInput}
        />
    );
};

export default SearchBar;
