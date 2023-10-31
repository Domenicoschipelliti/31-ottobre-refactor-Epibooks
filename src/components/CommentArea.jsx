import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

import { useState, useEffect } from "react";

const CommentArea = ({ prop }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setisError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  useEffect(
    (prevProps) => {
      if (prevProps.asin !== prop.asin) {
        setIsloading({
          isLoading: true,
        });
      }
    },
    [prop.asin]
  );

  fetch("https://striveschool-api.herokuapp.com/api/comments/" + prop.asin, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNmYTJiN2IzOTczNDAwMTRkNWU3ZmYiLCJpYXQiOjE2OTg2NjkyMzksImV4cCI6MTY5OTg3ODgzOX0.ZGN7sB5Mxv0CfNlLEMQMiMF314wMTRzrgyVx1WyPgLk",
    },
  })
    .then((response) => {
      if (response.ok) {
        setComments({ comments: comments });
        setIsloading({ isLoading: false });
        setisError({ isError: true });
        return response.json();
      } else {
        setIsloading({ isLoading: false });
        setisError({ isError: true });
      }
    })

    .catch((error) => {
      console.log(error);
      setIsloading({ isLoading: false });
      setisError({ isError: true });
    });

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={prop.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
