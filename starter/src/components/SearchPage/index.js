import "../../App.css";
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { BookAPI } from "../../BooksAPI"
import { Book } from "../Book"
import { useUpdateBook } from "../../hook/useUpdateBook";
import { CONST } from "../Const";

export const SearchPage = (props) => {
  const location = useLocation();
  const state = location.state;

  const { DEFAULT_IMAGE, SELF_READ,
    SELF_CURRENTLY_READING,
    SELF_WANT_TO_READ, } = CONST

  const [searchText, setSearchText] = useState("")

  const [books, setBooks] = useState([])
  const { handleChangeOption } = useUpdateBook(BookAPI)

  const imageUrl = (book) => {
    if (book.imageLinks && book.imageLinks.smallThumbnail) { return book.imageLinks.smallThumbnail } return DEFAULT_IMAGE
  }

  const checkSelfSelected = (id) => {
    const currentlyReadingCheck = state.currentReading.find((data) => data.id === id)
    const wantToReadCheck = state.wantToRead.find((data) => data.id === id)
    const readCheck = state.read.find((data) => data.id === id)
    if (wantToReadCheck) {
      return SELF_WANT_TO_READ
    }

    if (currentlyReadingCheck) {
      return SELF_CURRENTLY_READING
    }
    if (readCheck) {
      return SELF_READ
    }
    return ""
  }

  useEffect(() => {
    let isMounted = true;
    const searchBook = async () => {
      const data = await BookAPI.searchBook(searchText)
      if (isMounted) {
        if (!data.error) {
          const dataCovert = data.map((item) => {
            const shelf = checkSelfSelected(item.id)
            return { ...item, shelf }
          })
          setBooks(dataCovert)
        } else {
          setBooks([])
        }
      }
    }
    if (searchText) {
      searchBook()
    }
    else {
      setBooks([])
    }

    return () => { isMounted = false };
  }, [searchText])

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search"> Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchText}
            onChange={(event) => {
              const { value } = event.target
              setSearchText(value)
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((item,i) => (<li key={i}>
            <Book key={i} id={item.id} title={item.title} authors={item.authors} imageUrl={imageUrl(item)} handleChangeOption={handleChangeOption} shelf={item.shelf} />
          </li>))}
        </ol>
      </div>
    </div>
  )
}