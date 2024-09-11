import "../../../App.css";
import { Book } from "../../Book";

export const BookSelf = (props) => {
    return (<div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.data.map((item) => (<li key={item.id}>
                    <Book key={item.id} id={item.id} title={item.title} authors={item.authors} imageUrl={item.imageLinks.smallThumbnail} handleChangeOption={props.handleChangeOption} shelf={item.shelf} />
                </li>))}
            </ol>
        </div>
    </div>)
}