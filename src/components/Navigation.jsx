import React from "react";
import { Link } from "react-router-dom";
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
import { AddEventForm } from "./AddEventForm";

export const Navigation = ({ onAddEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddEvent = (event) => {
    onAddEvent(event); // geeft boek terug naar parent (bijv. LibraryContext)
    onClose(); // sluit modal
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <li>
          <Link to="/event/1">Event</Link>
        </li>
      </ul>
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
    </nav>
  );
};
