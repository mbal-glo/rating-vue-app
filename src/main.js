import { createApp } from 'vue';

import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import App from './App.vue';

import { Server } from 'miragejs';


new Server({
  seeds(server) {
    server.db.loadData({
      results: [
      ]
    })
  },
  routes() {
    this.timing = 500;
    this.namespace = "api"

    this.post('/results', (schema, request) => {
      const rating = JSON.parse(request.requestBody);
      schema.db.results.insert(rating);

      console.log('rating');
      console.log(rating)
      console.log('schema');
      console.log(schema.db.results);
    });
    
    this.get('/results', (schema) => {
      return schema.db.results
    })

  }
});


// new Server({
//   routes() {
//     this.timing = 60;
//     this.namespace = "api"

//     // this.get('/todos', () => {
//     //   return ['maria', 'baltar'];
//     // });

//     this.post('/results', (schema, request) => {
//       //console.log("request: ");
//       //console.log(request);
//       const rating = JSON.parse(request.requestBody); 
//       //no es necesario si se agrega 'Content-Type': 'application/json' al header
//       //const rating = request.requestBody;
//       //console.log('rating')
//       //console.log(rating)
//       return rating;
//     });

//     this.get('/results', () => {
//       return 
//     })
//   }
// });

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);

app.mount('#app');
