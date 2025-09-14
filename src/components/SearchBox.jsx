import { useLoaderData } from "react-router-dom";
import { Input, Box } from "@chakra-ui/react";

export const SearchBox = ({ onSearchChange }) => {
  const { events } = useLoaderData();

  const handleSearch = (event) => {
    const zoekterm = event.target.value.toLowerCase();

    const matchingEvents = events.title.filter((event) => {
      const { title, categoryIds } = event.events;

      return (
        title.toLowerCase().includes(zoekterm) ||
        categoryIds.some((item) => item.toLowerCase().includes(zoekterm))
      );
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
