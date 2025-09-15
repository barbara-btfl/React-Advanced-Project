import { useLoaderData } from "react-router-dom";
import { Input, Box } from "@chakra-ui/react";

export const SearchBox = ({ onSearchChange }) => {
  const { events, categories } = useLoaderData();

  const handleSearch = (event) => {
    const zoekterm = event.target.value.toLowerCase();

    const matchingEvents = events.filter((event) => {
      const { title, categoryIds } = event;

      // Filter op titel
      const titleMatch = title.toLowerCase().includes(zoekterm);

      // Filter op category namen
      const categoryMatch = categoryIds?.some((categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category?.name.toLowerCase().includes(zoekterm);
      });

      return titleMatch || categoryMatch;
    });

    onSearchChange(matchingEvents);
  };

  return (
    <Box>
      <Input
        type="text"
        variant="filled"
        maxW="md"
        size="md"
        placeholder="Search for events"
        onChange={handleSearch}
      ></Input>
    </Box>
  );
};
