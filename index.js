const file_path = './qgames.log';
const express = require('express')
const FileReader = require('./src/FileReader');
const Report = require('./src/Report');
const GameRank = require('./src/Rank');

async function main() {
    const fileReaderService = new FileReader(file_path);
    const reportService = new Report();
    const gameRankService = new GameRank();

    const fileData = await fileReaderService.read();
    const gameData = await reportService.main(fileData);
    const rankData = await gameRankService.getRank(gameData);
}

main();
