class GameRank {
  constructor() {
    this.rank = [];
    this.all_kills = [];
  }

  async main(gameData) {
      gameData.map(game => {
          game.kills.map(player_kills => {
              this.all_kills.push(player_kills);
          });
      })
      return this.sumPlayerKills()
  }

  sumPlayerKills() {
      this.rank = this.all_kills.reduce((accumulator, cur) => {
          let nick_name = cur.player
          let found = accumulator.find((elem) => {
              return elem.player === nick_name
          });
          if (found) found.kills += cur.kills;
          else accumulator.push(cur);
          return accumulator;
      }, []);
      this.orderRank()
      return this.rank
  }

  orderRank() {
      this.rank.sort((a, b) => {
          return b.kills - a.kills;
      });
  }

}
module.exports = GameRank;