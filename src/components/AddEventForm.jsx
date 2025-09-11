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
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { categories } = useContext(EventContext);
  console.table(categories); // Debug log

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, image });
    setTitle("");
    setDescription("");
    setImage("");
    setSelectedCategories([]);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
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
          {categories?.map((category) => (
            <Checkbox
              key={category.id}
              value={category.id}
              isChecked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              colorScheme="teal"
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>

      <Button type="submit" colorScheme="teal">
        Add event
      </Button>
    </form>
  );
};
