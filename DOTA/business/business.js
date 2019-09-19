function BussinesLayer() {
    this.dataLayerObj = new DataLayer;

    
    this.heroinfo;
  


    this.editPlayersLatestMatchData = async (account_id) => {
        await this.dataLayerObj.populatePlayersLatestGames(account_id);
        await this.dataLayerObj.populateHeroInfo();
        var apiResponse = this.dataLayerObj.getPlayersLatestGames();
        console.log(apiResponse)
        var MatchList = [];
        // console.log(apiResponse.result.matches[1].players[1].player_slot)
        function Match(match_id, start_time, lobby_type) {

            this.match_id = match_id;
            this.start_time = start_time;
            this.lobby_type = lobby_type;


            this.radiant_heroesByID = [];
            this.radiant_heroesByName = [];  // za prikazuvanje
            this.radiant_heroesByTempName = [];  // za fakanje sliki
            this.radiant_heroesImg = [];


            this.dire_heroesByID = [];
            this.dire_heroesByName = [];  // za prikazuvanje
            this.dire_heroesByTempName = [];  // za fakanje sliki
            this.dire_heroesImg = [];


            this.match_startTime;
            
            

        }





        var heroNames = this.dataLayerObj.getHeroInfo();


        for (let i = 0; i < apiResponse.result.matches.length; i++) {

            // console.log(heroNames)
            var editedMatch = (new Match(apiResponse.result.matches[i].match_id, apiResponse.result.matches[i].start_time, apiResponse.result.matches[i].lobby_type))

            for (let x = 0; x < apiResponse.result.matches[i].players.length; x++) {
                if (apiResponse.result.matches[i].players[x].player_slot >= 0 && apiResponse.result.matches[i].players[x].player_slot <= 4) {
                    editedMatch.radiant_heroesByID.push(apiResponse.result.matches[i].players[x].hero_id)

                }
                else if (apiResponse.result.matches[i].players[x].player_slot >= 128 && apiResponse.result.matches[i].players[x].player_slot <= 132) {
                    editedMatch.dire_heroesByID.push(apiResponse.result.matches[i].players[x].hero_id)
                }


            }

            MatchList.push(editedMatch)
            // console.log(MatchList)

        }




        for (let o = 0; o < MatchList.length; o++) {


            for (let q = 0; q < MatchList[o].radiant_heroesByID.length; q++) {
                for (let w = 0; w < heroNames.heroes.length; w++) {
                    if (MatchList[o].radiant_heroesByID[q] === heroNames.heroes[w].id) {
                        MatchList[o].radiant_heroesByName[q] = heroNames.heroes[w].localized_name
                    }
                }
            }

            for (let q = 0; q < MatchList[o].dire_heroesByID.length; q++) {
                for (let w = 0; w < heroNames.heroes.length; w++) {
                    if (MatchList[o].dire_heroesByID[q] === heroNames.heroes[w].id) {
                        MatchList[o].dire_heroesByName[q] = heroNames.heroes[w].localized_name
                    }
                }
            }

            for (let q = 0; q < MatchList[o].radiant_heroesByID.length; q++) {
                for (let w = 0; w < heroNames.heroes.length; w++) {
                    if (MatchList[o].radiant_heroesByID[q] === heroNames.heroes[w].id) {
                        MatchList[o].radiant_heroesByTempName[q] = heroNames.heroes[w].name
                    }
                }
            }

            for (let q = 0; q < MatchList[o].dire_heroesByID.length; q++) {
                for (let w = 0; w < heroNames.heroes.length; w++) {
                    if (MatchList[o].dire_heroesByID[q] === heroNames.heroes[w].id) {
                        MatchList[o].dire_heroesByTempName[q] = heroNames.heroes[w].name
                    }
                }
                

            }
        
            for (let h = 0; h < MatchList[o].radiant_heroesByID.length ; h++) {
                MatchList[o].radiant_heroesImg.push("http://media.steampowered.com/apps/dota2/images/heroes/"
                    + MatchList[o].radiant_heroesByTempName[h]
                    + "_full.png"

                )
            }
            
            for (let q = 0; q < MatchList[o].dire_heroesByName.length; q++) {

                MatchList[o].dire_heroesImg.push("http://media.steampowered.com/apps/dota2/images/heroes/"
                    + MatchList[o].dire_heroesByTempName[q]
                    + "_full.png"
                )
            }

            MatchList[o].match_startTime = timeConverter(MatchList[o].start_time)
           
        }
        
        

        return MatchList;
    }



    this.DetailedMatchData = async (match_id) =>{

        await this.dataLayerObj.populatedetailedMatchData(match_id);
        data = this.dataLayerObj.getdetailedMatchData();
        // console.log(data)

        var matchDetails = {

            winner : data.result.radiant_win ,
            duration : data.result.duration ,
            players : data.result.players , 
            radiantscore : data.result.radiant_score ,
            direscore : data.result.dire_score, 

        }

        // console.log(matchDetails);
        return  matchDetails;
        
    }


    this.populateBussinesHeroInfo = async ()=>{
        await this.dataLayerObj.populateHeroInfo();
        this.heroinfo = this.dataLayerObj.getHeroInfo();
        return this.heroinfo
    }
    

    
    


}
