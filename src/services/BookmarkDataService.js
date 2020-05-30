import http from "../http-common";

class BookmarkDataService {
  getAll() {
    return http.get("/bookmarks");
  }

  get(id) {
    return http.get(`/bookmarks/${id}`);
  }

  create(data) {
    return http.post("/bookmarks", data);
  }

  update(id, data) {
    return http.put(`/bookmarks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bookmarks/${id}`);
  }

  deleteAll() {
    return http.delete(`/bookmarks`);
  }

  findByTitle(title) {
    return http.get(`/bookmarks?title=${title}`);
  }
}

export default new BookmarkDataService();
