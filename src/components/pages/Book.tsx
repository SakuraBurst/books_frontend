import { FC, memo, useEffect, useRef, useState } from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { fetchBook } from "../../store/actions/books";
import { Button, Card } from "react-bootstrap";
import Moment from "react-moment";
import { DeleteBookModal } from "../DeleteBookModal";
import { EditBookModal } from "../EditBookModal";

interface ViewBookParams {
  id: string;
}

export const Book: FC<
  RouteComponentProps<ViewBookParams, StaticContext, unknown>
> = memo((props: RouteComponentProps<ViewBookParams>) => {
  const randomPictures: Array<string> = [
    "https://tlgrm.eu/_/stickers/b12/d5f/b12d5fb5-fbd0-3a2d-99fc-2642b586f219/2.jpg",
    "https://static.wikia.nocookie.net/36689b26-ddcb-4ae6-a8c0-33b165fb6bcd",
    "https://coub-anubis-a.akamaized.net/coub_storage/coub/simple/cw_timeline_pic/1209ea8d93d/b040e8b2b7aeb701e436e/1472075717_1397934971_image.jpg",
    "https://coub-anubis-a.akamaized.net/coub_storage/coub/simple/cw_timeline_pic/707e18cc5da/8719cc8272f4a5b57aa64/1472097606_image.jpg",
    "https://coub-anubis-a.akamaized.net/coub_storage/coub/simple/cw_timeline_pic/9c601aca149/f9efb55a108f9c805cf97/1417725120_image.jpg",
    "https://i.ytimg.com/vi/hCpnNCqjULw/maxresdefault.jpg",
    "https://coub-anubis-a.akamaized.net/coub_storage/coub/simple/cw_timeline_pic/90dc2512709/05953e2add74dbac18317/1415193181_image.jpg",
    "http://i.mycdn.me/i?r=AEHujHvw2RjEbemUCNEorZbxYpb_p_9AcN2FmGik64KrkRZtvDpGZlB7IRDnkDh2-EF7Zi9s0CiBOSDmbngC-I-k&fn=external_8",
    "https://user92966.clients-cdnnow.ru/upload/setka-editor/a1c/a1cd53320de0951efc82d79db29afc44.jpg.webp",
    "https://user92966.clients-cdnnow.ru/upload/setka-editor/0fe/0fe5f8ef5cc10ec303873a01d39ec01d.jpg.webp",
    "https://sun9-69.userapi.com/impg/ae9mYIT5fRNtgCKP9m5d8wz6ZgqVkDt5JV1u2A/2jRtGN37Ht8.jpg?size=1920x1080&quality=96&sign=211aaf2a866dde1148f548273cbbe14b&type=album",
    "https://sun9-53.userapi.com/impg/6d_zXlOn97SGWJdbrh9zb5ktYlyOUPQIVbmGTA/OM3iO6poYyQ.jpg?size=1925x863&quality=96&sign=28d45dd729e6e8ab6de0977379f2c039&type=album",
    "https://sun9-19.userapi.com/impg/jmdNejMU9wxKV13PfjAhXjWIS5mLs6cXJ1YRlA/K-XxkGAuzbo.jpg?size=1920x1080&quality=96&sign=fd224e2ad334871c1ad6afb999fb9ab6&type=album",
    "https://sun9-20.userapi.com/impg/SmBVN_ZAYSjpU6xM5VV1gYFRN-dFzBOk0jUTiQ/IH80pVkkFgc.jpg?size=1920x1080&quality=96&sign=4ec042afb016c1e7e493eda5a1c303f3&type=album",
  ];
  const [deleteBook, changeDeleteBook] = useState(false);
  const [editBook, changeEditBook] = useState(false);
  const [pictureIndex, changePictureIndex] = useState(0);
  const book = useAppSelector((a) => a.books.currentBook);
  const id = props.match.params.id;
  const changeIndex = useRef(() =>
    changePictureIndex(Math.round(Math.random() * randomPictures.length - 1))
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    changeIndex.current();
    dispatch(fetchBook(id));
  }, [dispatch, id]);
  return book ? (
    <div>
      <div className="d-flex mt-5 justify-content-end">
        <Button onClick={() => changeDeleteBook(true)} variant="danger">
          Удалить книгу
        </Button>
      </div>
      <DeleteBookModal
        id={id}
        onHide={() => changeDeleteBook(false)}
        show={deleteBook}
        history={props.history}
      />
      <Card className="book-card my-2">
        <Card.Img src={randomPictures[pictureIndex]} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {book.author}
          </Card.Subtitle>
          <Card.Text>
            <Moment format="DD.MM.YYYY">{book.year}</Moment>
          </Card.Text>
          <Button onClick={() => changeEditBook(true)} variant="primary">
            Изменить книгу
          </Button>
          <EditBookModal
            show={editBook}
            onHide={() => changeEditBook(false)}
            book={book}
          />
        </Card.Body>
      </Card>
    </div>
  ) : (
    <div>ъаъа</div>
  );
});
