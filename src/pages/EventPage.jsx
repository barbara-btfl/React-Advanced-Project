import { useParams } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../EventContext";
import { Heading, Box, Image, Text, Badge, VStack } from "@chakra-ui/react";

export const EventPage = () => {
  const { eventId } = useParams();
  const { events, categories } = useContext(EventContext);

  console.log("eventId from params:", eventId);
  console.log("events from context:", events);
  console.log("looking for event with id:", Number(eventId));

  const event = events.find((e) => e.id === Number(eventId));

  if (!event) {
    return <Heading>Event not found</Heading>;
  }

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
    <Box maxW="800px" mx="auto" p={4}>
      <VStack spacing={4} align="start">
        <Heading>{event.title}</Heading>
        <Image src={event.image} alt={event.title} />
        <Text>{event.description}</Text>
        <Text>Starts: {startTime.toLocaleTimeString("en-EN", options)}</Text>
        <Text>Ends: {endTime.toLocaleTimeString("en-EN", options)}</Text>
        <Box>
          {event.categoryIds?.map((categoryId) => (
            <Badge
              key={categoryId}
              mr={2}
              variant="outline"
              colorScheme="green"
            >
              {categories.find((cat) => cat.id === categoryId)?.name ||
                "Unknown"}
            </Badge>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};
