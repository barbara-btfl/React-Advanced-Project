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
import { AddEventForm } from "../components/AddEventForm";

export const NewEvent = ({ onAddEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddEvent = (event) => {
    onAddEvent(event); // geeft boek terug naar parent (bijv. LibraryContext)
    onClose(); // sluit modal
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEventForm onSubmit={handleAddEvent} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
