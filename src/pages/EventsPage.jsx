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
import { Heading, Center } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EventProvider } from "../EventContext";
import { SearchBox } from "../components/SearchBox";
import { EventCard } from "../components/EventCard";

export const EventsPage = () => {
  const { users, events, categories } = useLoaderData();
  console.table(users);
  console.table(events);
  console.table(categories);

  return (
    <EventProvider>
      <Center flexDirection="column" gap="1rem" padding="1rem">
        <Heading size="md">List of events</Heading>

        <SearchBox
          onSearchChange={(results) => {
            setSearchField(results);
            setHasSearched(true); // markeer dat er gezocht is
          }}
        />

        {events.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </Center>
    </EventProvider>
  );
};
