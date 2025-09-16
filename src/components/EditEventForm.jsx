import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { EventContext } from "../EventContext";

export const EditEventForm = ({ onSubmit, eventId }) => {
  const { categories, events } = useContext(EventContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Use useEffect to set initial values when component mounts
  useEffect(() => {
    const event = events.find((e) => e.id === Number(eventId));
    if (event) {
      // Set all form fields with existing event data
      setTitle(event.title);
      setDescription(event.description);
      setImage(event.image);

      // Convert ISO dates to local date and time
      const startDateTime = new Date(event.startTime);
      const endDateTime = new Date(event.endTime);

      setStartDate(startDateTime.toISOString().split("T")[0]);
      setStartTime(startDateTime.toTimeString().slice(0, 5));
      setEndDate(endDateTime.toISOString().split("T")[0]);
      setEndTime(endDateTime.toTimeString().slice(0, 5));

      setSelectedCategories(event.categoryIds || []);
    }
  }, [eventId, events]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
    const endDateTime = new Date(`${endDate}T${endTime}`).toISOString();

    onSubmit({
      id: Number(eventId), // Include the ID for updating
      title,
      description,
      image,
      categoryIds: selectedCategories,
      startTime: startDateTime,
      endTime: endDateTime,
    });
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
          placeholder={title}
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={description}
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Image</FormLabel>
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder={image}
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Start Date and Time</FormLabel>
        <Stack direction="row" spacing={4}>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder={startDate}
          />
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder={startTime}
          />
        </Stack>
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>End Date and Time</FormLabel>
        <Stack direction="row" spacing={4}>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder={endDate}
          />
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder={endTime}
          />
        </Stack>
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
        Edit event
      </Button>
      <Button
        onClick={() => window.location.reload()}
        colorScheme="gray"
        ml={2}
      >
        Cancel
      </Button>
    </form>
  );
};
