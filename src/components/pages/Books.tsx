import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { fetchBooks } from "../../store/actions/books";
import { Button, ButtonGroup, ButtonToolbar, Card } from "react-bootstrap";
import { book } from "../../entity/books.types";
import Moment from "react-moment";
import { RouteComponentProps, StaticContext } from "react-router";

export const ListOfBooks: FC<
  RouteComponentProps<any, StaticContext, unknown>
> = () => {
  // может когда-нибудь мне будет не лень сделать пагинацию с выбором числа итемов
  // а может даже серверную
  const itemsPerList = 5;
  const [currentBooksList, setCurrentBooksList] = useState<Array<book>>([]);
  const books = useAppSelector((a) => a.books.books);
  const dispatch = useAppDispatch();
  // шобы линтер не ругался
  const dispatchBooks = useRef(() => {});
  dispatchBooks.current = () => {
    dispatch(fetchBooks());
  };
  useEffect(() => {
    dispatchBooks.current();
  }, []);
  useEffect(() => {
    if (books.length > 0) {
      nextPage.current(itemsPerList)();
    }
  }, [books]);
  function getBooksLength(): number {
    return books.length;
  }
  // шобы линтер не ругался
  const nextPage = useRef((where: number) => () => {});
  nextPage.current = (where: number) => {
    return () => {
      const currentBooks: Array<book> = [];
      for (let i = where - itemsPerList; i < where; i++) {
        if (books[i]) {
          currentBooks.push(books[i]);
        }
      }
      setCurrentBooksList(currentBooks);
    };
  };
  function buttons(): Array<ReactElement> {
    const buttons: Array<ReactElement> = [];
    const pagination = Math.ceil(getBooksLength() / itemsPerList);
    for (let i = 1; i <= pagination; i++) {
      buttons.push(
        <Button
          key={`${new Date()}_${i}`}
          onClick={nextPage.current(itemsPerList * i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  }
  return (
    <div>
      {currentBooksList.map((a) => (
        <Card key={a.id} className="book-card my-2">
          <Card.Body>
            <Card.Title>{a.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {a.author}
            </Card.Subtitle>
            <Card.Text>
              <Moment format="DD.MM.YYYY">{a.year}</Moment>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      <ButtonToolbar>
        <ButtonGroup>{buttons()}</ButtonGroup>
      </ButtonToolbar>
    </div>
  );
};
