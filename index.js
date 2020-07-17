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
  

  const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
    return inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required.)',
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
        message: 'What did you this project with? (Check all that apply)',
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
        message: 'Which license would you like to use for this project (Check one.)',
        choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'Mozilla Public License 2.0', 'BSD 2-Clause "Simplified" License', 'Eclipse Public License 2.0', 'Creative Commons Zero v1.0 Universal']
      },
      {
        type: 'confirm',
        name: 'confirmContributing',
        message: 'Would you like to enter some guidelines for people you would like to contribute to the project?',
        default: true
      },
      {
        type: 'input',
        name: 'contributing',
        message: 'Provide contribution guidelines:',
        when: ({ confirmContributing }) => confirmContributing
      },
      {
        type: 'confirm',
        name: 'confirmTests',
        message: 'Would you like to write and enter tests for your applications?',
        default: true
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Provide examples on how to run tests you have written:',
        when: ({ confirmTests }) => confirmTests
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
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
          } else {
            return portfolioData;
          }
      })
  };
 
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
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