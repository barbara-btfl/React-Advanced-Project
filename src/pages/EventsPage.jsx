export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};
import {
  Heading,
  Center,
  Box,
  Wrap,
  WrapItem,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
// import { SearchBox } from "../components/SearchBox";
import { EventCard } from "../components/EventCard";
import { useState } from "react";
import { SearchBoxAdv } from "../components/SearchBoxAdv";

export const EventsPage = ({ onSelect }) => {
  const { events } = useLoaderData();

  const [searchField, setSearchField] = useState(events);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <Center>
      <Box padding={4} maxW="1400px" w="100%">
        {/* Filter the events based on the searchField */}
        {/* Laat elke EventCard verwijzen naar een EventPage met key={label} */}
        <Box
          padding={4}
          textAlign="center"
          mb={8}
          background="whiteAlpha.800"
          borderRadius="xl"
        >
          <Heading mb="0.5em">List of Events</Heading>
          <SearchBoxAdv
            onSearchChange={(results) => {
              setSearchField(results);
              setHasSearched(true); // markeer dat er gezocht is
            }}
          />
        </Box>

        {searchField.length === 0 && hasSearched ? (
          <Alert status="warning" borderRadius="md" mb={4} colorScheme="purple">
            <AlertIcon />
            No events found that match the criteria.
          </Alert>
        ) : (
          <Wrap spacing="2rem" justify="center" align="stretch">
            {searchField.map((event) => (
              <WrapItem
                key={event.title}
                flex="1"
                basis="300px"
                maxW={{
                  base: "100%", // 1 card on mobile
                  sm: "45%", // 2 cards on small screens
                  md: "30%", // 3 cards on medium screens
                  lg: "23%", // 4 cards on large screens
                  xl: "18%", // 5 cards on extra large screens
                }}
                minW="300px"
              >
                <Box height="100%" width="100%">
                  <EventCard
                    event={event}
                    onClick={() => onSelect(event.title)}
                  />
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </Box>
    </Center>
  );
};
