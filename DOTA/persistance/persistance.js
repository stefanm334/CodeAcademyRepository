function DotaApi() {
  this.getPlayersLatestGames = (account_id) => {
    return new Promise((resolve, reject) => {

      $.ajax({
        url:
          "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?account_id=" +
          account_id +
          "&key=6849CCD775C94101AD020516881C7A91&matches_requested=20",

        type: "GET",
        success: function (data) {

          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  };


  this.getHeroDetails = () => {
    return new Promise((resolve, reject) => {

      $.ajax({
        url:
          "https://raw.githubusercontent.com/stefanm334/CodeAcademyRepository/master/dotaheroes.json",

        type: "GET",
        success: function (data) {

          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  };


  this.getMatchDetails = (match_id) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url:
          "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=6849CCD775C94101AD020516881C7A91&match_id="
          + match_id,

        type: "GET",
        success: function (data) {

          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });


  };
}












