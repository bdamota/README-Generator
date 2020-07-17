const fs = require('fs');

// create the about section
const generateContributing = contributeText => {
  if (!contributeText) {
    return '';
  }

  return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Contributing</h2>
      <p> 
      ## Contributing: <br>
      ${contributeText}
      </p>
    </section>
  `;
};
const generateTests = testsText => {
    if (!testsText) {
      return '';
    }
  
    return `
      <section class="my-3" id="about">
        <h2 class="text-dark bg-primary p-2 display-inline-block">Contributing</h2>
        <p> 
        ## Tests:<br>
         ${testsText}
         </p>
      </section>
    `;
  };
const generateProjects = projectsArr => {
  return `
    <section>
      <div>
      ${projectsArr
        .map(({description, languages, install, usage, license, email,github, link }) => {
          return `
          <div>
            <p>
            ## Description:<br>
             ${description}
            </p>
            <h5>
              ## Built With:<br>
             - ${languages.join(', ')}
            </h5>
            <p>
            ## Installation:<br>
            ${install}
            </p>
            <p>## Usage:<br>
            ${usage}
            </p>
            <p>
            ## License:<br>
            ${license}
            </p>
            <div>
            ## Questions: <br>
                <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a><br>
                <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${github}">GitHub</a><br>
                 <p>${email}</p>
            </div>
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
  const { projects, contribute, tests, ...header } = templateData;

  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3"># ${header.title}</h1>
        <nav class="flex-row">
        </nav>
      </div>
    </header>
    <main class="container my-5">
   ${generateContributing(contribute)}
   ${generateTests(tests)}
   ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h5 class="text-dark">&copy; ${new Date().getFullYear()}</h5>
    </footer>
  </body>
  </html>
  `;
};
