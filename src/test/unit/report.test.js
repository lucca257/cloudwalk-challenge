const Report = require('../../services/ReportService');
var ReportService = new Report();

describe('report game test', () => {
    afterEach(() => {
        ReportService = new Report();
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

    test('should register player kills', () => {
        const mock_match_log_data = [
            "22:06 Kill: 2 3 7: Isgalamido killed Mocinha by MOD_ROCKET_SPLASH",
            "22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH",
            "22:40 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH",
            "22:18 Kill: 2 2 7: Mocinha killed Isgalamido by MOD_ROCKET_SPLASH",
        ]
        const expected_result = [
            {
                player: 'Isgalamido',
                kills: 3
            },
            {
                player: 'Mocinha',
                kills: 1
            }
        ]
        ReportService._initMatch(1)
        mock_match_log_data.forEach(line => {
            const kill_information = ReportService._getKillInformation(line)
            ReportService.registerKill(1, kill_information.killer, kill_information.killed)
        })
        const match_players_kills = ReportService.matches[0].kills
        expect(match_players_kills).toStrictEqual(expected_result)
    });

    test('should discount player kills when die by world', () => {
        const mock_match_log_data = [
            "22:17 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH",
            "22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH",
            "1:32 Kill: 1022 4 22: <world> killed Isgalamido by MOD_TRIGGER_HURT",
            "22:17 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH",
            "22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH",
            "1:32 Kill: 1022 4 22: <world> killed Isgalamido by MOD_TRIGGER_HURT",
        ]
        const expected_result = [{
                player: 'Isgalamido',
                kills: 2
            }]
        ReportService._initMatch(1)
        mock_match_log_data.forEach(line => {
            const kill_information = ReportService._getKillInformation(line)
            ReportService.registerKill(1, kill_information.killer, kill_information.killed)
        })
        const match_players_kills = ReportService.matches[0].kills
        expect(match_players_kills).toStrictEqual(expected_result)
    });

    test('should register death causes', () => {
        const mock_match_log_data = [
            "22:17 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH",
            "22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH",
            "1:32 Kill: 1022 4 22: <world> killed Isgalamido by MOD_TRIGGER_HURT",
            "22:17 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_FALLING",
            "22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_FALLING",
            "1:32 Kill: 1022 4 22: <world> killed Isgalamido by MOD_TRIGGER_HURT",
        ]
        const expected_result = [
            {
                cause: 'MOD_ROCKET_SPLASH',
                count: 2
            },
            {
                cause: 'MOD_TRIGGER_HURT',
                count: 2
            },
            {
                cause: 'MOD_FALLING',
                count: 2
            }
        ]
        ReportService._initMatch(1)
        mock_match_log_data.forEach(line => {
            const kill_information = ReportService._getKillInformation(line)
            ReportService.registerDeathCauses(1, kill_information.death_cause)
        })
        const match_death_causes = ReportService.matches[0].death_causes
        expect(match_death_causes).toStrictEqual(expected_result)
    });

    test('should have total match games of log file', async () => {
        const mock_match_log_data = [
            "0:00 ------------------------------------------------------------\n",
            "0:00 InitGame: \\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0\n",
            "15:00 Exit: Timelimit hit.\n",
            "20:34 ClientConnect: 2\n",
            "20:34 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\xian/default\\hmodel\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0\n",
            "20:37 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0\n",
            "20:37 ClientBegin: 2\n",
            "20:37 ShutdownGame:\n",
            "20:37 ------------------------------------------------------------\n",
            "20:37 ------------------------------------------------------------",
            "0:00 ------------------------------------------------------------\n",
            "0:00 InitGame: \\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0\n",
            "15:00 Exit: Timelimit hit.\n",
            "20:34 ClientConnect: 2\n",
            "20:34 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\xian/default\\hmodel\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0\n",
            "20:37 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0\n",
            "20:37 ClientBegin: 2\n",
            "20:37 ShutdownGame:\n",
            "20:37 ------------------------------------------------------------\n",
            "20:37 ------------------------------------------------------------"
        ];
        const file_data = await ReportService.main(mock_match_log_data)
        expect(file_data.length).toBe(2)
    });

});