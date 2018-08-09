/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Example places",
      places: [],
      newPlace: {
        name: "",
        address: ""
      },
      errors: []
    };
  },

  created: function() {
    axios.get('/api/places').then(function(response) {
      this.places = response.data;
    }.bind(this));
  },

  methods: {
    addPlace: function() {
      var newExamplePlace = {
        name: this.newPlace.name,
        address: this.newPlace.address
      };

      axios.post('api/places', newExamplePlace).then(function(response) { 
        this.places.push(newExamplePlace);
        this.newPlace = { name: "", address: "" };
        console.log('adding place'); 
      }.bind(this)).catch(function(error) {
        console.log(error.response.data.errors);
        // above is sad path
        this.errors = error.response.data.errors;
      }.bind(this));
    },

  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});