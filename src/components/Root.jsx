import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { EventProvider } from "../EventContext";
import backgroundImage from "../assets/background.svg";

export const Root = () => {
  return (
    <EventProvider>
      <Box
        backgroundImage={`url(${backgroundImage})`}
        backgroundRepeat="repeat"
        backgroundSize="25%"
      >
        <Navigation />
        <Outlet />
      </Box>
    </EventProvider>
  );
};
