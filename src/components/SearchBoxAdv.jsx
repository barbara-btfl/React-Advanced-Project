import { useContext, useState } from "react";
import { EventContext } from "../EventContext";
import {
  Input,
  Box,
  Stack,
  Checkbox,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBoxAdv = ({ onSearchChange }) => {
  const { events, categories } = useContext(EventContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    const matchingEvents = events.filter((event) => {
      // Filter on title
      const titleMatch = event.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      // Filter on selected categories
      const categoryMatch =
        selectedCategories.length === 0 ||
        event.categoryIds?.some((id) => selectedCategories.includes(id));

      return titleMatch && categoryMatch;
    });

    onSearchChange(matchingEvents);
  };

  const handleTitleSearch = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    handleSearch();
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      // Direct handleSearch aanroepen met de nieuwe selectie
      const matchingEvents = events.filter((event) => {
        const titleMatch = event.title
          .toLowerCase()
          .includes(searchText.toLowerCase());

        const categoryMatch =
          newSelection.length === 0 ||
          event.categoryIds?.some((id) => newSelection.includes(id));

        return titleMatch && categoryMatch;
      });

      onSearchChange(matchingEvents);
      return newSelection;
    });
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Text mb={2}>Search by title:</Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            variant="outline"
            colorScheme="cyan.500"
            maxW="md"
            size="md"
            placeholder="Search for events"
            value={searchText}
            onChange={handleTitleSearch}
          />
        </InputGroup>
      </Box>

      <Box>
        <Text mb={2}>Filter by category:</Text>
        <Stack direction="row" spacing={4} justify="center">
          {categories?.map((category) => (
            <Checkbox
              key={category.id}
              isChecked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryToggle(category.id)}
              colorScheme="brand"
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
