const fs = require('fs');

const generateProjects = projectsArr => {
  return `
    <section>
      <div>
      ${projectsArr
        .map(({description, languages, install, usage, license, contribute, tests, email,github, link }) => {
          return `
          <div>
             <h3>## Description:</h3>
                <p id="description">${description}</p>
    
            <h3>## Table of Contents:</h3>
            <a href="#description" class="btn"><i class="fab fa-github mr-2"></i>Description</a><br>
            <a href="#built" class="btn"><i class="fab fa-github mr-2"></i>Built With</a><br>
            <a href="#install" class="btn"><i class="fab fa-github mr-2"></i>Installation</a><br>
            <a href="#use" class="btn"><i class="fab fa-github mr-2"></i>Usage</a><br>
            <a href="#license" class="btn"><i class="fab fa-github mr-2"></i>License</a><br>
            <a href="#contribute" class="btn"><i class="fab fa-github mr-2"></i>Contributing</a><br>
            <a href="#tests" class="btn"><i class="fab fa-github mr-2"></i>Tests</a><br>
            <a href="#site" class="btn"><i class="fab fa-github mr-2"></i>Live Site</a><br>
            <a href="#questions" class="btn"><i class="fab fa-github mr-2"></i>Questions</a><br>

            <h3 id="built">## Built With:</h3>
                <p> - ${languages.join(', ')}</p>
            
            <h3 id="install">## Installation:</h3>
                <p>${install}</p>
            
            <h3 id="use">## Usage:</h3>
                <p>${usage}</p>
            
            <h3 id="license">## License:</h3>
                <p>${license}</p>
            
            <h3 id="contribute">## Contributing:</h3>
                <p>${contribute}</p>
           
             <h3 id="tests">## Tests:</h3>
                <p>${tests}</p>

            <h3 id="site" >## Live Site</h3>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
           
            <h3 id="questions">## Questions:</h3>
                <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${github}">GitHub</a>
                 <p>${email}</p>
          </div>
        `;
        })
        .join('')}
      </div>
    </section>
  `;
};


module.exports = templateData => {
  // destructure page data by section
  const { projects, ...header } = templateData;

  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ReadMe Demo</title>
  </head>

  <body>
    <header>
      <div>
        <h1># ${header.title}</h1>
      </div>
    </header>
    <main>
   ${generateProjects(projects)}
    </main>
    <footer">
      <h5>&copy; ${new Date().getFullYear()}</h5>
    </footer>
  </body>
  </html>
  `;
};
