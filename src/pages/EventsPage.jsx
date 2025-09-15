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
import { EventProvider } from "../EventContext";
import { SearchBox } from "../components/SearchBox";
import { EventCard } from "../components/EventCard";
import { useState } from "react";

export const EventsPage = ({ onSelect }) => {
  const { users, events, categories } = useLoaderData();
  console.table(users);
  console.table(events);
  console.table(categories);

  const [searchField, setSearchField] = useState(events);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <EventProvider>
      <Center>
        <Box padding={4}>
          {/* Filter the recipes based on the searchField */}
          {/* Laat elke receptkaart verwijzen naar een RecipePage met key={label} */}
          <Box padding={4} textAlign="center" mb={8}>
            <Heading mb="0.5em">List of Events</Heading>
            <SearchBox
              onSearchChange={(results) => {
                setSearchField(results);
                setHasSearched(true); // markeer dat er gezocht is
              }}
            />
          </Box>

          {searchField.length === 0 && hasSearched ? (
            <Alert
              status="warning"
              borderRadius="md"
              mb={4}
              colorScheme="purple"
            >
              <AlertIcon />
              No events found that match the criteria.
            </Alert>
          ) : (
            <Wrap spacing="2rem" justify="center">
              {searchField.map((event) => (
                <WrapItem key={event.title}>
                  <EventCard
                    event={event}
                    onClick={() => onSelect(event.title)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Box>
      </Center>
    </EventProvider>
  );
};
