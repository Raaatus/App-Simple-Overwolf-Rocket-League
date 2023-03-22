# App-Simple-Overwolf-Rocket-League

Basic applications and explanations of the overwolf API with ROCKET LEAGUE as an example

**It's not necessarily easy, but if you follow these steps in order, it should work.**

`This application aims to introduce you to the Overwolf API.`

We use Rocket League as an example here, but by modifying the code a little, we can use it for any game. 

Its purpose is to listen to the game events and depending on each event `(goal, save, victory, defeat, etc...)`
It will be able to output a variable. 

This repository is intended for a public that already has some knowledge.
>For a novice, it may be complicated to understand.

Personally, I use this application to get the goal events or others and depending on the output variable, I change the color of my leds.
When I score a goal, it blinks blue or red everywhere.

You will need a developer account at Overwolf (free), you will have to make a request on their website.

>It is important to note that we only use a very small part of the global Overwolf api.
### Summary
1. [Get Started](#get-started).
    - [Developper Account Overwolf](#developer-account-overwolf).
2. [Installation Application](#installation).
    - [Test Program](#test-program).
3. [Explaination](#explaination)
    - [Manifest.json](#manifest-json).
    - [Index.html](#index-html).
    - [Main.js](#main-js).
    - [Example Return Json Event](#example-of-json-return-during-the-game).
       - [Simple Data Json](#simple-data-key).
       - [String Data Json](#string-data-and-non-printable-character).
4. [Conclusion](#conclusion)



## Get Started

As a first step, here are some links that will explain more in depth the details of the api : 

>Here for the global api : https://overwolf.github.io/api/

>Here for the Overwolf Get Started : https://overwolf.github.io/start/getting-started

>Finally, here for the supported games : https://overwolf.github.io/api/games/events

#### Requierement : 
```
-VsCode or Similar
-The trust game
-Overwolf Application
-Developper Account Overwolf
-A lot of courage
```

#### Developer Account Overwolf

- First of all, you have to create an account.
- Once you confirm everything with the mail, go [here](https://overwolf.github.io/start/getting-started/submit-app-proposal).
- Login and write a description of why your application idea is cool.
- Your request will be processed normally during the day, personally it took 1h30.




## Installation
This is a tutorial to install the applications.
If you just want to test, go to the "[Test Program](#test-program)" section before installing the application.

After downloading and installing overwolf.
Then after confirming your account as a developer.

We will be able to download the file in zip, normal download via browser or : 
```bash
git clone https://github.com/RaitNaoo/App-Simple-Overwolf-Rocket-League.git
```
- Unzip.
- Modify what you want.
- Then go to Overwolf > Setting > About > Development Option. 
>(alternative) -Startup Menu > Right Click in overwolf > Packages.

- A browser should open, do "Load Unpacked extension..." 
- Then select the previously unzipped folder.
- Congratulations, you have installed your first Overwolf application.


#### Test Program
Quick tuto to test the application and get results:

- Download the zip file and unzip it 
- Go to the `main.js` code
- Uncomment line 69

```js
66  overwolf.games.events.onNewEvents.addListener(function(json) {
67  // Uncomment this line to be able to see all the events of the game in real time on the "textearea" of the index.html
68
69  // document.getElementById('textareaMessage').value = document.getElementById('textareaMessage').value + JSON.stringify(json) ;
70
71
72 //############################## DETERMINE THE COLOR OF THE TEAM, (OPTIONAL)##############################################################################################
73
74    if (team ==0) //If the team is not known / If the match is a new match starts
75    {
```
Now when you launch the application, the "TextArea" contained in `index.html` will update with all captured events.

**START UR GAME BEFORE LOL**

And also sometimes, you will have to restart the application, because not all binaries are loaded when the game starts.



## Explaination

#### Manifest json

The magnifest is used to identify each application, coordinate the right game data with the right ID.

It can also be used to initialize actions at game launch. 

https://overwolf.github.io/api/manifest

##### In detail:
```json
{
  "manifest_version": "2",  
  "type": "WebApp",
  "meta": {
    "name": "App Test Rocket League",
    "version": "2.0.0.0",
    "minimum-overwolf-version": "0.97.208.0",
    "author": "RaitNaoo",
    "icon": "icon.png",
    "icon_gray": "icon_gray.png",
    "description": "RocketLeague sample App test"
  },
  "data": {
    "start_window": "index",  #the head of the program
    "windows": {
      "index": {
        "file": "index.html", #the head of the program
        "transparent": false,
        "clickthrough": false,  
        "resizable": true,
        "show_in_taskbar": true,
        "size": {
          "width": 500,
          "height": 500
        },
        "start_position": {
          "Top": 1000,
          "Left": 10
        }
      }
    },
     "game_targeting": {  #The game for which the application is launched
        "type": "dedicated",
        "game_ids": [
          10798       #The game id, here Rocket League
        ]             #Refer to the game IDs in the Get Started
      },
    "game_events": [
      10798
    ],
    "launch_events": [  #When should the program run
      {
        "event": "GameLaunch",  #The program is launched when the game starts if ovelwolf is activated
        "event_data": {
          "game_ids": [
            10798
          ]
        },
        "start_minimized": false
      }
    ]
  }
}
```

#### Index html

Here the textArea will be used to debug.

We also activate the `main.js` in the scripts.
```html
<script src="main.js"></script>
  </head>
  <body>
      <h3 id="title">Rocket League Sample App</h3>
      <textarea id="textareaMessage" rows="100000" readonly="true"></textarea>
  </body>
```




#### Main js

The script works with my game name, just change all the "RaitNaoo" by your nickname.

Don't hesitate to do [Test Program](#test-program) to get some events yourself.


For  `send_request(string)` :  For more information, it is complicated to get a variable out of a JavaScript, to export it elsewhere.

JS is a client language and is therefore by default not powerful enough, especially since it is not a script execution. 
Moreover in this configuration with Overwolf, it is absolutely not practical.

>Node.js could be a solution (to be explored).

In fact I send me an http request on the loopback with the parameters in the headers, on the other side I have a script in C# that allows me to listen on this same port, the requests sent.

```js
//These are the names of the different events to retrieve 
var requestedFeatures = [
     
    'stats',
    'roster',
    'match',
    'me',
    'match_info',
    'game_info'

];

//


var team = 0;  // Team red or blue
               // 0 = Nothing ; 1 = Blue ; 2 = Red




/////Functions to send an http request with the variable
//One of the only way I found to pass a js variable
function send_request(string)
{
  var p = string;
  fetch('http://localhost:6930', {
    method: p,
    headers: {
    }
    
     })
}
//

//Here we will check the events of the game (rocket league) previously chosen in the "requestedFeatures" variable;
  overwolf.games.events.setRequiredFeatures(requestedFeatures, function(info) {
      if (info.success != false)
      {
        document.getElementById('textareaMessage').value = "Error set requierement";
        return;
      }
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//The main function receives all the game events, depending on the event, it will execute the associated function

//For exemple : 
//I just made a stop under the red color, 
//so the script will output the function "send_request("Save-Red")"

  overwolf.games.events.onNewEvents.addListener(function(json) {
  //Uncomment this line to be able to see all game events in real time on the "textearea" of the index.html

//    document.getElementById('textareaMessage').value = document.getElementById('textareaMessage').value + JSON.stringify(json);


//############################## DETERMINE THE COLOR OF THE TEAM, (OPTIONAL)##############################################################################################

    if (team ==0)   //If the team is not known / If the match a new match starts
    {
      if(json["events"][0]["name"]=="rosterChange")  //If there is no team and the "RosterChange" event spawn, then check its content 
      {
        var roster = JSON.parse(json["events"][0]["data"]);  //Convert the data table (string) of the event to JSON
                                                            //See the event before this treatment in "example_json_event.json" in the folder
                                                            // And see after in  "exemple_json_event_data.json"

        const regex = /"name":"RaitNaoo"/g; // If it the key "name" contains the string here "RaitNaoo" 
        for(let i = 0; i <   roster["roster"].length; i++ )
        {
          const found = JSON.stringify(roster["roster"][i]).match(regex); // Same
          if(found!=null)
          {
            const regex1 = /"team":"1"/g; 
            const found1 = JSON.stringify(roster["roster"][i]).match(regex1); //See if now it contains the key "team" and if it corresponds to the blue team
            if(found1!=null)  { team = 1; } // If "yes" then team = 1 = blue
            else  { team = 2;  } //red
          }
        }
      }
    
    }
    
    //function to reset the team to 0 to avoid conflicts between red and blue
    if(json["events"][0]["name"]=="matchEnd")
    {
      team = 0;
    }

//########################################################################################################################################################################




//Here we check if the event name is "teamGoal" which means that there is a goal, and that it is your team
    if(json["events"][0]["name"]=="teamGoal")
    {
      
      const regex = /\"name\": \"RaitNaoo\"/g;
      const found = json["events"][0]["data"].match(regex); // We check if the name "RaitNaoo" exists which would confirm that it is RaitNaoo who scored the goal
      
      if(found!=null){if(team == 1 || team == 0){send_request("GOALBLUE")}else if(team == 2){send_request("GOALRED")}}
      //If yes then send to "send_request" if team = 0 (default) or 1 then send GoalBlue otherwise GoalRed
    }


//We get the event if it corresponds to "action_point".
    if(json["events"][0]["name"]=="action_points")
    {
      //It will check the different occurrences, if one excists then it will check the team and send accordingly
      if(json["events"][0]["data"] == "Epic Save"){if(team == 1 || team == 0){send_request("Epic-Save-Blue")}else if(team == 2){send_request("Epic-Save-Red")}}
      if(json["events"][0]["data"] == "Save"){if(team == 1 || team == 0){send_request("Save-Blue")}else if(team == 2){send_request("Save-Red")}}
      if(json["events"][0]["data"] == "Assist"){if(team == 1 || team == 0){send_request("Assist-Blue")}else if(team == 2){send_request("Assist-Red")}}
    }



//Here the last two events are checked, if it is a victory or a defeat
    if(json["events"][0]["name"]=="victory")
    {
      var vicc = JSON.parse(json["events"][0]["data"]);

      if(parseInt(vicc["team_score"])>=3)//Check in the DATA of the event, if the goals scored are more than 3
      {
        send_request("END-WIN-2");
      }
      else{send_request("END-WIN-1");}
    }


    if(json["events"][0]["name"]=="defeat")
    {send_request("END-LOOSE");}
  
 })
;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

```


#### Example of json return during the game

There are 2 types of responses in json: 

- The one with a simple data key ```"data": "name: RaitNaoo" ```

- The one with a string data and non printable character : ```"data": "{\r\n "roster": [\r\n "steamId\": \"steamId\n": "0"```

View more here:
- https://overwolf.github.io/api/games/events/rocket-league
- https://overwolf.github.io/api/games/events

##### simple data key

Directly readable, just pick.

```json
{
    "roster": [
        {
            "steamId": "0",
            "score": 0,
            "goals": "0",
            "name": "RaitNaoo",
            "state": "0",
            "team_score": 0,
            "team": "1",
            "local": "1",
            "index": 0
        },
        {
            "steamId": "1",
            "score": 0,
            "goals": "0",
            "name": "Saltie",
            "state": "64",
            "team_score": 0,
            "team": "2",
            "local": "0",
            "index": 1
        }
    ]
}
```

##### string data and non printable character

We will have to check the variable twice, once for the name and a second time with a `Json.Parse(json["events"][0]["data"])` to be able to check its content.

```json
{
    "events": [
        {
            "name": "rosterChange",
            "data": "{\r\n  \"roster\": [\r\n    {\r\n      \"steamId\": \"0\",\r\n      \"score\": 0,\r\n      \"goals\": \"0\",\r\n      \"name\": \"RaitNaoo\",\r\n      \"state\": \"0\",\r\n      \"team_score\": 0,\r\n      \"team\": \"1\",\r\n      \"local\": \"1\",\r\n      \"index\": 0\r\n    }\r\n  ]\r\n}"
        }
    ]
}

{
    "events": [
        {
            "name": "rosterChange",
            "data": "{\r\n  \"roster\": [\r\n    {\r\n      \"steamId\": \"0\",\r\n      \"score\": 0,\r\n      \"goals\": \"0\",\r\n      \"name\": \"RaitNaoo\",\r\n      \"state\": \"0\",\r\n      \"team_score\": 0,\r\n      \"team\": \"1\",\r\n      \"local\": \"1\",\r\n      \"index\": 0\r\n    },\r\n    {\r\n      \"steamId\": \"1\",\r\n      \"score\": 0,\r\n      \"goals\": \"0\",\r\n      \"name\": \"Saltie\",\r\n      \"state\": \"64\",\r\n      \"team_score\": 0,\r\n      \"team\": \"2\",\r\n      \"local\": \"0\",\r\n      \"index\": 1\r\n    }\r\n  ]\r\n}"
        }
    ]
}
```

## Conclusion

If you have understood everything, I invite you to try the [Test Program](#test-program) followed by [Installation Application](#installation). 

**Do not hesitate if there is a problem with the issues.**
