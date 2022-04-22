const readline = require("readline");
const fs = require('fs');

class FileReader {
    constructor(file_path) {
        this.file_path = file_path;
    }

    async read() {
        try {
            const lines = [];
            const rl = readline.createInterface({
                input: fs.createReadStream(this.file_path),
                crlfDelay: Infinity
            });
            for await (const line of rl) {
                lines.push(line);
            }
            return lines;
        } catch (err) {
            console.error(err);
        }
    };
}
module.exports = FileReader;