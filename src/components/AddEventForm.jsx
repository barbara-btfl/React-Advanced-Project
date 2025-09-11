import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Stack,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { EventContext } from "../EventContext";

export const AddEventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { categories } = useContext(EventContext) || {};
  console.log("Categories in form:", categories); // Debug categories
  console.table(categories); // Are categories defined?

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, image });
    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
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
          onChange={(e) => setImage(e.target.value)}
          placeholder="Insert URL of the image"
          isRequired
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Categories</FormLabel>
        <Stack spacing={5} direction="row">
          {Array.isArray(categories) ? (
            categories.map((category) => {
              console.log("Rendering category:", category); // Debug log
              return (
                <Checkbox
                  key={category.id}
                  value={category.id.toString()}
                  colorScheme="teal"
                  onChange={(e) => console.log(e.target.checked, category.name)}
                >
                  {category.name}
                </Checkbox>
              );
            })
          ) : (
            <Text>No categories available</Text> // Fallback text
          )}
        </Stack>
      </FormControl>

      <Button type="submit" colorScheme="teal">
        Add event
      </Button>
    </form>
  );
};
