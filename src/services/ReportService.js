class Report {
    constructor() {
        this.matches = [];
    }

    async main(lines){
        let actual_match = 0;
        for await (let line of lines) {
            if(line.includes("InitGame")){
                actual_match++;
                this.matches.push({
                    match: actual_match,
                    total_kills: 0,
                    players: [],
                    kills: [],
                    death_causes: [],
                });
            }
            if(line.includes("ClientUserinfoChanged")){
                let player_nickname = this._getPlayerNickname(line);
                this.registerPlayer(actual_match,player_nickname)
            }
            if(line.includes("Kill")){
                let line_split = line.split(":")[3].split(" killed ");
                let who_killed = this.removeSpaces(line_split[0]);
                line_split = line_split[1].split(" by ");
                let who_died = this.removeSpaces(line_split[0]);
                let death_type = this.removeSpaces(line_split[1]);
                this.registerKill(actual_match, who_killed, who_died);
                this.registerDeathCauses(actual_match, death_type);
            }
        }
        return this.matches;
    }

    registerPlayer(match, nick_name){
        let players = this.matches[match - 1].players
        players.push(nick_name);
        this.matches[match - 1].players = [...new Set(players)];
    }

    registerKill(match, who_killed, who_died){
        let remove_kill = false;
        this.countTotalKills(match)
        if(who_killed === "<world>"){
            who_killed = who_died
            remove_kill = true;
        }
        let matchKills = this.findMatchKills(match, who_killed)
        if(matchKills){
            if(remove_kill){
                matchKills.kills -= 1
            } else {
                matchKills.kills += 1
            }
            return;
        }
        this.matches[match - 1].kills.push({
            player: who_killed,
            kills: 1,
        });
    }

    registerDeathCauses(match, death_type){
        let matchDeathCauses = this.findMatchDeathCauses(match, death_type)
        if(matchDeathCauses){
            matchDeathCauses.count += 1
            return;
        }
        this.matches[match - 1].death_causes.push({
            cause: death_type,
            count: 1,
        });
    }

    //private functions
    _getPlayerNickname(line){
        return line.split("n\\")[1].split("\\")[0];
    }

    countTotalKills(match){
        this.matches[match - 1].total_kills += 1;
    }

    removeSpaces(str){
        return str.trim().trimEnd();
    }

    findMatchKills(match,nick_name){
        return this.matches[match - 1].kills.find(el => el.player === nick_name) ?? false
    }

    findMatchDeathCauses(match, death_type) {
        return this.matches[match - 1].death_causes.find(el => el.cause === death_type) ?? false
    }
}
module.exports = Report;