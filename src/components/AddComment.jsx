import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ prop }) => {
  const [comment, setComment] = useState({
    comment: {
      comment: "",
      rate: 1,
      elementId: prop.asin,
    },
  });

  useEffect(
    (prevProps) => {
      if (prevProps.asin !== prop.asin) {
        setComment({
          comment: {
            ...comment,
            elementId: prop.asin,
          },
        });
      }
    },
    [comment, prop.asin]
  );

  const sendComment = (e) => {
    e.preventDefault();

    fetch("https://striveschool-api.herokuapp.com/api/comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNmYTJiN2IzOTczNDAwMTRkNWU3ZmYiLCJpYXQiOjE2OTg2NjkyMzksImV4cCI6MTY5OTg3ODgzOX0.ZGN7sB5Mxv0CfNlLEMQMiMF314wMTRzrgyVx1WyPgLk",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Recensione inviata!");
          setComment({
            comment: {
              comment: "",
              rate: 1,
              elementId: prop.asin,
            },
          });
        } else {
          throw new Error("Qualcosa è andato storto");
        }
      })

      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.comment}
            onChange={(e) =>
              setComment({
                comment: {
                  ...comment,
                  comment: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) =>
              setComment({
                comment: {
                  ...comment,
                  rate: e.target.value,
                },
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
