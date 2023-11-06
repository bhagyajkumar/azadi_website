import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';

const Notifications = ({ news }) => {

  return (
    <CardGroup>
      {news.map((article, index) => (
        <Card key={index}>
          <Card.Img src={article.imageUrl} alt={article.title} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Subtitle>{article.subtitle}</Card.Subtitle>
            <Card.Text>{article.description}</Card.Text>
            <a href={article.url} className="btn btn-primary">Read more</a>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
};

export default Notifications;