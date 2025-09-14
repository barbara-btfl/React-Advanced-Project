import {
  Heading,
  Text,
  Card,
  Badge,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../EventContext";

export const EventCard = () => {
  const { users, events, categories } = useContext(EventContext);
  console.table(users);
  console.table(events);
  console.table(categories);

  const startTime = new Date(events.startTime);
  const endTime = new Date(events.endTime);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <Card maxW="sm" key={events.id} className="event">
      <Link to={`event/${events.id}`}>
        <CardHeader>
          <Heading size="sm">{events.title}</Heading>
        </CardHeader>
        <CardBody>
          <Image src={events.image} alt={events.title} />
          <Text>{events.description}</Text>
          <Text>{startTime.toLocaleTimeString("en-EN", options)}</Text>
          <Text>{endTime.toLocaleTimeString("en-EN", options)}</Text>
        </CardBody>
        <CardFooter style={{ display: "flex", gap: "0.5rem" }}>
          {events.categoryIds.map((categoryId) => (
            <Badge key={categoryId} variant="outline" colorScheme="green">
              {categories.find((cat) => cat.id === categoryId)?.name ||
                "Unknown"}
            </Badge>
          ))}
        </CardFooter>
      </Link>
    </Card>
  );
};
