// ==UserScript==
// @name         Job and Schedule Finder (with refresh)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Search for a job ID and schedule ID, then open the consent page and refresh after 7 seconds
// @author       Sarang Prajapati
// @match        https://hiring.amazon.ca/app*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let jobFound = false; // To stop searching after job is found

    // Check if the current URL is exactly "https://hiring.amazon.ca/app#/jobSearch"
    if (window.location.href === "https://hiring.amazon.ca/app#/jobSearch") {

        const jobIdPattern = /JOB-CA-00000\d+/;
        const scheduleIdPattern = /SCH-CA-00000\d+/;

        function searchForJob() {
            if (jobFound) return; // Stop searching if a job was already found

            console.log("Sending request to Amazon jobs...");

            fetch("https://e5mquma77feepi2bdn4d6h3mpu.appsync-api.us-east-1.amazonaws.com/graphql", {
                method: "POST",
                headers: {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "authorization": "Bearer Status|logged-in|Session|eyJhbGciOiJLTVMiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE3MjgwNzM4NzgsImV4cCI6MTcyODA3NzQ3OH0.AQICAHgz1m58+e586dZFf4bchvbbMWCAcCXZvg9CS5F50i9DfAHDGXihN5Sdw1INMtBWzXMKAAAAtDCBsQYJKoZIhvcNAQcGoIGjMIGgAgEAMIGaBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDIxlzeCmP05wW4JsNwIBEIBtz0TZ6HoL90uw0JQdvkizufXYx9K/ckD2qKaNDMIFWWomOUuNnybLPxKoT4oYyri6HD4LZex9iPp/BezkqTerHQ9fC9f85AGNtjjlxHmkQdlZ9qw7RmA7noRSRJlvf/tmPjeqlSNOaWIlXVWy+Q==",
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "country": "Canada",
                    "iscanary": "false",
                    "origin": "https://hiring.amazon.ca",
                    "pragma": "no-cache",
                    "priority": "u=1, i",
                    "referer": "https://hiring.amazon.ca/",
                    "sec-ch-ua": '"Brave";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "sec-gpc": "1",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
                },
                body: JSON.stringify({
                    operationName: "searchJobCardsByLocation",
                    variables: {
                        searchJobRequest: {
                            locale: "en-CA",
                            country: "Canada",
                            pageSize: 100,
                            geoQueryClause: {
                                lat: 43.745623861321,
                                lng: -79.600413432159,
                                unit: "km",
                                distance: 100
                            },
                            dateFilters: [{ key: "firstDayOnSite", range: { startDate: "2024-10-04" } }]
                        }
                    },
                    query: `query searchJobCardsByLocation($searchJobRequest: SearchJobRequest!) {
                        searchJobCardsByLocation(searchJobRequest: $searchJobRequest) {
                          nextToken
                          jobCards {
                            jobId
                          }
                        }
                    }`
                })
            })
            .then(response => response.json())
            .then(data => {
                const q = JSON.stringify(data);
                console.log("Response received!");
                const jobMatch = q.match(jobIdPattern);
                if (jobMatch) {
                    const jobId = jobMatch[0];
                    console.log(`Job ID found! Job ID!`);

                    // Stop further job searches
                    jobFound = true;

                    // Fetch schedule ID
                    fetchScheduleId(jobId);
                } else {
                    console.log("Job ID not found, retrying...");
                    setTimeout(searchForJob, 0); // Retry after 1 second if no job is found
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setTimeout(searchForJob, 100); // Retry after 1 second if there's an error
            });
        }

        function fetchScheduleId(jobId) {
            console.log("Fetching schedule for Job ID:", jobId);

            fetch("https://e5mquma77feepi2bdn4d6h3mpu.appsync-api.us-east-1.amazonaws.com/graphql", {
                method: "POST",
                headers: {
                    "accept": "*/*",
                    "accept-language": "en-CA,en;q=0.9",
                    "authorization": "Bearer Status|unauthenticated|Session|eyJhbGciOiJLTVMiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE3MjgxNjU1NjYsImV4cCI6MTcyODE2OTE2Nn0.AQICAHgz1m58+e586dZFf4bchvbbMWCAcCXZvg9CS5F50i9DfAHJdB825GL9RULQnVFBIgN6AAAAtDCBsQYJKoZIhvcNAQcGoIGjMIGgAgEAMIGaBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDuefDyopjsDQxVHFwIBEIBtI3m2ytrePQIWTjpNYtujPjH8LFCSFnpWaZO78jEYXl6zEarv+PYINTvYwAO7GVCvYetWLHOUxZTRvfKU1TivoPFIGIKOMSXLsgD4VSqIgioAGjeMfcW/KSZBAQNOwSP49ME35atI28GaxfBXtA==",
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "country": "Canada",
                    "iscanary": "false",
                    "origin": "https://hiring.amazon.ca",
                    "pragma": "no-cache",
                    "referer": "https://hiring.amazon.ca/",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
                },
                body: JSON.stringify({
                    operationName: "searchScheduleCards",
                    variables: {
                        searchScheduleRequest: {
                            locale: "en-CA",
                            country: "Canada",
                            pageSize: 1000,
                            sorters: [{ fieldName: "totalPayRateMax", ascending: "false" }],
                            dateFilters: [{ key: "firstDayOnSite", range: { startDate: "2024-10-05" } }],
                            jobId: jobId
                        }
                    },
                    query: `query searchScheduleCards($searchScheduleRequest: SearchScheduleRequest!) {
                        searchScheduleCards(searchScheduleRequest: $searchScheduleRequest) {
                            scheduleCards {
                                scheduleId
                            }
                        }
                    }`
                })
            })
            .then(response => response.json())
            .then(data => {
                const q = JSON.stringify(data);
                console.log("Schedule Response received!");
                const scheduleMatch = q.match(scheduleIdPattern);
                if (scheduleMatch) {
                    const scheduleId = scheduleMatch[0];
                    console.log(`Schedule ID found!`);

                    // Navigate to consent page with jobId and scheduleId
                    const applicationUrl = `https://hiring.amazon.ca/application/ca/?CS=true&jobId=${jobId}&locale=en-CA&scheduleId=${scheduleId}&ssoEnabled=1#/consent?CS=true&jobId=${jobId}&locale=en-CA&scheduleId=${scheduleId}&ssoEnabled=1`;
                    window.open(applicationUrl, '_blank');
                    //window.location.href = applicationUrl;

                    // Refresh the page after 7 seconds
                    setTimeout(() => {
                        location.reload();
                    }, 4000);
                } else {
                    console.log("Schedule ID not found, retrying...");
                    setTimeout(() => fetchScheduleId(jobId), 0); // Retry after 1 second if no schedule is found
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setTimeout(() => fetchScheduleId(jobId), 10); // Retry after 1 second if there's an error
            });
        }

        // Start searching for a job
        setTimeout(searchForJob, 4000); // Start after a delay to avoid conflicts
    }
})();
