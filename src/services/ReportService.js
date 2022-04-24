class Report {
    constructor() {
        this.matches = [];
    }

    async main(lines){
        let actual_match = 0;
        for await (let line of lines) {
            if(line.includes("InitGame")){
                actual_match++;
                this._initMatch(actual_match);
            }
            if(line.includes("ClientUserinfoChanged")){
                let player_nickname = this._getPlayerNickname(line);
                this.registerPlayer(actual_match,player_nickname)
            }
            if(line.includes("Kill")){
                const kill_info = this._getKillInformation(line)
                this.registerKill(actual_match, kill_info.killer, kill_info.killed)
                this.countTotalKills(actual_match)
                this.registerDeathCauses(actual_match, kill_info.death_cause);
            }
        }
        return this.matches;
    }

    registerPlayer(match, nick_name){
        let players = this.matches[match - 1].players
        players.push(nick_name);
        //prevent register the same player twice
        this.matches[match - 1].players = [...new Set(players)];
    }

    registerKill(match, who_killed, who_died){
        let remove_kill = false;
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

    _getPlayerNickname(line){
        return line.split("n\\")[1].split("\\")[0];
    }

    _getKillInformation(line) {
        let line_split = line.split(":")[3].split(" killed ");
        let killer = this.removeSpaces(line_split[0]);
        line_split = line_split[1].split(" by ");
        return {
            killer: killer,
            killed: this.removeSpaces(line_split[0]),
            death_cause: this.removeSpaces(line_split[1]),
        };
    }

    _initMatch(actual_match){
        this.matches.push({
            match: actual_match,
            total_kills: 0,
            players: [],
            kills: [],
            death_causes: [],
        });
    }
}
module.exports = Report;