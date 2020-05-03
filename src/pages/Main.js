import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";

function Main() {
  return (
    <div>
      <Hero background-color="navy blue" margin-bottom="red 5px">
        <h1>Employee Directory</h1>
        <h2> Click on carrots to filter by heading or use the search bar to narrow results.</h2>
      </Hero>
      <Container>
        <Row>
          <Col size="md-12">
            {/* Where search bar will go */}
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
