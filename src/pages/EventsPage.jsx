import React from "react";
import {
  Heading,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Badge,
  Center,
  Text,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { NewEvent } from "./NewEvent";

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

export const EventsPage = () => {
  const { users, events, categories } = useLoaderData();
  console.table(users);
  console.table(events);
  console.table(categories);

  const options = {
    weekday: "long", // vrijdag
    year: "numeric", // 2023
    month: "long", // maart
    day: "numeric", // 10
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <>
      <NewEvent></NewEvent>
      <Center flexDirection="column" gap="1rem" padding="1rem">
        <Heading size="md">List of events</Heading>

        {events.map((event) => {
          const startTime = new Date(event.startTime);
          const endTime = new Date(event.endTime);

          return (
            <Card maxW="sm" key={event.id} className="event">
              <Link to={`event/${event.id}`}>
                <CardHeader>
                  <Heading size="sm">{event.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Image src={event.image} alt={event.title} />
                  <Text>{event.description}</Text>
                  <Text>{startTime.toLocaleTimeString("en-EN", options)}</Text>
                  <Text>{endTime.toLocaleTimeString("en-EN", options)}</Text>
                </CardBody>
                <CardFooter style={{ display: "flex", gap: "0.5rem" }}>
                  {event.categoryIds.map((categoryId) => (
                    <Badge
                      key={categoryId}
                      variant="outline"
                      colorScheme="green"
                    >
                      {categories.find((cat) => cat.id === categoryId)?.name ||
                        "Unknown"}
                    </Badge>
                  ))}
                </CardFooter>
              </Link>
            </Card>
          );
        })}
      </Center>
    </>
  );
};
