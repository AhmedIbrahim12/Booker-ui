<template>
  <div id="lecture">
    <navigationMenu></navigationMenu>
    <successAlert
      :message="notificationMessage.message"
      :visible="notificationMessage.visible"
      :status="notificationMessage.status"
    ></successAlert>

    <b-form style="padding: 2% 4%; width: 60%;" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="title" label="Lecture's title:" label-for="titleInput">
        <b-form-input
          id="exampleInput2"
          type="text"
          v-model="form.title"
          required
          placeholder="Enter title.."
        />
      </b-form-group>

      <b-form-group id="description" label="Lecture's description:" label-for="descriptionInput">
        <b-form-textarea
          id="textarea"
          v-model="form.description"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          required
        />
      </b-form-group>

      <b-form-group id="attachment" label="Attachments:" label-for="attachmentInput">
        <b-form-file
          v-model="form.file"
          :state="Boolean(form.file)"
          placeholder="Choose a file..."
          drop-placeholder="Drop file here..."
        />
        <div class="mt-3">Selected file: {{ form.file ? form.file.name : '' }}</div>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { AXIOS } from "./api-src";
export default {
  name: "LectureCreator",
  data() {
    return {
      form: {
        title: "",
        description: "",
        file: null,
        fileDownloadUri: []
      },
      notificationMessage: {
        visible: false,
        message: "",
        status: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if(this.form.file != null){
        this.uploadFile();
      }
      else{
        this.saveLecture();
      }
    },

    uploadFile() {
      var params = new FormData();
      params.append("file", this.form.file);
      AXIOS.post("/uploadFile", params)
        .then(response => {
          this.form.fileDownloadUri.push(response.data.fileDownloadUri);
          this.saveLecture();
        })
        .catch(error => this.showErrorNotification(error));
    },

    saveLecture() {
      var params = new URLSearchParams();
      params.append("title", this.form.title);
      params.append("description", this.form.description);
      params.append("attachmentUrls", this.form.fileDownloadUri);
      AXIOS.post("/lecture/save", params)
        .then(response => {
          this.showSuccessNotification();
          this.resetFields();
        })
        .catch(error => this.showErrorNotification(error));
    },

    showSuccessNotification() {
      this.notificationMessage.status = "success";
      this.notificationMessage.message = "Lecture was saved successfully";
      this.notificationMessage.visible = true;
    },

    showErrorNotification(error) {
      console.log(error);
      this.notificationMessage.status = "danger";
      this.notificationMessage.message = error;
      this.notificationMessage.visible = true;
    },

    onReset(evt) {
      evt.preventDefault();
      this.resetFields();
      this.notificationMessage.visible = false;
    },

    resetFields() {
      this.form.title = "";
      this.form.description = "";
      this.form.file = null;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>