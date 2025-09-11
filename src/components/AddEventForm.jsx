import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

export const AddEventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author });
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={3}>
        <FormLabel>Titel</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Voer een titel in"
          isRequired
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Auteur</FormLabel>
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Voer een auteur in"
          isRequired
        />
      </FormControl>

      <Button type="submit" colorScheme="teal">
        Opslaan
      </Button>
    </form>
  );
};
