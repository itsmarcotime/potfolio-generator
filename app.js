const fs = require('fs');
const generatePage = require('./src/page-template.js');

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
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "about" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({confirmAbout}) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
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

/*const mockData = {
  name: 'Marco',
  github: 'itsmarcotime',
  projects: [
    {
      name: 'Run Buddy',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['HTML', 'CSS'],
      link: 'https://github.com/lernantino/run-buddy',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskinator',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'HTML', 'CSS'],
      link: 'https://github.com/lernantino/taskinator',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskmaster Pro',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
      link: 'https://github.com/lernantino/taskmaster-pro',
      feature: false,
      confirmAddProject: true
    },
    {
      name: 'Robot Gladiators',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
      languages: ['JavaScript'],
      link: 'https://github.com/lernantino/robot-gladiators',
      feature: false,
      confirmAddProject: false
    }
  ]
};
*/

//const pageHTML = generatePage(mockData);
promptUser()
.then(promptProject)
.then(portfolioData => {

  const pageHTML = generatePage(portfolioData);

  fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw new Error(err);

    console.log('Page Created! Checkout index.html in this directory to see!');

  });

});

/*
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
