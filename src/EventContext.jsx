import { createContext } from "react";

export const EventContext = createContext({});

EventContext.displayName = "EventContext";

export const EventContextProvider = ({
  children,
  events,
  users,
  categories,
}) => {
  return (
    <EventContext.Provider value={{ events, users, categories }}>
      {children}
    </EventContext.Provider>
  );
};
