<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="repositoryname">Repository Name</label>
        <input
          type="text"
          class="form-control"
          id="repositoryname"
          required
          v-model="bookmark.repositoryname"
          name="repositoryname"
        />
      </div>

      <div class="form-group">
        <label for="repositorylink">Link to repository on GitHub</label>
        <input
          class="form-control"
          id="repositorylink"
          required
          v-model="bookmark.repositorylink"
          name="repositorylink"
        />
      </div>
    <div class="form-group">
        <label for="repositorydescription">about</label>
        <input
          class="form-control"
          id="repositorydescription"
          required
          v-model="bookmark.repositorydescription"
          name="repositorydescription"
        />
      </div>
      <button @click="saveBookmark" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBookmark">Add</button>
    </div>
  </div>
</template>

<script>
import BookmarkDataService from "../services/BookmarkDataService";

export default {
  name: "add-bookmark",
  data() {
    return {
      bookmark: {
        id: null,
        repositoryname: "",
        repositorylink: "",
        repositorydescription: "",
      },
      submitted: false
    };
  },
  methods: {
    saveBookmark() {
      var data = {
        repositoryname: this.bookmark.repositoryname,
        repositorylink: this.bookmark.repositorylink,
        repositorydescription: this.bookmark.repositorydescription
      };

      BookmarkDataService.create(data)
        .then(response => {
          this.bookmark.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newBookmark() {
      this.submitted = false;
      this.bookmark = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
