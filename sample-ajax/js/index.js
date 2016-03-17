console.log("HELLO FROM THE JAVASCRIPT CONSOLE!");

$.ajax({
  type: 'GET',
  url: "http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=4ad905b0e607a433711aa55e041897aa",
  success: function(data) {
    console.log("We have your weather!");
    console.log(data);
  },

  error: function () {
    console.error("An error occured.");
  },

});

console.log("End text");
