import { createContext, useState, useEffect } from "react";

export const EventContext = createContext({
  events: [],
  users: [],
  categories: [],
  setEvents: () => {},
  setUsers: () => {},
  setCategories: () => {},
});

EventContext.displayName = "EventContext";

// Loader function for React Router
export const loader = async () => {
  const [usersRes, eventsRes, categoriesRes] = await Promise.all([
    fetch("http://localhost:3000/users"),
    fetch("http://localhost:3000/events"),
    fetch("http://localhost:3000/categories"),
  ]);

  return {
    users: await usersRes.json(),
    events: await eventsRes.json(),
    categories: await categoriesRes.json(),
  };
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loader();
        setUsers(data.users);
        setEvents(data.events);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const value = {
    events,
    users,
    categories,
    setEvents,
    setUsers,
    setCategories,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
