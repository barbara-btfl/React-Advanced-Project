import {
  Card,
  Badge,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";
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

export const EventCard = () => {
  const { users, events, categories } = useLoaderData();
  console.table(users);
  console.table(events);
  console.table(categories);

  const startTime = new Date(events.startTime);
  const endTime = new Date(events.endTime);

  const options = {
    weekday: "long", // vrijdag
    year: "numeric", // 2023
    month: "long", // maart
    day: "numeric", // 10
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <Link to={`event/${events.id}`}>
      <Card key={events.id} className="event">
        <CardHeader>
          <h2>{events.title}</h2>
        </CardHeader>
        <CardBody>
          <Image src={events.image} alt={events.title} />
          <p>{events.description}</p>
          <p>{startTime.toLocaleTimeString("en-EN", options)}</p>
          <p>{endTime.toLocaleTimeString("en-EN", options)}</p>
        </CardBody>
        <CardFooter>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {events.categoryIds.map((categoryId) => (
              <Badge key={categoryId} variant="outline" colorScheme="green">
                {categories.find((cat) => cat.id === categoryId)?.name ||
                  "Unknown"}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
