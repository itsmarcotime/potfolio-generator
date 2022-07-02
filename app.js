const inquirer = require('inquirer');

const promptUser = () => {

  return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username (required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('please enter your Github Username!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
     ]);
};

const promptProject = portfolioData => {

  //If there's no 'project' array property, create one
  if (!portfolioData.projects) {

    portfolioData.projects = [];

  }
  

  console.log(`
  =================
  Add a New Project
  =================
  `);

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your Project? (required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('please enter your project name!');
          return false;
        }
      }
    },
    {
      type:'input',
      name:'description',
      message: 'Provide a description of the project (required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('please enter project description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (check all that apply)',
      choices: ['javascript', 'HTML', 'CSS', 'ES6', 'jquery', 'bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter your github link to your project. (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('please enter your project link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another Project?',
      default: false
    }

  ]).then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    };
  });

};


promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
});


/*
const fs = require('fs');
const generatePage = require('./src/page-template.js');
const pageHTML = generatePage(name, github);


fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');

});
*/



/* console.log(profileDataArgs);

const printProfileData = profileDataArr => {

    // this.. 
    for (let i=0; i < profileDataArr.length; i++) {

        console.log(profileDataArr[i]);

    }

    console.log("================");

    // is the same as this..
    profileDataArr.forEach(profileItem => console.log(profileItem));
    
};

printProfileData(profileDataArgs);
*/
