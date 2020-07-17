const inquirer = require('inquirer');
const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
      name: 'title',
      message: 'What is the project title? (Required.)',
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log('Please enter title!');
          return false;
        }
      }
    },
    ]);
  };
  

  const promptProject = readMeData => {
    // If there's no 'projects' array property, create one
    if (!readMeData.projects) {
      readMeData.projects = [];
  }
    return inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project. (Required.)',
        validate: projectDescriptionInput => {
            if (projectDescriptionInput) {
              return true;
            } else {
              console.log('Please enter your project description!');
              return false;
            }
          }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you make this project with? (Check all that apply.)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'install',
        message: 'What are the steps required to install your project? (Required.)',
        validate: installInput => {
          if (installInput) {
            return true;
          } else {
            console.log('Please enter install instructions!');
            return false;
          }
         } 
       },
       {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use. (Required.)',
        validate: usageInput => {
          if (usageInput) {
            return true;
          } else {
            console.log('Please enter usage examples!');
            return false;
          }
         } 
       },
       {
        type: 'checkbox',
        name: 'license',
        message: 'Which license would you like to use for this project. (Check one.)',
        choices: [
          {name:'Apache License 2.0', short:'apache'}, 
          {name: 'GNU General Public License v3.0'},
          {name: 'MIT License'},
          {name:'Mozilla Public License 2.0'},
          {name: 'BSD 2-Clause "Simplified" License'},
          {name: 'Eclipse Public License 2.0'},
          {name:'Creative Commons Zero v1.0 Universal'}
        ]
      },
      {
        type: 'input',
        name: 'contribute',
        message: 'Provide contribution guidelines. (Required.)',
        validate: contributeInput => {
          if (contributeInput) {
            return true;
          } else {
            console.log('Please enter guidelines!');
            return false;
          }
         } 
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Provide examples on how to run tests that you have written. (Required.)',
        validate: testsInput => {
          if (testsInput) {
            return true;
          } else {
            console.log('Please enter tests!');
            return false;
          }
         } 
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: githubLinkInput => {
            if (githubLinkInput) {
              return true;
            } else {
              console.log('Please enter your project github link!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: gitHubInput => {
            if (gitHubInput) {
              return true;
            } else {
              console.log('Please enter your username!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email. (Required)',
        validate: emailInput => {
            if (emailInput) {
              return true;
            } else {
              console.log('Please enter your email!');
              return false;
            }
          }
      },
    ])
    .then(projectData => {
      readMeData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(readMeData);
          } else {
            return readMeData;
          }
      })
  };
 
  promptUser()
  .then(promptProject)
  .then(readMeData => {
    return generatePage(readMeData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });