import { Card } from "react-bootstrap";
// import CommentArea from './CommentArea'

const SingleBook = ({ libri, book, selected, changeSelectedBook }) => {
  // state = {
  //   selected: false,
  // }
  const checkSelected = (value) => (value === selected ? "selected" : "");

  return (
    <>
      <Card
        className={checkSelected}
        // onClick={() => this.setState({ selected: !this.state.selected })}
        onClick={() => changeSelectedBook(book.asin)}
      >
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{book.title}</Card.Title>
        </Card.Body>
      </Card>
      {/* {this.state.selected && <CommentArea asin={this.props.book.asin} />} */}
    </>
  );
};

export default SingleBook;
