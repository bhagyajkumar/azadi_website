import React from 'react';
import { Alert,  CardGroup } from 'react-bootstrap';

const Notifications = ({ news }) => {

  return (
    <CardGroup>
      {news.map((article, index) => (
        <Alert variant='success' className='w-100'>
          <a href={article.url}>{article.title}</a>
          
        </Alert>
        // <Card key={index}>
        //   <Card.Img src={article.imageUrl} alt={article.title} />
        //   <Card.Body>
        //     <Card.Title>{article.title}</Card.Title>
        //     <Card.Subtitle>{article.subtitle}</Card.Subtitle>
        //     <Card.Text>{article.description}</Card.Text>
        //     <a href={article.url} className="btn btn-primary">Read more</a>
        //   </Card.Body>
        // </Card>
      ))}
    </CardGroup>
  );
};

export default Notifications;