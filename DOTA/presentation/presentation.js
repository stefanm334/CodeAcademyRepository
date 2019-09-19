function Presentation() {
    this.businessObj = new BussinesLayer();
    var searchValue;
    var body = $("body")
    var root = $("<div>").attr("class", "root")
    body.append(root);
    var pageWrapper = $("<div>").attr("class", "page-wrapper")
    root.append(pageWrapper)

    var search = ($("<input type=search placeholder='Search by SteamID'>").attr("class", "searchbar")).on("keyup", () => {
        searchValue = search.val()
        console.log(searchValue)
    })
    var searchbutton = $("<button>").text("SEARCH").on("click", () => {
        console.log(searchValue)
        pageWrapper.empty().addClass("pageWrapper-onSearchClick");
        root.addClass("root-onsearch")
        this.displayPlayersLatestMatches(searchValue);

    })


    var h1 = $("<h1>").attr("class", "tittle").text("DOTA 2 STATS")
    pageWrapper.append(h1)

    var searchDiv = $("<div>").attr("class", "search-div")
    searchDiv.append(search)
    searchDiv.append(searchbutton)
    pageWrapper.append(searchDiv)




    this.displayPlayersLatestMatches = async (account_id) => {
        var display = await this.businessObj.editPlayersLatestMatchData(account_id);
        // console.log(display)

        for (let i = 0; i < display.length; i++) {
            var MatchDetailedData = await this.businessObj.DetailedMatchData(display[i].match_id);
            // console.log(MatchDetailedData)

            var MatchWrapper = $("<div>").attr("class", "match-div").attr("id", display[i].match_id)
            var MatchId = $("<div>").attr("class", "match-id").text("Match ID: " + display[i].match_id)
            var MatchTime = $("<div>").attr("class", "match-time").text("Played on: " + display[i].match_startTime)

            MatchWrapper.append(MatchId)
            MatchWrapper.append(MatchTime)

            var MatchDuration = $("<div>").attr("class", "match-duration").text("Duration  " + secondsToMinutes(MatchDetailedData.duration))
            MatchWrapper.append(MatchDuration)


            var Heroes = $("<div>").attr("class", "heroes")
            var RadiantHeroes = $("<div>").attr("class", "radiant-heroes")

            for (let k = 0; k < display[i].radiant_heroesImg.length; k++) {
                var RadiantHeroImg = $("<img>").attr("class", "radiant-heroes-img")
                RadiantHeroes.append(RadiantHeroImg.attr("src", display[i].radiant_heroesImg[k]))

            }
            Heroes.append(RadiantHeroes)
            var VS = $("<h2>").text("VS")
            Heroes.append(VS)

            var DireHeroes = $("<div>").attr("class", "dire-heroes")
            for (let k = 0; k < display[i].dire_heroesImg.length; k++) {
                var DireHeroImg = $("<img>").attr("class", "dire-heroes-img")
                DireHeroes.append(DireHeroImg.attr("src", display[i].dire_heroesImg[k]))

            }

            Heroes.append(DireHeroes)

            MatchWrapper.append(Heroes)


            MatchWinner = $("<div>").attr("class", "Match winner")
            if (MatchDetailedData.winner) {
                MatchWinner.text("Radiant Victory").attr("class", "radiantwon")
            }
            else {
                MatchWinner.text("Dire Victory").attr("class", "direwon")
            }

            MatchWrapper.append(MatchWinner)

            MoreInfo = $("<button>").attr("class", "button").text("Click for more!")
            MoreInfo.on("click", (event) => {
                this.displayDetailedMatchData(display[i].match_id)
            })
            MatchWrapper.append(MoreInfo)

            pageWrapper.append(MatchWrapper)


        }












    }


    this.displayDetailedMatchData = async (match_id) => {
        var data = await this.businessObj.DetailedMatchData(match_id)
        console.log(data)
        pageWrapper.empty()

        Matchwinner = $("<div>").attr("class", "match-winner-det")
        if (data.winner) {
            Matchwinner.text("Radiant Victory").attr("class", "radiantwon")
        }
        else {
            Matchwinner.text("Dire Victory").attr("class", "direwon")
        }

        pageWrapper.append(Matchwinner)
        FinalScore = $("<div>").attr("class", "score").text("RADIANT   " + data.radiantscore + "  :  " + data.direscore + "  DIRE")

        pageWrapper.append(FinalScore)
        duration = $("<div>").attr("class", "duration").text(secondsToMinutes(data.duration))
        pageWrapper.append(duration)

        var heroInfo = await this.businessObj.populateBussinesHeroInfo();
        // console.log(heroInfo)

        for (let i = 0; i < data.players.length + 1; i++) {

            PlayerWrapper = $("<div>").attr("class", "player-div").css("display", "flex")

            PlayerId = $("<div>").attr("class", "player-id").text("PlayerID " + data.players[i].account_id);
            PlayerHeroImg = $("<img>").attr("class", "heroimg")
            for (let k = 0; k < heroInfo.heroes.length; k++) {
                if (data.players[i].hero_id == heroInfo.heroes[k].id) {
                    PlayerHeroImg.attr("src", "http://media.steampowered.com/apps/dota2/images/heroes/" + heroInfo.heroes[k].name + "_full.png")
                }

            }


            PlayerKills = $("<div>").attr("class", "player-kills").text("Kills" + data.players[i].kills);
            PlayerDeaths = $("<div>").attr("class", "player-deaths").text("Deaths " + data.players[i].deaths);
            PlayerAssists = $("<div>").attr("class", "player-assist").text("Assists " + data.players[i].assists);
            PlayerLastHits = $("<div>").attr("class", "player-lasthits").text("LastHits " + data.players[i].last_hits);
            PlayerDenies = $("<div>").attr("class", "player-denies").text("Denies " + data.players[i].denies);
            PlayerGPM = $("<div>").attr("class", "player-gpm").text("GPM " + data.players[i].gold_per_min);
            PlayerHeroLevel = $("<div>").attr("class", "player-level").text("Level " + data.players[i].level);

            PlayerWrapper.append(PlayerId)
            PlayerWrapper.append(PlayerHeroImg)
            PlayerWrapper.append(PlayerKills)
            PlayerWrapper.append(PlayerDeaths)
            PlayerWrapper.append(PlayerAssists)
            PlayerWrapper.append(PlayerLastHits)
            PlayerWrapper.append(PlayerDenies)
            PlayerWrapper.append(PlayerHeroLevel)
            PlayerWrapper.append(PlayerGPM)




            pageWrapper.append(PlayerWrapper).addClass("on-click")

        }



    }










}