const fs = require('fs');

const generateProjects = projectsArr => {
return `
${projectsArr
.map(({description, languages, install, usage, license, contribute, tests, email,github, link }) => {
return `
## Description:
${description}

## Table of Contents:
- Built With
- Installation 
- Usage 
- License
- Contributing 
- Tests 
- Live Site 
- Questions

## Built With:
- ${languages.join(', ')}
            
## Installation:
${install}
            
## Usage:
${usage}
            
## License:
${license}
            
## Contributing:
${contribute}
           
## Tests:
${tests}

## Live Site:
${link}
           
## Questions:
https://github.com/${github}
    
${email}
  `;
 })
  .join('')}
 `;
};


module.exports = templateData => {
// destructure page data by section
 const { projects, title, install } = templateData;
  
return `
 # ${title}
${generateProjects(projects)}         
  `;
 };
  
