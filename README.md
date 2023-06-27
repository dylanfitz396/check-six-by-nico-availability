# Check Six By Nico Availability
Repo which contains script to regularly check availability at the Six By Nico restaurant in Edinburgh.

![Alt text](sixByNicoLogo.png)
<h2>How it Works</h2>
<p>I have used the `setInterval` function to regularly ping the Six By Nico availability API. For now, it is hardcoded to run once per hour, with the API passing query parameters to look at times on the 4th of July 2023 for tables of 2.</p>
<p>Once the response is received, I then filter by time, seeing if there is any availability between 17:00 and 22:00. If there is, I'll send myself an email, listing the available times that may suit me in it's body</p>
<p>Once the email is sent, I clear the interval using `clearInterval(intervalId)` to prevent myself from being sent any further emails and allowing the script to stop running.</p>

<h2>How to Run Locally</h2>
<li>Clone the repo and run `npm i` to install dependencies.</li>
<li>Once installed, open terminal and run the command `npm run start`.</li>
<br />
For security purposes, the password used for sending the email will be pulled from a .env file. This is local to you only. You will need to copy from the env.example file into your own .env file and populate it with your email password.

