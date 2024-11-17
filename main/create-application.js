// ==UserScript==
// @name         Auto Click Create Application
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically clicks the "Create Application" button
// @author       You
// @match        https://hiring.amazon.ca/application/ca/*
// @grant        none
// ==/UserScript==

(function() {
        'use strict';

        // Function to click the button with specific attributes and inner text
        function clickCreateApplicationButton() {
                    var button = document.querySelector("button[data-test-component='StencilReactButton'][type='button'].e4s17lp0.css-1jwvbdk");
                    if (button && button.textContent.trim() === "Create Application") {
                                    console.log("Clicking the 'Create Application' button...");
                                    button.click();
                                    return true;
                    } else {
                                    console.log("Button not found or does not match the criteria!");
                                    return false;
                    }
        }

        // Check immediately on page load
        if (!clickCreateApplicationButton()) {
                    // If the button wasn't found, periodically check for it
                    var intervalId = setInterval(function() {
                                    if (clickCreateApplicationButton()) {
                                                        clearInterval(intervalId); // Stop checking once the button is clicked
                                    }
                    }, 0.00001); // Check every 0.00001 milliseconds
        }
})();
