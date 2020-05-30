<template>
  <div v-if="currentBookmark" class="edit-form">
    <h4>Bookmark</h4>
    <form>
      <div class="form-group">
        <label for="repositoryname">Repository Name</label>
        <input type="text" class="form-control" id="repositoryname"
          v-model="currentBookmark.repositoryname"
        />
      </div>
      <div class="form-group">
        <label for="repositorylink">Link to repository on GitHub</label>
        <input type="text" class="form-control" id="repositorylink"
          v-model="currentBookmark.repositorylink"
        />
      </div>
   <div class="form-group">
        <label for="repositorylink">Description</label>
        <input type="text" class="form-control" id="repositorylink"
          v-model="currentBookmark.repositorydescription"
        />
      </div>
    </form>
    <button class="badge badge-danger mr-2"
      @click="deleteBookmark"
    >
      Delete
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Bookmark...</p>
  </div>
</template>

<script>
import BookmarkDataService from "../services/BookmarkDataService";

export default {
  name: "bookmark",
  data() {
    return {
      currentBookmark: null,
      message: ''
    };
  },
  methods: {
    getBookmark(id) {
      BookmarkDataService.get(id)
        .then(response => {
          this.currentBookmark = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteBookmark() {
      BookmarkDataService.delete(this.currentBookmark.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "bookmarks" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getBookmark(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
