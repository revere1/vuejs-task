<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Bookmark List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(bookmark, index) in bookmarks"
          :key="index"
          @click="setActiveBookmark(bookmark, index)"
        >
          {{ bookmark.repositoryname }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllBookmarks">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBookmark">
        <h4>Bookmark</h4>
        <div>
          <label><strong>Repository Name:</strong></label> {{ currentBookmark.repositoryname }}
        </div>
        <div>
          <label><strong>Repository link:</strong></label> {{ currentBookmark.repositorylink }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentBookmark.repositorydescription }}
        </div>

        <a class="badge badge-warning"
          :href="'/bookmarks/' + currentBookmark.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Bookmarks...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarkDataService from "../services/BookmarkDataService";

export default {
  name: "bookmarks-list",
  data() {
    return {
      bookmarks: [],
      currentBookmark: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveBookmarks() {
      BookmarkDataService.getAll()
        .then(response => {
          this.bookmarks = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBookmarks();
      this.currentBookmark = null;
      this.currentIndex = -1;
    },

    setActiveBookmark(bookmark, index) {
      this.currentBookmark = bookmark;
      this.currentIndex = index;
    },

    removeAllBookmarks() {
      BookmarkDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveBookmarks();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
