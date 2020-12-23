<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiencies"
          >Load Submitted Experiences</base-button
        >
      </div>
      <ul>
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
    };
  },
  methods: {
    async loadExperiencies() {
      const resp = await fetch('/api/results');
      //const results = await resp.json();
      //console.log(results);
      if (resp.ok) {
        const data = await resp.json();
        for (let i = 0; i < data.length; i++) {
          this.results.push(data[i]);
        }
        //console.log('results')
        //console.log(this.results);
      }
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