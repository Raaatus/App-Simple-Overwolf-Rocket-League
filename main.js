//////////////////////////////////////////////
//  RaitNaoo                                //
//  https://github.com/RaitNaoo             //
//                                          //
//  Simple test app Rocket League Overwolf  //
//                                          //
//////////////////////////////////////////////


//In order to understand the script, I invite you to read carefully the README.me page



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
//Here we will check the events of the game (rocket league) previously chosen in the "requestedFeatures" variable;
  overwolf.games.events.setRequiredFeatures(requestedFeatures, function(info) {
      if (info.success != false)
      {
        //document.getElementById('textareaMessage').value = "Error set requierement";
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


  
  //  document.getElementById('textareaMessage').value = document.getElementById('textareaMessage').value + JSON.stringify(json);


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
