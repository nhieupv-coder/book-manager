import { useEffect, useState } from "react";
import "../../App.css";
import { BookAPI } from "../../BooksAPI"
import { BookSelf } from "./BookSelf"
import { Link } from 'react-router-dom';
import { useUpdateBook } from "../../hook/useUpdateBook";
import { CONST } from "../Const"

const { SELF_READ, SELF_WANT_TO_READ, SELF_CURRENTLY_READING } = CONST
export const MainPage = () => {
    const [currentReading, setCurrentReading] = useState([])
    const [wantToRead, setWantToRead] = useState([])
    const [read, setRead] = useState([])
    const { handleChangeOption, isChange } = useUpdateBook(BookAPI)

    useEffect(() => {
        const getData = async () => {
            const data = await BookAPI.getAllBook();
            const read = data.filter((item) => item.shelf === SELF_READ)
            const wantToRead = data.filter((item) => item.shelf === SELF_WANT_TO_READ)
            const currentlyReading = data.filter((item) => item.shelf === SELF_CURRENTLY_READING)
            setRead(read)
            setCurrentReading(currentlyReading)
            setWantToRead(wantToRead)
        }
        getData()
    }, [isChange])



    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookSelf title="Currently Reading" data={currentReading} handleChangeOption={handleChangeOption} />
                    <BookSelf title="Want to Read" data={wantToRead} handleChangeOption={handleChangeOption} />
                    <BookSelf title="Read" data={read} handleChangeOption={handleChangeOption} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search" state={{ currentReading, wantToRead, read }} >Add a book</Link>
            </div>
        </div>
    )
}
