import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getEmployeeImage: function () {
    return axios.get("https://randomuser.me/api/portraits/thumb/men/75.jpg");
  },
  getRandomEmployees: function () {
    return axios.get('https://randomuser.me/api/?results=10');
  }
};
