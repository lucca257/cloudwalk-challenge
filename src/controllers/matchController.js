const FileReader = require('../services/FileReaderService');
const Report = require('../services/ReportService');

module.exports = {
  async index(req, res, next) {
    try{
      const file_path = './src/logs/quake.log';
      const fileReaderService = new FileReader(file_path);
      const reportService = new Report();

      const fileData = await fileReaderService.read();
      const gameData = await reportService.main(fileData);
      return res.json({
        "data": gameData
      })
    } catch (e) {
      return res.json({
        "data": null,
        "message": e.message
      });
    }
  }
}