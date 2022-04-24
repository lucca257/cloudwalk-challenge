const Report = require('../../services/ReportService');
const ReportService = new Report();

describe('unit report game test', () => {
    beforeEach(() => {
        const mockFileData = [
            " 0:00 ------------------------------------------------------------\n",
            " 0:00 InitGame: \\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0\n",
            " 15:00 Exit: Timelimit hit.\n",
            " 20:34 ClientConnect: 2\n",
            " 20:34 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\xian/default\\hmodel\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0\n",
            " 20:37 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0\n",
            " 20:37 ClientBegin: 2\n",
            " 20:37 ShutdownGame:\n",
            " 20:37 ------------------------------------------------------------\n",
            " 20:37 ------------------------------------------------------------"
        ]
    });

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

    // test('should register player on match list', () => {});
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