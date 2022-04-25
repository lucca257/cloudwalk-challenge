const FileReader = require('../services/FileReaderService');
const Report = require('../services/ReportService');
const GameRank = require('../services/RankService');

module.exports = {
  async index(req, res, next) {
    try{
      const file_path = './src/logs/quake.log';
      const fileReaderService = new FileReader(file_path);
      const reportService = new Report();
      const gameRankService = new GameRank();

      const fileData = await fileReaderService.read();
      const gameData = await reportService.main(fileData);
      const gameRank = await gameRankService.main(gameData);
      return res.json({
        "data": gameRank
      })
    } catch (e) {
      console.log(e);
      return res.json({
        "data": null,
        "message": e.message
      });
    }
  }
}