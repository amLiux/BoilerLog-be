# ****Transmit Security Training Roadmap**** 

### Marcelo Bolaños Araya.
### Started on October 26th.

### Madhav Bellary.

<br>

> ## First Week
### From 26th to the 30th of October.

#### Completed
* On-boarding session with HR representatives. ✅
* 

#### TODO: 
* Meet Transmit Team. ✅
* Added to WA group. ✅
* Administrative Trainings related to Data Security, Sexual Harrassment. ✅
* Requested access to G-Suite tenant. ✅

<br>

> ## Second Week
### November 2nd to the 6th.

<br>

***November 2nd***:
* Got added into Transmit G-Suite. ✅
* Added Authenticator App to my phone. ✅
* Logged to Slack and Zoom using Google SSO. ✅
* Checked [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/). ✅


<br>

***November 3rd***:
* Saw the first Training from Venu called ```1.TSP-FNS 100``` in our Google Drive ✅

|   Topic    |   Status    |   Comments    |
|---    |---    |---    |---    |---    |
|Transmit Overview|:heavy_check_mark:|Is a Debian-based platform that allows developers to use it as a way to facilitate authentication processes to their multi-platform applications. Can be adapted or use different APIs and customer web services allows it to connect different services    identities stores or other public based API.|
|Server Roles|:heavy_check_mark:|It is divided into 3 server roles: Auth server:  journey/auth related endpoints. Admin server: This is the one with the console. Consumes a management API. Mostly used by admins to set up the different rules for the authentication. Standalone: a server roles that includes the two aforementioned.|
|Transmit Applications|:heavy_check_mark:|It allows a wide variety of applications types to be added, such as webSDK application, mobileSDK applications, SAML and others.|
|Authenticators|:heavy_check_mark:|Divided into centralized and local: Local would mean something the end user can do, let’s call it any biometric. The user does the auth themselves and Transmit just receives the confirmation. Centralized would mean that the data we are validating is either stored in Transmit or that Transmit can validate it.|
|DataBases|:heavy_check_mark:|Can use different data bases such as Postgres, SQL, Oracle, MongoDB. MongoDB is being used as the default. Authentication DB: Refers to the DBs that contains the users that Transmit can do a request to validate.|
|Florie or failed authentication|:heavy_check_mark:|It can be set for us to know the failed authentication attempts. Which can also lead into setting locking and unlocking rules.|
|Authentication levels|:heavy_check_mark:|Refers to something you have, something you know and something you are.|
|Important|:heavy_check_mark:|Java is required.|

<br>

***November 4th***:
* Started checking *Shadowing Sessions* Videos: 
  * Day 1 and 2 ✅


<br>

|   Topic	|   Status	|   Comments	|
|---	|---	|---	|---	|---	|
|Journeys|✔️| <ul><li>***Version Id***: each Journey can have several version with their own unique identifier for each of them, this allows version based development. </li><li>***Description***: Self-explanatory.</li><li>***Apply To***: This will be the scope that this Journey will have, it can go from "Defalt", this option tells us that this is the production Journey, meaning that this will be running as default to all users unless there are other Journeys that apply to certain users or evaluating some expression.</li></ul> |   
|Difference between Mobile Application vs Web Application|✔️| Mobile application performs a bind when performing first authentication against Transmit's Mobile SDK. Web Application does not track the browser (OOB behavior, can be done with custom logic).|   	
|Ticket Handling|✔️|<ul><li>How to determine if the severity of a case is justified or not? You need to read customer's verbatim and search key words/phrases like "blocker, can't go live, production environment" and based on this, put yourself in context and raise or downgrade the severity based on your perspective.</li><li>Support does not handle advisory tickets, they are just break and fix. If customer needs advisory ticket, they need to create a new ticket with the PS team or we can move the ticket for them.</li><li>Try to reproduce so that you understand what's happening from the first request, either coming from Transmit Console or coming from a end-user's phone.</li><li>Use old cases as referenece, search by keywords in Transmit's DB to see if someone hasn't already handled something like it and resolved it.</li><li>Try to gather as much valuable information as you can, in case that you need to escalate the case, create an internal ticket with dev team or keeping the case for yourself, try to document your case the best that you can.</li></ul>| 
|Access Tokens|✔️|A very important thing to understand is what an [Access Token](https://en.wikipedia.org/wiki/Access_token) is and how it works, because API Tokens, [JWT](https://jwt.io/introduction/) and even Transmit's success token follows a very similar logic.|

<br>

> Finally, I created my own Journey called ```login```, in which I've understood how to give use to basic nodes like: *Display Information, Generic Conditions, Authenticate and Complete Journey*. Also playing a little bit with *AuthScript*.
> 
>![default_auth_version, screenshot of journey diagram](./default_auth_version_2.png)

<br>

***November 5th***:
* Getting my Development Environment ready: 
  * VSCode installed ✅
  * Need [Nodejs](https://nodejs.org/en/) 🔜
  * Need [Git](https://git-scm.com/) 🔜 

* *Shadowing sessions*:
  * Day 3, 4 ✅

|   Topic	|   Status	|   Comments	|
|---	|---	|---	|---	|---	|
|Sessions|✔️|Yesterday we spoke about Access Tokens, today we talk about [sessions](https://www.packetlabs.net/session-management/). Transmit can either execute Journeys to start a session or execute one that can check if we are already on a valid session.|   
|Journey Types|✔️|Anonymous/Userless Journeys, Journeys initiated by applications, SubJourneys or Journeys that can be invoked in other Journeys.|   	
|JWT|✔️|We took a look at the JWT in the General Application Settings: <ul><li>We learned about the expiration time of JWT, and how they can differ if they are generated by a Journey or via REST API/AuthScript .</li><li>JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.</li><li>More in-depth information about [JWT](https://jwt.io/introduction/).</li></ul>| 
|HMAC|✔️|HMAC stands for Hash-based message authorization code and is a stronger type of authentication.<br>With HMAC, both the sender and receiver know a secret key that no one else does. The sender creates a message based on some system properties (for example, the request timestamp plus account ID).<br>The message is then encoded by the secret key and passed through a secure hashing algorithm (SHA). (A hash is a scramble of a string based on an algorithm.) The resulting value, referred to as a signature, is placed in the request header.<br>When the receiver (the API server) receives the request, it takes the same system properties (the request timestamp plus account ID) and uses the secret key (which only the requester and API server know) and SHA to generate the same string.<br>*If the string matches the signature in the request header, it accepts the request. If the strings don’t match, then the request is rejected.*|
|SSH|✔️|[SSH](https://searchsecurity.techtarget.com/definition/Secure-Shell), also known as Secure Shell or Secure Socket Shell, is a network protocol that gives users, particularly system administrators, a secure way to access a computer over an unsecured network. In addition to providing secure network services, SSH refers to the suite of utilities that implement the SSH protocol.|

<br>

***November 6th***:
* Started prototyping ThotApp a KB builder that is designed to create KB's for internal CSS/Transmit support future references: 
  * [GitHub Repository](https://github.com/Marceliux/Thot-App)

* Created the following documentation for the team:

![generate-key-pem.pdf](./generate-key-pem.png)
<br>
<br>
![ssh-transmit-server.pdf](./ssh-transmit-server.png)
<br>
<br>
![check-server-logs.pdf](./check-server-logs.png)




<br>

> ## Third Week
### From November 9th to the 13th.

<br>

***November 9th***:
* Started working on case #14772 with Oam, in which customer needed a script to batch delete all the old devices in mongodb and leaving the two latest additions. 🔜
* Created a mock user db, I didn't had access to a Transmit Server so I hosted the db in my PC and Oam helped me on replicating it. ✅
* Provided an update in which we were able to reduce the array to the two newest additions of the db, we are missing the deletion of the rest of the devices. 🔜
```javascript
db.getCollection('users').find().forEach(user => {
  //getting the total amount but substracting the two devices that we want to keep
  const remainingDevices = user.devices.length -2; 
  //sorting the array by the Epoch & Unix Timestamp
  let arr = user.devices.sort((a, b) => (a.last_access - b.last_access));
  //then we remove the indexes from 0 until the number of devices that we want to remove (as the array is now sorted and we just want to keep the last two entries), refer to line 80.
  arr.splice(0, remainingDevices);
  //showing the two devices
  print(arr);
}); 
```

***November 10th***:
* Continued working on case #14772 with Oam, we were able to crack it down with the following script. ✅
* Further testing required in Oam's environment before sharing with customer. 🔜
```javascript
  db.getCollection('users').find().forEach(user => {​​​ 
    if (user.devices.length > 2){​​​
        //getting the total amount but substracting the two devices that we want to keep
        const numberOfDevicesToDelete= user.devices.length -2; 
        //sorting the array by the Epoch & Unix Timestamp
        let sortedDevices = user.devices.sort((a, b) => (a.last_access - b.last_access)); 
        //updating sortedDevices
        sortedDevices.splice(0, numberOfDevicesToDelete); 

        // updating users collection overwritting the old array of devices with the new array which has the two newest devices. 
        db.getCollection('users').update( 
            {​​​_id: user._id }​​​, 
            {​​​ $set : {​​​ 'devices' : [...sortedDevices] }​​​}​​​, 
            {​​​'multi': true}​​​ 
        ); 
    }​​​
  }​​​)

```
* *Shadowing sessions*:
  * Day 5, 6 ✅
  
|   Topic	|   Status	|   Comments	|
|---	|---	|---	|---	|---	|
|```@policy```|✔️|We made use of this pre-built *AuthScript* object, first to show the id of the user and then to get some parameters coming fromB client's request.|   
|Device Groups|✔️|We can filter the devices and add them to an specific group based in our needs, some examples that I can think of are: *os-groups*, so that we can differ between iOS users or Android users, also we can create *city-groups*, so we can geographically group our user's devices, there are many things that can be done with this.|   	
|Failed Authentication Rules / Florie|✔️|Rules that you can define to take action when a user has failed to login certain amount of times (we can define this), also we need to keep in mind the scope in which the user has failed (application, device, authenticator across all device or authenticator on device), finally we can define a *lock* when this situation comes, but the *lock* also has a scope which can be: <ul><li>User</li><li>Application</li><li>Device</li><li>Authenticator across all devices</li><li>Authenticator on current device</li></ul>| 
|Support|✔️|Support option under *End User* tab in Transmit WebApp, it allow us to grab some further information about an specific user. |
|External Connections|✔️|You can connect Transmit to several Web Services, Identity Providers, Telecommunication Services, among others. This connections can be created under the *Platform Tab > External Connections*. Very powerful option that Transmit provides as it provides a wide variety of own-developed Web Services or third party plugins to your Transmit environment.|
|Front-end or client-side logs|✔️|If an issue is happening on Transmit UI, we can grab .HAR files and Network traces to further clarify any question that might rise while investigation is performed.| 
|Robo3T|✔️|Robo 3T (formerly Robomongo) is a popular desktop graphical user interface (GUI) for your MongoDB hosting deployments that allows you to interact with your data through visual indicators instead of a text-based interface. This open source tool has cross-platform support and actually embeds the mongo shell within its interface to provide both shell and GUI-based interaction.|

<br>

> I created my own Journey called ```money_transfer```, in which I've understood how to use AuthScript to either check parameters coming from the client's request or to display some information that we have stored like user id.
> 
>![transfer_money, screenshot of journey diagram](./transfer_money.png)

***November 11th***:
* Tests in my mock environment. ✅
* Tests in Oam's environment. ✅
* Delivered solution tested and fully functional. ✅
* Created the following documentation for the team:
>![robo3t-connection-1](./robo3t-connection-1.png)

>![robo3t-connection-2](./robo3t-connection-2.png)

<br>

* *Shadowing sessions*:
  * Day 7, 8 ✅


|   Topic	|   Status	|   Comments	|
|---	|---	|---	|---	|---	|
|Types of authenticators|✔️|<ul><li>***Centralized:*** the data of the authenticator is stored either by Transmit (*Authentication Databases*) or Transmit can handle where this data is coming from and validated it (Identity Store, LDAP, Custom Web Service).</li><li>***Local***: This one its performed in the user's device, meaning that Transmit doesn't perform the authentication directly its just gets the confirmation from the local authenticator (FaceID, Fingerprint, Biometric authentication).</li></ul> |   
|Authentication Databases|✔️|These databases store the authentication information of users, scoped to specific centralized authenticators, it looks like a tongue-twister, I know. You can find them within *Platform Tab > Authentication Databases* |   	
|Authentication option screen|✔️|Journey that let us Register, Deregister, set as default or change any available authenticator.| 
|Registering Authenticator|✔️|This is one of the Journeys initiaded by events insted of the application, this will execute its content or policy whenever we try to register a new authenticator.|
|Deregistering Authenticator|✔️|It's the same as the one above but for deregistering it.|

<br>


***November 12th***:
* *Shadowing sessions*:
  * Day 9, 10, 11 ✅

|   Topic	|   Status	|   Comments	|
|---	|---	|---	|---	|---	|
|Server Roles|✔️|<ul><li>*Auth-control standalone:* As his name tells it has both the administrator role (Front-end, console, Transmit UI) and the auth-control role, which you can say its the back-end of the server.</li><li>*Auth-control administrator:* Transmit Console or Transmit's Front-end.</li><li>*Auth-control:* Back-end of Transmit.</li></ul>|   
||||   	
|||| 

* Checked AuthScript reference guide and made a summary document of which I think are the most useful OOB functions and objects:

***November 13th***:
* *Shadowing sessions*:
  * Day 12, 13, 15 ✅

|   Topic	|   Status	|   Comments	|
|---	|---	|---	|---	|---	|
||||   
||||   	
|||| 

* *Shadowing sessions* ✅
<br>

> ## Fourth Week
### From November 16th to the 20th.

<br>

***November 16th***:
* Went to UltraPark 1 to grab work PC ✅
  * There were some installations pending on the PC ✅
  * Also there was a Microsoft BDE encryption pending on the PC ✅
* Got my payments documentation and signed them ✅
* When I got home, Google access was not working, so Gmail and Google SSO were not and still not working, so, neither Slack nor Zoom access, neither acess to training videos since this day. ❗
  
<br>

***November 17th***:
  
<br>

***November 18th***:
* Linux Training 1/2 with Arjun ✅ ⚪ 	
  
|   Topic	|   Status	|   Comments	|
|---	|---	|---	|---	|---	|
|Linux Overview|✔️| As Transmit's Service works on Linux, we need to be able to answer the question what is Linux?, In a simple way, an operating system, on the bigger perspective? *96.3% of the world's top 1 million servers run on Linux, fun fact, right?* Go and check this: [documentation](https://www.linux.com/what-is-linux/).  |   
|Linux Structure|✔️| We understood Linux's  architecture and how the Shell works as an interface to the Kernel to help us hiding the complexity of the [machine code](https://simple.wikipedia.org/wiki/Machine_code#:~:text=Machine%20code%20is%20a%20computer,the%20computer%20can%20execute%20them.). We also understood the Directory Structure, and finally we got to know all the distros availabile for Linux. |   	
|Linux Commands|✔️| <ul><li>Starting with the simple and powerful ```man``` command, like in ```man ls```, in this case ```man``` helps us on displaying the help documentation for the ```ls``` command, but it works for all of the commands that have documentation to show</li><li>Then we have the ```ls``` command that lists all the files in the current directory.</li><li>Then we have the ***change directory*** or ```cd``` command which will, as it names reveals, to change the instance of our bash session to the directory of our choice. </li><li>Other important commands: <ul><li>```vi``` [check it out](https://www.cs.colostate.edu/helpdocs/vi.html).</li><li>```mkdir``` [check it out](https://www.geeksforgeeks.org/mkdir-command-in-linux-with-examples/).</li><li>```cat``` [check it out](https://www.geeksforgeeks.org/cat-command-in-linux-with-examples/).</li></ul></li></ul> |

<br>

***November 19th***:

<br>

***November 20th***:
* Started on building personalized Learning Tracker/Training Roadmap using Markdown and then exporting to PDF using VSCode.
* Linux Training 2/2 with Arjun ✅ ✅	
  
|   Topic	|   Status	|   Comments	|
|---	|---	|---	|---	|---	|
|Linux Commands 2|✔️| We got to understand how to use pipelines to use one of our commands output as input for the next command. Also we got to know ```cp```, ```mv``` and the ```rm``` commands to copy, move and remove commands respectivally. Also we have a couple of interesting commands in ```head ``` and ```tail``` that will help us on investigating logs in Transmit's servers. Additionally we have one of the most useful commands for support ```grep```, that will helps us on filtering by a search pattern. <ul><li>Other important commands: <ul><li>```su``` [check it out](https://www.cs.colostate.edu/helpdocs/vi.html).</li><li>```chmod``` [check it out](https://www.geeksforgeeks.org/mkdir-command-in-linux-with-examples/).</li><li>```tar``` [check it out](https://www.geeksforgeeks.org/cat-command-in-linux-with-examples/).</li><li>```kill``` [check it out](https://www.geeksforgeeks.org/cat-command-in-linux-with-examples/).</li><li>```ssh``` [check it out](https://www.geeksforgeeks.org/cat-command-in-linux-with-examples/).</li></ul></li></ul>|

<br>

> ## Fifth Week
### From November 23th to the 28th.

<br>

### ***Note:*** 
1. Still haven't got acess to neither Salesforce nor Sharefile. ❗
1. Still blocked out of several tools (Gmail, drive, zoom and slack due to google SSO.) ❗ 
<br>

***November 23th***:
* Continued on building personalized Learning Tracker/Training Roadmap using Markdown and then exporting to PDF using VSCode. 🔜
* Practicing Linux, checking if mongodb scripts can be chronologically scheduled, this will open some doors for customers. 🔜


***November 24th***:
* Continued on building personalized Learning Tracker/Training Roadmap using Markdown and then exporting to PDF using VSCode. 🔜
  * Discussed with Madhav in a call about collaborating and share the knowledge that we've gathered so far and build-up to this Learning Tracker. ✔️
  * We'll have a call tomorrow to continue this building. 🔜
* Created GITS ticket to get Forcepoint re-installed and to install needed tools Git and Nodejs. 🔜
* Migrated my personal PC to Ubuntu, to keep practicing Linux Daily.

***November 25th***:
* Continued on building personalized Learning Tracker/Training Roadmap using Markdown and then exporting to PDF using VSCode. 🔜
  * Collaborated with Madhav. ✔️
* We'll have a call tomorrow to continue this building. 🔜
* No update from GITS ticket to get Forcepoint re-installed and to install needed tools Git and Nodejs. 🔜
* Karthick sent an email to create my Salesforce account. ✔️
* Salesforce account created. ✔️

***November 26th***:
* Continued on building personalized Learning Tracker/Training Roadmap using Markdown and then exporting to PDF using VSCode. 🔜
* No update from GITS ticket to get Forcepoint re-installed and to install needed tools Git and Nodejs. ❗
* Salesforce account created, but no able to access due to Google SSO is blocked, this is a huge blocker. ❗