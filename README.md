# cloudwalk -- Software Engineer test

technical challenge by cloudwalk. all the requirements can be found here.

## Project explaning

## Project settings

This project was implemented with docker, you just need to build the container for the project works.

> docker-compose up

if you dont want to use the docker image, you just need to type:

> npm start

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
  
  using docker:
  
  Atention: the container should be runing
  
  >  docker exec -it cloudwalk-challenge_app_1 sh -c "npm test"       

  if you are not using docker, just type:
 
 > npm test
