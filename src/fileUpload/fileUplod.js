
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { appError } from "../modules/utils/appError.js";


export const fileUpload = (folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + "-" + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
       
        if (file.mimetype.startsWith('image')) {
             cb(null, true) 
        } else {
            cb(new appError('image only', 401), false)
        }

    }

    const upload = multer({ storage, fileFilter })
    return upload
}
export const uploadSingleFile=(fieldName,folderName)=>fileUpload(folderName).single(fieldName)

export const uploadMixleFile=(arrayOfFields,folderName)=>fileUpload(folderName).fields(arrayOfFields)
