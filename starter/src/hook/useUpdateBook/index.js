
import { useState } from "react"
import { CONST } from "../../components/Const"

const { SELF_READ, SELF_WANT_TO_READ, SELF_CURRENTLY_READING } = CONST

export const useUpdateBook = (BookAPI) => {
    const [isChange, setIsChange] = useState(false)
    const handleChangeOption = async (id, event) => {
        const { value } = event.target
        switch (value) {
            case SELF_READ:
                await BookAPI.updateBook(id, SELF_READ)
                setIsChange(!isChange)
                break;
            case SELF_CURRENTLY_READING:
                await BookAPI.updateBook(id, SELF_CURRENTLY_READING)
                setIsChange(!isChange)
                break;
            case SELF_WANT_TO_READ:
                await BookAPI.updateBook(id, SELF_WANT_TO_READ)
                setIsChange(!isChange)
                break;
            default:
        }

    }
    return {
        handleChangeOption,
        isChange,
    }

}