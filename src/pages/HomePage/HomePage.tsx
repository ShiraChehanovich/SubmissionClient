import React from "react";
import { Container, Title } from "./HomePage.styles";
import SubmissionsDisplay from "../../components/SubmissionsDisplay/SubmissionsDisplay";
import { HomePageTitle } from "./HomePage.consts";

const HomePage: React.FC = () => {
  return (
    <Container>
      <Title>{HomePageTitle}</Title>
      <SubmissionsDisplay />
    </Container>
  );
};

export default HomePage;
