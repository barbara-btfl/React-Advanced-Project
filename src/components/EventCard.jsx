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

export const EventCard = ({ event }) => {
  const { categories } = useContext(EventContext);

  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <Card height="100%" width="100%" display="flex" flexDirection="column">
      <Link
        to={`/event/${event.id}`}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardHeader>
          <Heading size="sm">{event.title}</Heading>
        </CardHeader>
        <CardBody flex="1">
          <Image src={event.image} alt={event.title} />
          <Text>{event.description}</Text>
          <Text>{startTime.toLocaleTimeString("en-EN", options)}</Text>
          <Text>{endTime.toLocaleTimeString("en-EN", options)}</Text>
        </CardBody>
        <CardFooter
          style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}
        >
          {event.categoryIds?.map((categoryId) => (
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
