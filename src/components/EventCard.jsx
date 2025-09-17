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
    <Card
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      boxShadow="md"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={"#00aec5"}
    >
      <Link
        to={`/event/${event.id}`}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardHeader>
          <Heading size="md" color="brand.primary">
            {event.title}
          </Heading>
        </CardHeader>
        <CardBody flex="1">
          <Image mb={4} src={event.image} alt={event.title} />
          <Text color="brand.text">{event.description}</Text>
          <Text color="brand.text" fontSize={"sm"} mt={4} fontWeight="bold">
            {startTime.toLocaleTimeString("en-EN", options)}
          </Text>
          <Text color="brand.text" fontSize={"sm"} fontWeight="bold">
            {endTime.toLocaleTimeString("en-EN", options)}
          </Text>
        </CardBody>
        <CardFooter
          style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}
        >
          {event.categoryIds?.map((categoryId) => (
            <Badge
              key={categoryId}
              variant="outline"
              color="brand.primary"
              outlineColor="brand.primary"
            >
              {categories.find((cat) => cat.id === categoryId)?.name ||
                "Unknown"}
            </Badge>
          ))}
        </CardFooter>
      </Link>
    </Card>
  );
};
