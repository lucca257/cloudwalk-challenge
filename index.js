const file_path = './qgames.log';
const FileReader = require('./src/FileReader');
const Report = require('./src/Report');

async function main() {
    const fileReaderService = new FileReader(file_path);
    const reportService = new Report();
    const fileData = await fileReaderService.read();
    await reportService.main(fileData);
}

main();
