import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../EventContext";
import { EditEventForm } from "../components/EditEventForm";
import {
  Heading,
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

export const EventPage = () => {
  const { eventId } = useParams();
  const { events, categories, users } = useContext(EventContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(eventId));

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Handle successful deletion
      toast({
        title: "Event deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/"); // Navigate back to the main events page
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEditSubmit = async (updatedEvent) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      // Handle successful update
      toast({
        title: "Event updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(0); // Refresh the page
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!event) {
    return <Heading>Event not found</Heading>;
  }
  const creator = users.find((user) => user.id === event.createdBy);

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
        <Box mt={8} p={4} borderTop="1px" borderColor="gray.200" width="100%">
          <HStack spacing={4}>
            <Button colorScheme="teal" onClick={onOpen}>
              Edit event
            </Button>
            <Button colorScheme="gray" onClick={handleDeleteEvent}>
              Delete event
            </Button>
          </HStack>
        </Box>
        <Box mt={8} p={4} borderTop="1px" borderColor="gray.200" width="100%">
          <Heading size="sm" mb={4}>
            Created by:
          </Heading>
          <HStack spacing={4}>
            <Image
              src={creator?.image}
              alt={creator?.name}
              boxSize="50px"
              borderRadius="full"
              objectFit="cover"
            />
            <Text>{creator?.name || "Unknown user"}</Text>
          </HStack>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit {event.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EditEventForm onSubmit={handleEditSubmit} eventId={eventId} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </VStack>
    </Box>
  );
};
