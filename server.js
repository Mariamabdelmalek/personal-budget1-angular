const express = require('express');

const app = express();
const port = 3000;
app.use('/',express.static('public'));
const budget ={
    mybudget: [

    { 
      title : "Eat out",
      budget: 30
    },
    { 
      title :"Rent",
      budget: 350
    },
    { 
      title :"Grocery",
      budget: 90
    },
    { 
        title :"Transportation",
        budget: 90
      },
      
      { 
        title :"Entertainment",
        budget: 90
      },
        { 
            title :"Phone",
            budget: 40
        },
        { 
            title :"Internet",
            budget: 30
        },
        { 
            title :"Travel",
            budget: 300
        },
]
};
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
app.get('/budget', (req, res) => {
    res.json(budget);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});