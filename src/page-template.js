const fs = require('fs');

const generateProjects = projectsArr => {
return `
${projectsArr
.map(({description, languages, install, usage, license, contribute, tests, email,github, link }) => {
return `
## Description:
${description}

## Table of Contents:
- [Technologies](#Technologies)
- [Installation](#Installation) 
- [Usage](#Usage) 
- [License](#License)
- [Contributing](#Contributing) 
- [Tests](#Tests) 
- [Site](#Site) 
- [Questions](#Questions)

## Technologies:
- ${languages.join(', ')}
            
## Installation:
${install}
            
## Usage:
${usage}
            
## License:
This project is covered under the ${license}. For more information visit: https://choosealicense.com/.
            
## Contributing:
${contribute}
           
## Tests:
${tests}

## Site:
${link}
           
## Questions:
[Github](https://github.com/${github})
    
Email: ${email}
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
  
