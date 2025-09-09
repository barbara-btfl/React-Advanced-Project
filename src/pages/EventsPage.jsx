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

  return (
    <>
      <Heading>List of events</Heading>
      <Card className="events-list">
        {events.map((event) => {
          return (
            <div key={event.id} className="event">
              <Link to={`event/${event.id}`}>
                <h2>{event.title}</h2>
              </Link>
              <Image src={event.image} alt={event.title} />
              <p>{event.description}</p>
              <p>{event.startTime}</p>
              <p>{event.endTime}</p>
              <Badge variant="outline" colorScheme="green">
                {categories.find((cat) => cat.id === event.categoryId)?.name}
              </Badge>
            </div>
          );
        })}
      </Card>
    </>
  );
};
