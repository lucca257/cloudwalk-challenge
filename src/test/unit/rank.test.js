const GameRank = require('../../services/RankService');
const rankService = new GameRank();

describe('rank test', () => {
    it('should rank players by kills', async () => {
        const mock_match_data = [
            {
                "match": 1,
                "total_kills": 15,
                "players": [
                    "Isgalamido",
                    "Dono da Bola",
                    "Mocinha"
                ],
                "kills": [
                    {
                        "player": "Isgalamido",
                        "kills": 3
                    },
                    {
                        "player": "Dono da Bola",
                        "kills": 6
                    },
                    {
                        "player": "Mocinha",
                        "kills": 2
                    }

                ],
                "death_causes": [
                    {
                        "cause": "MOD_TRIGGER_HURT",
                        "count": 7
                    },
                    {
                        "cause": "MOD_ROCKET_SPLASH",
                        "count": 3
                    },
                    {
                        "cause": "MOD_FALLING",
                        "count": 5
                    }
                ]
            },
            {
                "match": 2,
                "total_kills": 11,
                "players": [
                    "Isgalamido",
                    "Dono da Bola",
                    "Mocinha"
                ],
                "kills": [
                    {
                        "player": "Isgalamido",
                        "kills": -3
                    }
                ],
                "death_causes": [
                    {
                        "cause": "MOD_TRIGGER_HURT",
                        "count": 7
                    },
                    {
                        "cause": "MOD_ROCKET_SPLASH",
                        "count": 3
                    },
                    {
                        "cause": "MOD_FALLING",
                        "count": 1
                    }
                ]
            },
        ]
        const rank_data = await rankService.main(mock_match_data);
        expect(rank_data).toStrictEqual([
            { player: 'Dono da Bola', kills: 6 },
            { player: 'Mocinha', kills: 2 },
            { player: 'Isgalamido', kills: 0 }
        ])
    });
});