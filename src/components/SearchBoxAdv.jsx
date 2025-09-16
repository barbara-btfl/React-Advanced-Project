import { useContext, useState } from "react";
import { EventContext } from "../EventContext";
import { Input, Box, Stack, Checkbox, Text } from "@chakra-ui/react";

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
        <Input
          type="text"
          variant="filled"
          maxW="md"
          size="md"
          placeholder="Search for events"
          value={searchText}
          onChange={handleTitleSearch}
        />
      </Box>

      <Box>
        <Text mb={2}>Filter by category:</Text>
        <Stack direction="row" spacing={4} justify="center">
          {categories?.map((category) => (
            <Checkbox
              key={category.id}
              isChecked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryToggle(category.id)}
              colorScheme="teal"
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
