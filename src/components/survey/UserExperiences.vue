<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiencies"
          >Load Submitted Experiences</base-button
        >
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p v-else-if="!isLoading && (!results || results.length === 0)">
        No stored experiences found. Please add some survey results first.
      </p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadExperiencies() {
      this.isLoading = true;
      this.error = null;
      try {
        const resp = await fetch('/api/results'); //
        //const results = await resp.json();
        //console.log(results);
        if (resp.ok) {
          const data = await resp.json();
          this.isLoading = false;
          for (let i = 0; i < data.length; i++) {
            this.results.push(data[i]);
          }
          //console.log('results')
          //console.log(this.results);
        }
      } catch (error) {
        // console.log('error')
        console.log(error);
        this.isLoading = false;
        this.error = 'Failed to fetch data, please try again later';
        console.log(this.error);
      }
    },
    mounted() {
      this.loadExperiencies();
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>