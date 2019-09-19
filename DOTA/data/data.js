function DataLayer() {

    this.playersLatestGames = {};
    this.persistanceLayerObj = new DotaApi;
    this.heroInfo;
    this.detailedMatchData  = {};

    this.populatePlayersLatestGames = async (account_id) => {
        this.playersLatestGames = await this.persistanceLayerObj.getPlayersLatestGames(account_id);
        console.log(account_id)
    };

    this.getPlayersLatestGames = () => {
        return this.playersLatestGames
    };

    this.populateHeroInfo = async () =>{
        this.heroInfo = JSON.parse(await this.persistanceLayerObj.getHeroDetails());
        // console.log(this.heroInfo)
    }

    this.getHeroInfo =  () =>{
        return this.heroInfo;
    }

    this.populatedetailedMatchData = async(match_id) => {
        this.detailedMatchData = await this.persistanceLayerObj.getMatchDetails(match_id);

    }

    this.getdetailedMatchData = () =>{
        return this.detailedMatchData;
    }
    
    
}

