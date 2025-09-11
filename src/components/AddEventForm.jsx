import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { EventContext } from "../EventContext";

export const AddEventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, image });
    setTitle("");
    setDescription("");
    setImage;
  };
  const { events, users, categories } = useContext(EventContext);

  return (
    <EventContext.Provider value={{ events, users, categories }}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={3}>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your event a title"
            isRequired
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write event description here"
            isRequired
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Image</FormLabel>
          <Input
            value={image}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Insert URL of the image"
            isRequired
          />
        </FormControl>

        {/* Checkboxes om de categorien aan te vinken waar het evenement hij hoort, uit de category variable.
        <FormControl mb={3}>
          <FormLabel>Categories</FormLabel>
          <Stack spacing={5} direction="row">
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                value={category.id}
                colorScheme="teal"
              >
                {category.name}
              </Checkbox>
            ))}
          </Stack>
        </FormControl> */}

        <Button type="submit" colorScheme="teal">
          Add event
        </Button>
      </form>
    </EventContext.Provider>
  );
};
