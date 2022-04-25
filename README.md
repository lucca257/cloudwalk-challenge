# cloudwalk -- Software Engineer test

technical challenge by cloudwalk. all the requirements can be found here.

## Project explaning

## Api Docs

The Api have two routes. One responsible to show game reports and another with the rank by kills

 > **GET** cloudwalk.localhost/

  ```json
  "data": [
  {
      "match": 4,
      "total_kills": 105,
      "players": [
        "Dono da Bola",
        "Isgalamido",
        "Zeh",
        "Assasinu Credi"
      ],
      "kills": [
        {
          "player": "Isgalamido",
          "kills": 21
        },
        {
          "player": "Dono da Bola",
          "kills": 15
        },
        {
          "player": "Zeh",
          "kills": 20
        },
        {
          "player": "Assasinu Credi",
          "kills": 15
        }
      ],
      "death_causes": [
        {
          "cause": "MOD_TRIGGER_HURT",
          "count": 9
        },
        {
          "cause": "MOD_FALLING",
          "count": 11
        },
        {
          "cause": "MOD_ROCKET",
          "count": 20
        },
        {
          "cause": "MOD_RAILGUN",
          "count": 8
        },
        {
          "cause": "MOD_ROCKET_SPLASH",
          "count": 51
        },
        {
          "cause": "MOD_MACHINEGUN",
          "count": 4
        },
        {
          "cause": "MOD_SHOTGUN",
          "count": 2
        }
      ]
    },
    ...
  ]
  ```
   > **GET** cloudwalk.localhost/rank

  ```json
  {
    "data": [
      {
        "player": "Isgalamido",
        "kills": 159
      },
      {
        "player": "Zeh",
        "kills": 132
      },
      {
        "player": "Oootsimo",
        "kills": 124
      },
      ...
    ]
  }
  ```
  ## How run the tests
  
  if you are using the docker image  run this comand:
  
  > docker exec -it cloudwalk-challenge_app_1 sh   

 then you just need to run the test comand and see the suit tests
 
 > npm test
