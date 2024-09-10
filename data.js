// data.js

// Example data object
const exampleData = {
  user: {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    profile: {
      age: 30,
      city: "New York"
    }
  },
  posts: [
    {
      id: 101,
      title: "Introduction to JavaScript",
      content: "JavaScript is a versatile programming language used for web development.",
      published: true
    },
    {
      id: 102,
      title: "Understanding CDN",
      content: "A Content Delivery Network (CDN) helps in distributing content efficiently.",
      published: false
    }
  ],
  settings: {
    theme: "dark",
    notificationsEnabled: true
  }
};

// Function to get the data
function getData() {
  return exampleData;
}

// Exporting the function if using in a module environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getData
  };
}
