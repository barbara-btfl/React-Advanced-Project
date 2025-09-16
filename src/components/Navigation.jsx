import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddEventForm } from "./AddEventForm";
import { EventContext } from "../EventContext";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { events, setEvents } = useContext(EventContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      const addedEvent = await response.json();

      // Make sure events is an array before spreading
      const currentEvents = Array.isArray(events) ? events : [];
      setEvents([...currentEvents, addedEvent]);
      onClose();
      // Show success toast
      toast({
        title: "Event created",
        description: `${addedEvent.title} has been successfully added`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // navigate(`/event/${addedEvent.id}`); // Uncomment to navigate to the new event page
      navigate(`/`); // Navigate to the main events page
    } catch (error) {
      console.error("Error adding event:", error);
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to add event",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <nav>
      <Stack
        spacing={5}
        direction="row"
        align="center"
        m={4}
        justify={"center"}
      >
        <Link to="/">Events</Link>

        <Link to="/event/1">Event</Link>

        <Button colorScheme="teal" onClick={onOpen}>
          Add event
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add your own event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddEventForm onSubmit={handleAddEvent} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </nav>
  );
};
