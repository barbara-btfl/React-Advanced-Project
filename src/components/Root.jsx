import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { EventProvider } from "../EventContext";

export const Root = () => {
  return (
    <EventProvider>
      <Box>
        <Navigation />
        <Outlet />
      </Box>
    </EventProvider>
  );
};
