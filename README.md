# Amazon-Jobs-Advanced

This repository contains advanced Tampermonkey scripts designed to streamline and automate the Amazon job application process. These scripts work seamlessly with the Tampermonkey plugin for Chrome.

## Description
This repository is an evolution of the original [Amazon-Jobs](https://github.com/sarang7even/Amazon-Jobs) repository. It includes two powerful scripts that make the job application process faster and more efficient:

1. **Job and Schedule Finder (main.js):**
   - Fetches job and schedule IDs directly from Amazon's API.
   - Automatically navigates to the consent page.
   - Refreshes the page automatically if no matching jobs are found.

2. **Auto Click Create Application (create_application.js):**
   - Automatically clicks the "Create Application" button on the Amazon application page.
   - Saves time by automating repetitive clicks.

## Key Features
- Integration with Amazon API for job and schedule details.
- Automation of application consent and creation processes.
- Advanced logic to handle job and schedule matching seamlessly.

## Learning Experience
During the development of these scripts, I gained experience in:
- Making API requests (GET and POST) and handling API responses.
- Using Postman for testing and debugging API calls.
- Automating browser interactions using Tampermonkey.

These scripts represent a significant milestone in combining automation and API handling to simplify a complex process.

## Installation
1. Install the [Tampermonkey plugin](https://www.tampermonkey.net/) in your Chrome browser.
2. Add the scripts to Tampermonkey:
   - Copy the code from `main.js` for the job and schedule finder.
   - Copy the code from `create_application.js` for auto-clicking the "Create Application" button.
3. Enable the scripts in Tampermonkey.
4. Use them while navigating the Amazon jobs portal.

## File List
- **`main.js`**: Script for finding jobs and schedules.
- **`create_application.js`**: Script for auto-clicking the "Create Application" button.
- **`README.md`**: Documentation for the repository.
- **`LICENSE`**: Legal information under the MIT License.

## License
[MIT License](LICENSE)

## Disclaimer
These scripts are for educational purposes only. Ensure compliance with all applicable terms and conditions while using them.
