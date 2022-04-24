const Report = require('../../services/ReportService');
const ReportService = new Report();

describe('unit report game test', () => {

    test('should recognize a player nickname from log', () => {
        const mock_game_log_line = " 20:34 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\xian/default\\hmodel\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0"
        const player_nickname = ReportService._getPlayerNickname(mock_game_log_line)
        expect(player_nickname).toBe('Isgalamido');
    });

    test('should return kill information from log', () => {
        const mock_game_log_line = "22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH"
        const kill_information = ReportService._getKillInformation(mock_game_log_line)
        expect(kill_information).toStrictEqual({
            killer: 'Isgalamido',
            killed: 'Isgalamido',
            death_cause: 'MOD_ROCKET_SPLASH'
        });
    });

    test('should register player on match list', () => {
        const mock_players = ['Isgalamido','Pedrinho']
        ReportService._initMatch(1)
        mock_players.forEach(player => {
            ReportService.registerPlayer(1,player)
        })
        const match_players_list = ReportService.matches[0].players
        expect(match_players_list).toStrictEqual(mock_players)
    });

    test("shouldn't register the same player twice", () => {
        const mock_players = ['Isgalamido','Isgalamido','Pedrinho']
        ReportService._initMatch(1)
        mock_players.forEach(player => {
            ReportService.registerPlayer(1,player)
        })
        const match_players_list = ReportService.matches[0].players
        expect(match_players_list.length).toStrictEqual(2)
    });

    //
    // test('should register player kills', () => {});
    //
    // test('should discount player kills when die by world', () => {});
    //
    // test('should count total players kills', () => {});
    //
    // test('should register death causes', () => {});
    //
    // test('should have total match games of log file', () => {});
});