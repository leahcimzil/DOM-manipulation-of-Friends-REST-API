(function(){
	

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
	    .then(function(response){
	        return response.json();
	    })
	    .then(function(json){
			data = json;
			

	        //1 - Implement the function called getGuntherCount which returns the total number of episodes 
	        // where the character Gunther is mentioned in the eGpisode summary.
	        console.log('--------------------------------');
	        console.log(`Gunther Count: ${getGuntherCount(json)}`);

	        //2 - Implement the function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
	        console.log('--------------------------------');
	        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

	        //3 - Implement the function called getTotalEpisodesInYear() that returns the number of episodes that aired in the year 2000
	        console.log('--------------------------------');
	        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, '2000')}`);

	        //4 - Implement the function called getFemaleCastMembers() that returns an array of the names of the female cast members.
	        console.log('--------------------------------');
	        console.log(`Female Cast Members:`);
	        console.log(getFemaleCastMembers(json));

	        //5 - Implement the function called getEpisodeTitles() which returns a list of episode
	        //    where the argument string is found in the episode summary.
	        console.log('--------------------------------');
	        console.log(`Episodes that mention Ursula:`);
	        console.log(getEpisodeTitles(json, 'Ursula'));

	        //6 - Implement the function called getCastMembersOver55() which returns a list of cast members
	        //    who are currently 55 years of age or older.
	        console.log('--------------------------------');
	        console.log(`Cast Members who are currently 55 or older:`);
	        console.log(getCastMembers55OrOlder(json));

	        //7 - Implement the function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
	        //    runtime minutes for all episodes excluding episodes in season 6
	        console.log('--------------------------------');
	        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
	        //8 - Implement the function called getFirstFourSeasons that gets the episodes for the first four seasons 
	        //    but only return an array of JSON objects containing the season number and episode name
	        console.log('--------------------------------');
	        console.log(`Episode JSON for first four seasons:`)
	        console.log(getFirstFourSeasons(json));

	        //9 - Implement the function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
	        console.log('--------------------------------');
	        console.log(`Tally of episodes by season:`);
	        console.log(getEpisodeTallyBySeason(json));

	        //10 - Implement the function called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
	        //the name and summary of the episodes.
	        console.log('--------------------------------');
	        console.log(`Capitalized Friends:`);
	        console.log(capitalizeTheFriends(json));

	    })

// Access API by creating Functions using map, filter, reduce

	function getGuntherCount() { 
		return data._embedded.episodes.filter(str=>str.summary.includes('Gunther')).reduce((acc, val) => acc + 1,0);
	}
	
	function getTotalRuntimeMinutes() { // <- you may or may not need to define parameters for your function
		return data._embedded.episodes.map(x=>x.runtime).reduce((prev,curr) => prev+curr,0)
	}
	
	function getTotalEpisodesInYear() { // <- you may or may not need to define parameters for your function
		return data._embedded.episodes.filter(x=>x.airdate > '2000-01-01').filter(x=>x.airdate < '2001-01-01').reduce((acc, val) => acc + 1, 0);
	}
	
	function getFemaleCastMembers() { // <- you may or may not need to define parameters for your function
		return data._embedded.cast.map(x=>x.person).filter(x=>x.gender=='Female').map(x=>x.name);
	}
	
	function getEpisodeTitles(arr,arg) { // <- you may or may not need to define parameters for your function
		
		return arr._embedded.episodes.filter(str=>str.summary.includes(arg)).map(x=>x.number);
		// return arr._embedded.episodes.filter(str=>str.summary.includes(arg)).map(x=>x.season)
	}
	
	function getCastMembers55OrOlder() { // <- you may or may not need to define parameters for your function
		return data._embedded.cast.map(x=>x.person).filter(x=>x.birthday<='1966-01-01').map(x=>x.name) 
	}
	
	function getTotalRuntimeMinutesExcludingSeasonSix() { // <- you may or may not need to define parameters for your function
		return data._embedded.episodes.filter(x=>x.season !== 6).map(x=>x.runtime).reduce((prev,curr) => prev+curr,0)
	}
	
	function getFirstFourSeasons() { // <- you may or may not need to define parameters for your function
		return data._embedded.episodes.filter(x=>x.season<5);
	}
	
	function getEpisodeTallyBySeason() { // <- you may or may not need to define parameters for your function
		return data._embedded.episodes.map(x=>x.season).reduce((prev,curr)=>{prev[curr]=(prev[curr] || 0)+1; return prev;},{});
	}
	
	function capitalizeTheFriends() { // <- you may or may not need to define parameters for your function
		return data._embedded.episodes.map(x=>x.name.replace(/Monica|Ross|Chandler|Joey|Rachel|Phoebe/g,(x=>x.toUpperCase())));
	}
})();

