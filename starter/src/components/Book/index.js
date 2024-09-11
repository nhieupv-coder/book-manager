import "../../App.css";

export const Book = ({ id, title, authors, imageUrl, shelf, handleChangeOption }) => {

    const selfs = [{ id: "01", selfName: "currentlyReading", selfDisplayName: "Currently Reading" },
    { id: "02", selfName: "wantToRead", selfDisplayName: "Want to Read" },
    { id: "03", selfName: "read", selfDisplayName: "Read" },
    { id: "04", selfName: "none", selfDisplayName: "None" }]

    return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 192,
                            backgroundImage:
                                `url(${imageUrl})`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select onChange={(e) => handleChangeOption(id, e)} value={shelf}>
                            {selfs.map((item) => (<option key={item.id} value={item.selfName} select={item.selfName === shelf ? "true" : "false"}>
                                {item.selfDisplayName}
                            </option>))}
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
    )
}