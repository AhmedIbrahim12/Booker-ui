<template>
  <div id="home">
    <navigationMenu></navigationMenu>
    <div style="padding: 20px; 20px;">
      <b-card-group columns>
        <b-card v-for="lecture in lectures" :key="lecture.id" :header="lecture.title">
          <blockquote class="blockquote mb-0">
            <p>{{lecture.description}}</p>
          </blockquote>
          <div slot="footer" v-for="url in lecture.attachmentDownloadUrls" :key="url">
            <a class="text-muted" :href="url">Download {{lecture.title}}</a>
          </div>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { AXIOS } from "./api-src";
export default {
  name: "Home",
  data() {
    return {
      lectures: []
    };
  },
  beforeMount() {
    AXIOS.get("/lecture/getAll").then(response => {
      this.lectures = response.data;
    });
  }
};
</script>