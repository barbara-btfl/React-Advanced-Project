import React from "react";
import { Heading, Card, Image, Badge } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

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
      <Heading>List of events</Heading>
      {events.map((event) => {
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);

        return (
          <Card key={event.id} className="event">
            <Link to={`event/${event.id}`}>
              <h2>{event.title}</h2>
            </Link>
            <Image src={event.image} alt={event.title} />
            <p>{event.description}</p>
            <p>{startTime.toLocaleTimeString("en-EN", options)}</p>
            <p>{endTime.toLocaleTimeString("en-EN", options)}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {event.categoryIds.map((categoryId) => (
                <Badge key={categoryId} variant="outline" colorScheme="green">
                  {categories.find((cat) => cat.id === categoryId)?.name ||
                    "Unknown"}
                </Badge>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};
