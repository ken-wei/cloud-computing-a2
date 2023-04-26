import axios from 'axios'

class BookmarkService {
    registerNewBookmark(bookmark) {
        return axios.post(`https://a2-tourist-app.ts.r.appspot.com/bookmark`, bookmark);
    }

    removeBookmark(username, placeID) {
        return axios.delete(`https://a2-tourist-app.ts.r.appspot.com/deleteBookmark`, {params: {username: username, placeID: placeID}});
    }

    getBookmarks(userID) {
        return axios.get(`https://a2-tourist-app.ts.r.appspot.com/getBookmarks`, { params : 
        {username: userID}});
    }
}

export default new BookmarkService();