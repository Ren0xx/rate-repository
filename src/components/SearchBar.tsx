import { SetStateAction, useState } from "react";
import { Searchbar } from "react-native-paper";
import debounce from "lodash/debounce";

type SearchBarProps = {
    searchInput: string;
    handleSearchInputChange: (query: string) => void;
};
const SearchBar = ({
    searchInput,
    handleSearchInputChange,
}: SearchBarProps) => {
    const onChangeSearch = debounce((query: string) => {
        handleSearchInputChange(query);
    }, 500);
    return (
        <Searchbar
            placeholder='Search'
            onChangeText={onChangeSearch}
            value={searchInput}
        />
    );
};

export default SearchBar;
