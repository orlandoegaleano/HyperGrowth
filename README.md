Prerequisites: 
    Ensure that Node.js, Node Package Manager (NPM), and ngrok are installed on your machine.
    Install the Expo Go app on your phone or on your emulated android phone.

Clone the Repository: 
    If you haven't already, clone the repository to your local machine.

Change Directory: 
    Navigate to the project directory using cd /path/to/project-directory.

Install Dependencies: 
    Execute 'npm install' to install the necessary dependencies.


Open 3 terminals, 1 for each of the following:

HOW TO RUN SERVER

    Once in HyperGrowth directory, cd into 'server' directory

    Execute 'npm install'

    Place your own MongoDB URI in the 'const mongoUri' which is located in /server/src/index.js

    Finally, execute 'npm run dev'

HOW TO RUN NGROK

    Execute 'ngrok http 3000'

    Copy the 'Forwarding' URL provided from ngrok 
    
    Paste it into the baseURL prop located in HyperGrowth/src/api/axiosServer.js

HOW TO RUN APPLICATION
    Once in HyperGrowth directory, execute 'npm start'

    Scan the QR code and load the app to your phone or press 'a' to open on your emulator



Login Screen Icon obtained from 'https://www.pngitem.com/download/biRhbx_transparent-weights-png-weight-lifting-icon-png-png/'
